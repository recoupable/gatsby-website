/**
 * GoogleSearchTab.tsx
 *
 * A realistic Google search results page (light mode).
 * Three variants — one for each Google tab in the browser.
 * Visiting any of these discovers the associated song.
 *
 * Styled to match real Google: blue links, green URLs, gray text,
 * "People also ask" section.
 */

"use client";

import { useEffect } from "react";

type GoogleSearchTabProps = {
  variant: "focus" | "hiccups" | "rental";
  onDiscover: () => void;
};

/** Search result data for each variant */
const SEARCH_DATA = {
  focus: {
    query: "why can't i focus on anything",
    resultCount: "About 2,340,000,000 results (0.42 seconds)",
    results: [
      {
        title: "ADHD in Young Adults: 14 Signs You Might Have It",
        url: "healthline.com › health › adhd-symptoms-young-adults",
        description:
          "If you find yourself unable to concentrate, starting tasks but never finishing them, or feeling like your brain has too many tabs open at once, you may be experiencing symptoms of...",
      },
      {
        title: "Why Can't I Focus? 12 Possible Reasons - Verywell Mind",
        url: "verywellmind.com › why-cant-i-focus",
        description:
          "From lack of sleep to undiagnosed ADHD, there are many reasons you might struggle to focus. Experts say the key is understanding whether it's situational or a pattern that's been...",
      },
      {
        title: 'I Can\'t Focus on Anything Anymore : r/ADHD',
        url: "reddit.com › r/ADHD › comments",
        description:
          "Anyone else feel like their brain is a browser with 47 tabs open and you can hear ALL of them? I literally started making breakfast this morning and ended up reorganizing my entire...",
      },
    ],
    peopleAlsoAsk: [
      "Is it normal to not be able to focus on anything?",
      "Why does my brain feel like it has 47 tabs open?",
      "Can you have ADHD and not know it?",
      "Why is it harder to focus at night?",
    ],
  },
  hiccups: {
    query: "what do hiccups mean spiritually",
    resultCount: "About 4,560,000 results (0.38 seconds)",
    results: [
      {
        title: "Spiritual Meaning of Hiccups: 9 Signs From the Universe",
        url: "spiritualify.com › hiccups-spiritual-meaning",
        description:
          "Hiccups are believed to be a sign from the universe that someone is thinking about you. In many spiritual traditions, unexpected hiccups represent a disruption in your energy field...",
      },
      {
        title: "What Do Hiccups Mean? Spiritual Interpretations Explained",
        url: "mindbodygreen.com › spirituality › hiccups-meaning",
        description:
          "From energy disruptions to emotional releases, hiccups may carry deeper meaning than we think. Some believe they signal unprocessed emotions trying to surface...",
      },
      {
        title: "Hiccups as Spiritual Awakening? Here's What Experts Say",
        url: "wellandgood.com › hiccups-spiritual-meaning",
        description:
          "If you've ever gotten hiccups out of nowhere — especially during a conversation or deep thought — some practitioners believe this is your body's way of telling you to pause...",
      },
    ],
    peopleAlsoAsk: [
      "Are hiccups a sign someone is thinking about you?",
      "What do hiccups mean emotionally?",
      "Why do I get hiccups when I'm anxious?",
      "What does it mean when hiccups won't stop?",
    ],
  },
  rental: {
    query: "can you return a rental car in a different city",
    resultCount: "About 892,000,000 results (0.31 seconds)",
    results: [
      {
        title: "One-Way Car Rentals: Can You Drop Off in a Different City?",
        url: "enterprise.com › one-way-car-rental",
        description:
          "Yes, most major rental companies allow one-way rentals where you pick up in one city and drop off in another. A one-way fee typically applies, ranging from $50 to $300 depending on...",
      },
      {
        title: "How to Do a One-Way Rental Without Getting Overcharged",
        url: "nerdwallet.com › travel › one-way-car-rental-tips",
        description:
          "If you're planning to drive somewhere and not come back — whether it's a road trip, a move, or you just need to go — here's how to find the cheapest one-way rental...",
      },
      {
        title: "Has anyone just... driven a rental car and kept going? : r/roadtrip",
        url: "reddit.com › r/roadtrip › comments",
        description:
          "I know this sounds weird but sometimes I think about just getting in a rental car and driving until I run out of road. Not running away exactly. More like... I just want to be somewhere that isn't here for a while.",
      },
    ],
    peopleAlsoAsk: [
      "How far can you drive a rental car?",
      "Can you keep a rental car longer than planned?",
      "What happens if you don't return a rental car?",
      "Is it cheaper to rent one-way or round trip?",
    ],
  },
};

