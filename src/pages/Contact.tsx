import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, TextArea } from '../components/ui/Input';
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

  return (
    <div className="w-full pt-28 pb-16 bg-bg_primary">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 space-y-24">
        
        {/* Main contact layout */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          {/* Info Details column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-heading font-extrabold uppercase tracking-widest text-secondary">
                GET IN TOUCH
              </span>
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-text_primary leading-tight">
                Let's construct something together
              </h1>
              <p className="text-sm md:text-base text-text_secondary leading-relaxed">
                Connect with our team to explore scaling squads, onboarding senior talent, or scoping fixed deliverables.
              </p>
            </div>

            {/* details card list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div className="flex items-start space-x-4 bg-bg_secondary border border-border_custom p-6 rounded-lg">
                <MapPin className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-heading font-bold text-sm text-text_primary uppercase tracking-wider mb-1">
                    HQ Location
                  </h3>
                  <p className="text-xs md:text-sm text-text_muted">
                    Ascope Tech, 5th floor, SBRR Square, Anna Nagar, Trichy – 620017
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-bg_secondary border border-border_custom p-6 rounded-lg">
                <Mail className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-heading font-bold text-sm text-text_primary uppercase tracking-wider mb-1">
                    Email Inquiry
                  </h3>
                  <a href="mailto:hello@ascopetech.com" className="text-xs md:text-sm text-text_muted hover:text-text_primary transition-colors">
                    hello@ascopetech.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-bg_secondary border border-border_custom p-6 rounded-lg">
                <Phone className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-heading font-bold text-sm text-text_primary uppercase tracking-wider mb-1">
                    Call Us
                  </h3>
                  <a href="tel:+18005550199" className="text-xs md:text-sm text-text_muted hover:text-text_primary transition-colors">
                    +1 (800) 555-0199
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-bg_secondary border border-border_custom p-6 rounded-lg">
                <Clock className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-heading font-bold text-sm text-text_primary uppercase tracking-wider mb-1">
                    Work Hours
                  </h3>
                  <p className="text-xs md:text-sm text-text_muted">
                    Monday – Friday: 9 AM – 6 PM PST
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-7">
            <Card className="shadow-lg h-full bg-card_bg border-border_custom">
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
                      <Input
                        label="Your Name"
                        placeholder="John Doe"
                        error={errors.name?.message}
                        {...register('name')}
                      />
                      <Input
                        label="Email Address"
                        placeholder="john@example.com"
                        type="email"
                        error={errors.email?.message}
                        {...register('email')}
                      />
                    </div>
                    <Input
                      label="Subject"
                      placeholder="Project scoping, hiring team, etc."
                      error={errors.subject?.message}
                      {...register('subject')}
                    />
                    <TextArea
                      label="Message Details"
                      placeholder="Please outline your technical needs, timeline, or current scale challenges..."
                      error={errors.message?.message}
                      {...register('message')}
                    />
                    <div>
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting}
                        className="w-full text-center py-4 flex items-center justify-center space-x-2"
                      >
                        <span>{isSubmitting ? 'Sending inquiry...' : 'Send Message'}</span>
                      </Button>
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
            </Card>
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

          <div className="max-w-[800px] mx-auto bg-card_bg border border-border_custom rounded-lg overflow-hidden shadow-card_default">
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
                    <ChevronDown className={`w-5 h-5 text-text_muted transition-transform duration-300 ${isOpen ? 'rotate-180 text-secondary' : ''}`} />
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
                        <p className="p-6 text-sm text-text_secondary leading-relaxed border-t border-divider">
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
