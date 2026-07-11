"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { StickyNavbar } from "@/components/site/StickyNavbar";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { InternationalPhoneInput } from "@/components/ui/InternationalPhoneInput";
import { cn } from "@/lib/cn";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, ArrowRight } from "lucide-react";

export default function ContactUsPageClient() {
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    phoneDialCode: "+971",
    phoneNumber: "",
    service: "international",
    message: "",
  });
  const [phoneError, setPhoneError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setPhoneError("");
    const combinedPhone = `${formData.phoneDialCode}${formData.phoneNumber.replace(/[^0-9]/g, "")}`;
    if (!/^[0-9]{7,15}$/.test(formData.phoneNumber.replace(/[^0-9]/g, ""))) {
      setPhoneError("Please enter a valid phone number.");
      return;
    }

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        phone: combinedPhone,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      alert(data?.error ?? "Request failed. Please try again.");
      return;
    }

    alert("Request received. We'll contact you shortly.");
    setFormData({
      fullName: "",
      email: "",
      phoneDialCode: "+971",
      phoneNumber: "",
      service: "international",
      message: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-fg)]">
      <StickyNavbar />

      <main className="pt-[var(--total-header-h)]">
        <Section>
          <Container>
            <div className="relative flex flex-col gap-4 mb-12">
              <Image
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=2200&q=80"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover opacity-[0.06] dark:opacity-[0.12]"
              />
              <div className="relative">
                <div className="inline-flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                  <span className="text-[13px] font-semibold tracking-wide text-muted">
                    CONTACT US
                  </span>
                </div>
                <h1 className="text-[32px] sm:text-[40px] font-black tracking-tight text-fg">
                  Get in Touch
                </h1>
                <p className="max-w-2xl text-muted text-[15px] leading-7">
                  Ready to transform your business? Our experts are here to help you navigate
                  international markets, compliance requirements, and growth opportunities.
                </p>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="rounded-[28px] border border-white/20 bg-white/10 glass-strong p-6 sm:p-8"
                >
                  <div className="flex flex-col gap-4 mb-6">
                    <h2 className="text-[24px] font-black tracking-tight text-fg">
                      Request Consultation
                    </h2>
                    <p className="text-muted text-[14px] leading-6">
                      Fill out the form below and we&apos;ll get back to you within 24 hours with a
                      customized consultation plan.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-[13px] font-semibold text-muted mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-white/20 bg-white/10 glass px-4 py-3 text-fg placeholder:text-muted outline-none focus:border-primary/40"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-semibold text-muted mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-white/20 bg-white/10 glass px-4 py-3 text-fg placeholder:text-muted outline-none focus:border-primary/40"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <InternationalPhoneInput
                      dialCode={formData.phoneDialCode}
                      number={formData.phoneNumber}
                      onDialChange={(value) => setFormData((prev) => ({ ...prev, phoneDialCode: value }))}
                      onNumberChange={(value) => setFormData((prev) => ({ ...prev, phoneNumber: value }))}
                      error={phoneError}
                    />

                    <div>
                      <label className="block text-[13px] font-semibold text-muted mb-2">
                        Service of Interest
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/20 bg-white/10 glass px-4 py-3 text-fg outline-none focus:border-primary/40"
                      >
                        <option value="international">International Business Setup</option>
                        <option value="accounting">Accounting & Tax Services</option>
                        <option value="consulting">Management Consulting</option>
                        <option value="marketing">Digital Marketing & Media</option>
                        <option value="training">Professional Training</option>
                        <option value="ecommerce">Retail & E-Commerce</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[13px] font-semibold text-muted mb-2">
                        Message
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full resize-none rounded-xl border border-white/20 bg-white/10 glass px-4 py-3 text-fg placeholder:text-muted outline-none focus:border-primary/40"
                        placeholder="Tell us about your business goals and how we can help..."
                      />
                    </div>

                    <button
                      type="submit"
                      className={cn(
                        "inline-flex w-full items-center justify-center gap-2 rounded-xl",
                        "bg-primary text-white font-extrabold tracking-tight",
                        "px-6 py-4 shadow-[0_20px_50px_rgba(var(--primary),0.25)]",
                        "hover:brightness-[1.05] hover:scale-105 hover:-translate-y-0.5 transition-all duration-300",
                        "active:scale-95 cursor-pointer"
                      )}
                    >
                      Send Message
                      <Send className="h-4 w-4" />
                    </button>
                  </form>
                </motion.div>
              </div>

              <div className="lg:col-span-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6"
                >
                  <div className="rounded-[28px] border border-white/20 bg-white/10 glass-strong p-6">
                    <h3 className="text-[18px] font-extrabold tracking-tight text-fg mb-4">
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <div className="text-[14px] font-semibold text-fg">Email</div>
                          <div className="text-[13px] text-muted">info@advisero-global.com</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <div className="text-[14px] font-semibold text-fg">Phone</div>
                          <div className="text-[13px] text-muted">+971 XX XXX XXXX</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <div className="text-[14px] font-semibold text-fg">Address</div>
                          <div className="text-[13px] text-muted leading-6">
                            Sharjah Media City (Shams),
                            <br />Al Messaned,
                            <br />Al Bataeh,
                            <br />Sharjah,
                            <br />United Arab Emirates
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MessageCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <div className="text-[14px] font-semibold text-fg">WhatsApp</div>
                          <div className="text-[13px] text-muted">+971 50 123 4567</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <div className="text-[14px] font-semibold text-fg">Business Hours</div>
                          <div className="text-[13px] text-muted">Mon-Fri: 9AM-6PM GMT+4</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-white/20 bg-white/10 glass-strong p-6">
                    <h3 className="text-[18px] font-extrabold tracking-tight text-fg mb-4">
                      Book an Appointment
                    </h3>
                    <p className="text-[14px] leading-6 text-muted mb-6">
                      Secure a dedicated consultation slot with clear UAE and local time conversion, plus premium support through WhatsApp and email.
                    </p>
                    <Link
                      href="/appointment"
                      className={cn(
                        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold",
                        "bg-primary text-white shadow-[0_18px_45px_rgba(59,130,246,0.24)]",
                        "hover:-translate-y-0.5 hover:shadow-[0_0_0_16px_rgba(59,130,246,0.18)] transition-all duration-200"
                      )}
                    >
                      Book Appointment
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="rounded-[28px] border border-white/20 bg-white/10 glass-strong p-6">
                    <h3 className="text-[18px] font-extrabold tracking-tight text-fg mb-4">
                      Why Choose Us?
                    </h3>
                    <div className="space-y-3">
                      {[
                        "Global expertise across 50+ jurisdictions",
                        "End-to-end business advisory services",
                        "Compliance-first approach",
                        "Dedicated account management",
                        "24/7 emergency support available"
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span className="text-[13px] text-muted">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </div>
  );
}
