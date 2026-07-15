# Prescribble — Design System Extract

> **Source**: React + Vite + Tailwind CSS 3.4 codebase
> **Primary Font**: [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)
> **Target**: iPad-optimized medical prescription app

---

## Part 1 — Design Tokens

### 1.1 Color Palette

| Token Name | Hex | Tailwind Class | Usage |
|---|---|---|---|
| **Navy** | `#0B1F33` | `bg-navy`, `text-navy` | Sidebar background, "Save Draft" / "Preview" buttons, prescription badge |
| **Navy Light** | `#132D47` | `bg-navy-light` | Defined in config but not actively used (available for hover/variant states) |
| **Primary** | `#1A73E8` | `bg-primary`, `text-primary`, `border-primary` | CTAs, active states, links, gradient start, focus rings, calendar today, slider fill |
| **Primary Dark** | `#1557B0` | `bg-primary-dark` | Hover / active state for primary buttons |
| **Soft Gray** | `#E5E7EB` | `bg-soft-gray` | Input field backgrounds, section cards, slider track unfilled |
| **Fresh Green** | `#34C38F` | `bg-fresh-green`, `text-fresh-green` | Success / "Done" button, stock-available badge, online-status dot, toast confirmation |
| **Gradient End** | `#BDFFE6` | — | Gradient terminus (used in linear-gradient with Primary) |

#### Derived / Utility Colors (from Tailwind defaults + inline)

| Color | Hex / Value | Usage |
|---|---|---|
| White | `#FFFFFF` | Card backgrounds, modal surfaces, text on primary |
| Black overlay | `rgba(0,0,0,0.40)` | Modal backdrop (`bg-black/40`) |
| Gray-50 | `#F9FAFB` | Calendar sidebar bg, schedule card bg, hover active bg |
| Gray-100 | `#F3F4F6` | Dividers, borders, meal-timing toggle track, filter pill bg |
| Gray-200 | `#E5E7EB` | Input borders, unselected slider ticks, frequency connector lines |
| Gray-300 | `#D1D5DB` | Flyout menu text, frequency border (unselected) |
| Gray-400 | `#9CA3AF` | Inactive sidebar icons/text, placeholder text, close button icons |
| Gray-500 | `#6B7280` | Secondary body text, labels, subheadings |
| Gray-600 | `#4B5563` | Body text for patient details |
| Gray-700 | `#374151` | Scribble/textarea content text, calendar day text |
| Gray-800 | `#1F2937` | Headings, bold labels, patient name, modal titles |
| Red-400 | `#F87171` | Logout text, remove treatment button |
| Red-500 | `#EF4444` | Out-of-stock badge text |
| Red-50 | `#FEF2F2` | Error alert background |
| Scrollbar thumb | `#C4C4C4` → `#999` on hover | Custom webkit scrollbar |

#### Gradients

| Name | Value | Usage |
|---|---|---|
| **Main Gradient** | `linear-gradient(180deg, #1A73E8, #BDFFE6)` | Login/Signup page background, Dashboard middle column, avatar ring |
| **Slider Progress** | `linear-gradient(to right, #1A73E8 0%, #1A73E8 var(--progress), #E5E7EB var(--progress), #E5E7EB 100%)` | Days slider track fill |

---

### 1.2 Typography

| Property | Value |
|---|---|
| **Font Family** | `'Inter', system-ui, -apple-system, sans-serif` |
| **Loaded Weights** | 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold) |

#### Type Scale (as used across components)

| Size | Tailwind | px | Weight(s) Used | Example Usage |
|---|---|---|---|---|
| `text-2xl` | — | 24px | 700 (Bold) | Auth page titles ("Welcome Back", "Create Account") |
| `text-xl` | — | 20px | 700 (Bold) | Calendar month/year header |
| `text-lg` | — | 18px | 700 (Bold) | Modal titles, Sidebar brand name, Schedule heading |
| `text-base` | — | 16px | 600–700 | Medicine popup header, Patient Details heading |
| `text-sm` | — | 14px | 400–600 | Body text, form labels, sidebar menu items, button labels |
| `text-xs` | — | 12px | 400–500 | Secondary labels, stock badges, treatment meta, date info |
| `text-[11px]` | — | 11px | 400 | Signature attribution, calendar day headers |
| `text-[10px]` | — | 400–600 | 10px | Speciality label ("Dermatologist"), MR number, filter pills, slider labels |
| `text-[9px]` | — | 9px | 400 | Frequency dot labels ("Morning", "Afternoon", "Night") |

