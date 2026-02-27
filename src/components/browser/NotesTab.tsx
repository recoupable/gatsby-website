/**
 * NotesTab.tsx
 *
 * Looks like a Google Doc — "untitled document" — with a half-finished,
 * ADHD-style stream of consciousness that references the other open tabs.
 *
 * The doc itself IS the junk drawer — random thoughts, to-do items that
 * go off the rails, lyrics that appear mid-sentence.
 */

"use client";

import { useEffect } from "react";

type NotesTabProps = {
  onDiscover: () => void;
};

export default function NotesTab({ onDiscover }: NotesTabProps) {
  useEffect(() => {
    const timer = setTimeout(onDiscover, 2000);
    return () => clearTimeout(timer);
  }, [onDiscover]);

  return (
    <div className="h-full bg-[#1f1f1f] overflow-y-auto">
      {/* Google Docs toolbar — simplified dark mode */}
      <div className="bg-[#1f1f1f] border-b border-[#3c4043] px-4 py-2">
        <div className="flex items-center gap-3 mb-2">
          {/* Doc icon */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="1" width="14" height="18" rx="2" fill="#4285f4" />
            <path d="M14 1v4h4" fill="#a0c3ff" />
            <rect x="6" y="8" width="8" height="1.2" rx="0.6" fill="white" opacity="0.8" />
            <rect x="6" y="11" width="6" height="1.2" rx="0.6" fill="white" opacity="0.6" />
          </svg>
          <span className="text-[#e8eaed] text-[16px]">untitled document</span>
          <span className="text-[#9aa0a6] text-[11px] ml-4">Last edit was 3 minutes ago</span>
        </div>

        {/* Toolbar buttons — decorative */}
        <div className="flex items-center gap-1 text-[#9aa0a6] text-[13px]">
          <span className="px-2 py-1 hover:bg-[#303134] rounded">File</span>
          <span className="px-2 py-1 hover:bg-[#303134] rounded">Edit</span>
          <span className="px-2 py-1 hover:bg-[#303134] rounded">View</span>
          <span className="px-2 py-1 hover:bg-[#303134] rounded">Insert</span>
          <span className="px-2 py-1 hover:bg-[#303134] rounded">Format</span>
          <span className="px-2 py-1 hover:bg-[#303134] rounded">Tools</span>
        </div>
      </div>

      {/* Document body — white page on dark background */}
      <div className="flex justify-center py-8 px-4">
        <div
          className="w-full max-w-[680px] min-h-[800px] bg-[#fff] rounded-sm px-16 py-12 shadow-lg"
          style={{
            fontFamily: '"Arial", sans-serif',
            color: "#202124",
          }}
        >
          {/* The actual document content — ADHD stream of consciousness */}
          <div className="text-[15px] leading-[1.75] space-y-4">
            <p className="text-[#5f6368] text-[11px] uppercase tracking-wider mb-6">
              2:47 AM · untitled document
            </p>

            <p className="font-medium text-[16px]">things i need to do:</p>

            <ul className="list-disc pl-5 space-y-1">
              <li>finish the song (which one lol)</li>
              <li>reply to em&apos;s text from literally 3 days ago</li>
              <li>figure out why i can&apos;t sleep</li>
              <li>stop googling random things at 2am</li>
              <li className="text-[#9aa0a6] line-through">buy groceries</li>
              <li className="text-[#9aa0a6] line-through">call dentist</li>
            </ul>

            <p className="mt-6">
              actually wait i had this idea for a lyric
            </p>

            <p className="italic text-[#1a73e8]">
              &quot;everything i never threw away&quot;
            </p>

            <p>
              like all the stuff in my junk drawer. the movie ticket stub from
              when mom took me to see that pixar movie. a broken earphone that
              only plays in one ear. a note i wrote to myself that just says
              &quot;remember this.&quot; i don&apos;t remember what &quot;this&quot; was.
            </p>

            <p>my whole brain is a junk drawer honestly</p>

            <p className="mt-4">
              ok but also i need to focus
            </p>

            <p>i can&apos;t focus</p>

            <p className="text-[#9aa0a6]">
              google: why can&apos;t i focus on anything
            </p>

            <p className="text-[#9aa0a6]">oh i already have that tab open</p>

            <p className="mt-6">
              anyway here&apos;s what i was writing before i got distracted:
            </p>

            <p className="mt-2">
              the thing about rental cars is you drive them knowing they were
              never yours. but you still change the radio stations. you still
              adjust the mirrors. you still treat it like it matters.
            </p>

            <p>because it does. even if you have to give it back.</p>

            <p className="mt-4 text-[#9aa0a6]">
              wait that&apos;s good actually. is that for rental car or junk drawer.
              could be either. could be neither. my brain won&apos;t decide.
            </p>

            <p className="mt-6">
              you know what hiccups are? they&apos;re like brain glitches. when
              everything is fine and then your brain just... interrupts itself.
              for no reason. and you can&apos;t make it stop.
            </p>

            <p className="text-[#9aa0a6]">
              hold on i need to google something
            </p>

            <p className="mt-6 text-[#9aa0a6] text-[13px]">
              [cursor blinking here at 2:47am]
            </p>

            {/* Blinking cursor */}
            <div className="h-[18px] w-[2px] bg-[#1a73e8] animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
