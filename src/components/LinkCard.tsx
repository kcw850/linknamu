import type { LinkItem } from "@/data/profile";

type LinkCardProps = {
  link: LinkItem;
};

export default function LinkCard({ link }: LinkCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-2xl border border-gray-300 bg-white px-6 py-4 text-center font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 dark:border-gray-700 dark:bg-gray-900"
    >
      {link.title}
    </a>
  );
}
