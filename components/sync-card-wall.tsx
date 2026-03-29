"use client";

import { DraggableTrack } from "@/components/draggable-track";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type SyncedItem = {
  title: string;
  url: string;
  cover?: string;
  views?: number;
  stars?: number;
};

type SyncResponse = {
  profileUrl: string;
  items: SyncedItem[];
};

type SyncCardWallProps = {
  endpoint: "/api/blog" | "/api/github";
  title: string;
  frameLinkLabel: string;
  emptyText: string;
  dragHint: string;
};

function cardWidth(index: number) {
  const widths = ["w-[280px] md:w-[330px]", "w-[300px] md:w-[380px]", "w-[260px] md:w-[320px]", "w-[320px] md:w-[420px]"];
  return widths[index % widths.length];
}

export function SyncCardWall({ endpoint, title, frameLinkLabel, emptyText, dragHint }: SyncCardWallProps) {
  const [data, setData] = useState<SyncResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    fetch(endpoint)
      .then((r) => r.json())
      .then((json: SyncResponse) => {
        if (!cancelled) setData(json);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [endpoint]);

  const items = useMemo(() => data?.items ?? [], [data]);

  const coverUrl = (cover?: string) => {
    if (!cover) return "";
    if (cover.startsWith("/")) return cover;
    return `/api/image?src=${encodeURIComponent(cover)}`;
  };

  return (
    <div className="rounded-[1.4rem] border border-white/12 bg-surface/75 p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-sm uppercase tracking-[0.16em] text-muted">{title}</h3>
        {data?.profileUrl ? (
          <a
            href={data.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 px-3 py-1.5 text-xs uppercase tracking-[0.14em] text-text transition-all hover:border-active/70 hover:text-active"
            data-cursor="link"
          >
            {frameLinkLabel} ↗
          </a>
        ) : null}
      </div>

      {loading ? (
        <p className="text-sm text-muted">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-muted">{emptyText}</p>
      ) : (
        <DraggableTrack hint={dragHint} autoScroll className="border-white/10 bg-[#0f0f0f]/65">
          {items.map((item, index) => (
            <motion.a
              key={`${item.url}-${index}`}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.025 }}
              className={`group relative ${cardWidth(index)} min-h-[250px] overflow-hidden rounded-[1.1rem] border border-white/12 bg-surface2/80`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: item.cover
                    ? `url(${coverUrl(item.cover)})`
                    : "radial-gradient(circle at 30% 20%, rgba(201,106,43,0.35), rgba(18,18,18,0.9))"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/20 to-black/80" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <div className="rounded-lg border border-white/15 bg-black/38 px-3 py-2.5 backdrop-blur-md">
                  <p className="line-clamp-2 text-sm font-medium leading-snug text-[#f4efe6]">{item.title}</p>
                  <p className="mt-1 text-xs text-[#c8c2b8]">
                    {typeof item.views === "number" ? `Views ${item.views}` : typeof item.stars === "number" ? `Stars ${item.stars}` : "Open"}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </DraggableTrack>
      )}
    </div>
  );
}

