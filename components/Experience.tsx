'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface Job {
  id: number;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export default function Experience({ experience }: { experience: Job[] }) {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
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
  if (!experience || !Array.isArray(experience) || experience.length === 0) {
    return null;
  }

  return (
    <section id="experience" ref={ref} className="relative py-20 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className={`mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            Work <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {experience.map((job, index) => (
            <div
              key={job.id}
              className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}
                className="w-full text-left p-6 rounded-lg border border-primary/20 bg-secondary/50 hover:bg-secondary hover:border-primary transition-all duration-300 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{job.position}</h3>
                      <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary/20 text-primary">{job.duration}</span>
                    </div>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <span className="font-semibold">{job.company}</span>
                      <span className="text-xs">•</span>
                      <span className="text-sm">{job.location}</span>
                    </p>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-primary transition-transform duration-300 ${expandedId === job.id ? 'rotate-90' : ''}`} />
                </div>

                {/* Expanded content */}
                {expandedId === job.id && (
                  <div className="mt-6 space-y-4 border-t border-primary/20 pt-6 animate-fade-in-up">
                    <p className="text-muted-foreground">{job.description}</p>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {job.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-3 text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech) => (
                          <span key={tech} className="px-3 py-1 rounded-full text-sm bg-primary/20 text-primary">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
