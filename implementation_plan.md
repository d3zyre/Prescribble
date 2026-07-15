# Prescribble → Figma — Complete Recreation Guide

## How to Use This

### Step 1: Take Screenshots (CRITICAL)
Run the app (`npm run dev`), open in an iPad-sized browser (1366×1024), and screenshot each screen:

1. **Login** — just open `/login`
2. **Signup** — click "Sign up" link
3. **Dashboard** — log in, you'll see the 3-column layout
4. **Dashboard (sidebar collapsed)** — click the doctor profile to collapse
5. **Medicine Popup** — click any medicine from the right panel
6. **Preview Modal** — click "Preview →" button
7. **Complete Screen** — click "Complete" inside preview
8. **Schedule Modal** — click "Schedules" in sidebar
9. **Prescription History** — click the "Prescriptions 2" badge on patient card

### Step 2: Use Figma Make
For each screen, paste the matching prompt below into Figma Make and attach the screenshot as reference. Do ONE screen per prompt.

---

## Global Design Tokens (reference for all screens)

For Reference (use if required)

```
COLORS:
  Navy (sidebar bg):        #0B1F33
  Navy Light (hover):       #132D47
  Primary Blue:             #1A73E8
  Primary Dark (hover):     #1557B0
  Fresh Green:              #34C38F
  Gradient End (mint):      #BDFFE6
  Warm Teal:                #0D9488
  White:                    #FFFFFF
  Gray 50 (lightest bg):    #F9FAFB
  Gray 100 (borders):       #F3F4F6
  Gray 200 (soft gray):     #E5E7EB
  Gray 300:                 #D1D5DB
  Gray 400 (muted text):    #9CA3AF
  Gray 500 (body text):     #6B7280
  Gray 600:                 #4B5563
  Gray 700 (dark body):     #374151
  Gray 800 (headings):      #1F2937
  Red 400 (errors):         #F87171
  Red 500:                  #EF4444

FONT: Inter (Google Font)
  Sizes: 10px, 11px, 12px, 13px, 14px, 15px, 16px, 18px, 20px, 22px
  Weights: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

RADII:
  Small:      8px  (rounded-lg)
  Medium:     12px (rounded-xl)
  Large:      16px (rounded-2xl)
  Full/Pill:  9999px (rounded-full)

SHADOWS:
  Card:  0 1px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)
  Popup: 0 8px 32px rgba(0,0,0,0.18)
  Soft:  0 1px 4px rgba(0,0,0,0.05)

CANVAS SIZE: 1366 × 1024 (iPad Pro landscape)
```

---

## SCREEN 1: Login Page

**Prompt for Figma Make:**

> Design an iPad login screen (1366×1024) for a medical app called "Prescribble".
>
> **Background:** Full-screen gradient at 160° angle — starts #0B1F33 (dark navy, top-left), transitions through #1A73E8 (blue, center), ends at #BDFFE6 (mint, bottom-right). Over the gradient, there is a very subtle white overlay at 5% opacity with 1px blur.
>
> **Card (centered):** White card at 95% opacity with backdrop blur. Width 420px, rounded corners 16px, shadow "0 8px 32px rgba(0,0,0,0.18)", padding 40px.
>
> **Inside the card, top to bottom:**
> 1. Logo area: The Prescribble logo icon (a small pen/prescription icon) centered, height 36px. Below it 20px gap.
> 2. Title: "Welcome Back" — Inter 22px Bold, color #1F2937, centered. Below it 6px gap.
> 3. Subtitle: "Sign in to continue prescribing" — Inter 14px Regular, color #9CA3AF, centered. Below it 32px gap.
> 4. Email label: "Email Address" — Inter 14px Medium, color #4B5563. Below it 6px gap.
> 5. Email input: Full width, height 48px, rounded 12px, 1px border #E5E7EB, padding-left 16px, placeholder "doctor@example.com" in #9CA3AF, 14px Regular.
> 6. Gap 20px.
> 7. Password label: "Password" — Inter 14px Medium, color #4B5563. Below it 6px gap.
> 8. Password input: Same style as email, placeholder "••••••••".
> 9. Gap 8px.
> 10. Button: "Sign In" — full width, height 48px, background #1A73E8, white text 14px SemiBold, rounded 12px, shadow medium.
> 11. Gap 28px.
> 12. Footer text: "Don't have an account? Sign up" — 14px Regular, "Don't have an account?" in #9CA3AF, "Sign up" in #1A73E8 Medium.

