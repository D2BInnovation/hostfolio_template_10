'use client';

import React from "react"

import { useEffect, useRef, useState } from 'react';
import { Mail, Github, Linkedin, Twitter, ArrowRight } from 'lucide-react';

interface ContactData {
  title: string;
  description: string;
  socialLinks: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
}

interface PersonalData {
  email: string;
  github: string;
  linkedin: string;
}

interface ContactProps {
  contact: ContactData;
  personal: PersonalData;
}

const iconMap: Record<string, React.ReactNode> = {
  email: <Mail className="w-5 h-5" />,
  github: <Github className="w-5 h-5" />,
  linkedin: <Linkedin className="w-5 h-5" />,
  twitter: <Twitter className="w-5 h-5" />,
};

export default function Contact({ contact, personal }: ContactProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Return null if required data is missing
  if (!contact || (!contact.title && !contact.description) || !personal?.email) {
    return null;
  }

  return (
    <section id="contact" ref={ref} className="relative py-20 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-40 left-20 w-60 h-60 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10">
          {/* Section heading */}
          <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {contact.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {contact.description}
            </p>
          </div>

          {/* Contact cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Email card */}
            <a
              href={`mailto:${personal.email}`}
              className={`group p-8 rounded-lg border border-primary/20 bg-secondary/50 hover:bg-secondary hover:border-primary transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
              style={{ transitionDelay: '0.2s' }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 flex items-center justify-center">
                  {iconMap.email}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">Email</h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors">{personal.email}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-primary ml-auto group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            {/* CTA Card */}
            <button
              onClick={() => {
                const mailtoLink = document.createElement('a');
                mailtoLink.href = `mailto:${personal.email}?subject=Let's Work Together`;
                mailtoLink.click();
              }}
              className={`group p-8 rounded-lg border border-accent/20 bg-gradient-to-br from-accent/20 to-accent/5 hover:border-accent hover:bg-accent/10 transition-all duration-500 transform hover:scale-105 hover:shadow-lg hover:shadow-accent/20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
              style={{ transitionDelay: '0.3s' }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-accent/20 group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">Send Message</h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors">Get in touch directly</p>
                </div>
                <ArrowRight className="w-5 h-5 text-accent ml-auto group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          {/* Social links */}
          <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.4s' }}>
            <p className="text-muted-foreground mb-6">Follow me on social media</p>
            <div className="flex justify-center gap-4 flex-wrap">
              {contact.socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-lg bg-secondary/50 border border-primary/20 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-primary/30 group"
                  title={link.platform}
                >
                  <div className="group-hover:rotate-12 transition-transform">{iconMap[link.icon.toLowerCase()] || <Github className="w-5 h-5" />}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className={`text-center mt-16 pt-12 border-t border-primary/20 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.5s' }}>
            <p className="text-muted-foreground mb-6">Interested in working together?</p>
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105 active:scale-95 group"
            >
              Start a Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
