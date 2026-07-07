import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { FadeInSection } from '../components/ui/FadeInSection';

const CATEGORIES = ['All', 'E-Commerce', 'Travel', 'DevOps'];

const STUDIES = [
  {
    id: 1,
    title: "Aliteapexcart",
    category: "E-Commerce",
    desc: "Engineered a high-performance, SEO-optimized headless e-commerce store with modern cart architecture and instant checkout.",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=600&q=80",
    tags: ["React", "Next.js", "Tailwind CSS", "Stripe", "GraphQL"]
  },
  {
    id: 2,
    title: "Inbind Technologies",
    category: "DevOps",
    desc: "Designed and implemented a secure B2B identity management portal and API gateway handling high-throughput service routing.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    tags: ["Node.js", "OAuth 2.0", "Docker", "Nginx", "Redis"]
  },
  {
    id: 3,
    title: "Heaven11 Holidays",
    category: "Travel",
    desc: "Developed a premium travel booking portal featuring dynamic packaging, interactive itineraries, and automated reservation syncing.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    tags: ["React", "FastAPI", "PostgreSQL", "Maps API", "Stripe"]
  },
  {
    id: 4,
    title: "Wonderwish Holidays",
    category: "Travel",
    desc: "Built a customized holiday planner and agent dashboard with real-time room availability checks and payment gateways.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80",
    tags: ["Vue.js", "Node.js", "MongoDB", "Express", "S3"]
  },
  {
    id: 5,
    title: "Jilla Clothing and Textile",
    category: "E-Commerce",
    desc: "Constructed an automated inventory sync and wholesale B2B ordering portal for a major textile manufacturer.",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80",
    tags: ["TypeScript", "Next.js", "Node.js", "Prisma", "MySQL"]
  }
];

export const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const shouldReduceMotion = useReducedMotion();

  // Filter logic
  const filteredStudies = selectedCategory === 'All'
    ? STUDIES
    : STUDIES.filter(study => study.category === selectedCategory);

  const cardVariants = {
    hidden: (idx: number) => {
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
        delay: shouldReduceMotion ? 0 : (idx % 3) * 0.1,
      },
    }),
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.25, ease: "easeIn" as const }
    }
  };

  return (
    <div className="w-full pt-28 pb-16 bg-transparent relative z-10">
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
            <div className="bg-linear-to-b from-bg_secondary/95 to-bg_secondary/90 text-text_primary rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch border border-border_custom/60 shadow-card_default hover:shadow-[0_10px_30px_rgba(5,8,22,0.5)] transition-[border-color,box-shadow] duration-300">
              <div className="lg:col-span-6 relative min-h-[250px] sm:min-h-[300px] lg:min-h-full bg-neutral-950">
                <img 
                  src={STUDIES[0].image}
                  alt={STUDIES[0].title}
                  className="absolute inset-0 object-cover w-full h-full opacity-70"
                  loading="lazy"
                />
              </div>
              <div className="lg:col-span-6 p-8 md:p-12 text-left space-y-6 flex flex-col justify-center">
                <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-secondary">
                  FEATURED SPOTLIGHT
                </span>
                <h2 className="font-heading font-extrabold text-2xl md:text-3xl leading-tight text-text_primary">
                  {STUDIES[0].title}
                </h2>
                <p className="text-sm md:text-base text-text_primary/95 leading-relaxed font-medium">
                  {STUDIES[0].desc}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {STUDIES[0].tags.map((tag, idx) => (
                    <span key={idx} className="bg-surface/60 text-text_primary text-xs px-3 py-1 rounded-sm font-semibold border border-border_custom/60">
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
              {filteredStudies.map((study, idx) => (
                <motion.div
                  key={study.id}
                  layout={!shouldReduceMotion}
                  custom={idx}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={cardVariants}
                  whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.015 }}
                  className="h-full"
                >
                  <div className="relative group h-full flex flex-col justify-between overflow-hidden bg-linear-to-b from-bg_secondary/95 to-bg_secondary/90 border border-border_custom/60 hover:border-secondary/50 rounded-lg shadow-card_default hover:shadow-[0_10px_30px_rgba(5,8,22,0.5)] transition-[border-color,box-shadow] duration-300">
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
                        <h3 className="font-heading font-extrabold text-xl text-text_primary leading-tight group-hover:text-secondary transition-colors duration-200">
                          {study.title}
                        </h3>
                        <p className="text-xs md:text-sm text-text_secondary leading-relaxed font-medium">
                          {study.desc}
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-6 pt-0 mt-auto">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {study.tags.map((tag, idx) => (
                          <span key={idx} className="bg-surface/60 text-text_primary text-[10px] font-semibold px-2 py-0.5 rounded-sm border border-border_custom/60">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="border-t border-divider pt-4 flex justify-between items-center text-xs font-bold text-text_primary group-hover:text-secondary transition-colors">
                        <span>View technical details</span>
                        <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
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
