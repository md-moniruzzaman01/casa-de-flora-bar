interface MenuCardProps {
  id: string;
  title: string;
  price: string;
  minGuests: string;
  sections: any[];
  addon: string;
  details: any[];
  dark?: boolean;
}

export default function MenuCard({ id, title, price, minGuests, sections, addon, details, dark }: MenuCardProps) {
  return (
    <div className={`rounded-3xl border border-[#f9e4e8] overflow-hidden ${dark ? 'bg-[#1a1014] text-white' : 'bg-[#fdf6f0]'}`}>
      {/* Header */}
      <div className="p-8 flex justify-between items-start border-b border-[#f9e4e8]/50">
        <div>
          <h2 className="font-serif text-3xl">
            <span className="opacity-50 mr-2">{id}</span> {title}
          </h2>
          <p className="text-xs uppercase tracking-widest mt-1 opacity-70">{minGuests}</p>
        </div>
        <div className="text-right">
          <p className="font-serif text-3xl">{price}</p>
          <p className="text-[10px] uppercase tracking-widest opacity-60">per person</p>
        </div>
      </div>

      {/* Grid Selection */}
      <div className="grid md:grid-cols-3 gap-1 p-1 bg-[#f9e4e8]">
        {sections.map((sec, i) => (
          <div key={i} className={`p-6 ${dark ? 'bg-[#2d1a25]' : 'bg-white'}`}>
            <h4 className="bg-[#f9e4e8] text-[#c4637a] text-[10px] font-bold tracking-widest p-2 mb-4 uppercase text-center">
              {sec.label}
            </h4>
            <p className="font-serif italic mb-3">{sec.subtitle}</p>
            <ul className="text-sm space-y-2 opacity-80">
              {sec.items.map((item: string) => <li key={item}>• {item}</li>)}
            </ul>
          </div>
        ))}
      </div>

      {/* Addon Strip */}
      <div className="p-4 text-center text-xs italic opacity-70 border-y border-[#f9e4e8]">
        {addon}
      </div>

      {/* Bottom Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 p-1 bg-[#f9e4e8]">
        {details.map((det, i) => (
          <div key={i} className={`p-4 text-center ${dark ? 'bg-[#2d1a25]' : 'bg-[#fdf6f0]'}`}>
            <h5 className="text-[9px] font-bold tracking-widest uppercase opacity-50 mb-1">{det.label}</h5>
            <p className="text-[11px] leading-tight">{det.value}</p>
          </div>
        ))}
      </div>
      
      <p className="p-6 text-[10px] text-center opacity-60 max-w-2xl mx-auto italic">
        Pair the Brunch package with our Cocktail Hour tier for a full morning experience. Great for baby showers, bridal brunches, and birthday celebrations.
      </p>
    </div>
  );
}