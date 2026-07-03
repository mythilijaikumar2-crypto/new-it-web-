import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FadeInSection } from '../components/ui/FadeInSection';

const CATEGORIES = ['All', 'FinTech', 'IoT', 'DevOps', 'AI'];

const STUDIES = [
  {
    id: 1,
    title: "FinTech Transaction Engine",
    category: "FinTech",
    desc: "Designed and engineered an elite transaction router processing 10k TPS with sub-10ms latency.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    tags: ["Go", "Kafka", "AWS", "Redis"]
  },
  {
    id: 2,
    title: "IoT Diagnostics Portal",
    category: "IoT",
    desc: "Built a real-time tracking dashboard handling 50k concurrent connected edge devices.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    tags: ["React", "Node.js", "Kubernetes", "MQTT"]
  },
  {
    id: 3,
    title: "SaaS Multi-Tenant Pipeline",
    category: "DevOps",
    desc: "Automated a multi-tenant isolation builder, slashing pipeline provisioning time from hours to under 3 minutes.",
    image: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=600&q=80",
    tags: ["Terraform", "GitHub Actions", "Docker", "GCP"]
  },
  {
    id: 4,
    title: "Neural Document Parser",
    category: "AI",
    desc: "Integrated custom optical semantic layers to parse commercial credit applications automatically.",
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=600&q=80",
    tags: ["Python", "PyTorch", "FastAPI", "Postgres"]
  },
  {
    id: 5,
    title: "High-Load Trading Terminal",
    category: "FinTech",
    desc: "Built responsive sub-second candlestick rendering and order placement grids for active market makers.",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=600&q=80",
    tags: ["TypeScript", "Next.js", "WebSockets", "Rust"]
  }
];

export const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const shouldReduceMotion = useReducedMotion();

  // Filter logic
  const filteredStudies = selectedCategory === 'All'
    ? STUDIES
    : STUDIES.filter(study => study.category === selectedCategory);

  return (
    <div className="w-full pt-28 pb-16 bg-bg_primary">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 space-y-20">
        
        {/* Header section */}
        <section className="text-left max-w-2xl space-y-4">
          <FadeInSection className="space-y-4">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-secondary">
              CASE STUDIES
            </span>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-text_primary leading-tight">
              Our proven engineering track record
            </h1>
            <p className="text-base md:text-lg text-text_secondary leading-relaxed">
              Explore the technical details and architecture choices behind our custom-built products.
            </p>
          </FadeInSection>
        </section>

        {/* Featured spotlight card */}
        <section className="w-full">
          <FadeInSection>
            <div className="bg-bg_secondary text-text_primary rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center border border-border_custom shadow-card_hover">
              <div className="lg:col-span-6 relative aspect-video lg:h-full bg-neutral-950">
                <img 
                  src={STUDIES[0].image}
                  alt={STUDIES[0].title}
                  className="object-cover w-full h-full opacity-60"
                  loading="lazy"
                />
              </div>
              <div className="lg:col-span-6 p-8 md:p-12 text-left space-y-6">
                <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-secondary">
                  FEATURED SPOTLIGHT
                </span>
                <h2 className="font-heading font-extrabold text-2xl md:text-3xl leading-tight text-text_primary">
                  {STUDIES[0].title}
                </h2>
                <p className="text-sm md:text-base text-text_secondary leading-relaxed">
                  We built a redundant Kafka transaction ledger in Go that processes live trades under strict compliance constraints. Verified throughput exceeded 10k transactions per second.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {STUDIES[0].tags.map((tag, idx) => (
                    <span key={idx} className="bg-surface text-text_secondary text-xs px-3 py-1 rounded-sm font-semibold border border-border_custom/50">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="pt-4">
                  <Button to="/contact" variant="primary" className="bg-primary hover:bg-primary_hover text-text_primary shadow-lg px-6 py-3">
                    <span>Discuss a similar project</span>
                    <ExternalLink className="w-4 h-4 ml-1.5" />
                  </Button>
                </div>
              </div>
            </div>
          </FadeInSection>
        </section>

        {/* Categories filters */}
        <section className="space-y-12 text-left">
          <FadeInSection>
            <div className="flex flex-wrap items-center gap-2 border-b border-divider pb-6">
              {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`relative px-5 py-2.5 rounded-pill font-heading text-sm font-semibold transition-colors duration-200 cursor-pointer min-h-[44px] ${
                      isActive ? 'text-text_primary' : 'text-text_secondary hover:text-text_primary'
                    }`}
                  >
                    {isActive && !shouldReduceMotion && (
                      <motion.div
                        layoutId="active-category-pill"
                        className="absolute inset-0 bg-primary rounded-pill -z-10"
                        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                      />
                    )}
                    {isActive && shouldReduceMotion && (
                      <span className="absolute inset-0 bg-primary rounded-pill -z-10" />
                    )}
                    <span>{category}</span>
                  </button>
                );
              })}
            </div>
          </FadeInSection>

          {/* Grid list with AnimatePresence */}
          <motion.div 
            layout={!shouldReduceMotion}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredStudies.map((study) => (
                <motion.div
                  key={study.id}
                  layout={!shouldReduceMotion}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-0 group h-full flex flex-col justify-between overflow-hidden bg-card_bg border-border_custom">
                    <div>
                      <div className="relative aspect-video w-full overflow-hidden bg-surface">
                        <img 
                          src={study.image} 
                          alt={study.title}
                          className="object-cover w-full h-full opacity-80 group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-6 space-y-4 text-left">
                        <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                          {study.category}
                        </span>
                        <h3 className="font-heading font-extrabold text-lg text-text_primary leading-tight">
                          {study.title}
                        </h3>
                        <p className="text-xs md:text-sm text-text_muted leading-relaxed">
                          {study.desc}
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-6 pt-0 mt-auto">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {study.tags.map((tag, idx) => (
                          <span key={idx} className="bg-surface text-text_secondary text-[10px] font-semibold px-2 py-0.5 rounded-sm border border-border_custom/40">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="border-t border-divider pt-4 flex justify-between items-center text-xs font-bold text-text_primary group-hover:text-secondary transition-colors">
                        <span>View technical details</span>
                        <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

      </div>
    </div>
  );
};
export default Portfolio;
