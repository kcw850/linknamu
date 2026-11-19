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
      className="block w-full rounded-3xl border border-white/60 bg-white/40 px-6 py-[18px] text-center text-[15px] font-semibold shadow-[0_8px_24px_-12px_var(--glow),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/55 hover:shadow-[0_12px_28px_-12px_var(--glow),inset_0_1px_0_rgba(255,255,255,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300/80 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:shadow-[0_8px_24px_-12px_var(--glow),inset_0_1px_0_rgba(255,255,255,0.06)] dark:hover:bg-white/10"
    >
      {link.title}
    </a>
  );
}
