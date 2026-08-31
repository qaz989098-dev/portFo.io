import { profile } from '../data/projects';

const EPILOGUE_HREF = `${import.meta.env.BASE_URL}#epilogue`;

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__item">
          {profile.name}
          {profile.role ? ` · ${profile.role}` : ''}
        </p>
        {profile.email ? (
          <a className="footer__item" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        ) : null}
        {profile.phone ? (
          <a className="footer__item" href={`tel:${profile.phone.replace(/\D/g, '')}`}>
            {profile.phone}
          </a>
        ) : null}
        {profile.epilogue?.length > 0 && (
          <a className="footer__item" href={EPILOGUE_HREF}>
            에필로그
          </a>
        )}
        {profile.resume && (
          <a
            className="footer__item"
            href={profile.resume.href}
            download={profile.resume.downloadName}
            target="_blank"
            rel="noopener noreferrer"
          >
            이력서 PDF
          </a>
        )}
      </div>
    </footer>
  );
}
