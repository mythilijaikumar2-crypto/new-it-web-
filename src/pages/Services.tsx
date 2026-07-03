import React from 'react';
import { Code, Laptop, Smartphone, Cloud, Layout, Cpu, RefreshCw, Calendar, Users2, ArrowRight } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Magnetic } from '../components/ui/Magnetic';
import { FadeInSection, FadeInItem } from '../components/ui/FadeInSection';

const DETAILED_SERVICES = [
  {
    icon: <Code className="w-8 h-8 text-secondary" />,
    title: "Custom Software Development",
    details: ["Enterprise System Integration", "Legacy Application Modernization", "API Design & Development", "Secure Payment Engines"],
    desc: "We engineer performant, custom backend systems and applications tailored exactly to your business's proprietary workflows."
  },
  {
    icon: <Laptop className="w-8 h-8 text-secondary" />,
    title: "Web Application Development",
    details: ["Single Page Applications (SPAs)", "Server-side Rendered (SSR) Systems", "B2B SaaS Portals", "Admin Management Interfaces"],
    desc: "Responsive web architectures built with React, Vite, and high-performance states for flawless user experiences."
  },
  {
    icon: <Smartphone className="w-8 h-8 text-secondary" />,
    title: "Mobile App Development",
    details: ["Cross-Platform React Native", "iOS Swift Engineering", "Android Kotlin Solutions", "App Store Compliance & Deploy"],
    desc: "High-quality, fluid mobile builds that align native hardware access with elegant micro-interactions."
  },
  {
    icon: <Cloud className="w-8 h-8 text-secondary" />,
    title: "Cloud & DevOps Engineering",
    details: ["AWS, GCP, & Azure Infrastructure", "Kubernetes & Docker Orchestration", "Terraform Infrastructure as Code", "Continuous Integration (CI/CD) Pipelines"],
    desc: "Robust automated architectures designed for zero-downtime releases, fast rollbacks, and high cost-efficiency."
  },
  {
    icon: <Layout className="w-8 h-8 text-secondary" />,
    title: "UI/UX Design Systems",
    details: ["User Journey Mapping", "Wireframes & Mockups", "Tailwind Component Design Systems", "A11y (WCAG) Accessibility Auditing"],
    desc: "Modern visual layouts driven by clear usability heuristics, smooth motion curves, and coherent typography styles."
  },
  {
    icon: <Cpu className="w-8 h-8 text-secondary" />,
    title: "AI & Data Engineering",
    details: ["Large Language Model Integration", "Vector Database Operations", "Data Scraping & Structuring Pipelines", "Custom Machine Learning Models"],
    desc: "Deploy smart, data-driven analytical insights and LLM layers directly into your production products."
  }
];

const ENGAGEMENT_MODELS = [
  {
    icon: <Users2 className="w-6 h-6 text-secondary" />,
    title: "Dedicated Squads",
    desc: "A fully-managed engineering team composed of a Tech Lead, Senior Developers, and a UI/UX Designer working exclusively on your product.",
    bestFor: "Building major new products or scaling core SaaS platforms over a long-term roadmap."
  },
  {
    icon: <Calendar className="w-6 h-6 text-secondary" />,
    title: "Project-Based (Fixed Scope)",
    desc: "A defined statement of work with concrete milestones, strict deliverables, and fixed pricing agreed upon before the start.",
    bestFor: "Exploratory MVPs, legacy migrations, or localized integrations with clearly defined outlines."
  },
  {
    icon: <RefreshCw className="w-6 h-6 text-secondary" />,
    title: "Staff Augmentation",
    desc: "Senior engineering talent that joins your existing developer stand-ups directly, reporting to your engineering management.",
    bestFor: "Quickly filling skill gaps, accelerating milestones, or handling sudden scale challenges."
  }
];

export const Services: React.FC = () => {
  return (
    <div className="w-full pt-28 pb-16 bg-bg_primary">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 space-y-24">
        
        {/* Header Hero */}
        <section className="text-left max-w-2xl">
          <FadeInSection className="space-y-4">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-secondary">
              ENGINEERING SERVICES
            </span>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-text_primary leading-tight">
              Elite solutions built for scale and stability
            </h1>
            <p className="text-base md:text-lg text-text_secondary leading-relaxed">
              We design, develop, and automate production environments. Discover how our senior developer expertise can help accelerate your roadmap.
            </p>
          </FadeInSection>
        </section>

        {/* Services List Grid */}
        <section>
          <FadeInSection stagger={true} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {DETAILED_SERVICES.map((srv, idx) => (
              <FadeInItem key={idx}>
                <Card className="h-full flex flex-col justify-between bg-card_bg border-border_custom">
                  <div className="space-y-6">
                    <div className="w-14 h-14 rounded-md bg-secondary/10 flex items-center justify-center">
                      {srv.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-heading font-extrabold text-xl text-text_primary">
                        {srv.title}
                      </h3>
                      <p className="text-sm text-text_muted leading-relaxed">
                        {srv.desc}
                      </p>
                    </div>
                    <ul className="space-y-2 pt-2 border-t border-divider">
                      {srv.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-center text-xs text-text_secondary">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-2 shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </FadeInItem>
            ))}
          </FadeInSection>
        </section>

        {/* Engagement Models */}
        <section className="space-y-12">
          <FadeInSection className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-secondary">
              HOW WE WORK TOGETHER
            </span>
            <h2 className="font-heading font-extrabold text-3xl text-text_primary">
              Flexible engagement models
            </h2>
            <p className="text-sm text-text_secondary">
              Pick the operational structure that fits your internal engineering capacity and budgetary outlines.
            </p>
          </FadeInSection>

          <FadeInSection stagger={true} className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
            {ENGAGEMENT_MODELS.map((model, idx) => (
              <FadeInItem key={idx}>
                <Card className="h-full flex flex-col justify-between bg-card_bg border-border_custom">
                  <div className="space-y-6">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                      {model.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-heading font-extrabold text-lg text-text_primary">
                        {model.title}
                      </h3>
                      <p className="text-sm text-text_muted leading-relaxed">
                        {model.desc}
                      </p>
                    </div>
                  </div>
                  <div className="pt-6 mt-6 border-t border-divider bg-surface/30 p-4 rounded-md">
                    <p className="text-xs font-semibold text-text_muted uppercase tracking-wider mb-1">
                      Best For
                    </p>
                    <p className="text-xs text-text_secondary leading-relaxed font-medium">
                      {model.bestFor}
                    </p>
                  </div>
                </Card>
              </FadeInItem>
            ))}
          </FadeInSection>
        </section>

        {/* Closing CTA */}
        <section className="bg-bg_secondary border border-border_custom p-8 md:p-12 rounded-lg text-center space-y-6">
          <FadeInSection className="max-w-xl mx-auto space-y-4">
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl text-text_primary">
              Need a customized engineering squad?
            </h2>
            <p className="text-sm md:text-base text-text_secondary leading-relaxed">
              We align specific expertise in backend scaling, responsive interfaces, and CI/CD setup to integrate directly with your product roadmap.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.15}>
            <Magnetic>
              <Button to="/contact" variant="primary" className="shadow-lg">
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Magnetic>
          </FadeInSection>
        </section>

      </div>
    </div>
  );
};
export default Services;
