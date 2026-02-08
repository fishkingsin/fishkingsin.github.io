# ScrollMagic Creative Portfolio Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a creative portfolio page (`creative-portfolio.html`) using ScrollMagic library with parallax effects and scroll-triggered animations.

**Architecture:** Single HTML file with embedded CSS and JavaScript. Uses ScrollMagic controller to manage scroll scenes, GSAP for animations, and a three-layer parallax system (background, content, foreground) per section.

**Tech Stack:** HTML5, CSS3, ScrollMagic 2.0.8, GSAP 3.12.2 (via CDN)

---

### Task 1: Create HTML structure with 5 parallax sections

**Files:**
- Create: `creative-portfolio.html`

**Step 1: Verify file doesn't exist**

Run: `ls creative-portfolio.html`
Expected: "No such file or directory"

**Step 2: Write the HTML structure**

Create `creative-portfolio.html` with this complete structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Creative Portfolio - ScrollMagic Demo</title>
  
  <!-- CDN Dependencies -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.8/ScrollMagic.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.8/plugins/animation.gsap.min.js"></script>
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      overflow-x: hidden;
    }
    
    .parallax-section {
      position: relative;
      height: 100vh;
      overflow: hidden;
    }
    
    .parallax-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 120%;
      will-change: transform;
    }
    
    .layer-bg {
      z-index: 1;
      background-size: cover;
      background-position: center;
    }
    
    .layer-content {
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 2rem;
      text-align: center;
    }
    
    .layer-fg {
      z-index: 3;
      pointer-events: none;
    }
    
    /* Animation classes */
    .reveal-up {
      opacity: 0;
      transform: translateY(50px);
    }
    
    .reveal-scale {
      opacity: 0;
      transform: scale(0.8);
    }
    
    /* Section specific styles */
    #hero .layer-content h1 {
      font-size: 4rem;
      color: white;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
      margin-bottom: 1rem;
    }
    
    #hero .layer-content p {
      font-size: 1.5rem;
      color: rgba(255,255,255,0.9);
    }
    
    #about .layer-content {
      flex-direction: row;
      gap: 3rem;
    }
    
    #about .about-image {
      width: 300px;
      height: 400px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 20px;
    }
    
    #about .about-text {
      max-width: 500px;
      text-align: left;
    }
    
    #about .about-text h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #333;
    }
    
    #about .about-text p {
      font-size: 1.1rem;
      line-height: 1.6;
      color: #666;
    }
    
    #projects .projects-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
      max-width: 1200px;
    }
    
    #projects .project-card {
      background: white;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }
    
    #projects .project-card:hover {
      transform: translateY(-10px);
    }
    
    #projects .project-image {
      height: 200px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }
    
    #projects .project-info {
      padding: 1.5rem;
    }
    
    #projects .project-info h3 {
      margin-bottom: 0.5rem;
      color: #333;
    }
    
    #projects .project-info p {
      color: #666;
      font-size: 0.9rem;
    }
    
    #skills .skills-container {
      max-width: 800px;
      width: 100%;
    }
    
    #skills .skill-item {
      margin-bottom: 2rem;
    }
    
    #skills .skill-item h3 {
      margin-bottom: 0.5rem;
      color: #333;
    }
    
    #skills .skill-bar {
      height: 10px;
      background: #e0e0e0;
      border-radius: 5px;
      overflow: hidden;
    }
    
    #skills .skill-fill {
      height: 100%;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      border-radius: 5px;
      width: 0;
      transition: width 1.5s ease-out;
    }
    
    #contact .contact-form {
      max-width: 600px;
      width: 100%;
      background: white;
      padding: 3rem;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.1);
    }
    
    #contact .contact-form h2 {
      margin-bottom: 2rem;
      color: #333;
      text-align: center;
    }
    
    #contact .form-group {
      margin-bottom: 1.5rem;
    }
    
    #contact .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #666;
    }
    
    #contact .form-group input,
    #contact .form-group textarea {
      width: 100%;
      padding: 1rem;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }
    
    #contact .form-group input:focus,
    #contact .form-group textarea:focus {
      outline: none;
      border-color: #667eea;
    }
    
    #contact button {
      width: 100%;
      padding: 1rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 1.1rem;
      cursor: pointer;
      transition: transform 0.3s, box-shadow 0.3s;
    }
    
    #contact button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
    }
    
    /* Decorative floating elements */
    .floating-shape {
      position: absolute;
      border-radius: 50%;
      opacity: 0.6;
    }
    
    .shape-1 {
      width: 100px;
      height: 100px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      top: 20%;
      right: 10%;
    }
    
    .shape-2 {
      width: 150px;
      height: 150px;
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      bottom: 30%;
      left: 5%;
    }
    
    .shape-3 {
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
      top: 60%;
      right: 20%;
    }
    
    /* Mobile responsive */
    @media (max-width: 768px) {
      #hero .layer-content h1 {
        font-size: 2.5rem;
      }
      
      #about .layer-content {
        flex-direction: column;
      }
      
      #about .about-image {
        width: 200px;
        height: 250px;
      }
      
      #projects .projects-grid {
        grid-template-columns: 1fr;
        padding: 1rem;
      }
    }
    
    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .parallax-layer {
        will-change: auto;
      }
      
      .reveal-up,
      .reveal-scale {
        opacity: 1;
        transform: none;
      }
    }
  </style>
