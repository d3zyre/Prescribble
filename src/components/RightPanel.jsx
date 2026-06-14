import { useState } from "react";

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const FilterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <line x1="11" y1="18" x2="13" y2="18" />
  </svg>
);

export default function RightPanel({ medicines, onMedicineClick, treatmentQuery }) {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [stockFilter, setStockFilter] = useState("all"); // "all" | "inStock" | "outOfStock"

  // Use treatmentQuery (from typing in treatment textarea) as an additional search source
  // If the user is typing in the search box, that takes priority
  // If search box is empty but treatmentQuery has content, use that
  const activeQuery = search || treatmentQuery || "";

  const filtered = medicines.filter((m) =>
    m.name.toLowerCase().includes(activeQuery.toLowerCase()) ||
    m.brands.some((b) =>
      b.name.toLowerCase().includes(activeQuery.toLowerCase())
    )
  );

  // Apply stock filter at brand level
  const getFilteredBrands = (med) => {
    if (stockFilter === "all") return med.brands;
    if (stockFilter === "inStock")
      return med.brands.filter((b) => b.stock === "In Stock" || b.stock === "Available");
    if (stockFilter === "outOfStock")
      return med.brands.filter((b) => b.stock === "Out of Stock");
    return med.brands;
  };

  return (
    <div className="w-[280px] shrink-0 bg-white flex flex-col border-l border-gray-100 h-full overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-1">
        <h3 className="text-[13px] font-bold text-gray-800 mb-3">
          Medicine Suggestions
          {activeQuery.length >= 2 && !search && (
            <span className="text-[11px] font-normal text-primary ml-1.5">
              · "{activeQuery}"
            </span>
          )}
        </h3>
        {/* Search */}
        <div className="flex items-center bg-gray-50 border border-gray-100 rounded-xl px-3 py-2 gap-2">
          <span className="text-gray-400 shrink-0">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Search medicines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder-gray-400 min-w-0"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-gray-400 hover:text-gray-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex gap-1.5">
          {showFilter && [
            { key: "all", label: "All" },
            { key: "inStock", label: "In Stock" },
            { key: "outOfStock", label: "Out" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setStockFilter(f.key)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-medium border transition-all ${
                stockFilter === f.key
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`flex items-center gap-1 text-[11px] transition-colors ${
            showFilter ? "text-primary font-medium" : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <FilterIcon />
          Filter
        </button>
      </div>

      {/* Medicine List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {filtered.map((med) => {
          const brands = getFilteredBrands(med);
          if (brands.length === 0) return null;
          return (
            <div key={med.id}>
              {brands.map((brand, bIdx) => (
                <button
                  key={`${med.id}-${bIdx}`}
                  onClick={() => onMedicineClick(med, brand)}
                  className="w-full text-left py-2.5 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 active:bg-gray-100/60 transition-colors rounded-lg px-1 -mx-1"
                >
                  <p className="text-[13px] text-gray-800 leading-snug">
                    {med.name}
                    <span className="text-gray-500"> · </span>
                    <span className="text-gray-500 font-medium text-xs">
                      {brand.name}
                    </span>
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span
                      className={`text-[11px] font-medium flex items-center gap-1 ${
                        brand.stock === "In Stock" || brand.stock === "Available"
                          ? "text-fresh-green"
                          : "text-red-400"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        brand.stock === "In Stock" || brand.stock === "Available"
                          ? "bg-fresh-green"
                          : "bg-red-400"
                      }`} />
                      {brand.stock}
                    </span>
                    <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                      {brand.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p className="text-sm text-gray-400 font-medium">No medicines found</p>
            <p className="text-xs text-gray-300 mt-1">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
}
