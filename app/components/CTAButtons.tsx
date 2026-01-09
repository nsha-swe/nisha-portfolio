export default function CTAButtons() {
  const resumeEmailBody = `Hi Nisha,

I came across your portfolio and would love to see your resume. Here's a bit of context on the role:

Company:
Role:
Location:

Thanks,
`;

  const resumeEmailSubject = encodeURIComponent("Resume request — Nisha Ahamed");
  const resumeEmailBodyEncoded = encodeURIComponent(resumeEmailBody);
  const resumeMailto = `mailto:nsha.swe@gmail.com?subject=${resumeEmailSubject}&body=${resumeEmailBodyEncoded}`;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex flex-wrap items-center gap-2 text-sm text-black/60">
        <span className="whitespace-nowrap">Resume available on request →</span>
        <a
          className="rounded-full border border-black/10 bg-black px-4 py-1.5 text-xs font-medium text-white hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-black/20 whitespace-nowrap"
          href={resumeMailto}
        >
          Request Resume
        </a>
      </div>
      <a
        className="rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-medium hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-black/20"
        href="https://github.com/nsha-swe"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
      <a
        className="rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-medium hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-black/20"
        href="https://www.linkedin.com/in/nisha-ahamed"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      <a
        className="rounded-full border border-black/10 bg-white px-5 py-2 text-sm font-medium hover:bg-black/5 transition-colors focus:outline-none focus:ring-2 focus:ring-black/20"
        href="mailto:nsha.swe@gmail.com"
      >
        Email
      </a>
    </div>
  );
}

