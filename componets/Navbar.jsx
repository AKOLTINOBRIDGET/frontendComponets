// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes, FaSearch, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Reusable storefront Navbar.
 *
 * Fully driven by props so it can be reused across different sites:
 *
 * @param {Object}   props
 * @param {string}   [props.brandName='Brand']     - Text shown in the logo.
 * @param {string}   [props.brandAccent]           - First letter / accent text (defaults to first letter of brandName).
 * @param {Array}    [props.navLinks]              - [{ name, path }]
 * @param {boolean}  [props.showSearch=true]
 * @param {boolean}  [props.showCart=true]
 * @param {number}   [props.cartCount=0]
 * @param {Function} [props.onCartClick]
 * @param {boolean}  [props.isAuthenticated=false]
 * @param {Object}   [props.user]
 * @param {Function} [props.onLogout]
 * @param {string}   [props.dashboardPath='/dashboard']
 * @param {string}   [props.loginPath='/login']
 * @param {string}   [props.registerPath='/register']
 * @param {Function} [props.onSearch]               - Called with the search string on submit.
 */
const Navbar = ({
  brandName = 'Brand',
  brandAccent,
  navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'FAQ', path: '/faq' },
  ],
  showSearch = true,
  showCart = true,
  cartCount = 0,
  onCartClick,
  isAuthenticated = false,
  user,
  onLogout,
  dashboardPath = '/dashboard',
  loginPath = '/login',
  registerPath = '/register',
  onSearch,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    const timer = setTimeout(() => setMobileMenuOpen(false), 0);
    return () => clearTimeout(timer);
  }, [location]);

  const handleLogoutClick = () => {
    onLogout?.();
    navigate('/');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch?.(searchValue.trim());
    }
  };

  const accent = brandAccent ?? brandName.charAt(0);
  const restOfBrand = brandAccent ? brandName : brandName.slice(1);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3 shadow-lg' : 'bg-transparent py-5'
      }`}
      style={{ minHeight: 'var(--navbar-height)' }}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wider flex items-center gap-2"
          style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
        >
          <span className="text-3xl" style={{ color: 'var(--color-primary)' }}>{accent}</span>
          {restOfBrand}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-sm tracking-widest uppercase transition-colors"
              style={{
                color: location.pathname === link.path ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontWeight: location.pathname === link.path ? 600 : 400,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color =
                  location.pathname === link.path ? 'var(--color-primary)' : 'var(--color-text-muted)')
              }
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-5">
          {/* Search */}
          {showSearch && (
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <AnimatePresence>
                {searchOpen && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 150, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search..."
                    autoFocus
                    className="absolute right-8 rounded-full px-3 py-1 text-sm focus:outline-none"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text)',
                    }}
                  />
                )}
              </AnimatePresence>
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="transition"
                style={{ color: 'var(--color-text-muted)' }}
                aria-label="Toggle search"
              >
                <FaSearch size={18} />
              </button>
            </form>
          )}

          {/* Cart */}
          {showCart && (
            <button
              onClick={onCartClick}
              className="relative transition"
              style={{ color: 'var(--color-text-muted)' }}
              aria-label="Open cart"
            >
              <FaShoppingCart size={20} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-bg)' }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* Auth: Dashboard or Sign In */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to={dashboardPath}
                className="transition"
                style={{ color: 'var(--color-text-muted)' }}
                title="My Account"
              >
                <FaUser size={18} />
              </Link>
              <button
                onClick={handleLogoutClick}
                className="transition"
                style={{ color: 'var(--color-text-muted)' }}
                title="Sign Out"
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-error)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
              >
                <FaSignOutAlt size={18} />
              </button>
            </div>
          ) : (
            <Link to={loginPath} className="hidden md:inline-flex text-sm btn-outline py-2 px-4">
              Sign In
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden transition"
            style={{ color: 'var(--color-text-muted)' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass overflow-hidden"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            <div className="flex flex-col items-center py-6 gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-lg tracking-widest uppercase"
                  style={{
                    color: location.pathname === link.path ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    fontWeight: location.pathname === link.path ? 600 : 400,
                  }}
                >
                  {link.name}
                </Link>
              ))}
              <div
                className="w-full pt-4 mt-2 flex flex-col items-center gap-4"
                style={{ borderTop: '1px solid var(--color-border)' }}
              >
                {isAuthenticated ? (
                  <>
                    <Link to={dashboardPath} style={{ color: 'var(--color-text-muted)' }}>
                      My Account ({user?.name || 'Account'})
                    </Link>
                    <button onClick={handleLogoutClick} style={{ color: 'var(--color-error)' }}>
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to={loginPath} className="btn-primary py-2 px-8">
                      Sign In
                    </Link>
                    <Link to={registerPath} className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;