export default function GoogleSearchTab({
  variant,
  onDiscover,
}: GoogleSearchTabProps) {
  /** Mark song as discovered when the tab is viewed */
  useEffect(() => {
    const timer = setTimeout(onDiscover, 2000);
    return () => clearTimeout(timer);
  }, [onDiscover]);

  const data = SEARCH_DATA[variant];

  return (
    <div className="h-full bg-[#202124] overflow-y-auto">
      {/* Google header */}
      <div className="bg-[#202124] border-b border-[#3c4043] px-6 pt-5 pb-0">
        {/* Google logo + search bar */}
        <div className="flex items-center gap-6 mb-4">
          {/* Google logo */}
          <span className="text-[22px] font-normal flex-shrink-0">
            <span style={{ color: "#4285f4" }}>G</span>
            <span style={{ color: "#ea4335" }}>o</span>
            <span style={{ color: "#fbbc05" }}>o</span>
            <span style={{ color: "#4285f4" }}>g</span>
            <span style={{ color: "#34a853" }}>l</span>
            <span style={{ color: "#ea4335" }}>e</span>
          </span>

          {/* Search bar */}
          <div className="flex-1 max-w-[692px] bg-[#303134] rounded-full px-5 py-[10px] flex items-center border border-[#5f6368] hover:border-[#8ab4f8] transition-colors">
            <span className="text-[#e8eaed] text-[16px] flex-1">{data.query}</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="ml-2 flex-shrink-0">
              <circle cx="8.5" cy="8.5" r="6" stroke="#8ab4f8" strokeWidth="1.5" />
              <line x1="13" y1="13" x2="18" y2="18" stroke="#8ab4f8" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="flex gap-4 text-[13px]">
          <span className="text-[#8ab4f8] border-b-[3px] border-[#8ab4f8] pb-3 px-1">All</span>
          <span className="text-[#969ba1] pb-3 px-1">Images</span>
          <span className="text-[#969ba1] pb-3 px-1">Videos</span>
          <span className="text-[#969ba1] pb-3 px-1">News</span>
          <span className="text-[#969ba1] pb-3 px-1">Shopping</span>
        </div>
      </div>

      {/* Search results */}
      <div className="px-6 py-4 max-w-[750px]">
        {/* Result count */}
        <p className="text-[#9aa0a6] text-[12px] mb-5">{data.resultCount}</p>

        {/* Results */}
        {data.results.map((result, i) => (
          <div key={i} className="mb-7">
            {/* URL breadcrumb */}
            <div className="flex items-center gap-2 mb-[2px]">
              <div className="w-[26px] h-[26px] rounded-full bg-[#303134] flex items-center justify-center">
                <span className="text-[11px] text-[#e8eaed]">
                  {result.url.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-[#e8eaed] text-[14px] leading-tight">
                  {result.url.split(" › ")[0]}
                </p>
                <p className="text-[#969ba1] text-[12px]">{result.url}</p>
              </div>
            </div>

            {/* Title — blue link */}
            <h3 className="text-[#8ab4f8] text-[20px] leading-tight mb-[4px] cursor-pointer hover:underline">
              {result.title}
            </h3>

            {/* Description */}
            <p className="text-[#bdc1c6] text-[14px] leading-[1.5]">
              {result.description}
            </p>
          </div>
        ))}

        {/* People also ask */}
        <div className="mt-6 mb-8">
          <h3 className="text-[#e8eaed] text-[18px] mb-3">People also ask</h3>
          {data.peopleAlsoAsk.map((question, i) => (
            <div
              key={i}
              className="border-b border-[#3c4043] py-3 flex items-center justify-between cursor-pointer group"
            >
              <span className="text-[#e8eaed] text-[14px] group-hover:underline">
                {question}
              </span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 ml-4">
                <path d="M4 6l4 4 4-4" stroke="#9aa0a6" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
