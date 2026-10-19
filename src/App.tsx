/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { EngineeringConsole } from './components/EngineeringConsole';
import { About } from './components/About';
import { HeadshotShowcase } from './components/HeadshotShowcase';
import { EducationTimeline } from './components/EducationTimeline';
import { ExperienceLab } from './components/ExperienceLab';
import { SkillsMatrix } from './components/SkillsMatrix';
import { ThinkingProcess } from './components/ThinkingProcess';
import { Certifications } from './components/Certifications';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ThunderChatWidget } from './components/ThunderChatWidget';

export default function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isThunderChatOpen, setIsThunderChatOpen] = useState(false);

  // Synchronize and permanently lock Surya Teja's photo into server storage
  useEffect(() => {
    try {
      const localPhoto = localStorage.getItem('surya_teja_custom_photo');
      if (localPhoto && localPhoto.startsWith('data:image')) {
        fetch('/api/save-permanent-portrait', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: localPhoto }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              console.log('Surya Teja portrait permanently committed to server filesystem.');
            }
          })
          .catch(() => {});
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Top Navigation */}
      <Navbar
        onOpenResume={() => setIsResumeModalOpen(true)}
        onOpenThunder={() => setIsThunderChatOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section with Interactive Portrait and Circuit Parallax */}
        <Hero
          onOpenResume={() => setIsResumeModalOpen(true)}
        />

        {/* 2. Interactive Engineering Terminal Console */}
        <EngineeringConsole />

        {/* 3. About Me / Career Objective & Strengths */}
        <About />

        {/* 4. Professional Portrait Studio & Headshot Significance */}
        <HeadshotShowcase />

        {/* 5. Education Vertical Circuit Timeline */}
        <EducationTimeline />

        {/* 5. Experience Lab & Hardware-to-Software Bridge */}
        <ExperienceLab />

        {/* 6. Skills Matrix without fabricated percentage bars */}
        <SkillsMatrix />

        {/* 7. Problem Solving: "FROM COMPLEXITY TO CLARITY" */}
        <ThinkingProcess />

        {/* 8. Verified Certifications */}
        <Certifications />

        {/* 9. Dedicated Resume Section with Print/View/Download */}
        <ResumeSection
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
        />

        {/* 10. Contact Section with Direct Verified Channels & Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals & Floating AI Assistant */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      <ThunderChatWidget
        externalOpen={isThunderChatOpen}
        onCloseExternal={() => setIsThunderChatOpen(false)}
      />
    </div>
  );
}
