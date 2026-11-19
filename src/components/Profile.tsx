import Image from "next/image";
import type { ProfileData } from "@/data/profile";

type ProfileProps = {
  profile: ProfileData;
};

export default function Profile({ profile }: ProfileProps) {
  return (
    <section className="flex flex-col items-center text-center">
      <div className="rounded-full bg-white/70 p-1.5 shadow-[0_18px_40px_-14px_var(--glow),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-white/80 dark:bg-white/10 dark:ring-white/10">
        <Image
          src={profile.imageUrl}
          alt={`${profile.name} 프로필 사진`}
          width={112}
          height={112}
          priority
          className="h-24 w-24 rounded-full object-cover sm:h-28 sm:w-28"
        />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight">{profile.name}</h1>
      <p className="mt-2 max-w-xs text-balance text-[15px] leading-relaxed text-muted">
        {profile.bio}
      </p>
    </section>
  );
}
