# Rancher Dashboard - Mobile Responsive UI

This fork of the Rancher Dashboard has been fully optimized for mobile devices with comprehensive responsive design improvements.

## 📱 Mobile Features

### ✅ Fully Responsive
- **Hamburger Menu** - Touch-friendly slide-out navigation on mobile
- **Responsive Grid** - 12-column desktop layout converts to single-column on mobile
- **Touch Optimized** - All interactive elements meet Apple's 44px minimum touch target guidelines
- **No Zoom Issues** - 16px input font size prevents iOS auto-zoom

### ✅ Optimized Components
- **Tables** - Horizontal scroll with smooth touch momentum
- **Forms** - Vertical stacking with proper input sizing
- **Modals** - Full-screen on mobile devices
- **Tabs** - Horizontal scrolling with touch support
- **Cards** - Full-width responsive cards
- **Buttons** - Touch-friendly spacing and sizing
- **Dropdowns** - Larger touch targets and proper positioning

### ✅ Breakpoints
- **Phone** - < 480px (compact layout)
- **Tablet** - 481px - 768px (medium layout)
- **Desktop** - > 768px (standard layout)
- **Landscape** - Special optimizations for landscape orientation

## 🚀 Getting Started

### Prerequisites
- Node.js >= 24.0.0
- Yarn
- A running Rancher server

### Installation

```bash
git clone https://github.com/willuhmjs/dashboard.git
cd dashboard
git checkout mobile-responsive-ui
yarn install --frozen-lockfile
```

### Development

```bash
# Point to your Rancher server
API=https://your-rancher-server.com yarn dev

# Or use Rancher Desktop
API=https://localhost:6443 yarn dev

# Or start a local Rancher server
docker run -d -p 80:80 -p 443:443 --privileged rancher/rancher:latest
API=https://localhost yarn dev
```

The development server will be available at:
- **Local:** https://localhost:8005/
- **Network:** https://192.168.1.101:8005/

### Testing Mobile Features

Use Chrome DevTools device emulation:
1. Press `F12` or `Ctrl+Shift+I` (Cmd+Option+I on Mac)
2. Click device toggle or press `Ctrl+Shift+M` (Cmd+Shift+M on Mac)
3. Select a device:
   - iPhone 14 Pro (430 x 932)
   - iPhone 12 Pro (390 x 844)
   - iPad (768 x 1024)

## 📊 Changes Overview

### Files Modified
- **13 SCSS files** - Complete responsive stylesheet system
- **12 Vue components** - Touch-optimized components
- **2000+ lines** of mobile-specific code

### Key Files
```
shell/assets/styles/
├── global/_mobile.scss (new - 500+ lines)
├── global/_mobile-utilities.scss (new - 300+ lines)
├── global/_layout.scss (mobile breakpoints)
├── global/_button.scss (touch-friendly buttons)
├── global/_form.scss (mobile form optimization)
├── global/_table.scss (scrollable tables)
├── global/_cards.scss (responsive cards)
├── global/_columns.scss (responsive grid)
└── global/_select.scss (mobile dropdowns)

shell/components/
├── nav/Header.vue (hamburger menu)
├── templates/default.vue (mobile nav state)
├── SideNav.vue (slide-out navigation)
├── AppModal.vue (full-screen modals)
├── Dialog.vue (responsive dialogs)
├── Tabbed/index.vue (scrollable tabs)
├── form/KeyValue.vue (mobile forms)
├── form/ArrayList.vue (touch-friendly lists)
└── ResourceList/Masthead.vue (responsive headers)
```

## 🎨 Design Principles

### Touch-First
- Minimum 44px x 44px touch targets
- Adequate spacing between interactive elements
- Visual feedback on touch/tap

### Performance
- Smooth 60fps scrolling
- Hardware-accelerated animations
- Efficient CSS with minimal reflows

### Accessibility
- WCAG AA compliant contrast
- Proper ARIA labels
- Screen reader support
- Keyboard navigation

### Cross-Browser
- ✅ Safari iOS 12+
- ✅ Chrome Mobile
- ✅ Firefox Mobile
- ✅ Samsung Internet
- ✅ Edge Mobile

## 📝 Documentation

- **[MOBILE_FEATURES.md](./MOBILE_FEATURES.md)** - Detailed feature list
- **[MOBILE_TESTING_GUIDE.md](./MOBILE_TESTING_GUIDE.md)** - Comprehensive testing instructions

## 🔧 Technical Details

### Media Queries
```scss
// Phone portrait
@media (max-width: 480px) { }

// Tablet / Phone landscape
@media (max-width: 768px) { }

// Landscape-specific
@media (max-width: 768px) and (orientation: landscape) { }

// Touch devices
@media (hover: none) and (pointer: coarse) { }
```

### Utility Classes
```html
<!-- Display utilities -->
<div class="hide-mobile">Hidden on mobile</div>
<div class="show-mobile">Visible on mobile only</div>

<!-- Layout utilities -->
<div class="mobile-stack">Stack children vertically</div>
<div class="mobile-fullscreen">Full-screen on mobile</div>

<!-- Touch utilities -->
<button class="touch-target">44px minimum size</button>
```

## 🤝 Contributing

This is a fork focused on mobile optimization. For general Rancher Dashboard contributions, see the [upstream repository](https://github.com/rancher/dashboard).

## 📄 License

Apache 2.0 - Same as upstream Rancher Dashboard

## 🔗 Links

- **Live Demo:** View mobile-demo.html in your browser
- **Upstream:** https://github.com/rancher/dashboard
- **Rancher Docs:** https://rancher.com/docs
- **Mobile Branch:** https://github.com/willuhmjs/dashboard/tree/mobile-responsive-ui

---

**Made with 📱 for mobile-first Kubernetes management**