#### Letter Spacing

| Value | Usage |
|---|---|
| `tracking-wide` | Brand name "Prescribble" |
| `tracking-wider` | Uppercase specialty labels, calendar day-of-week headers |

---

### 1.3 Spacing & Layout

#### Standard Spacing Values (Tailwind rem scale, used throughout)

| Token | rem | px | Typical Usage |
|---|---|---|---|
| `0.5` | 0.125rem | 2px | Tiny gaps (mt-0.5) |
| `1` | 0.25rem | 4px | Icon margins, small gaps |
| `1.5` | 0.375rem | 6px | Pill padding (py-1), small gaps |
| `2` | 0.5rem | 8px | Section spacing, inner padding |
| `2.5` | 0.625rem | 10px | Button padding (py-2.5), input padding |
| `3` | 0.75rem | 12px | Sidebar gap, frequency gap, search input padding |
| `4` | 1rem | 16px | Card padding, list padding, standard gap |
| `5` | 1.25rem | 20px | Card padding (p-5), sidebar vertical padding |
| `6` | 1.5rem | 24px | Modal padding (px-6), content area horizontal padding |
| `8` | 2rem | 32px | Auth card padding (p-8), preview modal padding |

#### Fixed Widths

| Element | Width | Notes |
|---|---|---|
| Sidebar (expanded) | `220px` | `w-[220px]` |
| Sidebar (collapsed) | `68px` | `w-[68px]` |
| Right Panel | `280px` | `w-[280px]` |
| Medicine Popup | `max-w-[560px]` | Modal max-width |
| Preview Modal | `max-w-[600px]` | Modal max-width |
| Schedule Modal | `max-w-[700px]` | Split-view modal |
| Calendar column | `320px` | `w-full md:w-[320px]` |
| Auth form card | `max-w-md` (448px) | Login/Signup card |
| Flyout menu | `w-36` (144px) | Collapsed sidebar dropdown |

---

### 1.4 Border Radius

| Token | Tailwind Class | px | Usage |
|---|---|---|---|
| Full circle | `rounded-full` | 9999px | Avatars, status dots, pills, toggle tracks, calendar days |
| Extra large | `rounded-2xl` | 16px | Cards, modals, auth forms |
| Large | `rounded-xl` | 12px | Buttons, inputs, section cards, treatment items, tags |
| Medium | `rounded-lg` | 8px | Patient queue items, slider tooltip |
| Default | `rounded` | 4px | Scrollbar thumb |
| Custom connector | `rounded-bl-[12px]` | 12px | Add Section branch line corner |

---

### 1.5 Shadows

| Token | Value | Tailwind Class | Usage |
|---|---|---|---|
| **Card** | `0 2px 12px rgba(0,0,0,0.08)` | `shadow-card` | Patient details card, prescription form card |
| **Popup** | `0 8px 32px rgba(0,0,0,0.2)` | `shadow-popup` | All modals (Medicine, Preview, Schedule, Auth) |
| **Medium** | Tailwind `shadow-md` | `shadow-md` | Primary buttons, "Done" button, today badge, auth submit buttons |
| **Small** | Tailwind `shadow-sm` | `shadow-sm` | Schedule appointment type badges |
| **Primary glow** | `shadow-primary/20` | — | Slider tooltip when active |
| **Primary calendar** | `shadow-primary/30` | — | Calendar "today" highlight |
| **Slider thumb** | `0 1px 4px rgba(0,0,0,0.15)` | (inline CSS) | Range input thumb |

---

### 1.6 Animations & Transitions