</head>
<body>
  <!-- Section 1: Hero -->
  <section class="parallax-section" id="hero">
    <div class="parallax-layer layer-bg" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
    <div class="parallax-layer layer-content">
      <h1 class="reveal-up">Creative Portfolio</h1>
      <p class="reveal-up">Designer & Developer</p>
    </div>
    <div class="parallax-layer layer-fg">
      <div class="floating-shape shape-1"></div>
      <div class="floating-shape shape-2"></div>
      <div class="floating-shape shape-3"></div>
    </div>
  </section>
  
  <!-- Section 2: About -->
  <section class="parallax-section" id="about">
    <div class="parallax-layer layer-bg" style="background: #f8f9fa;"></div>
    <div class="parallax-layer layer-content">
      <div class="about-image reveal-scale"></div>
      <div class="about-text">
        <h2 class="reveal-up">About Me</h2>
        <p class="reveal-up">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
        <p class="reveal-up">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
      </div>
    </div>
  </section>
  
  <!-- Section 3: Projects -->
  <section class="parallax-section" id="projects">
    <div class="parallax-layer layer-bg" style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);"></div>
    <div class="parallax-layer layer-content">
      <div class="projects-grid">
        <div class="project-card reveal-up">
          <div class="project-image"></div>
          <div class="project-info">
            <h3>Project One</h3>
            <p>Creative design project with stunning visuals</p>
          </div>
        </div>
        <div class="project-card reveal-up">
          <div class="project-image" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);"></div>
          <div class="project-info">
            <h3>Project Two</h3>
            <p>Web development with modern technologies</p>
          </div>
        </div>
        <div class="project-card reveal-up">
          <div class="project-image" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);"></div>
          <div class="project-info">
            <h3>Project Three</h3>
            <p>Mobile app design and development</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Section 4: Skills -->
  <section class="parallax-section" id="skills">
    <div class="parallax-layer layer-bg" style="background: white;"></div>
    <div class="parallax-layer layer-content">
      <div class="skills-container">
        <h2 class="reveal-up" style="text-align: center; margin-bottom: 3rem; color: #333;">Skills</h2>
        <div class="skill-item reveal-up">
          <h3>Design</h3>
          <div class="skill-bar">
            <div class="skill-fill" data-width="90%"></div>
          </div>
        </div>
        <div class="skill-item reveal-up">
          <h3>Development</h3>
          <div class="skill-bar">
            <div class="skill-fill" data-width="85%"></div>
          </div>
        </div>
        <div class="skill-item reveal-up">
          <h3>Animation</h3>
          <div class="skill-bar">
            <div class="skill-fill" data-width="80%"></div>
          </div>
        </div>
        <div class="skill-item reveal-up">
          <h3>UI/UX</h3>
          <div class="skill-bar">
            <div class="skill-fill" data-width="88%"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Section 5: Contact -->
  <section class="parallax-section" id="contact">
    <div class="parallax-layer layer-bg" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
    <div class="parallax-layer layer-content">
      <form class="contact-form reveal-up">
        <h2>Get In Touch</h2>
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required>
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="4" required></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
    <div class="parallax-layer layer-fg">
      <div class="floating-shape shape-1" style="top: 10%; left: 5%;"></div>
      <div class="floating-shape shape-2" style="bottom: 10%; right: 5%; width: 200px; height: 200px;"></div>
    </div>
  </section>

  <script>
    // Initialize ScrollMagic controller
    const controller = new ScrollMagic.Controller();
    
    // Check for touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Only enable parallax on non-touch devices without reduced motion preference
    if (!isTouchDevice && !prefersReducedMotion) {
      // Create parallax scenes for each section
      document.querySelectorAll('.parallax-section').forEach((section, index) => {
        const bg = section.querySelector('.layer-bg');
        const fg = section.querySelector('.layer-fg');
        
        // Background parallax (slowest)
        if (bg) {
          new ScrollMagic.Scene({
            triggerElement: section,
            triggerHook: 1,
            duration: '200%'
          })
          .setTween(gsap.to(bg, {y: '30%', ease: 'none'}))
          .addTo(controller);
        }
        
        // Foreground parallax (fastest)
        if (fg) {
          new ScrollMagic.Scene({
            triggerElement: section,
            triggerHook: 1,
            duration: '200%'
          })
          .setTween(gsap.to(fg, {y: '-50%', ease: 'none'}))
          .addTo(controller);
        }
      });
      
      // Reveal animations for content
      document.querySelectorAll('.reveal-up').forEach((el, index) => {
        new ScrollMagic.Scene({
          triggerElement: el,
          triggerHook: 0.8,
          reverse: false
        })
        .setTween(gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: 'power2.out'
        }))
        .addTo(controller);
      });
      
      document.querySelectorAll('.reveal-scale').forEach(el => {
        new ScrollMagic.Scene({
          triggerElement: el,
          triggerHook: 0.8,
          reverse: false
        })
        .setTween(gsap.to(el, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)'
        }))
        .addTo(controller);
      });
      
      // Skill bars animation
      document.querySelectorAll('.skill-fill').forEach(bar => {
        const width = bar.getAttribute('data-width');
        new ScrollMagic.Scene({
          triggerElement: bar,
          triggerHook: 0.9,
          reverse: false
        })
        .on('enter', () => {
          bar.style.width = width;
        })
        .addTo(controller);
      });
    } else {
      // Fallback: Show all content without animations
      document.querySelectorAll('.reveal-up, .reveal-scale').forEach(el => {
        el.style.opacity = 1;
        el.style.transform = 'none';
      });
      
      document.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.getAttribute('data-width');
      });
    }
  </script>
