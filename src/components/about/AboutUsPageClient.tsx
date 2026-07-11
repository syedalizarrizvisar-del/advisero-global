"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { StickyNavbar } from "@/components/site/StickyNavbar";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { cn } from "@/lib/cn";
import { useLanguage } from "@/components/language/LanguageProvider";
import { ArrowRight, ShieldCheck, CheckCircle2, Users, Target, Award } from "lucide-react";

export default function AboutUsPageClient() {
  const { t, translation } = useLanguage();

  const aboutCards = translation.about.cards as Array<{
    title: string;
    desc: string;
  }>;

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-fg)]">
      <StickyNavbar />

      <main className="pt-[var(--total-header-h)]">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <Container>
            <div className="relative pt-16 pb-20">
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                  className="flex flex-col gap-6"
                >
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 glass-strong px-4 py-2 w-fit">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-[13px] font-semibold tracking-wide text-fg/90">
                      {t("about.heroTag")}
                    </span>
                  </div>

                  <h1 className="text-balance text-[40px] font-black tracking-tight text-fg sm:text-[54px] leading-[1.02]">
                    {t("about.heroTitleLine1")}
                    <span className="block text-primary">{t("about.heroTitleLine2")}</span>
                  </h1>

                  <p className="max-w-2xl text-[16px] leading-7 text-muted">{t("about.heroCopy")}</p>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Link
                      href="/contact-us"
                      className={cn(
                        "inline-flex items-center justify-center gap-2 rounded-full",
                        "bg-primary text-white font-extrabold tracking-tight",
                        "px-6 py-3 shadow-[0_20px_50px_rgba(var(--primary),0.25)]",
                        "hover:brightness-[1.05] transition-all duration-200"
                      )}
                    >
                      {t("about.workWithUs")}
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      href="/services"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 glass px-6 py-3 font-semibold text-fg/90 hover:bg-white/10 transition-colors"
                    >
                      {t("about.ourServices")}
                    </Link>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.65, ease: "easeOut" }}
                  className="relative"
                >
                  <div className="rounded-[28px] border border-white/20 bg-white/10 glass-strong p-8">
                    <div className="relative aspect-video overflow-hidden rounded-2xl mb-6 bg-slate-950/5">
                      <Image
                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 520px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent" />
                    </div>
                    <div className="text-center">
                      <Award className="h-16 w-16 text-primary mx-auto mb-4" />
                      <div className="text-lg font-bold">{aboutCards[2]?.title}</div>
                      <div className="text-sm text-muted mt-2">{aboutCards[2]?.desc}</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </Container>
        </section>

        {/* MISSION & VISION */}
        <Section>
          <Container>
            <div className="grid gap-8 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="rounded-[28px] border border-white/20 bg-white/10 glass-strong p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-bold">{t("about.missionTitle")}</h3>
                </div>
                <p className="text-muted leading-7">{t("about.missionCopy")}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-[28px] border border-white/20 bg-white/10 glass-strong p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Award className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-bold">{t("about.visionTitle")}</h3>
                </div>
                <p className="text-muted leading-7">{t("about.visionCopy")}</p>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* WHY CHOOSE US */}
        <Section>
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-[32px] sm:text-[40px] font-black tracking-tight text-fg mb-4">
                {t("about.whyChooseTitle")}
              </h2>
              <p className="text-muted text-lg max-w-2xl mx-auto">{t("about.whyChooseCopy")}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {aboutCards.map((item, i) => {
                const Icon = i === 0 ? ShieldCheck : i === 1 ? CheckCircle2 : Users;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="rounded-[22px] border border-white/20 bg-white/10 glass-strong p-6 hover:bg-white/15 transition-colors"
                  >
                    <Icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted leading-6">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* CTA */}
        <Section>
          <Container>
            <div className="rounded-[28px] border border-white/20 bg-gradient-to-r from-primary/5 to-accent/5 glass-strong p-8 sm:p-12 text-center">
              <h2 className="text-[28px] sm:text-[36px] font-black tracking-tight text-fg mb-4">
                {t("about.ctaTitle")}
              </h2>
              <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">{t("about.ctaCopy")}</p>
              <Link
                href="/contact-us"
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-full",
                  "bg-primary text-white font-extrabold tracking-tight",
                  "px-8 py-4 shadow-[0_20px_50px_rgba(var(--primary),0.25)]",
                  "hover:brightness-[1.05] transition-all duration-200"
                )}
              >
                {t("about.ctaAction")}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </Container>
        </Section>
      </main>
    </div>
  );
}
