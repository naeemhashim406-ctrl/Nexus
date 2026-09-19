import React from 'react';
import { CountUp } from './CountUp';
import { SITE_CONFIG } from '../config/content';
import { Award, Globe2, CheckCircle2, History } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const statIcons = [Award, Globe2, CheckCircle2, History];

  return (
    <section
      id="trust-strip"
      className="relative z-20 py-10 md:py-16 bg-white border-y border-[#0B1F4D]/8 shadow-[0_10px_30px_rgba(11,31,77,0.02)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 sm:gap-8 lg:gap-0 lg:divide-x lg:divide-[#0B1F4D]/10">
          {SITE_CONFIG.stats.map((stat, idx) => {
            const Icon = statIcons[idx % statIcons.length];
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center lg:items-start text-center lg:text-left px-2 sm:px-4 lg:px-8 first:pl-0 last:pr-0 min-w-0"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-2 max-w-full">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#5BB8F5]/15 flex items-center justify-center text-[#1F4FA3] flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-wider sm:tracking-[0.2em] font-medium text-[#5B6B85] truncate sm:overflow-visible">
                    {stat.label}
                  </span>
                </div>

                <div className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light text-[#0B1F4D] tracking-tight mb-1">
                  <CountUp
                    end={stat.value}
                    decimals={stat.value % 1 !== 0 ? 1 : 0}
                    prefix={stat.prefix || ''}
                    suffix={stat.suffix}
                  />
                </div>

                <p className="text-[11px] sm:text-xs text-[#5B6B85] font-light max-w-[200px] break-words">
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
