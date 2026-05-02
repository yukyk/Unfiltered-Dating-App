import React from 'react';
import { usePlansController } from '../../Controllers/usePlansController';

function cn(...classes) { return classes.filter(Boolean).join(' '); }

function Stagger({ children, delay = 0, className = '' }) {
  return (
    <div className={cn('opacity-0', className)} style={{
      animation: `fade-up 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s forwards`,
    }}>
      {children}
    </div>
  );
}

export default function Plans() {
  const {
    plans,
    selected,
    setSelected,
    handleSelect,
    handleBack
  } = usePlansController();

  return (
    <div className="flex flex-col min-h-[100svh] bg-ink relative px-6 pt-12 pb-8 overflow-y-auto">
      <Stagger delay={0.1}>
        <span className="font-josefin text-[0.52rem] tracking-[0.4em] uppercase text-muted mb-4 block">
          Choose your plan
        </span>
      </Stagger>
      <Stagger delay={0.2}>
        <h1 className="font-cormorant italic font-light text-4xl text-cream mb-2">
          How deep do you want to <span className="text-sand">go?</span>
        </h1>
      </Stagger>
      <Stagger delay={0.3}>
        <p className="font-lora text-sm text-muted mb-8">
          All plans show real people. The difference is how many you can reach.
        </p>
      </Stagger>

      <div className="flex flex-col gap-4 flex-1">
        {plans.map((plan, i) => (
          <Stagger key={plan.id} delay={0.4 + i * 0.1}>
            <button
              onClick={() => setSelected(plan.id)}
              className={cn(
                'w-full text-left p-5 border rounded-sm transition-all duration-300 relative',
                selected === plan.id ? 'border-terra bg-terra/5' : 'border-cream/8 hover:border-cream/15',
              )}
            >
              {selected === plan.id && (
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-terra rounded-l-sm" />
              )}
              {plan.badge && (
                <span className="absolute top-3 right-3 bg-terra/20 text-terra font-josefin text-[0.5rem] tracking-wider uppercase px-2 py-0.5 rounded-full">
                  {plan.badge}
                </span>
              )}
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="font-cormorant text-2xl text-cream font-semibold not-italic">{plan.name}</h3>
                <span className="font-josefin text-[0.6rem] tracking-wider text-sand">{plan.price}</span>
              </div>
              <ul className="flex flex-col gap-1.5">
                {plan.perks.map((perk, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="text-terra text-[0.6rem] mt-0.5">·</span>
                    <span className="font-lora text-sm text-cream/70">{perk}</span>
                  </li>
                ))}
              </ul>
            </button>
          </Stagger>
        ))}
      </div>

      <p className="font-lora text-xs text-muted text-center mt-4 mb-6 italic">
        Payment not required now. Start free — upgrade anytime.
      </p>

      <button
        onClick={handleSelect}
        className="w-full py-4 bg-terra text-cream font-josefin text-xs tracking-[0.2em] uppercase hover:bg-terra2 transition-colors"
      >
        Continue with selected plan →
      </button>
      <button
        onClick={handleBack}
        className="py-3 font-josefin text-[0.6rem] tracking-[0.2em] uppercase text-muted hover:text-cream transition-colors"
      >
        ← back
      </button>
    </div>
  );
}
