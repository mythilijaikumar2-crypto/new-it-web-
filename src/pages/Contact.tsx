import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, ChevronDown, CheckCircle2, Send, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { FadeInSection } from '../components/ui/FadeInSection';

// Form schema with validation rules
const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(4, { message: 'Subject must be at least 4 characters.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' })
});

type ContactFormData = z.infer<typeof contactSchema>;

const FAQS = [
  {
    question: "What is your typical project onboarding timeline?",
    answer: "For dedicated squads or augmentation, we can usually onboard and kick off sprint sprints in 1-2 weeks. Fixed-scope projects depend on specification complexity but average 2 weeks to align on deliverables."
  },
  {
    question: "Do you sign non-disclosure agreements (NDAs)?",
    answer: "Absolutely. We protect our clients' intellectual property from initial workshops onward. We sign standard corporate NDAs before exchanging any technical configurations."
  },
  {
    question: "What technology stack do you specialize in?",
    answer: "Our core expertise lies in TypeScript (React, Next.js, Node.js), Go (for transaction routers and microservices), Python (for data pipelines and LLM operations), Docker/Kubernetes, and AWS/GCP architectures."
  },
  {
    question: "How do you handle client communication during sprints?",
    answer: "We communicate transparently. You receive shared Slack channels, weekly live demo sessions, and direct view access to our Jira progress boards."
  }
];

