/**
 * config.ts
 *
 * All the content data for Gatsby's phone experience.
 * Song info, diary entries, voice memo labels, and the text conversation.
 * This is the single source of truth — components just render this data.
 */

// --- Song Data ---

export type Song = {
  id: string;
  title: string;
  noteTitle: string;
  noteBody: string;
  memoTitle: string;
  memoDuration: string;
  audioSrc: string;
};

export const EP_SONGS: Song[] = [
  {
    id: "adhd",
    title: "adhd",
    noteTitle: "47 tabs",
    noteBody:
      "my brain has 47 tabs open and none of them are loading. i started writing a song about breakfast and now it's about the universe. tapped my pen so hard it broke. my teacher said 'focus' like it's something you can just... do. wrote the chorus in math class. forgot what math is.",
    memoTitle: "piano thing 3am",
    memoDuration: "0:30",
    audioSrc: "/audio/adhd.mp3",
  },
  {
    id: "brainrot",
    title: "brainrot",
    noteTitle: "my brain is actually rotting",
    noteBody:
      "scrolled for four hours and retained nothing. my screen time report is a crime scene. i know everything about a stranger's cat and nothing about my homework. someone said 'go outside' and i googled what outside looks like. this is fine.",
    memoTitle: "this is so dumb delete later",
    memoDuration: "0:45",
    audioSrc: "/audio/brainrot.mp3",
  },
  {
    id: "hiccups",
    title: "hiccups",
    noteTitle: "hiccup thoughts",
    noteBody:
      "you know when everything is fine and then your brain just... hiccups? like you're having a normal day and suddenly you remember that one thing you said in 6th grade. or you accidentally make eye contact with someone and your whole day is ruined. those little interruptions that won't let you forget you're alive.",
    memoTitle: "recording #47 idk",
    memoDuration: "0:38",
    audioSrc: "/audio/hiccups.mp3",
  },
  {
    id: "junk-drawer",
    title: "junk drawer",
    noteTitle: "everything i never threw away",
    noteBody:
      "found a movie ticket from when mom took me to see that pixar movie. a broken earphone that only plays in one ear. a note i wrote to myself that just says 'remember this.' i don't remember what 'this' was. my whole brain is a junk drawer honestly.",
    memoTitle: "found this in my junk drawer lol",
    memoDuration: "0:42",
    audioSrc: "/audio/junk-drawer.mp3",
  },
  {
    id: "rental-car",
    title: "rental car",
    noteTitle: "rental car feelings",
    noteBody:
      "everything good is temporary and i'm fine with that. like a rental car — you drive it knowing it was never yours. but you still change the radio stations. you still adjust the mirrors. you still treat it like it matters. because it does. even if you have to give it back.",
    memoTitle: "driving and crying haha",
    memoDuration: "0:35",
    audioSrc: "/audio/rental-car.mp3",
  },
];

// --- Messages Data ---

export type Message = {
  sender: "gatsby" | "em";
  text: string;
};

export const MESSAGES: Message[] = [
  { sender: "em", text: "ru awake" },
  { sender: "gatsby", text: "when am i not lol" },
  { sender: "em", text: "true. did u finish that song" },
  { sender: "gatsby", text: "which one 😭" },
  { sender: "em", text: "the rental car one??" },
  { sender: "gatsby", text: "oh ya. its weird tho" },
  { sender: "gatsby", text: "like its about how nothing is really yours" },
  { sender: "gatsby", text: "but u still care about it anyway" },
  { sender: "gatsby", text: "idk if that makes sense" },
  { sender: "em", text: "no that's literally so good" },
  { sender: "em", text: "what about the adhd one" },
  { sender: "gatsby", text: "its like 47 songs now" },
  { sender: "gatsby", text: "my brain won't pick ONE version" },
  { sender: "em", text: "classic gatsby" },
  { sender: "gatsby", text: "💀" },
  { sender: "gatsby", text: "i also have this thing about hiccups now" },
  { sender: "em", text: "... hiccups?" },
  { sender: "gatsby", text: "like brain hiccups" },
  { sender: "gatsby", text: "when ur fine and then suddenly ur NOT" },
  { sender: "em", text: "oh" },
  { sender: "em", text: "oh no i know exactly what u mean" },
  { sender: "gatsby", text: "RIGHT" },
  { sender: "gatsby", text: "anyway i should sleep" },
  { sender: "em", text: "its 3am gatsby" },
  { sender: "gatsby", text: "that's early for me" },
  { sender: "em", text: "😭 goodnight" },
  { sender: "gatsby", text: "gn 💜" },
];

// --- Constants ---

/** How many songs a fan must discover before the unlock screen appears */
export const SONGS_TO_UNLOCK = 3;
