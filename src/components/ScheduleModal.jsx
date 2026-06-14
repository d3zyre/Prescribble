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

  // ── OPD Slot Data ──────────────────────────────────────────────────
  const morningSlot = {
    label: "Morning OPD",
    time: "9:00 AM – 12:00 PM",
    capacity: 15,
    borderColor: "border-primary",
    accentBg: "bg-primary/10",
    accentText: "text-primary",
    dotColor: "bg-primary",
    patients: [
      { token: "T-001", name: "Rahul Verma", condition: "Scalp Psoriasis", status: "seen" },
      { token: "T-002", name: "Priya Sharma", condition: "Eczema", status: "seen" },
      { token: "T-003", name: "Alok Rajak", condition: "Onychomycosis", status: "current" },
      { token: "T-004", name: "Sneha Patel", condition: "Acne Vulgaris", status: "waiting" },
      { token: "T-005", name: "Vikram Singh", condition: "Vitiligo", status: "waiting" },
      { token: "T-006", name: "Aarushi Desai", condition: "Viral Infection", status: "waiting" },
      { token: "T-007", name: "Meera Joshi", condition: "Contact Dermatitis", status: "waiting" },
      { token: "T-008", name: "Arjun Nair", condition: "Seborrheic Dermatitis", status: "waiting" },
      { token: "T-009", name: "Kavita Reddy", condition: "Urticaria", status: "waiting" },
      { token: "T-010", name: "Ravi Patel", condition: "Tinea Corporis", status: "waiting" },
      { token: "T-011", name: "Ananya Das", condition: "Alopecia Areata", status: "waiting" },
      { token: "T-012", name: "Suresh Kumar", condition: "Melasma", status: "waiting" },
    ],
  };

  const eveningSlot = {
    label: "Evening OPD",
    time: "6:00 PM – 9:00 PM",
    capacity: 15,
    borderColor: "border-teal-500",
    accentBg: "bg-teal-50",
    accentText: "text-teal-600",
    dotColor: "bg-teal-500",
    patients: [
      { token: "T-001", name: "Deepak Sharma", condition: "Psoriasis", status: "waiting" },
      { token: "T-002", name: "Lakshmi Iyer", condition: "Fungal Infection", status: "waiting" },
      { token: "T-003", name: "Pooja Gupta", condition: "Rosacea", status: "waiting" },
      { token: "T-004", name: "Nikhil Jain", condition: "Warts", status: "waiting" },
      { token: "T-005", name: "Shreya Mishra", condition: "Eczema", status: "waiting" },
      { token: "T-006", name: "Anil Rao", condition: "Photodermatitis", status: "waiting" },
      { token: "T-007", name: "Suman Devi", condition: "Lichen Planus", status: "waiting" },
      { token: "T-008", name: "Rohit Verma", condition: "Folliculitis", status: "waiting" },
    ],
  };

  const slots = [morningSlot, eveningSlot];

  // ── Status rendering helpers ───────────────────────────────────────
  function StatusIndicator({ status }) {
    if (status === "seen") {
      return (
        <span className="flex items-center gap-1 text-fresh-green" title="Seen">
          <span className="w-2 h-2 rounded-full bg-fresh-green"></span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
      );
    }
    if (status === "current") {
      return (
        <span className="flex items-center gap-1 text-primary" title="Current">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </span>
      );
    }
    // waiting
    return (
      <span className="flex items-center" title="Waiting">
        <span className="w-2 h-2 rounded-full bg-gray-300"></span>
      </span>
    );
  }

  // ── Progress bar for slot capacity ─────────────────────────────────
  function SlotProgress({ registered, capacity, accentBg, dotColor }) {
    const pct = Math.round((registered / capacity) * 100);
    return (
      <div className="flex items-center gap-2 mt-2">
        <div className={`flex-1 h-1.5 rounded-full ${accentBg}`}>
          <div
            className={`h-full rounded-full ${dotColor} transition-all`}
            style={{ width: `${pct}%` }}
          ></div>
        </div>
        <span className="text-[11px] text-gray-500 font-semibold tabular-nums whitespace-nowrap">
          {registered} / {capacity}
        </span>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-popup w-full max-w-[780px] overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ─── LEFT COMPONENT — Apple Style Calendar ─── */}
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

        {/* ─── RIGHT COMPONENT — OPD Slot View ─── */}
        <div className="flex-1 bg-white flex flex-col max-h-[520px] min-h-[400px]">
          {/* Header */}
          <div className="px-6 pt-5 pb-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <div>
              <h3 className="text-lg font-bold text-gray-800 tracking-tight">
                Today's OPD
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Today, {currentMonth} {currentDay}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 text-xl font-light transition-colors"
            >
              ×
            </button>
          </div>

          {/* Slot cards — scrollable */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
            {slots.map((slot, slotIdx) => (
              <div
                key={slotIdx}
                className={`bg-white rounded-xl border border-gray-100 overflow-hidden border-l-[4px] ${slot.borderColor}`}
              >
                {/* Slot header */}
                <div className="px-4 pt-4 pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${slot.dotColor}`}></span>
                      <h4 className="text-sm font-bold text-gray-800">{slot.label}</h4>
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${slot.accentBg} ${slot.accentText}`}>
                      {slot.time}
                    </span>
                  </div>
                  <SlotProgress
                    registered={slot.patients.length}
                    capacity={slot.capacity}
                    accentBg={slot.accentBg}
                    dotColor={slot.dotColor}
                  />
                </div>

                {/* Patient list */}
                <div className="px-2 pb-2 max-h-[200px] overflow-y-auto">
                  {slot.patients.map((patient, pIdx) => {
                    const isCurrent = patient.status === "current";
                    const isSeen = patient.status === "seen";
                    return (
                      <div
                        key={pIdx}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isCurrent
                            ? "bg-primary/5 border-l-[3px] border-primary"
                            : "hover:bg-gray-50"
                        } ${isSeen ? "opacity-60" : ""}`}
                      >
                        {/* Token badge */}
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap ${
                            isCurrent
                              ? "bg-primary/10 text-primary"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {patient.token}
                        </span>

                        {/* Name */}
                        <span
                          className={`text-sm flex-shrink-0 ${
                            isCurrent ? "font-semibold text-gray-900" : "font-medium text-gray-700"
                          }`}
                        >
                          {patient.name}
                        </span>

                        {/* Condition */}
                        <span className="text-xs text-gray-400 truncate flex-1 min-w-0">
                          {patient.condition}
                        </span>

                        {/* Status indicator */}
                        <StatusIndicator status={patient.status} />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
