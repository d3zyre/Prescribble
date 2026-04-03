import { useState } from "react";

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const MicIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a4 4 0 0 0-4 4v7a4 4 0 0 0 8 0V5a4 4 0 0 0-4-4z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      {/* Search */}
      <div className="p-4 pb-2">
        <div className="flex items-center bg-soft-gray rounded-xl px-3 py-2.5 gap-2">
          <button className="text-gray-400">
          <SearchIcon />
          </button>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder-gray-400"
          />
        </div>
      </div>

      {/* Suggestions Header + Filters */}
      <div className="flex items-center justify-between px-4 py-2">
        <h3 className="text-sm font-semibold text-gray-800">
          Suggestions
          {activeQuery.length >= 2 && !search && (
            <span className="text-xs font-normal text-primary ml-1.5">
              · matching "{activeQuery}"
            </span>
          )}
        </h3>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`flex items-center gap-1.5 text-xs transition-colors ${
            showFilter ? "text-primary font-medium" : "text-gray-500"
          }`}
        >
          Filters
          <FilterIcon />
        </button>
      </div>

      {/* Inline Filter Options */}
      {showFilter && (
        <div className="px-4 pb-2 flex gap-1.5">
          {[
            { key: "all", label: "All" },
            { key: "inStock", label: "In Stock" },
            { key: "outOfStock", label: "Out of Stock" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setStockFilter(f.key)}
              className={`px-3 py-1 rounded-full text-[10px] font-medium border transition-colors ${
                stockFilter === f.key
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-500 border-gray-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* Medicine List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {filtered.map((med) => {
          const brands = getFilteredBrands(med);
          if (brands.length === 0) return null;
          return (
            <div key={med.id} className="mb-1">
              {brands.map((brand, bIdx) => (
                <button
                  key={`${med.id}-${bIdx}`}
                  onClick={() => onMedicineClick(med, brand)}
                  className="w-full text-left py-2.5 border-b border-gray-50 last:border-0 active:bg-gray-50 transition-colors"
                >
                  <p className="text-sm text-gray-800 leading-snug">
                    {med.name} -{" "}
                    <span className="text-gray-600 font-medium">
                      {brand.name}
                    </span>
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <span
                      className={`text-xs font-medium ${
                        brand.stock === "In Stock" || brand.stock === "Available"
                          ? "text-fresh-green"
                          : "text-red-500"
                      }`}
                    >
                      {brand.stock}
                    </span>
                    <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {brand.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">
            No medicines found
          </p>
        )}
      </div>
    </div>
  );
}