</body>
</html>
```

**Step 3: Verify file created**

Run: `ls creative-portfolio.html`
Expected: File exists

**Step 4: Check HTML structure**

Run: `grep -c "parallax-section" creative-portfolio.html`
Expected: 6 (5 sections + 1 in CSS)

**Step 5: Verify CDN links**

Run: `grep "cdnjs.cloudflare.com" creative-portfolio.html | wc -l`
Expected: 3 (GSAP, ScrollMagic, ScrollMagic plugin)

**Step 6: Commit**

```bash
git add creative-portfolio.html
git commit -m "feat: create ScrollMagic creative portfolio with parallax effects"
```

---

### Task 2: Test page functionality manually

**Files:**
- None (manual verification)

**Step 1: Open in browser**

Run: `open creative-portfolio.html` (or open file://<path>/creative-portfolio.html in browser)

**Step 2: Verify ScrollMagic loads**

Check browser console for:
- No 404 errors on CDN links
- No JavaScript errors
- ScrollMagic controller initialized

**Step 3: Test parallax effects**

Scroll through the page and verify:
- [ ] Hero section background moves slower than content
- [ ] Floating shapes move faster (foreground parallax)
- [ ] Smooth 60fps scrolling
- [ ] About section image scales in on scroll
- [ ] Project cards fade up with stagger effect
- [ ] Skills bars fill when section enters viewport
- [ ] Contact form fades in

**Step 4: Test mobile/responsive**

- Resize browser to mobile width (< 768px)
- Verify layout adjusts correctly
- Verify parallax disabled on touch (check via dev tools device emulation)

**Step 5: Test accessibility**

- Enable prefers-reduced-motion in browser dev tools
- Reload page
- Verify animations disabled and all content visible immediately

**Step 6: Commit verification**

```bash
echo "Manual verification passed - ScrollMagic portfolio working correctly" >> VERIFICATION.md
git add VERIFICATION.md
git commit -m "test: verify ScrollMagic portfolio functionality"
```

---

## Implementation Complete

**Total tasks:** 2

**Features implemented:**
- 5 full-viewport parallax sections
- Three-layer parallax system (background, content, foreground)
- GSAP-powered scroll-triggered animations
- Staggered reveal effects
- Skill progress bars with scroll triggers
- Mobile responsive design
- Accessibility support (prefers-reduced-motion)
- Touch device detection (disables parallax)

**Files created:**
- `creative-portfolio.html` - Complete standalone portfolio page

**CDN Dependencies:**
- GSAP 3.12.2
- ScrollMagic 2.0.8
- ScrollMagic GSAP plugin

**Customization points:**
- Replace placeholder text (Lorem Ipsum) with real content
- Add real images to replace gradient placeholders
- Adjust `data-width` values on skill bars
- Modify parallax speeds by changing GSAP tween values
- Add more sections or modify existing ones
