'use client';

import { useEffect, useRef, useState } from 'react';

interface AboutData {
  description: string[];
  skills: string[];
}

export default function About({ about }: { about: AboutData }) {
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
  if (!about || (!about.description?.length && !about.skills?.length)) {
    return null;
  }

  return (
    <section id="about" ref={ref} className="relative py-20 md:py-32 px-6 bg-secondary/5">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className={`mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Description */}
          <div className={`space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '0.2s' }}>
            {about.description.map((paragraph, index) => (
              <p key={index} className="text-lg text-muted-foreground leading-relaxed hover:text-foreground transition-colors">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Skills */}
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '0.4s' }}>
            <h3 className="text-2xl font-bold mb-8">Key Skills</h3>
            <div className="grid grid-cols-2 gap-4">
              {about.skills.map((skill, index) => (
                <div
                  key={index}
                  className="group p-4 rounded-lg bg-secondary/50 border border-primary/20 hover:border-primary hover:bg-primary/10 transition-all duration-300 transform hover:scale-105 cursor-default"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{skill}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
