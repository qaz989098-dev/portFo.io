export default function ResumeAttach({ resume }) {
  if (!resume) return null;

  return (
    <a
      className="resume-btn"
      href={resume.href}
      download={resume.downloadName}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${resume.title} PDF 보기`}
    >
      <span className="resume-btn__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
          <path
            d="M7 3.75h6.2L17.25 8v12.25H7A1.25 1.25 0 0 1 5.75 19V5A1.25 1.25 0 0 1 7 3.75Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M13 3.75V8h4.25"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M12 11.25v5.5M9.75 14.5 12 16.75 14.25 14.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="resume-btn__text">
        <span className="resume-btn__title">이력서 보기</span>
        <span className="resume-btn__meta">PDF 다운로드</span>
      </span>
    </a>
  );
}
