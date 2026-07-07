/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  subspecialties: string[];
  image: string;
  verified: boolean;
  rating: number;
  consultationFeeMin: number;
  consultationFeeMax: number;
  locationName: string;
  coordinates: { x: number; y: number }; // Relative percentage coordinates for our custom interactive map
  distance: string;
  bio: string;
  education: string[];
  languages: string[];
  availability: string[]; // Weekdays or dates available
  slots: string[]; // Time slots
  hospital: string; // The partner hospital the specialist works with
}

export interface Booking {
  doctorId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  symptoms: string;
  date: string;
  slot: string;
  paymentMethod: 'Paystack' | 'CashAtClinic' | 'CareNowPayLater';
}

export interface WaitlistApplication {
  id: string;
  fullName: string;
  workEmail: string;
  role: 'Patient' | 'Doctor' | 'Investor';
  investmentAmount?: string;
  submittedAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: {
    type: 'doctor_profile' | 'booking_form';
    payload: string; // Doctor ID
  };
}
