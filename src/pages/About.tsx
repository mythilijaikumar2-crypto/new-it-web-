import React from 'react';
import { Target, Eye, Shield, Users, Trophy } from 'lucide-react';
import { FadeInSection } from '../components/ui/FadeInSection';
import { motion, useReducedMotion } from 'framer-motion';

const TEAM = [
  {
    name: "Alex Sterling",
    role: "CEO & Founder",
    bio: "Former Principal Architect at Google with 15+ years scaling web infrastructure.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Elena Rostova",
    role: "Head of Design",
    bio: "Award-winning designer passionate about building sleek, accessible client systems.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Marcus Vance",
    role: "Director of DevOps",
    bio: "Kubernetes core contributor specializing in automated zero-downtime scaling systems.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80"
  }
];

const VALUES = [
  {
    icon: <Shield className="w-6 h-6 text-secondary" />,
    title: "Rigorous Standards",
    description: "We don't cut corners. Our code compiles under strict types and goes through exhaustive regression tests."
  },
  {
    icon: <Users className="w-6 h-6 text-secondary" />,
    title: "Radical Transparency",
    description: "Clients have access to our direct Jira boards, Slack channels, and code repositories from day one."
  },
  {
    icon: <Trophy className="w-6 h-6 text-secondary" />,
    title: "Client Success First",
    description: "We measure our engineering performance by the business results and uptime delivered to clients."
  }
];

const MILESTONES = [
  { year: "2021", title: "Ascope Founded", desc: "Started with 3 senior engineers targeting high-load SaaS platforms." },
  { year: "2023", title: "Scale to 30+ Team Members", desc: "Established dedicated UI/UX Design and DevOps departments." },
  { year: "2025", title: "Global Expansion", desc: "Opened new engineering hubs in California and Eastern Europe." }
];

