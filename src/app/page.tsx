import Profile from "@/components/Profile";
import LinkCard from "@/components/LinkCard";
import { profile, links } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-4 py-12 sm:py-16">
      <Profile profile={profile} />

      <ul className="mt-10 flex w-full flex-col gap-4">
        {links.map((link) => (
          <li key={link.id}>
            <LinkCard link={link} />
          </li>
        ))}
      </ul>
    </main>
  );
}
