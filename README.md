# CHAI & CO. — Premium Tea House & Specialty Chai Stall HTML Template

> **"Brewed with Tradition. Served with Soul."**

Welcome to **CHAI & CO.**, a commercial-grade, fully responsive, multipurpose HTML5/CSS3/Vanilla JavaScript website template crafted specifically for modern tea houses, specialty chai stalls, artisan cafes, and boutique hospitality brands. Built to marketplace standards (ThemeForest, TemplateMonster, Creative Market), this template delivers authentic Indian chai heritage wrapped in a contemporary café aesthetic.

---

## 🌟 Key Features

- **Strict Tech Stack**: 100% pure **HTML5, CSS3, and Vanilla JavaScript (ES6+)**. Zero dependencies on React, Vue, Angular, jQuery, PHP, Laravel, WordPress, or any server-side runtime. Works directly by opening the `.html` files in any modern web browser (`file://` or HTTP server).
- **15 Complete Public Pages**:
  - Home, Menu, Order Online & Checkout, Sourcing, Loyalty, Catering/Pricing, Blog, Blog Details, About, Contact, Member Login, Register, 404 Error, Coming Soon (with live countdown), and Maintenance.
- **Dual Theme Engine**: Native Light & Dark Mode with seamless `[data-theme="dark"]` overrides and `localStorage` persistence.
- **Full RTL Support**: Complete bidirectional Right-to-Left layout (`[dir="rtl"]`) with mirrored drawers, flipped navigation arrows, and CSS logical properties.
- **Interactive Slide-out Cart**: Client-side demo shopping cart backed by `localStorage` with quantity controls, subtotal, 5% GST tax calculation, item removal, and drawer animations.
- **Online Order & Live Brew Tracker**: Complete 5-step ordering system with table dine-in, takeaway, delivery options, UPI QR code scanner, and animated 4-stage brewing tracker.
- **Interactive Chai Rewards Calculator**: Live points calculator converting ₹ spend to Chai Points (₹100 = 10 pts) with dynamic tier highlighting and progress bars.
- **Interactive Menu Catalog**: Category filter tabs, live instant search, price & popularity sorting, favorite hearts, and product quick-view modals.
- **Client-Side Form Validation**: Real-time validation for Contact, Login, Register (with interactive password strength meter), Catering Inquiries, and Newsletter signups with toast notifications.
- **Interactive Leaflet Map**: OpenStreetMap integration centered on the Jaipur flagship haveli with custom pin popup.

---

## 📁 Project Structure

```text
chai-co/
│
├── index.html                  # Homepage (Hero, Signature Chais, Features, About preview, Menu preview, Testimonials)
├── menu.html                   # Complete interactive menu (Categories, Search, Sort, Quick-view modal, Add to cart)
├── order.html                 # Dedicated Online Order & Checkout (Delivery, Dine-In, Pickup, UPI/Cards)
├── sourcing.html               # Storytelling page (Assam, Darjeeling, Nilgiri terroirs, 6 Sacred Spices, Timeline)
├── loyalty.html                # Chai Rewards (Tiers, Perks, Interactive Point Calculator, FAQ Accordion)
├── pricing.html                # Catering & Event packages (Small Gathering, Office, Premium), comparison table, booking form
├── contact.html                # Contact info cards, Validated inquiry form, Interactive Leaflet map
├── about.html                  # Brand story, Mission, Vision, Core values, Team profiles, Milestones timeline
├── blog.html                   # Blog listing, Featured story banner, Category filters, Search, Pagination
├── blog-details.html           # Full article reading layout, comments demo, rich sidebar, newsletter
├── login.html                  # Member login demo, password reveal toggle, credentials hint
├── register.html               # User registration, password strength meter, password match check
├── 404.html                    # Creative tea-themed error page with quick recovery navigation
├── coming-soon.html            # Teaser page with live Vanilla JS countdown timer & newsletter signup
├── maintenance.html            # Scheduled maintenance notice with progress indicator & urgent contact info
│
├── assets/
│   ├── css/
│   │   ├── style.css           # Core design system, variables, typography, layouts, components, header, footer
│   │   ├── responsive.css      # Fluid responsive rules across 6 breakpoints (480px to 1400px+)
│   │   ├── dark-mode.css       # Complete dark mode palette & element overrides ([data-theme="dark"])
│   │   └── rtl.css             # Right-to-left layout adjustments with CSS logical properties ([dir="rtl"])
│   │
│   ├── js/
│   │   ├── main.js             # Sticky nav, mobile drawer, preloader, scroll reveal, back-to-top, toast & modal managers
│   │   ├── theme.js            # Theme switcher (Dark/Light), RTL switcher, Language dropdown with localStorage
│   │   ├── components.js       # Shopping cart drawer manager, FAQ accordion, counter ticker
│   │   ├── menu.js             # Menu data catalog, category filtering, search, sorting, quick-view modal
│   │   ├── loyalty.js          # Interactive loyalty point calculator
│   │   ├── blog.js             # Blog catalog data, category filters, search
│   │   └── forms.js            # Validation engine for contact, login, register, newsletter
│   │
│   └── images/                 # Royalty-free curated photography and graphics
│
└── README.md                   # Marketplace documentation and setup guide
```

