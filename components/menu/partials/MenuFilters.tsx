"use client";

interface MenuFiltersProps {
  options: string[];
  active:  string;
  onSelect: (value: string) => void;
}

export default function MenuFilters({ options, active, onSelect }: MenuFiltersProps) {
  return (
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-y border-primary-100">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="flex items-center gap-1 md:gap-3 overflow-x-auto py-5 scrollbar-none">
          {options.map((opt) => {
            const isActive = active === opt;
            return (
              <button
                key={opt}
                onClick={() => onSelect(opt)}
                className={`
                  group relative flex-shrink-0 px-4 md:px-6 py-2 text-[11px] md:text-xs
                  uppercase tracking-[0.22em] transition-colors duration-300 whitespace-nowrap
                  ${isActive
                    ? "text-black"
                    : "text-gray-500 hover:text-black"
                  }
                `}
              >
                {opt}
                <span
                  className={`
                    absolute left-1/2 -translate-x-1/2 -bottom-px h-[2px] bg-primary
                    transition-all duration-300
                    ${isActive ? "w-2/3" : "w-0 group-hover:w-1/4"}
                  `}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