| Name | Value | Usage |
|---|---|---|
| **Sidebar transition** | `width 0.3s cubic-bezier(0.4, 0, 0.2, 1)` | Sidebar expand/collapse |
| **Toast slideUp** | `translateY(20px) → translateY(0)`, `opacity: 0 → 1`, `0.3s ease-out` | "Draft saved!" toast |
| **General transitions** | `transition-colors` (150ms) | All hover/active color changes |
| **Scale press** | `active:scale-95` + `transition-transform` | Button press feedback |
| **Chevron rotate** | `transition-transform duration-200` + `rotate-180` | Dropdown chevron toggle |
| **Slider tooltip** | `transition-all duration-200` | Tooltip position follow |

---

### 1.7 Scrollbar

| Property | Value |
|---|---|
| Width | `4px` |
| Track | `transparent` |
| Thumb | `#C4C4C4`, `border-radius: 4px` |
| Thumb (hover) | `#999` |

---

## Part 2 — Component Tree

### Legend
- ☐ = Figma rebuild checklist item
- **Props** = data/config the component receives
- **States** = visual states to design
- **Variants** = layout/presentation variations

---

### 2.1 App Shell / Layout

#### ☐ `Dashboard` — [Dashboard.jsx](file:///d:/Lelouch/Pixels%20of%20Akankshaa/Prescribble/src/pages/Dashboard.jsx)
Full-screen 3-column layout (Sidebar | Content | Right Panel).

| Property | Detail |
|---|---|
| **Layout** | `h-full flex` — horizontal 3-column |
| **Background** | Left: `bg-navy` · Middle: `linear-gradient(180deg, #1A73E8, #BDFFE6)` · Right: `bg-white` |
| **States** | Sidebar expanded (220px) / collapsed (68px) — middle column stretches |

**Internal sub-components to design:**

- ☐ **Patient Details Card** — white card at top of middle column
  - Shows Name, DOB (age), Gender on left
  - "Prescriptions" pill badge (navy bg + primary count circle) + MR No on right
  - `rounded-2xl shadow-card p-5`

- ☐ **Section Card** (repeated for Symptoms, Diagnosis, Treatment, dynamic sections)
  - `rounded-xl bg-soft-gray/30 p-4` with `border-l-[3px] border-primary`
  - Contains bold title + scribble textarea
  - **States**: Empty (placeholder text) · Filled (content visible)

- ☐ **Treatment Item Row** (medicine chip inside Treatment section)
  - `bg-white rounded-lg px-3 py-2` — shows medicine name, brand, days, frequency, meal timing
  - Has red `×` remove button on right
  - **States**: Default · Hover (not styled) · Active press on remove

- ☐ **Done / Checkmark Button**
  - **Variant A**: Circle icon button — `w-10 h-10 rounded-full bg-fresh-green`
  - **Variant B**: Expanded pill — `bg-fresh-green text-white px-5 py-2 rounded-xl` with check icon
  - **States**: Default · Active press (`active:scale-95`)

- ☐ **Bottom Action Bar** (inside content card, at bottom)
  - "Save Draft" button — `bg-navy text-white px-6 py-2.5 rounded-xl`
  - "Preview →" button — same style, with arrow
  - "✓ Draft saved!" toast — `text-fresh-green`, `slideUp` animation
  - **States**: Buttons default · Button pressed (`active:scale-95`) · Toast visible/hidden

---

### 2.2 Sidebar

#### ☐ `Sidebar` — [Sidebar.jsx](file:///d:/Lelouch/Pixels%20of%20Akankshaa/Prescribble/src/components/Sidebar.jsx)

| Property | Detail |
|---|---|
| **Props** | `expanded`, `patients[]`, `selectedPatient`, `user`, callbacks |
| **Background** | `bg-navy` (`#0B1F33`) |
| **Widths** | Expanded: `220px` · Collapsed: `68px` |
| **Transition** | `width 0.3s cubic-bezier(0.4, 0, 0.2, 1)` |

**Sub-components:**

- ☐ **Logo Block**
  - Logo SVG (`h-6`) + "Prescribble" text (white, bold, `text-lg`, `tracking-wide`)
  - **Variants**: Expanded (logo + text) · Collapsed (logo only, centered)

