// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaLinkedin, FaYoutube } from 'react-icons/fa';

const ICONS = {
  facebook: FaFacebook,
  twitter: FaTwitter,
  instagram: FaInstagram,
  whatsapp: FaWhatsapp,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
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
 * @param {boolean}  [props.showMessageBox=true]
 * @param {Array}    [props.quickLinks]   - [{ label, path }]
 * @param {Array}    [props.socialLinks]  - [{ platform: 'facebook'|'twitter'|..., url }]
 * @param {string}   [props.companyName='Your Company']
 */
const Footer = ({
  brandName = 'Brand',
  brandAccent,
  tagline = 'Quality products and services, redefined.',
  email,
  phone,
  showMessageBox = true,
  quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'FAQ', path: '/faq' },
  ],
  socialLinks = [],
  companyName = 'Your Company',
}) => {
  const accent = brandAccent ?? brandName.charAt(0);
  const restOfBrand = brandAccent ? brandName : brandName.slice(1);

  return (
    <footer
      className="pt-16 pb-8"
      style={{ backgroundColor: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}
    >
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
        {/* Brand */}
        <div className="space-y-4">
          <Link
            to="/"
            className="text-2xl font-bold flex items-center gap-2"
            style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
          >
            <span className="text-3xl" style={{ color: 'var(--color-primary)' }}>{accent}</span>
            {restOfBrand}
          </Link>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            {tagline}
          </p>
        </div>

        {/* Contact */}
        {(email || phone || showMessageBox) && (
          <div>
            <h3
              className="text-lg mb-6 tracking-wider"
              style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}
            >
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {email && (
                <li>
                  <a href={`mailto:${email}`} className="hover:text-white transition">
                    {email}
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a href={`tel:${phone}`} className="hover:text-white transition">
                    {phone}
                  </a>
                </li>
              )}
              {showMessageBox && (
                <li className="pt-2">
                  <input
                    type="text"
                    placeholder="Message us..."
                    className="w-full rounded px-3 py-2 text-sm focus:outline-none"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text)',
                    }}
                  />
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Quick Links */}
        {quickLinks.length > 0 && (
          <div>
            <h3
              className="text-lg mb-6 tracking-wider"
              style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="transition"
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Social */}
        {socialLinks.length > 0 && (
          <div>
            <h3
              className="text-lg mb-6 tracking-wider"
              style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-heading)' }}
            >
              Follow Us
            </h3>
            <div className="flex gap-4">
              {socialLinks.map(({ platform, url }) => {
                const Icon = ICONS[platform];
                if (!Icon) return null;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full transition-all duration-300"
                    style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-text)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                      e.currentTarget.style.color = 'var(--color-bg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-surface)';
                      e.currentTarget.style.color = 'var(--color-text)';
                    }}
                    aria-label={platform}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div
        className="container mx-auto px-4 mt-16 pt-8 text-center text-sm"
        style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
      >
        <p>&copy; {new Date().getFullYear()} {companyName}. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;