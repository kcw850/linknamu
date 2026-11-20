import { NextResponse } from "next/server";
import { getClicksCollection } from "@/lib/mongodb";
import { links } from "@/data/profile";

// 항상 최신 클릭 수를 돌려주도록 캐시하지 않는다.
export const dynamic = "force-dynamic";

const linkIds = links.map((link) => link.id);

/** 모든 링크의 클릭 수를 한 번에 반환: { counts: { github: 42, ... } } */
export async function GET() {
  try {
    const clicks = await getClicksCollection();
    const docs = await clicks.find({ _id: { $in: linkIds } }).toArray();

    const counts: Record<string, number> = Object.fromEntries(
      linkIds.map((id) => [id, 0]),
    );
    for (const doc of docs) counts[doc._id] = doc.count;

    return NextResponse.json({ counts });
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return NextResponse.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}

/** 링크 하나의 클릭 수를 1 올린다. body: { id: "github" } */
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  // 등록된 링크만 집계해서 임의의 id로 문서가 쌓이는 것을 막는다.
  if (typeof id !== "string" || !linkIds.includes(id)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  try {
    const clicks = await getClicksCollection();
    const doc = await clicks.findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return NextResponse.json({ id, count: doc?.count ?? 1 });
  } catch (error) {
    console.error("클릭 수 저장 실패:", error);
    return NextResponse.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}
