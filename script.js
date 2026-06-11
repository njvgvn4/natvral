/**
 * Birthday Miss Natvral - Interactive JavaScript
 * Premium mobile-first birthday experience
 */

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    // Password for the locked message section
    // Change this to your desired password. But this is the desired password all the same.
    password: 'natvral',
    
    // Particle settings
    particles: {
        count: 15,
        minSize: 3,
        maxSize: 8,
        minDuration: 15,
        maxDuration: 30,
        colors: ['rgba(184, 162, 224, 0.4)', 'rgba(240, 200, 208, 0.3)', 'rgba(139, 111, 196, 0.3)']
    },
    
    // Scroll animation threshold
    intersectionThreshold: 0.15
};

// ============================================
// DOM ELEMENTS
// ============================================

const elements = {
    // Music
    musicToggle: document.getElementById('musicToggle'),
    backgroundMusic: document.getElementById('backgroundMusic'),
    
    // Particles
    particlesContainer: document.getElementById('particles'),
    
    // Message Section
    lockScreen: document.getElementById('lockScreen'),
    messageContent: document.getElementById('messageContent'),
    passwordInput: document.getElementById('passwordInput'),
    unlockBtn: document.getElementById('unlockBtn'),
    errorMessage: document.getElementById('errorMessage'),
    messageClose: document.getElementById('messageClose')
};

// ============================================
// PARTICLE SYSTEM
// ============================================

class ParticleSystem {
    constructor(container, config) {
        this.container = container;
        this.config = config;
        this.particles = [];
        this.init();
    }
    
    init() {
        for (let i = 0; i < this.config.count; i++) {
            this.createParticle(i);
        }
    }
    
    createParticle(index) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = this.randomBetween(this.config.minSize, this.config.maxSize);
        const duration = this.randomBetween(this.config.minDuration, this.config.maxDuration);
        const delay = this.randomBetween(0, duration / 2);
        const startX = this.randomBetween(0, 100);
        const drift = this.randomBetween(-80, 80);
        const color = this.config.colors[index % this.config.colors.length];
        
