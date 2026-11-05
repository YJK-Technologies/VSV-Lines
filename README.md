# V S V CONTAINER LINES (OPC) PRIVATE LIMITED
## International Freight Forwarders — Corporate Digital Presence

A corporate website designed and engineered for **V S V CONTAINER LINES (OPC) PRIVATE LIMITED**, an international freight forwarding company based in George Town, Chennai.

The website communicates trust, operational excellence, global connectivity, and freight coordination reliability through a maritime corporate design aesthetic with digital navy and royal gold styling.

---

## 1. Company Information Reference

* **Company Name:** V S V CONTAINER LINES (OPC) PRIVATE LIMITED
* **Business Description:** International Freight Forwarders
* **Registered Address:**  
  No 132, Thambu Chetty Street,  
  Second Floor, Shop No F,  
  George Town, Chennai - 600001, Tamil Nadu, India.
* **Phone:** [+91 79045 36399](tel:+917904536399)
* **Email:** [info@vsvlines.com](mailto:info@vsvlines.com)
* **Website:** [www.vsvlines.com](https://www.vsvlines.com)

---

## 2. Technology Stack

Strict adherence to lightweight, standard, dependency-free web technologies:

* **HTML5:** Semantic document structure, accessible ARIA attributes, OpenGraph and SEO tags.
* **CSS3:** Custom stylesheet (`css/style.css`) incorporating modern CSS variables, responsive fluid typography, and GPU-accelerated micro-interactions.
* **Bootstrap 5.3.3:** Responsive 12-column grid system, utility containers, and mobile navigation via CDN.
* **Bootstrap Icons 1.11.3:** Vector iconography for maritime, logistics, and contact elements.
* **Google Fonts:**  
  - *Cormorant Garamond* for classical corporate headings.  
  - *Montserrat* for crisp, modern body typography.
* **Vanilla JavaScript (ES6+):** Sticky navigation styling, scrollspy link indicators, mobile hamburger auto-collapse, anti-spam honeypot verification, client-side input validation, and asynchronous dispatch to Google Apps Script.
* **Google Apps Script (`Code.gs`):** Serverless backend running `doPost(e)` to process enquiries and dispatch emails directly to `info@vsvlines.com`.

---

## 3. Brand Identity & Colour Palette

| Palette Name | Hex Code | Visual Application |
|---|---|---|
| **Digital Navy** | `#071A33` | Primary navigation, hero overlay, footer, logo background |
| **Deep Navy** | `#0B2545` | Expertise cards, secondary section panels, email headers |
| **Royal Gold** | `#D99A27` | Primary buttons, active indicators, borders, icon accents |
| **Warm Gold** | `#E5AC43` | Button hover highlights, subheadings, trade routes |
| **Light Gold** | `#F5E9D0` | Badge backgrounds, accent tags |
| **Pure White** | `#FFFFFF` | Content sections, hero headings, card backgrounds |
| **Light Gray** | `#F7F8FA` | Alternating section backgrounds, input field backgrounds |
| **Dark Text** | `#182435` | High-contrast body typography |

---

## 4. Project Directory Structure

```text
VSV-Container-Lines/
│
├── index.html                      # Semantic single-page layout (5 main sections)
│
├── css/
│   └── style.css                   # Custom corporate maritime stylesheet
│
├── js/
│   └── script.js                   # Navigation, validation & Apps Script integration
│
├── assets/
│   └── favicon/
│       └── favicon.svg             # Maritime monogram vector favicon
│
├── google-apps-script/
│   └── Code.gs                     # Google Apps Script doPost(e) email dispatcher
│
└── README.md                       # Complete documentation and setup manual
```

---

## 5. Website Architecture & Sections

The single-page architecture contains **exactly 5 primary sections**:

1. **HOME (`#home`):**
   * Full-width cinematic maritime hero featuring international container vessel photography.
   * Prominent headline: *CONNECTING BUSINESS TO THE WORLD.*
   * Direct CTAs: *EXPLORE OUR SERVICES* & *CONTACT US*.
   * Four introductory highlight cards: Global Connectivity, Reliable Logistics, Professional Coordination, Customer-Focused Service.

2. **ABOUT (`#about`):**
   * Asymmetric two-column layout highlighting Chennai port logistics operations.
   * Company mission, vision, and operational commitments.
   * Highlights transparent communication and dependable cargo movement.

3. **SERVICES (`#services`):**
   * 8 distinct service cards with imagery, badges, and icon indicators:
     1. Sea Freight
     2. Air Freight
     3. Import Services
     4. Export Services
     5. Customs Clearance Coordination
     6. Door-to-Door Logistics
     7. Container Shipping
     8. Freight Documentation

4. **EXPERTISE (`#expertise`):**
   * Deep navy themed operational matrix detailing 6 specialized capabilities.
   * Interactive SVG maritime trade lane network map showing Chennai hub corridors.
   * Business forwarding call-to-action banner.

5. **CONTACT (`#contact`):**
   * Left Column: Corporate address in George Town, Chennai with interactive Google Maps link, phone (`tel:`), email (`mailto:`), and portal link.
   * Right Column: Complete validation form with real-time feedback, field constraints, honeypot spam protection, loading state spinner, and Google Apps Script connector.

6. **FOOTER:**
   * Royal gold separator, corporate summary, 5 section quick links, core services breakdown, and verified copyright notice:
   * `© 2026 V S V Container Lines (OPC) Private Limited. All Rights Reserved.`

---

## 6. Royalty-Free Image Asset Registry

All photographs are sourced from Unsplash with direct, high-resolution URLs:

* **Hero Section (Container Ship at Sea):**  
  `https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5`
* **About Section (Container Terminal & Cranes):**  
  `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d`
* **Sea Freight:**  
  `https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5`
* **Air Freight:**  
  `https://images.unsplash.com/photo-1540959733332-eab4deabeeaf`
* **Import Services:**  
  `https://images.unsplash.com/photo-1578575437130-527eed3abbec`
* **Export Services:**  
  `https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3`
* **Customs Clearance Coordination:**  
  `https://images.unsplash.com/photo-1454165804606-c3d57bc86b40`
* **Door-to-Door Logistics:**  
  `https://images.unsplash.com/photo-1601584115197-04ecc0da31d7`
* **Container Shipping:**  
  `https://images.unsplash.com/photo-1524522173746-f628baad3644`
* **Freight Documentation:**  
  `https://images.unsplash.com/photo-1554224155-8d04cb21cd6c`

---

## 7. Google Apps Script Setup & Deployment Guide

Follow these steps to deploy `google-apps-script/Code.gs` and connect it to your live contact form:

### Step 1: Create the Apps Script Project
1. Visit [Google Apps Script Dashboard](https://script.google.com/) (sign in with your Google Workspace / Gmail account).
2. Click **New project** at the top left.
3. Rename the project to **VSV Container Lines Contact Form Handler**.

### Step 2: Paste the Backend Code
1. Open the existing `Code.gs` file in the script editor.
2. Clear any default code and paste the complete content of `google-apps-script/Code.gs`.
3. Save the project (`Ctrl + S` or `Cmd + S`).

### Step 3: Test Email Authorization (Optional but Recommended)
1. In the Apps Script toolbar, select the `testEmailDispatch` function from the dropdown.
2. Click **Run**.
3. Google will ask you to authorize permissions for the script to use `MailApp.sendEmail`.
4. Review permissions and grant access. Check your `info@vsvlines.com` inbox or test recipient to verify receipt.

### Step 4: Deploy as a Web App
1. Click the blue **Deploy** button in the top right corner and choose **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Configure the deployment settings:
   * **Description:** `Production Contact Form v1`
   * **Execute as:** `Me (your-email@...)`
   * **Who has access:** `Anyone` *(Crucial: This allows public form submissions from your website without requiring visitors to log in to a Google account).*
4. Click **Deploy**.
5. Copy the generated **Web app URL** (format: `https://script.google.com/macros/s/AKfycb.../exec`).

### Step 5: Connect URL to Frontend
1. Open `js/script.js` in your project.
2. Find line 13:
   ```javascript
   const GOOGLE_SCRIPT_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
   ```
3. Replace the placeholder string with your copied URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycb.../exec";
   ```
4. Save `js/script.js`. All submissions will now instantly email `info@vsvlines.com`!

### Understanding Cross-Origin (CORS) Behavior:
When a browser sends an HTTP POST request to a Google Apps Script Web App, Google responds with an HTTP 302 redirect to a secure user content domain. To prevent cross-origin fetch exceptions in client browsers, the script sends the payload with `mode: 'no-cors'`. The request completes and triggers the backend `MailApp` trigger reliably.

---

## 8. Quality Assurance & Verification

* [x] **5 Navigation Links:** HOME, ABOUT, SERVICES, EXPERTISE, CONTACT scroll smoothly to exact anchors.
* [x] **Sticky Navigation:** Translucent navy navbar becomes solid with elevation shadow on scroll.
* [x] **Mobile Drawer:** Hamburger toggles clean offcanvas menu and closes automatically upon link selection.
* [x] **Corporate Monogram Logo:** Clean vector SVG incorporating vessel bow, shipping container isometric geometry, and navigation arcs.
* [x] **Clickable Communication Links:** Phone (`tel:+917904536399`), Email (`mailto:info@vsvlines.com`), Website (`https://www.vsvlines.com`), and Google Maps directions.
* [x] **Client-Side Form Validation:** Validates full name (min 2 chars), company name, RFC-compliant email, phone (min 7 digits), service selection, subject, and message (min 10 chars).
* [x] **Bot Defense:** Hidden honeypot field (`website_hp`) silently traps automated submission scrapers.
* [x] **Responsive Layout:** Tested across standard desktop (1920/1440/1366px), tablet (1024/768px), and mobile viewports (430/390/375px).
* [x] **Accessibility:** High color contrast ratio, semantic HTML headings, and `@media (prefers-reduced-motion: reduce)` support.
