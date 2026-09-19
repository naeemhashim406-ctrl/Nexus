import React from 'react';
import { CountUp } from './CountUp';
import { SITE_CONFIG } from '../config/content';
import { Award, Globe2, CheckCircle2, History } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const statIcons = [Award, Globe2, CheckCircle2, History];

  return (
    <section
      id="trust-strip"
      className="relative z-20 py-12 md:py-16 bg-white border-y border-[#0B1F4D]/8 shadow-[0_10px_30px_rgba(11,31,77,0.02)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-[#0B1F4D]/10">
          {SITE_CONFIG.stats.map((stat, idx) => {
            const Icon = statIcons[idx % statIcons.length];
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center lg:items-start text-center lg:text-left px-2 lg:px-8 first:pl-0 last:pr-0"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-[#5BB8F5]/15 flex items-center justify-center text-[#1F4FA3]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#5B6B85]">
                    {stat.label}
                  </span>
                </div>

                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#0B1F4D] tracking-tight mb-1">
                  <CountUp
                    end={stat.value}
                    decimals={stat.value % 1 !== 0 ? 1 : 0}
                    prefix={stat.prefix || ''}
                    suffix={stat.suffix}
                  />
                </div>

                <p className="text-xs text-[#5B6B85] font-light max-w-[200px]">
                  {stat.sublabel}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
