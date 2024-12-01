import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { UserPreferencesProvider } from './contexts/UserPreferences'
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load components
const NavBar = lazy(() => import('./components/Navbar'));
const Hero = lazy(() => import('./components/Hero'));
const Mission = lazy(() => import('./components/Mission'));
const Projects = lazy(() => import('./components/Projects'));
const GetInvolved = lazy(() => import('./components/GetInvolved'));
const Events = lazy(() => import('./components/Events'));
const Contact = lazy(() => import('./components/Contact'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Footer = lazy(() => import('./components/Footer'));
const Privacy = lazy(() => import('./components/Privacy'));
const Terms = lazy(() => import('./components/Terms'));

function App() {
  // Navigation links configuration
  const navLinks = [
    { to: '/about', label: 'About Us' },
    { to: '/programs', label: 'Programs' },
    { to: '/get-involved', label: 'Get Involved' },
    { to: '/contact', label: 'Contact' },
  ];

  // Right side content (search and donate button)
  const rightContent = (
    <>
      <input
        type="text"
        placeholder="Search..."
        className="w-48 px-4 py-1 text-sm text-neutral-700 bg-neutral-50 rounded-full focus:outline-none focus:ring-2 focus:ring-[rgb(var(--color-primary))] focus:bg-white transition-all"
      />
      <Link
        to="/donate"
        className="btn btn-accent"
      >
        Donate Now
      </Link>
    </>
  );

  return (
    <UserPreferencesProvider>
      <Router>
        <div className="min-h-screen">
          <Suspense fallback={<LoadingSpinner />}>
            <NavBar
              logo="HELP Foundation"
              links={navLinks}
              rightContent={rightContent}
              className="fixed top-0 z-50 shadow-sm"
            />
          </Suspense>
          <div className="pt-16">
            <main>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <Suspense fallback={<LoadingSpinner />}>
                          <Hero />
                        </Suspense>
                        <Suspense fallback={<LoadingSpinner />}>
                          <Mission />
                        </Suspense>
                        <Suspense fallback={<LoadingSpinner />}>
                          <Projects />
                        </Suspense>
                        <Suspense fallback={<LoadingSpinner />}>
                          <GetInvolved />
                        </Suspense>
                        <Suspense fallback={<LoadingSpinner />}>
                          <Events />
                        </Suspense>
                        <Suspense fallback={<LoadingSpinner />}>
                          <Contact />
                        </Suspense>
                        <Suspense fallback={<LoadingSpinner />}>
                          <Testimonials />
                        </Suspense>
                      </>
                    }
                  />
                  <Route
                    path="/privacy"
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Privacy />
                      </Suspense>
                    }
                  />
                  <Route
                    path="/terms"
                    element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Terms />
                      </Suspense>
                    }
                  />
                </Routes>
              </Suspense>
              <Suspense fallback={<LoadingSpinner />}>
                <Footer />
              </Suspense>
            </main>
          </div>
        </div>
      </Router>
    </UserPreferencesProvider>
  )
}

export default App;
