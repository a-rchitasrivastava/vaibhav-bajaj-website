// ============================================================
//  CONTENT.JS — All editable personal content lives here!
//  Edit this file to personalise the website.
// ============================================================

// ── Relationship Start Date ──────────────────────────────────
const RELATIONSHIP_START = new Date("2025-09-07T00:00:00");

// ── Music ────────────────────────────────────────────────────
const MUSIC_FILE = "assets/music/our-song.mp3";

// ── Photos (add filenames from assets/photos/) ───────────────
// Each entry: { file, caption, note }
const PHOTOS = [
  {
    file: "assets/photos/photo1.jpeg",
    caption: "Just Us Two 🌸",
    note: "My favourite kind of picture — the ones that capture exactly how happy you make me. 💕"
  },
  {
    file: "assets/photos/photo2.jpeg",
    caption: "Being Silly Together 😂",
    note: "Nobody in the world makes me laugh the way you do. These are my favourite moments. 🌹"
  },
  {
    file: "assets/photos/photo3.jpeg",
    caption: "Holi with You 🎨",
    note: "Every colour is brighter when you're by my side. The most colourful day of my life. 🌈"
  },
  {
    file: "assets/photos/photo4.jpeg",
    caption: "A Quiet Moment 🤍",
    note: "Even the ordinary moments with you feel like the most beautiful memories. ✨"
  },
  {
    file: "assets/photos/photo5.jpeg",
    caption: "My Favourite View 👀",
    note: "Looking at you has always been and will always be my absolute favourite thing. 💞"
  },
  {
    file: "assets/photos/photo6.jpeg",
    caption: "Forever in My Heart 💖",
    note: "In every version of my life, every picture, every memory — it's always you. 🌸"
  }
];

// ── Love Quiz Questions ───────────────────────────────────────
// correctIndex: 0 = first option, 1 = second option
// funOnly: true = not scored, shown as a fun question
const QUIZ_QUESTIONS = [
  {
    question: "Where did our story begin? 🌸",
    options: ["At college", "On Instagram"],
    correctIndex: 0,
    emoji: "🏫"
  },
  {
    question: "When did our relationship officially start? 💑",
    options: ["7 September 2025", "14 February 2025"],
    correctIndex: 0,
    emoji: "📅"
  },
  {
    question: "Who started talking first? 💬",
    options: ["Your girl (me!)", "You (Vaibhav)"],
    correctIndex: 0,
    emoji: "🗨️"
  },
  {
    question: "Who gets angry first? 😤",
    options: ["Me", "Mr. Vaibhav Bajaj"],
    correctIndex: 1,
    emoji: "🌋"
  },
  {
    question: "Who says sorry first? 🥺",
    options: ["Me (always 🙃)", "You"],
    correctIndex: 0,
    emoji: "🙏"
  },
  {
    question: "Who is more possessive? 🫶",
    options: ["Me — just a little!", "You"],
    correctIndex: 0,
    emoji: "🔒"
  },
  {
    question: "Which destinations do I dream of visiting with you? ✈️",
    options: ["Kainchi Dham & Murthal", "Paris & Goa"],
    correctIndex: 0,
    emoji: "🗺️"
  },
  {
    question: "What was the first message I ever sent you? 💌",
    options: [
      "\"Can you add me in this maths grp?\"",
      "\"Hello, aap mujhe grp me add kr lo.\""
    ],
    correctIndex: 1,
    emoji: "📱",
    funNote: "The beginning of everything! 🌹"
  },
  {
    question: "Who is more dramatic between us? 🎭",
    options: ["Me — obviously!", "You — no contest!"],
    correctIndex: 0,  // ✏️ EDIT: set 0 or 1
    emoji: "🎬"
  },
  {
    question: "What instantly makes me smile? 😊",
    options: ["A good-morning text from you", "Your voice note"],
    correctIndex: 0,  // ✏️ EDIT
    emoji: "☀️"
  },
  {
    question: "What is my favourite thing about you? 💕",
    options: ["Your smile", "The way you care for me"],
    correctIndex: 1,  // ✏️ EDIT
    emoji: "🌹"
  },
  {
    question: "What do I crave most from you? 🥺",
    options: ["Your time & attention", "Late-night calls"],
    correctIndex: 0,  // ✏️ EDIT
    emoji: "⏰"
  },
  {
    question: "Who misses the other more? 💔",
    options: ["Me — always!", "Both equally"],
    correctIndex: 0,  // ✏️ EDIT
    emoji: "😢"
  },
  {
    question: "What is our favourite thing to do on a date? 🌙",
    options: ["Late-night drives & food", "Movies together"],
    correctIndex: 0,  // ✏️ EDIT
    emoji: "🚗"
  },
  {
    question: "What is one of my biggest dreams for us? 🌠",
    options: ["Travel to Kainchi Dham together", "Build a home together"],
    correctIndex: 0,  // ✏️ EDIT
    emoji: "✨"
  },
  {
    question: "What do I do when I miss you terribly? 💭",
    options: ["Stalk your old photos", "Spam you with messages"],
    correctIndex: 1,  // ✏️ EDIT
    emoji: "📸"
  },
  {
    question: "What is our biggest shared dream? 🌍",
    options: ["Travel every corner of India together", "Build something beautiful together"],
    correctIndex: 0,  // ✏️ EDIT
    emoji: "🌏"
  },
  {
    question: "What food reminds me of us? 🍽️",
    options: ["Murthal paranthas", "Street-side chai"],
    correctIndex: 0,  // ✏️ EDIT
    emoji: "🥘"
  },
  {
    question: "How do I feel when you laugh? 🌸",
    options: ["Like the whole world is okay", "Annoyed — just kidding! 😂"],
    correctIndex: 0,  // ✏️ EDIT
    emoji: "😄"
  },
  {
    question: "Will we be together forever? 💍",
    options: ["Yes — always and forever!", "Yes — in every lifetime!"],
    correctIndex: 0,  // ✏️ EDIT — both are sweet!
    emoji: "💞"
  }
];

