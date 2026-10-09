import ListenLanding from "@/components/ListenLanding";
import { listeningDestinations } from "@/lib/listening-destinations";

export default function Home() {
  return <ListenLanding links={listeningDestinations.home} />;
}
