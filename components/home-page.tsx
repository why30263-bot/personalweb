"use client";

import {
  awardsCards,
  focusTags,
  identity,
  leadershipCards,
  navItems,
  researchCards,
  resumeCards,
  type Locale,
  type LocalizedCard,
  type LocalizedText,
  uiText,
  volunteerCards
} from "@/data/site";
import { CustomCursor } from "@/components/custom-cursor";
import { DraggableTrack } from "@/components/draggable-track";
import { HeadingReveal } from "@/components/heading-reveal";
import { MagneticButton } from "@/components/magnetic-button";
import { PlaceholderCardItem } from "@/components/placeholder-card";
import { SectionReveal } from "@/components/section-reveal";
import { StickyNav } from "@/components/sticky-nav";
import { SyncCardWall } from "@/components/sync-card-wall";
import { CHIP_WIDTHS } from "@/lib/design-tokens";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const sectionTint: Record<string, string> = {
  hero: "radial-gradient(circle at 70% 8%, rgba(201,106,43,0.22), transparent 45%)",
  focus: "radial-gradient(circle at 25% 20%, rgba(208,255,0,0.09), transparent 46%)",
  about: "radial-gradient(circle at 82% 22%, rgba(201,106,43,0.16), transparent 48%)",
  research: "radial-gradient(circle at 16% 18%, rgba(208,255,0,0.08), transparent 45%)",
  papers: "radial-gradient(circle at 40% 10%, rgba(201,106,43,0.18), transparent 42%)"
};

function toText(value: LocalizedText, locale: Locale) {
  return value[locale];
}

function toCard(item: LocalizedCard, locale: Locale) {
  return {
    title: item.title[locale],
    subtitle: item.subtitle[locale],
    badge: item.badge?.[locale]
  };
}

const railWidths = ["w-[280px] md:w-[360px]", "w-[260px] md:w-[320px]", "w-[300px] md:w-[390px]", "w-[250px] md:w-[330px]"];

