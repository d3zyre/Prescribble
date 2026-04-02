import { useState, useRef } from "react";

export default function PreviewModal({
  patient,
  sections,
  treatments,
  treatmentText,
  dynamicSections,
  onClose,
}) {
  if (!patient) return null;

  const [signatureData, setSignatureData] = useState(null);
  const [isSigning, setIsSigning] = useState(false);
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const allSections = [...sections];

  // --- Signature pad handlers ---
  const startDrawing = (e) => {
    if (!canvasRef.current) return;
    isDrawingRef.current = true;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    lastPosRef.current = { x, y };
    setIsSigning(true);
  };

  const draw = (e) => {
    if (!isDrawingRef.current || !canvasRef.current) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#1A73E8";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    lastPosRef.current = { x, y };
  };

  const stopDrawing = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    if (canvasRef.current) {
      setSignatureData(canvasRef.current.toDataURL());
    }
  };

  const clearSignature = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setSignatureData(null);
    setIsSigning(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-popup w-full max-w-[600px] max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">
              Prescription Preview
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full active:bg-gray-100 text-gray-400 text-xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Prescription Content */}
        <div className="px-8 py-6 space-y-5">
          {/* Doctor info */}
          <div className="text-center pb-4 border-b border-dashed border-gray-200">
            <p className="text-xs text-gray-400 uppercase tracking-wider">
              Dermatologist
            </p>
            <p className="text-base font-bold text-gray-800 mt-0.5">
              Dr. Esther N.
            </p>
          </div>

          {/* Patient Info */}
          <div className="bg-soft-gray/50 rounded-xl p-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Name:</span>{" "}
                <span className="font-medium text-gray-800">
                  {patient.name}
                </span>
              </div>
              <div>
                <span className="text-gray-500">MR No:</span>{" "}
                <span className="font-medium text-gray-800">
                  {patient.mrNo}
                </span>
              </div>
              <div>
                <span className="text-gray-500">DOB:</span>{" "}
                <span className="font-medium text-gray-800">
                  {patient.dob} ({patient.age} yrs)
                </span>
              </div>
              <div>
                <span className="text-gray-500">Gender:</span>{" "}
                <span className="font-medium text-gray-800">
                  {patient.gender}
                </span>
              </div>
            </div>
          </div>

          {/* Core Sections */}
          {allSections.map((sec, i) => (
            <div key={i}>
              <h4 className="text-sm font-bold text-primary mb-1">
                {sec.title}
              </h4>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {sec.content || "—"}
              </p>
            </div>
          ))}

          {/* Treatment */}
          <div>
            <h4 className="text-sm font-bold text-primary mb-2">Treatment</h4>
            {treatments.length > 0 && (
              <div className="space-y-2 mb-3">
                {treatments.map((t, i) => (
                  <div
                    key={i}
                    className="bg-soft-gray/50 rounded-xl p-3 text-sm"
                  >
                    <p className="font-medium text-gray-800">
                      {i + 1}. {t.medicine.name} — {t.medicine.brand}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      {t.days} days · {t.frequency.join(", ")} ·{" "}
                      {t.mealTiming}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {treatmentText && (
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {treatmentText}
              </p>
            )}
            {treatments.length === 0 && !treatmentText && (
              <p className="text-sm text-gray-400">—</p>
            )}
          </div>

          {/* Dynamic Sections */}
          {dynamicSections &&
            dynamicSections.length > 0 &&
            dynamicSections.map((sec, i) => {
              if (!sec.content) return null;
              return (
                <div key={`dyn-${i}`}>
                  <h4 className="text-sm font-bold text-primary mb-1">
                    {sec.title}
                  </h4>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {sec.content}
                  </p>
                </div>
              );
            })}

          {/* Digital Signature */}
          <div className="pt-4 border-t border-dashed border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-primary">
                Digital Signature
              </h4>
              {isSigning && (
                <button
                  onClick={clearSignature}
                  className="text-xs text-red-400 hover:text-red-500 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            <div className="relative border-2 border-dashed border-gray-200 rounded-xl overflow-hidden bg-gray-50/50">
              <canvas
                ref={canvasRef}
                width={520}
                height={100}
                className="w-full cursor-crosshair"
                style={{ touchAction: "none" }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
              {!isSigning && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <p className="text-xs text-gray-400">
                    Draw your signature here
                  </p>
                </div>
              )}
            </div>
            <p className="text-[10px] text-gray-400 mt-1.5 text-center">
              Dr. Esther N. — Dermatologist
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-8 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-sm text-gray-500 active:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              window.print();
            }}
            className="px-5 py-2 rounded-xl text-sm text-white bg-primary active:bg-primary-dark transition-colors font-medium"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
}
