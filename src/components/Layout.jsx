import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import ScrollToTopOnNavigate from './ScrollToTopOnNavigate';

export default function Layout() {
  return (
    <div className="layout">
      <ScrollToTopOnNavigate />
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
