import { useState } from "react";

export default function PrescriptionHistoryModal({ patient, history, onClose }) {
  const [selectedId, setSelectedId] = useState(history.length > 0 ? history[0].id : null);

  const selectedRx = history.find((rx) => rx.id === selectedId) || null;

  if (!patient) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-popup w-full max-w-[720px] max-h-[85vh] overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT PANEL — Prescription List */}
        <div className="w-full md:w-[240px] bg-gray-50 border-r border-gray-100 flex flex-col">
          {/* Panel Header */}
          <div className="px-5 pt-5 pb-3 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-800">Past Prescriptions</h3>
            <p className="text-xs text-gray-500 mt-0.5">{patient.name}</p>
          </div>

          {/* Prescription Items */}
          <div className="flex-1 overflow-y-auto">
            {history.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <p className="text-xs text-gray-400 font-medium">No prescription history</p>
                <p className="text-[11px] text-gray-400 mt-1">This patient has no past records on file.</p>
              </div>
            ) : (
              <div className="py-2">
                {history.map((rx) => {
                  const isActive = rx.id === selectedId;
                  return (
                    <button
                      key={rx.id}
                      onClick={() => setSelectedId(rx.id)}
                      className={`w-full text-left px-5 py-3 transition-colors ${
                        isActive
                          ? "bg-primary/10 border-l-[3px] border-primary"
                          : "border-l-[3px] border-transparent hover:bg-gray-100"
                      }`}
                    >
                      <p className={`text-sm font-semibold ${isActive ? "text-primary" : "text-gray-800"}`}>
                        {rx.date}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5 truncate">{rx.doctorName}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5 truncate">{rx.hospital}</p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL — Prescription Detail */}
        <div className="flex-1 bg-white flex flex-col min-h-0 max-h-[85vh] md:max-h-none">
          {/* Detail Header */}
          <div className="px-6 pt-5 pb-4 border-b border-gray-100 flex justify-between items-center shrink-0">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Prescription Detail</h3>
              {selectedRx && (
                <p className="text-xs text-gray-500 font-medium mt-0.5">
                  {selectedRx.date} · {selectedRx.department}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 text-xl font-light"
            >
              ×
            </button>
          </div>

          {/* Detail Content */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {!selectedRx ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-12 h-12 mb-3 rounded-full bg-gray-50 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <p className="text-sm text-gray-400 font-medium">No prescription selected</p>
                <p className="text-xs text-gray-400 mt-1">Select a record from the left panel to view details.</p>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Doctor & Hospital Info */}
                <div className="bg-soft-gray/50 rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Doctor:</span>{" "}
                      <span className="font-medium text-gray-800">{selectedRx.doctorName}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Date:</span>{" "}
                      <span className="font-medium text-gray-800">{selectedRx.date}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500">Hospital:</span>{" "}
                      <span className="font-medium text-gray-800">{selectedRx.hospital}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Department:</span>{" "}
                      <span className="font-medium text-gray-800">{selectedRx.department}</span>
                    </div>
                  </div>
                </div>

                {/* Symptoms */}
                <div>
                  <h4 className="text-sm font-bold text-primary mb-1">Symptoms</h4>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedRx.symptoms}</p>
                </div>

                {/* Diagnosis */}
                <div>
                  <h4 className="text-sm font-bold text-primary mb-1">Diagnosis</h4>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedRx.diagnosis}</p>
                </div>

                {/* Treatment */}
                <div>
                  <h4 className="text-sm font-bold text-primary mb-2">Treatment</h4>
                  {selectedRx.treatments && selectedRx.treatments.length > 0 ? (
                    <div className="space-y-2">
                      {selectedRx.treatments.map((t, i) => (
                        <div key={i} className="bg-soft-gray/50 rounded-xl p-3 text-sm">
                          <p className="font-medium text-gray-800">
                            {i + 1}. {t.medicine.name} — {t.medicine.brand}
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            {t.days} days · {t.frequency.join(", ")} · {t.mealTiming}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">—</p>
                  )}
                </div>

                {/* Tests */}
                {selectedRx.tests && (
                  <div>
                    <h4 className="text-sm font-bold text-primary mb-1">Tests</h4>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedRx.tests}</p>
                  </div>
                )}

                {/* Advice */}
                {selectedRx.advice && (
                  <div>
                    <h4 className="text-sm font-bold text-primary mb-1">Advice</h4>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedRx.advice}</p>
                  </div>
                )}

                {/* Follow-Up */}
                {selectedRx.followUp && (
                  <div>
                    <h4 className="text-sm font-bold text-primary mb-1">Follow-Up</h4>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedRx.followUp}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
