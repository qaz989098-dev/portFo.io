import { Link, useLocation } from 'react-router-dom';
import { profile } from '../data/projects';

export default function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo">
          {profile.name}
        </Link>
        <p className="header__period">{profile.period ?? 'Portfolio'}</p>
        {!isHome && (
          <Link to="/" className="header__back">
            프로젝트 목록
          </Link>
        )}
      </div>
    </header>
  );
}
