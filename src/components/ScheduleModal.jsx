export default function ScheduleModal({ onClose }) {
  // Static data for demonstration
  const today = new Date();
  const currentMonth = today.toLocaleString("default", { month: "long" });
  const currentYear = today.getFullYear();
  const currentDay = today.getDate();

  // Generate a basic 35-day grid for the UI (5 weeks)
  const daysInMonth = 30; // Static generic
  const startOffset = 2; // Starts on Tuesday for example
  
  const calendarDays = [];
  for (let i = 0; i < 35; i++) {
    if (i < startOffset || i >= startOffset + daysInMonth) {
      calendarDays.push(null);
    } else {
      calendarDays.push(i - startOffset + 1);
    }
  }

  const scheduleForToday = [
    { time: "09:00 AM", type: "Consultation", patient: "Rahul Verma", condition: "Scalp Psoriasis" },
    { time: "10:30 AM", type: "Follow-up", patient: "Priya Sharma", condition: "Eczema" },
    { time: "01:00 PM", type: "Consultation", patient: "Aarushi Desai", condition: "Viral Pyrexia" },
    { time: "03:15 PM", type: "Procedure", patient: "Alok Rajak", condition: "Nail Extraction" },
    { time: "05:00 PM", type: "Consultation", patient: "Sneha Patel", condition: "Acne Vulgaris" },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-popup w-full max-w-[700px] overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT COMPONENT - Apple Style Calendar */}
        <div className="w-full md:w-[320px] bg-gray-50 border-r border-gray-100 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">
              {currentMonth} {currentYear}
            </h2>
            <div className="flex gap-2">
              <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <div key={i} className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {calendarDays.map((ds, i) => {
              if (ds === null) {
                return <div key={i} className="w-8 h-8 mx-auto"></div>;
              }
              const isToday = ds === currentDay;
              return (
                <div key={i} className="h-9 flex items-center justify-center">
                  <span
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium cursor-pointer transition-colors ${
                      isToday
                        ? "bg-primary text-white shadow-md shadow-primary/30"
                        : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {ds}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COMPONENT - Agenda view */}
        <div className="flex-1 bg-white flex flex-col h-[400px]">
          <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <div>
              <h3 className="text-lg font-bold text-gray-800">
                Schedule
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                Today, {currentMonth} {currentDay}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 text-xl font-light"
            >
              ×
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {scheduleForToday.map((item, idx) => (
              <div key={idx} className="flex gap-4 group">
                <div className="w-16 flex flex-col items-end pt-1">
                  <span className="text-xs font-semibold text-gray-500">{item.time.split(" ")[0]}</span>
                  <span className="text-[10px] text-gray-400 font-medium">{item.time.split(" ")[1]}</span>
                </div>
                
                {/* Timeline continuous line with dot */}
                <div className="relative flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1.5 z-10 ring-4 ring-white"></div>
                  {idx !== scheduleForToday.length - 1 && (
                    <div className="absolute top-4 bottom-[-16px] w-[2px] bg-gray-100"></div>
                  )}
                </div>

                <div className="flex-1 bg-gray-50 rounded-xl p-3 border border-gray-100 group-hover:bg-primary/5 transition-colors cursor-pointer">
                  <h4 className="text-sm font-bold text-gray-800">{item.patient}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-medium px-2 py-0.5 roundedbg-white border border-gray-200 text-gray-500 bg-white shadow-sm">
                      {item.type}
                    </span>
                    <span className="text-xs text-gray-500 truncate">
                      {item.condition}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
