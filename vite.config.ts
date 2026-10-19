import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'api-server-routes',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/save-permanent-portrait' && req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', () => {
                try {
                  const { imageBase64 } = JSON.parse(body);
                  if (imageBase64 && typeof imageBase64 === 'string') {
                    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
                    const targetFile = path.resolve(__dirname, 'public/surya_teja_portrait.png');
                    fs.writeFileSync(targetFile, Buffer.from(base64Data, 'base64'));

                    const tsFile = path.resolve(__dirname, 'src/data/permanentPortrait.ts');
                    fs.writeFileSync(
                      tsFile,
                      `/**\n * PERMANENT PORTRAIT SOURCE\n * Official locked portrait for Y. J. V. Surya Teja.\n */\nexport const PERMANENT_PORTRAIT: string = ${JSON.stringify(
                        imageBase64
                      )};\n`
                    );

                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: true, path: '/surya_teja_portrait.png' }));
                    return;
                  }
                } catch (e) {
                  console.error('Failed to commit portrait:', e);
                }
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid payload' }));
              });
              return;
            }

            if ((req.url === '/api/thunder/chat' || req.url === '/api/vishva/chat') && req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', async () => {
                try {
                  const { message, history } = JSON.parse(body || '{}');
                  if (!message || typeof message !== 'string') {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ error: 'Message is required' }));
                    return;
                  }

                  const apiKey = process.env.GEMINI_API_KEY;
                  if (!apiKey) {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ fallback: true }));
                    return;
                  }

                  const { GoogleGenAI } = await import('@google/genai');
                  const ai = new GoogleGenAI({ apiKey });

                  const systemInstruction = `You are Thunder, the dedicated AI Portfolio Guide and Technical Representative for Y. J. V. Surya Teja.
Your mission is to represent Surya Teja accurately, professionally, warmly, and enthusiastically to technical recruiters, engineering hiring managers, peers, and visitors.

AUTHENTIC GROUND TRUTH ABOUT SURYA TEJA:
- Full Name: Y. J. V. Surya Teja (Preferred Name: Surya Teja).
- Discipline: Electronics and Communication Engineering (ECE Fresher).
- Core Philosophy: Building at the intersection of Hardware, Software, and AI. Bridging physical microcontrollers/circuits with high-level software logic and data structures.
- Education:
  * B.Tech in Electronics & Communication Engineering (2024–2027) at DNR College of Engineering & Technology, Bhimavaram. Score: 65.38%. Focus on microcontrollers, communication protocols, and circuit analysis.
  * Diploma in Electronics & Communication Engineering (2021–2024) at Smt B Seetha Polytechnic, Bhimavaram. Score: 76.00%. Strong foundation in digital electronics and embedded systems.
  * SSC (10th Standard, 2023–2024) at PRZPHS Adavikolanu. Score: 8.6 CGPA.
- Internships & Industrial Experience:
  * 6-Month Industrial Diploma Internship (11/2023 – 05/2024) at Protective Technologies Ltd., Vijayawada in Design & Development Dept. Rigorous hands-on training in Embedded Systems Designing with Micro-Controller & Programming. Interfacing GPIO, timers, UART, ADC.
  * 2-Month Data Structures & Algorithms in Java Internship (May – June 2026) at CSC India (APSCHE). Implementing arrays, linked lists, stacks, queues, trees, search/sort algorithms, and computational efficiency in Java.
- Skills:
  * Technical/Hardware: Embedded Systems, Microcontrollers (8051, ARM/PIC fundamentals), C, Python, Java, Data Structures & Algorithms, Computer Networks, Circuit Debugging.
  * AI & Digital: Artificial Intelligence, AI Agents, Systems Research, Analytical Problem Solving.
  * Communication & Leadership: Technical-to-Commercial Translation (turning technical specs into business value), Technical Documentation, PPT & Graph Design, Mentoring, Adaptability, Teamwork.
- Certifications:
  * Computer Network and Internet Protocol (NPTEL)
  * Data Structure and Algorithms Using Java (CSC India / APSCHE)
  * Programming Fundamentals Using Python (Infosys Springboard)
- Contact & Availability:
  * Email: yelubandisuryateja@gmail.com
  * Phone: +91 9390029917
  * LinkedIn: https://www.linkedin.com/in/surya-yelubandi
  * Location: Bhimavaram, Andhra Pradesh, India (Open to relocation & hybrid)
  * Status: Active Fresher · Open for Internships and Junior Technical Roles (Immediate availability).

TONE & BEHAVIOR:
- Introduce yourself as Thunder, Surya Teja's AI guide.
- Keep answers concise, clear, and well-structured using markdown (bullet points, bold highlights).
- Speak with confidence in Surya's engineering skills and passion for learning.
- Strictly adhere to verified facts. Never fabricate jobs, companies, or degrees not listed above.
- If asked unrelated general trivia or non-portfolio topics, answer politely in one brief sentence and steer back to Surya's qualifications.`;

                  // Format contents with conversation context
                  const contents: any[] = [];
                  if (Array.isArray(history) && history.length > 0) {
                    // Include up to last 6 messages for context
                    const recentHistory = history.slice(-6);
                    for (const item of recentHistory) {
                      contents.push({
                        role: item.sender === 'user' ? 'user' : 'model',
                        parts: [{ text: item.text }],
                      });
                    }
                  }
                  contents.push({
                    role: 'user',
                    parts: [{ text: message }],
                  });

                  const response = await ai.models.generateContent({
                    model: 'gemini-3.8-flash',
                    contents,
                    config: {
                      systemInstruction,
                    },
                  });

                  const replyText = response.text || "Hello! I am Thunder. How can I assist you with Surya Teja's portfolio today?";
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ reply: replyText }));
                  return;
                } catch (err: any) {
                  console.error('Thunder API error:', err);
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ fallback: true, error: err?.message || 'API error' }));
                  return;
                }
              });
              return;
            }

            next();
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
