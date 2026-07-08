import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getGeminiClient } from "../lib/gemini.js";
import { doctorSummaries } from "../lib/doctors.js";
import { Type } from "@google/genai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS support
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const { query, conversationHistory = [] } = req.body;

  if (!query || query.trim() === "") {
    return res.status(400).json({ error: "Search query is required" });
  }

  try {
    const ai = getGeminiClient();

    // Prepare doctor context for the LLM
    const doctorContext = JSON.stringify(doctorSummaries, null, 2);

    // Build standard prompt
    const prompt = `
      You are the Tinder Health AI matching assistant named Dr. Nia. Your job is to help patients in Nigeria understand their health needs, perform safe and helpful preliminary symptom analysis, recommend the most suitable clinical specialties, and match them with the right verified doctors.
      
      Below are the verified doctors currently available on Tinder Health:
      ${doctorContext}

      User Query: "${query}"
      
      Review the query, assess their concern (include a friendly notice that this is an AI recommendation and not official medical advice), determine their recommended clinical specialty, and output a list of doctor IDs that are appropriate matches, ordered from most relevant to least relevant.
      If their query is general or does not match a specific specialty, match with the doctors whose bios are closest, or recommend the most logical first step.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are Dr. Nia, a professional medical health assistant chatbot. Always use a warm, reassuring, and professional tone. Provide extremely helpful matches based on the available doctors.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedSpecialty: {
              type: Type.STRING,
              description: "The primary clinical specialty suggested (e.g., Cardiologist, Pediatrician, General Care)."
            },
            analysis: {
              type: Type.STRING,
              description: "A clear, compassionate assessment and analysis of the patient's symptoms/query, emphasizing safe advice."
            },
            matchedDoctorIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "The IDs of matched doctors in order of relevance (e.g. ['dr-folake-adeyemi'])."
            },
            matchingExplanation: {
              type: Type.STRING,
              description: "An explanation of why these specific doctors are matches for their query."
            }
          },
          required: ["recommendedSpecialty", "analysis", "matchedDoctorIds", "matchingExplanation"]
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No response from Gemini API");
    }

    const resultJson = JSON.parse(resultText.trim());
    return res.status(200).json(resultJson);

  } catch (error: any) {
    console.error("Gemini matching error:", error);
    // If API key is missing or failed, return a structured mock fallback so the application is still smooth and interactive!
    let fallbackSpecialty = "General Medical Consultation";
    let fallbackAnalysis = "I was unable to connect to our clinical AI matcher at this moment. However, I can suggest consulting with a general practitioner or looking over our premium clinical list below.";
    let matchedIds: string[] = ["dr-folake-adeyemi", "dr-chinedu-okafor"];

    const qLower = query.toLowerCase();
    if (qLower.includes("heart") || qLower.includes("chest") || qLower.includes("palpitation") || qLower.includes("pressure")) {
      fallbackSpecialty = "Cardiology";
      fallbackAnalysis = "Based on your mention of heart or cardiovascular symptoms, we highly recommend consulting with a Cardiologist. If you are experiencing chest pain, tightness, or difficulty breathing, please seek immediate emergency care at the nearest hospital.";
      matchedIds = ["dr-chinedu-okafor"];
    } else if (qLower.includes("cancer") || qLower.includes("tumor") || qLower.includes("oncology") || qLower.includes("chemo")) {
      fallbackSpecialty = "Oncology";
      fallbackAnalysis = "For questions or symptoms related to cancer care, lump evaluation, or complex oncology treatments, a specialist oncology consultation is recommended.";
      matchedIds = ["dr-folake-adeyemi"];
    } else if (qLower.includes("child") || qLower.includes("baby") || qLower.includes("kid") || qLower.includes("pediat")) {
      fallbackSpecialty = "Pediatrics";
      fallbackAnalysis = "For infants, children, and teenagers, a specialized pediatrician can assess development, infections, asthma, and childhood nutrition safely.";
      matchedIds = ["dr-amina-bello"];
    } else if (qLower.includes("bone") || qLower.includes("joint") || qLower.includes("fracture") || qLower.includes("knee") || qLower.includes("ortho")) {
      fallbackSpecialty = "Orthopedics";
      fallbackAnalysis = "Joint pain, musculoskeletal trauma, spine issues, and sports injuries are best addressed by an Orthopedic surgeon.";
      matchedIds = ["dr-tunde-alabi"];
    } else if (qLower.includes("preg") || qLower.includes("women") || qLower.includes("birth") || qLower.includes("gyne") || qLower.includes("period")) {
      fallbackSpecialty = "Obstetrics & Gynecology";
      fallbackAnalysis = "For women's health, reproductive concerns, pregnancy guidance, and fertility, an OB/GYN specialist is the ideal choice.";
      matchedIds = ["dr-funmi-oyelese"];
    } else if (qLower.includes("skin") || qLower.includes("rash") || qLower.includes("acne") || qLower.includes("eczema") || qLower.includes("derm")) {
      fallbackSpecialty = "Dermatology";
      fallbackAnalysis = "Skin irritation, chronic rashes, acne, and tropical skin conditions are expertly diagnosed and managed by a Dermatologist.";
      matchedIds = ["dr-emeka-nwachukwu"];
    }

    return res.status(200).json({
      recommendedSpecialty: fallbackSpecialty,
      analysis: fallbackAnalysis,
      matchedDoctorIds: matchedIds,
      matchingExplanation: "Matched based on symptom keywords in local backup database.",
      fallback: true,
      errorInfo: error.message
    });
  }
}
