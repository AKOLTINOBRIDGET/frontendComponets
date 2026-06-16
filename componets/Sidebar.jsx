// src/components/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { X, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Reusable dashboard Sidebar.
 *
 * @param {Object}   props
 * @param {boolean}  props.isOpen            – mobile sidebar drawer open state
 * @param {Function} props.onClose           – callback to close mobile sidebar drawer
 * @param {boolean}  [props.isCollapsed=false] – desktop sidebar collapsed state
 * @param {Function} [props.onCollapseToggle] – toggle handler for collapsing sidebar
 * @param {Object}   [props.user]            – user details: { name, email }
 * @param {Array}    props.menuItems         – [{ label, path, icon: LucideIcon, badge: string|number, group: string }]
 * @param {string}   [props.title='Dashboard'] – branding label
 * @param {React.ReactNode} [props.logoIcon] – custom logo icon
 * @param {string}   [props.profilePath='/my-profile']
 * @param {boolean}  [props.showProfile=true]
 */
function Sidebar({
  isOpen,
  onClose,
  isCollapsed = false,
  onCollapseToggle,
  user,
  menuItems = [],
  title = 'Dashboard',
  logoIcon,
  profilePath = '/my-profile',
  showProfile = true,
}) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // Group menu items by group name
  const groupedMenu = menuItems.reduce((acc, item) => {
    const groupName = item.group || 'Menu';
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(item);
    return acc;
  }, {});

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 lg:hidden transition-opacity duration-300"
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 'var(--z-overlay)',
          }}
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-full shadow-xl z-50 transition-all duration-300 ease-in-out flex flex-col border-r ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
        style={{
          width: isCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        {/* Header Branding */}
        <div
          className="p-4 flex items-center justify-between min-h-[var(--navbar-height)] border-b"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div className="flex items-center space-x-3 min-w-0">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-md text-navy"
              style={{ backgroundColor: 'var(--color-gold)' }}
            >
              {logoIcon || <ChevronRight className="w-5 h-5 text-[var(--color-bg)]" />}
            </div>
            {!isCollapsed && (
              <span
                className="text-lg font-bold truncate tracking-wide"
                style={{ color: 'var(--color-text)', fontFamily: 'var(--font-heading)' }}
              >
                {title}
              </span>
            )}
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-full hover:bg-[rgba(var(--color-gold-hsl),0.08)] transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-6">
          {Object.entries(groupedMenu).map(([groupName, items]) => (
            <div key={groupName} className="space-y-1">
              {/* Group Title - hidden if collapsed */}
              {!isCollapsed && (
                <p className="text-[10px] font-bold uppercase tracking-wider px-3 mb-2" style={{ color: 'var(--color-text-muted)' }}>
                  {groupName}
                </p>
              )}

              <ul className="space-y-1">
                {items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);

                  return (
                    <li key={item.label}>
                      <Link
                        to={item.path}
                        className="flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 relative group"
                        style={{
                          backgroundColor: active ? 'var(--color-gold-muted)' : 'transparent',
                          color: active ? 'var(--color-gold)' : 'var(--color-text-muted)',
                        }}
                        onClick={() => window.innerWidth < 1024 && onClose?.()}
                      >
                        {/* Hover accent border */}
                        {!active && (
                          <div className="absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        )}

                        {Icon && (
                          <Icon
                            className="w-5 h-5 shrink-0"
                            style={{
                              color: active ? 'var(--color-gold)' : 'var(--color-text-muted)',
                              marginRight: isCollapsed ? '0' : '12px',
                            }}
                          />
                        )}

                        {/* Link Label */}
                        {!isCollapsed && <span className="flex-1 font-medium text-sm truncate">{item.label}</span>}

                        {/* Notifications Badge */}
                        {item.badge !== undefined && (
                          <span
                            className={`badge ${
                              active ? 'badge-gold' : 'badge-navy'
                            } shrink-0 text-[10px] font-bold`}
                            style={{
                              marginLeft: isCollapsed ? '0' : '8px',
                              position: isCollapsed ? 'absolute' : 'static',
                              top: isCollapsed ? '4px' : 'auto',
                              right: isCollapsed ? '4px' : 'auto',
                            }}
                          >
                            {item.badge}
                          </span>
                        )}

                        {/* Collapsed Tooltip */}
                        {isCollapsed && (
                          <div
                            className="absolute left-14 py-1.5 px-3 rounded-md text-xs font-semibold shadow-lg border pointer-events-none opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap"
                            style={{
                              backgroundColor: 'var(--color-surface)',
                              borderColor: 'var(--color-border)',
                              color: 'var(--color-text)',
                              zIndex: 100,
                            }}
                          >
                            {item.label}
                          </div>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer Collapser & User Profile */}
        <div className="p-3 border-t mt-auto" style={{ borderColor: 'var(--color-border)' }}>
          {/* Sidebar Collapse Action (Desktop) */}
          {onCollapseToggle && (
            <button
              onClick={onCollapseToggle}
              className="hidden lg:flex w-full items-center justify-center py-2 mb-2 rounded-lg hover:bg-[rgba(var(--color-gold-hsl),0.08)] transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          )}

          {/* User Profile widget */}
          {showProfile && (
            <Link
              to={profilePath}
              className="flex items-center p-2 rounded-lg hover:bg-[rgba(var(--color-gold-hsl),0.05)] transition-all duration-200 group relative"
              style={{
                backgroundColor: isActive(profilePath) ? 'var(--color-gold-muted)' : 'transparent',
                color: isActive(profilePath) ? 'var(--color-gold)' : 'var(--color-text-muted)',
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
                style={{ backgroundColor: 'var(--color-border)', color: 'var(--color-text)' }}
              >
                <User size={16} />
              </div>
              
              {!isCollapsed && (
                <div className="flex-1 min-w-0 ml-3">
                  <p className="text-xs font-bold truncate text-[var(--color-text)]">
                    {user?.name || 'Account'}
                  </p>
                  <p className="text-[10px] truncate text-gray-500">
                    {user?.email || 'My Profile'}
                  </p>
                </div>
              )}

              {/* Profile Tooltip if collapsed */}
              {isCollapsed && (
                <div
                  className="absolute left-14 py-1.5 px-3 rounded-md text-xs font-semibold shadow-lg border pointer-events-none opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)',
                    zIndex: 100,
                  }}
                >
                  {user?.name || 'My Profile'}
                </div>
              )}
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;