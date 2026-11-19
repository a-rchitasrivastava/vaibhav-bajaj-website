# 🎂 Vaibhav's Birthday Website — How to Personalise

## 📁 Project Structure
```
vaibhav-bajaj-website/
├── index.html          ← Main webpage (don't need to edit)
├── style.css           ← All styles and design (don't need to edit)
├── script.js           ← All interactive logic (don't need to edit)
├── content.js          ← ✏️ EDIT THIS FILE to personalise everything
└── assets/
    ├── photos/         ← 📸 Drop your photos here
    ├── music/          ← 🎵 Drop your music file here
    └── illustrations/  ← (optional extra images)
```

---

## 1. 📸 Adding Your Photographs

1. Copy your photo files into the **`assets/photos/`** folder.
2. Open **`content.js`**.
3. Find the `PHOTOS` array near the top.
4. Update the `file`, `caption`, and `note` for each entry.

**Example:**
```js
{
  file: "assets/photos/photo1.jpg",   // ← your filename
  caption: "Our First Date 💕",        // ← shown below photo
  note: "That day changed everything. 🌸"  // ← personal note
}
```

> To add more photos, just copy and paste a `{}` block and add a comma.

---

## 2. 📝 Editing MCQs and Correct Answers

1. Open **`content.js`**.
2. Find the `QUIZ_QUESTIONS` array.
3. Each question looks like:
```js
{
  question: "Who started talking first? 💬",
  options: ["Your girl (me!)", "You (Vaibhav)"],
  correctIndex: 0,   // ← 0 = first option, 1 = second option
  emoji: "🗨️"
}
```
4. Change `question`, `options`, and `correctIndex` as needed.
5. Questions 10–20 are marked with `// ✏️ EDIT` comments for easy finding.

---

## 3. ❤️ Editing the 21 Reasons

1. Open **`content.js`**.
2. Find the `LOVE_REASONS` array.
3. Each line is one reason displayed on a card.
4. Replace any text you want — keep the quotes and comma!

---

## 4. 💌 Adding Your Love Letter

1. Open **`content.js`**.
2. Find the `LOVE_LETTER` object.
3. Edit `salutation`, `body`, and `closing`:
```js
const LOVE_LETTER = {
  salutation: "My Dearest Suar, 🐷❤️",
  body: `Your personal message here...
  
  You can use multiple lines like this.
  Just press Enter inside the backticks.`,
  closing: "Forever yours 💌"
};
```

---

## 5. 🎵 Adding Your Music

1. Put your MP3 file in **`assets/music/`**.
2. Name it **`our-song.mp3`** *(or change the name in content.js)*:
```js
const MUSIC_FILE = "assets/music/our-song.mp3";
```
3. Music will auto-play (or play on first click) when the website is open.
4. If the file is missing, the player shows "No song yet" gracefully.

---

## 6. 🚀 Publishing the Website

### Option A — Netlify (Recommended, Easiest)

1. Go to **[netlify.com](https://netlify.com)** → Sign up free.
2. Click **"Add new site"** → **"Deploy manually"**.
3. Drag and drop the entire **`vaibhav-bajaj-website`** folder into the browser.
4. Netlify gives you a live URL instantly (e.g. `https://your-site.netlify.app`).
5. Share the URL with Vaibhav! 🎉

### Option B — GitHub Pages

1. Create a free account at **[github.com](https://github.com)**.
2. Create a new repository (e.g. `vaibhav-birthday`), set it to **Public**.
3. Upload all files from `vaibhav-bajaj-website/` to the repository.
4. Go to **Settings → Pages → Source: main branch / root**.
5. Your site will be live at `https://yourusername.github.io/vaibhav-birthday/`.

### Option C — View Locally (No internet needed)

Just double-click **`index.html`** in the folder to open it in your browser.

---

## 7. 🎨 Quick Colour Changes

Open `style.css` and look for the `:root` section at the top:
```css
:root {
  --bg:         #FFF5F7;   /* background */
  --pink-light: #F8DDE7;   /* light pink */
  --pink:       #EBA8BF;   /* pink */
  --burgundy:   #831D3D;   /* buttons, headings */
  --white:      #FFFFFF;
}
```
Change any hex code to customise colours site-wide.

---

*Made with love 🌸 — for Vaibhav's Birthday ❤️*