export const Contact: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    console.log('Contact form submitted:', data);
    // Mock API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSuccess(true);
    reset();
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx((prev) => (prev === idx ? null : idx));
  };

  const cardVariants = {
    hidden: (idx: number) => {
      const xOffset = idx % 2 === 0 ? -40 : 0;
      const yOffset = idx % 2 === 1 ? 40 : 20;
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
        delay: shouldReduceMotion ? 0 : idx * 0.1,
      },
    }),
  };

  return (
    <div className="w-full pt-28 pb-16 bg-transparent relative z-10">
      {/* Decorative blurred background ambient glow blobs */}
      <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-secondary/5 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none z-0" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 space-y-24 relative z-10">
        
        {/* Main contact layout */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left items-start">
          {/* Info Details column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                <span className="text-xs font-semibold text-green-400 uppercase tracking-widest">
                  Online & Active response (~2 Hrs)
                </span>
              </div>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-text_primary leading-tight">
                Let's construct something together
              </h1>
              <p className="text-sm md:text-base text-text_secondary leading-relaxed">
                Connect with our team to explore scaling squads, onboarding senior talent, or scoping fixed deliverables.
              </p>
            </div>

            {/* details card list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 overflow-hidden py-2">
              <motion.div
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.01 }}
                className="flex items-start space-x-4 bg-linear-to-b from-bg_secondary/95 to-bg_secondary/90 border border-border_custom/60 hover:border-secondary/50 p-6 rounded-2xl shadow-card_default hover:shadow-[0_8px_20px_rgba(6,182,212,0.1)] transition-[border-color,box-shadow] duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center border border-secondary/20 shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-xs text-text_primary uppercase tracking-wider mb-1">
                    HQ Location
                  </h3>
                  <p className="text-xs md:text-sm text-text_secondary font-medium leading-relaxed">
                    Ascope Tech, 5th floor, SBRR Square, Anna Nagar, Trichy – 620017
                  </p>
                </div>
              </motion.div>

              <motion.div
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.01 }}
                className="flex items-start space-x-4 bg-linear-to-b from-bg_secondary/95 to-bg_secondary/90 border border-border_custom/60 hover:border-secondary/50 p-6 rounded-2xl shadow-card_default hover:shadow-[0_8px_20px_rgba(6,182,212,0.1)] transition-[border-color,box-shadow] duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center border border-secondary/20 shrink-0 mt-0.5">
                  <Mail className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-xs text-text_primary uppercase tracking-wider mb-1">
                    Email Inquiry
                  </h3>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ascopetech@gmail.com" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-text_secondary font-semibold hover:text-secondary transition-colors">
                    ascopetech@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.01 }}
                className="flex items-start space-x-4 bg-linear-to-b from-bg_secondary/95 to-bg_secondary/90 border border-border_custom/60 hover:border-secondary/50 p-6 rounded-2xl shadow-card_default hover:shadow-[0_8px_20px_rgba(6,182,212,0.1)] transition-[border-color,box-shadow] duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center border border-secondary/20 shrink-0 mt-0.5">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-xs text-text_primary uppercase tracking-wider mb-1">
                    Call Us
                  </h3>
                  <a href="tel:+917418240526" className="text-xs md:text-sm text-text_secondary font-semibold hover:text-secondary transition-colors">
                    +91 74182 40526
                  </a>
                </div>
              </motion.div>

              <motion.div
                custom={3}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.01 }}
                className="flex items-start space-x-4 bg-linear-to-b from-bg_secondary/95 to-bg_secondary/90 border border-border_custom/60 hover:border-secondary/50 p-6 rounded-2xl shadow-card_default hover:shadow-[0_8px_20px_rgba(6,182,212,0.1)] transition-[border-color,box-shadow] duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center border border-secondary/20 shrink-0 mt-0.5">
                  <Clock className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-xs text-text_primary uppercase tracking-wider mb-1">
                    Work Hours
                  </h3>
                  <p className="text-xs md:text-sm text-text_secondary font-medium leading-relaxed">
                    Monday – Friday: 9 AM – 6 PM PST
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Direct Channel Tech Scoping Booking Card */}
            <div className="bg-linear-to-r from-secondary/15 to-primary/5 border border-secondary/20 p-6 rounded-2xl space-y-3 shadow-inner text-left">
              <div className="flex items-center space-x-3">
                <Sparkles className="w-5 h-5 text-secondary animate-pulse" />
                <h4 className="font-heading font-extrabold text-sm text-text_primary uppercase tracking-wider">Schedule Tech Demo</h4>
              </div>
              <p className="text-xs text-text_secondary leading-relaxed font-medium">
                Prefer a direct technical walkthrough? Book a 30-min architecture scoping call with our Lead Architect.
              </p>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ascopetech@gmail.com&su=Technical%20Scoping%20Call%20Request" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-bold text-secondary hover:underline">
                <span>Book a session</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-7">
            <div className="relative group bg-linear-to-b from-bg_secondary/95 to-bg_secondary/90 border border-border_custom/60 rounded-3xl p-8 md:p-10 shadow-card_default hover:shadow-[0_15px_40px_rgba(5,8,22,0.5)] transition-[border-color,box-shadow] duration-500">
              {/* Cyberpunk high-tech layout corner frames */}
              <div className="absolute top-0 left-0 w-8 h-[2px] bg-secondary opacity-40" />
              <div className="absolute top-0 left-0 w-[2px] h-8 bg-secondary opacity-40" />
              <div className="absolute top-0 right-0 w-8 h-[2px] bg-secondary opacity-40" />
              <div className="absolute top-0 right-0 w-[2px] h-8 bg-secondary opacity-40" />
              <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-secondary opacity-40" />
              <div className="absolute bottom-0 left-0 w-[2px] h-8 bg-secondary opacity-40" />
              <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-secondary opacity-40" />
              <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-secondary opacity-40" />

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit(onSubmit)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="w-full text-left space-y-1">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-text_secondary mb-1">Your Name</label>
                        <input
                          {...register('name')}
                          placeholder="John Doe"
                          className={`w-full py-3 px-4 text-text_primary bg-surface/30 border ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-border_custom/60 focus:border-secondary focus:ring-secondary/15'} rounded-lg text-sm md:text-base outline-none transition-[border-color,box-shadow] focus:ring-4`}
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-500 font-medium">{errors.name.message}</p>}
                      </div>

                      <div className="w-full text-left space-y-1">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-text_secondary mb-1">Email Address</label>
                        <input
                          {...register('email')}
                          placeholder="john@example.com"
                          type="email"
                          className={`w-full py-3 px-4 text-text_primary bg-surface/30 border ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-border_custom/60 focus:border-secondary focus:ring-secondary/15'} rounded-lg text-sm md:text-base outline-none transition-[border-color,box-shadow] focus:ring-4`}
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-500 font-medium">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="w-full text-left space-y-1">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-text_secondary mb-1">Subject</label>
                      <input
                        {...register('subject')}
                        placeholder="Project scoping, hiring team, etc."
                        className={`w-full py-3 px-4 text-text_primary bg-surface/30 border ${errors.subject ? 'border-red-500 focus:ring-red-200' : 'border-border_custom/60 focus:border-secondary focus:ring-secondary/15'} rounded-lg text-sm md:text-base outline-none transition-[border-color,box-shadow] focus:ring-4`}
                      />
                      {errors.subject && <p className="mt-1 text-xs text-red-500 font-medium">{errors.subject.message}</p>}
                    </div>

                    <div className="w-full text-left space-y-1">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-text_secondary mb-1">Message Details</label>
                      <textarea
                        {...register('message')}
                        placeholder="Please outline your technical needs, timeline, or current scale challenges..."
                        className={`w-full py-3 px-4 text-text_primary bg-surface/30 border ${errors.message ? 'border-red-500 focus:ring-red-200' : 'border-border_custom/60 focus:border-secondary focus:ring-secondary/15'} rounded-lg text-sm md:text-base outline-none transition-[border-color,box-shadow] focus:ring-4 resize-none h-32`}
                      />
                      {errors.message && <p className="mt-1 text-xs text-red-500 font-medium">{errors.message.message}</p>}
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 px-6 rounded-lg bg-linear-to-r from-secondary to-primary text-text_primary font-heading font-bold text-sm md:text-base hover:from-secondary/90 hover:to-primary/90 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:opacity-50 transition-[background-color,box-shadow] duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span>Sending inquiry...</span>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-box"
                    initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="flex flex-col items-center justify-center py-16 text-center space-y-4"
                  >
                    <CheckCircle2 className="w-16 h-16 text-green-500" />
                    <h3 className="font-heading font-extrabold text-2xl text-text_primary">
                      Thank You!
                    </h3>
                    <p className="text-sm md:text-base text-text_secondary max-w-sm">
                      We have received your message. Our technical managers will review your requirements and reach out within 24 hours.
                    </p>
                    <div className="pt-4">
                      <Button onClick={() => setIsSuccess(false)} variant="secondary">
                        Submit another form
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* FAQs accordion */}
        <section className="border-t border-divider pt-16">
          <FadeInSection className="text-center space-y-4 max-w-xl mx-auto mb-12">
            <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-secondary">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-heading font-extrabold text-3xl text-text_primary">
              Got technical questions?
            </h2>
          </FadeInSection>

          <div className="max-w-[800px] mx-auto bg-linear-to-b from-bg_secondary/95 to-bg_secondary/90 border border-border_custom/60 rounded-lg overflow-hidden shadow-card_default hover:shadow-[0_8px_20px_rgba(5,8,22,0.4)] transition-[border-color,box-shadow] duration-300">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className="border-b border-divider last:border-b-0">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-5 px-6 flex items-center justify-between text-left font-heading font-semibold text-sm md:text-base text-text_primary hover:text-secondary hover:bg-surface/30 transition-colors focus:outline-none min-h-[44px] cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-text_secondary transition-transform duration-300 ${isOpen ? 'rotate-180 text-secondary' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden bg-bg_secondary/40 text-left"
                      >
                        <p className="p-6 text-sm text-text_primary/95 font-medium leading-relaxed border-t border-divider">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
};
export default Contact;
