# Vishva AI Portfolio Assistant & Prompt Area Retirement

Build an intelligent, interactive portfolio assistant named **Vishva** that lives in an ambient floating chat widget at the bottom corner of Surya Teja's portfolio, powered by a server-side Gemini 3.8 Flash endpoint with full ground-truth knowledge of his background, while completely removing the legacy prompt generator elements.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following decisions were confirmed directly through Phase 1 clarification:
> - **AI Role & Feature**: Vishva is an interactive AI chat assistant answering recruiter, engineer, and visitor questions specifically about Surya Teja (education, embedded systems & DSA internships, hardware-to-software philosophy, and contact channels).
> - **Widget Location**: A sleek floating bottom-right chat bubble with an expandable conversational panel that stays accessible across all sections.
> - **Prompt Area Retirement**: Completely remove all legacy prompt generator buttons, modal triggers, and UI vestiges from the header and console, replacing them with direct access to Vishva.

- **Confirmed Decision 1**: Vishva will have a designated quick-starter chip bar (e.g. "Tell me about Surya's embedded internship", "What microcontrollers does he know?", "How can I contact Surya?") for zero-friction recruiter interaction.
- **Confirmed Decision 2**: Server-side proxy route `/api/vishva/chat` using `@google/genai` with `gemini-3.8-flash` keeping API credentials secure on the backend, complemented with local fallback intelligence if network is constrained.

---

## 1. Overview & Core Concept

- **What It Does**: Vishva acts as Surya Teja's official digital representative and portfolio AI guide. Visitors can click the floating cyan badge in the bottom right corner to open a chat modal. Vishva introduces itself as "Vishva — Surya Teja's AI Portfolio Guide" and converses naturally, answering technical and background questions with strict fidelity to Surya's verified resume.
- **Target Audience / Persona**: Technical recruiters, hiring managers, potential collaborators, and engineering peers evaluating Surya Teja for junior embedded systems, software engineering, or IoT roles.
- **Key Value**: Replaces passive reading and clunky prompt templates with active, personalized discovery. Recruiters can ask specific questions (e.g., "Has he done board-level debugging?", "What is his CGPA/percentage?", "Is he available immediately?") and get instantaneous, professional, and authentic answers.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Ambient Floating Bubble**:
   - Visitors notice a compact floating pill/circle at the bottom-right of the viewport: `Vishva · AI Assistant` with a clean cyan sparkle/bot glyph and a subtle breathing pulse.
   - A quiet dismissible tooltip greets the user on first scroll: *"Hi! I'm Vishva. Ask me anything about Surya's projects, skills, or background."*
2. **Expanding the Chat Panel**:
   - Clicking the trigger smoothly expands a 380px-wide, 520px-tall dark glassmorphic terminal chat console anchored to the bottom-right (`bg-[#090f1e]/95 backdrop-blur-xl border border-cyan-500/30 rounded-2xl`).
   - The header displays Vishva's nameplate, online telemetry status, a clear-chat button, and an intuitive minimize button.
3. **Conversational Interaction & Suggested Prompts**:
   - Initial greeting message from Vishva with 3 single-click conversational prompt chips:
     - `Tell me about his internships`
     - `What are his core technical skills?`
     - `How do I hire or contact Surya?`
   - Real-time streaming or typewriter response rendering with markdown formatting (bullet points, bold highlights, verified credentials).
4. **Header Clean-up (Removing Legacy Prompt Area)**:
   - Ensure the top navigation header maintains the strict 3-zone contract:
     - Zone 1: Wordmark `Y. J. V. SURYA TEJA` + `ECE` indicator
     - Zone 2: Navigation links (`About`, `Portrait`, `Education`, `Experience`, `Skills`, `Methodology`, `Certifications`, `Contact`)
     - Zone 3: Primary action button (`Resume`) and mobile drawer equivalents.
   - Any residual prompt generator triggers or unwired buttons are completely removed.

### Visual Identity & Theme

