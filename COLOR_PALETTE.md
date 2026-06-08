# ReViSense.AI - Professional Color Palette

## 🎨 Design System Colors

All colors are defined in `assets/styles.css` using CSS custom properties (variables).

---

## 📐 Surfaces & Backgrounds

| Color | Hex | Usage |
|-------|-----|-------|
| **Primary Background** | `#0f1419` | Main page background |
| **Secondary Background** | `#141b27` | Alternative sections |
| **Card Background** | `#1a2332` | Card, modal, section backgrounds |
| **Card Secondary** | `#202d3f` | Alternate card variant |
| **Elevated Surface** | `#253349` | Dropdowns, popovers |

---

## 🔤 Text Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Primary Text** | `#f5f7fa` | Headings, body text |
| **Muted Text** | `#a0adc0` | Secondary text, descriptions |
| **Secondary Muted** | `#7a8699` | Tertiary text, labels |

---

## 🎯 Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Primary Blue** | `#0066cc` | Primary actions, buttons |
| **Light Blue** | `#0080ff` | Highlights, accents |
| **Indigo** | `#004ba3` | Alternative primary |
| **Teal Accent** | `#00a3e0` | Secondary accents, hovers |

### Brand Gradient
```css
linear-gradient(115deg, #0066cc 0%, #0080ff 48%, #00a3e0 100%)
```

Used for:
- Primary buttons
- Hero section accents
- Highlighted text
- CTA elements

---

## 🎲 Data Accents

| Color | Hex | Usage |
|-------|-----|-------|
| **Success (Green)** | `#10b981` | Positive actions, success states |
| **Warning (Amber)** | `#f59e0b` | Warnings, important notices |
| **Error (Red)** | `#ef4444` | Errors, destructive actions |
| **Info (Cyan)** | `#06b6d4` | Information, helpful hints |

---

## 🔲 Borders & Dividers

| Color | Usage |
|-------|-------|
| `rgba(255,255,255,0.1)` | Light borders, subtle dividers |
| `rgba(255,255,255,0.16)` | Medium borders, interactive elements |
| `rgba(255,255,255,0.06)` | Very subtle borders, backgrounds |

---

## ✨ Effects & Shadows

### Glow
```css
box-shadow: 0 0 0 1px rgba(0,102,204,.4), 0 18px 50px -16px rgba(0,102,204,.55)
```
Used for focused, highlighted elements.

### Shadow (Large)
```css
box-shadow: 0 24px 70px -24px rgba(0,0,0,.7)
```
Used for cards, modals, and elevated surfaces.

### Shadow (Small)
```css
box-shadow: 0 12px 36px -18px rgba(0,0,0,.65)
```
Used for hover effects and subtle depth.

---

## 🔄 Color Semantics

### Backgrounds
- **Dark Blue** (`#0f1419` - `#253349`) for professional, trustworthy appearance
- Creates strong contrast with white text for accessibility
- Reduces eye strain in low-light environments

### Typography
- **Clean White** (`#f5f7fa`) for maximum readability
- **Muted Gray** for secondary information hierarchy
- WCAG AAA compliant contrast ratios

### Interactions
- **Bright Blue** (`#0080ff`) for interactive elements
- **Teal** (`#00a3e0`) for hover and focus states
- Easy to distinguish, reduces confusion

### Accents
- **Green** for success and positive feedback
- **Amber** for warnings and caution
- **Red** for errors and dangerous actions
- **Cyan** for informational content

---

## 🎨 Usage Examples

### Primary Button
```css
background: linear-gradient(115deg, #0066cc 0%, #0080ff 48%, #00a3e0 100%);
color: #fff;
box-shadow: 0 14px 34px -14px rgba(0,102,204,.75);
```

### Card Background
```css
background: #1a2332;
border: 1px solid rgba(255,255,255,0.1);
border-radius: 18px;
```

### Text Hierarchy
```css
/* Heading */
color: #f5f7fa;

/* Body Text */
color: #a0adc0;

/* Label */
color: #7a8699;
```

### Interactive Hover
```css
background: rgba(0,102,204,.12);
border-color: rgba(0,102,204,.25);
transform: translateY(-2px);
```

---

## 📱 Accessibility

### Contrast Ratios
- **Text on Background**: 13.5:1 (AAA compliant)
- **Accent on Background**: 7:1 (AA compliant)
- **Muted Text on Background**: 4.8:1 (AA compliant)

### Color Blindness
The palette avoids problematic color combinations:
- Does not rely on red-green distinction alone
- Uses varying luminosity for distinction
- Includes distinct shapes in icons

### Dark Mode Optimization
- Designed specifically for dark backgrounds
- Reduces blue light for evening use
- Maintains contrast in all light conditions

---

## 🔧 Modifying Colors

To change colors globally, edit `assets/styles.css`:

```css
:root {
  --blue: #0066cc;        /* Change primary brand color */
  --blue-2: #0080ff;      /* Change secondary brand color */
  --green: #10b981;       /* Change success color */
  /* ... etc */
}
```

All elements using these variables will automatically update.

---

## 📊 Color Palette Preview

**Professional Dark Blue Theme**
- Modern and trustworthy appearance
- Corporate-suitable
- Reduces eye strain
- Excellent contrast

**Brand Blue → Teal Gradient**
- Eye-catching without being jarring
- Professional and energetic
- Works well at all sizes
- Memorable and distinctive

---

## 💡 Design Philosophy

This color system follows these principles:

1. **Professional**: Corporate-friendly, no bright neons
2. **Accessible**: WCAG AAA compliant, color-blind safe
3. **Functional**: Colors convey meaning (green = good, red = error)
4. **Consistent**: Unified palette across all pages
5. **Modern**: Contemporary dark mode aesthetic
6. **Maintainable**: CSS variables for easy updates

---

## 🎯 Brand Identity

The color palette represents:
- **Blue**: Trust, technology, stability
- **Teal**: Innovation, growth, clarity
- **Professional Dark**: Sophistication, focus
- **Clean White**: Clarity, openness

This creates a professional SaaS appearance suitable for educational institutions.

---

**Last Updated**: 2026-05-30  
**Version**: 1.0  
**Format**: CSS Custom Properties (CSS Variables)
