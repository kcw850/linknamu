import Profile from "@/components/Profile";
import LinkList from "@/components/LinkList";
import { profile, links } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col items-center px-6 py-16 sm:px-8 sm:py-24">
      <Profile profile={profile} />
      <LinkList links={links} />
    </main>
  );
}
