"use client";

import {
  awardsCards,
  blogCards,
  focusTags,
  githubProjectCards,
  identity,
  leadershipCards,
  navItems,
  papersCards,
  researchCards,
  resumeCards,
  volunteerCards
} from "@/data/site";
import { CustomCursor } from "@/components/custom-cursor";
import { DraggableTrack } from "@/components/draggable-track";
import { MagneticButton } from "@/components/magnetic-button";
import { PlaceholderCardItem } from "@/components/placeholder-card";
import { SectionReveal } from "@/components/section-reveal";
import { StickyNav } from "@/components/sticky-nav";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <SectionReveal className="mb-8 md:mb-10">
      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-accent">{title}</p>
      <h2 className="text-2xl font-semibold tracking-tight text-text md:text-4xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">{subtitle}</p>
    </SectionReveal>
  );
}

export function HomePage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [activeTag, setActiveTag] = useState(focusTags[0]);
  const prefersReducedMotion = useReducedMotion();

  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);

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
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0.15, 0.3, 0.55]
      }
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  const tagsLane = [...focusTags, ...focusTags.slice(0, 6)];

  return (
    <>
      <CustomCursor />
      <StickyNav items={navItems} activeId={activeSection} />
      <main className="relative mx-auto max-w-[1200px] px-4 pb-24 pt-28 md:px-8 md:pt-32">
        <section id="hero" className="scroll-mt-28 border-b border-white/10 pb-20 md:pb-28">
          <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <SectionReveal>
              <p className="mb-4 text-xs uppercase tracking-[0.24em] text-muted">Research-Oriented Portfolio</p>
              <motion.h1
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 28, clipPath: "inset(0 0 100% 0)" }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                transition={{ duration: 0.95, ease: [0.2, 1, 0.3, 1] }}
                className="text-5xl font-semibold leading-[0.92] tracking-[-0.03em] text-text md:text-7xl lg:text-8xl"
              >
                {identity.name}
              </motion.h1>
              <div className="mt-6 space-y-2 text-base text-muted md:text-lg">
                <p>{identity.university}</p>
                <p>{identity.major}</p>
              </div>
              <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted md:text-base">
                A modern academic single-page interface designed for computer science and research expression.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <MagneticButton href="#research" label="Explore" />
                <MagneticButton href="#contact" label="Contact" variant="ghost" />
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <motion.aside
                data-cursor="card"
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-surface p-6 shadow-card transition-colors md:p-8"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.018, rotateX: 1.8, rotateY: -1.8, y: -4 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(208,255,0,0.14),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative space-y-6">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-muted">
                    <span>Preview</span>
                    <motion.span whileHover={prefersReducedMotion ? undefined : { rotate: 6, x: 3 }}>
                      ↗
                    </motion.span>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-surface2 p-5">
                    <p className="text-xs uppercase tracking-[0.16em] text-muted">Current Identity</p>
                    <p className="mt-3 text-2xl text-text">{identity.name}</p>
                    <p className="mt-2 text-sm text-muted">{identity.university}</p>
                    <p className="text-sm text-muted">{identity.major}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {["Research", "Portfolio", "Interactive", "Academic"].map((item) => (
                      <button
                        key={item}
                        data-cursor="link"
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.14em] text-muted transition-all hover:-translate-y-0.5 hover:border-active/60 hover:text-active"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.aside>
            </SectionReveal>
          </div>
        </section>

        <section id="focus" className="scroll-mt-28 border-b border-white/10 py-16 md:py-20">
          <SectionHeading
            title="Selected Focus"
            subtitle="Interactive tags with draggable behavior. Hover and drag to explore direction clusters."
          />
          <DraggableTrack>
            <div className="grid grid-flow-col grid-rows-2 gap-3">
              {tagsLane.map((tag, index) => {
                const isActive = activeTag === tag;
                return (
                  <motion.button
                    key={`${tag}-${index}`}
                    onClick={() => setActiveTag(tag)}
                    data-cursor="drag"
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.05, y: -2 }}
                    className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.16em] transition-all md:text-sm ${
                      isActive
                        ? "border-active bg-active text-base"
                        : "border-white/15 bg-white/5 text-muted hover:border-accent hover:bg-accent hover:text-base"
                    }`}
                  >
                    {tag}
                  </motion.button>
                );
              })}
            </div>
          </DraggableTrack>
          <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted">Drag to explore →</p>
        </section>

        <section id="about" className="scroll-mt-28 border-b border-white/10 py-16 md:py-24">
          <SectionHeading
            title="About"
            subtitle="A restrained block for personal introduction and future narrative."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <SectionReveal className="rounded-2xl border border-white/10 bg-surface p-6 md:p-8">
              <p className="text-lg leading-relaxed text-text">Placeholder academic introduction paragraph.</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Placeholder description for research interests, current study direction, and future goals.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1} className="rounded-2xl border border-white/10 bg-surface2 p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Profile Highlights</p>
              <ul className="mt-5 space-y-3 text-sm text-muted">
                {["Placeholder point one", "Placeholder point two", "Placeholder point three"].map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-colors hover:border-active/60 hover:text-text"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </SectionReveal>
          </div>
        </section>

        <section id="research" className="scroll-mt-28 border-b border-white/10 py-16 md:py-24">
          <SectionHeading
            title="Research"
            subtitle="Core research directions presented as high-interaction cards with reserved links for future detail pages."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {researchCards.map((item, index) => (
              <PlaceholderCardItem key={item.title} item={item} index={index} />
            ))}
          </div>
        </section>

        <section id="resume" className="scroll-mt-28 border-b border-white/10 py-16 md:py-24">
          <SectionHeading
            title="Resume"
            subtitle="Placeholder resume architecture with list-oriented cards for timeline and capability sections."
          />
          <div className="space-y-4">
            {resumeCards.map((item, index) => (
              <PlaceholderCardItem key={item.title} item={item} compact index={index} />
            ))}
          </div>
        </section>

        <section id="awards" className="scroll-mt-28 border-b border-white/10 py-16 md:py-24">
          <SectionHeading
            title="Awards & Honors"
            subtitle="Bento-style placeholders for future honors, recognitions, and distinctions."
          />
          <div className="grid gap-4 md:grid-cols-4 md:grid-rows-2">
            {awardsCards.map((item, index) => (
              <div key={item.title} className={index === 0 ? "md:col-span-2 md:row-span-2" : "md:col-span-2"}>
                <PlaceholderCardItem item={item} compact={index !== 0} index={index} />
              </div>
            ))}
          </div>
        </section>

        <section id="leadership" className="scroll-mt-28 border-b border-white/10 py-16 md:py-24">
          <SectionHeading
            title="Leadership"
            subtitle="Structured placeholders prepared for leadership experiences and team-oriented contributions."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {leadershipCards.map((item, index) => (
              <PlaceholderCardItem key={item.title} item={item} compact index={index} />
            ))}
          </div>
        </section>

        <section id="volunteer" className="scroll-mt-28 border-b border-white/10 py-16 md:py-24">
          <SectionHeading
            title="Volunteer Service"
            subtitle="Future-facing service records and outreach activities presented in a balanced two-column layout."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {volunteerCards.map((item, index) => (
              <PlaceholderCardItem key={item.title} item={item} compact index={index} />
            ))}
          </div>
        </section>

        <section id="papers" className="scroll-mt-28 border-b border-white/10 py-16 md:py-24">
          <SectionHeading
            title="Papers"
            subtitle="Draggable paper strip prepared for publication cards and manuscript previews."
          />
          <DraggableTrack className="snap-x">
            {papersCards.map((item, index) => (
              <div key={item.title} className="w-[260px] shrink-0 snap-start md:w-[320px]">
                <PlaceholderCardItem item={item} compact={false} index={index} />
              </div>
            ))}
          </DraggableTrack>
          <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted">Drag this track horizontally →</p>
        </section>

        <section id="blog" className="scroll-mt-28 border-b border-white/10 py-16 md:py-24">
          <SectionHeading
            title="Blog"
            subtitle="Placeholder editorial cards for future articles and research notes."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {blogCards.map((item, index) => (
              <PlaceholderCardItem key={item.title} item={item} compact index={index} />
            ))}
          </div>
        </section>

        <section id="github" className="scroll-mt-28 border-b border-white/10 py-16 md:py-24">
          <SectionHeading
            title="GitHub & Projects"
            subtitle="Placeholder project matrix prepared for repositories, demos, and engineering showcases."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {githubProjectCards.map((item, index) => (
              <PlaceholderCardItem key={item.title} item={item} compact index={index} />
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-28 pt-16 md:pt-24">
          <SectionHeading
            title="Contact"
            subtitle="A clean endpoint with placeholders for email, GitHub, and academic contact channels."
          />
          <div className="rounded-3xl border border-white/10 bg-surface p-6 md:p-10">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { title: "Email", value: "Placeholder contact channel" },
                { title: "GitHub", value: "Placeholder profile channel" },
                { title: "University", value: identity.university }
              ].map((item) => (
                <motion.button
                  key={item.title}
                  data-cursor="link"
                  whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.02 }}
                  className="group rounded-2xl border border-white/10 bg-surface2 p-5 text-left transition-all hover:border-active/60"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">{item.title}</p>
                  <p className="mt-3 text-sm text-text">{item.value}</p>
                  <p className="mt-5 text-xs uppercase tracking-[0.16em] text-muted transition-colors group-hover:text-active">
                    Placeholder action ↗
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
