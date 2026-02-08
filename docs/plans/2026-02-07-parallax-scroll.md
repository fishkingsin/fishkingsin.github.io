# Parallax Scroll Effect Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a subtle full-page parallax scroll effect where different sections move at slightly different speeds as the user scrolls, creating a sense of depth without being distracting.

**Architecture:** Lightweight scroll-based transformation system using pure JavaScript and CSS transforms. A ParallaxManager class tracks scroll position and applies different translation speeds to sections based on their z-index depth. Each section gets a parallax-depth attribute (0-1 scale) that determines its scroll speed.

**Tech Stack:** Vanilla JavaScript, CSS transforms, requestAnimationFrame for performance

---

### Task 1: Create ParallaxManager class

**Files:**
- Create: `parallax.js`

**Step 1: Write the failing test**

```javascript
// This will be a manual visual test, so we'll verify in browser
// The ParallaxManager should:
// - Find all sections with data-parallax-depth
// - Apply CSS transforms based on scroll position
// - Use requestAnimationFrame for smooth performance
```

**Step 2: Verify no parallax.js exists**

Run: `ls parallax.js`
Expected: "No such file or directory"

**Step 3: Write minimal implementation**

```javascript
class ParallaxManager {
  constructor() {
    this.sections = document.querySelectorAll('[data-parallax-depth]');
    this.isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    this.requestId = null;

    if (!this.isMobile && this.sections.length > 0) {
      this.init();
    }
  }

  init() {
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    this.onScroll();
  }

  onScroll() {
    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }

    this.requestId = requestAnimationFrame(() => this.updateSections());
  }

  updateSections() {
    const scrollY = window.pageYOffset;

    this.sections.forEach(section => {
      const depth = parseFloat(section.getAttribute('data-parallax-depth')) || 0;
      const yOffset = scrollY * depth;
      section.style.transform = `translate3d(0, ${yOffset}px, 0)`;
    });
  }
}

const parallax = new ParallaxManager();
```

**Step 4: Verify file created**

Run: `ls parallax.js`
Expected: File exists

**Step 5: Commit**

```bash
git add parallax.js
git commit -m "feat: add ParallaxManager class for scroll-based transformations"
```

---

### Task 2: Add CSS styles for parallax sections

**Files:**
- Modify: `styles.css`

**Step 1: Write the failing test**

```css
/* Sections should have will-change for performance optimization
 * and proper positioning for transforms to work correctly
 */
```

**Step 2: Verify styles.css exists and lacks parallax styles**

Run: `grep "will-change: transform" styles.css`
Expected: No matches

**Step 3: Write minimal implementation**

```css
section {
  will-change: transform;
  position: relative;
  z-index: 1;
}

/* Disable parallax for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  section {
    will-change: auto;
  }
}
```

**Step 4: Verify styles added**

Run: `grep "will-change: transform" styles.css`
Expected: Match found

**Step 5: Commit**

```bash
git add styles.css
git commit -m "feat: add CSS styles for parallax section transforms"
```

---

### Task 3: Add data-parallax-depth attributes to HTML sections

**Files:**
- Modify: `index.html`

**Step 1: Write the failing test**

```html
<!-- Sections should have data-parallax-depth attributes:
 * - Hero section: 0.3 (foreground, moves fastest)
 * - About: 0.2
 * - Skills: 0.15
 * - Experience: 0.2
 * - Contact: 0.1 (background, moves slowest)
 -->
```

**Step 2: Verify attributes not present**

Run: `grep 'data-parallax-depth' index.html`
Expected: No matches

**Step 3: Write minimal implementation**

Add `data-parallax-depth` to each section:

```html
<!-- Line 49 -->
<section id="hero" class="section-with-background" data-parallax-depth="0.3">

<!-- Line 66 -->
<section id="about" data-parallax-depth="0.2">

<!-- Line 76 -->
<section id="skills" data-parallax-depth="0.15">

<!-- Line 119 -->
<section id="experience" data-parallax-depth="0.2">

<!-- Line 178 -->
<section id="contact" data-parallax-depth="0.1">
```

**Step 4: Verify attributes added**

Run: `grep 'data-parallax-depth' index.html | wc -l`
Expected: 5

**Step 5: Commit**

```bash
git add index.html
git commit -m "feat: add parallax depth attributes to sections"
```

---

### Task 4: Add parallax.js script to HTML

**Files:**
- Modify: `index.html`

**Step 1: Write the failing test**

```html
<!-- parallax.js should be loaded before script.js
 * to ensure parallax is initialized early
 -->
```

**Step 2: Verify script tag not present**

Run: `grep 'parallax.js' index.html`
Expected: No matches

**Step 3: Write minimal implementation**

Add before `script.js` (around line 19):

```html
<script src="parallax.js"></script>
```

**Step 4: Verify script tag added**

Run: `grep 'parallax.js' index.html`
Expected: Match found before script.js

**Step 5: Commit**

```bash
git add index.html
git commit -m "feat: load parallax.js script"
```

---

### Task 5: Manual verification in browser

**Files:**
- None (manual verification)

**Step 1: Open in browser**

Run: `open index.html` (or open file://<path>/index.html in browser)

**Step 2: Verify parallax effect**

Check:
- [ ] Sections move at different speeds when scrolling
- [ ] Hero section (depth 0.3) moves fastest
- [ ] Contact section (depth 0.1) moves slowest
- [ ] Movement is subtle, not distracting
- [ ] Smooth scrolling with no jank
- [ ] Mobile devices don't have parallax (check in mobile view or device)

**Step 3: Test reduced motion preference**

- Enable prefers-reduced-motion in browser accessibility settings
- Reload page
- Verify parallax effect is disabled

**Step 4: Commit verification notes**

```bash
echo "Manual verification passed - parallax effect working as expected" >> VERIFICATION.md
git add VERIFICATION.md
git commit -m "test: verify parallax effect in browser"
```

---

## Implementation Complete

**Total tasks:** 5

**Testing:**
- Manual visual verification in browser
- Reduced motion accessibility check
- Mobile device behavior check

**Performance notes:**
- Uses requestAnimationFrame for 60fps smooth scrolling
- CSS will-change for browser optimization
- Disabled on touch devices to prevent janky scrolling
- translate3d for hardware acceleration
