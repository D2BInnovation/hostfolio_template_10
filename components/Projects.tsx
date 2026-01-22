'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  image: string;
  featured: boolean;
}

export default function Projects({ projects }: { projects: Project[] }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
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
  if (!projects || !Array.isArray(projects) || projects.length === 0) {
    return null;
  }

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" ref={ref} className="relative py-20 md:py-32 px-6 bg-secondary/5">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className={`mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            Featured <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
        </div>

        {/* Featured Projects */}
        <div className="space-y-12 mb-16">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center p-8 rounded-lg border border-primary/20 bg-secondary/50 hover:bg-secondary hover:border-primary transition-all duration-300">
                {/* Project image placeholder */}
                <div className="relative h-80 rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 group-hover:border-primary transition-all duration-300">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-primary to-accent/50 mx-auto mb-4 flex items-center justify-center">
                        <span className="text-3xl font-bold text-primary-foreground">{project.id}</span>
                      </div>
                      <p className="text-muted-foreground text-sm">Project Preview</p>
                    </div>
                  </div>
                </div>

                {/* Project details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-3 py-1 rounded-full text-sm bg-primary/20 text-primary group-hover:bg-primary/30 transition-all">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105 group/link"
                    >
                      <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-2 border border-primary/50 text-foreground rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-8">Other Projects</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {otherProjects.map((project, index) => (
                <div
                  key={project.id}
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${(featuredProjects.length + index) * 100}ms` }}
                >
                  <div className="h-full p-6 rounded-lg border border-primary/20 bg-secondary/50 hover:bg-secondary hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                    <div className="h-40 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 group-hover:border-primary mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <div className="text-center">
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-accent/50 mx-auto flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary-foreground">{project.id}</span>
                        </div>
                      </div>
                    </div>

                    <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{project.title}</h4>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span key={tech} className="px-2 py-1 rounded text-xs bg-primary/20 text-primary">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && <span className="px-2 py-1 rounded text-xs text-muted-foreground">+{project.technologies.length - 3}</span>}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm font-semibold group/link"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-primary/30 text-foreground rounded-lg hover:bg-primary/10 hover:border-primary transition-all duration-300 text-sm font-semibold"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
