export default function ResumeAttach({ resume }) {
  if (!resume) return null;

  return (
    <a
      className="resume-attach"
      href={resume.href}
      download={resume.downloadName}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="resume-attach__badge">PDF</span>
      <span className="resume-attach__body">
        <span className="resume-attach__title">{resume.title}</span>
        <span className="resume-attach__meta">클릭하여 다운로드</span>
      </span>
    </a>
  );
}
