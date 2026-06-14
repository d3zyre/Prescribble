import { useState, useEffect } from "react";
import signImage from "./sign.png";

export default function CompleteScreen({
  patient,
  sections,
  treatments,
  treatmentText,
  dynamicSections,
  user,
  onClose,
}) {
  const [toasts, setToasts] = useState({});
  const [completedAt] = useState(() => new Date());

  // Auto-dismiss toasts after 2s
  useEffect(() => {
    const keys = Object.keys(toasts);
    if (keys.length === 0) return;
    const timer = setTimeout(() => setToasts({}), 2000);
    return () => clearTimeout(timer);
  }, [toasts]);

  const showToast = (key) => {
    setToasts((prev) => ({ ...prev, [key]: true }));
  };

  // Sanitize phone for WhatsApp link
  const rawPhone = patient?.phone || "";
  const cleanPhone = rawPhone.replace(/[\s+\-()]/g, "");

  const formatDate = (d) =>
    d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const formatTime = (d) =>
    d.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  const allSections = [...sections];

  /* ── Share action definitions ── */
  const actions = [
    {
      key: "print",
      label: "Print Prescription",
      subtitle: "Send to connected printer",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
      ),
      onClick: () => window.print(),
    },
    {
      key: "sms",
      label: "Send via SMS",
      subtitle: rawPhone || "No phone number",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <line x1="9" y1="10" x2="9" y2="10" />
          <line x1="12" y1="10" x2="12" y2="10" />
          <line x1="15" y1="10" x2="15" y2="10" />
        </svg>
      ),
      onClick: () => showToast("sms"),
    },
    {
      key: "whatsapp",
      label: "Send via WhatsApp",
      subtitle: rawPhone || "No phone number",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      ),
      onClick: () => {
        const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Your prescription is ready")}`;
        window.open(url, "_blank");
      },
    },
    {
      key: "pdf",
      label: "Download as PDF",
      subtitle: "Save to your device",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      ),
      onClick: () => showToast("pdf"),
    },
    {
      key: "email",
      label: "Send via Email",
      subtitle: patient?.email || "Patient email",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <polyline points="22 7 12 13 2 7" />
        </svg>
      ),
      onClick: () => showToast("email"),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-gray-100" />

      {/* ─── Left: Prescription Preview ─── */}
      <div className="relative w-[55%] flex items-start justify-center overflow-y-auto py-10 px-8">
        <div
          className="w-full max-w-[560px] bg-white rounded-2xl border border-gray-200/70"
          style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.07)" }}
        >
          {/* Doctor info */}
          <div className="text-center pt-8 pb-4 px-8 border-b border-dashed border-gray-200">
            <p className="text-xs text-gray-400 uppercase tracking-wider">
              Dermatologist
            </p>
            <p className="text-base font-bold text-gray-800 mt-0.5">
              {user?.name || "Dr. Esther N."}
            </p>
          </div>

          <div className="px-8 py-6 space-y-5">
            {/* Patient Info */}
            <div className="bg-gray-50/80 rounded-xl p-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Name:</span>{" "}
                  <span className="font-medium text-gray-800">{patient.name}</span>
                </div>
                <div>
                  <span className="text-gray-500">MR No:</span>{" "}
                  <span className="font-medium text-gray-800">{patient.mrNo}</span>
                </div>
                <div>
                  <span className="text-gray-500">DOB:</span>{" "}
                  <span className="font-medium text-gray-800">
                    {patient.dob} ({patient.age} yrs)
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Gender:</span>{" "}
                  <span className="font-medium text-gray-800">{patient.gender}</span>
                </div>
              </div>
            </div>

            {/* Core Sections */}
            {allSections.map((sec, i) => (
              <div key={i}>
                <h4 className="text-sm font-bold text-primary mb-1">{sec.title}</h4>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {sec.content || "-"}
                </p>
              </div>
            ))}

            {/* Treatment */}
            <div>
              <h4 className="text-sm font-bold text-primary mb-2">Treatment</h4>
              {treatments.length > 0 && (
                <div className="space-y-2 mb-3">
                  {treatments.map((t, i) => (
                    <div key={i} className="bg-gray-50/80 rounded-xl p-3 text-sm">
                      <p className="font-medium text-gray-800">
                        {i + 1}. {t.medicine.name} - {t.medicine.brand}
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        {t.days} days · {t.frequency.join(", ")} · {t.mealTiming}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {treatmentText && (
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{treatmentText}</p>
              )}
              {treatments.length === 0 && !treatmentText && (
                <p className="text-sm text-gray-400">-</p>
              )}
            </div>

            {/* Dynamic Sections */}
            {dynamicSections &&
              dynamicSections.length > 0 &&
              dynamicSections.map((sec, i) => {
                if (!sec.content) return null;
                return (
                  <div key={`dyn-${i}`}>
                    <h4 className="text-sm font-bold text-primary mb-1">{sec.title}</h4>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{sec.content}</p>
                  </div>
                );
              })}

            {/* Digital Signature */}
            <div className="pt-6 border-t border-dashed border-gray-200">
              <h4 className="text-sm font-bold text-primary mb-4">Digital Signature</h4>
              <div className="flex flex-col items-start">
                <p className="text-xs text-gray-500 mb-1">Digitally signed by</p>
                <img
                  src={signImage}
                  alt="Doctor Signature"
                  className="h-24 w-auto object-contain -ml-2"
                />
                <div className="w-56 border-b border-dashed border-gray-300 mt-2 mb-2" />
                <p className="text-[11px] text-gray-500">
                  {user?.name || "Dr. Esther N."}, Dermatologist
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Right: Share & Complete Panel ─── */}
      <div className="relative w-[45%] flex items-center justify-center px-8">
        <div className="w-full max-w-[400px] space-y-8">
          {/* Success Header */}
          <div className="text-center space-y-3">
            {/* Green check circle */}
            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#34C38F" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Prescription Complete</h2>
            <p className="text-gray-500 text-sm">
              for <span className="font-medium text-gray-700">{patient.name}</span>
            </p>
            <p className="text-xs text-gray-400">
              {formatDate(completedAt)} · {formatTime(completedAt)}
            </p>
          </div>

          {/* Share Actions */}
          <div className="space-y-3">
            {actions.map((action) => {
              const isSent = toasts[action.key];
              return (
                <button
                  key={action.key}
                  onClick={action.onClick}
                  className="w-full flex items-center gap-4 px-5 py-4 rounded-xl border border-gray-200 bg-white text-left transition-all duration-200 hover:border-gray-300 hover:shadow-sm active:scale-[0.98]"
                >
                  {isSent ? (
                    /* Sent feedback */
                    <>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: "#34C38F" }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#34C38F" }}>
                          Sent!
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 shrink-0">
                        {action.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800">{action.label}</p>
                        <p className="text-xs text-gray-400 truncate">{action.subtitle}</p>
                      </div>
                    </>
                  )}
                </button>
              );
            })}
          </div>

          {/* Back to Dashboard */}
          <button
            onClick={onClose}
            className="w-full text-center px-6 py-3 rounded-xl text-white font-medium transition-all duration-200 active:scale-[0.98]"
            style={{ backgroundColor: "#0F172A" }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
