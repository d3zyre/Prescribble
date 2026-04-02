import { useState } from "react";

const DAY_STEPS = [1, 2, 3, 5, 7, 10, 14, 21, 28, 30, 60];

export default function MedicinePopup({ medicine, brand, onConfirm, onClose }) {
  // ALL fields start EMPTY — doctor must manually decide everything
  const [sliderIndex, setSliderIndex] = useState(-1); // -1 = nothing selected
  const [otherDays, setOtherDays] = useState("");
  const [useOther, setUseOther] = useState(false);
  const [mealTiming, setMealTiming] = useState(""); // "" = none selected
  const [frequency, setFrequency] = useState([false, false, false]); // all off

  const selectedDays =
    useOther && otherDays
      ? parseInt(otherDays) || 0
      : sliderIndex >= 0
        ? DAY_STEPS[sliderIndex]
        : 0;

  const progress =
    sliderIndex >= 0 ? (sliderIndex / (DAY_STEPS.length - 1)) * 100 : 0;

  const toggleFrequency = (index) => {
    const newFreq = [...frequency];
    newFreq[index] = !newFreq[index];
    setFrequency(newFreq);
  };

  // Validate: at least days + meal timing + 1 frequency must be set
  const isValid =
    selectedDays > 0 &&
    mealTiming !== "" &&
    frequency.some((f) => f);

  const handleConfirm = () => {
    if (!isValid) return;

    const labels = ["Morning", "Afternoon", "Night"];
    const times = frequency
      .map((on, i) => (on ? labels[i] : null))
      .filter(Boolean);

    onConfirm({
      medicine: { ...medicine, brand: brand.name },
      days: selectedDays,
      mealTiming,
      frequency: times,
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-popup w-full max-w-[560px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <div>
            <h3 className="text-base font-semibold text-gray-800">
              {medicine?.name}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {brand?.name} · {medicine?.dosage}
              {brand?.stock === "Out of Stock" && (
                <span className="ml-2 text-red-500 font-medium">
                  (Out of Stock)
                </span>
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full active:bg-gray-100 text-gray-400 text-xl"
          >
            ×
          </button>
        </div>

        {/* Content - Two columns */}
        <div className="flex divide-x divide-gray-100">
          {/* LEFT - Days Selector */}
          <div className="flex-1 px-6 py-5">
            {/* Selected value tooltip */}
            <div className="relative h-10 mb-2 w-full px-1">
              <div
                className="absolute bottom-0 -translate-x-1/2 transition-all duration-200 flex flex-col items-center"
                style={{
                  left: useOther || sliderIndex < 0 ? "50%" : `calc(${progress}% + ${8 - (progress / 100) * 16}px)`,
                }}
              >
                <div
                  className={`text-sm font-semibold px-3 py-1.5 rounded-lg min-w-[40px] text-center ${sliderIndex >= 0 || (useOther && otherDays)
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-gray-200 text-gray-400"
                    }`}
                >
                  {selectedDays > 0 ? selectedDays : "—"}
                </div>
                <div
                  className={`w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent ${sliderIndex >= 0 || (useOther && otherDays)
                    ? "border-t-primary"
                    : "border-t-gray-200"
                    }`}
                ></div>
              </div>
            </div>

            {/* Slider */}
            <div className="mt-4 px-1">
              <input
                type="range"
                min="0"
                max={DAY_STEPS.length - 1}
                value={sliderIndex >= 0 ? sliderIndex : 0}
                onChange={(e) => {
                  setSliderIndex(parseInt(e.target.value));
                  setUseOther(false);
                }}
                className="days-slider w-full cursor-pointer"
                style={{ "--progress": `${progress}%` }}
              />
              {/* Tick labels */}
              <div className="flex justify-between mt-2 px-0">
                {DAY_STEPS.map((val, i) => (
                  <span
                    key={val}
                    className={`text-[10px] ${i === sliderIndex
                      ? "text-primary font-semibold"
                      : "text-gray-400"
                      }`}
                  >
                    {val}
                  </span>
                ))}
              </div>
            </div>

            {/* Label */}
            <p className="text-center text-sm text-gray-600 mt-4 font-medium">
              No. of Days
            </p>

            {/* Other input */}
            <div className="mt-4 relative">
              <input
                type="text"
                inputMode="numeric"
                placeholder="Other"
                value={otherDays}
                onChange={(e) => {
                  setOtherDays(e.target.value);
                  setUseOther(true);
                }}
                className="w-full bg-soft-gray rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30 pr-9"
              />
              {otherDays && (
                <button
                  onClick={() => {
                    setOtherDays("");
                    setUseOther(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full bg-gray-300 text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* RIGHT - Meal Timing */}
          <div className="flex-1 px-6 py-5">
            {/* Frequency dots */}
            <p className="text-xs text-gray-500 mb-3 font-medium">Frequency</p>
            <div className="flex items-center justify-center gap-1 mb-6">
              {["Morning", "Afternoon", "Night"].map((label, i) => (
                <div key={label} className="flex items-center">
                  <button
                    onClick={() => toggleFrequency(i)}
                    className="flex flex-col items-center gap-1"
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 transition-all ${frequency[i]
                        ? "bg-primary border-primary"
                        : "bg-white border-gray-300"
                        }`}
                    />
                    <span className="text-[9px] text-gray-500">{label}</span>
                  </button>
                  {i < 2 && (
                    <div
                      className={`w-8 h-[2px] mb-4 ${frequency[i] && frequency[i + 1]
                        ? "bg-primary"
                        : "bg-gray-200"
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Meal Timing Toggle */}
            <p className="text-xs text-gray-500 mb-2 font-medium">
              Meal Timing
            </p>
            <div className="flex bg-gray-100 rounded-full p-[3px]">
              <button
                onClick={() => setMealTiming("Before Meal")}
                className={`flex-1 py-1 text-sm font-medium transition-all rounded-full ${mealTiming === "Before Meal"
                  ? "bg-primary text-white"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                Before Meal
              </button>
              <button
                onClick={() => setMealTiming("After Meal")}
                className={`flex-1 py-1 text-sm font-medium transition-all rounded-full ${mealTiming === "After Meal"
                  ? "bg-primary text-white"
                  : "text-gray-500 hover:text-gray-700"
                  }`}
              >
                After Meal
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-sm text-gray-500 active:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!isValid}
            className={`px-5 py-2 rounded-xl text-sm font-medium transition-colors ${isValid
              ? "text-white bg-primary active:bg-primary-dark"
              : "text-gray-400 bg-gray-100 cursor-not-allowed"
              }`}
          >
            Add to Treatment
          </button>
        </div>
      </div>
    </div>
  );
}
