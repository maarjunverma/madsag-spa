
import React, { useEffect, useRef, useState } from 'react';

interface AboutPageProps {
  onGetQuote: () => void;
}

const useCountUp = (target: number, duration = 1800, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
};

const StatCard: React.FC<{ value: string; label: string; suffix?: string; animate?: boolean }> = ({ value, label }) => (
  <div className="group relative glass rounded-2xl p-6 border border-white/5 hover:border-amber-500/30 transition-all duration-500 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-transparent transition-all duration-500" />
    <p className="text-3xl md:text-4xl font-black text-amber-400 tracking-tighter leading-none mb-2">{value}</p>
    <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest leading-relaxed">{label}</p>
  </div>
);

const PillarCard: React.FC<{ icon: string; title: string; description: string; index: number }> = ({ icon, title, description, index }) => (
  <div
    className="group relative glass rounded-2xl p-7 border border-white/5 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-1"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-amber-500/20 transition-all duration-300">
      <i className={`${icon} text-amber-400 text-lg`} />
    </div>
    <h3 className="text-white font-black text-base md:text-lg uppercase tracking-tight mb-3 leading-tight">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed font-medium">{description}</p>
  </div>
);

const AboutPage: React.FC<AboutPageProps> = ({ onGetQuote }) => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const pillars = [
    {
      icon: 'fa-solid fa-code',
      title: 'We Understand Both Technology & Marketing',
      description: 'Many agencies focus only on marketing. Others only build websites. At Madsag, we understand both sides — allowing us to create solutions where technology and marketing work together seamlessly.',
    },
    {
      icon: 'fa-solid fa-bullseye',
      title: 'We Focus on Business Goals, Not Just Deliverables',
      description: 'Before starting, we understand your business, your target audience, your competition, and your biggest challenges. Then we build a strategy designed entirely around your goals.',
    },
    {
      icon: 'fa-solid fa-arrow-trend-up',
      title: 'We Build Solutions Made to Grow',
      description: 'Your business will grow — and your digital systems should grow with it. We focus on scalable solutions that can support your future, not just solve today's problem.',
    },
    {
      icon: 'fa-solid fa-layer-group',
      title: 'One Partner for Your Digital Growth',
      description: 'From website development to digital marketing, automation, and growth strategy, Madsag brings everything under one roof. No more managing multiple freelancers and agencies.',
    },
  ];

  const reasons = [
    'Thinks like a business owner, not just a service provider',
    'Understands both code and marketing deeply',
    'Focuses on results and measurable business growth',
    'Builds custom solutions instead of one-size-fits-all strategies',
    'Always looking for smarter, faster, and more efficient ways to grow',
    'Can help turn your digital idea into a real business solution',
  ];

  return (
    <div className="relative bg-[#030712] min-h-screen text-white overflow-hidden">
      {/* Fixed background glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-600/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[0%] right-[-10%] w-[40%] h-[40%] bg-yellow-600/5 blur-[150px] rounded-full" />
      </div>

      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 md:pt-44 pb-20 px-6 overflow-hidden">
        {/* Decorative grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-amber-500/[0.06] blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 mb-8 border border-amber-500/30 rounded-full bg-amber-500/5 text-amber-400 text-[9px] font-black tracking-[0.35em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            About Madsag
          </div>

          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
            We Don't Just{' '}
            <span className="text-gold">Market</span>
            <br />
            Businesses. We Build
            <br />
            Their{' '}
            <span className="relative inline-block">
              Digital Growth.
              <span className="absolute -bottom-2 left-0 w-full h-[3px] bg-gradient-to-r from-amber-500 to-amber-300 rounded-full" />
            </span>
          </h1>

          <p className="text-gray-400 text-base md:text-xl leading-relaxed max-w-3xl font-medium mt-10">
            At <span className="text-amber-400 font-black">Madsag</span>, we help businesses turn ideas, websites, and marketing campaigns into real digital growth. We combine{' '}
            <span className="text-white font-bold">technology, creativity, and marketing strategy</span> to solve real business problems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button
              onClick={onGetQuote}
              className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-black text-[10px] uppercase tracking-[0.25em] rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-[0_0_30px_rgba(245,158,11,0.3)]"
            >
              <i className="fa-solid fa-paper-plane" />
              Let's Talk About Your Business
            </button>
            <a
              href="#our-goal"
              className="inline-flex items-center gap-3 px-8 py-4 border border-white/10 hover:border-amber-500/30 glass text-white font-black text-[10px] uppercase tracking-[0.25em] rounded-xl transition-all duration-200"
            >
              <i className="fa-solid fa-arrow-down" />
              Learn Our Story
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS ROW ── */}
      <section ref={statsRef} className="px-6 py-8 md:py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard value="50+" label="Businesses Served" animate={statsVisible} />
          <StatCard value="4x" label="Average ROI Delivered" animate={statsVisible} />
          <StatCard value="100%" label="Custom-Built Solutions" animate={statsVisible} />
          <StatCard value="24/7" label="Growth-Focused Support" animate={statsVisible} />
        </div>
      </section>

      {/* ── OUR GOAL ── */}
      <section id="our-goal" className="px-6 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-amber-500/30 rounded-full bg-amber-500/5 text-amber-400 text-[9px] font-black tracking-[0.35em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Our Goal
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-6">
                Helping Businesses <span className="text-gold">Grow With Confidence</span> In The Digital World
              </h2>
              <div className="space-y-5 text-gray-400 text-sm md:text-base leading-relaxed font-medium">
                <p>
                  We believe your digital presence should do more than simply look good. Your <span className="text-white">website should generate opportunities</span>. Your <span className="text-white">marketing should attract the right audience</span>. Your systems should save time. And your brand should stand out from the competition.
                </p>
                <p>
                  That's why we focus on creating <span className="text-amber-400 font-bold">practical, scalable, and result-driven digital solutions</span> that help businesses move from <em className="text-gray-300">"I want to grow"</em> to <em className="text-amber-400 font-bold">"I know how to grow."</em>
                </p>
              </div>
            </div>

            {/* Visual block */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-600/10 to-yellow-800/10 blur-3xl rounded-full" />
              <div className="relative glass rounded-3xl p-8 border border-white/5 space-y-5">
                {['Your website generates real opportunities', 'Your marketing attracts the right audience', 'Your systems save time & reduce manual work', 'Your brand stands out from the competition', 'Your growth strategy is clear and scalable'].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 flex-shrink-0 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mt-0.5">
                      <i className="fa-solid fa-check text-amber-400 text-xs" />
                    </div>
                    <p className="text-gray-300 font-semibold text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
                <div className="pt-4 border-t border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-500">Our Simple Approach</p>
                  <p className="text-white font-bold mt-1">Understand your business first, then build the right digital solution around your goals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE MADSAG (PILLARS) ── */}
      <section className="px-6 py-20 md:py-28 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-amber-500/[0.03] blur-[140px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-amber-500/30 rounded-full bg-amber-500/5 text-amber-400 text-[9px] font-black tracking-[0.35em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Why Businesses Choose Madsag
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
              A Different Kind of <span className="text-gold">Digital Partner</span>
            </h2>
            <p className="text-gray-400 mt-4 text-sm md:text-base max-w-2xl mx-auto font-medium">
              We're not just another agency. Here's what makes us the right partner for businesses that want to grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {pillars.map((p, i) => (
              <PillarCard key={i} index={i} icon={p.icon} title={p.title} description={p.description} />
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY MADSAG IS THE RIGHT PARTNER ── */}
      <section className="px-6 py-20 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-14 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-3xl rounded-full" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-amber-500/30 rounded-full bg-amber-500/5 text-amber-400 text-[9px] font-black tracking-[0.35em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                Why We Are the Right Partner
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-10">
                You Should Work With Madsag <span className="text-gold">If You're Looking For…</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {reasons.map((r, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="w-7 h-7 flex-shrink-0 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mt-0.5 group-hover:bg-amber-500/20 group-hover:border-amber-500/40 transition-all">
                      <i className="fa-solid fa-arrow-right text-amber-400 text-[10px]" />
                    </div>
                    <p className="text-gray-300 font-semibold text-sm leading-relaxed group-hover:text-white transition-colors">{r}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUNDER SECTION ── */}
      <section className="px-6 py-20 md:py-32 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/[0.04] blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-amber-500/30 rounded-full bg-amber-500/5 text-amber-400 text-[9px] font-black tracking-[0.35em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Meet the Founder
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight">
              The Mind Behind <span className="text-gold">Madsag</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Photo column */}
            <div className="lg:col-span-2">
              <div className="relative group">
                <div className="absolute -inset-3 bg-gradient-to-b from-amber-500/20 to-transparent blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative rounded-3xl overflow-hidden aspect-square border border-white/10 group-hover:border-amber-500/30 transition-all duration-500">
                  <img
                    src="/founder-arjun.png"
                    alt="Arjun Verma — Founder of Madsag"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Overlay bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-amber-400 text-[9px] font-black uppercase tracking-widest mb-1">Founder & Lead Strategist</p>
                    <p className="text-white font-black text-lg uppercase tracking-tight">Arjun Verma</p>
                  </div>
                </div>

                {/* Social links */}
                <div className="flex gap-3 mt-4 justify-center">
                  {[
                    { icon: 'fa-brands fa-linkedin-in', href: 'https://linkedin.com/in/arjunverma', label: 'LinkedIn' },
                    { icon: 'fa-brands fa-instagram', href: 'https://instagram.com/madsag.agency', label: 'Instagram' },
                    { icon: 'fa-brands fa-whatsapp', href: 'https://wa.me/919896336357', label: 'WhatsApp' },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex-1 py-3 glass border border-white/10 hover:border-amber-500/40 hover:bg-amber-500/10 rounded-xl flex items-center justify-center text-gray-400 hover:text-amber-400 transition-all text-sm"
                    >
                      <i className={s.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bio column */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-amber-500 mb-3">Founder of Madsag</p>
                <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-tight text-white mb-5">Arjun Verma</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">
                  Web Developer &nbsp;·&nbsp; Digital Growth Expert &nbsp;·&nbsp; Automation Specialist
                </p>
              </div>

              <div className="space-y-4 text-gray-400 text-sm md:text-base leading-relaxed font-medium">
                <p>
                  Madsag was founded by <span className="text-white font-bold">Arjun Verma</span>, a web developer, digital growth enthusiast, and technology entrepreneur passionate about helping businesses build and grow in the digital world.
                </p>
                <p>
                  With experience across <span className="text-amber-400">web development, digital marketing, automation, chatbots, e-commerce, and SaaS solutions</span>, Arjun brings a unique combination of technical knowledge and business thinking to every project.
                </p>
                <p>
                  He believes that a business should not have to choose between great technology and effective marketing. That's why he built Madsag around a simple idea — <span className="text-white font-bold">combine technology, creativity, and marketing to create digital solutions that actually help businesses grow.</span>
                </p>
              </div>

              {/* Vision quote */}
              <div className="relative glass rounded-2xl p-6 border border-amber-500/20 overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-amber-700 rounded-full" />
                <div className="absolute top-4 right-5 text-amber-500/10 text-8xl font-black leading-none select-none">"</div>
                <p className="text-white font-bold text-base md:text-lg leading-relaxed pl-4 relative z-10">
                  I believe the best digital solutions are not built just to look good. They are built to solve problems, create opportunities, and help businesses grow.
                </p>
                <div className="flex items-center gap-3 mt-4 pl-4">
                  <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center font-black text-black text-xs">A</div>
                  <div>
                    <p className="text-white font-black text-xs">Arjun Verma</p>
                    <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Founder, Madsag</p>
                  </div>
                </div>
              </div>

              {/* Expertise tags */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-gray-500 mb-3">Core Expertise</p>
                <div className="flex flex-wrap gap-2">
                  {['Web Development', 'Digital Marketing', 'Automation', 'Chatbots', 'E-Commerce', 'SaaS', 'Growth Strategy', 'UI/UX Design'].map((tag) => (
                    <span key={tag} className="px-3 py-1.5 glass border border-white/10 text-gray-300 text-[10px] font-bold uppercase tracking-wider rounded-lg hover:border-amber-500/30 hover:text-amber-400 transition-all cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <div className="relative glass rounded-3xl md:rounded-[2.5rem] p-10 md:p-16 border border-amber-500/20 overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-500/5" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-amber-500/10 blur-[80px] rounded-full" />
            <div className="relative z-10">
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-amber-500 mb-4">Let's Build Your Digital Growth</p>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-6">
                Your Business Deserves A{' '}
                <span className="text-gold">Real Digital Growth Strategy</span>
              </h2>
              <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto font-medium leading-relaxed mb-10">
                Not just a basic website or random marketing campaigns — a digital growth strategy built around your goals. Let's build something that works, grows, and creates real business impact.
              </p>
              <button
                onClick={onGetQuote}
                id="about-cta-btn"
                className="inline-flex items-center gap-3 px-10 py-5 bg-amber-500 hover:bg-amber-400 text-black font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl transition-all duration-200 hover:scale-[1.03] shadow-[0_0_40px_rgba(245,158,11,0.35)]"
              >
                <i className="fa-solid fa-arrow-right" />
                Let's Talk About Your Business
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
