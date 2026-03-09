# Countdowns — Event Countdown Collection

A beautiful, real-time countdown app built for the Frontend Developer evaluation.

**Live Demo:** [https://event-countdown-timer-app.vercel.app]
**Time spent:** ~22 hours (spread over 3 days)

## What I Built & Why

I chose **Option B (Event Countdown Collection)** because it let me focus on creative time visualization, smooth interactions, and delightful details — exactly what the brief asked for.

Key features implemented:
- Add / Edit / Delete multiple events
- Real-time ticking countdowns (updates every second)
- Smart urgency colors + circular progress rings (red <7 days, orange <30 days, green otherwise)
- Beautiful expired state with one-click delete
- Custom confirmation modal (no ugly browser alerts)
- Dark/light mode toggle with system preference + persistence
- Fully responsive (mobile-first with floating action button)
- All data persists via localStorage
- Clean, accessible, and premium-feeling UI matching the Google Stitch reference

## Design & UX Choices

- **Visual hierarchy** — Big countdown numbers + progress ring + urgency border make it instantly clear what matters most.
- **Small delights** — Smooth theme toggle, hover scales, line-through on expired events, info hint in modal.
- **Thoughtful interactions** — Modal re-uses for create/edit, real-time preview of urgency color, confirmation before delete.
- **Accessibility** — Proper labels, keyboard-friendly, high contrast in both themes.

I intentionally kept it simple yet polished — no unnecessary features.

## What I’d Improve With More Time

- Push notifications for events <24h away
- Drag-to-reorder events
- Export/import via JSON
- Multiple themes or color customisation
- Unit tests for the countdown hook

## Challenges Faced

- Getting real-time countdowns to stay perfectly in sync across cards (solved with a single shared interval in the hook).
- Making Tailwind v4 + @theme work smoothly with VS Code IntelliSense (fixed with custom data).
- Calculating accurate progress percentage while keeping the circular SVG clean.

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- Google Material Symbols
- localStorage + custom hooks

## How to Run Locally

```bash
git clone <your-repo>
cd event-countdown
npm install
npm run dev
