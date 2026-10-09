import type { Metadata } from "next";
import ListenLanding from "@/components/ListenLanding";
import { listeningDestinations } from "@/lib/listening-destinations";

export const metadata: Metadata = {
  title: "I Wish — Gatsby Grace",
  description: "Listen to I Wish by Gatsby Grace on Spotify or Apple Music.",
  openGraph: {
    title: "I Wish — Gatsby Grace",
    description: "Listen on Spotify or Apple Music.",
    url: "/i-wish",
  },
};

export default function IWish() {
  return <ListenLanding links={listeningDestinations.iWish} />;
}
