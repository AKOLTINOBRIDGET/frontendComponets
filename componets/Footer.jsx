// src/components/Footer.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Send,
  Phone,
  Mail,
  ArrowUp,
  Globe
} from 'lucide-react';

// Custom high-fidelity inline SVGs for social brands matching Lucide stroke style
const SOCIAL_ICONS = {
  facebook: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  twitter: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
    </svg>
  ),
  instagram: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  linkedin: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  youtube: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.4z"/>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
    </svg>
  ),
};

/**
 * Reusable Footer.
 *
 * @param {Object} props
 * @param {string}   [props.brandName='Brand']
 * @param {string}   [props.brandAccent]
 * @param {string}   [props.tagline]
 * @param {string}   [props.email]
 * @param {string}   [props.phone]
 * @param {boolean}  [props.showNewsletter=true]
 * @param {Function} [props.onNewsletterSubmit] - callback receiving email string
 * @param {Array}    [props.quickLinks]         - [{ label, path }]
 * @param {Array}    [props.socialLinks]        - [{ platform: 'facebook'|'twitter'|..., url }]
 * @param {string}   [props.companyName='Your Company']
 */
const Footer = ({
  brandName = 'Brand',
  brandAccent,
  tagline = 'Quality products and services, redefined.',
  email,
  phone,
  showNewsletter = true,
  onNewsletterSubmit,
  quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'FAQ', path: '/faq' },
  ],
  socialLinks = [],
  companyName = 'Your Company',
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const accent = brandAccent ?? brandName.charAt(0);
  const restOfBrand = brandAccent ? brandName : brandName.slice(1);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      onNewsletterSubmit?.(newsletterEmail.trim());
      setSubmitted(true);
      setNewsletterEmail('');
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative pt-20 pb-10 transition-colors duration-300 border-t"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
      role="contentinfo"
    >
      {/* Scroll to Top Trigger */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 -translate-x-1/2 p-3.5 rounded-full border shadow-lg transition-all duration-300 hover:-translate-y-1 hover:text-[var(--color-gold)]"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
          color: 'var(--color-text-muted)',
        }}
        aria-label="Scroll to top of page"
      >
        <ArrowUp className="w-5 h-5 animate-pulse" />
      </button>

      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="space-y-5">
          <Link
            to="/"
            className="text-2xl font-extrabold flex items-center gap-1.5 focus:outline-none"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span style={{ color: 'var(--color-gold)' }}>{accent}</span>
            <span style={{ color: 'var(--color-text)' }}>{restOfBrand}</span>
          </Link>
          <p className="text-xs font-semibold leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            {tagline}
          </p>
        </div>

        {/* Contact Info Column */}
        {(email || phone) && (
          <div>
            <h3
              className="text-sm font-bold uppercase tracking-wider mb-6"
              style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-heading)' }}
            >
              Get In Touch
            </h3>
            <ul className="space-y-4 text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
              {email && (
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                  <a href={`mailto:${email}`} className="hover:text-[var(--color-gold)] transition-colors">
                    {email}
                  </a>
                </li>
              )}
              {phone && (
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-gray-500 shrink-0" />
                  <a href={`tel:${phone}`} className="hover:text-[var(--color-gold)] transition-colors">
                    {phone}
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Quick Links Column */}
        {quickLinks.length > 0 && (
          <div>
            <h3
              className="text-sm font-bold uppercase tracking-wider mb-6"
              style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-heading)' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-4.5 text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-[var(--color-gold)] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Newsletter Signup / Social Links Column */}
        <div>
          {showNewsletter && (
            <div className="mb-6">
              <h3
                className="text-sm font-bold uppercase tracking-wider mb-4"
                style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-heading)' }}
              >
                Newsletter
              </h3>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="form-input py-2 text-xs"
                  aria-label="Email Address for newsletter"
                />
                <button
                  type="submit"
                  className="btn-primary p-2 shrink-0 rounded-lg"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              {submitted && (
                <p className="text-[10px] font-bold text-[var(--color-success)] mt-2">
                  Thank you for subscribing!
                </p>
              )}
            </div>
          )}

          {/* Social Platform Connections */}
          {socialLinks.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                Follow Our Journey
              </h4>
              <div className="flex gap-2.5">
                {socialLinks.map(({ platform, url }) => {
                  const RenderIcon = SOCIAL_ICONS[platform];
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:text-[var(--color-gold)] hover:border-[var(--color-gold)]"
                      style={{
                        backgroundColor: 'var(--color-bg)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-muted)',
                      }}
                      aria-label={`Visit our ${platform} page`}
                    >
                      {RenderIcon ? (
                        <RenderIcon className="w-4.5 h-4.5" />
                      ) : (
                        <Globe className="w-4.5 h-4.5" />
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Copyright Notice */}
      <div
        className="container mt-16 pt-8 text-center text-[10px] font-bold border-t"
        style={{
          borderColor: 'var(--color-border)',
          color: 'var(--color-text-muted)',
        }}
      >
        <p>&copy; {new Date().getFullYear()} {companyName}. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;