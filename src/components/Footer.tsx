import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg_primary text-text_secondary py-12 md:py-16 border-t border-divider">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4 text-left">
            <NavLink to="/" className="flex items-center space-x-2">
              <span className="font-heading font-extrabold text-xl tracking-tight text-text_primary">
                Ascope <span className="text-accent">Tech</span>
              </span>
            </NavLink>
            <p className="text-sm text-text_muted leading-relaxed max-w-xs">
              Engineering scalable software partner helping ambitious companies design, build, and deploy elite digital products.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              {/* Custom SVG LinkedIn */}
              <a href="#" className="w-10 h-10 rounded-full bg-surface hover:bg-accent hover:text-bg_primary transition-colors flex items-center justify-center cursor-pointer text-text_secondary" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              {/* Custom SVG Twitter */}
              <a href="#" className="w-10 h-10 rounded-full bg-surface hover:bg-accent hover:text-bg_primary transition-colors flex items-center justify-center cursor-pointer text-text_secondary" aria-label="Twitter">
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              {/* Custom SVG GitHub */}
              <a href="#" className="w-10 h-10 rounded-full bg-surface hover:bg-accent hover:text-bg_primary transition-colors flex items-center justify-center cursor-pointer text-text_secondary" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 text-left">
            <h3 className="font-heading font-bold text-sm text-text_primary uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <NavLink to="/about" className="hover:text-text_primary transition-colors">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/services" className="hover:text-text_primary transition-colors">Our Services</NavLink>
              </li>
              <li>
                <NavLink to="/portfolio" className="hover:text-text_primary transition-colors">Portfolio</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-text_primary transition-colors">Contact Us</NavLink>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4 text-left">
            <h3 className="font-heading font-bold text-sm text-text_primary uppercase tracking-wider">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <NavLink to="/services" className="hover:text-text_primary transition-colors">Custom Software Development</NavLink>
              </li>
              <li>
                <NavLink to="/services" className="hover:text-text_primary transition-colors">Web Applications</NavLink>
              </li>
              <li>
                <NavLink to="/services" className="hover:text-text_primary transition-colors">Mobile Applications</NavLink>
              </li>
              <li>
                <NavLink to="/services" className="hover:text-text_primary transition-colors">Cloud & DevOps Engineering</NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 text-left">
            <h3 className="font-heading font-bold text-sm text-text_primary uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span>Ascope Tech, 5th floor, SBRR Square, Anna Nagar, Trichy – 620017</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a href="mailto:hello@ascopetech.com" className="hover:text-text_primary transition-colors">hello@ascopetech.com</a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <a href="tel:+18005550199" className="hover:text-text_primary transition-colors">+1 (800) 555-0199</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-divider flex flex-col md:flex-row items-center justify-between text-xs space-y-4 md:space-y-0">
          <p>&copy; {currentYear} Ascope Tech. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-text_primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-text_primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-text_primary transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
