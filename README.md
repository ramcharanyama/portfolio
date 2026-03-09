# Yama Ram Charan — Portfolio Website

A cyberpunk-themed personal portfolio for an AI Engineer, featuring a live contact form connected to **Firebase Realtime Database** and **EmailJS** for instant email notifications.

---

## 📁 File Structure

```
portfolio/
├── index.html       # Main portfolio page
├── style.css        # All styles (dark cyber theme)
├── script.js        # All JS logic + Firebase + EmailJS
├── admin.html       # Admin dashboard to view & export contacts
├── ram.jpeg         # Your profile photo
└── maskit.png       # MaskIt AI project image
```

---

## ⚙️ Setup Guide

### Step 1 — EmailJS

1. Sign up at [emailjs.com](https://www.emailjs.com) (free)
2. Go to **Email Services** → Add Service → connect your Gmail
3. Go to **Email Templates** → Create template with this body:

```
A message by {{from_name}} has been received. Kindly respond at your earliest convenience.

Name:    {{from_name}}
Email:   {{from_email}}
Message: {{message}}
Sent at: {{sent_at}}
```

4. Copy your keys and paste them into `script.js`:

```js
emailjs_public_key:  "your_public_key",      // Account → General
emailjs_service_id:  "service_xxxxxxx",       // Email Services
emailjs_template_id: "template_xxxxxxx",      // Email Templates
```

---

### Step 2 — Firebase Realtime Database

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project → Add a **Web App**
3. Copy the config and paste it into `script.js` and `admin.html`:

```js
firebase: {
    apiKey:            "YOUR_API_KEY",
    authDomain:        "YOUR_PROJECT.firebaseapp.com",
    databaseURL:       "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
    projectId:         "YOUR_PROJECT",
    storageBucket:     "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId:             "YOUR_APP_ID"
}
```

4. Go to **Realtime Database** → Create Database → **Rules** tab → paste and publish:

```json
{
  "rules": {
    ".read": "true",
    ".write": "true"
  }
}
```

---

### Step 3 — Admin Dashboard

Open `admin.html` locally in your browser to manage all submissions.

- **Default password:** `yrc@admin2026`
- Change it by editing this line in `admin.html`:

```js
const ADMIN_PASSWORD = "yrc@admin2026";
```

**Features:**
- Live table of all contact submissions
- Search by name, email, or message
- Total count + today's count stats
- Export all data as **CSV** or **JSON**

> ⚠️ Keep `admin.html` local — do not upload it to your public hosting.

---

## 🚀 How It Works

When a visitor submits the contact form:

1. Their details are **saved to Firebase** Realtime Database instantly
2. An **email is sent to you** via EmailJS with their name, email, and message
3. You can view all submissions anytime in the **Admin Dashboard**
4. Export contacts as CSV or JSON whenever needed

---

## 🐛 Common Errors & Fixes

| Error | Fix |
|-------|-----|
| `Service ID not found` | Wrong `emailjs_service_id` in `script.js` |
| `Firebase databaseURL` warning | Wrong or missing `databaseURL` in Firebase config |
| `400 Bad Request` on EmailJS | Wrong public key or template ID |
| Form shows ERROR button | Open F12 → Console for the exact message |

---

## 🛠️ Built With

- HTML5, CSS3, Vanilla JavaScript
- [Firebase Realtime Database](https://firebase.google.com)
- [EmailJS](https://www.emailjs.com)
- [Particles.js](https://vincentgarreau.com/particles.js/)
- [Vanilla Tilt](https://micku7zu.github.io/vanilla-tilt.js/)
- [Font Awesome 6](https://fontawesome.com)
- [Google Fonts — Inter & Space Grotesk](https://fonts.google.com)

---

## 📬 Contact

**Yama Ram Charan**
- GitHub: [ramcharanyama](https://github.com/ramcharanyama)
- LinkedIn: [yama-ram-charan](https://www.linkedin.com/in/yama-ram-charan-4a8a4533b)
- Email: rcharan1867@gmail.com
- Mobile: +91 8328316908

---

*© 2026 Yama Ram Charan. Engineered in the Matrix.*
