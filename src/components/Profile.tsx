import Image from "next/image";
import type { ProfileData } from "@/data/profile";

type ProfileProps = {
  profile: ProfileData;
};

export default function Profile({ profile }: ProfileProps) {
  return (
    <section className="flex flex-col items-center text-center">
      <Image
        src={profile.imageUrl}
        alt={`${profile.name} 프로필 사진`}
        width={112}
        height={112}
        priority
        className="h-28 w-28 rounded-full border border-gray-200 object-cover dark:border-gray-700"
      />
      <h1 className="mt-5 text-2xl font-bold">{profile.name}</h1>
      <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
        {profile.bio}
      </p>
    </section>
  );
}
