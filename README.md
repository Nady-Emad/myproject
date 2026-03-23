# Nady Emad | Cybersecurity Portfolio

<div align="center">
  <strong>Premium personal portfolio and digital profile for a Networks and Cyber Security student at SUT University.</strong>
  <br>
  Dark-first UI | Responsive HTML, CSS, and JavaScript | Recruiter-friendly presentation
</div>

---

## Overview

This repository contains the current version of **Nady Emad's** personal portfolio website.
It is designed as a premium cybersecurity-themed experience that presents:

- personal branding and academic identity
- technical skills and learning areas
- security-focused projects and GitHub repositories
- certificates and badges with image preview
- achievements, contact channels, and a direct message form

The site is built as a **static front-end project** using **HTML, CSS, and vanilla JavaScript only**, making it lightweight, fast, and ready for GitHub Pages deployment.

---

## Project Identity

| Item | Details |
| --- | --- |
| Name | Nady Emad |
| Role | Networks and Cyber Security Student |
| University | SUT University |
| Portfolio Type | Personal Portfolio / Digital Profile |
| Design Direction | Modern, dark-mode, cybersecurity-themed, recruiter-friendly |
| Core Stack | HTML5, CSS3, JavaScript |

---

## Experience Highlights

| Area | What is included |
| --- | --- |
| Navigation | Sticky navbar, active section highlight, smooth scrolling, mobile full-screen menu |
| Hero | Professional identity card, recruiter-ready profile presentation, CTA buttons |
| UI Style | Dark-first palette, neon security accents, glassmorphism cards, premium spacing and typography |
| Projects | Filterable project cards, featured security work first, direct GitHub links |
| Certificates | Organized certificate and badge cards, lazy-loaded previews, lightbox modal |
| Contact | Clickable social/contact cards, copy-email action, toast feedback, contact form |
| Responsiveness | Mobile-first improvements for phones, tablets, small laptops, and desktop screens |
| Extras | Theme toggle, animated counters, back-to-top button, custom 404 page |

---

## Site Sections

The portfolio currently includes these main sections:

1. `Home`
2. `About`
3. `Skills`
4. `Certificates`
5. `Projects`
6. `Achievements`
7. `Contact`
8. `Send Me`

---

## Featured Repositories

The projects below are ordered to match the current portfolio showcase, with the strongest security-related work presented first.

