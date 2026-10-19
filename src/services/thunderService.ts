import { RESUME_DATA } from '../data/resumeData';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'thunder' | 'vishva';
  text: string;
  timestamp: string;
}

/**
 * Intelligent local knowledge responder for Surya Teja.
 * Used as a dependable fallback if network is offline or server encounters issues.
 */
export function getLocalFallbackReply(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('intern') || q.includes('experience') || q.includes('work') || q.includes('protective') || q.includes('csc')) {
    return `Surya Teja has completed two high-impact internships:
1. **Embedded System Design with Microcontroller & Programming** at *Protective Technologies Ltd., Vijayawada* (6 Months, Nov 2023 – May 2024). He worked in the Design & Development Department with hands-on 8051 microcontroller architecture, peripheral interfacing, GPIO, UART, and embedded C.
2. **Data Structures & Algorithms using Java** at *CSC India (APSCHE)* (2 Months, May – June 2026). Focused on core algorithmic complexity, linear/nonlinear data structures, and problem-solving in Java.`;
  }

  if (q.includes('microcontroller') || q.includes('hardware') || q.includes('embedded') || q.includes('protocol') || q.includes('8051')) {
    return `In hardware and embedded systems, Surya Teja specializes in:
- **Microcontrollers**: 8051 architecture, plus foundational ARM and PIC microcontrollers.
- **Protocols & Interfacing**: GPIO, UART Serial communication, I2C, SPI, timers, interrupts, and ADC conversion.
- **Toolchains**: Embedded C, Assembly fundamentals, Keil uVision, and Proteus simulation.
- **Practical Experience**: 6 months of board testing, peripheral interfacing, and schematic review at Protective Technologies Ltd.`;
  }

  if (q.includes('skill') || q.includes('technolog') || q.includes('stack') || q.includes('languages') || q.includes('know')) {
    return `Surya Teja's verified technical and professional competencies:
- **Technical & Hardware**: Embedded Systems, Microcontroller Programming (8051), C, Python, Java, Data Structures & Algorithms, Computer Networks.
- **AI & Digital Systems**: Artificial Intelligence, AI Agents, Systems Research, and Structured Problem Solving.
- **Communication & Impact**: Technical-to-Commercial Translation, Technical Documentation, PPT & Graph Design, and Mentoring.
- **Core Engineering Philosophy**: Bridging physical hardware with scalable software architectures.`;
  }

  if (q.includes('education') || q.includes('college') || q.includes('btech') || q.includes('degree') || q.includes('cgpa') || q.includes('score') || q.includes('percentage') || q.includes('polytechnic')) {
    return `Surya Teja's verified educational progression:
1. **B.Tech in Electronics & Communication Engineering** (2024–2027) — *DNR College of Engineering & Technology, Bhimavaram*. Score: **65.38%**.
2. **Diploma in ECE** (2021–2024) — *Smt B Seetha Polytechnic, Bhimavaram*. Score: **76.00%**.
3. **SSC 10th Standard** (2023–2024) — *PRZPHS Adavikolanu*. Score: **8.6 CGPA**.`;
  }

  if (q.includes('linkedin') || q.includes('social') || q.includes('profile')) {
    return `Surya Teja's official LinkedIn profile is:
- **LinkedIn**: [https://www.linkedin.com/in/surya-yelubandi](https://www.linkedin.com/in/surya-yelubandi)

Feel free to connect with him on LinkedIn for recruitment, embedded systems discussions, or technical collaboration!`;
  }

  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('hire') || q.includes('reach') || q.includes('available')) {
    return `You can reach Surya Teja directly through his verified channels:
- **Email**: [${RESUME_DATA.personal.email}](mailto:${RESUME_DATA.personal.email})
- **Phone**: [${RESUME_DATA.personal.phone}](tel:${RESUME_DATA.personal.phone.replace(/\s+/g, '')})
- **LinkedIn**: [https://www.linkedin.com/in/surya-yelubandi](https://www.linkedin.com/in/surya-yelubandi)
- **Location**: ${RESUME_DATA.personal.location}
- **Status**: Active Fresher · Available immediately for internships and junior engineering roles.`;
  }

  if (q.includes('certif') || q.includes('nptel') || q.includes('course') || q.includes('infosys')) {
    return `Surya Teja holds three verified certifications:
1. **Computer Network and Internet Protocol** — Issued by **NPTEL**. Covers OSI layers, routing, TCP/IP, and network architecture.
2. **Data Structure and Algorithms Using Java** — Issued by **CSC India (APSCHE)**.
3. **Programming Fundamentals Using Python** — Issued by **Infosys | Springboard**.`;
  }

  if (q.includes('who are you') || q.includes('what is thunder') || q.includes('what is vishva') || q.includes('who made you') || q.includes('your name')) {
    return `I am **Thunder**, Surya Teja's official AI Portfolio Guide! I'm here to provide accurate, verified information regarding Surya's engineering background, internships, hardware/software skills, and career interests. What would you like to explore?`;
  }

  // Default helpful overview
  return `Hello! I'm **Thunder**, Surya Teja's portfolio AI assistant. 
Surya is an **Electronics & Communication Engineering (ECE)** fresher specializing in embedded microcontrollers, programming (C, Java, Python), and AI agents.

Feel free to ask about:
- His 6-month embedded systems internship at Protective Technologies
- His 2-month DSA Java internship with CSC India / APSCHE
- His academic credentials at DNR College and Smt B Seetha Polytechnic
- His direct contact details for recruitment`;
}

/**
 * Sends a message to the Thunder chat service.
 */
export async function sendThunderMessage(
  message: string,
  history: ChatMessage[] = []
): Promise<string> {
  try {
    const response = await fetch('/api/thunder/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history: history.map((h) => ({ sender: h.sender, text: h.text })),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.reply && !data.fallback) {
        return data.reply;
      }
    }
  } catch (error) {
    console.warn('Thunder backend chat offline, using grounded knowledge fallback:', error);
  }

  // Local grounded fallback
  return getLocalFallbackReply(message);
}

// Backwards compatibility alias
export const sendVishvaMessage = sendThunderMessage;
