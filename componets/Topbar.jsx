// src/components/Topbar.jsx
import { useEffect, useRef } from 'react';
import { Menu, Search, LogOut, Bell, ChevronDown } from 'lucide-react';

/**
 * Reusable dashboard Topbar.
 *
 * @param {Object}   props
 * @param {Function} props.onMenuClick          - toggles mobile sidebar drawer
 * @param {Object}   [props.user]               - user info: { name, username, email, avatar }
 * @param {Function} [props.onLogout]
 * @param {boolean}  [props.showSearch=true]
 * @param {string}   [props.searchPlaceholder='Search... (Press ⌘K to focus)']
 * @param {Function} [props.onSearch]           - called with search value on submit
 * @param {number}   [props.notificationCount=0] - unread notification count
 * @param {Function} [props.onNotificationClick]- notification click callback
 * @param {Array}    [props.breadcrumbs=[]]     - breadcrumb trail [{ label, path }]
 * @param {React.ReactNode} [props.rightExtra]  - custom elements inside right actions
 */
function Topbar({
  onMenuClick,
  user,
  onLogout,
  showSearch = true,
  searchPlaceholder = 'Search... (Press ⌘K to focus)',
  onSearch,
  notificationCount = 0,
  onNotificationClick,
  breadcrumbs = [],
  rightExtra,
}) {
  const displayName = user?.name || user?.username || 'User';
  const displayEmail = user?.email || '';
  const searchInputRef = useRef(null);

  // Focus search input on ⌘K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k' && showSearch) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSearch]);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch?.(e.target.value);
    }
  };

  return (
    <header
      className="sticky top-0 z-30 shadow-sm transition-all duration-300"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 gap-4">
        {/* Left Section (Sidebar Toggle & Search/Breadcrumbs) */}
        <div className="flex items-center space-x-4 min-w-0 flex-1">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-full hover:bg-[rgba(var(--color-gold-hsl),0.08)] transition-colors focus:outline-none"
            style={{ color: 'var(--color-text-muted)' }}
            aria-label="Toggle mobile sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumbs Trail */}
          {breadcrumbs.length > 0 ? (
            <nav className="hidden md:flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider">
              {breadcrumbs.map((crumb, idx) => (
                <div key={crumb.label} className="flex items-center space-x-2">
                  {idx > 0 && <span style={{ color: 'var(--color-border)' }}>/</span>}
                  {crumb.path ? (
                    <a
                      href={crumb.path}
                      className="hover:text-[var(--color-gold)] transition-colors"
                      style={{ color: 'var(--color-text-muted)' }}
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span style={{ color: 'var(--color-text)' }}>{crumb.label}</span>
                  )}
                </div>
              ))}
            </nav>
          ) : (
            showSearch && (
              <div
                className="relative hidden md:flex items-center rounded-lg px-3.5 py-1.5 w-72 lg:w-96 transition-all duration-200 border"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  borderColor: 'var(--color-border)',
                }}
                onClick={() => searchInputRef.current?.focus()}
              >
                <Search className="w-4.5 h-4.5 mr-2.5 shrink-0" style={{ color: 'var(--color-text-muted)' }} />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={searchPlaceholder}
                  onKeyDown={handleSearchKeyDown}
                  className="bg-transparent border-none focus:outline-none w-full text-sm font-medium"
                  style={{ color: 'var(--color-text)' }}
                />
                <kbd className="absolute right-2 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold text-gray-500 border border-gray-700 pointer-events-none select-none">
                  ⌘K
                </kbd>
              </div>
            )
          )}
        </div>

        {/* Right Section (Notifications, User Profile, Logout) */}
        <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
          {/* Notifications */}
          {onNotificationClick && (
            <button
              onClick={onNotificationClick}
              className="relative p-2 rounded-full hover:bg-[rgba(var(--color-gold-hsl),0.08)] transition-colors text-[var(--color-text-muted)] hover:text-[var(--color-gold)]"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span
                  className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full ring-2 ring-[var(--color-surface)] animate-pulse"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                />
              )}
            </button>
          )}

          {rightExtra}

          {/* User Info & Avatar */}
          <div
            className="hidden sm:flex items-center space-x-3 pl-4 border-l"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <div className="text-right max-w-[140px]">
              <p className="text-xs font-bold truncate" style={{ color: 'var(--color-text)' }}>
                {displayName}
              </p>
              {displayEmail && (
                <p className="text-[10px] truncate" style={{ color: 'var(--color-text-muted)' }}>
                  {displayEmail}
                </p>
              )}
            </div>
            
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={displayName}
                className="w-9 h-9 rounded-full object-cover border-2 border-[var(--color-gold)]"
              />
            ) : (
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-[var(--color-navy)] shadow-sm"
                style={{ backgroundColor: 'var(--color-gold)' }}
              >
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Logout Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors border"
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.08)',
                borderColor: 'rgba(239, 68, 68, 0.2)',
                color: 'var(--color-error)',
              }}
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline text-xs font-bold">Logout</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;