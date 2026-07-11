"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { StickyNavbar } from "@/components/site/StickyNavbar";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { useLanguage } from "@/components/language/LanguageProvider";
import { ArrowRight, Sparkles, Users, Lightbulb, Globe2, HeartHandshake, TrendingUp } from "lucide-react";

const WHY_ITEMS = [
  {
    titleKey: "careers.whyItems.0",
    icon: Sparkles,
  },
  {
    titleKey: "careers.whyItems.1",
    icon: Users,
  },
  {
    titleKey: "careers.whyItems.2",
    icon: Lightbulb,
  },
  {
    titleKey: "careers.whyItems.3",
    icon: Globe2,
  },
  {
    titleKey: "careers.whyItems.4",
    icon: TrendingUp,
  },
  {
    titleKey: "careers.whyItems.5",
    icon: HeartHandshake,
  },
];

export default function CareersPage() {
  const { t, translation } = useLanguage();
  const heroCopy: string[] = translation.careers.heroCopy.split("\n\n");
  const cultureCopy: string[] = translation.careers.cultureCopy.split("\n\n");

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-fg)]">
      <StickyNavbar />

      <main className="pt-[var(--total-header-h)]">
        <section className="relative overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2200&q=80"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.10] dark:opacity-[0.18]"
          />
          <Container>
            <div className="relative pt-16 pb-20">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="grid gap-10 lg:grid-cols-12 items-center"
              >
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 glass-strong px-4 py-2 mb-6">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-[13px] font-semibold tracking-wide text-fg/90">
                      {t("careers.heroTitle")}
                    </span>
                  </div>

                  <h1 className="text-balance text-[40px] font-black tracking-tight text-fg sm:text-[54px] leading-[1.02] mb-6">
                    {t("careers.heroTitle")}
                  </h1>

                  <div className="space-y-5 text-[16px] leading-8 text-muted max-w-3xl">
                    {heroCopy.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-10">
                    <Link
                      href="/careers/application"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-white font-extrabold tracking-tight shadow-[0_20px_50px_rgba(var(--primary),0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-[1.05]"
                    >
                      {t("careers.heroButton")}
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="rounded-[28px] border border-white/20 bg-white/10 glass-strong p-8 shadow-xl">
                    <div className="text-center">
                      <Users className="mx-auto h-16 w-16 text-primary mb-5" />
                      <div className="text-[40px] font-black text-fg mb-3">Join</div>
                      <div className="text-muted leading-7">
                        {t("careers.heroTitle")} {t("careers.heroButton")}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <div className="grid gap-10 lg:grid-cols-1 items-start">
              <div>
                <h2 className="text-[32px] sm:text-[40px] font-black tracking-tight text-fg mb-6">
                  {t("careers.cultureTitle")}
                </h2>
                <div className="space-y-5 text-muted text-[16px] leading-8 max-w-3xl">
                  {cultureCopy.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/20 bg-white/10 glass-strong p-8 shadow-xl">
                <div className="text-[17px] font-semibold text-fg mb-4 text-center">
                  {t("careers.whyTitle")}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {WHY_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.titleKey}
                        className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-200 hover:border-primary/20 hover:bg-white/15"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <Icon className="h-5 w-5" />
                          </span>
                          <div className="text-lg font-semibold">
                            {t(item.titleKey)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        <Section>
          <Container>
            <div className="rounded-[28px] border border-white/20 bg-gradient-to-r from-primary/5 to-accent/5 glass-strong p-10 text-center shadow-xl">
              <h2 className="text-[32px] sm:text-[40px] font-black tracking-tight text-fg mb-4">
                {t("careers.applicationTitle")}
              </h2>
              <div className="text-muted text-[16px] leading-8 max-w-2xl mx-auto mb-8">
                {t("careers.cultureCopy")}
              </div>
              <Link
                href="/careers/application"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-white font-extrabold tracking-tight shadow-[0_20px_50px_rgba(var(--primary),0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-[1.05]"
              >
                {t("careers.applyButton")}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </Container>
        </Section>
      </main>
    </div>
  );
}
