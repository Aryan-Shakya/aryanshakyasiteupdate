import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { message, history = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.CEREBRAS_API_KEY;

    // Helper function for smart local semantic responses when API billing/quota is unavailable
    function getSemanticFallback(queryRaw) {
      const q = queryRaw.toLowerCase();
      if (q.includes('study') || q.includes('college') || q.includes('university') || q.includes('education') || q.includes('degree') || q.includes('btech') || q.includes('school')) {
        return "Aryan is pursuing his B.Tech in Computer Science and Engineering (expected graduation 2028) at D.Y. Patil International University. He also serves as Co-founder and President of the YANTRIX Robotics and IoT Club!";
      }
      if (q.includes('esp32') || q.includes('iot') || q.includes('hardware') || q.includes('raspberry') || q.includes('arduino') || q.includes('robot') || q.includes('embed')) {
        return "In IoT and robotics, Aryan builds integrated real-time systems like his Smart Sensor Dashboard (ESP32 + Firebase live telemetry) and a local voice AI pipeline deployed on a Raspberry Pi 4 with Whisper STT and Llama 3.2!";
      }
      if (q.includes('hire') || q.includes('job') || q.includes('intern') || q.includes('work') || q.includes('freelance') || q.includes('contact') || q.includes('email') || q.includes('reach')) {
        return "Aryan is open for exciting full-stack web and IoT engineering roles! You can reach him directly at aryanshakyaofficial.mail@gmail.com, WhatsApp him at +91 93223 11917, or click the download button to grab his official CV.";
      }
      if (q.includes('web') || q.includes('react') || q.includes('next') || q.includes('three') || q.includes('frontend') || q.includes('fullstack') || q.includes('gsap')) {
        return "On the web side, Aryan builds immersive applications using React, Next.js, Three.js 3D graphics, and GSAP animations—just like this interactive portfolio and his intelligent reading platform FlowRead!";
      }
      if (q.includes('hobby') || q.includes('music') || q.includes('show') || q.includes('sitcom') || q.includes('game') || q.includes('play')) {
        return "When he is not coding, Aryan loves listening to high-energy music playlists, watching sitcoms like Rick and Morty or Silicon Valley, and playing retro arcade spell-dueling games!";
      }
      return `I analyzed your query about "${queryRaw}". As Aryan's AI assistant, I can tell you he specializes in building systems where physical IoT hardware meets immersive full-stack web software! Type 'skills', 'projects', or 'contact' to explore his work.`;
    }

    if (!apiKey) {
      return NextResponse.json({
        reply: getSemanticFallback(message)
      });
    }

    // Format conversation history for Cerebras API
    const formattedHistory = history.slice(-6).map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'assistant',
      content: msg.content,
    }));

    const systemPrompt = `You are Aryan Shakya's AI digital avatar and personal assistant on his interactive 3D portfolio website (aryanshakya.in).
Aryan is a Full-stack developer, creative coder, and IoT engineer based in India, currently studying B.Tech in Computer Science and Engineering (expected graduation 2028 from D.Y. Patil International University).
He serves as Co-founder & President of the University Robotics & IoT Club (YANTRIX).

Technical Stack & Capabilities:
- Programming Languages: Python, JavaScript, C/C++, Java, SQL, HTML5, CSS3.
- Web Development: React, Next.js, Three.js, GSAP, Node.js, Express, MongoDB, Firebase, Vercel.
- Robotics & Embedded Systems: ESP32, Raspberry Pi (4, 5 & Zero 2W), Arduino, Teensy, Sensor Integration, Real-time Processing.
- Tools & Platforms: Git, GitHub, VS Code, Arduino IDE, Firebase, AI-augmented development (Antigravity, Gemini, Claude).

Featured Projects:
1. FlowRead (https://flowread.aryanshakya.in/): An intelligent reading platform with custom themes, file uploads, and user authentication built with Next.js and MongoDB.
2. Smart Sensor Dashboard (https://esp-projects-92383.web.app/): Real-time IoT dashboard visualizing live telemetry (ultrasonic, pulse, humidity) from ESP32 microcontrollers via Firebase Realtime Database.
3. aryanshakya.in: This immersive 3D portfolio featuring Three.js wireframe particle animations, GSAP scroll storytelling, and interactive command-line terminal.
4. Reception Desk Bot: A local voice pipeline integrating Whisper (STT), ChromaDB semantic search (600+ Q&A entries), and llama3.2:3b deployed on a Raspberry Pi 4 with Piper TTS.
5. Dual-Motor Stabilization Aircraft & Sub-200ms Wi-Fi RC Car.

Personal Interests:
- Music: Big fan of high-energy beats and atmospheric playlists.
- TV Shows & Sitcoms: Rick and Morty, Harry Potter, Silicon Valley.
- Gaming: Love retro arcade games and wizard spell duels.

Contact Info:
- Email: aryanshakyaofficial.mail@gmail.com
- WhatsApp: +91 93223 11917
- GitHub: https://github.com/Aryan-Shakya
- LinkedIn: https://www.linkedin.com/in/aryan-shakya-73035a385/
- Resume: Available via the one-click download button on the site.

Behavior Guidelines:
- Speak enthusiastically, warmly, and concisely as Aryan's AI robot avatar.
- Write in natural, clear prose without excessive bullet points unless listing technical specifications.
- Keep your answers under 150 words.`;

    try {
      const response = await fetch('https://api.cerebras.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gemma-4-31b',
          messages: [
            { role: 'system', content: systemPrompt },
            ...formattedHistory,
            { role: 'user', content: message }
          ],
          temperature: 0.7,
          max_tokens: 400,
        }),
      });

      if (!response.ok) {
        // If API billing or quota error occurs, smoothly fall back to semantic responder
        const errText = await response.text();
        console.warn('Cerebras API Notice (using semantic fallback):', errText);
        return NextResponse.json({
          reply: getSemanticFallback(message)
        });
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || getSemanticFallback(message);

      return NextResponse.json({ reply });
    } catch (apiErr) {
      console.warn('Cerebras Network Error (using semantic fallback):', apiErr);
      return NextResponse.json({
        reply: getSemanticFallback(message)
      });
    }
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({
      reply: "Error processing command. Please try again or type 'help' for standard options."
    }, { status: 500 });
  }
}
