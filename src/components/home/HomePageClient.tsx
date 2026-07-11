"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { StickyNavbar } from "@/components/site/StickyNavbar";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { useLanguage } from "@/components/language/LanguageProvider";
import { cn } from "@/lib/cn";
import { ArrowRight, Sparkles, Calculator, Briefcase, Megaphone, Building2 } from "lucide-react";

const SERVICE_CARD_CONFIG = [
  { icon: Calculator, href: "/services/accounting-tax-consultancy" },
  { icon: Briefcase, href: "/services/management-consultancy" },
  { icon: Megaphone, href: "/services/digital-marketing-media" },
  { icon: Building2, href: "/services/usa-company-formation" },
];

function HeroBackground() {
  const reducedMotion = useReducedMotion();
  return (
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2200&q=80"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-[0.16] dark:opacity-[0.22]"
      />

      <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[rgba(var(--primary),0.08)] blur-3xl" />
      <div className="absolute inset-0 opacity-90">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(var(--primary),0.12),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(var(--accent),0.06),transparent_45%)]" />
      </div>

      <div className="absolute inset-0 opacity-[0.5]">
        <motion.div
          aria-hidden="true"
          animate={reducedMotion ? undefined : { y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 top-10 h-[520px] w-[420px] rounded-[42px] border border-white/20 bg-gradient-to-br from-white/10 to-blue-50/5 glass-strong"
        />
      </div>

      <div className="absolute inset-0 opacity-[0.55]">
        <motion.div
          aria-hidden="true"
          animate={reducedMotion ? undefined : { rotate: [0, 2, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-180px] right-[-180px] h-[420px] w-[380px] rounded-full border border-blue-200/30 bg-[rgba(var(--primary-light),0.04)] blur-xl"
        />
      </div>
    </div>
  );
}

export default function HomePageClient() {
  const { t, translation } = useLanguage();

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-fg)]">
      <StickyNavbar />

      <main className="pt-[var(--total-header-h)]">
        {/* HERO */}
        <section className="relative">
          <HeroBackground />
          <Container>
            <div className="relative pt-16 pb-14 sm:pt-20 sm:pb-20">
              <div className="grid items-center gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    className="flex flex-col gap-7"
                  >
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 glass-strong px-4 py-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="text-[13px] font-semibold tracking-wide text-fg/90">
                        {t("home.heroTag")}
                      </span>
                      <span className="text-[13px] text-muted">•</span>
                      <span className="text-[13px] font-medium text-muted">{t("home.heroTagCopy")}</span>
                    </div>

                    <h1 className="text-balance text-[40px] font-black tracking-tight text-fg sm:text-[54px] lg:text-[60px] leading-[1.02]">
                      {t("home.heroTitleLine1")}
                      <span className="block text-primary">
                        {t("home.heroTitleLine2")}
                      </span>
                    </h1>

                    <p className="max-w-2xl text-[16px] leading-7 text-muted">
                      {t("home.heroDescription")}
                    </p>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      <Link
                        href="/services"
                        className={cn(
                          "inline-flex items-center justify-center gap-2 rounded-full",
                          "bg-primary text-white font-extrabold tracking-tight",
                          "px-6 py-3 shadow-[0_20px_50px_rgba(var(--primary),0.25)]",
                          "hover:brightness-[1.05] hover:scale-105 hover:-translate-y-0.5 transition-all duration-300",
                          "active:scale-95 cursor-pointer"
                        )}
                      >
                        {t("home.exploreServices")}
                        <ArrowRight className="h-4 w-4" />
                      </Link>

                      <Link
                        href="/about-us"
                        className={cn(
                          "inline-flex items-center justify-center gap-2 rounded-full",
                          "border border-white/20 glass px-6 py-3",
                          "font-semibold text-fg/90 hover:bg-white/10",
                          "hover:scale-105 hover:-translate-y-0.5 transition-all duration-300",
                          "active:scale-95 cursor-pointer"
                        )}
                      >
                        {t("home.learnAboutUs")}
                      </Link>
                    </div>
                  </motion.div>
                </div>

                <div className="lg:col-span-5">
                  <motion.div
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12, duration: 0.65, ease: "easeOut" }}
                    className="rounded-[28px] border border-white/20 bg-white/10 glass-strong p-5 sm:p-6"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-col">
                        <span className="text-[13px] text-muted">{t("home.trustedLabel")}</span>
                        <span className="text-[18px] font-extrabold tracking-tight">{t("home.advantageTitle")}</span>
                      </div>
                      <div className="h-10 w-10 rounded-2xl border border-primary/30 bg-[rgba(var(--primary),0.08)] flex items-center justify-center">
                        <span className="text-primary font-black">AG</span>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-3">
                      {translation.home.featurePoints.map((p: { title: string; desc: string }) => (
                        <div
                          key={p.title}
                          className="rounded-2xl border border-white/15 bg-white/10 glass p-4 hover:bg-white/15 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1 h-6 w-6 rounded-xl bg-[rgba(var(--primary),0.15)] border border-primary/20 flex items-center justify-center">
                              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            </div>
                            <div>
                              <div className="text-[14px] font-bold tracking-tight text-fg/95">
                                {p.title}
                              </div>
                              <div className="text-[13px] leading-6 text-muted pt-1">
                                {p.desc}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                  </motion.div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* SERVICES PREVIEW */}
        <Section>
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-[32px] sm:text-[40px] font-black tracking-tight text-fg mb-4">
                {t("home.servicesTitle")}
              </h2>
              <p className="text-muted text-lg max-w-2xl mx-auto">
                {t("home.servicesCopy")}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
              {translation.home.servicesCards.map((service: { title: string; href: string }, i: number) => {
                const Icon = SERVICE_CARD_CONFIG[i]?.icon ?? Building2;
                const href = SERVICE_CARD_CONFIG[i]?.href ?? service.href;
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="text-center"
                  >
                    <Link href={href} className="group block">
                      <Icon className="h-16 w-16 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center">
              <Link
                href="/services"
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-full",
                  "bg-primary text-white font-extrabold tracking-tight",
                  "px-8 py-4 shadow-[0_20px_50px_rgba(var(--primary),0.25)]",
                  "hover:brightness-[1.05] transition-all duration-200"
                )}
              >
                {t("home.viewAllServices")}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </Container>
        </Section>

        {/* CTA */}
        <Section>
          <Container>
            <div className="rounded-[28px] border border-white/20 bg-gradient-to-r from-primary/5 to-accent/5 glass-strong p-8 sm:p-12 text-center">
              <h2 className="text-[28px] sm:text-[36px] font-black tracking-tight text-fg mb-4">
                {t("home.ctaTitle")}
              </h2>
              <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
                {t("home.ctaCopy")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact-us"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-full",
                    "bg-primary text-white font-extrabold tracking-tight",
                    "px-8 py-4 shadow-[0_20px_50px_rgba(var(--primary),0.25)]",
                    "hover:brightness-[1.05] transition-all duration-200"
                  )}
                >
                  {t("home.getStarted")}
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/about-us"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 glass px-8 py-4 font-semibold text-fg/90 hover:bg-white/10 transition-colors"
                >
                  {t("home.learnMore")}
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </div>
  );
}
