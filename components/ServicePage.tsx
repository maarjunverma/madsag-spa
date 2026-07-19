import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ServicePageData } from '../data/servicePageData';

interface ServicePageProps {
  data: ServicePageData;
  onGetQuote: () => void;
}

const ServicePage: React.FC<ServicePageProps> = ({ data, onGetQuote }) => {
  useEffect(() => {
    document.title = data.seoTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', data.seoDescription);
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `https://madsag.in/services/${data.slug}`;
    window.scrollTo(0, 0);

    return () => {
      document.title = 'MADSAG | Digital Agency — SEO, Google Ads, Landing Pages & WordPress';
      if (metaDesc) metaDesc.setAttribute('content', 'MADSAG is a performance-first digital agency in India specialising in SEO, Google Ads, landing pages, and WordPress development.');
      if (canonical) canonical.href = 'https://madsag.in/';
    };
  }, [data]);

  return (
    <div className="min-h-screen bg-[#030712] text-white">

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* HERO                                                          */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="sp-hero" className="relative min-h-[80vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/[0.05] blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-[5%] w-[350px] h-[350px] bg-amber-600/[0.04] blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-[10px] text-gray-600 font-black uppercase tracking-widest mb-8">
            <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
            <i className="fa-solid fa-chevron-right text-[8px]" />
            <span>Services</span>
            <i className="fa-solid fa-chevron-right text-[8px]" />
            <span className="text-amber-400">{data.badge.split(' ')[0]}</span>
          </nav>

          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 mb-8 border rounded-full text-[11px] font-black tracking-[0.3em] uppercase ${data.badgeColor}`}>
            <i className={`${data.badgeIcon} text-xs`} />
            {data.badge}
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tighter leading-[1.0] uppercase text-white">
            {data.headline}
            <br />
            <span className="text-gold">{data.headlineHighlight}</span>
          </h1>

          <p className="text-amber-400/80 font-black text-sm md:text-base uppercase tracking-[0.25em] mb-6">
            {data.subheadline}
          </p>

          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            {data.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              id="sp-hero-cta"
              onClick={onGetQuote}
              className="px-10 py-4 btn-amber rounded-2xl text-[10px] tracking-[0.3em] flex items-center justify-center gap-2.5"
            >
              <i className="fa-solid fa-paper-plane text-xs" />
              Get Free Quote
            </button>
            <a
              href="#sp-packages"
              className="px-10 py-4 bg-white/[0.04] border border-white/10 hover:border-amber-500/20 hover:bg-white/[0.07] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2.5"
            >
              <i className="fa-solid fa-table-list text-amber-500/60 text-xs" />
              View Pricing
            </a>
          </div>

          {/* Metrics row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto">
            {data.metrics.map((m) => (
              <div key={m.label} className="text-center p-4 rounded-2xl border border-white/[0.05] bg-white/[0.02]">
                <div className="text-2xl md:text-3xl font-black text-gold mb-1">{m.value}</div>
                <div className="text-[10px] font-black text-white uppercase tracking-widest">{m.label}</div>
                {m.sublabel && <div className="text-[9px] text-gray-600 mt-0.5 font-medium">{m.sublabel}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* FEATURES — Why MADSAG                                         */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="sp-features" className="py-24 px-6 bg-[#04040f] border-y border-white/[0.04]" aria-labelledby="sp-features-heading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4">What's Included</p>
            <h2 id="sp-features-heading" className="text-3xl md:text-5xl font-black tracking-tighter text-white">
              Everything You Need to <span className="text-gold">Win</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
              No half-measures. Every engagement is engineered end-to-end for measurable business results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.features.map((f, i) => (
              <div
                key={f.title}
                className="group relative p-6 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-amber-500/25 hover:bg-white/[0.04] transition-all duration-300"
              >
                {/* Number watermark */}
                <span className="absolute top-4 right-5 text-[10px] font-black text-white/[0.04] select-none">
                  0{i + 1}
                </span>
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center mb-5 group-hover:bg-amber-500/15 transition-all">
                  <i className={`${f.icon} text-amber-400 text-sm`} />
                </div>
                <h3 className="text-white font-black text-base mb-3 leading-tight">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* RESULT PROOF — Social proof banner                            */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="sp-proof" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 md:p-12 rounded-3xl border border-amber-500/20 bg-amber-500/[0.03] overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.04] to-transparent rounded-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                <i className="fa-solid fa-trophy text-amber-400 text-xl" />
              </div>
              <div>
                <h3 className="text-white font-black text-lg md:text-xl mb-2 tracking-tight">
                  {data.resultHeadline}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{data.resultProof}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* PROCESS — How we work                                         */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="sp-process" className="py-24 px-6 bg-[#04040f] border-y border-white/[0.04]" aria-labelledby="sp-process-heading">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4">Our Method</p>
            <h2 id="sp-process-heading" className="text-3xl md:text-5xl font-black tracking-tighter text-white">
              How We <span className="text-gold">Execute</span>
            </h2>
          </div>

          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-7 top-8 bottom-8 w-px bg-gradient-to-b from-amber-500/30 via-amber-500/10 to-transparent hidden md:block" />

            <div className="space-y-6">
              {data.steps.map((step, i) => (
                <div key={step.number} className="flex gap-6 group">
                  {/* Step number circle */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl border border-amber-500/25 bg-[#030712] flex flex-col items-center justify-center relative z-10 group-hover:border-amber-500/50 group-hover:bg-amber-500/[0.07] transition-all">
                    <span className="text-[9px] font-black text-amber-500/60 uppercase tracking-widest">{step.number}</span>
                  </div>
                  <div className="flex-1 pb-6">
                    <h3 className="text-white font-black text-base md:text-lg mb-2 group-hover:text-amber-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* PACKAGES — Pricing                                            */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="sp-packages" className="py-24 px-6" aria-labelledby="sp-packages-heading">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4">Transparent Pricing</p>
            <h2 id="sp-packages-heading" className="text-3xl md:text-5xl font-black tracking-tighter text-white">
              Choose Your <span className="text-gold">Package</span>
            </h2>
            <p className="text-gray-500 mt-4 max-w-lg mx-auto text-sm">
              Fixed scope. No hidden fees. Need something in between? We'll scope a custom package for free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            {data.packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-2xl p-7 border transition-all duration-300 flex flex-col ${
                  pkg.popular
                    ? 'border-amber-500/40 bg-amber-500/[0.04] shadow-[0_0_60px_rgba(251,191,36,0.08)]'
                    : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-500 text-black text-[9px] font-black uppercase tracking-[0.2em] rounded-full">
                    Most Popular
                  </div>
                )}

                {/* Package header */}
                <div className="mb-6">
                  <h3 className="text-white font-black text-xl mb-2">{pkg.name}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-5">{pkg.description}</p>
                  <div className="text-3xl font-black text-gold">{pkg.price}</div>
                  {pkg.priceNote && (
                    <div className="text-[10px] text-gray-600 font-medium mt-1">{pkg.priceNote}</div>
                  )}
                </div>

                {/* Features list */}
                <ul className="space-y-2.5 mb-6 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-400">
                      <i className="fa-solid fa-check text-amber-500 text-xs mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Delivery */}
                <div className="flex items-center gap-2 py-3 border-t border-white/[0.05] mb-5">
                  <i className="fa-solid fa-clock text-amber-500/40 text-xs" />
                  <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{pkg.delivery}</span>
                </div>

                {/* CTA */}
                <button
                  id={`sp-pkg-${pkg.name.toLowerCase().replace(/\s+/g,'-')}`}
                  onClick={onGetQuote}
                  className={`w-full py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2 ${
                    pkg.popular
                      ? 'btn-amber'
                      : 'bg-white/[0.04] border border-white/[0.08] hover:border-amber-500/25 hover:bg-white/[0.07] text-gray-300 hover:text-white'
                  }`}
                >
                  <i className="fa-solid fa-paper-plane text-xs" />
                  {pkg.cta}
                </button>
              </div>
            ))}
          </div>

          {/* Custom scope note */}
          <div className="mt-10 text-center p-6 rounded-2xl border border-white/[0.05] bg-white/[0.01]">
            <p className="text-gray-500 text-sm">
              <span className="text-white font-black">Not sure which fits?</span> Book a free 20-minute strategy call.
              We'll scope the exact package for your goals — no sales pressure.
            </p>
            <button
              onClick={onGetQuote}
              id="sp-custom-scope"
              className="mt-4 inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-black text-[11px] uppercase tracking-widest transition-colors"
            >
              <i className="fa-solid fa-calendar text-xs" />
              Book Free Strategy Call
              <i className="fa-solid fa-arrow-right text-[9px]" />
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* TRUST SIGNALS                                                 */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="sp-trust" className="py-16 px-6 bg-[#04040f] border-y border-white/[0.04]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: 'fa-solid fa-shield-halved',
                title: 'No Lock-In Contracts',
                desc: 'Month-to-month or project-based. You stay because results keep you here — not because of a contract.',
              },
              {
                icon: 'fa-solid fa-eye',
                title: 'Full Transparency',
                desc: 'You have access to all accounts, reports, and data. We never hide results behind proprietary dashboards.',
              },
              {
                icon: 'fa-solid fa-headset',
                title: 'Direct Access',
                desc: 'No account manager relay. You communicate directly with the strategist or engineer working on your project.',
              },
            ].map((t) => (
              <div key={t.title} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center mt-0.5">
                  <i className={`${t.icon} text-amber-400 text-sm`} />
                </div>
                <div>
                  <h3 className="text-white font-black text-sm mb-1.5">{t.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* FAQ                                                           */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="sp-faq" className="py-24 px-6" aria-labelledby="sp-faq-heading">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-amber-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4">Questions Answered</p>
            <h2 id="sp-faq-heading" className="text-3xl md:text-4xl font-black tracking-tighter text-white">
              Everything You Need to <span className="text-gold">Know</span>
            </h2>
          </div>

          <div className="space-y-4">
            {data.faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* BOTTOM CTA                                                    */}
      {/* ══════════════════════════════════════════════════════════════ */}
      <section id="sp-cta" className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-amber-500/25 rounded-full bg-amber-500/[0.05] text-amber-400 text-[10px] font-black tracking-[0.3em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Ready to Start?
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-4">
            Let's Build Something That <span className="text-gold">Converts</span>
          </h2>
          <p className="text-gray-500 mb-10 text-sm leading-relaxed">
            Free consultation. No obligation. We'll map out exactly what you need and give you a transparent quote within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              id="sp-bottom-cta"
              onClick={onGetQuote}
              className="px-12 py-4 btn-amber rounded-2xl text-[10px] tracking-[0.3em] flex items-center justify-center gap-2.5"
            >
              <i className="fa-solid fa-paper-plane text-xs" />
              Get Free Quote Now
            </button>
            <a
              href="https://wa.me/919310486071"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-4 bg-white/[0.04] border border-white/[0.08] hover:border-green-500/30 hover:text-green-400 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2.5"
            >
              <i className="fa-brands fa-whatsapp text-sm" />
              WhatsApp Us
            </a>
          </div>
          <p className="mt-6 text-[10px] text-gray-700 font-bold uppercase tracking-widest">
            Response within 2 business hours · Free strategy call included
          </p>
        </div>
      </section>
    </div>
  );
};

// ── Accordion FAQ Item ─────────────────────────────────────────────────
const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        open ? 'border-amber-500/25 bg-amber-500/[0.03]' : 'border-white/[0.05] bg-white/[0.02] hover:border-white/[0.1]'
      }`}
    >
      <button
        className="w-full flex items-start justify-between gap-4 p-6 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-white font-black text-sm leading-snug">{q}</span>
        <span className={`flex-shrink-0 w-7 h-7 rounded-lg border flex items-center justify-center transition-all ${open ? 'border-amber-500/40 bg-amber-500/10 text-amber-400' : 'border-white/10 text-gray-500'}`}>
          <i className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-400 ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <p className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
};

export default ServicePage;