export function HomePage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [locale, setLocale] = useState<Locale>("zh");
  const [activeTag, setActiveTag] = useState(toText(focusTags[0], "zh"));
  const prefersReducedMotion = useReducedMotion();
  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);

  useEffect(() => {
    const saved = window.localStorage.getItem("site-locale");
    if (saved === "zh" || saved === "en") {
      setLocale(saved);
      setActiveTag(toText(focusTags[0], saved));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("site-locale", locale);
  }, [locale]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-38% 0px -45% 0px",
        threshold: [0.22, 0.45, 0.7]
      }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  const navItemsLocalized = navItems.map((item) => ({ id: item.id, label: item.label[locale] }));
  const tagStream = [...focusTags, ...focusTags.slice(0, 6)].map((item) => item[locale]);
  const tint = sectionTint[activeSection] ?? sectionTint.hero;

  return (
    <>
      <CustomCursor />
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        animate={{ opacity: 1 }}
        style={{ backgroundImage: tint }}
        transition={{ duration: 0.65, ease: [0.2, 0.9, 0.2, 1] }}
      />
      <StickyNav
        items={navItemsLocalized}
        activeId={activeSection}
        language={locale}
        onToggleLanguage={() => setLocale((prev) => (prev === "zh" ? "en" : "zh"))}
      />

      <main className="relative z-10 mx-auto max-w-[1200px] px-4 pb-16 pt-24 md:px-8 md:pt-28">
        <section id="hero" className="scroll-mt-28 border-b border-white/10 pb-14 md:pb-16">
          <div className="grid items-end gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <SectionReveal>
              <p className="mb-4 text-xs uppercase tracking-[0.22em] text-muted">{toText(uiText.heroEyebrow, locale)}</p>
              <motion.h1
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 28, clipPath: "inset(0 0 100% 0)" }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                transition={{ duration: 1, ease: [0.19, 0.9, 0.2, 1] }}
                className="text-5xl font-semibold leading-[0.9] tracking-[-0.03em] text-text md:text-7xl lg:text-8xl"
              >
                {toText(identity.name, locale)}
              </motion.h1>
              <div className="mt-5 grid gap-1 text-sm text-muted md:text-base">
                <p>{toText(identity.university, locale)}</p>
                <p>{toText(identity.major, locale)}</p>
              </div>
              <p className="mt-7 max-w-xl text-sm leading-relaxed text-muted md:text-base">{toText(uiText.heroPitch, locale)}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticButton href="#research" label={toText(uiText.explore, locale)} />
                <MagneticButton href="#contact" label={toText(uiText.contact, locale)} variant="ghost" />
              </div>
            </SectionReveal>

            <SectionReveal delay={0.12}>
              <motion.aside
                data-cursor="card"
                className="group relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-surface/85 p-6 shadow-card"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.018, y: -5, rotateX: 1.8, rotateY: -1.2 }}
                transition={{ type: "spring", stiffness: 230, damping: 24 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(201,106,43,0.2),transparent_40%)] opacity-60" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_90%,rgba(208,255,0,0.1),transparent_42%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative grid gap-4">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-muted">
                    <span>{toText(uiText.identityPreview, locale)}</span>
                    <motion.span whileHover={prefersReducedMotion ? undefined : { x: 4, rotate: 5 }}>↗</motion.span>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-surface2/80 p-5">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted">{toText(uiText.currentIdentity, locale)}</p>
                    <div className="mt-3 flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/20">
                        <Image src="/assets/profile.jpg" alt={toText(identity.name, locale)} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-xl text-text md:text-2xl">{toText(identity.name, locale)}</p>
                        <p className="mt-1 text-sm text-muted">{toText(identity.university, locale)}</p>
                        <p className="text-sm text-muted">{toText(identity.major, locale)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.aside>
            </SectionReveal>
          </div>
        </section>

        <section id="focus" className="scroll-mt-28 border-b border-white/10 py-12 md:py-14">
          <HeadingReveal
            eyebrow={toText(uiText.section.focus.eyebrow, locale)}
            title={toText(uiText.section.focus.title, locale)}
            subtitle={toText(uiText.section.focus.subtitle, locale)}
          />
          <div className="mt-6">
            <DraggableTrack hint={toText(uiText.dragHint, locale)} autoScroll>
              <div className="grid grid-flow-col grid-rows-2 gap-3">
                {tagStream.map((tag, index) => {
                  const isActive = activeTag === tag;
                  return (
                    <motion.button
                      key={`${tag}-${index}`}
                      onClick={() => setActiveTag(tag)}
                      data-cursor="drag"
                      whileHover={prefersReducedMotion ? undefined : { scale: 1.04, y: -2 }}
                      className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.16em] transition-all md:text-xs ${CHIP_WIDTHS[index % CHIP_WIDTHS.length]} ${
                        isActive
                          ? "border-active bg-active text-[#111] shadow-[0_8px_18px_rgba(208,255,0,0.2)]"
                          : "border-white/15 bg-white/[0.03] text-muted hover:border-accent/70 hover:bg-accent/85 hover:text-[#111]"
                      }`}
                    >
                      {tag}
                    </motion.button>
                  );
                })}
              </div>
            </DraggableTrack>
          </div>
        </section>

        <section id="about" className="scroll-mt-28 border-b border-white/10 py-12 md:py-14">
          <HeadingReveal
            eyebrow={toText(uiText.section.about.eyebrow, locale)}
            title={toText(uiText.section.about.title, locale)}
            subtitle={toText(uiText.section.about.subtitle, locale)}
          />
          <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <SectionReveal className="rounded-[1.2rem] border border-white/12 bg-surface/75 p-5 md:p-6">
              <p className="text-lg leading-relaxed text-text">{locale === "zh" ? "个人学术简介占位段落。" : "Placeholder academic introduction paragraph."}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {locale === "zh"
                  ? "研究兴趣、当前学习方向与未来目标的占位描述。"
                  : "Placeholder description for research interests, current study direction, and future goals."}
              </p>
            </SectionReveal>
            <SectionReveal delay={0.08} className="rounded-[1.2rem] border border-white/12 bg-surface2/75 p-5 md:p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">{locale === "zh" ? "个人亮点" : "Profile Highlights"}</p>
              <ul className="mt-4 space-y-2">
                {(locale === "zh"
                  ? ["占位要点一", "占位要点二", "占位要点三"]
                  : ["Placeholder point one", "Placeholder point two", "Placeholder point three"]
                ).map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-muted transition-all hover:border-active/60 hover:text-text"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </SectionReveal>
          </div>
        </section>

        <section id="research" className="scroll-mt-28 border-b border-white/10 py-12 md:py-14">
          <HeadingReveal
            eyebrow={toText(uiText.section.research.eyebrow, locale)}
            title={toText(uiText.section.research.title, locale)}
            subtitle={toText(uiText.section.research.subtitle, locale)}
          />
          <div className="mt-6">
            <DraggableTrack hint={toText(uiText.dragHint, locale)} autoScroll>
              {researchCards.map((item, index) => (
                <div key={item.title.en} className={`shrink-0 ${railWidths[index % railWidths.length]}`}>
                  <PlaceholderCardItem item={toCard(item, locale)} index={index} scale={index === 0 ? "lg" : "md"} ctaLabel={toText(uiText.view, locale)} />
                </div>
              ))}
            </DraggableTrack>
          </div>
        </section>

        <section id="resume" className="scroll-mt-28 border-b border-white/10 py-12 md:py-14">
          <HeadingReveal
            eyebrow={toText(uiText.section.resume.eyebrow, locale)}
            title={toText(uiText.section.resume.title, locale)}
            subtitle={toText(uiText.section.resume.subtitle, locale)}
          />
          <div className="mt-6">
            <DraggableTrack hint={toText(uiText.dragHint, locale)} autoScroll>
              {resumeCards.map((item, index) => (
                <div key={item.title.en} className={`shrink-0 ${railWidths[(index + 1) % railWidths.length]}`}>
                  <PlaceholderCardItem item={toCard(item, locale)} compact index={index} scale="sm" ctaLabel={toText(uiText.view, locale)} />
                </div>
              ))}
            </DraggableTrack>
          </div>
        </section>

        <section id="awards" className="scroll-mt-28 border-b border-white/10 py-12 md:py-14">
          <HeadingReveal
            eyebrow={toText(uiText.section.awards.eyebrow, locale)}
            title={toText(uiText.section.awards.title, locale)}
            subtitle={toText(uiText.section.awards.subtitle, locale)}
          />
          <div className="mt-6">
            <DraggableTrack hint={toText(uiText.dragHint, locale)} autoScroll>
              {awardsCards.map((item, index) => (
                <div key={item.title.en} className={`shrink-0 ${railWidths[(index + 2) % railWidths.length]}`}>
                  <PlaceholderCardItem item={toCard(item, locale)} compact={index !== 0} index={index} scale={index === 0 ? "lg" : "sm"} ctaLabel={toText(uiText.view, locale)} />
                </div>
              ))}
            </DraggableTrack>
          </div>
        </section>

        <section id="leadership" className="scroll-mt-28 border-b border-white/10 py-12 md:py-14">
          <HeadingReveal
            eyebrow={toText(uiText.section.leadership.eyebrow, locale)}
            title={toText(uiText.section.leadership.title, locale)}
            subtitle={toText(uiText.section.leadership.subtitle, locale)}
          />
          <div className="mt-6">
            <DraggableTrack hint={toText(uiText.dragHint, locale)} autoScroll>
              {leadershipCards.map((item, index) => (
                <div key={item.title.en} className={`shrink-0 ${railWidths[(index + 3) % railWidths.length]}`}>
                  <PlaceholderCardItem item={toCard(item, locale)} compact index={index} scale={index === 1 ? "md" : "sm"} ctaLabel={toText(uiText.view, locale)} />
                </div>
              ))}
            </DraggableTrack>
          </div>
        </section>

        <section id="volunteer" className="scroll-mt-28 border-b border-white/10 py-12 md:py-14">
          <HeadingReveal
            eyebrow={toText(uiText.section.volunteer.eyebrow, locale)}
            title={toText(uiText.section.volunteer.title, locale)}
            subtitle={toText(uiText.section.volunteer.subtitle, locale)}
          />
          <div className="mt-6">
            <DraggableTrack hint={toText(uiText.dragHint, locale)} autoScroll>
              {volunteerCards.map((item, index) => (
                <div key={item.title.en} className={`shrink-0 ${railWidths[index % railWidths.length]}`}>
                  <PlaceholderCardItem item={toCard(item, locale)} compact index={index} scale="md" ctaLabel={toText(uiText.view, locale)} />
                </div>
              ))}
            </DraggableTrack>
          </div>
        </section>

        <section id="papers" className="scroll-mt-28 border-b border-white/10 py-12 md:py-14">
          <HeadingReveal
            eyebrow={toText(uiText.section.papers.eyebrow, locale)}
            title={toText(uiText.section.papers.title, locale)}
            subtitle={toText(uiText.section.papers.subtitle, locale)}
          />
          <div className="mt-6">
            <DraggableTrack hint={toText(uiText.dragHint, locale)} autoScroll>
              <a
                href="/papers/PAHSJP-301005-G11-final.pdf"
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className="group relative w-[320px] md:w-[620px] min-h-[300px] shrink-0 overflow-hidden rounded-[1.2rem] border border-white/12"
              >
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('/assets/paper1-cover.jpg')" }} />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/90" />
                <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/20 bg-black/45 p-4 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.14em] text-active">{locale === "zh" ? "论文原文 PDF" : "Original PDF"}</p>
                  <h3 className="mt-2 line-clamp-2 text-lg leading-tight text-text">Machine Learning-based Downscaling of Sentinel-5P CO over Beijing</h3>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-[#d7d0c5]">
                    {[
                      "Sentinel-5P",
                      "LightGBM",
                      "CatBoost",
                      "Ridge",
                      locale === "zh" ? "城市 CO" : "Urban CO"
                    ].map((k) => (
                      <span key={k} className="rounded-full border border-white/20 bg-black/35 px-2 py-1">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              </a>

              <a
                href="/papers/1110-Wu-CPCI-final.docx"
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className="group relative w-[320px] md:w-[620px] min-h-[300px] shrink-0 overflow-hidden rounded-[1.2rem] border border-white/12"
              >
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: "url('/assets/paper2-cover.jpg')" }} />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/90" />
                <div className="absolute inset-x-4 bottom-4 rounded-xl border border-white/20 bg-black/45 p-4 backdrop-blur-md">
                  <p className="text-xs uppercase tracking-[0.14em] text-active">{locale === "zh" ? "论文原文 DOCX" : "Original DOCX"}</p>
                  <h3 className="mt-2 line-clamp-2 text-lg leading-tight text-text">
                    Multi-stage Elimination-Optimization for Cooperative Smoke-Screen Scheduling Against Multiple Missiles
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-[#d7d0c5]">
                    {[
                      locale === "zh" ? "烟幕" : "Smoke Screen",
                      "UAV Scheduling",
                      locale === "zh" ? "几何遮蔽" : "Geometric Occlusion",
                      locale === "zh" ? "多导弹防御" : "Multi-Missile Defense"
                    ].map((k) => (
                      <span key={k} className="rounded-full border border-white/20 bg-black/35 px-2 py-1">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            </DraggableTrack>
          </div>
        </section>

        <section id="blog" className="scroll-mt-28 border-b border-white/10 py-12 md:py-14">
          <HeadingReveal
            eyebrow={toText(uiText.section.blog.eyebrow, locale)}
            title={toText(uiText.section.blog.title, locale)}
            subtitle={toText(uiText.section.blog.subtitle, locale)}
          />
          <div className="mt-6">
            <SyncCardWall
              endpoint="/api/blog"
              title={locale === "zh" ? "CSDN 文章自动同步（按浏览量排序）" : "CSDN Auto Sync (sorted by views)"}
              frameLinkLabel={locale === "zh" ? "博客主页" : "Blog Home"}
              emptyText={locale === "zh" ? "未抓取到文章，请确认 CSDN 主页链接。" : "No posts fetched. Please verify CSDN profile URL."}
              dragHint={toText(uiText.dragHint, locale)}
            />
          </div>
        </section>

        <section id="github" className="scroll-mt-28 border-b border-white/10 py-12 md:py-14">
          <HeadingReveal
            eyebrow={toText(uiText.section.github.eyebrow, locale)}
            title={toText(uiText.section.github.title, locale)}
            subtitle={toText(uiText.section.github.subtitle, locale)}
          />
          <div className="mt-6">
            <SyncCardWall
              endpoint="/api/github"
              title={locale === "zh" ? "GitHub 项目自动同步（按热度排序）" : "GitHub Projects Auto Sync (sorted by popularity)"}
              frameLinkLabel={locale === "zh" ? "GitHub 主页" : "GitHub Home"}
              emptyText={locale === "zh" ? "未抓取到项目，请确认 GitHub 用户名。" : "No repositories fetched. Please verify GitHub username."}
              dragHint={toText(uiText.dragHint, locale)}
            />
          </div>
        </section>

        <section id="contact" className="scroll-mt-28 pt-12 md:pt-14">
          <HeadingReveal
            eyebrow={toText(uiText.section.contact.eyebrow, locale)}
            title={toText(uiText.section.contact.title, locale)}
            subtitle={toText(uiText.section.contact.subtitle, locale)}
          />
          <div className="mt-6 rounded-[1.5rem] border border-white/12 bg-surface/80 p-4 md:p-6">
            <DraggableTrack hint={toText(uiText.dragHint, locale)} autoScroll>
              {[
                { title: locale === "zh" ? "邮箱" : "Email", value: locale === "zh" ? "联系方式占位" : "Placeholder contact channel" },
                { title: "GitHub", value: locale === "zh" ? "主页渠道占位" : "Placeholder profile channel" },
                { title: locale === "zh" ? "学校" : "University", value: toText(identity.university, locale) }
              ].map((item) => (
                <motion.button
                  key={item.title}
                  data-cursor="link"
                  whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.02 }}
                  className="group w-[280px] md:w-[360px] shrink-0 rounded-[1.1rem] border border-white/10 bg-surface2/70 p-5 text-left transition-all hover:border-active/60 hover:shadow-[0_16px_38px_rgba(0,0,0,0.4)]"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">{item.title}</p>
                  <p className="mt-2 text-sm text-text">{item.value}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted transition-colors group-hover:text-active">
                    {toText(uiText.placeholderAction, locale)} ↗
                  </p>
                </motion.button>
              ))}
            </DraggableTrack>
          </div>
        </section>
      </main>
    </>
  );
}