- **Aesthetic Direction**: High-tech avionics / embedded laboratory terminal aesthetic matching the existing portfolio theme.
- **Color Palette**:
  - Background Canvas: Deep navy `#070b14` and `#090f1e`
  - Accent / Primary Focus: Electric cyan `#06b6d4` (traces, active states, user speech bubbles)
  - Secondary Accents: Emerald `#10b981` (online status, verified badge) and warm amber `#f59e0b` (key highlights)
  - Typography: `Plus Jakarta Sans` for clean conversational prose, paired with `JetBrains Mono` for metadata, timestamps, and technical spec tags.
- **Micro-Interactions**:
  - Smooth expansion/collapse transition ($\le 180\text{ms}$).
  - Active typing indicator (three animated bouncing dots in cyan).
  - Copy response button for recruiters wanting to paste Surya's details into evaluation notes.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Server-Side Gemini API Proxy**:
  - *Chosen Approach*: Expose `/api/vishva/chat` through Vite's server middleware in development / full-stack runtime, consuming `@google/genai` with model `gemini-3.8-flash`.
  - *Why*: Strict adherence to security standards—`process.env.GEMINI_API_KEY` is never leaked to the client bundle.
  - *Fallback Strategy*: If `GEMINI_API_KEY` is temporarily missing or rate-limited, Vishva automatically falls back to an embedded knowledge-base matcher that synthesizes verified responses directly from `resumeData.ts`, ensuring zero broken user experiences.
- **Decision 2: Persona Formulation & Strict Ground Truth**:
  - *Chosen Approach*: System instructions strictly bind Vishva to Surya Teja's authenticated dossier. Vishva speaks politely, professionally, and enthusiastically about Surya's passion for bridging hardware and software, but will never invent unverified projects, degrees, or companies.
- **Decision 3: Floating Overlay vs. Page Section**:
  - *Chosen Approach*: Floating bottom corner widget rather than an in-page section, keeping it accessible as visitors scroll through the timeline, skills matrix, and headshot studio.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Client UI (React 19)                            │
│                                                                        │
│  ┌───────────────────────┐          ┌───────────────────────────────┐  │
│  │      Navbar.tsx       │          │          Hero.tsx             │  │
│  │ (Zero prompt buttons) │          │  (Surya Teja Portrait locked) │  │
│  └───────────────────────┘          └───────────────────────────────┘  │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │               VishvaChatWidget.tsx (Bottom-Right)                │  │
│  │  ┌─────────────────────────┐  ┌───────────────────────────────┐  │  │
│  │  │ Floating Trigger Bubble │  │  Expandable Chat Terminal     │  │  │
│  │  │   "Ask Vishva AI"       │  │  - Message Stream & Bubbles   │  │  │
│  │  └─────────────────────────┘  │  - Suggested Prompt Starters  │  │  │
│  │                               │  - Text Input & Send Action   │  │  │
│  │                               └───────────────────────────────┘  │  │
│  └───────────────────────────────────┬──────────────────────────────┘  │
└──────────────────────────────────────┼─────────────────────────────────┘
                                       │ HTTP POST /api/vishva/chat
                                       ▼
┌────────────────────────────────────────────────────────────────────────┐
│               Server Layer (vite.config.ts Middleware)                 │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ System Instruction: "You are Vishva, AI Guide for Surya Teja"    │  │
│  │ Injected Context: Full RESUME_DATA (Education, Internships, ECE) │  │
│  │ Model: @google/genai with 'gemini-3.8-flash'                     │  │
│  └───────────────────────────────────┬──────────────────────────────┘  │
│                                      │
│                                      ▼
│                         Google Gemini 3.8 Flash API                    │
└────────────────────────────────────────────────────────────────────────┘
```

### Component & State Mapping

- `src/components/VishvaChatWidget.tsx`:
  - `isOpen: boolean`: Toggles the chat window open/closed.
  - `messages: Array<{ id, sender: 'user' | 'vishva', text, timestamp }>`: Manages dialog history.
  - `isLoading: boolean`: Displays typing indicator while awaiting API response.
  - `input: string`: Controlled input field for visitor queries.
- `src/services/vishvaService.ts`:
  - Handles client-to-server request dispatching to `/api/vishva/chat`.
  - Implements intelligent local fallback in case of offline or sandbox network restrictions.
- `vite.config.ts`:
  - Server middleware handling `POST /api/vishva/chat`, extracting prompt and conversation history, and invoking `@google/genai` with `gemini-3.8-flash`.

---
