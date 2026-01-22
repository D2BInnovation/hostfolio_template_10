'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

interface HeroData {
  greeting: string;
  description: string;
  primaryButton: { text: string; link: string };
  secondaryButton: { text: string; link: string };
}

interface PersonalData {
  name: string;
  title: string;
  github: string;
  linkedin: string;
  email: string;
}

interface HeroProps {
  hero: HeroData;
  personal: PersonalData;
}

export default function Hero({ hero, personal }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Return null if required data is missing
  if (!hero || !personal || !hero.greeting || !hero.description) {
    return null;
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-secondary/5 pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Main heading and intro */}
        <div className={`space-y-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="space-y-3">
            <p className="text-lg text-primary font-semibold tracking-wide uppercase animate-fade-in-down">{hero.greeting}</p>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {personal.name}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {personal.title}
            </p>
          </div>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <Link
              href={hero.primaryButton.link}
              className="px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105 active:scale-95 group"
            >
              <span className="flex items-center gap-2">
                {hero.primaryButton.text}
                <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </span>
            </Link>
            <Link
              href={hero.secondaryButton.link}
              className="px-8 py-3 border border-primary/50 text-foreground font-semibold rounded-lg hover:bg-primary/10 hover:border-primary transition-all duration-300"
            >
              {hero.secondaryButton.text}
            </Link>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-6 pt-8 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-secondary/50 text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110 group"
            >
              <Github className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-secondary/50 text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110 group"
            >
              <Linkedin className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="p-3 rounded-lg bg-secondary/50 text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 transform hover:scale-110 group"
            >
              <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-primary/50" />
        </div>
      </div>
    </section>
  );
}
