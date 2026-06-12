// src/components/DashboardLayout.jsx
import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

/**
 * Shared dashboard page layout combining Sidebar + Topbar.
 *
 * @param {Object}   props
 * @param {React.ReactNode} props.children
 * @param {Object}   [props.user]
 * @param {Function} [props.onLogout]
 * @param {Array}    props.menuItems     – forwarded to Sidebar
 * @param {string}   [props.title]       – forwarded to Sidebar
 * @param {React.ReactNode} [props.logoIcon] – forwarded to Sidebar
 * @param {React.ReactNode} [props.topbarExtra] – extra elements in Topbar (e.g. notification bell)
 * @param {string}   [props.footerText]  – custom footer text; if omitted, footer is hidden
 * @param {boolean}  [props.showSearch=true]
 * @param {Function} [props.onSearch]
 */
function DashboardLayout({
  children,
  user,
  onLogout,
  menuItems = [],
  title,
  logoIcon,
  topbarExtra,
  footerText,
  showSearch = true,
  onSearch,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-light)' }}>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
        menuItems={menuItems}
        title={title}
        logoIcon={logoIcon}
      />

      <div className="flex flex-col min-h-screen" style={{ paddingLeft: 0 }}>
        <div className="lg:pl-[var(--sidebar-width)] flex flex-col min-h-screen">
          <Topbar
            onMenuClick={() => setSidebarOpen((prev) => !prev)}
            user={user}
            onLogout={onLogout}
            showSearch={showSearch}
            onSearch={onSearch}
            rightExtra={topbarExtra}
          />

          <main className="flex-1 p-4 sm:p-6">{children}</main>

          {footerText && (
            <footer
              className="py-4 px-6"
              style={{ backgroundColor: 'var(--color-surface-light)', borderTop: '1px solid var(--color-border-light)' }}
            >
              <div className="text-center text-sm" style={{ color: 'var(--color-text-dark-muted)' }}>
                {footerText}
              </div>
            </footer>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;