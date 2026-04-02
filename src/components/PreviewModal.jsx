import signImage from "./sign.png"; // Importing the signature image

export default function PreviewModal({
  patient,
  sections,
  treatments,
  treatmentText,
  dynamicSections,
  onClose,
}) {
  if (!patient) return null;

  const allSections = [...sections];

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
                  <div
                    key={i}
                    className="bg-soft-gray/50 rounded-xl p-3 text-sm"
                  >
                    <p className="font-medium text-gray-800">
                      {i + 1}. {t.medicine.name} - {t.medicine.brand}
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
          <div className="pt-6 border-t border-dashed border-gray-200">
            <h4 className="text-sm font-bold text-primary mb-4">
              Digital Signature
            </h4>
            
            {/* Left-aligned flex container for the signature block */}
            <div className="flex flex-col items-start">
              <p className="text-xs text-gray-500 mb-1">
                Digitally signed by
              </p>
              
              {/* Image increased in size (h-24) and negative left margin to offset natural image padding if any */}
              <img 
                src={signImage} 
                alt="Dr. Esther Signature" 
                className="h-24 w-auto object-contain -ml-2" 
              />
              
              {/* Dotted line scaled roughly to the signature width */}
              <div className="w-56 border-b border-dashed border-gray-300 mt-2 mb-2"></div>
              
              {/* Name formatting updated */}
              <p className="text-[11px] text-gray-500">
                Dr. Esther, Dermatologist
              </p>
            </div>
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