- ☐ **Doctor Profile Avatar**
  - `w-10 h-10` circle with gradient ring (`linear-gradient(180deg, #1A73E8, #BDFFE6)`, 2px padding)
  - Inner circle: `bg-navy` with placeholder person SVG
  - Green online dot: `w-3 h-3 bg-fresh-green rounded-full border-2 border-navy` (bottom-right)
  - **Variants**: Expanded (shows specialty + name) · Collapsed (avatar only)

- ☐ **Menu Item** (Schedules, Patient Queue, Settings)
  - Icon (20×20 SVG, `stroke="currentColor"`) + label (14px)
  - **States**:
    - Default: `text-gray-400`
    - Active/Selected: `text-white bg-white/10`
    - Pressed: `active:text-white`
  - **Variants**: Expanded (icon + label) · Collapsed (icon only, centered)

- ☐ **Patient Queue Dropdown** (inside sidebar, expanded only)
  - `ml-4 mr-2` container, `max-h-[200px] overflow-y-auto`
  - Each patient item: `px-3 py-2 rounded-lg`
    - Shows MR No (10px gray-500) + Name, Age, Gender (12px)
    - **States**:
      - Default: gray text
      - Selected: `bg-primary/20 border border-primary/40`, name becomes `text-primary font-medium`
      - Pressed: `active:bg-white/5`

- ☐ **Chevron Icon**
  - 16×16 SVG, rotates 180° when dropdown open
  - `transition-transform duration-200`

- ☐ **Add Section Button**
  - **States**:
    - Default: `text-gray-400` (matches other menu items)
    - Active (menu open): `bg-primary text-white mx-2 rounded-xl`
  - **Variants**: Expanded · Collapsed

- ☐ **Add Section Dropdown — Expanded**
  - Items: Tests, Advice, Follow-Up, Referral
  - Each item: `pl-[56px] pr-4 py-2.5 text-sm text-gray-300 rounded-xl`
  - Blue L-shaped branch lines: `border-l-[3px] border-b-[3px] border-primary/40 rounded-bl-[12px]`
  - Vertical connector for non-last items: `w-[3px] bg-primary/40`
  - **States**: hover `bg-primary/20 text-white` · active `bg-primary text-white`

- ☐ **Add Section Flyout — Collapsed**
  - Fixed positioned, `bg-navy border border-gray-700 rounded-xl shadow-lg w-36`
  - Appears to the right of collapsed icon button
  - Items: `px-4 py-2.5 text-sm text-gray-300`
  - **States**: active `bg-primary text-white`

- ☐ **Logout Button**
  - `text-red-400 active:text-red-300`
  - Icon + "Logout Account" text (expanded) or icon only (collapsed)

---

### 2.3 Right Panel — Medicine Suggestions

#### ☐ `RightPanel` — [RightPanel.jsx](file:///d:/Lelouch/Pixels%20of%20Akankshaa/Prescribble/src/components/RightPanel.jsx)

| Property | Detail |
|---|---|
| **Props** | `medicines[]`, `treatmentQuery`, `onMedicineClick` |
| **Width** | `280px` fixed |
| **Background** | `bg-white`, `border-l border-gray-100` |

**Sub-components:**

- ☐ **Search Bar**
  - Container: `bg-soft-gray rounded-xl px-3 py-2.5`
  - Search icon (18×18, gray-400) + text input
  - **States**: Empty (placeholder "Search") · Typing · With active query from treatment panel (shows "· matching ___" indicator)

- ☐ **Suggestions Header**
  - "Suggestions" title (`text-sm font-semibold text-gray-800`)
  - "Filters" toggle button (`text-xs text-gray-500`, active: `text-primary font-medium`)
  - Auto-match indicator: `text-xs text-primary ml-1.5` — shows when treatment textarea filters

- ☐ **Filter Pills** (visible when Filters toggled on)
  - Options: All, In Stock, Out of Stock
  - `px-3 py-1 rounded-full text-[10px] font-medium border`
  - **States**:
    - Selected: `bg-primary text-white border-primary`
    - Unselected: `bg-white text-gray-500 border-gray-200`

