/**
 * Formspree Integration Helper
 */

export async function sendToFormspree(type: 'waitlist' | 'symptom', data: any): Promise<boolean> {
  const envKey = type === 'waitlist' ? 'FORMPREE_WAITLIST' : 'FORMPREE_SYMPTOM';
  const url = process.env[envKey];
  
  if (!url || url.trim() === "") {
    console.log(`[Formspree Skipped] Environment variable ${envKey} is not configured.`);
    return false;
  }
  
  try {
    console.log(`[Formspree Sending] Attempting to send payload to ${envKey} (${url})`);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log(`[Formspree Success] Data successfully sent to ${envKey}`);
      return true;
    } else {
      console.error(`[Formspree Error] Failed to send to ${envKey}. Status: ${response.status}`);
      return false;
    }
  } catch (error: any) {
    console.error(`[Formspree Error] Exception while sending to ${envKey}:`, error.message || error);
    return false;
  }
}