---

## SCREEN 2: Signup Page

**Prompt for Figma Make:**

> Design an iPad signup screen (1366×1024) for "Prescribble". Identical to the login screen except:
>
> - Title: "Create Account" (22px Bold, #1F2937)
> - Subtitle: "Get started with Prescribble" (14px Regular, #9CA3AF)
> - Three input fields: "Full Name" (placeholder "Dr. John Doe"), "Email Address" (placeholder "doctor@example.com"), "Password" (placeholder "••••••••")
> - Button: "Create Account" — background #34C38F (green) instead of blue, white text 14px SemiBold
> - Footer: "Already have an account? Sign in" — "Sign in" in #1A73E8

---

## SCREEN 3: Dashboard (Main Screen — the most complex)

**Prompt for Figma Make:**

> Design the main dashboard screen of a medical prescription iPad app (1366×1024). This is a 3-column layout that fills the entire screen height with no scrollbar visible on the body.
>
> **COLUMN 1 — Left Sidebar (width: 220px, full height)**
> Dark navy background (#0B1F33). Contents from top to bottom:
>
> - Logo area (padding top 20px, left 20px): Small prescription icon (white, 24px) + "Prescribble" text (Inter 17px SemiBold white, letter-spacing wide). 
> - Below: Subtle horizontal divider line (1px, white at 10% opacity).
> - Doctor profile section (padding 16px horizontal, 12px vertical): 
>   - Left: 40px circle avatar with gradient border (top #1A73E8 to bottom #BDFFE6, 2px border), inside the circle a navy background with a generic user silhouette icon (gray #E5E7EB). Small 12px green (#34C38F) online dot at bottom-right of avatar with 2px navy border.
>   - Right of avatar: "DERMATOLOGIST" (10px Medium, #9CA3AF, uppercase, letter-spacing wide) on line 1, "Dr. Esther N." (14px SemiBold, white) on line 2.
> - Below: Another subtle divider.
> - Menu items (vertical list):
>   - "Schedules" — calendar icon (20px, gray #9CA3AF) + text (14px, #9CA3AF). Clickable.
>   - "Patient Queue" — users icon (20px, gray) + text (14px). When expanded shows a list below:
>     - Each patient: "Token T-001" (10px, #6B7280) on top, "Alok Rajak, 22M" (12px, #D1D5DB) below. Selected patient has bg #1A73E8 at 20% opacity with 1px border #1A73E8 at 40%, and the name text turns #1A73E8 Medium.
>     - 6 patients total: Alok Rajak 22M, Priya Sharma 30F, Rahul Verma 37M, Sneha Patel 25F, Vikram Singh 33M, Aarushi Desai 29F
>   - "Add Section +" — plus-circle icon. When expanded shows: Tests, Advice, Follow-Up, Referral as sub-items.
> - Bottom (auto-pushed to bottom): Divider, then "Settings" (14px, #9CA3AF, gear icon) and "Logout" (14px, #F87171 at 80% opacity, logout icon).
>
> **COLUMN 2 — Middle Content Area (flex-1, fills remaining width minus sidebar and right panel)**
> Background: Vertical gradient from #1A73E8 (top) through #4A9CED (40%) to #BDFFE6 (bottom).
> Padding: 24px horizontal, 20px top.
>
> Contents (top to bottom):
>
> - **Patient Details Card** (white, rounded 16px, shadow card, padding 20px, margin-bottom 16px):
>   - Left side:
>     - "Patient Details" heading (15px Bold, #1F2937, margin-bottom 10px)
>     - Three rows of info:
>       - "Name · Alok Rajak" — "Name" in 14px #9CA3AF, dot separator "·" in #D1D5DB, name in 14px Medium #374151
>       - "DOB · 22.05.2004 (22 yrs)" — same style
>       - "Gender · Male" — same style
>   - Right side (right-aligned):
>     - "Prescriptions" badge: Pill shape (rounded-full), #0B1F33 background, white text 14px, with a small blue (#1A73E8) circle badge showing "2" (11px SemiBold white).
>     - Below: "MR No. #2378456" (12px Medium, #9CA3AF)
>
> - **Prescription Form Card** (white, rounded-top 16px, shadow card, padding 20px, border 1px #F3F4F6 at 80%, flex-grows to fill remaining height):
>   - Sections with 14px vertical spacing between them:
>     - **Symptoms section**: Has a 4px left border in #1A73E8, rounded 12px, background #E5E7EB at 25% opacity, padding 16px. Title "Symptoms" (13px Bold, #1F2937, margin-bottom 8px). Below: text area showing "Yellow spots on right toe nail, Brittle toenail" (14px, #374151).
>     - **Diagnosis section**: Same card style. Title "Diagnosis". Content: "Nail Fungus (Onychomycosis)".
>     - **Treatment section**: Same card style. Title "Treatment". Below title: empty text area with placeholder "Write with Apple Pencil... (type medicine name to filter suggestions)" (14px, light gray placeholder).
>   - **Bottom action bar** (pushed to bottom with auto-margin, padding-top 20px, top border 1px #F3F4F6):
>     - Left: "Save Draft" button — #0B1F33 background, white text 14px Medium, padding 10px 24px, rounded 12px.
>     - Right: "Preview →" button — #1A73E8 background, white text 14px Medium, padding 10px 24px, rounded 12px, with a right arrow icon (14px, white, stroke).
>
> **COLUMN 3 — Right Panel (width: 280px, full height)**
> White background, left border 1px #F3F4F6.
>
> - Header: "Medicine Suggestions" (13px Bold, #1F2937). Padding 16px top+horizontal.
> - Search bar: Gray background (#F9FAFB), 1px border #F3F4F6, rounded 12px, padding 8px 12px. Search magnifying glass icon (16px, #9CA3AF) on left, placeholder "Search medicines..." (14px, #9CA3AF). Clear "✕" button on right when text entered.
> - Filter row: "Filter" text (11px, #9CA3AF) with a filter icon on the right side.
> - Medicine list (scrollable): Each item is a full-width button:
>   - Medicine name (13px, #1F2937) + dot separator + brand name (12px Medium, #6B7280)
>   - Below: stock dot (6px circle, green #34C38F if in stock, red #F87171 if out) + stock text (11px Medium, matching color) on left. Brand badge (10px, #9CA3AF, bg #F9FAFB, 1px border #F3F4F6, pill shape) on right.
>   - Divider: 1px #F9FAFB between items
>   - Show at least 8 medicines: Itraconazole 100mg Cap · Cerospor, Fluconazole 150mg Tab · Forcan, Terbinafine 250mg Tab · Terbicip, Ketoconazole 200mg Tab · Funzela, Griseofulvin 500mg Tab · Grisovin, Clotrimazole 1% Cream · Candid, Mupirocin 2% Oint · T-Bact, Cephalexin 500mg Cap · Keflex

---

## SCREEN 4: Medicine Dosage Popup

**Prompt for Figma Make:**

> Design a modal popup overlay (1366×1024 canvas) for configuring medicine dosage in a prescription app. The popup appears centered over a dimmed background (black at 40% opacity).
>
> **Modal card**: White, rounded 16px, shadow "0 8px 32px rgba(0,0,0,0.18)", max-width 560px.
>
> **Header** (padding 24px horizontal, 20px top, 12px bottom):
> - Left: "Paracetamol 500mg Tab" (16px SemiBold, #1F2937). Below: "Dolo · 500mg" (12px, #6B7280).
> - Right: Close "×" button (20px, #9CA3AF, 32px circle, hover shows #F3F4F6 bg).
>
> **Content — Two columns** divided by a 1px vertical line (#F3F4F6):
>
> - **Left column** (flex-1, padding 24px):
>   - Floating tooltip/badge above the slider showing selected value "7" — blue (#1A73E8) rounded rectangle (12px radius), white text 14px SemiBold, with a small downward-pointing blue triangle below it.
>   - Native-style range slider: 3px track, left portion filled #1A73E8, right portion #E5E7EB. Thumb: 16px white circle with 3px #1A73E8 border and subtle shadow.
>   - Below slider: Tick marks and labels for each step: 1, 2, 3, 5, 7, 10, 14, 21, 28, 30, 60. Labels are 10px. Selected and past labels are #1A73E8, future labels are #9CA3AF. Selected label is SemiBold.
>   - "No. of Days" label centered (14px Medium, #4B5563).
>   - "Other" text input: full width, #E5E7EB background, rounded 12px, padding 10px 16px, placeholder "Other" (14px, #9CA3AF).
>
> - **Right column** (flex-1, padding 24px):
>   - "Frequency" label (12px Medium, #6B7280). Below (margin 12px):
>   - Three frequency dots connected by lines: "Morning" — "Afternoon" — "Night". Each has a 20px circle (unselected: white with 2px #D1D5DB border; selected: filled #1A73E8 with #1A73E8 border). Connected by 32px horizontal lines (2px thick, #E5E7EB when unconnected, #1A73E8 when both adjacent dots are selected). Labels below each dot (9px, #6B7280).
>   - Gap 24px.
>   - "Meal Timing" label (12px Medium, #6B7280). Below (margin 8px):
>   - Three stacked pill buttons, full width, 6px gap:
>     - "Empty Stomach" — when unselected: #F3F4F6 bg, #6B7280 text 14px Medium, rounded-full
>     - "Before Meal" — same style
>     - "After Meal" — same style
>     - Selected state: #1A73E8 bg, white text
>
> **Footer** (padding 16px 24px, top border 1px #F3F4F6):
> - "Cancel" button: text only, 14px, #6B7280, padding 8px 20px.
> - "Add to Treatment" button: #1A73E8 bg (or #F3F4F6 bg with #9CA3AF text when disabled), white text 14px Medium, rounded 12px, padding 8px 20px.

---

## SCREEN 5: Prescription Preview Modal

**Prompt for Figma Make:**

> Design a modal overlay (1366×1024) showing a prescription preview. Dimmed background (black 40% opacity).
>
> **Modal**: White, rounded 16px, shadow popup, max-width 600px, max-height 85vh, scrollable.
>
> **Header** (padding 32px horizontal, 24px top, 16px bottom, bottom border 1px #F3F4F6):
> - "Prescription Preview" (18px Bold, #1F2937) on left
> - Close "×" button (20px, #9CA3AF, 32px circle) on right
>
> **Content** (padding 32px horizontal, 24px vertical, 20px spacing between sections):
>
> - Doctor info (centered, padding-bottom 16px, dashed border-bottom 1px #E5E7EB):
>   - "DERMATOLOGIST" (12px, #9CA3AF, uppercase, letter-spacing wide)
>   - "Dr. Esther N." (16px Bold, #1F2937)
>
> - Patient info card (#E5E7EB at 50% opacity bg, rounded 12px, padding 16px):
>   - 2-column grid, 8px gap:
>     - "Name:" (#6B7280) + "Alok Rajak" (Medium, #1F2937) — 14px
>     - "MR No:" + "#2378456"
>     - "DOB:" + "22.05.2004 (22 yrs)"
>     - "Gender:" + "Male"
>
> - Section "Symptoms": Title (14px Bold, #1A73E8), content "Yellow spots on right toe nail, Brittle toenail" (14px, #374151)
> - Section "Diagnosis": Same title style, content "Nail Fungus (Onychomycosis)"
> - Section "Treatment": Title (14px Bold, #1A73E8). Content shows "-" if no treatments added.
>
> - Digital Signature section (padding-top 24px, dashed border-top):
>   - "Digital Signature" (14px Bold, #1A73E8)
>   - "Digitally signed by" (12px, #6B7280)
>   - A handwritten signature image (height ~96px)
>   - Dashed line (width 224px, 1px dashed #D1D5DB)
>   - "Dr. Esther N., Dermatologist" (11px, #6B7280)
>
> **Footer** (padding 16px 32px, top border 1px #F3F4F6):
> - "Close" (14px, #6B7280, padding 8px 20px)
> - "Complete" button (#1A73E8 bg, white text 14px Medium, rounded 12px)

---

## SCREEN 6: Schedule Modal (OPD Slots)

**Prompt for Figma Make:**

> Design a modal overlay (1366×1024) showing a doctor's daily OPD schedule. Dimmed background.
>
> **Modal**: White, rounded 16px, shadow popup, max-width 700px, split into left + right.
>
> **Left Panel (width 320px, bg #F9FAFB, right border 1px #F3F4F6, padding 24px)**:
> - Apple-style calendar:
>   - Header: "June 2026" (20px Bold, #1F2937) + left/right chevron arrows (16px, #9CA3AF, 28px circle buttons)
>   - Day headers: S M T W T F S (11px SemiBold, #9CA3AF, uppercase)
>   - Day grid (7 columns): Numbers 1-30. Each day is 32px circle.
>     - Today (16): #1A73E8 bg, white text, shadow (medium, #1A73E8 at 30%)
>     - Other days: #374151 text, hover #E5E7EB bg
>   - Font: 14px Medium for day numbers
>
> **Right Panel (flex-1, bg white, height 400px, scrollable)**:
> - Header (padding 24px horizontal, 24px top, 16px bottom, bottom border 1px #F3F4F6):
>   - "Today's OPD" (18px Bold, #1F2937)
>   - "Today, June 16" (12px Medium, #6B7280)
>   - Close "×" button top-right
>
> - Two OPD slot cards in scrollable area (padding 24px horizontal, 16px vertical):
>
>   **Morning Slot Card** (rounded 12px, border 1px #F3F4F6, padding 16px, 4px left border #1A73E8):
>   - "Morning OPD" (14px Bold, #1F2937) + "9:00 AM – 12:00 PM" (12px, #6B7280)
>   - Progress bar: full width, 4px height, rounded, #E5E7EB bg, #1A73E8 fill at 80%. "12 / 15" text (12px SemiBold, #1A73E8) on right.
>   - Patient list (scrollable, max-height ~200px):
>     - Each row: Token badge "T-001" (10px Bold, #F3F4F6 bg, 4px radius) + "Rahul Verma" (14px Medium, #1F2937) + "Scalp Psoriasis" (12px, #6B7280, truncated) + status dot
>     - Status dots (8px circle): Green #34C38F = seen (row dimmed 60% opacity), Animated blue #1A73E8 = current (row has #1A73E8 bg at 5%, 3px left border #1A73E8), Gray #D1D5DB = waiting
>     - First 2 patients marked "seen", 3rd is "current", rest are "waiting"
>
>   **Evening Slot Card** (same layout, but 4px left border is #0D9488 teal):
>   - "Evening OPD" + "6:00 PM – 9:00 PM"
>   - "8 / 15" patients. All 8 marked "waiting".

---

## SCREEN 7: Prescription History Modal

**Prompt for Figma Make:**

> Design a modal overlay (1366×1024) showing a patient's past prescription records. Dimmed background.
>
> **Modal**: White, rounded 16px, shadow popup, max-width 720px, max-height 85vh, split left+right.
>
> **Left Panel (width 240px, bg #F9FAFB, right border 1px #F3F4F6)**:
> - Header (padding 20px horizontal, 20px top, 12px bottom, bottom border 1px #F3F4F6):
>   - "Past Prescriptions" (14px Bold, #1F2937)
>   - "Alok Rajak" (12px, #6B7280)
> - List of past prescriptions (scrollable):
>   - Item 1 (selected): bg #1A73E8 at 10% opacity, 3px left border #1A73E8, padding 12px 20px
>     - "15.03.2026" (12px SemiBold, #1F2937)
>     - "Dr. Rajesh Kumar" (12px, #6B7280)
>     - "Apollo Hospital, Mumbai" (11px, #9CA3AF, truncated)
>   - Item 2 (unselected): transparent bg, padding 12px 20px
>     - "02.04.2026" (12px Medium, #374151)
>     - "Dr. Rajesh Kumar" (12px, #6B7280)
>     - "Apollo Hospital, Mumbai" (11px, #9CA3AF)
>
> **Right Panel (flex-1, scrollable, padding 24px)**:
> - Close "×" button top-right corner (20px, #9CA3AF, 32px circle)
> - Doctor info card (bg #F9FAFB, rounded 12px, padding 12px 16px):
>   - "Dr. Rajesh Kumar" (14px SemiBold, #1F2937)
>   - "Apollo Hospital, Mumbai · Dermatology" (12px, #6B7280)
>   - "15.03.2026" (11px, #9CA3AF)
> - Sections with 16px spacing:
>   - "Symptoms" (14px Bold, #1A73E8) + content in 14px #374151
>   - "Diagnosis" + content
>   - "Treatment" — each medicine in a card (bg #E5E7EB at 50%, rounded 12px, padding 12px):
>     - "Itraconazole 100mg Cap (Cerospor)" (14px Medium, #1F2937)
>     - "14 days · Morning/Night · After Meal" (12px, #6B7280)
>   - "Tests" + content
>   - "Advice" + content
>   - "Follow-Up" + content

---

## SCREEN 8: Complete Screen (Share/Print)

**Prompt for Figma Make:**

> Design a full-screen overlay (1366×1024) for the "Prescription Complete" share screen. Two-column layout.
>
> **Background**: #F9FAFB (light gray)
>
> **Left Panel (~55% width, white bg, border-right 1px #F3F4F6, scrollable, padding 32px)**:
> - This is the prescription preview (same content as Preview Modal):
>   - Doctor info centered (specialty + name)
>   - Patient info card (light bg, rounded, 2-column grid)
>   - Sections: Symptoms, Diagnosis, Treatment
>   - Digital signature at bottom
>   - Style it like a paper document — white background with subtle shadow
>
> **Right Panel (~45% width, centered content vertically, padding 40px)**:
> - Success icon: 64px circle, bg #34C38F, white checkmark stroke inside (3px stroke)
> - "Prescription Complete" (22px Bold, #1F2937)
> - "for Alok Rajak" (14px, #6B7280)
> - Date/time: "16 Jun 2026 · 7:02 PM" (12px, #9CA3AF)
> - Gap 32px
> - 5 share action buttons (vertical stack, 12px gap between):
>   Each button: full width, rounded 12px, padding 14px 16px, border 1px #F3F4F6, bg white, flex row with:
>   - Icon (20px, #374151 or themed color) on left
>   - Label (14px SemiBold, #1F2937) + subtitle (12px, #6B7280) in the middle
>   - Buttons:
>     1. Printer icon + "Print Prescription" / "Send to printer"
>     2. Phone icon + "Send via SMS" / "+91 98765 43210"
>     3. Chat bubble icon + "Send via WhatsApp" / "Open WhatsApp"
>     4. Download icon + "Download as PDF" / "Save to device"
>     5. Envelope icon + "Send via Email" / "Email prescription"
> - Gap 24px
> - "Back to Dashboard" button: full width, bg #0B1F33 (navy), white text 14px Medium, padding 12px, rounded 12px

---

## SCREEN 9: Sidebar Collapsed State

**Prompt for Figma Make:**

> Design the same dashboard as Screen 3, but with the sidebar COLLAPSED to 68px width.
>
> The collapsed sidebar shows only icons (no text labels):
> - Prescribble logo icon only (no text), centered, 24px
> - Doctor avatar circle (40px) centered, with green online dot
> - Calendar icon (schedules), centered
> - Users icon (patient queue), centered
> - Plus-circle icon (add section), centered
> - Bottom: Gear icon (settings), Logout icon (red)
> - All icons are 20px, color #9CA3AF
>
> The middle content area becomes wider since the sidebar is narrower. Everything else stays the same.

---

## Tips for Best Results

1. **Do ONE screen per Figma Make prompt** — don't try all at once
2. **Always attach the screenshot** — the prompt gives exact specs, the screenshot gives visual reference. Together they produce the best result.
3. **Start with Screen 3 (Dashboard)** — it's the most complex and the hero screen
4. **After generation, manually check:**
   - The gradient colors on the middle area
   - The 4px blue left borders on section cards
   - The navy sidebar color (#0B1F33)
   - The Inter font is applied
5. **For the icons** — Figma Make may not get icons perfect. After generation, replace them with icons from the Lucide or Feather icon set (that's what the app uses).
6. **Group your layers** — after each screen is generated, organize layers into component groups matching the code structure (Sidebar, ContentArea, RightPanel, etc.)
