// src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { X, Users, User } from 'lucide-react';

/**
 * Reusable dashboard Sidebar.
 *
 * @param {Object}   props
 * @param {boolean}  props.isOpen        – controlled visibility (mobile drawer)
 * @param {Function} props.onClose       – callback to close mobile drawer
 * @param {Object}   [props.user]        – current user info ({ name, email })
 * @param {Array}    props.menuItems     – [{ label, path, icon: LucideIcon }]
 * @param {string}   [props.title='Dashboard'] – branding label
 * @param {React.ReactNode} [props.logoIcon] – custom icon element, defaults to <Users />
 * @param {string}   [props.profilePath='/my-profile']
 * @param {boolean}  [props.showProfile=true]
 */
function Sidebar({
  isOpen,
  onClose,
  user,
  menuItems = [],
  title = 'Dashboard',
  logoIcon,
  profilePath = '/my-profile',
  showProfile = true,
}) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 lg:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 'var(--z-overlay)' }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full shadow-xl z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 flex flex-col`}
        style={{
          width: 'var(--sidebar-width)',
          backgroundColor: 'var(--color-surface-light)',
        }}
      >
        {/* Branding */}
        <div
          className="p-6 flex items-center justify-between"
          style={{ borderBottom: '1px solid var(--color-border-light)' }}
        >
          <div className="flex items-center space-x-2 min-w-0">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: 'var(--color-secondary)' }}
            >
              {logoIcon || <Users className="w-6 h-6 text-white" />}
            </div>
            <span className="text-xl font-bold truncate" style={{ color: 'var(--color-text-dark)' }}>
              {title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden shrink-0"
            style={{ color: 'var(--color-text-dark-muted)' }}
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors"
                    style={{
                      backgroundColor: active ? 'color-mix(in srgb, var(--color-secondary) 12%, transparent)' : 'transparent',
                      color: active ? 'var(--color-secondary-dark)' : 'var(--color-text-dark-muted)',
                      fontWeight: active ? 600 : 400,
                    }}
                    onClick={() => window.innerWidth < 1024 && onClose?.()}
                  >
                    {Icon && (
                      <Icon
                        className="w-5 h-5 shrink-0"
                        style={{ color: active ? 'var(--color-secondary-dark)' : 'var(--color-text-dark-muted)' }}
                      />
                    )}
                    <span className="flex-1 truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        {showProfile && (
          <div className="p-4" style={{ borderTop: '1px solid var(--color-border-light)' }}>
            <Link
              to={profilePath}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors"
              style={{
                backgroundColor: isActive(profilePath)
                  ? 'color-mix(in srgb, var(--color-secondary) 12%, transparent)'
                  : 'transparent',
                color: isActive(profilePath) ? 'var(--color-secondary-dark)' : 'var(--color-text-dark-muted)',
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'var(--color-border-light)' }}
              >
                <User className="w-5 h-5" style={{ color: 'var(--color-text-dark-muted)' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--color-text-dark)' }}>
                  My Profile
                </p>
                <p className="text-xs truncate" style={{ color: 'var(--color-text-dark-muted)' }}>
                  {user?.name || 'Account'}
                </p>
                <p className="text-xs truncate" style={{ color: 'var(--color-text-dark-muted)' }}>
                  {user?.email || ''}
                </p>
              </div>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}

export default Sidebar;