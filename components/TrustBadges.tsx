
import React, { useEffect, useRef } from 'react';

interface Badge {
  name: string;
  icon: string;
  color: string;
  label: string;
}

const BADGES: Badge[] = [
  { name: 'Google Ads',     icon: 'fa-brands fa-google',        color: '#4285F4', label: 'Certified Partner'        },
  { name: 'Meta Ads',       icon: 'fa-brands fa-meta',          color: '#0082FB', label: 'Business Partner'         },
  { name: 'Hostinger',      icon: 'fa-solid fa-server',         color: '#7B4DF6', label: 'Hosting Partner'          },
  { name: 'Shopify',        icon: 'fa-brands fa-shopify',       color: '#96BF48', label: 'Partner Developer'        },
  { name: 'WordPress',      icon: 'fa-brands fa-wordpress',     color: '#21759B', label: 'Expert Agency'            },
  { name: 'AWS',            icon: 'fa-brands fa-aws',           color: '#FF9900', label: 'Cloud Partner'            },
  { name: 'Cloudflare',     icon: 'fa-solid fa-shield',         color: '#F48120', label: 'Security Partner'         },
  { name: 'Stripe',         icon: 'fa-brands fa-stripe',        color: '#635BFF', label: 'Payments Partner'         },
  { name: 'Vercel',         icon: 'fa-solid fa-triangle',       color: '#FFFFFF', label: 'Deploy Partner'           },
  { name: 'GitHub',         icon: 'fa-brands fa-github',        color: '#FFFFFF', label: 'Open Source'              },
  { name: 'Google Ads',     icon: 'fa-brands fa-google',        color: '#4285F4', label: 'Certified Partner'        },
  { name: 'Meta Ads',       icon: 'fa-brands fa-meta',          color: '#0082FB', label: 'Business Partner'         },
  { name: 'Hostinger',      icon: 'fa-solid fa-server',         color: '#7B4DF6', label: 'Hosting Partner'          },
  { name: 'Shopify',        icon: 'fa-brands fa-shopify',       color: '#96BF48', label: 'Partner Developer'        },
  { name: 'WordPress',      icon: 'fa-brands fa-wordpress',     color: '#21759B', label: 'Expert Agency'            },
  { name: 'AWS',            icon: 'fa-brands fa-aws',           color: '#FF9900', label: 'Cloud Partner'            },
  { name: 'Cloudflare',     icon: 'fa-solid fa-shield',         color: '#F48120', label: 'Security Partner'         },
  { name: 'Stripe',         icon: 'fa-brands fa-stripe',        color: '#635BFF', label: 'Payments Partner'         },
  { name: 'Vercel',         icon: 'fa-solid fa-triangle',       color: '#FFFFFF', label: 'Deploy Partner'           },
  { name: 'GitHub',         icon: 'fa-brands fa-github',        color: '#FFFFFF', label: 'Open Source'              },
];

const TrustBadges: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let offset = 0;
    let raf: number;
    const speed = 0.4; // px per frame

    const animate = () => {
      offset += speed;
      // Each card is approx 176px wide + 16px gap = 192px; 10 unique items
      if (offset >= 192 * 10) offset = 0;
      track.style.transform = `translateX(-${offset}px)`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const pause = () => cancelAnimationFrame(raf);
    const resume = () => { raf = requestAnimationFrame(animate); };
    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', resume);

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener('mouseenter', pause);
      track.removeEventListener('mouseleave', resume);
    };
  }, []);

  return (
    <section
      id="trust-badges"
      aria-label="Our Technology Partners and Certifications"
      className="relative py-10 overflow-hidden border-y border-white/[0.04] bg-[#030712]"
    >
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 z-10"
        style={{ background: 'linear-gradient(to right, #030712, transparent)' }} />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 z-10"
        style={{ background: 'linear-gradient(to left, #030712, transparent)' }} />

      {/* Label */}
      <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-gray-700 mb-6 relative z-10">
        Trusted by — Partnered With
      </p>

      {/* Scrolling track */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-4 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {BADGES.map((badge, i) => (
            <div
              key={`${badge.name}-${i}`}
              className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-xl border border-white/[0.06] bg-white/[0.025] hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-300 group cursor-default select-none"
              style={{ minWidth: '168px' }}
            >
              {/* Icon with brand colour */}
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${badge.color}18` }}
              >
                <i
                  className={`${badge.icon} text-base`}
                  style={{ color: badge.color }}
                />
              </div>
              <div>
                <div className="text-[12px] font-black text-white leading-tight whitespace-nowrap">
                  {badge.name}
                </div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-gray-600 whitespace-nowrap">
                  {badge.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
