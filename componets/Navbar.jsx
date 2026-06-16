// src/components/Navbar.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User, LogOut, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Reusable storefront Navbar.
 *
 * @param {Object}   props
 * @param {string}   [props.brandName='Brand']     - Text shown in the logo.
 * @param {string}   [props.brandAccent]           - First letter / accent text.
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
 * @param {Function} [props.onSearch]               - Called with search query.
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
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Keyboard shortcut listener (Cmd/Ctrl + K to search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
        scrolled ? 'glass py-3 shadow-md' : 'bg-transparent py-5'
      }`}
      style={{ minHeight: 'var(--navbar-height)' }}
      role="banner"
    >
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight flex items-center gap-1.5 focus-visible:outline-none"
          style={{ fontFamily: 'var(--font-heading)' }}
          aria-label={`${brandName} Home`}
        >
          <span style={{ color: 'var(--color-gold)' }}>{accent}</span>
          <span style={{ color: 'var(--color-text)' }}>{restOfBrand}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className="relative text-sm font-semibold tracking-wide transition-colors duration-200 py-1 hover:text-[var(--color-gold)]"
                style={{
                  color: isActive ? 'var(--color-gold)' : 'var(--color-text-muted)',
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: 'var(--color-gold)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          {showSearch && (
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 220, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="absolute right-9 flex items-center"
                  >
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      placeholder="Search... (Press ⌘K)"
                      className="form-input py-1.5 text-xs pr-8"
                    />
                    <kbd className="absolute right-2.5 text-[10px] font-mono font-bold text-gray-500 pointer-events-none select-none">
                      ⌘K
                    </kbd>
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full hover:bg-[rgba(var(--color-gold-hsl),0.08)] transition-colors"
                style={{ color: searchOpen ? 'var(--color-gold)' : 'var(--color-text-muted)' }}
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </form>
          )}

          {/* Cart */}
          {showCart && (
            <button
              onClick={onCartClick}
              className="relative p-2 rounded-full hover:bg-[rgba(var(--color-gold-hsl),0.08)] transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
              aria-label="Open cart"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span
                  className="absolute top-0 right-0 text-[10px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full text-[var(--color-navy)]"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* Auth System */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to={dashboardPath}
                className="p-2 rounded-full hover:bg-[rgba(var(--color-gold-hsl),0.08)] transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
                title="Dashboard"
              >
                <User size={18} />
              </Link>
              <button
                onClick={handleLogoutClick}
                className="p-2 rounded-full hover:bg-[rgba(239,68,68,0.08)] hover:text-[var(--color-error)] transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
                title="Sign Out"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link to={loginPath} className="hidden md:inline-flex btn-outline btn-sm">
              Sign In
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-[rgba(var(--color-gold-hsl),0.08)] transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass overflow-hidden border-t"
          >
            <div className="flex flex-col items-center py-6 gap-5">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-lg font-medium tracking-wide"
                    style={{
                      color: isActive ? 'var(--color-gold)' : 'var(--color-text-muted)',
                    }}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div
                className="w-full pt-4 mt-2 flex flex-col items-center gap-4 border-t"
                style={{ borderColor: 'var(--color-border)' }}
              >
                {isAuthenticated ? (
                  <>
                    <Link
                      to={dashboardPath}
                      style={{ color: 'var(--color-text-muted)' }}
                      className="font-medium"
                    >
                      Dashboard ({user?.name || 'Account'})
                    </Link>
                    <button
                      onClick={handleLogoutClick}
                      className="font-semibold"
                      style={{ color: 'var(--color-error)' }}
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to={loginPath} className="btn-primary btn-md w-3/4 text-center">
                      Sign In
                    </Link>
                    <Link
                      to={registerPath}
                      className="text-sm font-medium"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
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