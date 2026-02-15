'use client';

import { useEffect, useState } from 'react';
import portfolioData from '../data.json';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

interface PortfolioData {
  personal: any;
  hero: any;
  about: any;
  experience: any;
  projects: any;
  contact: any;
}

export default function Home() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Use imported data directly
    setData(portfolioData);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-primary border-t-accent animate-spin mx-auto"></div>
          <p className="text-foreground font-medium">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p className="text-foreground text-lg">Unable to load portfolio data</p>
      </div>
    );
  }

  // Helper functions to check if data exists and is valid
  const hasAbout = data.about && (data.about.description?.length > 0 || data.about.skills?.length > 0);
  const hasExperience = data.experience && Array.isArray(data.experience) && data.experience.length > 0;
  const hasProjects = data.projects && Array.isArray(data.projects) && data.projects.length > 0;
  const hasContact = data.contact && (data.contact.title || data.contact.description);
  const hasHero = data.hero && data.hero.greeting && data.hero.description;

  return (
    <main className="relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-primary/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            {data.personal?.name?.split(' ')[0] || 'Portfolio'}
          </a>
          <div className="hidden md:flex items-center gap-8">
            {hasAbout && (
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
            )}
            {hasExperience && (
              <a href="#experience" className="text-muted-foreground hover:text-foreground transition-colors">
                Experience
              </a>
            )}
            {hasProjects && (
              <a href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </a>
            )}
            {hasContact && (
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            )}
            {((data as any).resume || data.personal?.resume) && (
              <a
                href={(data as any).resume || data.personal.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Resume
              </a>
            )}
          </div>
          {data.personal?.email && (
            <a
              href={`mailto:${data.personal.email}`}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
            >
              Hire Me
            </a>
          )}
        </div>
      </nav>

      {/* Sections */}
      {hasHero && <Hero hero={data.hero} personal={data.personal} />}
      {hasAbout && <About about={data.about} />}
      {hasExperience && <Experience experience={data.experience} />}
      {hasProjects && <Projects projects={data.projects} />}
      {hasContact && <Contact contact={data.contact} personal={data.personal} />}

      {/* Footer */}
      <footer className="bg-secondary/50 border-t border-primary/20 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>© 2025 {data.personal?.name || 'Portfolio'}. All rights reserved. Built with modern web technologies.</p>
        </div>
      </footer>
    </main>
  );
}
