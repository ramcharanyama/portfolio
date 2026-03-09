// ============================================================
//  CONFIGURATION — Fill these in after setting up your accounts
// ============================================================
const CONFIG = {
    // 1. EmailJS — https://www.emailjs.com/
    //    Dashboard → Account → Public Key
    emailjs_public_key: "6MjKzHe-6U47pv5fm",
    //    Dashboard → Email Services → Service ID
    emailjs_service_id: "service_l2tnerh",
    //    Dashboard → Email Templates → Template ID
    emailjs_template_id: "template_r148rfk",

    // 2. Firebase — https://console.firebase.google.com/
    //    Project Settings → Your Apps → SDK config
    firebase: {
        apiKey: "AIzaSyAjrmfgZTJ-ASgTtvi8HF25psDldV6DOcA",
        authDomain: "portfolio-contact-93461.firebaseapp.com",
        projectId: "portfolio-contact-93461",
        databaseURL: "https://portfolio-contact-93461-default-rtdb.firebaseio.com",
        storageBucket: "portfolio-contact-93461.firebasestorage.app",
        messagingSenderId: "463048879593",
        appId: "1:463048879593:web:ea3d23a4f9f2dff7262f78"
    }
};

// ============================================================
//  FIREBASE INIT
// ============================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseApp = initializeApp(CONFIG.firebase);
const db = getDatabase(firebaseApp);

// ============================================================
//  EMAILJS INIT
// ============================================================
emailjs.init(CONFIG.emailjs_public_key);

// ============================================================
//  CONTACT FORM — Save to Firebase + Send Email
// ============================================================
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const origHTML = btn.innerHTML;

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) return;

        // — Loading state —
        btn.disabled = true;
        btn.innerHTML = 'TRANSMITTING <i class="fas fa-spinner fa-spin"></i>';
        btn.style.boxShadow = '0 0 20px rgba(0,240,255,0.8)';

        const payload = {
            name,
            email,
            message,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        };

        try {
            // 1. Save to Firebase Realtime Database
            await Promise.all([
                push(ref(db, 'contacts'), payload),

                emailjs.send(CONFIG.emailjs_service_id, CONFIG.emailjs_template_id, {
                    from_name: name,
                    from_email: email,
                    message: message,
                    reply_to: email,
                    sent_at: payload.date
                })
            ]);

            // — Success state —
            btn.innerHTML = 'DATA STREAM SENT <i class="fas fa-check"></i>';
            btn.style.background = '#00f0ff';
            btn.style.color = '#000';
            form.reset();

            setTimeout(() => {
                btn.innerHTML = origHTML;
                btn.style.background = '';
                btn.style.color = '';
                btn.style.boxShadow = '';
                btn.disabled = false;
            }, 3000);

        } catch (err) {
            console.error('Submission error:', err);
            btn.innerHTML = 'ERROR — TRY AGAIN <i class="fas fa-exclamation-triangle"></i>';
            btn.style.background = '#ff003c';
            btn.style.color = '#fff';

            setTimeout(() => {
                btn.innerHTML = origHTML;
                btn.style.background = '';
                btn.style.color = '';
                btn.style.boxShadow = '';
                btn.disabled = false;
            }, 3000);
        }
    });
}

// ============================================================
//  CUSTOM CURSOR GLOW
// ============================================================
const mouseGlow = document.getElementById('mouse-glow');
if (mouseGlow) {
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            mouseGlow.style.left = `${e.clientX}px`;
            mouseGlow.style.top = `${e.clientY}px`;
        });
    });
    document.addEventListener('mouseenter', () => mouseGlow.style.opacity = '1');
    document.addEventListener('mouseleave', () => mouseGlow.style.opacity = '0');
}

// ============================================================
//  TYPING EFFECT
// ============================================================
const typingText = document.querySelector('.typewriter-container .output-text');
if (typingText) {
    const textData = typingText.innerHTML;
    typingText.innerHTML = '';
    let i = 0;
    const typeWriter = () => {
        if (i < textData.length) {
            typingText.innerHTML += textData.charAt(i++);
            setTimeout(typeWriter, Math.random() * 50 + 20);
        }
    };
    setTimeout(typeWriter, 1500);
}

// ============================================================
//  SCROLL REVEAL
// ============================================================
const revealElements = document.querySelectorAll('.reveal-up');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            const counters = entry.target.querySelectorAll('.counter');
            if (counters.length > 0) runCounters(counters);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
revealElements.forEach(el => revealObserver.observe(el));

// ============================================================
//  COUNTERS
// ============================================================
function runCounters(counters) {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const isDecimal = counter.hasAttribute('data-decimals');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const update = () => {
            current += step;
            if (current < target) {
                counter.innerText = isDecimal ? current.toFixed(2) : Math.ceil(current);
                requestAnimationFrame(update);
            } else {
                counter.innerText = isDecimal ? target.toFixed(2) : target;
            }
        };
        update();
    });
}

// ============================================================
//  VANILLA TILT
// ============================================================
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".interactive"), {
        max: 3, speed: 1000, glare: true, "max-glare": 0.1, scale: 1.01
    });
}

// ============================================================
//  PARTICLES
// ============================================================
if (typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
        particles: {
            number: { value: 50, density: { enable: true, value_area: 1000 } },
            color: { value: ["#00f0ff", "#7000ff"] },
            shape: { type: "circle" },
            opacity: { value: 0.3, random: true, anim: { enable: true, speed: 1 } },
            size: { value: 2, random: true },
            line_linked: { enable: true, distance: 180, color: "#00f0ff", opacity: 0.15, width: 1 },
            move: { enable: true, speed: 0.8, direction: "none", random: true, out_mode: "out" }
        },
        interactivity: {
            detect_on: "window",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });
}

// ============================================================
//  NAVBAR SCROLL
// ============================================================
window.addEventListener('scroll', () => {
    document.querySelector('.navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// ============================================================
//  MOBILE NAV (fixed toggle)
// ============================================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
    let navOpen = false;
    hamburger.addEventListener('click', () => {
        navOpen = !navOpen;
        if (navOpen) {
            navLinks.style.cssText = `
                display: flex; flex-direction: column; position: absolute;
                top: 100%; left: 0; width: 100%;
                background: rgba(5,5,8,0.97); padding: 20px 0; z-index: 999;
                border-bottom: 1px solid rgba(0,240,255,0.15);
            `;
        } else {
            navLinks.style.cssText = 'display: none;';
        }
    });
}
