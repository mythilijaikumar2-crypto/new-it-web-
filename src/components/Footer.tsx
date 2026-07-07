import React from 'react';
import { NavLink } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import logoImage from '../assets/Ascope Tech logo transparent.png';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-transparent text-text_secondary py-12 md:py-16 border-t border-divider">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4 text-left">
            <NavLink to="/" className="flex items-center space-x-2">
              <img 
                src={logoImage} 
                alt="Ascope Tech" 
                className="h-16 w-auto object-contain" 
              />
            </NavLink>
            <p className="text-sm text-text_muted leading-relaxed max-w-xs">
              Engineering scalable software partner helping ambitious companies design, build, and deploy elite digital products.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              {/* Custom SVG LinkedIn */}
              <a href="https://www.linkedin.com/company/ascope-tech-private-limited/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface hover:bg-accent hover:text-bg_primary transition-colors flex items-center justify-center cursor-pointer text-text_secondary" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              {/* Custom SVG WhatsApp */}
              <a href="https://wa.me/917418240526" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface hover:bg-accent hover:text-bg_primary transition-colors flex items-center justify-center cursor-pointer text-text_secondary" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.457 5.705 1.458h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ascopetech@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-text_primary transition-colors">ascopetech@gmail.com</a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <a href="tel:+917418240526" className="hover:text-text_primary transition-colors">+91 74182 40526</a>
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
