import React from 'react';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { SolutionsSection } from './SolutionsSection';
import { SegmentsGrid } from './SegmentsGrid';
import { RoiCalculator } from './RoiCalculator';
import { TestimonialsSection } from './TestimonialsSection';
import { LeadCaptureForm } from './LeadCaptureForm';
import { FaqSection } from './FaqSection';
import { Footer } from './Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <SolutionsSection />
        <SegmentsGrid />
        <RoiCalculator />
        <LeadCaptureForm />
        <TestimonialsSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
};
