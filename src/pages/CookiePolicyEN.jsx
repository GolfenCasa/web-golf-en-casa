import React from "react";
import { Helmet } from "react-helmet-async";

export default function CookiePolicyEN() {
  const handleBack = () => {
    if (window.history.length > 1) window.history.back();
    else window.location.href = "/en/signature";
  };

  return (
    <main className="signature-sans min-h-screen bg-[#0B0B0B] text-[#F5F3EF]">
      <Helmet>
        <title>Cookie Policy | Golf en Casa Signature Projects</title>
        <meta name="description" content="Information about cookies used by Golf en Casa and how visitors can manage their preferences." />
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href="https://www.golfencasa.net/en/cookie-policy" />
        <link rel="icon" type="image/png" href="/signature/favicon-signature.png?v=20260810" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <style>{`
          .signature-serif { font-family: "Cormorant Garamond", Georgia, serif; }
          .signature-sans { font-family: "Inter", Arial, sans-serif; }
          ::selection { background: #C8AA7D; color: #0B0B0B; }
        `}</style>
      </Helmet>

      <header className="border-b border-white/10">
        <div className="mx-auto flex h-[82px] max-w-[1200px] items-center justify-between px-6 lg:px-10">
          <a href="/en/signature" aria-label="Golf en Casa Signature Projects">
            <img src="/signature/logo-signature-light.png" alt="Golf en Casa | Signature Projects" className="h-12 w-auto sm:h-14" />
          </a>
          <button type="button" onClick={handleBack} className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55 transition hover:text-[#C8AA7D]">
            ← Back
          </button>
        </div>
      </header>

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-10 lg:py-28">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C8AA7D]">Legal</p>
          <h1 className="signature-serif mt-5 text-5xl leading-[0.98] tracking-[-0.025em] sm:text-6xl lg:text-7xl">Cookie Policy</h1>
          <p className="mt-7 max-w-2xl text-sm font-light leading-7 text-white/55">Information about the cookies used on this website and the options available to manage your preferences.</p>
          <p className="mt-4 text-xs uppercase tracking-[0.12em] text-white/35">Policy version: 2026-09-03 (3 September 2026).</p>
        </div>
      </section>

      <section className="bg-[#F5F3EF] text-[#0B0B0B]">
        <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-10 lg:py-24">
          <div className="max-w-4xl space-y-10 text-sm font-light leading-7 text-black/65">
            <>
<LegalSection title="Use of cookies"><p>This website uses first-party and third-party cookies to improve the user experience and analyse website traffic.</p></LegalSection>
<LegalSection title="Types of cookies">
<p><strong className="font-medium text-black">Technical cookies:</strong> enable the basic operation of the website.</p>
<p><strong className="font-medium text-black">Analytics cookies:</strong> help us understand browsing behaviour and website usage.</p>
<p><strong className="font-medium text-black">Advertising cookies:</strong> may be used to display personalised advertising.</p>
</LegalSection>
<LegalSection title="Managing cookies"><p>You can configure or reject cookies through the consent banner or through your browser settings.</p></LegalSection>
</>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0B0B0B]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-5 px-6 py-10 text-[10px] uppercase tracking-[0.16em] text-white/30 sm:flex-row sm:justify-between lg:px-10">
          <p>© 2026 Golf en Casa</p>
          <a href="/en/signature" className="transition hover:text-[#C8AA7D]">Signature Projects</a>
        </div>
      </footer>
    </main>
  );
}

function LegalSection({ title, children }) {
  return (
    <section className="border-t border-black/15 pt-7 first:border-t-0 first:pt-0">
      <h2 className="signature-serif text-3xl leading-tight sm:text-4xl">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}