export const About: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

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
        delay: shouldReduceMotion ? 0 : (idx % 3) * 0.1 + Math.floor(idx / 3) * 0.05,
      },
    }),
  };

  return (
    <div className="w-full pt-28 pb-16 bg-transparent relative z-10">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 space-y-24">
        
        {/* Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeInSection className="space-y-6 text-left">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-secondary">
              ABOUT ASCOPE TECH
            </span>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-text_primary leading-tight">
              Engineering solutions for complex problems
            </h1>
            <p className="text-base md:text-lg text-text_secondary leading-relaxed">
              Founded in 2021, Ascope Tech was built on a simple premise: businesses deserve elite software engineering without the overhead of massive legacy consulting firms.
            </p>
            <p className="text-sm md:text-base text-text_secondary leading-relaxed font-medium">
              We recruit senior talent, enforce strict TypeScript standards, and maintain automated regression pipelines. Our mission is to serve as an extension of your product team—writing code that stands up to production loads and lasts for years.
            </p>
          </FadeInSection>
          <FadeInSection delay={0.2} className="relative aspect-video rounded-lg overflow-hidden bg-surface shadow-card_default">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
              alt="Ascope Team Collaboration" 
              className="w-full h-full object-cover opacity-80"
              loading="lazy"
            />
          </FadeInSection>
        </section>

        {/* Mission & Vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden py-2">
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={cardVariants}
            whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.01 }}
            transition={{ type: "tween" as const, ease: "easeOut" as const, duration: 0.2 }}
            className="text-left h-full"
          >
            <div className="h-full flex flex-col items-start space-y-4 bg-gradient-to-b from-bg_secondary/95 to-bg_secondary/90 border border-border_custom/60 rounded-lg p-6 md:p-8 shadow-card_default hover:shadow-[0_10px_30px_rgba(5,8,22,0.5)] transition-[border-color,box-shadow] duration-300">
              <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center border border-primary/20">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h2 className="font-heading font-extrabold text-2xl text-text_primary">
                Our Mission
              </h2>
              <p className="text-sm md:text-base text-text_secondary leading-relaxed font-medium">
                To build high-performance software systems that empower ambitious businesses to scale. We deliver clean architecture, clear documentation, and bulletproof deployment pipelines.
              </p>
            </div>
          </motion.div>

          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={cardVariants}
            whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.01 }}
            transition={{ type: "tween" as const, ease: "easeOut" as const, duration: 0.2 }}
            className="text-left h-full"
          >
            <div className="h-full flex flex-col items-start space-y-4 bg-gradient-to-b from-bg_secondary/95 to-bg_secondary/90 border border-border_custom/60 rounded-lg p-6 md:p-8 shadow-card_default hover:shadow-[0_10px_30px_rgba(5,8,22,0.5)] transition-[border-color,box-shadow] duration-300">
              <div className="w-12 h-12 rounded-md bg-secondary/10 flex items-center justify-center border border-secondary/20">
                <Eye className="w-6 h-6 text-secondary" />
              </div>
              <h2 className="font-heading font-extrabold text-2xl text-text_primary">
                Our Vision
              </h2>
              <p className="text-sm md:text-base text-text_secondary leading-relaxed font-medium">
                To become the global standard for custom product development—known for engineering rigor, transparent project workflows, and outstanding visual execution.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Values */}
        <section className="space-y-12">
          <FadeInSection className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-secondary">
              OUR CORE PRINCIPLES
            </span>
            <h2 className="font-heading font-extrabold text-3xl text-text_primary">
              The values driving our engineering
            </h2>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left overflow-hidden py-2">
            {VALUES.map((val, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.015 }}
                transition={{ type: "tween" as const, ease: "easeOut" as const, duration: 0.2 }}
                className="h-full"
              >
                <div className="group h-full space-y-4 bg-gradient-to-b from-bg_secondary/95 to-bg_secondary/90 border border-border_custom/60 hover:border-secondary/50 rounded-lg p-6 md:p-8 shadow-card_default hover:shadow-[0_10px_30px_rgba(5,8,22,0.5)] transition-[border-color,box-shadow] duration-300">
                  <div className="w-12 h-12 rounded-md bg-secondary/10 flex items-center justify-center border border-secondary/20 group-hover:bg-secondary/20 transition-colors duration-200">
                    {val.icon}
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-text_primary group-hover:text-secondary transition-colors duration-200">
                    {val.title}
                  </h3>
                  <p className="text-sm text-text_secondary leading-relaxed font-medium">
                    {val.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Grid */}
        <section className="space-y-12">
          <FadeInSection className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-secondary">
              EXECUTIVE LEADERSHIP
            </span>
            <h2 className="font-heading font-extrabold text-3xl text-text_primary">
              Meet our engineering experts
            </h2>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left overflow-hidden py-2">
            {TEAM.map((member, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.015 }}
                transition={{ type: "tween" as const, ease: "easeOut" as const, duration: 0.2 }}
                className="h-full"
              >
                <div className="group h-full flex flex-col overflow-hidden bg-gradient-to-b from-bg_secondary/95 to-bg_secondary/90 border border-border_custom/60 hover:border-secondary/50 rounded-lg shadow-card_default hover:shadow-[0_10px_30px_rgba(5,8,22,0.5)] transition-[border-color,box-shadow] duration-300">
                  <div className="aspect-4/3 w-full bg-surface overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 space-y-2 grow">
                    <h3 className="font-heading font-extrabold text-xl text-text_primary group-hover:text-secondary transition-colors duration-200">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-secondary uppercase tracking-wider">
                      {member.role}
                    </p>
                    <p className="text-sm text-text_secondary leading-relaxed pt-2 font-medium">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline milestones */}
        <section className="py-12 border-t border-divider">
          <FadeInSection className="text-center space-y-4 max-w-xl mx-auto mb-16">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-secondary">
              COMPANY TIMELINE
            </span>
            <h2 className="font-heading font-extrabold text-3xl text-text_primary">
              Our Journey Over The Years
            </h2>
          </FadeInSection>

          <div className="relative max-w-[800px] mx-auto text-left">
            <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-0.5 bg-divider -translate-x-1/2" />
            
            <div className="space-y-12">
              {MILESTONES.map((stone, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={idx} className={`relative flex flex-col md:flex-row items-start justify-between w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    <div className="hidden md:block w-[45%]" />
                    <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-secondary border-4 border-bg_primary -translate-x-1/2 z-10 shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                    
                    <FadeInSection className="w-full md:w-[45%] pl-12 md:pl-0">
                      <div className="bg-gradient-to-b from-bg_secondary/95 to-bg_secondary/90 border border-border_custom/60 p-6 rounded-lg shadow-card_default hover:shadow-[0_8px_20px_rgba(5,8,22,0.4)] transition-[border-color,box-shadow] duration-300">
                        <span className="font-heading font-extrabold text-lg text-secondary">
                          {stone.year}
                        </span>
                        <h4 className="font-heading font-extrabold text-base text-text_primary mt-1">
                          {stone.title}
                        </h4>
                        <p className="text-sm text-text_secondary mt-2 leading-relaxed font-medium">
                          {stone.desc}
                        </p>
                      </div>
                    </FadeInSection>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
export default About;
