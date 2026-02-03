# Live Application Hero Concept

## Vision

The goal is to replace the static hero image with an interactive, high-fidelity simulation of the Texavor application. This approach mimics the premium "live SaaS" feel seen on sites like `datafa.st` and `promptmonitor.io`.

Instead of a video (which is heavy and hard to update) or a static image (which feels dead), we will use **actual React components** running in the browser, choreographed to simulate usage.

## Architecture

We will build a new component `ProductShowcase.tsx` that acts as a "mini-app" container.

### 1. The Container (`BrowserFrame`)

A sleek, modern browser window wrapper with:

- Mac-style window controls (Red/Yellow/Green dots).
- A realistic address bar showing `https://app.texavor.com/dashboard`.
- Subtle drop shadows and border gradients to pop against the hero background.

### 2. The Layout (`MockDashboardLayout`)

We will reuse the actual application layout structure to ensure 1:1 visual fidelity.

- **Sidebar**: Reuse `<SidebarVisual />`. This ensures the icons, fonts, and spacing are _exact_.
- **Main Area**: A grid layout mimicking the actual dashboard.

### 3. The Content (`LiveComponents`)

Instead of static screenshots, we render live components:

- **Chart**: Reuse `app/Chart.tsx` (or a variation of it). Recharts animates by default on load, giving a satisfying "drawing" effect.
- **Metric Cards**: New components that use `framer-motion` to count up numbers (e.g., "0" -> "45" for AI Citations).
- **Activity Feed**: A list of "Recent Articles" that staggers in one by one.

### 4. Choreography (The "Live" Feel)

We will define an animation sequence using Framer Motion:

1.  **T+0.0s**: Browser frame expands/fades in.
2.  **T+0.5s**: Sidebar elements slide in.
3.  **T+0.8s**: The Chart draws its line from left to right.
4.  **T+1.2s**: Metric cards pop in, numbers start counting up.
5.  **T+2.5s**: A "New Analysis Complete" toast notification slides in at the top right, simulating real-time activity.

## Implementation Steps

1.  **Create `components/ProductShowcase.tsx`**: The main container.
2.  **Refine `SidebarVisual.tsx`**: Ensure it accepts a `className` for easy sizing/positioning in the mock.
3.  **Adapt `Chart.tsx`**: Ensure it can fit within the hero's dimension constraints (responsive).
4.  **Compose**: Assemble the pieces in `Hero.tsx`.

## Why This Wins

- **Performance**: No 10MB GIF or video file. Just lightweight code.
- **Fidelity**: It uses the _actual_ CSS and fonts. If you update the app's theme, the hero updates automatically.
- **Wow Factor**: Users perceive it as "using" the app before they even sign up.
