"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calculator,
  Briefcase,
  Megaphone,
  ShoppingCart,
  GraduationCap,
  Building2,
  Receipt,
  CheckCircle2,
} from "lucide-react";
import { StickyNavbar } from "@/components/site/StickyNavbar";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { cn } from "@/lib/cn";
import { useLanguage } from "@/components/language/LanguageProvider";
import { SERVICES, type ServiceIconName } from "@/lib/services-data";

const ICON_MAP: Record<ServiceIconName, React.ComponentType<{ className?: string }>> = {
  Calculator,
  Briefcase,
  Megaphone,
  ShoppingCart,
  GraduationCap,
  Building2,
  Receipt,
};

export default function ServiceDetailPageClient({ slug }: { slug: string }) {
  const { lang } = useLanguage();
  const service = SERVICES[slug];

  if (!service) {
    return (
      <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-fg)]">
        <StickyNavbar />
        <main className="pt-[var(--total-header-h)]">
          <Section>
            <Container>
              <h1 className="text-3xl font-black">Service not found</h1>
              <Link href="/services" className="text-primary underline">
                Back to services
              </Link>
            </Container>
          </Section>
        </main>
      </div>
    );
  }

  const Icon = ICON_MAP[service.icon];
  const b = (v: { en: string; ae: string }) => (lang === "ae" ? v.ae : v.en);

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
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="text-[13px] font-semibold tracking-wide text-fg/90">
                      {b(service.heroTag)}
                    </span>
                  </div>

                  <h1 className="text-balance text-[40px] font-black tracking-tight text-fg sm:text-[54px] leading-[1.02]">
                    {b(service.heroTitleLine1)}
                    <span className="block text-primary">{b(service.heroTitleLine2)}</span>
                  </h1>

                  <p className="max-w-2xl text-[16px] leading-7 text-muted">{b(service.heroCopy)}</p>

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
                      {b(service.ctaLabel)}
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      href="/services"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 glass px-6 py-3 font-semibold text-fg/90 hover:bg-white/10 transition-colors"
                    >
                      All Services
                    </Link>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.65, ease: "easeOut" }}
                  className="rounded-[28px] border border-white/20 bg-white/10 glass-strong p-8"
                >
                  <Icon className="h-14 w-14 text-primary mb-5" />
                  <h2 className="text-2xl font-black mb-3">{b(service.title)}</h2>
                  <p className="text-muted leading-7">{b(service.heroCopy)}</p>
                </motion.div>
              </div>
            </div>
          </Container>
        </section>

        {/* FEATURES */}
        <Section>
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-[32px] sm:text-[40px] font-black tracking-tight text-fg mb-4">
                {b(service.title)}
              </h2>
              <p className="text-muted text-lg max-w-2xl mx-auto">{b(service.heroCopy)}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {service.features.map((feature, i) => (
                <motion.div
                  key={b(feature.title)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="rounded-[22px] border border-white/20 bg-white/10 glass-strong p-6 hover:bg-white/15 transition-colors"
                >
                  <h3 className="text-xl font-bold mb-3">{b(feature.title)}</h3>
                  <p className="text-muted leading-6">{b(feature.description)}</p>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* BENEFITS */}
        <Section>
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-[32px] sm:text-[40px] font-black tracking-tight text-fg mb-6">
                  {b(service.benefitsTitleLine1)}
                  <span className="block text-primary">{b(service.benefitsTitleLine2)}</span>
                </h2>
                <p className="text-muted text-lg leading-7 mb-8">{b(service.benefitsCopy)}</p>
                <div className="grid gap-3">
                  {service.benefits.map((benefit) => (
                    <div key={b(benefit)} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-muted">{b(benefit)}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-[28px] border border-white/20 bg-white/10 glass-strong p-8"
              >
                <h3 className="text-xl font-bold mb-6">{b(service.processTitle)}</h3>
                <div className="space-y-4">
                  {service.steps.map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                        {item.step}
                      </div>
                      <div>
                        <div className="font-semibold">{b(item.title)}</div>
                        <div className="text-muted text-sm">{b(item.desc)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* CTA */}
        <Section>
          <Container>
            <div className="rounded-[28px] border border-white/20 bg-gradient-to-r from-primary/5 to-accent/5 glass-strong p-8 sm:p-12 text-center">
              <h2 className="text-[28px] sm:text-[36px] font-black tracking-tight text-fg mb-4">
                {b(service.ctaTitle)}
              </h2>
              <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">{b(service.ctaCopy)}</p>
              <Link
                href="/contact-us"
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-full",
                  "bg-primary text-white font-extrabold tracking-tight",
                  "px-8 py-4 shadow-[0_20px_50px_rgba(var(--primary),0.25)]",
                  "hover:brightness-[1.05] transition-all duration-200"
                )}
              >
                {b(service.ctaLabel)}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </Container>
        </Section>
      </main>
    </div>
  );
}
