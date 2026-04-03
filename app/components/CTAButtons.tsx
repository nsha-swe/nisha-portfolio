export default function CTAButtons() {
  const resumeEmailBody = `Hi Nisha,\n\nI came across your portfolio and would love to see your resume. Here's a bit of context on the role:\n\nCompany:\nRole:\nLocation:\n\nThanks,\n`;
  const resumeMailto = `mailto:nsha.swe@gmail.com?subject=${encodeURIComponent("Resume request — Nisha Ahamed")}&body=${encodeURIComponent(resumeEmailBody)}`;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a className="btn-primary" href="mailto:nsha.swe@gmail.com">Email</a>
      <a className="btn-secondary" href="https://www.linkedin.com/in/nisha-ahamed" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a className="btn-secondary" href="https://github.com/nsha-swe" target="_blank" rel="noopener noreferrer">GitHub</a>
      <div className="flex flex-wrap items-center gap-2 text-sm" style={{ color: "var(--muted)" }}>
        <span className="whitespace-nowrap">Resume available on request →</span>
        <a className="btn-secondary" href={resumeMailto} style={{ fontSize: "0.8rem", padding: "6px 16px" }}>
          Request Resume
        </a>
      </div>
    </div>
  );
}