        // Apply styles
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${startX}%;
            --drift: ${drift}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            background: radial-gradient(circle, ${color} 0%, transparent 70%);
        `;
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }
    
    randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }
}

// ============================================
// MUSIC PLAYER
// ============================================

class MusicPlayer {
    constructor(toggleBtn, audioElement) {
        this.toggleBtn = toggleBtn;
        this.audio = audioElement;
        this.isPlaying = false;
        this.init();
    }
    
    init() {
        this.toggleBtn.addEventListener('click', () => this.toggle());
        
        // Update button state when audio events occur
        this.audio.addEventListener('play', () => this.updateState(true));
        this.audio.addEventListener('pause', () => this.updateState(false));
        this.audio.addEventListener('ended', () => this.updateState(false));
        
        // Set initial state
        this.updateState(false);
    }
    
    toggle() {
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play().catch(error => {
                console.log('Audio playback failed:', error);
                this.showError();
            });
        }
    }
    
    updateState(playing) {
        this.isPlaying = playing;
        this.toggleBtn.classList.toggle('playing', playing);
        this.toggleBtn.classList.toggle('paused', !playing);
    }
    
    showError() {
        // Visual feedback for audio error
        this.toggleBtn.style.borderColor = 'var(--pink-rose)';
        setTimeout(() => {
            this.toggleBtn.style.borderColor = '';
        }, 1000);
    }
}

// ============================================
// WISH CARDS
// ============================================

class WishCards {
    constructor() {
        this.cards = document.querySelectorAll('.wish-card');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            // Create inner wrapper for 3D flip
            const inner = document.createElement('div');
            inner.className = 'wish-card-inner';
            
            // Move existing content to inner
            const front = card.querySelector('.wish-front');
            const back = card.querySelector('.wish-back');
            
            if (front && back) {
                inner.appendChild(front);
                inner.appendChild(back);
                card.appendChild(inner);
            }
            
            // Add click/tap handler
            card.addEventListener('click', () => this.reveal(card));
            
            // Add keyboard support
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.reveal(card);
                }
            });
        });
    }
    
    reveal(card) {
        const isAlreadyRevealed = card.dataset.revealed === 'true';
        
        // Toggle this card
        card.dataset.revealed = !isAlreadyRevealed;
        
        // Add haptic feedback simulation
        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
    }
}

// ============================================
// MESSAGE LOCK SYSTEM
// ============================================

class MessageLock {
    constructor(lockScreen, messageContent, passwordInput, unlockBtn, errorMessage, closeBtn) {
        this.lockScreen = lockScreen;
        this.messageContent = messageContent;
        this.passwordInput = passwordInput;
        this.unlockBtn = unlockBtn;
        this.errorMessage = errorMessage;
        this.closeBtn = closeBtn;
        this.isUnlocked = false;
        this.init();
    }
    
    init() {
        // Unlock button click
        this.unlockBtn.addEventListener('click', () => this.attemptUnlock());
        
        // Enter key in password input
        this.passwordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.attemptUnlock();
            }
        });
        
        // Clear error on input
        this.passwordInput.addEventListener('input', () => {
            this.errorMessage.classList.remove('visible');
        });
        
        // Close message
        this.closeBtn.addEventListener('click', () => this.closeMessage());
    }
    
    attemptUnlock() {
        const enteredPassword = this.passwordInput.value.trim();
        
        if (enteredPassword === CONFIG.password) {
            this.unlock();
        } else {
            this.showError();
        }
    }
    
    unlock() {
        this.isUnlocked = true;
        
        // Animate lock screen away
        this.lockScreen.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        this.lockScreen.style.opacity = '0';
        this.lockScreen.style.transform = 'scale(0.9) translateY(-20px)';
        
        setTimeout(() => {
            this.lockScreen.classList.add('hidden');
            this.lockScreen.style.display = 'none';
            
            // Reveal message
            this.messageContent.classList.remove('hidden');
            
            // Scroll to message
            this.messageContent.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 600);
    }
    
    showError() {
        this.errorMessage.classList.add('visible');
        
        // Shake animation
        this.passwordInput.style.animation = 'none';
        this.passwordInput.offsetHeight; // Trigger reflow
        this.passwordInput.style.animation = 'shake 0.4s ease';
        
        // Clear input
        this.passwordInput.value = '';
        this.passwordInput.focus();
    }
    
    closeMessage() {
        // Animate message away
        this.messageContent.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        this.messageContent.style.opacity = '0';
        this.messageContent.style.transform = 'scale(0.95) translateY(20px)';
        
        setTimeout(() => {
            this.messageContent.classList.add('hidden');
            this.messageContent.style.display = 'none';
            
            // Show lock screen again
            this.lockScreen.style.display = 'block';
            requestAnimationFrame(() => {
                this.lockScreen.style.opacity = '1';
                this.lockScreen.style.transform = 'scale(1) translateY(0)';
            });
            
            // Reset
            this.passwordInput.value = '';
            this.errorMessage.classList.remove('visible');
            this.isUnlocked = false;
        }, 600);
    }
}

// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================

class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in-section, .section-header');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        
                        // Optionally unobserve after animation
                        // observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: CONFIG.intersectionThreshold,
                rootMargin: '0px 0px -50px 0px'
            }
        );
        
        this.elements.forEach(el => observer.observe(el));
    }
}

// ============================================
// PARALLAX EFFECT FOR HERO
// ============================================

class ParallaxEffect {
    constructor() {
        this.hero = document.getElementById('hero');
        this.heroContent = this.hero?.querySelector('.hero-content');
        this.heroGlow = this.hero?.querySelector('.hero-glow');
        this.init();
    }
    
    init() {
        if (!this.hero || !this.heroContent) return;
        
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.update();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
    
    update() {
        const scrollY = window.scrollY;
        const heroHeight = this.hero.offsetHeight;
        
        // Only apply when hero is in view
        if (scrollY > heroHeight) return;
        
        const progress = scrollY / heroHeight;
        const maxTranslate = 50;
        
        // Move content up slightly
        this.heroContent.style.transform = `translateY(${progress * maxTranslate}px)`;
        this.heroContent.style.opacity = 1 - progress * 0.5;
        
        // Move glow differently for depth
        if (this.heroGlow) {
            this.heroGlow.style.transform = `translate(-50%, -50%) translateY(${progress * -20}px) scale(${1 + progress * 0.2})`;
        }
    }
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// ADD SHAKE ANIMATION FOR ERROR
// ============================================

function addShakeAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-8px); }
            40% { transform: translateX(8px); }
            60% { transform: translateX(-4px); }
            80% { transform: translateX(4px); }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// PREVENT DOUBLE-TAP ZOOM ON IOS
// ============================================

function preventDoubleTapZoom() {
    let lastTouchEnd = 0;
    
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });
}

// ============================================
// INITIALIZE EVERYTHING
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    new ParticleSystem(elements.particlesContainer, CONFIG.particles);
    
    // Initialize music player
    new MusicPlayer(elements.musicToggle, elements.backgroundMusic);
    
    // Initialize wish cards
    new WishCards();
    
    // Initialize message lock
    new MessageLock(
        elements.lockScreen,
        elements.messageContent,
        elements.passwordInput,
        elements.unlockBtn,
        elements.errorMessage,
        elements.messageClose
    );
    
    // Initialize scroll animations
    new ScrollAnimations();
    
    // Initialize parallax effect
    new ParallaxEffect();
    
    // Initialize smooth scroll
    initSmoothScroll();
    
    // Add shake animation
    addShakeAnimation();
    
    // Prevent double-tap zoom on iOS
    preventDoubleTapZoom();
    
    // Log ready state
    console.log('🎉 Birthday page ready for Miss Natvral!');
});

// ============================================
// HANDLE PAGE VISIBILITY
// ============================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause music when page is hidden
        if (elements.backgroundMusic && !elements.backgroundMusic.paused) {
            elements.backgroundMusic.dataset.wasPlaying = 'true';
            elements.backgroundMusic.pause();
        }
    } else {
        // Resume music when page is visible (if it was playing)
        if (elements.backgroundMusic && elements.backgroundMusic.dataset.wasPlaying === 'true') {
            elements.backgroundMusic.play().catch(() => {});
            elements.backgroundMusic.dataset.wasPlaying = 'false';
        }
    }
});

// ============================================
// HANDLE AUDIO CONTEXT FOR AUTOPLAY POLICY
// ============================================

// First user interaction triggers audio context
let audioInitialized = false;

const music = document.getElementById("BackgroundMusic");
music.volume = 0.2;

document.addEventListener('click', () => {
    if (!audioInitialized) {
        audioInitialized = true;
        // Audio is now ready to play on user command
    }
}, { once: true });

document.addEventListener('touchstart', () => {
    if (!audioInitialized) {
        audioInitialized = true;
    }
}, { once: true });