"use client";

import * as React from "react";
import Image from "next/image";
import Script from "next/script";
import { motion } from "framer-motion";
import { StickyNavbar } from "@/components/site/StickyNavbar";
import { Container } from "@/components/site/Container";
import { Section } from "@/components/site/Section";
import { useLanguage } from "@/components/language/LanguageProvider";
import { ArrowRight, Paperclip, User, MapPin, Briefcase, Flag, Globe, CheckSquare } from "lucide-react";

const INITIAL_EXPERIENCE = [{ position: "", companyName: "", yearsExperience: "" }];

export default function ApplicationPage() {
  const { t, translation } = useLanguage();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [gender, setGender] = React.useState("male");
  const [nationality, setNationality] = React.useState("");
  const [visaStatus, setVisaStatus] = React.useState("employment");
  const [dob, setDob] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [experience, setExperience] = React.useState(INITIAL_EXPERIENCE);
  const [interest, setInterest] = React.useState("");
  const [competencies, setCompetencies] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [dragActive, setDragActive] = React.useState(false);

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

  const handleFileChange = (incomingFile: File | null) => {
    if (!incomingFile) return;
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(incomingFile.type)) {
      setErrorMessage("Please upload a PDF, DOC, or DOCX file.");
      return;
    }
    setFile(incomingFile);
    setErrorMessage("");
  };

  const handleDrop = (event: React.DragEvent<HTMLElement>) => {
    event.preventDefault();
    setDragActive(false);
    const dropped = event.dataTransfer.files?.[0];
    handleFileChange(dropped ?? null);
  };

  const handleAddExperience = () => {
    setExperience((prev) => [...prev, { position: "", companyName: "", yearsExperience: "" }]);
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {
    setExperience((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  const triggerRecaptcha = async () => {
    if (!siteKey) {
      return true;
    }

    if (typeof window === "undefined") {
      return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const grecaptcha = (window as any).grecaptcha;
    if (!grecaptcha || !grecaptcha.execute) {
      return false;
    }

    try {
      return await new Promise<boolean>((resolve) => {
        grecaptcha.ready(() => {
          grecaptcha.execute(siteKey, { action: "submit" }).then((token: string) => {
            resolve(!!token);
          }).catch(() => resolve(false));
        });
      });
    } catch {
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!firstName || !lastName || !email || !phone || !address || !interest || !competencies) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (!file) {
      setErrorMessage("Please upload your CV.");
      return;
    }

    setIsSubmitting(true);

    const verified = await triggerRecaptcha();
    if (!verified) {
      setIsSubmitting(false);
      setErrorMessage("reCAPTCHA verification failed. Please try again.");
      return;
    }

    try {
      const payload = new FormData();
      payload.set("firstName", firstName);
      payload.set("lastName", lastName);
      payload.set("gender", gender);
      payload.set("nationality", nationality);
      payload.set("visaStatus", visaStatus);
      payload.set("dob", dob);
      payload.set("email", email);
      payload.set("phone", phone);
      payload.set("address", address);
      payload.set(
        "experience",
        JSON.stringify(
          experience.filter((e) => e.position || e.companyName || e.yearsExperience)
        )
      );
      payload.set("interest", interest);
      payload.set("competencies", competencies);
      if (file) payload.set("cv", file);

      const res = await fetch("/api/applications", { method: "POST", body: payload });
      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        setIsSubmitting(false);
        setErrorMessage(data?.error ?? "Submission failed. Please try again.");
        return;
      }
    } catch {
      setIsSubmitting(false);
      setErrorMessage("Network error. Please try again.");
      return;
    }

    setSuccessMessage(t("application.successMessage"));
    setIsSubmitting(false);
    setFirstName("");
    setLastName("");
    setGender("male");
    setNationality("");
    setVisaStatus("employment");
    setDob("");
    setEmail("");
    setPhone("");
    setAddress("");
    setExperience(INITIAL_EXPERIENCE);
    setInterest("");
    setCompetencies("");
    setFile(null);
  };

  const applicationCopy: string[] = translation.application.heroCopy.split("\n\n");

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-fg)]">
      <Script
        src={siteKey ? `https://www.google.com/recaptcha/api.js?render=${siteKey}` : undefined}
        strategy="afterInteractive"
      />
      <StickyNavbar />

      <main className="pt-[var(--total-header-h)]">
        <section className="relative overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2200&q=80"
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
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span className="text-[13px] font-semibold tracking-wide text-fg/90">
                      {t("application.heroTitle")}
                    </span>
                  </div>

                  <h1 className="text-balance text-[40px] font-black tracking-tight text-fg sm:text-[54px] leading-[1.02] mb-6">
                    {t("application.heroTitle")}
                  </h1>

                  <div className="space-y-5 text-[16px] leading-8 text-muted max-w-3xl">
                    {applicationCopy.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="rounded-[28px] border border-white/20 bg-white/10 glass-strong p-8 shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <Flag className="h-6 w-6 text-primary" />
                      <h2 className="text-lg font-semibold">{t("application.sectionTitle")}</h2>
                    </div>
                    <p className="text-muted leading-7">
                      {t("application.recaptchaNotice")}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </Container>
        </section>

        <Section>
          <Container>
            <div className="md:grid md:grid-cols-[1.2fr_0.8fr] md:gap-10">
              <div>
                <div className="mb-8">
                  <h2 className="text-[32px] sm:text-[40px] font-black tracking-tight text-fg mb-4">
                    {t("application.sectionTitle")}
                  </h2>
                  <p className="text-muted text-[16px] leading-8 max-w-3xl">
                    {t("application.heroCopy")}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="rounded-[28px] border border-white/15 bg-white/10 glass p-6">
                    <div className="flex items-center gap-3 mb-5 text-lg font-bold text-fg">
                      <User className="h-5 w-5 text-primary" />
                      {t("application.personalDetails")}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="space-y-2 text-sm text-muted">
                        {t("application.firstName")} *
                        <input
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          className="w-full rounded-xl border border-white/20 bg-white/10 glass px-4 py-3 text-fg outline-none focus:border-primary/40"
                        />
                      </label>
                      <label className="space-y-2 text-sm text-muted">
                        {t("application.lastName")} *
                        <input
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                          className="w-full rounded-xl border border-white/20 bg-white/10 glass px-4 py-3 text-fg outline-none focus:border-primary/40"
                        />
                      </label>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                      <label className="space-y-2 text-sm text-muted">
                        {t("application.gender")} *
                        <select
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          required
                          className="w-full rounded-xl border border-white/20 bg-white/10 glass px-4 py-3 text-fg outline-none focus:border-primary/40"
                        >
                          <option value="male">{t("application.genderOptions.male")}</option>
                          <option value="female">{t("application.genderOptions.female")}</option>
                        </select>
                      </label>
                      <label className="space-y-2 text-sm text-muted">
                        {t("application.nationality")} *
                        <input
                          value={nationality}
                          onChange={(e) => setNationality(e.target.value)}
                          required
                          className="w-full rounded-xl border border-white/20 bg-white/10 glass px-4 py-3 text-fg outline-none focus:border-primary/40"
                        />
                      </label>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                      <label className="space-y-2 text-sm text-muted">
                        {t("application.visaStatus")} *
                        <select
                          value={visaStatus}
                          onChange={(e) => setVisaStatus(e.target.value)}
                          required
                          className="w-full rounded-xl border border-white/20 bg-white/10 glass px-4 py-3 text-fg outline-none focus:border-primary/40"
                        >
                          <option value="employment">{t("application.visaOptions.employment")}</option>
                          <option value="visit">{t("application.visaOptions.visit")}</option>
                          <option value="residence">{t("application.visaOptions.residence")}</option>
                        </select>
                      </label>
                      <label className="space-y-2 text-sm text-muted">
                        {t("application.dob")} *
                        <input
                          type="date"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          required
                          className="w-full rounded-xl border border-white/20 bg-white/10 glass px-4 py-3 text-fg outline-none focus:border-primary/40"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-white/15 bg-white/10 glass p-6">
                    <div className="flex items-center gap-3 mb-5 text-lg font-bold text-fg">
                      <MapPin className="h-5 w-5 text-primary" />
                      {t("application.contactInfo")}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="space-y-2 text-sm text-muted">
                        {t("application.email")} *
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full rounded-xl border border-white/20 bg-white/10 glass px-4 py-3 text-fg outline-none focus:border-primary/40"
                        />
                      </label>
                      <label className="space-y-2 text-sm text-muted">
                        {t("application.phone")} *
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="w-full rounded-xl border border-white/20 bg-white/10 glass px-4 py-3 text-fg outline-none focus:border-primary/40"
                        />
                      </label>
                    </div>

                    <label className="space-y-2 text-sm text-muted mt-4">
                      {t("application.address")} *
                      <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className="w-full rounded-xl border border-white/20 bg-white/10 glass px-4 py-3 text-fg outline-none focus:border-primary/40"
                      />
                    </label>
                  </div>

                  <div className="rounded-[28px] border border-white/15 bg-white/10 glass p-6">
                    <div className="flex items-center gap-3 mb-5 text-lg font-bold text-fg">
                      <Briefcase className="h-5 w-5 text-primary" />
                      {t("application.experienceSection")}
                    </div>
                    <div className="space-y-4">
                      {experience.map((entry, index) => (
                        <div key={index} className="grid gap-4 md:grid-cols-3">
                          <input
                            value={entry.position}
                            onChange={(e) => handleExperienceChange(index, "position", e.target.value)}
                            placeholder={t("application.position")}
                            className="w-full rounded-xl border border-white/20 bg-white/10 glass px-4 py-3 text-fg outline-none focus:border-primary/40"
                          />
                          <input
                            value={entry.companyName}
                            onChange={(e) => handleExperienceChange(index, "companyName", e.target.value)}
                            placeholder={t("application.companyName")}
                            className="w-full rounded-xl border border-white/20 bg-white/10 glass px-4 py-3 text-fg outline-none focus:border-primary/40"
                          />
                          <input
                            value={entry.yearsExperience}
                            onChange={(e) => handleExperienceChange(index, "yearsExperience", e.target.value)}
                            placeholder={t("application.yearsExperience")}
                            className="w-full rounded-xl border border-white/20 bg-white/10 glass px-4 py-3 text-fg outline-none focus:border-primary/40"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="mt-5">
                      <button
                        type="button"
                        onClick={handleAddExperience}
                        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 glass px-5 py-3 text-sm font-semibold text-fg/90 hover:bg-white/15 transition-all duration-200"
                      >
                        <span>{t("application.addPosition")}</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="rounded-[28px] border border-white/15 bg-white/10 glass p-6">
                    <div className="flex items-center gap-3 mb-5 text-lg font-bold text-fg">
                      <Globe className="h-5 w-5 text-primary" />
                      {t("application.fieldOfInterest")}
                    </div>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      required
                      className="w-full rounded-xl border border-white/20 bg-white/10 glass px-4 py-3 text-fg outline-none focus:border-primary/40"
                    >
                      <option value="">{t("application.fieldOfInterest")}</option>
                      <option value="tax">Tax & Accounting</option>
                      <option value="consulting">Consulting</option>
                      <option value="marketing">Marketing</option>
                      <option value="operations">Operations</option>
                    </select>
                  </div>

                  <div className="rounded-[28px] border border-white/15 bg-white/10 glass p-6">
                    <div className="flex items-center gap-3 mb-5 text-lg font-bold text-fg">
                      <Paperclip className="h-5 w-5 text-primary" />
                      {t("application.uploadCv")}
                    </div>
                    <label
                      htmlFor="cv-upload"
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragActive(true);
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        setDragActive(false);
                      }}
                      onDrop={handleDrop}
                      className={
                        "grid min-h-[180px] rounded-3xl border border-dashed p-6 text-center transition-all duration-200 " +
                        (dragActive ? "border-primary/70 bg-primary/5" : "border-white/20 bg-white/5")
                      }
                    >
                      <span className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Paperclip className="h-6 w-6" />
                      </span>
                      <p className="text-sm font-semibold text-fg mb-2">{t("application.uploadCv")}</p>
                      <p className="text-sm text-muted">PDF, DOC, DOCX</p>
                      <input
                        id="cv-upload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                        className="sr-only"
                      />
                      {file ? <p className="mt-4 text-sm text-primary">{file.name}</p> : null}
                    </label>
                  </div>

                  <div className="rounded-[28px] border border-white/15 bg-white/10 glass p-6">
                    <div className="flex items-center gap-3 mb-5 text-lg font-bold text-fg">
                      <CheckSquare className="h-5 w-5 text-primary" />
                      {t("application.competencies")}
                    </div>
                    <textarea
                      value={competencies}
                      onChange={(e) => setCompetencies(e.target.value)}
                      placeholder={t("application.competencies")}
                      rows={6}
                      required
                      className="w-full resize-none rounded-xl border border-white/20 bg-white/10 glass px-4 py-4 text-fg outline-none focus:border-primary/40"
                    />
                  </div>

                  {errorMessage ? <p className="text-sm text-rose-400">{errorMessage}</p> : null}
                  {successMessage ? <p className="text-sm text-emerald-300">{successMessage}</p> : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-white font-extrabold tracking-tight shadow-[0_20px_50px_rgba(var(--primary),0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-[1.05] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t("application.submitButton") : t("application.submitButton")}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    </div>
  );
}
