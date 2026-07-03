import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Code, Laptop, Smartphone, Cloud, Layout, Cpu, ChevronRight, Check } from 'lucide-react';
import { TRANSITIONS } from '../lib/motion';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { FadeInSection, FadeInItem } from '../components/ui/FadeInSection';
import { Magnetic } from '../components/ui/Magnetic';
import { StatsCounter } from '../components/StatsCounter';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { TestimonialCarousel } from '../components/TestimonialCarousel';
import h1Video from '../assets/h1.mp4';

const LOGOS = ['Google', 'Microsoft', 'AWS', 'Stripe', 'Airbnb', 'HubSpot', 'Shopify'];

const SERVICES = [
  {
    icon: <Code className="w-8 h-8 text-secondary" />,
    title: "Custom Software Development",
    description: "Tailored enterprise solutions built to solve your unique complexity, designed for stability, efficiency, and long-term scale."
  },
  {
    icon: <Laptop className="w-8 h-8 text-secondary" />,
    title: "Web Application Development",
    description: "Highly interactive, dynamic, and responsive web portals built with modern frameworks and pixel-perfect design aesthetics."
  },
  {
    icon: <Smartphone className="w-8 h-8 text-secondary" />,
    title: "Mobile App Development",
    description: "Native iOS and Android user experiences engineered with cross-platform excellence and smooth, native-feeling animations."
  },
  {
    icon: <Cloud className="w-8 h-8 text-secondary" />,
    title: "Cloud & DevOps",
    description: "Kubernetes, CI/CD pipelines, and serverless architectures engineered to keep your deployment cycle fast, secure, and zero-downtime."
  },
  {
    icon: <Layout className="w-8 h-8 text-secondary" />,
    title: "UI/UX Design",
    description: "User-centric design thinking combined with robust wireframing, high-fidelity prototypes, and sleek modern style systems."
  },
  {
    icon: <Cpu className="w-8 h-8 text-secondary" />,
    title: "AI & Data Engineering",
    description: "Harness LLMs, predictive modeling, and pipeline analytics to transform raw data points into actionable executive insights."
  }
];

const CASE_STUDIES = [
  {
    title: "FinTech Transaction Engine",
    category: "FinTech / Scaling",
    desc: "Designed and engineered an elite transaction router processing 10k TPS with sub-10ms latency.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
  },
  {
    title: "IoT Diagnostics Portal",
    category: "IoT / Cloud Solutions",
    desc: "Built a real-time tracking dashboard handling 50k concurrent connected edge devices.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
  }
];

