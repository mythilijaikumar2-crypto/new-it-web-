import React from 'react';
import { Code, Laptop, Smartphone, Cloud, Layout, Cpu, RefreshCw, Calendar, Users2, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Magnetic } from '../components/ui/Magnetic';
import { FadeInSection, FadeInItem } from '../components/ui/FadeInSection';
import { motion, useReducedMotion } from 'framer-motion';

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
  const shouldReduceMotion = useReducedMotion();
  
  const cardVariants = {
    hidden: (idx: number) => {
      // Determine initial slide direction based on grid column
      const xOffset = idx % 3 === 0 ? -40 : idx % 3 === 2 ? 40 : 0;
      const yOffset = idx % 3 === 1 ? 40 : 20;
      return {
        opacity: 0,
        x: xOffset,
        y: yOffset,
      };
    },
    visible: (idx: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "tween" as const,
        ease: "easeOut" as const,
        duration: 0.45,
        delay: shouldReduceMotion ? 0 : (idx % 3) * 0.1 + Math.floor(idx / 3) * 0.06,
      },
    }),
  };

  return (
    <div className="w-full pt-28 pb-16 bg-transparent relative z-10">
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
        <section className="overflow-hidden py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {DETAILED_SERVICES.map((srv, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.01 }}
                transition={{ type: "tween" as const, ease: "easeOut", duration: 0.2 }}
                className="h-full"
              >
                <div className="relative group h-full flex flex-col justify-between bg-gradient-to-b from-bg_secondary/95 to-bg_secondary/90 border border-border_custom/60 hover:border-secondary/50 rounded-lg p-6 md:p-8 shadow-card_default hover:shadow-[0_10px_30px_rgba(5,8,22,0.6)] transition-[border-color,box-shadow] duration-300">
                  {/* Decorative glowing accent bar at the top on hover */}
                  <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="space-y-6">
                    {/* Icon container - stylized with gradient and border */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-secondary/15 to-primary/5 flex items-center justify-center border border-secondary/20 shadow-inner group-hover:from-secondary/25 group-hover:to-primary/15 transition-all duration-300">
                      {srv.icon}
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-heading font-extrabold text-2xl text-text_primary tracking-tight group-hover:text-secondary transition-colors duration-200">
                        {srv.title}
                      </h3>
                      {/* Highly visible text description */}
                      <p className="text-sm text-text_secondary leading-relaxed font-medium">
                        {srv.desc}
                      </p>
                    </div>

                    {/* Bullet Points with Cyan checkmarks and brighter text */}
                    <ul className="space-y-2.5 pt-4 border-t border-divider">
                      {srv.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-center text-sm text-text_primary/95 font-medium">
                          {/* Premium SVG checkmark icon */}
                          <svg className="w-4 h-4 text-secondary mr-2.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
                <div className="h-full flex flex-col justify-between bg-gradient-to-b from-bg_secondary/95 to-bg_secondary/90 border border-border_custom/60 rounded-lg p-6 md:p-8 shadow-card_default hover:shadow-[0_10px_30px_rgba(5,8,22,0.5)] transition-[border-color,box-shadow] duration-300">
                  <div className="space-y-6">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center border border-primary/20">
                      {model.icon}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-heading font-extrabold text-xl text-text_primary">
                        {model.title}
                      </h3>
                      <p className="text-sm text-text_secondary leading-relaxed font-medium">
                        {model.desc}
                      </p>
                    </div>
                  </div>
                  <div className="pt-5 mt-6 border-t border-divider bg-surface/60 p-4 rounded-md">
                    <p className="text-xs font-extrabold text-secondary uppercase tracking-wider mb-1.5">
                      Best For
                    </p>
                    <p className="text-xs text-text_primary leading-relaxed font-semibold">
                      {model.bestFor}
                    </p>
                  </div>
                </div>
              </FadeInItem>
            ))}
          </FadeInSection>
        </section>

        {/* Closing CTA */}
        <section className="relative z-10 bg-bg_secondary/95 border border-border_custom/60 p-8 md:p-12 rounded-lg text-center space-y-6 shadow-card_default">
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
