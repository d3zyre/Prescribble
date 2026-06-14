import { useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import RightPanel from "../components/RightPanel";
import MedicinePopup from "../components/MedicinePopup";
import PreviewModal from "../components/PreviewModal";
import ScheduleModal from "../components/ScheduleModal";
import CompleteScreen from "../components/CompleteScreen";
import PrescriptionHistoryModal from "../components/PrescriptionHistoryModal";
import patientsData from "../data/patients";
import medicinesData from "../data/medicines";
import prescriptionHistory from "../data/prescriptionHistory";

export default function Dashboard({ user, onLogout }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(patientsData[0]);

  // Sections state
  const [sections, setSections] = useState([
    { title: "Symptoms", content: patientsData[0].symptoms },
    { title: "Diagnosis", content: patientsData[0].diagnosis },
  ]);
  const [treatmentText, setTreatmentText] = useState("");
  const [treatments, setTreatments] = useState(patientsData[0].treatments || []);
  const [dynamicSections, setDynamicSections] = useState(patientsData[0].dynamicSections || []);
  const [activeInput, setActiveInput] = useState({ type: 'treatment' });

  // Popup state
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showCompleteScreen, setShowCompleteScreen] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  // Treatment query for right panel filtering
  const [treatmentQuery, setTreatmentQuery] = useState("");
  const treatmentRef = useRef(null);

  // Get prescription history count for current patient
  const patientHistory = prescriptionHistory.filter(
    (rx) => rx.patientId === selectedPatient.id
  );

  // Handle patient selection
  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setSections([
      { title: "Symptoms", content: patient.symptoms },
      { title: "Diagnosis", content: patient.diagnosis },
    ]);
    setTreatmentText("");
    setTreatments(patient.treatments || []);
    setDynamicSections(patient.dynamicSections || []);
  };

  // Check if a medicine/brand is a test item (not a drug)
  const isTestItem = (brand) => {
    return brand.name === "Radiology" || brand.name === "Pathology" || brand.name === "Cardiology" || brand.name === "Gastroenterology";
  };

  // Find the Tests section index in dynamic sections
  const findTestsSectionIndex = () => {
    return dynamicSections.findIndex((s) => s.title === "Tests");
  };

  // Handle medicine click from right panel - opens popup or appends directly
  const handleMedicineClick = (medicine, brand) => {
    // If it's a test item AND a Tests section exists, always append directly (skip popup)
    if (isTestItem(brand)) {
      const testIdx = findTestsSectionIndex();
      if (testIdx >= 0) {
        const val = dynamicSections[testIdx].content || "";
        const lastNewline = val.lastIndexOf("\n");
        const cleaned = val.substring(0, lastNewline + 1);
        updateDynamicSection(testIdx, cleaned + medicine.name + "\n");
        setTreatmentQuery("");
        return;
      }
    }

    // If typing in a dynamic section, append directly
    if (activeInput.type === 'dynamic') {
      const idx = activeInput.index;
      const appendString = isTestItem(brand) ? medicine.name : `${medicine.name} (${brand.name})`;
      
      const val = dynamicSections[idx].content || "";
      const lastNewline = val.lastIndexOf("\n");
      const cleaned = val.substring(0, lastNewline + 1);
      
      updateDynamicSection(idx, cleaned + appendString + "\n");
      setTreatmentQuery("");
      return;
    }

    // Default: open medicine popup for dosage configuration
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

    // Clear the text that triggered the search based on activeInput
    if (activeInput.type === 'treatment') {
      const val = treatmentText;
      if (treatmentRef.current) {
        const cursorPos = treatmentRef.current.selectionStart || val.length;
        const textUpToCursor = val.substring(0, cursorPos);
        const lastNewline = textUpToCursor.lastIndexOf("\n");
        const cleaned = val.substring(0, lastNewline + 1) + val.substring(cursorPos);
        setTreatmentText(cleaned.trim());
      }
    } else if (activeInput.type === 'dynamic') {
      const idx = activeInput.index;
      const val = dynamicSections[idx].content;
      const lastNewline = val.lastIndexOf("\n");
      const cleaned = val.substring(0, lastNewline + 1);
      updateDynamicSection(idx, cleaned.trim());
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

  const handleDynamicChange = (e, index) => {
    const val = e.target.value;
    updateDynamicSection(index, val);
    setActiveInput({ type: 'dynamic', index });

    // Send query to right panel for filtering
    const cursorPos = e.target.selectionStart;
    const textUpToCursor = val.substring(0, cursorPos);
    const lastNewline = textUpToCursor.lastIndexOf("\n");
    const currentLine = textUpToCursor.substring(lastNewline + 1).trim();
    setTreatmentQuery(currentLine.length >= 2 ? currentLine : "");
  };

  // Remove a treatment
  const removeTreatment = (index) => {
    setTreatments((prev) => prev.filter((_, i) => i !== index));
  };

  // Treatment textarea handler - sends query to right panel instead of showing dropdown
  const handleTreatmentChange = (e) => {
    const val = e.target.value;
    setTreatmentText(val);
    setActiveInput({ type: 'treatment' });

    // Get the current line being typed
    const cursorPos = e.target.selectionStart;
    const textUpToCursor = val.substring(0, cursorPos);
    const lastNewline = textUpToCursor.lastIndexOf("\n");
    const currentLine = textUpToCursor.substring(lastNewline + 1).trim();

    // Send query to right panel for filtering (instead of showing autocomplete dropdown)
    setTreatmentQuery(currentLine.length >= 2 ? currentLine : "");
  };

  // Handle Complete flow: Preview → Complete Screen
  const handleComplete = () => {
    setShowPreview(false);
    setShowCompleteScreen(true);
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
        onScheduleClick={() => setShowScheduleModal(true)}
        onLogout={onLogout}
        user={user}
      />

      {/* MIDDLE - Content area with gradient */}
      <div
        className="flex-1 flex flex-col overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #1A73E8 0%, #4A9CED 40%, #BDFFE6 100%)",
        }}
      >
        {/* Scrollable content container */}
        <div className="flex-1 overflow-y-auto px-6 pt-5 flex flex-col">
          {/* Patient Details Card */}
          <div className="bg-white rounded-2xl shadow-card p-5 mb-4 shrink-0">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-[15px] font-bold text-gray-800 mb-2.5">
                  Patient Details
                </h2>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    <span className="text-gray-400 w-14 inline-block">Name</span>
                    <span className="text-gray-300 mx-2">·</span>
                    <span className="font-medium text-gray-700">{selectedPatient.name}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="text-gray-400 w-14 inline-block">DOB</span>
                    <span className="text-gray-300 mx-2">·</span>
                    <span className="font-medium text-gray-700">{selectedPatient.dob} ({selectedPatient.age} yrs)</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="text-gray-400 w-14 inline-block">Gender</span>
                    <span className="text-gray-300 mx-2">·</span>
                    <span className="font-medium text-gray-700">{selectedPatient.gender}</span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2.5">
                <button
                  onClick={() => setShowHistoryModal(true)}
                  className="flex items-center gap-2 bg-navy text-white pl-4 pr-3 py-1.5 rounded-full text-sm hover:bg-navy-light active:scale-[0.97] transition-all cursor-pointer"
                >
                  <span>Prescriptions</span>
                  <span className="bg-primary w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-semibold">
                    {patientHistory.length}
                  </span>
                </button>
                <p className="text-xs text-gray-400 font-medium">
                  MR No. {selectedPatient.mrNo}
                </p>
              </div>
            </div>
          </div>

          {/* Unified Sections & Bottom Bar Container */}
          <div className="bg-white rounded-t-2xl shadow-card p-5 border border-gray-100/80 flex-1 flex flex-col">
            <div className="space-y-3.5">
              {sections.map((sec, i) => (
                <div
                  key={sec.title}
                  className="border-l-[4px] border-primary rounded-xl bg-soft-gray/25 p-4"
                >
                  <h3 className="text-[13px] font-bold text-gray-800 mb-2">
                    {sec.title}
                  </h3>
                  <textarea
                    className="scribble-input w-full bg-transparent text-sm text-gray-700 outline-none min-h-[40px] leading-relaxed"
                    placeholder="Write with Apple Pencil..."
                    value={sec.content}
                    onChange={(e) => updateSection(i, e.target.value)}
                    rows={2}
                  />
                </div>
              ))}

              {/* Treatment Section */}
              <div className="border-l-[4px] border-primary rounded-xl bg-soft-gray/25 p-4">
                <h3 className="text-[13px] font-bold text-gray-800 mb-2">
                  Treatment
                </h3>

                {/* Added medicines */}
                {treatments.length > 0 && (
                  <div className="space-y-1.5 mb-3">
                    {treatments.map((t, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-white rounded-lg px-3 py-2 text-xs border border-gray-100"
                      >
                        <span className="text-gray-700">
                          <span className="font-medium text-gray-800">
                            {t.medicine.name}
                          </span>{" "}
                          ({t.medicine.brand}) · {t.days} days ·{" "}
                          {t.frequency.join("/")} · {t.mealTiming}
                        </span>
                        <button
                          onClick={() => removeTreatment(i)}
                          className="text-red-400 hover:text-red-500 active:text-red-600 ml-3 text-base leading-none"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Treatment textarea */}
                <textarea
                  ref={treatmentRef}
                  className="scribble-input w-full bg-transparent text-sm text-gray-700 outline-none min-h-[80px] leading-relaxed"
                  placeholder="Write with Apple Pencil... (type medicine name to filter suggestions)"
                  value={treatmentText}
                  onChange={handleTreatmentChange}
                  rows={4}
                />
              </div>

              {/* Dynamic Sections */}
              {dynamicSections.map((sec, i) => (
                <div
                  key={sec.title}
                  className="border-l-[4px] border-primary rounded-xl bg-soft-gray/25 p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[13px] font-bold text-gray-800">
                      {sec.title}
                    </h3>
                    <button
                      onClick={() =>
                        setDynamicSections((prev) =>
                          prev.filter((_, idx) => idx !== i)
                        )
                      }
                      className="text-[11px] text-red-400 hover:text-red-500 active:text-red-600 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                  <textarea
                    className="scribble-input w-full bg-transparent text-sm text-gray-700 outline-none min-h-[60px] leading-relaxed"
                    placeholder={sec.placeholder || "Write with Apple Pencil..."}
                    value={sec.content}
                    onChange={(e) => handleDynamicChange(e, i)}
                    rows={3}
                  />
                </div>
              ))}
            </div>

            {/* Bottom bar */}
            <div className="mt-auto pt-5 border-t border-gray-100 mt-6 flex items-center justify-between">
              <button
                onClick={handleSaveDraft}
                className="bg-navy text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-navy-light active:scale-[0.97] transition-all"
              >
                Save Draft
              </button>

              {draftSaved && (
                <span className="text-fresh-green text-sm font-medium toast-enter flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  Draft saved
                </span>
              )}

              <button
                onClick={() => setShowPreview(true)}
                className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-primary-dark active:scale-[0.97] transition-all"
              >
                Preview
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
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

      {/* Medicine Popup */}
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
          onComplete={handleComplete}
        />
      )}

      {/* Complete Screen */}
      {showCompleteScreen && (
        <CompleteScreen
          patient={selectedPatient}
          sections={sections}
          treatments={treatments}
          treatmentText={treatmentText}
          dynamicSections={dynamicSections}
          user={user}
          onClose={() => setShowCompleteScreen(false)}
        />
      )}

      {/* Prescription History Modal */}
      {showHistoryModal && (
        <PrescriptionHistoryModal
          patient={selectedPatient}
          history={patientHistory}
          onClose={() => setShowHistoryModal(false)}
        />
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <ScheduleModal onClose={() => setShowScheduleModal(false)} />
      )}
    </div>
  );
}
