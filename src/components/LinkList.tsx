"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type LinkListProps = {
  links: LinkItem[];
};

export default function LinkList({ links }: LinkListProps) {
  // 데이터를 받기 전에는 모두 0회로 표시
  const [counts, setCounts] = useState<Record<string, number>>({});

  // 페이지가 열릴 때 모든 링크의 클릭 수를 한 번에 가져온다.
  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/clicks", { signal: controller.signal, cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { counts: Record<string, number> }) => {
        // 응답보다 먼저 클릭된 링크가 있으면 더 큰 값을 유지
        setCounts((prev) => {
          const next = { ...data.counts };
          for (const [id, n] of Object.entries(prev)) {
            next[id] = Math.max(next[id] ?? 0, n);
          }
          return next;
        });
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        console.error("클릭 수를 불러오지 못했습니다:", error);
      });

    return () => controller.abort();
  }, []);

  const handleClick = (id: string) => {
    // 화면에는 바로 +1 반영
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

    // keepalive: 페이지를 떠나도 요청이 끝까지 전송되도록
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      keepalive: true,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { count: number }) => {
        // 서버의 실제 값으로 맞춤
        setCounts((prev) => ({ ...prev, [id]: Math.max(prev[id] ?? 0, data.count) }));
      })
      .catch((error) => {
        console.error("클릭 수를 저장하지 못했습니다:", error);
        // 저장에 실패했으면 화면의 +1을 되돌린다.
        setCounts((prev) => ({ ...prev, [id]: Math.max((prev[id] ?? 1) - 1, 0) }));
      });
  };

  return (
    <ul className="mt-12 flex w-full flex-col gap-4 sm:gap-5">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            link={link}
            count={counts[link.id] ?? 0}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
