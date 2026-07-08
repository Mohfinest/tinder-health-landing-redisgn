import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getGeminiClient } from "../lib/gemini.js";
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

  const { concern } = req.body;
  if (!concern || concern.trim() === "") {
    return res.status(400).json({ error: "Concern is required" });
  }

  try {
    const ai = getGeminiClient();
    const prompt = `
      You are the Tinder Health AI matching assistant. A patient is describing their health concern: "${concern}".
      
      Determine the most suitable medical specialist they should consult. Return the recommendation exactly containing the phrase:
      "Based on your symptoms, you should see a [SPECIALIST]." (replace [SPECIALIST] with the appropriate specialist name like Dentist, Cardiologist, Pediatrician, Gynecologist, Oncologist, Dermatologist, Orthopedic Surgeon, Neurologist, Ophthalmologist, Psychiatrist, etc.).
      
      Output your response as JSON in the schema specified.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a professional medical matcher. Recommend the correct medical specialist based on the patient's concern.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            specialist: {
              type: Type.STRING,
              description: "The name of the specialist, e.g., Dentist, Cardiologist, Gynecologist."
            },
            recommendation: {
              type: Type.STRING,
              description: "The formatted recommendation string containing: 'Based on your symptoms, you should see a [SPECIALIST].' followed by brief supportive text."
            }
          },
          required: ["specialist", "recommendation"]
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
    console.error("Match specialist error:", error);
    // Fallback recommendation logic if Gemini is not available or fails
    const lowerConcern = concern.toLowerCase();
    let specialist = "General Practitioner";
    let explanation = "We suggest consulting with a general family doctor for a comprehensive checkup.";

    if (lowerConcern.includes("tooth") || lowerConcern.includes("dent") || lowerConcern.includes("mouth") || lowerConcern.includes("gum")) {
      specialist = "Dentist";
      explanation = "Dental hygiene and tooth concerns require a dental expert to diagnose cavities or infections.";
    } else if (lowerConcern.includes("heart") || lowerConcern.includes("chest") || lowerConcern.includes("cardio")) {
      specialist = "Cardiologist";
      explanation = "Cardiovascular monitoring is critical for chest discomfort or heart health checks.";
    } else if (lowerConcern.includes("preg") || lowerConcern.includes("matern") || lowerConcern.includes("birth") || lowerConcern.includes("gyne")) {
      specialist = "Obstetrician & Gynecologist";
      explanation = "Women's health, pregnancy monitoring, and maternity care are best handled by an OB/GYN specialist.";
    } else if (lowerConcern.includes("cancer") || lowerConcern.includes("tumor") || lowerConcern.includes("oncology")) {
      specialist = "Oncologist";
      explanation = "A clinical oncologist is recommended for diagnostic evaluation and cancer care plans.";
    } else if (lowerConcern.includes("eye") || lowerConcern.includes("vision") || lowerConcern.includes("blind") || lowerConcern.includes("ophthal")) {
      specialist = "Ophthalmologist";
      explanation = "Visual issues and eye pressures are evaluated by an eye surgeon or medical ophthalmologist.";
    } else if (lowerConcern.includes("child") || lowerConcern.includes("baby") || lowerConcern.includes("pediat") || lowerConcern.includes("neonat")) {
      specialist = "Pediatric Specialist";
      explanation = "Infants and growing children require dedicated pediatric clinical assessments.";
    } else if (lowerConcern.includes("mental") || lowerConcern.includes("depress") || lowerConcern.includes("anxiet") || lowerConcern.includes("psych")) {
      specialist = "Psychiatrist";
      explanation = "Mental health support, emotional wellness, and therapies are managed by a specialized therapist or psychiatrist.";
    } else if (lowerConcern.includes("skin") || lowerConcern.includes("rash") || lowerConcern.includes("acne") || lowerConcern.includes("derm")) {
      specialist = "Dermatologist";
      explanation = "Tropical skin conditions, chronic rashes, and acne are managed by dermatologist specialists.";
    } else if (lowerConcern.includes("stomach") || lowerConcern.includes("ulcer") || lowerConcern.includes("gast")) {
      specialist = "Gastroenterologist";
      explanation = "Chronic digestive problems, ulcer flare-ups, and gut health are assessed by gastroenterologists.";
    } else if (lowerConcern.includes("headache") || lowerConcern.includes("migrain") || lowerConcern.includes("brain") || lowerConcern.includes("neuro")) {
      specialist = "Neurologist";
      explanation = "Chronic migraine syndromes, neurological pains, and coordination concerns are best reviewed by a neurologist.";
    } else if (lowerConcern.includes("bone") || lowerConcern.includes("back") || lowerConcern.includes("joint") || lowerConcern.includes("ortho")) {
      specialist = "Orthopedic Surgeon";
      explanation = "Bone fractures, posture/spine issues, and joint stiffness are treated by orthopedists.";
    } else if (lowerConcern.includes("fever") || lowerConcern.includes("malaria") || lowerConcern.includes("typhoid")) {
      specialist = "Infectious Disease Specialist";
      explanation = "Persistent fevers in tropical climates are diagnosed and treated with correct drug therapies.";
    }

    return res.status(200).json({
      specialist: specialist,
      recommendation: `Based on your symptoms, you should see a ${specialist}. ${explanation}`
    });
  }
}
