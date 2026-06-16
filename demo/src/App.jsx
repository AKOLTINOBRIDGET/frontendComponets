// src/App.jsx
import { useState } from 'react';
import { Home, Settings, Users, Layout, ShieldAlert, Loader2, HelpCircle } from 'lucide-react';
import DashboardLayout from '../../componets/Dashboard';
import Navbar from '../../componets/Navbar';
import Footer from '../../componets/Footer';
import EmptyState from '../../componets/Emptystate';
import LoadingSpinner from '../../componets/Loadingspinner';
import ErrorMessage from '../../componets/Errormessage';
import ErrorBoundary from '../../componets/Errorboundary';
import { ToastProvider, useToast } from '../../componets/Toastcontext';

function AppContent() {
  const [theme, setTheme] = useState('dark');
  const { success, error, warning, info, dismissAll } = useToast();
  const [loadingVariant, setLoadingVariant] = useState('spinner');
  const [showErrorDemo, setShowErrorDemo] = useState(false);

  // Theme Toggler
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    info(`Switched theme to ${nextTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}`, 2500);
  };

  // Menu items for Sidebar
  const sidebarMenuItems = [
    { label: 'Overview', path: '/', icon: Layout, group: 'Navigation' },
    { label: 'Users & Roles', path: '/users', icon: Users, badge: 3, group: 'Management' },
    { label: 'System Settings', path: '/settings', icon: Settings, group: 'Configuration' },
    { label: 'Status & Help', path: '/help', icon: HelpCircle, group: 'Support' },
  ];

  // Dummy user profile
  const userProfile = {
    name: 'Eleanor Vance',
    email: 'eleanor@vance-industries.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  };

  // Handler for toast triggers
  const triggerToast = (type) => {
    switch (type) {
      case 'success':
        success('Changes saved successfully!', 4000, 'Success Notification');
        break;
      case 'error':
        error('An unexpected server error occurred.', 5000, 'Error Encountered');
        break;
      case 'warning':
        warning('Storage quota is at 85% capacity.', 4500, 'Disk Space Alert');
        break;
      case 'info':
      default:
        info('New system updates are available.', 3000, 'System Update');
        break;
    }
  };

  return (
    <div className="app-root-container">
      {/* Front-facing Storefront Navbar showcase */}
      <Navbar
        brandName="Aurelius"
        brandAccent="A"
        isAuthenticated={true}
        user={userProfile}
        onSearch={(q) => info(`Searching storefront for: "${q}"`, 3000)}
        cartCount={4}
        onCartClick={() => info('Opening shopping bag...', 2000)}
        navLinks={[
          { name: 'Home', path: '/' },
          { name: 'Showroom', path: '/showroom' },
          { name: 'Support', path: '/support' },
        ]}
      />

      <div style={{ paddingTop: 'var(--navbar-height)' }}>
        <DashboardLayout
          title="Console"
          user={userProfile}
          menuItems={sidebarMenuItems}
          logoIcon={<Layout className="w-5 h-5 text-[var(--color-bg)]" />}
          notificationCount={2}
          onNotificationClick={() => info('You have 2 unread notifications!', 3000)}
          breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Library Showcase' }]}
          footerText="Aurelius Design System © 2026. Made with Google Antigravity."
        >
          {/* Main Dashboard Sandbox Content */}
          <div className="space-y-8 max-w-6xl mx-auto">
            {/* Header Control Card */}
            <div className="premium-card flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight">Component Sandbox</h2>
                <p className="text-xs font-semibold text-[var(--color-text-muted)] mt-1">
                  Interact with the modernized controls below to test responsiveness, themes, and states.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <button onClick={toggleTheme} className="btn-primary btn-sm">
                  Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
                </button>
                <button onClick={dismissAll} className="btn-outline btn-sm">
                  Clear Toasts
                </button>
              </div>
            </div>

            {/* Grid of Sandboxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Box 1: Toast Triggers */}
              <div className="premium-card">
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-gold)' }}>Toasts & Alerts</h3>
                <p className="text-xs text-[var(--color-text-muted)] mb-5">
                  Floating notifications with live progress countdown bars and distinct severity variants.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => triggerToast('success')} className="btn-navy btn-sm" style={{ borderColor: 'var(--color-success)', color: 'var(--color-success)' }}>
                    Trigger Success
                  </button>
                  <button onClick={() => triggerToast('error')} className="btn-navy btn-sm" style={{ borderColor: 'var(--color-error)', color: 'var(--color-error)' }}>
                    Trigger Error
                  </button>
                  <button onClick={() => triggerToast('warning')} className="btn-navy btn-sm" style={{ borderColor: 'var(--color-warning)', color: 'var(--color-warning)' }}>
                    Trigger Warning
                  </button>
                  <button onClick={() => triggerToast('info')} className="btn-navy btn-sm" style={{ borderColor: 'var(--color-info)', color: 'var(--color-info)' }}>
                    Trigger Info
                  </button>
                </div>
              </div>

              {/* Box 2: Button System Catalog */}
              <div className="premium-card">
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-gold)' }}>Button Hierarchy</h3>
                <p className="text-xs text-[var(--color-text-muted)] mb-5">
                  Consistent size classes and high-fidelity gold/navy highlight transitions.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <button className="btn-primary btn-md">Primary Gold</button>
                  <button className="btn-navy btn-md">Navy Secondary</button>
                  <button className="btn-outline btn-md">Outline Gold</button>
                  <button className="btn-ghost btn-md">Ghost Accent</button>
                  <button className="btn-destructive btn-sm">Destructive</button>
                </div>
              </div>

              {/* Box 3: Loading States (Spinner, Skeleton, Dots, Pulse) */}
              <div className="premium-card">
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-gold)' }}>Loaders & Placeholders</h3>
                <p className="text-xs text-[var(--color-text-muted)] mb-4">
                  Select a variant type to inspect spinner arcs, bounce animations, or shimmer gradients:
                </p>
                
                {/* Variant selection tabs */}
                <div className="flex border-b mb-6" style={{ borderColor: 'var(--color-border)' }}>
                  {['spinner', 'skeleton', 'dots', 'pulse'].map((v) => (
                    <button
                      key={v}
                      onClick={() => setLoadingVariant(v)}
                      className="py-2 px-4 text-xs font-bold capitalize transition-colors duration-200"
                      style={{
                        borderBottom: loadingVariant === v ? '2px solid var(--color-gold)' : '2px solid transparent',
                        color: loadingVariant === v ? 'var(--color-gold)' : 'var(--color-text-muted)',
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>

                <div className="p-4 rounded-xl flex items-center justify-center min-h-[100px]" style={{ backgroundColor: 'var(--color-bg)' }}>
                  <LoadingSpinner
                    variant={loadingVariant}
                    label={loadingVariant === 'spinner' ? 'Syncing workspace data...' : undefined}
                    height="32px"
                    radius="var(--radius-md)"
                  />
                </div>
              </div>

              {/* Box 4: Inline Error Message Display */}
              <div className="premium-card">
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--color-gold)' }}>Inline Validation States</h3>
                <p className="text-xs text-[var(--color-text-muted)] mb-5">
                  Displays inline warnings, critical exceptions, and automated retry timers.
                </p>
                <ErrorMessage
                  title="Failed to Sync Database"
                  message="The remote data repository returned a timeout status. System is configured to try re-establishing the network pipeline."
                  severity="warning"
                  onRetry={() => success('Retrying database connection sync...', 2000)}
                  autoRetrySeconds={10}
                />
              </div>
            </div>

            {/* Empty State Component Section */}
            <div className="premium-card">
              <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--color-gold)' }}>Empty State Backdrop</h3>
              <p className="text-xs text-[var(--color-text-muted)] mb-6">
                Premium background geometric decorations, stagger entries, and multiple secondary CTA triggers.
              </p>
              <EmptyState
                icon={<ShieldAlert className="w-8 h-8" />}
                title="No Access Keys Allocated"
                message="You do not have any active API developer credentials provisioned. Create a key token to begin building integrations."
                actionLabel="Provision Access Key"
                onAction={() => success('Access key requested successfully!', 3000)}
                secondaryActionLabel="Review Security Policy"
                onSecondaryAction={() => info('Displaying security guidelines documentation...', 4000)}
              />
            </div>

            {/* Error Boundary Simulation */}
            <div className="premium-card">
              <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--color-gold)' }}>React Error Boundary</h3>
              <p className="text-xs text-[var(--color-text-muted)] mb-5">
                Simulates a crash inside the render lifecycle tree to verify the error fallback and developer accordion panel.
              </p>
              {showErrorDemo ? (
                <ErrorBoundary title="Fatal Sandbox Failure" homePath="/">
                  <CrashyComponent />
                </ErrorBoundary>
              ) : (
                <button
                  onClick={() => setShowErrorDemo(true)}
                  className="btn-destructive btn-md"
                >
                  Simulate Render Crash
                </button>
              )}
            </div>
          </div>
        </DashboardLayout>
      </div>

      {/* Modern Grid Footer showcase */}
      <Footer
        brandName="Aurelius"
        email="connect@aurelius.design"
        phone="+1 (555) 234-5678"
        onNewsletterSubmit={(email) => success(`Signed up ${email} to our newsletter!`, 3000)}
        socialLinks={[
          { platform: 'facebook', url: '#' },
          { platform: 'twitter', url: '#' },
          { platform: 'instagram', url: '#' },
          { platform: 'linkedin', url: '#' },
        ]}
      />
    </div>
  );
}

// Component designed to trigger a render crash
function CrashyComponent() {
  throw new Error('Sandbox simulated crash. This error was caught by the custom ErrorBoundary wrapper.');
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
