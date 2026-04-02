import { useState, useRef } from "react";
import Sidebar from "./components/Sidebar";
import RightPanel from "./components/RightPanel";
import MedicinePopup from "./components/MedicinePopup";
import PreviewModal from "./components/PreviewModal";
import patientsData from "./data/patients";
import medicinesData from "./data/medicines";

const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(patientsData[0]);
  const [prescriptionCount] = useState(0);

  // Sections state
  const [sections, setSections] = useState([
    { title: "Symptoms", content: patientsData[0].symptoms },
    { title: "Diagnosis", content: patientsData[0].diagnosis },
  ]);
  const [treatmentText, setTreatmentText] = useState("");
  const [treatments, setTreatments] = useState([]);
  const [dynamicSections, setDynamicSections] = useState([]);

  // Popup state (restored)
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  // Treatment query for right panel filtering
  const [treatmentQuery, setTreatmentQuery] = useState("");
  const treatmentRef = useRef(null);

  // Handle patient selection
  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setSections([
      { title: "Symptoms", content: patient.symptoms },
      { title: "Diagnosis", content: patient.diagnosis },
    ]);
    setTreatmentText("");
    setTreatments([]);
    setDynamicSections([]);
    setShowDone(false);
  };

  // Handle medicine click from right panel - opens popup
  const handleMedicineClick = (medicine, brand) => {
    setSelectedMedicine(medicine);
    setSelectedBrand(brand);
    setShowPopup(true);
  };

  // Handle popup confirm
  const handlePopupConfirm = (config) => {
    setTreatments((prev) => [...prev, config]);
    setShowPopup(false);
    setSelectedMedicine(null);
    setSelectedBrand(null);
    // Clear the treatment text that triggered the search
    if (treatmentRef.current) {
      const val = treatmentRef.current.value;
      const cursorPos = treatmentRef.current.selectionStart;
      const textUpToCursor = val.substring(0, cursorPos);
      const lastNewline = textUpToCursor.lastIndexOf("\n");
      const cleaned =
        val.substring(0, lastNewline + 1) + val.substring(cursorPos);
      setTreatmentText(cleaned.trim());
    }
    setTreatmentQuery("");
  };

  // Add dynamic section
  const handleAddSection = (sectionName) => {
    if (
      dynamicSections.find((s) => s.title === sectionName) ||
      sections.find((s) => s.title === sectionName)
    ) {
      return;
    }

    const placeholders = {
      Tests: "Write tests to be performed...",
      Advice: "Write medical advice...",
      "Follow-Up": "Write follow-up schedule or notes...",
      Referral: "Write referral details...",
    };

    setDynamicSections((prev) => [
      ...prev,
      {
        title: sectionName,
        content: "",
        placeholder: placeholders[sectionName] || "Write with Apple Pencil...",
      },
    ]);
  };

  // Save draft
  const handleSaveDraft = () => {
    const draft = {
      patient: selectedPatient,
      sections,
      treatmentText,
      treatments,
      dynamicSections,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem("prescribble_draft", JSON.stringify(draft));
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
  };

  // Update section content
  const updateSection = (index, content) => {
    setSections((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], content };
      return updated;
    });
  };

  // Update dynamic section content
  const updateDynamicSection = (index, content) => {
    setDynamicSections((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], content };
      return updated;
    });
  };

  // Remove a treatment
  const removeTreatment = (index) => {
    setTreatments((prev) => prev.filter((_, i) => i !== index));
  };

  // Treatment textarea handler - sends query to right panel instead of showing dropdown
  const handleTreatmentChange = (e) => {
    const val = e.target.value;
    setTreatmentText(val);

    // Get the current line being typed
    const cursorPos = e.target.selectionStart;
    const textUpToCursor = val.substring(0, cursorPos);
    const lastNewline = textUpToCursor.lastIndexOf("\n");
    const currentLine = textUpToCursor.substring(lastNewline + 1).trim();

    // Send query to right panel for filtering (instead of showing autocomplete dropdown)
    setTreatmentQuery(currentLine.length >= 2 ? currentLine : "");
  };

  return (
    <div className="h-full flex bg-gray-50">
      {/* LEFT - Sidebar */}
      <Sidebar
        expanded={sidebarExpanded}
        setExpanded={setSidebarExpanded}
        patients={patientsData}
        selectedPatient={selectedPatient}
        onSelectPatient={handleSelectPatient}
        onAddSection={handleAddSection}
      />

      {/* MIDDLE - Content area with gradient */}
      <div
        className="flex-1 flex flex-col overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #1A73E8, #BDFFE6)",
        }}
      >
        {/* Scrollable content container */}
        <div className="flex-1 overflow-y-auto px-6 pt-5 flex flex-col">
          {/* Patient Details Card */}
          <div className="bg-white rounded-2xl shadow-card p-5 mb-5 shrink-0">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-bold text-gray-800 mb-2">
                  Patient Details
                </h2>
                <p className="text-sm text-gray-600">
                  Name : {selectedPatient.name}
                </p>
                <p className="text-sm text-gray-600">
                  DOB : {selectedPatient.dob} ({selectedPatient.age} yrs)
                </p>
                <p className="text-sm text-gray-600">
                  Gender : {selectedPatient.gender}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2 bg-navy text-white px-4 py-1.5 rounded-full text-sm">
                  <span>Prescriptions</span>
                  <span className="bg-primary w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold">
                    {prescriptionCount}
                  </span>
                </div>
                <p className="text-sm text-gray-500 font-medium">
                  MR No. {selectedPatient.mrNo}
                </p>
              </div>
            </div>
          </div>

          {/* Unified Sections & Bottom Bar Container */}
          <div className="bg-white rounded-t-2xl shadow-card p-5 border border-gray-100 flex-1 flex flex-col">
            <div className="space-y-4">
              {sections.map((sec, i) => (
                <div
                  key={sec.title}
                  className="border-l-[3px] border-primary rounded-xl bg-soft-gray/30 p-4"
                >
                  <h3 className="text-sm font-bold text-gray-800 mb-2">
                    {sec.title}
                  </h3>
                  <textarea
                    className="scribble-input w-full bg-transparent text-sm text-gray-700 outline-none min-h-[40px] leading-relaxed"
                    placeholder="Write with Apple Pencil..."
                    defaultValue={sec.content}
                    onBlur={(e) => updateSection(i, e.target.value)}
                    rows={2}
                  />
                </div>
              ))}

              {/* Treatment Section */}
              <div className="border-l-[3px] border-primary rounded-xl bg-soft-gray/30 p-4">
                <h3 className="text-sm font-bold text-gray-800 mb-2">
                  Treatment
                </h3>

                {/* Added medicines */}
                {treatments.length > 0 && (
                  <div className="space-y-1.5 mb-3">
                    {treatments.map((t, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-white rounded-lg px-3 py-2 text-xs"
                      >
                        <span className="text-gray-700">
                          <span className="font-medium">
                            {t.medicine.name}
                          </span>{" "}
                          ({t.medicine.brand}) - {t.days} days,{" "}
                          {t.frequency.join("/")} - {t.mealTiming}
                        </span>
                        <button
                          onClick={() => removeTreatment(i)}
                          className="text-red-400 active:text-red-600 ml-2 text-base"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Treatment textarea - NO autocomplete dropdown, filters right panel instead */}
                <textarea
                  ref={treatmentRef}
                  className="scribble-input w-full bg-transparent text-sm text-gray-700 outline-none min-h-[80px] leading-relaxed"
                  placeholder="Write with Apple Pencil... (type medicine name to filter right panel)"
                  value={treatmentText}
                  onChange={handleTreatmentChange}
                  rows={4}
                />
              </div>

              {/* Dynamic Sections */}
              {dynamicSections.map((sec, i) => (
                <div
                  key={sec.title}
                  className="border-l-[3px] border-primary rounded-xl bg-soft-gray/30 p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-bold text-gray-800">
                      {sec.title}
                    </h3>
                    <button
                      onClick={() =>
                        setDynamicSections((prev) =>
                          prev.filter((_, idx) => idx !== i)
                        )
                      }
                      className="text-xs text-red-400 active:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                  <textarea
                    className="scribble-input w-full bg-transparent text-sm text-gray-700 outline-none min-h-[60px] leading-relaxed"
                    placeholder={sec.placeholder || "Write with Apple Pencil..."}
                    defaultValue={sec.content}
                    onBlur={(e) => updateDynamicSection(i, e.target.value)}
                    rows={3}
                  />
                </div>
              ))}
            </div>

            {/* Done / Checkmark Button */}
            <div className="flex justify-end mt-4 mb-4">
              {showDone ? (
                <button
                  onClick={() => setShowDone(false)}
                  className="bg-fresh-green text-white px-5 py-2 rounded-xl text-sm font-medium flex items-center gap-1.5 shadow-md active:scale-95 transition-transform"
                >
                  Done
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => setShowDone(true)}
                  className="w-10 h-10 rounded-full bg-fresh-green flex items-center justify-center shadow-md active:scale-95 transition-transform"
                >
                  <CheckIcon />
                </button>
              )}
            </div>

            {/* Bottom bar integrated */}
            <div className="mt-auto pt-6 flex items-center justify-between">
              <button
                onClick={handleSaveDraft}
                className="bg-navy text-white px-6 py-2.5 rounded-xl text-sm font-medium active:scale-95 transition-transform"
              >
                Save Draft
              </button>

              {draftSaved && (
                <span className="text-fresh-green text-sm font-medium toast-enter">
                  ✓ Draft saved!
                </span>
              )}

              <button
                onClick={() => setShowPreview(true)}
                className="bg-navy text-white px-6 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 active:scale-95 transition-transform"
              >
                Preview
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT - Panel (full height, separate column) */}
      <RightPanel
        medicines={medicinesData}
        onMedicineClick={handleMedicineClick}
        treatmentQuery={treatmentQuery}
      />

      {/* Medicine Popup - RESTORED as modal */}
      {showPopup && selectedMedicine && selectedBrand && (
        <MedicinePopup
          key={`${selectedMedicine.id}-${selectedBrand.name}-${Date.now()}`}
          medicine={selectedMedicine}
          brand={selectedBrand}
          onConfirm={handlePopupConfirm}
          onClose={() => {
            setShowPopup(false);
            setSelectedMedicine(null);
            setSelectedBrand(null);
          }}
        />
      )}

      {/* Preview Modal */}
      {showPreview && (
        <PreviewModal
          patient={selectedPatient}
          sections={sections}
          treatments={treatments}
          treatmentText={treatmentText}
          dynamicSections={dynamicSections}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}