// ── 21 Reasons I Love You ─────────────────────────────────────
// ✏️ EDIT any reason below!
// Each entry can be a plain string OR an object { title, text } for a titled card.
const LOVE_REASONS = [
  "The way you say my name makes everything feel safe. 🌸",
  "Your laugh is literally my favourite sound in the whole world. 😄",
  "You make even ordinary moments feel extraordinary. ✨",
  "You never let me feel alone, even when we're apart. 🤗",
  "The way you care for the people you love — that melts my heart. 💕",
  "You make me braver than I ever thought I could be. 🦋",
  "Late-night conversations with you feel like home. 🌙",
  "You understand me without me having to explain everything. 💬",
  "Your hugs feel like the safest place on earth. 🫂",
  "You make me smile at my phone like a complete fool — and I love it. 😂",
  "The way you get excited about things you love is adorable. 🌟",
  "You always know what to say when I'm overthinking. 🧠",
  "You let me be completely myself around you — no filters. 🎭",
  "Your voice calms every storm inside me. 🌊",
  "You make me want to be a better person every day. 🌱",
  "The little things you do without being asked — that is love. 🫶",
  "You remember the small details I mention, and that means everything. 📌",
  "You make future plans feel exciting and not scary. 🌠",
  {
    title: "Because You're Mine ❤️",
    text: "Because you're mine, and that's my favourite feeling. Out of all the people in this world, I'm lucky to call you my person. You're my favourite part of life, and I'll always choose you."
  },
  "I fall a little more in love with you every single day. 💞",
  "Choosing you is the easiest and best decision I ever made. 🌹"
];

// ── Secret Love Letter ─────────────────────────────────────────
// ✏️ EDIT the letter below!
const LOVE_LETTER = {
  salutation: "My Dearest Suar, 🐷❤️",
  body: `I don't know how to put into words what you mean to me,
so I'll just try my best.

You came into my life and quietly rearranged everything —
in the most beautiful way.

With you, I laugh harder, feel deeper, and dream bigger.
You are the person I think of first when something good happens,
and the person I turn to when things feel heavy.

I love the way you make ordinary days feel like little adventures.
I love how safe you make me feel — just by being you.
I love that you're a little annoying, a lot wonderful, and entirely mine. 🐷

On your birthday, I want you to know:
You deserve every good thing this world has to offer.
You deserve to be celebrated — not just today, but every single day.

I'm so glad I get to be the one standing beside you.
In every lifetime, in every version of us, I would still choose you.

Happy Birthday, my love. 🎂💕

With all the love I have,  
Your Girl 🌸`,
  closing: "Forever yours 💌"
};

// ── Our Future Dreams ──────────────────────────────────────────
const FUTURE_DREAMS = [
  {
    icon: "🛕",
    title: "Kainchi Dham Together",
    description: "Seek blessings at Kainchi Dham — a trip full of peace, faith and us. I can't wait to hold your hand there. 🙏"
  },
  {
    icon: "🍽️",
    title: "Murthal Paranthas at 2AM",
    description: "A midnight drive to Murthal, parantha in hand, laughing at nothing — this is my dream date with you. 🚗"
  },
  {
    icon: "🌅",
    title: "Watching Sunsets Together",
    description: "Every sunset is more beautiful with you beside me. I want to collect a hundred of them with you. 🧡"
  },
  {
    icon: "✈️",
    title: "Our First Real Trip",
    description: "Packing bags, exploring new places, making memories we'll talk about for the rest of our lives. 🗺️"
  },
  {
    icon: "🏡",
    title: "Building Our Little World",
    description: "Someday — a cosy corner that is ours. Full of laughter, warmth and us. 🌸"
  },
  {
    icon: "💍",
    title: "Forever — In Every Lifetime",
    description: "I want to choose you again and again, in every version of this life and the next. 💞"
  }
];
