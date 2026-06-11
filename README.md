# Happy Birthday Miss Natvral 🎉

A premium, mobile-first, single-page birthday website experience. Built with love and designed to feel like a personal digital gift.

![Preview](https://via.placeholder.com/800x600/1a0a2e/b8a2e0?text=Happy+Birthday+Miss+Natvral)

## ✨ Features

- **Cinematic Hero Section** — Soft animated gradient background with floating glow particles
- **Memory Gallery** — 3-card showcase with emotional captions and zoom-on-hover effects
- **Interactive Wishes** — Tap-to-reveal wish cards with smooth 3D flip animations
- **Locked Message** — Password-protected special message with unlock animation
- **Background Music** — Floating play/pause control (mobile-safe)
- **Smooth Animations** — Scroll-triggered fade-ins, parallax effects, and micro-interactions
- **Mobile-First** — Optimized for iPhone 13 mini and all mobile devices
- **No Frameworks** — Pure HTML, CSS, and vanilla JavaScript

## 📁 Project Structure

```
birthday-page/
├── index.html              # Main HTML file
├── style.css               # All styles and animations
├── script.js               # Interactive functionality
├── README.md               # This file
└── assets/
    ├── images/             # Photo assets
    │   ├── memory1.jpg     # "First time I saw you"
    │   ├── memory2.jpg     # "The moment we clicked"
    │   └── memory3.jpg     # "Who you are becoming"
    └── music/
        └── background.mp3  # Background music file
```

## 🚀 Quick Start

### 1. Replace Images

Place your 3 photos in the `assets/images/` folder:

| File | Description | Recommended Size |
|------|-------------|------------------|
| `memory1.jpg` | First time I saw you | 800×600px (4:3) |
| `memory2.jpg` | The moment we clicked | 800×600px (4:3) |
| `memory3.jpg` | Who you are becoming | 800×600px (4:3) |

> **Tip:** For best results, use photos with similar color tones or apply a subtle purple/pink filter.

### 2. Change the Password

Open `script.js` and find the `CONFIG` object at the top:

```javascript
const CONFIG = {
    // Password for the locked message section
    // Change this to your desired password
    password: 'natvral',
    // ...
};
```

Replace `'natvral'` with your chosen password. Choose something meaningful that Natvral would guess!

### 3. Replace Background Music

Place your music file in `assets/music/` and name it `background.mp3`.

**Recommended:**
- Format: MP3
- Duration: 2-3 minutes (loops seamlessly)
- Style: Soft instrumental, piano, or ambient

> **Note:** Music only starts after user interaction due to mobile browser autoplay policies.

### 4. Customize Content (Optional)

#### Edit Wishes
Open `index.html` and find the `.wishes-container` section. Each `.wish-card` contains:
- `.wish-front` — The hidden state (shows number and "Tap to reveal")
- `.wish-back` — The revealed wish text

```html
<div class="wish-card" data-revealed="false" tabindex="0" role="button">
    <div class="wish-front">
        <span class="wish-number">01</span>
        <p class="wish-prompt">Tap to reveal</p>
    </div>
    <div class="wish-back">
        <p class="wish-text">Your wish text here...</p>
    </div>
</div>
```

#### Edit the Special Message
Open `index.html` and find the `.message-body` section inside `#messageContent`. Edit the paragraphs to personalize your message.

#### Edit Memory Captions
Open `index.html` and find the `.gallery-container` section. Each `.memory-card` has a `.memory-title` and `.memory-text` you can customize.

## 🌐 Deployment

### GitHub Pages (Recommended)

1. Create a new repository on GitHub
2. Push all files to the repository
3. Go to **Settings → Pages**
4. Select **main branch** as source
5. Your site will be live at `https://yourusername.github.io/repo-name/`

### Netlify (Drag & Drop)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the entire project folder
3. Your site will be live instantly

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts

## 🎨 Design System

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| Deep Purple | `#1a0a2e` | Primary background |
| Royal Purple | `#2d1b69` | Gradient transitions |
| Medium Purple | `#5b3d8e` | Cards, buttons |
| Soft Purple | `#8b6fc4` | Accents |
| Light Purple | `#b8a2e0` | Highlights, text |
| Blush Pink | `#f0c8d0` | Accent highlights |
| Rose Pink | `#e8a0b0` | Error states |

### Typography

- **Font Family:** Inter (Google Fonts)
- **Weights:** 200 (light), 300 (regular), 400 (medium)
- **Letter Spacing:** 0.02em (body), 0.05em+ (headings)

## 📱 Mobile Optimization

- Viewport optimized for iPhone 13 mini (375×812px)
- Touch-friendly tap targets (min 48×48px)
- No horizontal scrolling
- Smooth 60fps animations
- Reduced motion support for accessibility
- Double-tap zoom prevention on iOS

## 🔧 Configuration

All configurable options are in `script.js`:

```javascript
const CONFIG = {
    password: 'natvral',        // Unlock password
    
    particles: {
        count: 15,              // Number of floating particles
        minSize: 3,             // Minimum particle size (px)
        maxSize: 8,             // Maximum particle size (px)
        minDuration: 15,        // Min animation duration (s)
        maxDuration: 30,        // Max animation duration (s)
        colors: [...]           // Particle colors
    },
    
    intersectionThreshold: 0.15 // Scroll animation trigger point
};
```

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible states
- Reduced motion media query support
- High contrast text on dark backgrounds

## 📄 Browser Support

- Chrome 80+
- Safari 13+
- Firefox 75+
- Edge 80+
- iOS Safari 13+
- Chrome for Android 80+

## 📝 License

This project is created for personal use. Feel free to modify and use for your own birthday projects!

## 🙏 Credits

- **Font:** [Inter](https://fonts.google.com/specimen/Inter) by Rasmus Andersson
- **Design Inspiration:** Apple's human interface guidelines
- **Built with:** ❤️ for Miss Natvral

---

**Made with 🤍 for Miss Natvral**