---

## 🎨 Customization Guide

### 1. Changing Brand Colors
All colors are centralized in `assets/css/style.css` under `:root`. Simply adjust these variables to rebrand:

```css
:root {
  --primary: #7a4b2a;             /* Warm Chai Brown */
  --secondary: #2d4a3e;           /* Deep Tea Leaf Green */
  --terracotta: #c85a32;          /* Indian Terracotta */
  --accent: #d6a85f;              /* Golden Saffron */
  --bg-main: #fffaf2;             /* Warm Cream Background */
  --bg-surface: #ffffff;          /* White Card Surface */
  --text-main: #2b2118;           /* Charcoal Brown */
  --border: #eadfd2;              /* Warm Border */
}
```

For Dark Mode overrides, edit `assets/css/dark-mode.css` under `[data-theme="dark"]`.

### 2. Changing Typography
The template uses Google Fonts loaded via CDN in the `<head>` of each HTML document:
- **Headings**: `'Playfair Display', Georgia, serif`
- **Body & UI**: `'Plus Jakarta Sans', sans-serif`

To swap fonts, update the Google Fonts link in the HTML files and edit the CSS variables in `style.css`:
```css
:root {
  --font-heading: 'DM Serif Display', Georgia, serif;
  --font-body: 'Poppins', sans-serif;
}
```

### 3. Adding or Editing Menu Items
Products are defined in `assets/js/menu.js` inside the `MENU_ITEMS` array. Each product has the following schema:

```javascript
{
  id: 'chai-17',
  name: 'Rose Cardamom Chai',
  category: 'Masala Chai',
  price: 139,
  rating: 4.9,
  reviews: 140,
  image: 'https://images.unsplash.com/...',
  description: 'Infused with fragrant organic Damask rose petals and whole cardamom pods.',
  ingredients: ['Assam Black Tea', 'Rose Petals', 'Cardamom', 'Milk'],
  prepTime: '5 mins',
  caffeine: 'Medium',
  isVeg: true,
  badge: 'New'
}
```
Any product added here will automatically appear in both the homepage menu preview and the full menu page with working search, sorting, modal preview, and add-to-cart functionality.

### 4. Changing Logo & Brand Name
Search for `.brand-logo` across the HTML files:
```html
<a href="index.html" class="brand-logo">
  <div class="logo-icon"><i class="fa-solid fa-mug-hot"></i></div>
  <span>CHAI & CO.</span>
</a>
```
You can replace the icon with an `<img>` tag pointing to your custom SVG/PNG logo.

---

## ⚡ Browser Compatibility

Tested and guaranteed to work seamlessly on:
- Google Chrome (Desktop & Android)
- Mozilla Firefox
- Apple Safari (macOS & iOS)
- Microsoft Edge
- Opera

---

## ⚠️ Important Static Template Limitation

> **Note**: This is a static frontend HTML template. No backend server, database, or payment processor is connected out-of-the-box.
> 
> Features such as member login, registration, and order processing are simulated using client-side JavaScript and `localStorage`. For production deployment with live orders and payments, integration with a backend API (Node.js, Python, PHP, or Firebase) and a payment gateway (Razorpay, Stripe, etc.) is required.

---

## 📜 Credits & Licenses

- **Fonts**: [Google Fonts](https://fonts.google.com/) (Playfair Display, Plus Jakarta Sans) — Open Font License.
- **Icons**: [Font Awesome 6 Free](https://fontawesome.com/) — Creative Commons & SIL OFL.
- **Maps**: [Leaflet.js](https://leafletjs.com/) & [OpenStreetMap](https://www.openstreetmap.org/) — BSD 2-Clause & ODbL.
- **Charts**: [Chart.js](https://www.chartjs.org/) — MIT License.
- **Images**: [Unsplash](https://unsplash.com/) — Free commercial use license.

---

© 2026 **CHAI & CO.** Built with authentic passion. Marketplace-ready.
