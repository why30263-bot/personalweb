"use client";

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
};

function cardClass(index: number) {
  if (index % 5 === 0) return "md:col-span-2 md:row-span-2 min-h-[260px]";
  if (index % 3 === 0) return "md:col-span-2 min-h-[210px]";
  return "min-h-[180px]";
}

export function SyncCardWall({ endpoint, title, frameLinkLabel, emptyText }: SyncCardWallProps) {
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
        <div className="grid gap-3 md:grid-cols-4 md:auto-rows-[120px]">
          {items.map((item, index) => (
            <motion.a
              key={`${item.url}-${index}`}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              data-cursor="link"
              whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.015 }}
              className={`group relative overflow-hidden rounded-[1rem] border border-white/12 bg-surface2/80 ${cardClass(index)}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: item.cover ? `url(${item.cover})` : "radial-gradient(circle at 30% 20%, rgba(201,106,43,0.25), rgba(18,18,18,0.9))"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/75" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <div className="rounded-lg border border-white/15 bg-black/30 px-3 py-2 backdrop-blur-md">
                  <p className="line-clamp-2 text-sm font-medium text-[#f4efe6]">{item.title}</p>
                  <p className="mt-1 text-xs text-[#c8c2b8]">
                    {typeof item.views === "number" ? `Views ${item.views}` : typeof item.stars === "number" ? `Stars ${item.stars}` : "Open"}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </div>
  );
}
