// src/components/DashboardLayout.jsx
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

/**
 * Shared dashboard page layout combining Sidebar + Topbar.
 *
 * @param {Object}   props
 * @param {React.ReactNode} props.children
 * @param {Object}   [props.user]
 * @param {Function} [props.onLogout]
 * @param {Array}    props.menuItems         – forwarded to Sidebar
 * @param {string}   [props.title]           – forwarded to Sidebar
 * @param {React.ReactNode} [props.logoIcon] – forwarded to Sidebar
 * @param {React.ReactNode} [props.topbarExtra] – extra elements in Topbar (e.g. notification bell)
 * @param {string}   [props.footerText]      – custom footer text; if omitted, footer is hidden
 * @param {boolean}  [props.showSearch=true]
 * @param {Function} [props.onSearch]
 * @param {number}   [props.notificationCount=0]
 * @param {Function} [props.onNotificationClick]
 * @param {Array}    [props.breadcrumbs]     - optional breadcrumb list
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
  notificationCount = 0,
  onNotificationClick,
  breadcrumbs,
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Keyboard Shortcuts: Cmd/Ctrl + B to toggle Sidebar collapse
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        setSidebarCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Sidebar navigation */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={sidebarCollapsed}
        onCollapseToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        user={user}
        menuItems={menuItems}
        title={title}
        logoIcon={logoIcon}
      />

      {/* Main Layout Content Area */}
      <div
        className="flex flex-col min-h-screen transition-all duration-300 ease-in-out"
        style={{
          paddingLeft: 0,
          marginLeft: 0,
        }}
      >
        <div
          className="flex flex-col min-h-screen transition-all duration-300 ease-in-out"
          style={{
            paddingLeft: '0px',
          }}
        >
          {/* Dynamic Spacer padding-left for desktop screens */}
          <div
            className="flex flex-col min-h-screen transition-all duration-300 ease-in-out"
            style={{
              paddingLeft: sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
            }}
          >
            {/* Custom media queries handled dynamically or fallback wrapper */}
            <div className="flex flex-col min-h-screen lg:pl-0 pl-0">
              {/* Responsive Class-based Override for Mobile (since sidebar goes absolute overlay under 1024px) */}
              <div className="flex flex-col min-h-screen relative">
                {/* Style override helper block */}
                <style dangerouslySetInnerHTML={{__html: `
                  @media (max-width: 1023px) {
                    .dashboard-content-wrapper {
                      padding-left: 0px !important;
                    }
                  }
                  @media (min-width: 1024px) {
                    .dashboard-content-wrapper {
                      padding-left: ${sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)'} !important;
                    }
                  }
                `}} />

                <div className="dashboard-content-wrapper w-full flex flex-col min-h-screen transition-all duration-300">
                  <Topbar
                    onMenuClick={() => setSidebarOpen((prev) => !prev)}
                    user={user}
                    onLogout={onLogout}
                    showSearch={showSearch}
                    onSearch={onSearch}
                    notificationCount={notificationCount}
                    onNotificationClick={onNotificationClick}
                    breadcrumbs={breadcrumbs}
                    rightExtra={topbarExtra}
                  />

                  {/* Main Page Area */}
                  <main className="flex-1 p-4 sm:p-6 md:p-8 animate-slide-up">
                    {children}
                  </main>

                  {/* Dashboard Footer */}
                  {footerText && (
                    <footer
                      className="py-4 px-6 border-t"
                      style={{
                        backgroundColor: 'var(--color-surface)',
                        borderColor: 'var(--color-border)',
                      }}
                    >
                      <div className="text-center text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                        {footerText}
                      </div>
                    </footer>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;