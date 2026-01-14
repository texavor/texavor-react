# Product Showcase Video Guide: "The EasyWrite Authority Engine"

This guide outlines how to create a high-impact product trailer similar to modern SaaS showcases. Since you are on Windows, we will focus on tools and workflows compatible with your OS.

## 1. Effect & Style Goal

You want a "Feature Teaser" style:

- **Fast Paced**: Quick cuts between features.
- **Smooth Zooms**: The camera pans and zooms into specific buttons or UI elements smoothly.
- **No "Talking Head"**: Focus entirely on the UI and the value.
- **Beat-Synced**: Transitions happen on the beat of the background music.

## 2. Recommended Tools (Windows)

| Category               | Tool                       | Why?                                                                                                                                |
| :--------------------- | :------------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| **Recording**          | **OBS Studio** (Free)      | Best for capturing high-quality (1080p/4K) raw footage without lag.                                                                 |
| **Simple Recording**   | **Screenity** (Chrome Ext) | Good for quick browser captures if OBS is too complex.                                                                              |
| **Editing & Zooms**    | **CapCut PC** (Free/Pro)   | Extremely easy to add "Smooth Zoom" effects, auto-captions, and beat-syncing. Highly recommended for this specific "trailer" style. |
| **Alternative Editor** | **DaVinci Resolve**        | Professional grade, steep learning curve but powerful.                                                                              |

## 3. Pre-Recording Checklist (The "Stage Setup")

Before you record a single frame, your app must look populated and "lived in".

- [ ] **Browser**: Use a clean profile (no bookmarks bar, no extensions visible). Press `F11` for full screen or maximize strictly to 1920x1080.
- [ ] **Data Population**:
  - **Dashboard**: Ensure charts show growth (green upward trends).
  - **Articles**: Have 3-5 articles in different states (Draft, Scheduled, Published).
  - **Integrations**: Have at least 2 platforms showing "Connected" (green badges).
- [ ] **Theme**: Ensure consistent light/dark mode (Light mode often looks cleaner for marketing unless your dark mode is the main selling point).

## 4. The Script & Storyboard (60 Seconds)

**Theme**: "From Chaos to Orchestration"

| Time          | Visual Action (Screen)                                                                                                                                        | Text Overlay / Voiceover Concept                         |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------- |
| **0:00-0:05** | **Dashbaord**: Fast montage of the messy "old way" (optional) OR straight to EasyWrite Dashboard. Zoom into the "Total Articles" and "Growth" charts.         | "Stop juggling tabs. Start commanding content."          |
| **0:05-0:15** | **Feature: Topic Gen**: Click "Generate Topics". Show the list appearing instantly. Zoom in on a "High Difficulty" score turning green.                       | "Strategic Keyword Intelligence built-in."               |
| **0:15-0:30** | **Feature: Writing**: Show the Editor. Type a headline. Show AI auto-completing a section. Rapid cut to the "Thumbnail Generation" tab and selecting a style. | "Write faster. Design instantly. optimized for E-E-A-T." |
| **0:30-0:45** | **Feature: Orchestration**: Go to "Publish". Toggle "Medium" and "Dev.to". Click "Publish Now". Zoom in on the success toast/confetti.                        | "One click. Everywhere. Perfect formatting guaranteed."  |
| **0:45-0:60** | **Feature: Analytics**: Show the "Competitor Analysis" cards. Zoom into "Outperforming" badge. Fade to Logo + URL.                                            | "EasyWrite. The Complete Authority Engine."              |

## 5. Step-by-Step "How-To" for the Zoom Effect

The "Motion" you see in trailers is usually done in **Post-Production**, not during recording.

1.  **Record Static**: Record the entire flow in OBS. Do not zoom with your browser. Keep the mouse movements smooth and deliberate. Pausing for a second on key buttons.
2.  **Import to Editor (CapCut)**:
    - Place your clip on the timeline.
    - **Keyframing**: Go to the start of the action (e.g., clicking "Publish"). Set a keyframe for `Scale` and `Position`.
    - Move forward 0.5 seconds. Increase `Scale` (e.g., 100% -> 130%) and adjust `Position` to center the button.
    - **Easing**: Right-click the keyframe graph and select "Ease In/Out" to make the movement smooth, not robotic.
3.  **Speed Ramps**: Accelerate the boring parts (typing, loading) to 2x or 4x speed. Slow down (0.8x) the "Climax" moments (like the Success message appearing).

## 6. Pro Tips (The "Backend" Angle)

Since you asked to showcase the **Backend/Features**:

- **Show Speed**: The backend's power is speed. Cut out any loading times.
- **Show Complexity made Simple**: Show a complex JSON response or terminal output (briefly) fading into the beautiful UI card that represents it. This visually says "We handle the hard stuff".
- **Terminal Cameo**: Briefly flash your Rails terminal running a job successfully (green text) overlaid on the UI actions to prove it's real code working.

## 7. Next Steps for You

1.  **Populate your local DB**: Ensure `Features.tsx` and the Dashboard look full.
2.  **Record**: distinct clips for each feature (Dashboard, Editor, Publish).
3.  **Edit**: Stitch them together in CapCut with a driving, corporate-upbeat track.

## 8. Music Recommendations (Copyright Free)

For a "Corporate Upbeat" or "Fast Tech" feel, here are specific recommendations. **Always check the license** (some require attribution in the YouTube description).

### Best Sources

- **YouTube Audio Library** (Free, inside YouTube Studio)
- **InAudio.org** (Great "Modern Electronic" section)
- **Pixabay Music** (Filter by "Corporate" + "Upbeat")

### Specific Track Vibes (Search These Terms)

1.  **"Minimal Tech Corporate"**: Perfect for smooth, professional showcases.
    - _Try:_ "Minimal Technology Corporate" by Alexi Action
    - _Try:_ "Upbeat Stylish Technology" by MokkaMusic
2.  **"Future Bass Upbeat"**: Good if you want more energy/hype.
3.  **"Soft House Background"**: Good for "ease of use" emphasis.
4.  **"Abstract Glitch"**: Great for transition effects (short clips).

> **Pro Tip**: If a track is too short, loop it. If it's too long, cut it on the beat drop to match your "Climax" (Section 5 of the script).