- ☐ **Medicine List Item**
  - Full-width button, `py-2.5 border-b border-gray-50`
  - Top: Medicine name (14px gray-800) + brand (gray-600 font-medium)
  - Bottom row: stock badge + brand pill tag
  - Stock badge: `text-xs font-medium` — green (`text-fresh-green`) for In Stock/Available, red (`text-red-500`) for Out of Stock
  - Brand tag: `text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full`
  - **States**: Default · Active press (`active:bg-gray-50`)

- ☐ **Empty State**
  - "No medicines found" — `text-sm text-gray-400 text-center py-8`

---

### 2.4 Medicine Configuration Popup

#### ☐ `MedicinePopup` — [MedicinePopup.jsx](file:///d:/Lelouch/Pixels%20of%20Akankshaa/Prescribble/src/components/MedicinePopup.jsx)

| Property | Detail |
|---|---|
| **Props** | `medicine`, `brand`, `onConfirm`, `onClose` |
| **Max width** | `560px` |
| **Surface** | `bg-white rounded-2xl shadow-popup` |
| **Backdrop** | `bg-black/40` (click to dismiss) |

**Sub-components:**

- ☐ **Popup Header**
  - Medicine name (`text-base font-semibold text-gray-800`)
  - Brand + dosage subtitle (`text-xs text-gray-500`)
  - Out of Stock badge: `text-red-500 font-medium`
  - Close button: `w-8 h-8 rounded-full active:bg-gray-100 text-gray-400`

- ☐ **Days Selector (Left Column)**
  - **Tooltip badge** above slider:
    - Active: `bg-primary text-white shadow-md shadow-primary/20 rounded-lg px-3 py-1.5`
    - Inactive: `bg-gray-200 text-gray-400`
    - Triangle pointer below (CSS border trick)
    - Follows slider position with `left: calc(${progress}%)`
  - **Range slider** (custom styled `.days-slider`):
    - Track: 3px height, gradient fill from primary to soft-gray
    - Thumb: `16px` circle, white fill, `3px solid #1A73E8` border, subtle shadow
    - Step values: `[1, 2, 3, 5, 7, 10, 14, 21, 28, 30, 60]`
  - **Tick marks + labels** below slider:
    - Tick: `w-[1px] h-[5px]`
    - **States**: Past steps `text-primary font-medium`, Current step `text-primary font-semibold`, Future `text-gray-400`
  - "No. of Days" label: `text-sm text-gray-600 font-medium text-center`
  - **"Other" custom input**: `bg-soft-gray rounded-xl px-4 py-2.5 text-sm`
    - Focus: `ring-2 ring-primary/30`
    - Clear button: `w-5 h-5 rounded-full bg-gray-300 text-white`

- ☐ **Frequency Dots (Right Column)**
  - Three togglable circles (Morning, Afternoon, Night)
  - Each: `w-5 h-5 rounded-full border-2`
  - **States**: Off `bg-white border-gray-300` · On `bg-primary border-primary`
  - Connector lines between: `w-8 h-[2px]`
  - **States**: Both adjacent active `bg-primary` · Otherwise `bg-gray-200`
  - Labels below: `text-[9px] text-gray-500`

- ☐ **Meal Timing Toggle**
  - Track: `bg-gray-100 rounded-full p-[3px]`
  - Options: "Before Meal", "After Meal"
  - **States**:
    - Selected: `bg-primary text-white rounded-full`
    - Unselected: `text-gray-500 hover:text-gray-700`

- ☐ **Footer Action Buttons**
  - "Cancel": `px-5 py-2 rounded-xl text-sm text-gray-500 active:bg-gray-50`
  - "Add to Treatment":
    - **Enabled**: `text-white bg-primary active:bg-primary-dark`
    - **Disabled**: `text-gray-400 bg-gray-100 cursor-not-allowed`

---

### 2.5 Prescription Preview Modal

