import { useState, useRef } from "react";
import Logo from "../pages/Logo.svg";

// SVG Icons
const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const PersonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
  </svg>
);

const AddIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function Sidebar({
  expanded,
  setExpanded,
  patients,
  selectedPatient,
  onSelectPatient,
  onAddSection,
  onScheduleClick,
  onLogout,
  user
}) {
  const [showQueue, setShowQueue] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const addBtnRef = useRef(null);

  const addSectionOptions = ["Tests", "Advice", "Follow-Up", "Referral"];

  const handleQueueClick = () => {
    if (expanded) {
      const willShow = !showQueue;
      setShowQueue(willShow);
      setActiveItem(willShow ? "queue" : null);
      setShowAddMenu(false);
    } else {
      setExpanded(true);
      setShowQueue(true);
      setActiveItem("queue");
    }
  };

  const handleAddClick = () => {
    const willShow = !showAddMenu;
    setShowAddMenu(willShow);
    setActiveItem(willShow ? "add" : null);
    if (willShow) setShowQueue(false);
  };

  const handleSchedulesClick = () => {
    setActiveItem(activeItem === "schedules" ? null : "schedules");
    setShowQueue(false);
    setShowAddMenu(false);
    if (onScheduleClick) onScheduleClick();
  };

  return (
    <div
      className={`sidebar-transition h-full bg-navy flex flex-col overflow-visible ${
        expanded ? "w-[220px]" : "w-[68px]"
      } shrink-0`}
    >
      {/* Prescribble Logo */}
      <div className={`flex items-center transition-all pt-6 pb-2 ${expanded ? 'px-5 gap-3' : 'justify-center px-2'}`}>
        <img src={Logo} alt="Prescribble" className="h-6 w-auto shrink-0" />
        {expanded && (
          <span className="text-white font-bold text-lg tracking-wide whitespace-nowrap overflow-hidden">
            Prescribble
          </span>
        )}
      </div>

      {/* Doctor Profile */}
      <div
        className={`flex items-center gap-3 px-4 pt-3 pb-4 cursor-pointer ${
          !expanded ? "justify-center px-2" : ""
        }`}
        onClick={() => {
          setExpanded(!expanded);
          if (expanded) {
            setShowQueue(false);
            setShowAddMenu(false);
          }
        }}
      >
        <div className="relative shrink-0">
          <div
            className="w-10 h-10 rounded-full p-[2px]"
            style={{
              background: "linear-gradient(180deg, #1A73E8, #BDFFE6)",
            }}
          >
            <div className="w-full h-full rounded-full bg-navy flex items-center justify-center overflow-hidden">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" fill="#E5E7EB" />
                <path
                  d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6"
                  fill="#E5E7EB"
                />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-fresh-green rounded-full border-2 border-navy"></div>
        </div>
        {expanded && (
          <div className="overflow-hidden">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">
              Dermatologist
            </p>
            <p className="text-white text-sm font-semibold whitespace-nowrap">
              Dr. {user ? user.name : "Esther N."}
            </p>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div className="flex-1 flex flex-col mt-2 overflow-y-auto" style={{ overflowX: 'visible' }}>
        {/* Schedules */}
        <button
          onClick={handleSchedulesClick}
          className={`flex items-center gap-3 transition-colors ${
            expanded ? "px-5 py-3" : "justify-center py-3"
          } ${
            activeItem === "schedules"
              ? "text-white bg-white/10"
              : "text-gray-400 active:text-white"
          }`}
        >
          <CalendarIcon />
          {expanded && <span className="text-sm">Schedules</span>}
        </button>

        {/* Patient Queue */}
        <button
          onClick={handleQueueClick}
          className={`flex items-center gap-3 transition-colors ${
            expanded ? "px-5 py-3" : "justify-center py-3"
          } ${
            activeItem === "queue" || showQueue
              ? "text-white bg-white/10"
              : "text-gray-400 active:text-white"
          }`}
        >
          <PersonIcon />
          {expanded && (
            <>
              <span className="text-sm flex-1 text-left">Patient Queue</span>
              <ChevronIcon open={showQueue} />
            </>
          )}
        </button>

        {/* Patient List */}
        {expanded && showQueue && (
          <div className="ml-4 mr-2 mb-2 space-y-1 max-h-[200px] overflow-y-auto">
            {patients.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectPatient(p)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedPatient?.id === p.id
                    ? "bg-primary/20 border border-primary/40"
                    : "active:bg-white/5"
                }`}
              >
                <p className="text-[10px] text-gray-500">
                  MR No. {p.mrNo}
                </p>
                <p
                  className={`text-xs ${
                    selectedPatient?.id === p.id
                      ? "text-primary font-medium"
                      : "text-gray-300"
                  }`}
                >
                  {p.name}, {p.age}
                  {p.gender === "Male" ? "M" : "F"}
                </p>
              </button>
            ))}
          </div>
        )}

        {/* Add Section with blue connector lines */}
        <div className="relative">
          <button
            ref={addBtnRef}
            onClick={handleAddClick}
            className={`flex items-center gap-3 transition-colors ${
              expanded
                ? "px-5 py-2.5 rounded-xl"
                : "justify-center py-3 w-full"
            } ${
              showAddMenu
                ? "bg-primary text-white mx-2 rounded-xl"
                : "text-gray-400 active:text-white"
            }`}
          >
            <AddIcon />
            {expanded && (
              <>
                <span className="text-sm font-medium flex-1 text-left">
                  Add Section
                </span>
                <ChevronIcon open={showAddMenu} />
              </>
            )}
          </button>

          {/* Dropdown with blue connector lines */}
          {showAddMenu && expanded && (
            <div className="relative ml-2 mr-2 mb-2">
              <div className="flex flex-col">
                {addSectionOptions.map((opt, idx) => (
                  <div key={opt} className="relative flex items-stretch">
                    {/* The L-shaped branch from top center of item to vertically center, then right */}
                    <div className="absolute left-[29px] top-0 w-[15px] h-[50%] border-l-[3px] border-b-[3px] border-primary/40 rounded-bl-[12px]"></div>
                    
                    {/* The continuous vertical line for non-last items */}
                    {idx < addSectionOptions.length - 1 && (
                      <div className="absolute left-[29px] top-[50%] bottom-0 w-[3px] bg-primary/40"></div>
                    )}

                    <button
                      onClick={() => {
                        onAddSection(opt);
                        setShowAddMenu(false);
                        setActiveItem(null);
                      }}
                      className="w-full text-left pl-[56px] pr-4 py-2.5 text-sm text-gray-300 hover:bg-primary/20 hover:text-white active:bg-primary active:text-white transition-colors rounded-xl"
                    >
                      {opt}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Collapsed flyout */}
        {showAddMenu && !expanded && (
          <div
            className="fixed z-[100] bg-navy border border-gray-700 rounded-xl shadow-lg overflow-hidden w-36"
            style={{
              top: addBtnRef.current
                ? addBtnRef.current.getBoundingClientRect().top
                : 200,
              left: addBtnRef.current
                ? addBtnRef.current.getBoundingClientRect().right + 4
                : 72,
            }}
          >
            {addSectionOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onAddSection(opt);
                  setShowAddMenu(false);
                  setActiveItem(null);
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-300 active:bg-primary active:text-white transition-colors"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom - Settings & Logout */}
      <div className="mt-auto pb-5">
        <button
          className={`flex items-center gap-3 text-gray-400 active:text-white transition-colors ${
            expanded ? "px-5 py-2.5" : "justify-center py-2.5 w-full"
          }`}
        >
          <SettingsIcon />
          {expanded && <span className="text-sm">Settings</span>}
        </button>
        <button
          onClick={onLogout}
          className={`flex items-center gap-3 text-red-400 active:text-red-300 transition-colors ${
            expanded ? "px-5 py-2.5" : "justify-center py-2.5 w-full"
          }`}
        >
          <LogoutIcon />
          {expanded && <span className="text-sm">Logout Account</span>}
        </button>
      </div>
    </div>
  );
}
