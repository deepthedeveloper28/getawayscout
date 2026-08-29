# Getawayscout.com - Vanilla HTML/CSS/JavaScript Website

This is the standalone **HTML, CSS, and Vanilla JavaScript** version of the Getawayscout.com travel website. It requires **no Node.js build step, no compiler, and no dependencies**. You can open the `.html` files directly in any web browser or host them on any static host, Apache, Nginx, Netlify, Vercel, cPanel, or GitHub Pages.

---

## 📁 Folder Structure

```
vanilla-version/
├── index.html            # Home page (Hero, Multi-tab Search, Top Destinations, Deals, Testimonials)
├── flights.html          # Flights page (Aviasales Search, 8 City Deal widgets, Map, Calendar, FAQs)
├── hotels.html           # Hotels page (Hotel Search widget, Popular Destinations, FAQs)
├── cars.html             # Car rentals page (Car search widget, Price tracker, Vehicle classes, FAQs)
├── cabs.html             # Airport cabs page (Cab transfer search widget, Transfer FAQs)
├── bikes.html            # Bikes & Scooters page (Bike search widget, Rental categories, FAQs)
├── tours.html            # Tours & Activities page (GetYourGuide showcase, Curated sights, FAQs)
├── sim.html              # Prepaid eSIM & SIM page (eSIM Search widget, Regional packages, FAQs)
├── contact.html          # Contact Us page (Form, Email info, Social links)
├── css/
│   └── styles.css        # Pure CSS design system with custom properties & luxury typography
├── js/
│   ├── affiliate.js      # ⭐️ MASTER CONFIG: Update all affiliate widgets, IDs & links here!
│   └── main.js           # Universal scripts: Widget injector, Mobile menu, Tabs, FAQ toggles
└── images/               # All image assets and icons
```

---

## ⭐️ How to Update Affiliate Codes & Links

Open `js/affiliate.js` in any text editor. You can update:

1. **Flight Widgets & 8 City Widgets**: Replace with your Travelpayouts / Aviasales affiliate code.
2. **Hotel Widgets & Destination URLs**: Replace search widgets or Expedia affiliate URLs.
3. **Car, Cab, Bike Widgets**: Update embed scripts with your affiliate marker (`shmarker=...`).
4. **Tours & Activities**: Paste your GetYourGuide, Tiqets, or Viator embed widget code or link.
5. **Contact & Social Info**: Edit contact email (`support@getawayscout.com`) and social links.

---

## 🚀 How to Run Locally

- **Option 1**: Double-click `index.html` to open it in your web browser.
- **Option 2**: In VS Code, right-click `index.html` and select **"Open with Live Server"**.
- **Option 3**: Use Python or any local web server:
  ```bash
  python -m http.server 8000
  ```
  Then visit `http://localhost:8000`.
