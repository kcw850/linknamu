// 보여 주기용 더미 데이터입니다. 실제 내용은 나중에 이 파일만 수정하면 됩니다.

export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type ProfileData = {
  name: string;
  bio: string;
  imageUrl: string;
};

export const profile: ProfileData = {
  name: "김클로",
  bio: "세계 최강 바이브코더",
  imageUrl: "/profile-placeholder.svg",
};

export const links: LinkItem[] = [
  { id: "github", title: "GitHub", url: "https://github.com/" },
  { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com/" },
  { id: "blog", title: "Blog", url: "https://example.com/" },
];