#### ☐ `PreviewModal` — [PreviewModal.jsx](file:///d:/Lelouch/Pixels%20of%20Akankshaa/Prescribble/src/components/PreviewModal.jsx)

| Property | Detail |
|---|---|
| **Props** | `patient`, `sections[]`, `treatments[]`, `treatmentText`, `dynamicSections[]`, `onClose` |
| **Max width** | `600px`, `max-h-[85vh]` scrollable |
| **Surface** | `bg-white rounded-2xl shadow-popup` |

**Sub-components:**

- ☐ **Preview Header**
  - "Prescription Preview" (`text-lg font-bold text-gray-800`)
  - Close `×` button (same style as MedicinePopup)
  - Bottom border: `border-b border-gray-100`

- ☐ **Doctor Info Block**
  - Centered, "Dermatologist" label (`text-xs text-gray-400 uppercase tracking-wider`)
  - Doctor name (`text-base font-bold text-gray-800`)
  - Dashed bottom border: `border-b border-dashed border-gray-200`

- ☐ **Patient Info Card**
  - `bg-soft-gray/50 rounded-xl p-4`
  - 2-column grid: Name, MR No, DOB (age), Gender
  - Labels `text-gray-500`, values `font-medium text-gray-800`

- ☐ **Section Block** (repeated for Symptoms, Diagnosis, Treatment, dynamic sections)
  - Title: `text-sm font-bold text-primary`
  - Content: `text-sm text-gray-700 whitespace-pre-wrap`
  - Empty fallback: `text-sm text-gray-400` showing "-"

- ☐ **Treatment Entry** (inside Treatment section)
  - `bg-soft-gray/50 rounded-xl p-3`
  - Medicine + brand name (`font-medium text-gray-800`)
  - Meta line: days · frequency · meal timing (`text-gray-500 text-xs`)

- ☐ **Digital Signature Block**
  - Top dashed border: `border-t border-dashed border-gray-200`
  - "Digital Signature" heading (primary, bold)
  - "Digitally signed by" label (`text-xs text-gray-500`)
  - Signature image (`h-24 w-auto`)
  - Dotted line: `w-56 border-b border-dashed border-gray-300`
  - Attribution: `text-[11px] text-gray-500`

- ☐ **Footer Actions**
  - "Close" — ghost button (same as Cancel style)
  - "Print" — `bg-primary text-white active:bg-primary-dark font-medium`

---

### 2.6 Schedule Modal

#### ☐ `ScheduleModal` — [ScheduleModal.jsx](file:///d:/Lelouch/Pixels%20of%20Akankshaa/Prescribble/src/components/ScheduleModal.jsx)

| Property | Detail |
|---|---|
| **Props** | `onClose` |
| **Max width** | `700px` |
| **Layout** | Split view: Calendar (left, 320px) + Agenda (right, flex-1) |

**Sub-components:**

- ☐ **Calendar Grid (Left)**
  - Background: `bg-gray-50 border-r border-gray-100`
  - Month/year header: `text-xl font-bold text-gray-800 tracking-tight`
  - Navigation arrows: `w-7 h-7 rounded-full hover:bg-gray-200 text-gray-400`
  - Day-of-week row: `text-[11px] font-semibold text-gray-400 uppercase tracking-wider`
  - Day cells: `w-8 h-8 rounded-full text-sm font-medium`
    - **States**: Normal `text-gray-700 hover:bg-gray-200` · Today `bg-primary text-white shadow-md shadow-primary/30`

- ☐ **Agenda List (Right)**
  - Sticky header with "Schedule" title + date subtitle
  - Close `×` button: `w-8 h-8 rounded-full hover:bg-gray-100`
  - Each agenda item is a row: Time | Timeline dot | Card
  - **Time column** (`w-16`, right-aligned): hour `text-xs font-semibold text-gray-500` + AM/PM `text-[10px] text-gray-400 font-medium`
  - **Timeline dot**: `w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-white`
  - **Timeline connector**: `w-[2px] bg-gray-100` (not on last item)
  - **Appointment card**: `bg-gray-50 rounded-xl p-3 border border-gray-100`
    - Patient name: `text-sm font-bold text-gray-800`
    - Type badge: `text-[10px] font-medium px-2 py-0.5 bg-white border border-gray-200 text-gray-500 shadow-sm`
    - Condition: `text-xs text-gray-500 truncate`
    - **States**: Default · Hover (`group-hover:bg-primary/5`)

