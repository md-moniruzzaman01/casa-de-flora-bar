import React from 'react';

interface PricingTier {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  note?: string;
}

const cateringOptions: PricingTier[] = [
  {
    id: '01',
    name: 'Casa Brunch Catering',
    price: 38,
    description: 'Perfect for bridal showers and morning celebrations.',
    features: ['2 Signature Brunch Options', '1 Breakfast Protein', 'Scrambled Eggs & Biscuits Included'],
  },
  {
    id: '02',
    name: 'Cocktail & Finger Food',
    price: 28,
    description: 'Our most popular social hour experience.',
    features: ['Choice of 4-8 Items', 'Beautiful Platters Included', '2-Hour Service Time'],
    note: 'Starts at $28/person'
  },
  {
    id: '03',
    name: 'Casa Dinner Catering',
    price: 48,
    description: 'Full buffet style with premium main entrees.',
    features: ['2 Main Entrees', '3 Gourmet Sides', 'Spring Salad & Rolls Included'],
  }
];

const CateringSection = () => {
  return (
    <section className="bg-[#FAF9F6] py-20 px-6 font-sans text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <span className="uppercase tracking-[0.3em] text-sm mb-4 block text-gray-500">Exquisite Dining</span>
          <h2 className="text-5xl md:text-6xl font-serif mb-6 italic">Catering Collections</h2>
          <div className="h-px w-24 bg-[#D4AF37] mx-auto"></div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {cateringOptions.map((option) => (
            <div 
              key={option.id} 
              className="group relative bg-white border border-gray-100 p-10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              <span className="text-xs font-light text-gray-400 mb-2 block">{option.id}</span>
              <h3 className="text-2xl font-serif mb-4 group-hover:text-[#D4AF37] transition-colors">
                {option.name}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                {option.description}
              </p>
              
              <div className="mb-8">
                <span className="text-4xl font-light">${option.price}</span>
                <span className="text-sm text-gray-400 tracking-widest uppercase ml-2">/ person</span>
              </div>

              <ul className="space-y-4 border-t border-gray-50 pt-8">
                {option.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600 italic">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="mt-12 w-full py-4 border border-[#1A1A1A] uppercase tracking-widest text-xs hover:bg-[#1A1A1A] hover:text-white transition-all duration-300">
                Inquire Now
              </button>
            </div>
          ))}
        </div>

        {/* Comparison Table (Luxury Style) */}
        <div className="mt-32 overflow-hidden border border-gray-200 bg-white">
          <div className="p-8 bg-[#1A1A1A] text-white text-center">
            <h3 className="text-2xl font-serif italic">Pricing at a Glance</h3>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 uppercase text-[10px] tracking-[0.2em] text-gray-400">
                <th className="p-6 font-medium">Package</th>
                <th className="p-6 font-medium">Per Person</th>
                <th className="p-6 font-medium">25 Guests</th>
                <th className="p-6 font-medium">50 Guests</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="p-6 font-serif text-lg">Brunch Catering</td>
                <td className="p-6">$38</td>
                <td className="p-6">$950</td>
                <td className="p-6">$1,900</td>
              </tr>
              <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="p-6 font-serif text-lg">Dinner Catering</td>
                <td className="p-6">$48</td>
                <td className="p-6">$1,200</td>
                <td className="p-6">$2,400</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default CateringSection;