| # | Repository | Focus | Link |
| --- | --- | --- | --- |
| 01 | RansomShield | Ransomware detection, threat scoring, defensive tooling | [Open GitHub](https://github.com/Nady-Emad/RansomShield) |
| 02 | CipherForge Suite | Encryption toolkit with classical ciphers and AES-256-GCM | [Open GitHub](https://github.com/Nady-Emad/CipherForge-Suite) |
| 03 | WebSec_240102590 | Secure web concepts and hands-on web security practice | [Open GitHub](https://github.com/Nady-Emad/WebSec_240102590) |
| 04 | UniShield | Security-focused university concept and defensive design thinking | [Open GitHub](https://github.com/Nady-Emad/UniShield) |
| 05 | ZIP Archive Manager | Python desktop utility with GUI, CLI, and archive management features | [Open GitHub](https://github.com/Nady-Emad/ZIP-Archive-Manager) |
| 06 | Digital Profile | This portfolio project and digital profile website | [Open GitHub](https://github.com/Nady-Emad/myproject) |
| 07 | University System | University system workflow and software structure project | [Open GitHub](https://github.com/Nady-Emad/University-System) |
| 08 | CarRentalSystem | Business logic and workflow-oriented application project | [Open GitHub](https://github.com/Nady-Emad/CarRentalSystem) |
| 09 | FullStack-WebLabs-2025 | Full-stack labs and practical learning exercises | [Open GitHub](https://github.com/Nady-Emad/FullStack-WebLabs-2025) |
| 10 | AURVEX | Team-based collaborative technical project | [Open GitHub](https://github.com/KirolosArian/AURVEX) |
| 11 | Nady-Emad Profile Repository | Public GitHub profile branding and developer identity | [Open GitHub](https://github.com/Nady-Emad/Nady-Emad) |

---

## Skills Covered in the Portfolio

The portfolio currently highlights these technical areas:

- Python
- Linux
- Java
- JavaScript
- HTML
- CSS
- Network Security
- Git
- SQL
- Laravel
- Web and Security Technologies
- Digital Forensics
- Linux and Shell Programming
- Penetration Testing
- Responsive Front-End Development

---

## Certificates Showcase

The certificates section is built around organized image assets inside `/certificates`, with:

- lazy-loaded certificate previews
- badge indicators
- full-image modal / lightbox
- responsive grid on larger screens
- horizontal slider behavior only on very small mobile screens

<details>
<summary>Certificate and badge assets</summary>

- `cert-network-fundamentals.jpg`
- `cert-ethical-hacking.jpg`
- `cert-network-security.jpg`
- `cert-cybersecurity-for-all.jpg`
- `cert-cyber-threat-management.jpg`
- `cert-cisco-packet-tracer.jpg`
- `cert-cyberx-summit.jpg`
- `badge-network-fundamentals.png`
- `badge-ethical-hacking.png`
- `badge-network-security.png`

</details>

---

## Responsive and UX Notes

The current front-end implementation is tuned for a modern, mobile-first experience:

- `1024px and below`: tighter layout spacing and 2-column content where appropriate
- `768px and below`: single-column layout for most sections, mobile navigation overlay, larger touch targets
- `480px and below`: tighter spacing, full-width buttons, mobile certificate slider

Additional UX improvements:

- semantic HTML structure
- keyboard-accessible controls
- visible focus states
- lazy-loaded media
- reduced-motion friendly behavior
- safe external link handling via JavaScript
- form validation before mail client handoff

---

## Tech Stack

| Layer | Tools |
| --- | --- |
| Markup | HTML5 semantic structure |
| Styling | CSS variables, Grid, Flexbox, responsive media queries, modern card effects |
| Interactivity | Vanilla JavaScript, scroll effects, counters, theme toggle, modal, toast feedback |
| Typography | IBM Plex Sans Arabic, Space Grotesk |
| Deployment | Static hosting, GitHub Pages ready |

> Note: `package.json` and `package-lock.json` exist in the repository, but the portfolio UI itself does not require a build step and can run as a plain static site.

---

## Project Structure

```text
myproject/
|-- index.html
|-- style.css
|-- app.js
|-- 404.html
|-- README.md
|-- icon.ico
|-- profile.png
|-- profile.jpg
|-- google87c5824a39e30af8.html
|-- package.json
|-- package-lock.json
`-- certificates/
    |-- cert-network-fundamentals.jpg
    |-- cert-ethical-hacking.jpg
    |-- cert-network-security.jpg
    |-- cert-cybersecurity-for-all.jpg
    |-- cert-cyber-threat-management.jpg
    |-- cert-cisco-packet-tracer.jpg
    |-- cert-cyberx-summit.jpg
    |-- badge-network-fundamentals.png
    |-- badge-ethical-hacking.png
    `-- badge-network-security.png
```

---

## Run Locally

Because the site is static, you can run it in any of these simple ways:

### Option 1: Open directly

Open `index.html` in your browser.

### Option 2: Start a local static server

```powershell
cd C:\xampp\htdocs\myproject
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

### Option 3: Use VS Code Live Server

Open the project folder in VS Code and launch `index.html` with Live Server.

---

## Deployment

This project is ready for static deployment on platforms such as:

- GitHub Pages
- Netlify
- Vercel static hosting

The repository already includes a custom `404.html`, which helps the project feel more polished in production.

---

## Contact

| Platform | Link |
| --- | --- |
| GitHub | [github.com/Nady-Emad](https://github.com/Nady-Emad) |
| LinkedIn | [linkedin.com/in/nadyemad](https://www.linkedin.com/in/nadyemad/) |
| Instagram | [instagram.com/nady.emad.nady](https://www.instagram.com/nady.emad.nady/) |
| WhatsApp | [wa.me/201205855148](https://wa.me/201205855148) |
| Facebook | [facebook.com/nady.emad.75](https://www.facebook.com/nady.emad.75/) |
| Email | [nady240102590@sut.edu.eg](mailto:nady240102590@sut.edu.eg) |

---

## Summary

This repository is more than a simple personal page. It is a structured digital profile built to present Nady Emad as a serious cybersecurity student with:

- a recruiter-friendly personal brand
- practical project work
- visible technical growth
- organized credentials
- modern responsive UI and UX

If you are reviewing the project for hiring, collaboration, or academic interest, the portfolio is intended to make that evaluation fast, clear, and professional.