---

### 2.7 Auth Pages

#### ☐ `Login` — [Login.jsx](file:///d:/Lelouch/Pixels%20of%20Akankshaa/Prescribble/src/pages/Login.jsx)

| Property | Detail |
|---|---|
| **Props** | `onLogin` callback |
| **Background** | `linear-gradient(180deg, #1A73E8, #BDFFE6)` (full screen) |
| **Card** | `bg-white rounded-2xl shadow-popup p-8 max-w-md` |

**Sub-components:**

- ☐ **Logo + Heading Block**
  - Logo SVG (`h-10 mx-auto`)
  - "Welcome Back" (`text-2xl font-bold text-gray-800`)
  - "Login to your account" (`text-gray-500 text-sm`)

- ☐ **Error Alert**
  - `bg-red-50 text-red-500 p-3 rounded-xl text-sm`
  - **States**: Hidden · Visible (with error message)

- ☐ **Form Input Field** (shared between Login and Signup)
  - Label: `text-sm font-medium text-gray-700 mb-1`
  - Input: `w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm`
  - **States**: Default · Focus (`focus:ring-2 focus:ring-primary/50 focus:outline-none`) · Error (no border change, error shown above)

- ☐ **Primary Submit Button — Login**
  - `w-full bg-primary text-white py-2.5 rounded-xl text-sm font-medium shadow-md`
  - **States**: Default · Hover (`hover:bg-primary-dark`) · Pressed (`active:scale-95`)

- ☐ **Auth Footer Link**
  - "Don't have an account? Sign up" / "Already have an account? Log in"
  - Link: `text-primary font-medium hover:underline`

---

#### ☐ `Signup` — [Signup.jsx](file:///d:/Lelouch/Pixels%20of%20Akankshaa/Prescribble/src/pages/Signup.jsx)

Same card layout as Login with these differences:

| Difference | Detail |
|---|---|
| Heading | "Create Account" / "Sign up to get started" |
| Extra field | "Full Name" input |
| Submit button color | `bg-fresh-green` instead of `bg-primary` |
| Submit hover | `hover:bg-emerald-500` |

---

### 2.8 Iconography

All icons are **inline SVGs** with `stroke="currentColor"` and `strokeWidth="2"`. They inherit color from parent text color.

#### Icon Inventory

| Icon | Size | Source Component | Used In |
|---|---|---|---|
| Calendar | 20×20 | `CalendarIcon` | Sidebar — Schedules |
| Person | 20×20 | `PersonIcon` | Sidebar — Patient Queue |
| Add (Square+) | 20×20 | `AddIcon` | Sidebar — Add Section |
| Settings (Sun/Gear) | 20×20 | `SettingsIcon` | Sidebar — Settings |
| Logout | 20×20 | `LogoutIcon` | Sidebar — Logout |
| Chevron Down | 16×16 | `ChevronIcon` | Sidebar dropdowns (rotates) |
| Search | 18×18 | `SearchIcon` | Right Panel search |
| Microphone | 18×18 | `MicIcon` | Right Panel (defined, not rendered) |
| Filter | 16×16 | `FilterIcon` | Right Panel filter toggle |
| Checkmark | 24×24 | `CheckIcon` | Dashboard done button |
| Chevron Left/Right | 16×16 | inline | Calendar navigation |
| Close (×) | — | Unicode `×` | All modal close buttons |
| Remove (×) | — | Unicode `×` | Treatment item delete |

---

### 2.9 Shared Patterns / Atoms

These are recurring design atoms used across multiple components:

#### ☐ Modal Backdrop
- `fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4`
- Click on backdrop → `onClose`
- Content uses `e.stopPropagation()` to prevent close on inner click

