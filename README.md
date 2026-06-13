# TripGuru Hotel Voucher Generator

A sleek, responsive, and standalone desktop application for generating hotel vouchers with AI Smart parsing, multimodal screenshot reading, and PDF export capabilities.

## 🚀 Key Features

* **AI Smart Import**: Copy-paste or drag-and-drop a screenshot of booking details to automatically fill fields.
* **Modern Interface**: Collapsible form sections, real-time live preview, and high-contrast styling.
* **Native Selectors**: Interactive calendar and clock selectors for stay timelines.
* **PDF Export**: Print-ready, marginless A4 layout designed for high-quality printing.
* **Standalone App**: Packaged as a desktop application installer for offline distribution.

---

## 💻 How to Run Locally (Developer Mode)

1. Ensure **Node.js** is installed on your computer.
2. Open your terminal in this directory and run:
   ```bash
   npm install
   ```
3. Run the local development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to: `http://localhost:3000`

---

## 📦 How to Build the Installer (V1)

To compile the code into a standalone desktop installer (`.exe` for Windows, or `.dmg` for Mac when built on macOS):
```bash
npm run dist
```
The compiled output will be generated inside the `dist/` directory.
