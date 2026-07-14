# Mobile Testing Guide for Rancher Dashboard

This guide provides comprehensive instructions for testing the mobile-responsive features of the Rancher Dashboard.

## Quick Start Testing

### Browser Developer Tools (Recommended for Development)

1. **Chrome DevTools**
   ```bash
   # Start the dev server
   API=<your-rancher-backend-url> yarn dev
   
   # Open in Chrome
   # Press F12 or Ctrl+Shift+I (Cmd+Option+I on Mac)
   # Click the device toggle icon or press Ctrl+Shift+M (Cmd+Shift+M on Mac)
   ```

2. **Device Emulation Presets**
   - iPhone SE (375 x 667) - Small phone
   - iPhone 12 Pro (390 x 844) - Standard phone
   - iPhone 14 Pro Max (430 x 932) - Large phone
   - iPad Mini (768 x 1024) - Small tablet
   - iPad Pro (1024 x 1366) - Large tablet

3. **Firefox Responsive Design Mode**
   - Press Ctrl+Shift+M (Cmd+Option+M on Mac)
   - Select from device presets or enter custom dimensions

## Testing Checklist

### 1. Navigation & Layout

- [ ] **Hamburger Menu (< 768px)**
  - Appears in header on mobile
  - Three horizontal lines visible
  - Opens/closes on tap
  - Smooth slide animation

- [ ] **Side Navigation**
  - Slides in from left when opened
  - Width: 80% of screen (max 300px)
  - Overlay appears behind menu
  - Tap overlay closes menu
  - Menu items are readable and tappable

- [ ] **Header**
  - Logo scales appropriately
  - Elements don't overflow
  - User menu remains accessible
  - All buttons are tappable

### 2. Tables & Data

- [ ] **Sortable Tables**
  - Horizontal scroll works smoothly
  - Touch scrolling is smooth (-webkit-overflow-scrolling)
  - Headers remain visible
  - Cell content is readable
  - Checkbox columns have adequate spacing
  - Action buttons are tappable

- [ ] **Resource Lists**
  - Masthead title scales down
  - Actions stack vertically
  - Search box full width
  - Filters are accessible

### 3. Forms & Inputs

