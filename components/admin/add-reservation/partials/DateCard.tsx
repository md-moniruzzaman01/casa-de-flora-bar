
export const DateCard = ({ day, date, weekday, active = false }: { day: string, date: string, weekday: string, active?: boolean }) => (
  <div className={`min-w-[110px] p-4 rounded-2xl border text-center cursor-pointer transition-all ${
    active ? 'bg-pink-100 border-pink-300' : 'bg-white border-gray-200 hover:border-pink-200'
  }`}>
    <p className="text-[10px] uppercase text-gray-500 mb-2">{day}</p>
    <p className="font-bold text-gray-900">{date}</p>
    <p className="text-xs text-gray-600">{weekday}</p>
    <div className={`w-1.5 h-1.5 rounded-full mx-auto mt-2 ${active ? 'bg-pink-500' : 'bg-gray-300'}`} />
  </div>
);