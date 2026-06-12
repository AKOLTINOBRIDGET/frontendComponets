// src/components/Topbar.jsx
import { Menu, Search, LogOut } from 'lucide-react';

/**
 * Reusable dashboard Topbar.
 *
 * @param {Object}   props
 * @param {Function} props.onMenuClick     - toggles mobile sidebar
 * @param {Object}   [props.user]          - { name, username, email }
 * @param {Function} [props.onLogout]
 * @param {boolean}  [props.showSearch=true]
 * @param {string}   [props.searchPlaceholder='Search...']
 * @param {Function} [props.onSearch]      - called with search string
 * @param {React.ReactNode} [props.rightExtra] - extra elements before user info (e.g. notification bell)
 */
function Topbar({
  onMenuClick,
  user,
  onLogout,
  showSearch = true,
  searchPlaceholder = 'Search...',
  onSearch,
  rightExtra,
}) {
  const displayName = user?.name || user?.username || 'User';
  const displayEmail = user?.email || '';

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      onSearch?.(e.target.value);
    }
  };

  return (
    <header
      className="sticky top-0 z-30 shadow-sm"
      style={{ backgroundColor: 'var(--color-surface-light)', borderBottom: '1px solid var(--color-border-light)' }}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 gap-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden shrink-0 focus:outline-none"
            style={{ color: 'var(--color-text-dark-muted)' }}
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>

          {showSearch && (
            <div
              className="hidden md:flex items-center rounded-lg px-4 py-2 w-72 lg:w-96"
              style={{ backgroundColor: 'var(--color-bg-light)' }}
            >
              <Search className="w-5 h-5 mr-2 shrink-0" style={{ color: 'var(--color-text-dark-muted)' }} />
              <input
                type="text"
                placeholder={searchPlaceholder}
                onKeyDown={handleSearch}
                className="bg-transparent border-none focus:outline-none w-full"
                style={{ color: 'var(--color-text-dark)' }}
              />
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
          {rightExtra}

          <div
            className="hidden sm:flex items-center space-x-3 pl-4"
            style={{ borderLeft: '1px solid var(--color-border-light)' }}
          >
            <div className="text-right max-w-[140px]">
              <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text-dark)' }}>
                {displayName}
              </p>
              {displayEmail && (
                <p className="text-xs truncate" style={{ color: 'var(--color-text-dark-muted)' }}>
                  {displayEmail}
                </p>
              )}
            </div>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold shrink-0"
              style={{ backgroundColor: 'var(--color-secondary)' }}
            >
              {displayName.charAt(0).toUpperCase()}
            </div>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors"
              style={{ backgroundColor: 'color-mix(in srgb, var(--color-error) 10%, transparent)', color: 'var(--color-error)' }}
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden md:inline font-semibold">Logout</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;