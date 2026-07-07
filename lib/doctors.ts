export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  subspecialties: string[];
  location: string;
  bio: string;
}

export const doctorSummaries: Doctor[] = [
  {
    id: "dr-folake-adeyemi",
    name: "Dr. Folake Adeyemi",
    specialty: "Oncology Specialist",
    subspecialties: ["Breast Cancer", "Immunotherapy", "Chemotherapy Care"],
    location: "Victoria Island, Lagos",
    bio: "Globally trained Oncology Specialist with 15+ years managing complex cancers. Breast cancer, immunotherapy, tumor matching."
  },
  {
    id: "dr-chinedu-okafor",
    name: "Dr. Chinedu Okafor",
    specialty: "Cardiologist",
    subspecialties: ["Heart Failure", "Preventative Cardiology", "Hypertension Management"],
    location: "Lekki Phase 1, Lagos",
    bio: "Specializes in interventional and preventive cardiology, hypertension, arrhythmia, palpitations."
  },
  {
    id: "dr-amina-bello",
    name: "Dr. Amina Bello",
    specialty: "Pediatric Specialist",
    subspecialties: ["Neonatal Care", "Childhood Nutrition", "Immunology"],
    location: "Ikeja GRA, Lagos",
    bio: "Warm approach with infants and children. Childhood asthma, developmental checkups, vaccination guidelines."
  },
  {
    id: "dr-tunde-alabi",
    name: "Dr. Tunde Alabi",
    specialty: "Orthopedic Surgeon",
    subspecialties: ["Joint Replacement", "Sports Medicine", "Spinal Wellness"],
    location: "Surulere, Lagos",
    bio: "Expert in joint replacement, sports injury recovery, knee and hip pain, spine posture assessments."
  },
  {
    id: "dr-funmi-oyelese",
    name: "Dr. Funmi Oyelese",
    specialty: "Obstetrician & Gynecologist",
    subspecialties: ["High-Risk Pregnancies", "Infertility Care", "Gynecological Oncology"],
    location: "Ikoyi, Lagos",
    bio: "Safe child delivery, MRCOG certified, fertility treatments, prenatal assessments, hormonal disorders."
  },
  {
    id: "dr-emeka-nwachukwu",
    name: "Dr. Emeka Nwachukwu",
    specialty: "Dermatologist",
    subspecialties: ["Acne Treatments", "Eczema Management", "Skin Pigmentation Care"],
    location: "Yaba, Lagos",
    bio: "Skin conditions in tropical climates, adult acne, chronic eczema, skin allergies, fungal infections."
  }
];
