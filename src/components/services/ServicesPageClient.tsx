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
import {
  ArrowRight,
  Calculator,
  Briefcase,
  Megaphone,
  ShoppingCart,
  GraduationCap,
  Building2,
  FileText,
  Receipt,
} from "lucide-react";

type ServiceRouteKey =
  | "accounting"
  | "management"
  | "marketing"
  | "ecommerce"
  | "training"
  | "usa"
  | "uk"
  | "vat";

const SERVICE_ICON_MAP: Record<ServiceRouteKey, React.ComponentType<{ className?: string }>> = {
  accounting: Calculator,
  management: Briefcase,
  marketing: Megaphone,
  ecommerce: ShoppingCart,
  training: GraduationCap,
  usa: Building2,
  uk: Building2,
  vat: Receipt,
};

const SERVICE_ROUTE: Record<ServiceRouteKey, string> = {
  accounting: "/services/accounting-tax-consultancy",
  management: "/services/management-consultancy",
  marketing: "/services/digital-marketing-media",
  ecommerce: "/services/retail-e-commerce",
  training: "/services/training-professional-development",
  usa: "/services/usa-company-formation",
  uk: "/services/uk-company-formation",
  vat: "/services/vat-tax-advisory",
};

export default function ServicesPageClient() {
  const { t } = useLanguage();

  const services: Array<{
    key: ServiceRouteKey;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    features: string[];
  }> = [
    // 1) International VAT & Tax first
    {
      key: "vat",
      icon: SERVICE_ICON_MAP.vat,
      title: "International VAT & Tax Services",
      description: "Cross-border VAT, corporate tax support, and compliance management across multiple jurisdictions.",
      features: [
        "VAT Registration Services (All Regions)",
        "VAT Return Filing & Management",
        "Corporate Tax Support & Advisory",
        "Tax Compliance Assistance",
        "International Tax Consultancy",
      ],
    },

    // 2) UAE Business Setup second
    {
      key: "management",
      icon: SERVICE_ICON_MAP.management,
      title: "UAE Business Setup Services",
      description: "End-to-end assistance for launching your business in the UAE with smooth documentation and compliance coordination.",
      features: [
        "Mainland & Free Zone Company Formation",
        "Dubai Trade License Assistance",
        "Complete Documentation Processing",
        "UAE Business Bank Account Guidance",
        "Corporate Structuring Support",
        "Licensing & Compliance Coordination",
      ],
    },

    // 3) Other country business setups (UK / USA / Europe)
    {
      key: "uk",
      icon: SERVICE_ICON_MAP.uk,
      title: "UK Business Setup Services",
      description: "UK company formation guidance with documentation support and ongoing compliance structure.",
      features: [
        "UK LTD Company Formation",
        "Companies House Registration",
        "Complete Documentation Guidance",
        "UK Business Bank Account Assistance",
        "Compliance & Annual Filing Support",
        "Company Closure / Dissolution Services",
      ],
    },
    {
      key: "usa",
      icon: SERVICE_ICON_MAP.usa,
      title: "USA Business Setup Services",
      description: "Formation support with EIN registration, documentation guidance, and compliance setup.",
      features: [
        "USA LLC & Corporation Formation",
        "EIN Registration Support",
        "State Business Registration",
        "Complete Documentation Guidance",
        "USA Business Bank Account Assistance",
        "Registered Agent Guidance & Compliance Setup",
      ],
    },
    {
      key: "accounting",
      icon: SERVICE_ICON_MAP.accounting,
      title: "Europe Business Setup Services",
      description: "Country-wise incorporation assistance designed for efficient setup and dependable compliance support.",
      features: [
        "EU Company Registration & Incorporation",
        "Country-wise Business Setup Support",
        "Complete Legal Documentation Assistance",
        "European Business Bank Account Guidance",
        "Compliance & Licensing Support",
        "Business Expansion Advisory",
      ],
    },

    // 4) Core business services last
    {
      key: "accounting",
      icon: SERVICE_ICON_MAP.accounting,
      title: "Accounting, Bookkeeping & Tax Consultancy",
      description: "Reliable accounting workflows with tax consultancy and verification-focused financial reporting.",
      features: [
        "Accounting & bookkeeping services",
        "Tax consultancy & return preparation",
        "Financial reporting & transaction verification",
      ],
    },
    {
      key: "management",
      icon: SERVICE_ICON_MAP.management,
      title: "Management & Business Consultancy",
      description: "Strategic guidance and operational support to help businesses scale with clarity and control.",
      features: [
        "Business strategy & management consulting",
        "Project & operations management",
        "Immigration & logistics advisory services",
      ],
    },
    {
      key: "marketing",
      icon: SERVICE_ICON_MAP.marketing,
      title: "Advertising, Marketing & Media",
      description: "Growth-focused campaigns and media management to strengthen brand presence and drive results.",
      features: [
        "Digital marketing & online advertising",
        "Branding & social media management",
        "PR, media & sales promotion services",
      ],
    },
    {
      key: "training",
      icon: SERVICE_ICON_MAP.training,
      title: "Education, Training & Professional Development",
      description: "Structured learning programs designed to build capability and support long-term performance.",
      features: [
        "Corporate training consultancy",
        "Professional skill development programs",
        "Business learning & development solutions",
      ],
    },
    {
      key: "ecommerce",
      icon: SERVICE_ICON_MAP.ecommerce,
      title: "Retail & E-Commerce",
      description: "Online retail and multi-channel selling support for smooth day-to-day e-commerce operations.",
      features: [
        "Online retail & Internet-based sales",
        "Ecommerce operations support",
        "Multi-channel product selling solutions",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-fg)]">
      <StickyNavbar />

      <main className="pt-[var(--total-header-h)]">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <Image
            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2200&q=80"
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
                className="text-center"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 glass-strong px-4 py-2 mb-6">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-[13px] font-semibold tracking-wide text-fg/90">
                    {t("services.heroTag")}
                  </span>
                </div>

                <h1 className="text-balance text-[40px] font-black tracking-tight text-fg sm:text-[54px] leading-[1.02] mb-6">
                  {t("services.heroTitleLine1")}
                  <span className="block text-primary">{t("services.heroTitleLine2")}</span>
                </h1>

                <p className="max-w-3xl text-[16px] leading-7 text-muted mx-auto mb-8">
                  {t("services.heroCopy")}
                </p>

                <Link
                  href="/contact-us"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-full",
                    "bg-primary text-white font-extrabold tracking-tight",
                    "px-8 py-4 shadow-[0_20px_50px_rgba(var(--primary),0.25)]",
                    "hover:brightness-[1.05] transition-all duration-200"
                  )}
                >
                  {t("services.getStarted")}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* SERVICES GRID */}
        <Section>
          <Container>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {services.map((service, i) => (
                <motion.div
                  key={`${service.title || "service"}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group"
                >
                  <Link href={SERVICE_ROUTE[service.key]}>
                    <div className="rounded-[22px] border border-white/20 bg-white/10 glass-strong p-6 h-full hover:-translate-y-1 hover:bg-white/15 transition-all duration-200">
                      <service.icon className="h-12 w-12 text-primary mb-4" />
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted leading-6 mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="text-sm text-muted flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex items-center gap-2 text-primary font-semibold">
                        Learn More
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* CTA */}
        <Section>
          <Container>
            <div className="rounded-[28px] border border-white/20 bg-gradient-to-r from-primary/5 to-accent/5 glass-strong p-8 sm:p-12 text-center">
              <h2 className="text-[28px] sm:text-[36px] font-black tracking-tight text-fg mb-4">
                {t("services.ctaTitle")}
              </h2>
              <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">{t("services.ctaCopy")}</p>
              <Link
                href="/contact-us"
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-full",
                  "bg-primary text-white font-extrabold tracking-tight",
                  "px-8 py-4 shadow-[0_20px_50px_rgba(var(--primary),0.25)]",
                  "hover:brightness-[1.05] transition-all duration-200"
                )}
              >
                {t("services.contactExperts")}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </Container>
        </Section>
      </main>
    </div>
  );
}