#### ☐ Close Button (Modal)
- `w-8 h-8 flex items-center justify-center rounded-full text-gray-400 text-xl`
- States: Default · Active `active:bg-gray-100` or `hover:bg-gray-100`

#### ☐ Ghost Button (Cancel/Close)
- `px-5 py-2 rounded-xl text-sm text-gray-500 active:bg-gray-50 transition-colors`

#### ☐ Primary Action Button
- `px-5 py-2 rounded-xl text-sm font-medium text-white bg-primary active:bg-primary-dark transition-colors`

#### ☐ Disabled Button
- `text-gray-400 bg-gray-100 cursor-not-allowed rounded-xl px-5 py-2 text-sm`

#### ☐ Text Input
- `bg-soft-gray rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/30`

#### ☐ Form Input (bordered)
- `w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm`

#### ☐ Scribble Textarea
- `w-full bg-transparent text-sm text-gray-700 outline-none leading-relaxed resize-none`
- `-webkit-user-modify: read-write-plaintext-only`

#### ☐ Status Badge (Stock)
- In Stock: `text-xs font-medium text-fresh-green`
- Out of Stock: `text-xs font-medium text-red-500`

#### ☐ Pill Tag
- `text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full`

#### ☐ Section Divider (dashed)
- `border-b border-dashed border-gray-200`

#### ☐ Toast Notification
- `text-fresh-green text-sm font-medium` with `slideUp` animation class
- Auto-dismisses after 2 seconds

---

### 2.10 Complete Figma Rebuild Checklist

Use this as your master checklist when rebuilding in Figma:

```
FOUNDATIONS
  ☐ Color styles (all 7 brand tokens + gray scale + semantic reds)
  ☐ Gradient styles (Main gradient, Slider gradient)
  ☐ Typography styles (9 sizes × applicable weights)
  ☐ Shadow styles (Card, Popup, Medium, Small, Primary glow)
  ☐ Border radius tokens (full, 2xl, xl, lg)
  ☐ Spacing grid (4px base unit, 8px standard)
  ☐ Icon library (12 stroke icons, 20/18/16/24px)

ATOMS
  ☐ Close button (modal)
  ☐ Ghost button
  ☐ Primary action button (+ disabled state)
  ☐ Navy button
  ☐ Green button (Signup, Done)
  ☐ Text input (soft-gray bg)
  ☐ Form input (bordered)
  ☐ Scribble textarea
  ☐ Filter pill (selected / unselected)
  ☐ Status badge (in-stock / out-of-stock)
  ☐ Pill tag (brand name)
  ☐ Chevron icon (open / closed)
  ☐ Online status dot
  ☐ Avatar with gradient ring
  ☐ Toast notification
  ☐ Dashed divider line

MOLECULES
  ☐ Search bar (icon + input)
  ☐ Section card (primary left border + title + textarea)
  ☐ Treatment item row (text + remove button)
  ☐ Medicine list item (name + stock + brand tag)
  ☐ Patient queue item (MR no + name, selected/default)
  ☐ Sidebar menu item (icon + label, expanded/collapsed, active/default)
  ☐ Add Section dropdown item (with branch lines)
  ☐ Frequency dot group (3 toggleable dots + connectors)
  ☐ Meal timing toggle (pill switch)
  ☐ Days slider (track + thumb + tooltip + tick marks)
  ☐ Calendar day cell (default / today)
  ☐ Agenda timeline item (time + dot + card)
  ☐ Error alert banner
  ☐ Prescription counter badge

ORGANISMS
  ☐ Sidebar (expanded variant)
  ☐ Sidebar (collapsed variant)
  ☐ Right Panel (medicine suggestions)
  ☐ Patient details card
  ☐ Prescription form (sections stack)
  ☐ Bottom action bar

MODALS / OVERLAYS
  ☐ Medicine Popup (2-column: days + frequency/timing)
  ☐ Preview Modal (scrollable prescription preview)
  ☐ Schedule Modal (calendar + agenda split view)

PAGES
  ☐ Login page
  ☐ Signup page
  ☐ Dashboard (full 3-column layout, sidebar expanded)
  ☐ Dashboard (sidebar collapsed variant)
```
