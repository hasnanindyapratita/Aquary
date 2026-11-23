# AQUARY

**A little sip, a healthier you.**  
A responsive Indonesian-language hydration tracker, virtual baby penguin companion, and urinary/kidney health learning platform.

## Deploy sebagai website

Build statis, bisa di-host gratis di Netlify, Vercel, Cloudflare Pages, atau GitHub Pages.

- **Netlify / Vercel:** upload folder ini ke GitHub lalu import repo-nya. Build command `npm run build`, output `dist`. File `netlify.toml`, `vercel.json`, dan `public/_redirects` sudah mengatur SPA fallback supaya `/daftar`, `/masuk`, dll. tidak 404 saat di-refresh.
- **Cloudflare Pages:** build command `npm run build`, output directory `dist`.
- **Hosting biasa:** jalankan `npm run build`, upload isi folder `dist`, arahkan semua route ke `index.html`.

## Run locally

```bash
npm install
npm run dev
npm run build
npm run preview
```

Use a modern browser on `https://` or `localhost`. Registration uses the Web Crypto API for PBKDF2-SHA256 password hashing.

## Included features

- Local account registration/login using the original `auth.js` and `crypto.js` utilities. Passwords are not stored in plain text.
- Guided onboarding for personal profile, hydration assessment, medical conditions, prescribed fluid target, and penguin naming.
- Eligibility-aware initial hydration estimate of 30–35 mL/kg/day for eligible healthy adults. Prescribed targets take priority. No arbitrary exercise/heat increments are invented.
- Water, tea, milk, and other beverage logs, quick-entry amounts, custom volume, history, and undo.
- Adaptive reminder calculation based on remaining target, wake/sleep schedule, and recent intake. Browser notifications can run only while the app/browser session is active and permission is granted.
- Penguin companion, editable name, mood, XP, levels, coins, accessories, and streak mechanics.
- Optional urine-color and urinary-symptom records, historical records, and red-flag guidance.
- Learning center with urinary anatomy, kidney cross-section, nephron sequence, educational modules, quizzes, myth-vs-fact cards, daily facts, glossary, bookmarks, and source bibliography.
- Weekly/monthly statistics, local JSON export, and account data deletion.
- Responsive desktop sidebar and mobile bottom navigation.

## Data and privacy

This is a local prototype. Profile, hydration, reminder, pet, and optional health-monitoring data are stored in the current browser/device using localStorage. This is not secure cloud synchronization, does not sync across devices, and should not be used as a clinical record. Do not enter information you do not want stored in this browser profile.

Authentication uses the supplied PBKDF2 password hashing logic. It does not make the rest of localStorage encrypted. A production service should use a secure backend, managed authentication, encrypted transport/storage, access controls, backups, and a privacy/security review.

## Known prototype limitations

- Browser reminders are not guaranteed after the tab/browser is closed. True background push requires a service worker plus server-side push infrastructure.
- Data is device/browser-specific. Multi-device sync, account recovery, and server-side backup require a backend.
- The anatomy diagrams are original simplified educational schematics, not diagnostic or surgical references. The nephron diagram is schematic and not to scale.
- Education content is general information and is not a substitute for professional medical advice.
- The application does not diagnose dehydration, UTI, kidney disease, or other conditions.
- Reminder notifications require browser permission and an active browser session.
- No third-party analytics or external health-data service is integrated.

## Preserved source foundations

The supplied schemas, defaults, eligibility rules, onboarding definitions, storage utilities, authentication functions, cryptography, time helpers, hooks, data options, and accessory definitions are retained. `App.jsx` and `AuthContext.jsx` are implemented as the application layer; additional components and education data are modularized under `src/components` and `src/data`.

## Verification performed

- JavaScript/JSX syntax transpilation scan: passed for all source files.
- Source URLs in the bibliography: opened and checked against NIDDK, MedlinePlus, and National Kidney Foundation pages.
- Full `npm install` and Vite production build: not completed in this environment because the npm registry request timed out and dependencies were not cached. Run `npm install` in Replit before the first build.


## AQUARY visual update

- Replaced the hand-drawn placeholder penguin with a consistent illustrated mascot in thirsty, in-progress, and happy expressions across the app.
- The companion's expression is derived from today's hydration log and target: no intake yet = thirsty, partial progress = neutral, target reached = happy. If no target has been set, the companion remains neutral.
- Added a larger dress-up collection. Every accessory can be previewed for free; coins are charged only when the user selects Buy.
- Refreshed the interface with a soft blue water-inspired background, translucent cards, bubbles, and consistent rounded styling.
- App navigation and key setup/shop choices use English. Learning-center educational content remains in Indonesian.
