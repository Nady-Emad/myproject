# Nady Emad — Personal Portfolio (Digital Profile)

This repository contains the personal portfolio website for Nady Emad, a Networks & Cyber Security student. The site is a small static website (HTML, CSS, and JavaScript) that presents a personal profile, skills, certificates, projects, and contact information.

## Features
- Attractive hero section with profile image and subtle animations.
- Certificates carousel (marquee-like layout) to showcase qualifications.
- Dark mode support with user preference saved to localStorage.
- Simple counters and lazy-loaded images for better performance.
- Responsive layout that works on both mobile and desktop devices.

## Project Structure
- `index.html` — Main static page.
- `style.css` — All site styles.
- `app.js` — JavaScript for theme, navigation, animations, and counters.
- `profile.jpg` — Profile picture used in the hero section.
- `icon.ico` — Site favicon.
- `certificates/` — Folder containing certificate images and PDFs.
- `README.md` — This file.

## Run locally
You can open `index.html` directly in your browser, or run a simple HTTP server to serve the files (recommended for consistent behavior):

PowerShell (Windows) using Python 3:

```powershell
# Open PowerShell in the project folder
python -m http.server 8000
# Then open your browser at: http://localhost:8000
```

Alternative: If you're using VS Code, install the "Live Server" extension and click "Go Live" to preview the site.

## Notes
- Contact links prompt a confirmation before redirecting.
- Certificates are stored in the `certificates/` folder and shown as images (some entries are PDFs).
- The project has no external build steps or dependencies — it's pure static files.

## Contact
- Email: nady240102590@sut.edu.eg
- GitHub: https://github.com/Nady-Emad

---

This README is prepared to help you run and understand the project. If you'd like help publishing the site to GitHub Pages, optimizing performance, or adding a working contact form (backend), tell me which you'd prefer and I will implement it.

License: Personal / No license specified
