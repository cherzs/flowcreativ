import { NextResponse } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

// Mock responses for final fallback
function getMockResponse(message: string): string {
  const mockResponses: Record<string, string> = {
    "halo": "Halo! 👋 Saya AI Assistant FlowCreativ. Ada yang bisa saya bantu tentang AI & otomasi untuk bisnis Anda?",
    "hi": "Hi! 👋 Saya AI Assistant FlowCreativ. Mau tahu tentang solusi AI & otomasi untuk bisnis?",
    "ai": "Kami menyediakan berbagai solusi AI seperti chatbot, otomasi proses bisnis, dan analisis data. Mau konsultasi gratis?",
    "harga": "Harga tergantung kebutuhan dan skala proyek. Yuk jadwalkan konsultasi gratis untuk penawaran yang sesuai!",
    "pricing": "Pricing tergantung kebutuhan proyek. Silakan jadwalkan konsultasi gratis untuk estimasi biaya.",
    "otomatisasi": "Otomasi bisa menghemat waktu dan biaya operasional hingga 70%. Bisnis Anda butuh otomasi di area mana?",
    "automation": "Automation dapat menghemat waktu dan biaya hingga 70%. Area bisnis mana yang ingin Anda otomasi?",
    "help": "Saya bisa bantu jelaskan tentang:\n• Setup AI untuk perusahaan\n• Integrasi AI dengan website\n• Laporan keuangan dengan AI\n• Konsultasi gratis\n\nMau yang mana?",
  };

  const lowerMessage = message.toLowerCase();
  for (const [key, response] of Object.entries(mockResponses)) {
    if (lowerMessage.includes(key)) return response;
  }
  return "Terima kasih pertanyaannya! 🚀 Untuk info detail, silakan jadwalkan konsultasi gratis dengan tim kami.";
}

const SYSTEM_PROMPT = `Kamu adalah AI Assistant dari FlowCreativ, sebuah perusahaan AI & Automation Partner untuk bisnis Indonesia. 

Kamu ahli dalam:
- Konsultasi AI dan otomasi bisnis
- Implementasi AI untuk UMKM dan enterprise
- Workflow automation dan integrasi sistem
- Digital transformation

Jawablah dengan:
- Bahasa Indonesia yang natural dan profesional
- Singkat dan to the point (maksimal 3-4 kalimat)
- Fokus pada solusi praktis
- Ajak user untuk konsultasi lebih lanjut jika relevan

Jika ditanya tentang pricing atau detail teknis spesifik, arahkan untuk konsultasi gratis.`;

async function callGroqAPI(message: string): Promise<string | null> {
  if (!GROQ_API_KEY) return null;
  
  try {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.warn("Groq API error:", errorData);
      return null;
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (error) {
    console.warn("Groq API failed:", error);
    return null;
  }
}

async function callDeepseekAPI(message: string): Promise<string | null> {
  if (!DEEPSEEK_API_KEY) return null;
  
  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.warn("Deepseek API error:", errorData);
      return null;
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (error) {
    console.warn("Deepseek API failed:", error);
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Priority 1: Groq API (Llama 3.3 70B)
    const groqResponse = await callGroqAPI(message);
    if (groqResponse) {
      return NextResponse.json({ response: groqResponse });
    }

    // Priority 2: Deepseek API
    const deepseekResponse = await callDeepseekAPI(message);
    if (deepseekResponse) {
      return NextResponse.json({ response: deepseekResponse });
    }

    // Priority 3: Mock response
    await new Promise(resolve => setTimeout(resolve, 400));
    return NextResponse.json({ response: getMockResponse(message) });
    
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