- [ ] **Text Inputs**
  - Min height 44px (Apple's recommendation)
  - Font size 16px (prevents iOS zoom)
  - Full width on mobile
  - Labels are readable

- [ ] **Buttons**
  - All buttons min 44px height
  - Full width in action groups
  - Stack vertically on mobile
  - Clear tap feedback

- [ ] **Select Dropdowns**
  - Dropdown menu max 60vh height
  - Options have 44px min height
  - Long text wraps properly
  - Touch scrolling works

- [ ] **Checkboxes & Radios**
  - 24px x 24px size
  - Easy to tap
  - Proper spacing from labels

### 4. Modals & Dialogs

- [ ] **Modal Appearance**
  - Full screen on mobile (< 768px)
  - No border radius
  - Proper overflow handling
  - Close button accessible

- [ ] **Dialog Buttons**
  - Stack vertically
  - Full width
  - Proper spacing (10px gap)
  - Primary action clearly visible

### 5. Cards & Content

- [ ] **Cards**
  - Full width on mobile
  - Proper padding (12px)
  - Icons scale appropriately
  - Text remains readable

- [ ] **Grid Layouts**
  - Convert to single column
  - Maintain proper spacing
  - No horizontal overflow

### 6. Touch Interactions

- [ ] **Tap Targets**
  - All interactive elements ≥ 44px
  - Adequate spacing between targets
  - No accidental taps

- [ ] **Scrolling**
  - Smooth momentum scrolling
  - No stuck scroll positions
  - Proper scroll containers

- [ ] **Gestures**
  - Swipe scrolling works
  - Pinch zoom disabled on form inputs
  - No double-tap zoom on buttons

## Device-Specific Testing

### iPhone (Safari iOS)

**Critical Tests:**
- [ ] Input font size prevents zoom (must be 16px)
- [ ] Fixed elements don't cover content
- [ ] Viewport height handles (100vh issues)
- [ ] Safe area insets respected

**Common Issues:**
- Form inputs < 16px trigger zoom
- Fixed position elements may misbehave
- Viewport units can be problematic

### Android (Chrome)

**Critical Tests:**
- [ ] Material design patterns work
- [ ] Navigation gestures don't conflict
- [ ] Bottom nav bar doesn't cover content

### iPad / Tablets

**Critical Tests:**
- [ ] Layout optimized for tablet (768px - 1024px)
- [ ] Landscape orientation works well
- [ ] Two-column layouts where appropriate
- [ ] Not just "big phone" mode

## Breakpoint Testing

### Phone Portrait (< 480px)
- Single column layout
- Compact spacing
- Smaller fonts (13-14px)
- Full-width elements

### Phone Landscape / Small Tablet (481px - 768px)
- May use 2-column layouts
- Medium spacing
- Standard fonts (14-16px)
- Better use of horizontal space

### Tablet (769px - 1024px)
- Desktop-like experience
- Hamburger menu hidden
- Standard desktop navigation
- Multi-column layouts

## Feature Testing

### Priority 1 (Must Work)
1. Login flow
2. Cluster navigation
3. Resource lists (deployments, pods, etc.)
4. Basic CRUD operations
5. Navigation menu

### Priority 2 (Should Work)
1. Dashboard/overview pages
2. Resource details
3. YAML editors
4. Forms and wizards
5. Search functionality

### Priority 3 (Nice to Have)
1. Charts and graphs
2. Terminal/shell
3. Advanced filters
4. Batch operations

## Performance Testing

- [ ] **Load Time**
  - Initial load < 3s on 3G
  - Subsequent navigation < 1s

- [ ] **Scroll Performance**
  - 60fps scrolling
  - No jank or stuttering

- [ ] **Touch Responsiveness**
  - < 100ms tap response
  - Visual feedback on touch

## Accessibility Testing

- [ ] **Screen Readers**
  - VoiceOver (iOS)
  - TalkBack (Android)
  - Proper ARIA labels

- [ ] **Zoom**
  - Text scales to 200%
  - No content cut off
  - Layout remains usable

- [ ] **Contrast**
  - WCAG AA compliance
  - Readable in bright sunlight

## Common Issues & Solutions

### Issue: Content overflows horizontally
**Solution:** Check for fixed widths, use max-width: 100%

### Issue: Buttons too small to tap
**Solution:** Ensure min-height: 44px and min-width: 44px

### Issue: iOS zooms on input focus
**Solution:** Font size must be ≥ 16px

### Issue: Tables don't scroll
**Solution:** Wrap in .table-responsive or add overflow-x: auto

### Issue: Modal doesn't fill screen
**Solution:** Check .mobile-fullscreen class is applied

## Automated Testing

```bash
# Run unit tests
yarn test:ci

# Run E2E tests (if configured for mobile)
yarn cy:run --config viewportWidth=375,viewportHeight=667

# Run across multiple viewports
yarn cy:run --config viewportWidth=375,viewportHeight=667
yarn cy:run --config viewportWidth=768,viewportHeight=1024
yarn cy:run --config viewportWidth=1024,viewportHeight=768
```

## Browser Support Matrix

| Browser | Version | Support |
|---------|---------|---------|
| Safari iOS | 12+ | ✅ Full |
| Chrome Mobile | Latest | ✅ Full |
| Firefox Mobile | Latest | ✅ Full |
| Samsung Internet | Latest | ✅ Full |
| Edge Mobile | Latest | ✅ Full |
| Opera Mobile | Latest | ⚠️ Basic |

## Reporting Issues

When reporting mobile issues, include:

1. **Device Information**
   - Device model (e.g., iPhone 13)
   - OS version (e.g., iOS 16.2)
   - Browser and version

2. **Viewport Size**
   - Width x Height
   - Orientation (portrait/landscape)

3. **Steps to Reproduce**
   - Clear, numbered steps
   - Expected vs actual behavior

4. **Screenshots/Videos**
   - Show the issue clearly
   - Include viewport size in screenshot

5. **Console Errors**
   - Browser console output
   - Network errors if any

## Quick Test Script

```bash
#!/bin/bash
# Quick mobile testing script

echo "Testing mobile viewports..."

# Phone portrait
echo "Testing phone portrait (375x667)..."
open -a "Google Chrome" --args --window-size=375,667 "https://localhost:8005"

# Tablet portrait  
echo "Testing tablet portrait (768x1024)..."
open -a "Google Chrome" --args --window-size=768,1024 "https://localhost:8005"

# Phone landscape
echo "Testing phone landscape (667x375)..."
open -a "Google Chrome" --args --window-size=667,375 "https://localhost:8005"

echo "Testing complete! Check each window."
```

## Next Steps

After completing this testing:

1. Document any issues found
2. Verify fixes in multiple browsers
3. Test on real devices if possible
4. Update this guide with new learnings
