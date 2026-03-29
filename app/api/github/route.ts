import { NextResponse } from "next/server";

const USERNAME = process.env.GITHUB_USERNAME || "why30263-bot";

type RepoItem = {
  name: string;
  description: string;
  stars: number;
  url: string;
  cover: string;
  updatedAt: string;
};

export async function GET() {
  try {
    const res = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, {
      headers: {
        accept: "application/vnd.github+json",
        "user-agent": "personalweb-portfolio"
      },
      next: { revalidate: 1800 }
    });

    if (!res.ok) {
      return NextResponse.json({ profileUrl: `https://github.com/${USERNAME}`, items: [], message: "GitHub unavailable" });
    }

    const repos = (await res.json()) as Array<{
      name: string;
      description: string | null;
      stargazers_count: number;
      html_url: string;
      owner: { login: string };
      updated_at: string;
      fork: boolean;
      private: boolean;
    }>;

    const items: RepoItem[] = repos
      .filter((r) => !r.private && !r.fork)
      .map((r) => ({
        name: r.name,
        description: r.description || "No description.",
        stars: r.stargazers_count,
        url: r.html_url,
        cover: `https://opengraph.githubassets.com/1/${r.owner.login}/${r.name}`,
        updatedAt: r.updated_at
      }))
      .sort((a, b) => (b.stars !== a.stars ? b.stars - a.stars : +new Date(b.updatedAt) - +new Date(a.updatedAt)))
      .slice(0, 12);

    return NextResponse.json({
      profileUrl: `https://github.com/${USERNAME}`,
      items
    });
  } catch {
    return NextResponse.json({ profileUrl: `https://github.com/${USERNAME}`, items: [], message: "fetch failed" });
  }
}