export const Home: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  
  // 1. Scroll-driven responsive values
  const { scrollY, scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.7]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.97]);
  const scrollCueOpacity = useTransform(scrollY, [0, 100], [0.4, 0]);

  // 2. Mouse-reactive Parallax Motion Values (Desktop fine pointer only)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches || shouldReduceMotion) return;

    const handlePointerMove = (e: PointerEvent) => {
      const xVal = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const yVal = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      mouseX.set(xVal);
      mouseY.set(yVal);
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [shouldReduceMotion]);

  // Parallax mappings
  const bgBlob1X = useTransform(smoothMouseX, (x) => (x as number) * -16);
  const bgBlob1Y = useTransform([smoothMouseY, scrollYProgress], ([y, s]) => (y as number) * -16 + (s as number) * 120);

  const bgBlob2X = useTransform(smoothMouseX, (x) => (x as number) * 16);
  const bgBlob2Y = useTransform([smoothMouseY, scrollYProgress], ([y, s]) => (y as number) * 16 + (s as number) * -100);

  const cardsParallaxX = useTransform(smoothMouseX, (x) => (x as number) * -8);
  const cardsParallaxY = useTransform(smoothMouseY, (y) => (y as number) * -8);

  // 3. Interactive Stacked Cards State (reordering on click)
  const [cards, setCards] = useState([
    { id: 'devops', title: "CI/CD & Kubernetes", detail: "Automated scaling infrastructure.", tag: "DevOps" },
    { id: 'architecture', title: "Architecture Design", detail: "Robust diagrams before code.", tag: "Planning" },
    { id: 'development', title: "Elite Development", detail: "Senior TypeScript engineers.", tag: "Execution" }
  ]);

  const bringToFront = (id: string) => {
    if (shouldReduceMotion) return;
    setCards((prev) => {
      const targetCard = prev.find((c) => c.id === id);
      if (!targetCard) return prev;
      const rest = prev.filter((c) => c.id !== id);
      return [...rest, targetCard];
    });
  };

  const cardRotations = [-4, 0, 4];
  const cardZIndices = [10, 20, 30];
  const cardTranslatesX = [-12, 0, 12];

  const headlineWords = "Engineering Scalable Software for Ambitious Businesses".split(' ');

  return (
    <div className="w-full bg-bg_primary relative">
      {/* Global Background Video (Fixed/Sticky) */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20"
        >
          <source src={h1Video} type="video/mp4" />
        </video>
        {/* Global Dark overlay to ensure readability */}
        <div className="absolute inset-0 bg-bg_primary/75" />
      </div>

      {/* 1. HERO SECTION */}
      <section 
        ref={heroRef}
        className="relative z-10 min-h-svh w-full flex items-center justify-center bg-transparent overflow-hidden pt-24 pb-12"
      >
        {/* Soft-blurred background gradient shapes (with mouse parallax + scroll drift) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div
            style={{ x: bgBlob1X, y: bgBlob1Y }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.08, 0.12, 0.08],
            }}
            transition={{ 
              duration: 12, 
              ease: 'easeInOut', 
              repeat: Infinity,
              delay: 0.3
            } as any}
            className="absolute top-1/4 right-[-10%] w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-primary/20 blur-[80px] md:blur-[120px]"
          />
          <motion.div
            style={{ x: bgBlob2X, y: bgBlob2Y }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.06, 0.1, 0.06],
            }}
            transition={{ 
              duration: 15, 
              ease: 'easeInOut', 
              repeat: Infinity,
              delay: 0.5 
            } as any}
            className="absolute bottom-1/4 left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-secondary/20 blur-[80px] md:blur-[120px] hidden md:block"
          />
        </div>

        {/* Scroll-Progress reactive layout container */}
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="max-w-[1280px] mx-auto px-4 md:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left"
        >
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: TRANSITIONS.ease } as any}
              className="text-xs md:text-sm font-heading font-extrabold uppercase tracking-[0.15em] text-secondary"
            >
              SOFTWARE ENGINEERING PARTNER
            </motion.div>

            {/* Headline with Mask Reveal & Gradient Shimmer */}
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-text_primary leading-[1.1] tracking-tight">
              {headlineWords.map((word, idx) => {
                const isHighlight = word === "Scalable" || word === "Software";
                return (
                  <span key={idx} className="text-mask-wrapper mr-2.5 md:mr-3.5 py-1">
                    <motion.span
                      custom={idx}
                      initial={shouldReduceMotion ? { opacity: 0 } : { y: '100%' }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        y: { type: 'spring' as const, stiffness: 220, damping: 22, delay: idx * 0.04 },
                        opacity: { duration: 0.2, delay: idx * 0.04 }
                      } as any}
                      className={`inline-block origin-bottom ${
                        isHighlight 
                          ? 'bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-shimmer' 
                          : ''
                      }`}
                    >
                      {word}
                    </motion.span>
                  </span>
                );
              })}
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: TRANSITIONS.ease, delay: 0.35 } as any}
              className="text-base md:text-lg text-text_secondary max-w-[560px] leading-relaxed"
            >
              We design, build, and deploy elite digital products for ambitious enterprises. Transform your business workflows with high-performance engineering.
            </motion.p>

            {/* CTA Group */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: TRANSITIONS.ease, delay: 0.45 } as any}
              className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-2"
            >
              <Magnetic>
                <Button to="/contact" variant="primary" className="w-full sm:w-auto">
                  Start a Project
                </Button>
              </Magnetic>
              <Button to="/portfolio" variant="ghost" className="flex items-center justify-center space-x-1.5 cursor-pointer text-text_primary hover:text-secondary transition-colors">
                <span>See our work</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>

          {/* Right Cards Column (with mouse parallax) */}
          <motion.div 
            style={{ x: cardsParallaxX, y: cardsParallaxY }}
            className="lg:col-span-5 flex justify-center items-center relative min-h-[300px]"
          >
            {/* Desktop: Fanned interactive stacked cards */}
            <div className="hidden sm:block relative w-[320px] h-[280px]">
              {cards.map((card, idx) => {
                return (
                  <motion.div
                    key={card.id}
                    layout
                    onClick={() => bringToFront(card.id)}
                    style={{ zIndex: cardZIndices[idx] }}
                    animate={{ 
                      rotate: cardRotations[idx],
                      x: cardTranslatesX[idx]
                    }}
                    whileHover={{ 
                      scale: 1.04, 
                      rotate: 0,
                      zIndex: 40,
                      transition: { duration: 0.2 }
                    }}
                    transition={{ type: 'spring' as const, stiffness: 200, damping: 20 }}
                    className="absolute inset-0 bg-card_bg border border-border_custom p-8 rounded-lg shadow-card_default hover:shadow-card_hover flex flex-col justify-between text-left cursor-pointer"
                  >
                    <div className="space-y-4">
                      <span className="bg-secondary/10 text-secondary text-xs font-heading font-extrabold px-3 py-1 rounded-pill uppercase tracking-wider">
                        {card.tag}
                      </span>
                      <h3 className="font-heading font-extrabold text-2xl text-text_primary mt-2">
                        {card.title}
                      </h3>
                      <p className="text-sm text-text_muted">
                        {card.detail}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 text-secondary text-xs font-semibold">
                      <span>Click to swap</span>
                      <Check className="w-4 h-4" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile: Single Static Card layout */}
            <div className="block sm:hidden w-full max-w-sm">
              <Card className="text-left space-y-4 bg-card_bg border-border_custom">
                <span className="bg-secondary/10 text-secondary text-xs font-heading font-extrabold px-3 py-1 rounded-pill uppercase tracking-wider">
                  Enterprise Grade
                </span>
                <h3 className="font-heading font-extrabold text-xl text-text_primary">
                  Elite Software Engineering
                </h3>
                <p className="text-sm text-text_muted">
                  Custom-tailored software systems designed, built, and supported by industry specialists.
                </p>
              </Card>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Cue */}
        <motion.div
          style={{ opacity: scrollCueOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 pointer-events-none"
        >
          <span className="text-[10px] md:text-xs font-heading font-bold uppercase tracking-[0.2em] text-text_muted">
            Scroll to explore
          </span>
          <div className="w-[1.5px] h-10 bg-surface relative overflow-hidden rounded-full">
            <motion.div
              animate={{ 
                y: shouldReduceMotion ? 0 : [-40, 40] 
              }}
              transition={{ 
                duration: 2, 
                ease: 'easeInOut', 
                repeat: Infinity 
              }}
              className="absolute top-0 left-0 w-full h-1/2 bg-secondary"
            />
          </div>
        </motion.div>
      </section>

      {/* 2. TRUST BAR / LOGO MARQUEE */}
      <section className="relative z-10 bg-bg_secondary py-8 border-y border-divider overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <p className="text-xs text-text_muted font-semibold uppercase tracking-widest text-center mb-6">
            Trusted by engineers and builders at leading organizations
          </p>
          <div className="flex w-full overflow-hidden relative">
            <div className="flex space-x-16 animate-marquee whitespace-nowrap min-w-full justify-around items-center opacity-40 hover:opacity-75 transition-opacity duration-300">
              {LOGOS.map((logo, index) => (
                <span 
                  key={index}
                  className="font-heading font-extrabold text-lg md:text-xl text-text_secondary hover:text-text_primary transition-colors cursor-default"
                >
                  {logo}
                </span>
              ))}
              {LOGOS.map((logo, index) => (
                <span 
                  key={`dup-${index}`}
                  className="font-heading font-extrabold text-lg md:text-xl text-text_secondary hover:text-text_primary transition-colors cursor-default"
                >
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICES GRID */}
      <section className="relative z-10 py-20 md:py-28 bg-transparent border-b border-divider">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
          <FadeInSection className="max-w-xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-secondary">
              OUR EXPERTISE
            </span>
            <h2 className="font-heading font-extrabold text-3xl md:text-4.5xl text-text_primary leading-tight">
              Elite Engineering for Modern Enterprises
            </h2>
            <p className="text-sm md:text-base text-text_secondary">
              We align deep technical domain knowledge with sleek aesthetics to deliver robust digital architectures.
            </p>
          </FadeInSection>

          {/* Reusable FadeInSection parent with stagger enabled */}
          <FadeInSection stagger={true} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-left">
            {SERVICES.map((service, index) => (
              <FadeInItem key={index}>
                <Card className="h-full flex flex-col justify-between group bg-card_bg border-border_custom">
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-md bg-secondary/5 flex items-center justify-center mb-6 group-hover:bg-secondary/10 transition-colors">
                      {service.icon}
                    </div>
                    <h3 className="font-heading font-extrabold text-lg md:text-xl text-text_primary">
                      {service.title}
                    </h3>
                    <p className="text-sm text-text_muted leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="pt-6 mt-6 border-t border-divider">
                    <NavLink to="/services" className="inline-flex items-center text-xs font-semibold text-secondary hover:text-secondary_hover transition-colors group/link">
                      <span>Learn more details</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                    </NavLink>
                  </div>
                </Card>
              </FadeInItem>
            ))}
          </FadeInSection>
        </div>
      </section>

      {/* 4. STATS COUNTER */}
      <section className="relative z-10 py-16 md:py-20 bg-bg_secondary border-b border-divider">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <FadeInSection>
            <StatsCounter />
          </FadeInSection>
        </div>
      </section>

      {/* 5. PROCESS/HOW WE WORK */}
      <section className="relative z-10 py-20 md:py-28 bg-transparent border-b border-divider overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <FadeInSection className="max-w-xl mx-auto space-y-4 text-center mb-16">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-secondary">
              DEVELOPMENT CYCLE
            </span>
            <h2 className="font-heading font-extrabold text-3xl md:text-4.5xl text-text_primary leading-tight">
              Our Structured Engineering Process
            </h2>
            <p className="text-sm md:text-base text-text_secondary">
              How we scale a product from zero to deployment while keeping stakeholders completely informed.
            </p>
          </FadeInSection>

          <ProcessTimeline />
        </div>
      </section>

      {/* 6. FEATURED CASE STUDIES */}
      <section className="relative z-10 py-20 md:py-28 bg-bg_secondary border-b border-divider">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16">
            <FadeInSection className="space-y-4 text-left max-w-lg">
              <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-secondary">
                SUCCESS STORIES
              </span>
              <h2 className="font-heading font-extrabold text-3xl md:text-4.5xl text-text_primary leading-tight">
                Projects built for production stability
              </h2>
            </FadeInSection>
            <FadeInSection delay={0.1}>
              <Button to="/portfolio" variant="secondary" className="mt-4 md:mt-0">
                View All Case Studies
              </Button>
            </FadeInSection>
          </div>

          <FadeInSection stagger={true} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {CASE_STUDIES.map((study, index) => (
              <FadeInItem key={index}>
                <Card className="p-0 group cursor-pointer overflow-hidden border border-border_custom bg-card_bg">
                  <div className="relative aspect-video w-full overflow-hidden bg-surface">
                    <img 
                      src={study.image} 
                      alt={study.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-neutral-950/80 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6 md:p-8 space-y-4 text-left">
                    <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-secondary">
                      {study.category}
                    </span>
                    <h3 className="font-heading font-extrabold text-xl md:text-2xl text-text_primary">
                      {study.title}
                    </h3>
                    <p className="text-sm md:text-base text-text_muted leading-relaxed">
                      {study.desc}
                    </p>
                    <div className="pt-2">
                      <span className="inline-flex items-center text-sm font-semibold text-text_primary group-hover:text-secondary transition-colors">
                        <span>Read technical breakdown</span>
                        <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Card>
              </FadeInItem>
            ))}
          </FadeInSection>
        </div>
      </section>

      {/* 7. CLIENT TESTIMONIALS */}
      <section className="relative z-10 py-20 md:py-28 bg-bg_primary border-b border-divider">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
          <FadeInSection className="max-w-xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-secondary">
              TESTIMONIALS
            </span>
            <h2 className="font-heading font-extrabold text-3xl md:text-4.5xl text-text_primary leading-tight">
              What our business partners say
            </h2>
            <p className="text-sm md:text-base text-text_secondary">
              Read how our engineers helped firms scale infrastructure and ship clean product cycles.
            </p>
          </FadeInSection>

          <FadeInSection>
            <TestimonialCarousel />
          </FadeInSection>
        </div>
      </section>

      {/* 8. CLOSING CTA BANNER */}
      <section className="relative z-10 py-20 md:py-28 bg-bg_secondary text-text_primary overflow-hidden border-t border-divider">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/20 blur-[120px]" />
        </div>
        
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center relative z-10 space-y-8">
          <FadeInSection className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-heading font-extrabold uppercase tracking-[0.2em] text-secondary">
              GET IN TOUCH
            </span>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl leading-tight text-text_primary">
              Ready to engineer your next software solution?
            </h2>
            <p className="text-sm md:text-lg text-text_secondary max-w-xl mx-auto leading-relaxed">
              We align senior developers, rigorous design frameworks, and agile management to scale your operations.
            </p>
          </FadeInSection>

          <FadeInSection delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Magnetic>
                <Button to="/contact" variant="primary" className="bg-primary hover:bg-primary_hover text-text_primary shadow-lg px-8 py-4">
                  Start a Project
                </Button>
              </Magnetic>
              <Button to="/about" variant="ghost" className="text-text_primary hover:bg-surface/50 px-8 py-4">
                About our team
              </Button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};
export default Home;
