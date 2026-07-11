export type ServiceIconName =
  | "Calculator"
  | "Briefcase"
  | "Megaphone"
  | "ShoppingCart"
  | "GraduationCap"
  | "Building2"
  | "Receipt";

export type Bilingual = { en: string; ae: string };

export type ServiceFeature = {
  title: Bilingual;
  description: Bilingual;
};

export type ServiceProcessStep = {
  step: string;
  title: Bilingual;
  desc: Bilingual;
};

export type ServiceDetail = {
  slug: string;
  icon: ServiceIconName;
  title: Bilingual;
  heroTag: Bilingual;
  heroTitleLine1: Bilingual;
  heroTitleLine2: Bilingual;
  heroCopy: Bilingual;
  ctaLabel: Bilingual;
  features: ServiceFeature[];
  benefitsTitleLine1: Bilingual;
  benefitsTitleLine2: Bilingual;
  benefitsCopy: Bilingual;
  benefits: Bilingual[];
  processTitle: Bilingual;
  steps: ServiceProcessStep[];
  ctaTitle: Bilingual;
  ctaCopy: Bilingual;
};

export const SERVICES: Record<string, ServiceDetail> = {
  "accounting-tax-consultancy": {
    slug: "accounting-tax-consultancy",
    icon: "Calculator",
    title: {
      en: "Accounting, Bookkeeping & Tax Consultancy",
      ae: "المحاسبة، والدفترية، والاستشارات الضريبية",
    },
    heroTag: { en: "Accounting & Tax Consultancy", ae: "المحاسبة والاستشارات الضريبية" },
    heroTitleLine1: { en: "Expert Financial", ae: "خدمات مالية" },
    heroTitleLine2: { en: "Management Services", ae: "متخصصة" },
    heroCopy: {
      en: "Comprehensive accounting and tax consultancy services designed for businesses seeking compliance, optimization, and strategic financial guidance across international markets.",
      ae: "خدمات محاسبة وضريبة شاملة مصممة للشركات التي تسعى إلى الامتثال والتحسين والتوجيه المالي الاستراتيجي عبر الأسواق الدولية.",
    },
    ctaLabel: { en: "Get Tax Consultation", ae: "احصل على استشارة ضريبية" },
    features: [
      {
        title: { en: "Tax Planning & Filing", ae: "التخطيط الضريبي والتقديم" },
        description: {
          en: "Strategic tax planning and accurate filing services for optimal financial outcomes.",
          ae: "تخطيط ضريبي استراتيجي وخدمات تقديم دقيقة لأفضل النتائج المالية.",
        },
      },
      {
        title: { en: "Bookkeeping & Reporting", ae: "الدفترية والتقارير" },
        description: {
          en: "Reliable accounting workflows with transaction verification and clear reporting.",
          ae: "مسارات محاسبية موثوقة مع التحقق من المعاملات وتقارير واضحة.",
        },
      },
      {
        title: { en: "Compliance Services", ae: "خدمات الامتثال" },
        description: {
          en: "Stay compliant with local and international financial regulations.",
          ae: "البقاء متوافقين مع اللوائح المالية المحلية والدولية.",
        },
      },
      {
        title: { en: "Financial Reporting", ae: "التقارير المالية" },
        description: {
          en: "Detailed financial reports and analysis for informed decision making.",
          ae: "تقارير مالية مفصلة وتحليلات لاتخاذ قرارات مبنية على المعلومات.",
        },
      },
    ],
    benefitsTitleLine1: { en: "Why Choose Our", ae: "لماذا تختار" },
    benefitsTitleLine2: { en: "Tax Services?", ae: "خدماتنا الضريبية؟" },
    benefitsCopy: {
      en: "Our expert accountants and tax consultants ensure your business remains compliant while optimizing financial performance and minimizing tax liabilities.",
      ae: "يضمن خبراؤنا في المحاسبة والضرائب أن تظل أعمالك متوافقة مع تحسين الأداء المالي وتقليل الالتزامات الضريبية.",
    },
    benefits: [
      { en: "Minimize tax liabilities legally", ae: "تقليل الالتزامات الضريبية بشكل قانوني" },
      { en: "Ensure regulatory compliance", ae: "ضمان الامتثال التنظيمي" },
      { en: "Optimize financial performance", ae: "تحسين الأداء المالي" },
      { en: "Reduce audit risks", ae: "تقليل مخاطر التدقيق" },
      { en: "Access expert financial advice", ae: "الوصول إلى نصائح مالية احترافية" },
      { en: "Streamline accounting processes", ae: "تبسيط العمليات المحاسبية" },
    ],
    processTitle: { en: "Service Process", ae: "عملية الخدمة" },
    steps: [
      {
        step: "01",
        title: { en: "Initial Consultation", ae: "الاستشارة الأولى" },
        desc: { en: "Understand your financial situation and goals", ae: "فهم وضعك المالي وأهدافك" },
      },
      {
        step: "02",
        title: { en: "Strategy Development", ae: "تطوير الاستراتيجية" },
        desc: { en: "Create customized financial and tax strategies", ae: "إنشاء استراتيجيات مالية وضريبية مخصصة" },
      },
      {
        step: "03",
        title: { en: "Implementation", ae: "التنفيذ" },
        desc: { en: "Execute plans with ongoing support", ae: "تنفيذ الخطط مع دعم مستمر" },
      },
      {
        step: "04",
        title: { en: "Monitoring & Optimization", ae: "المراقبة والتحسين" },
        desc: { en: "Continuous review and performance optimization", ae: "المراجعة المستمرة وتحسين الأداء" },
      },
    ],
    ctaTitle: { en: "Ready to Optimize Your Finances?", ae: "هل أنت مستعد لتحسين ماليتك؟" },
    ctaCopy: {
      en: "Contact our accounting experts today for a free consultation and discover how we can help your business thrive.",
      ae: "اتصل بخبرائنا الماليين اليوم للحصول على استشارة مجانية واكتشف كيف يمكننا مساعدة عملك على الازدهار.",
    },
  },

  "management-consultancy": {
    slug: "management-consultancy",
    icon: "Briefcase",
    title: {
      en: "Management & Business Consultancy",
      ae: "الاستشارات الإدارية وإدارة الأعمال",
    },
    heroTag: { en: "Management Consulting", ae: "استشارات الإدارة" },
    heroTitleLine1: { en: "Strategic Business", ae: "إدارة أعمال" },
    heroTitleLine2: { en: "Advisory Services", ae: "استراتيجية" },
    heroCopy: {
      en: "Strategic guidance and operational support to help businesses scale with clarity and control across international markets.",
      ae: "توجيه استراتيجي ودعم تشغيلي لمساعدة الشركات على النمو بوضوح وتحكم عبر الأسواق الدولية.",
    },
    ctaLabel: { en: "Book a Strategy Call", ae: "احجز مكالمة استراتيجية" },
    features: [
      {
        title: { en: "Business Strategy", ae: "استراتيجية الأعمال" },
        description: {
          en: "Market entry, growth planning, and operating-model design built for scale.",
          ae: "دخول السوق، وتخطيط النمو، وتصميم نموذج التشغيل المصمم للتوسع.",
        },
      },
      {
        title: { en: "Operations Management", ae: "إدارة العمليات" },
        description: {
          en: "Process design, workflow optimization, and performance management systems.",
          ae: "تصميم العمليات، وتحسين سير العمل، وأنظمة إدارة الأداء.",
        },
      },
      {
        title: { en: "Immigration & Logistics", ae: "الهجرة واللوجستيات" },
        description: {
          en: "Advisory for visas, relocation, and cross-border logistics coordination.",
          ae: "استشارات للتأشيرات والانتقال وتنسيق اللوجستيات عبر الحدود.",
        },
      },
      {
        title: { en: "Governance & Risk", ae: "الحوكمة والمخاطر" },
        description: {
          en: "Policies, controls, and risk frameworks that protect and enable growth.",
          ae: "سياسات وضوابط وأطر مخاطر تحمي النمو وتمكّنه.",
        },
      },
    ],
    benefitsTitleLine1: { en: "Why Choose Our", ae: "لماذا تختار" },
    benefitsTitleLine2: { en: "Consulting?", ae: "استشاراتنا؟" },
    benefitsCopy: {
      en: "We combine deep industry expertise with hands-on execution to deliver measurable outcomes for your business.",
      ae: "نجمع خبرة صناعية عميقة مع تنفيذ عملي لتقديم نتائج قابلة للقياس لأعمالك.",
    },
    benefits: [
      { en: "Clear, actionable growth roadmap", ae: "خارطة طريق نمو واضحة وقابلة للتنفيذ" },
      { en: "Leaner, more efficient operations", ae: "عمليات أكثر رشاقة وكفاءة" },
      { en: "Reduced operational risk", ae: "تقليل المخاطر التشغيلية" },
      { en: "Stronger governance", ae: "حوكمة أقوى" },
      { en: "Faster market entry", ae: "دخول أسرع للسوق" },
      { en: "Senior-led engagement", ae: "إشراف من كبار الخبراء" },
    ],
    processTitle: { en: "Engagement Model", ae: "نموذج العمل" },
    steps: [
      {
        step: "01",
        title: { en: "Discovery", ae: "الاستكشاف" },
        desc: { en: "Assess goals, gaps, and opportunities", ae: "تقييم الأهداف والفجوات والفرص" },
      },
      {
        step: "02",
        title: { en: "Roadmap", ae: "خارطة الطريق" },
        desc: { en: "Co-create a prioritized action plan", ae: "المشاركة في إنشاء خطة عمل ذات أولوية" },
      },
      {
        step: "03",
        title: { en: "Execution", ae: "التنفيذ" },
        desc: { en: "Implement with hands-on support", ae: "التنفيذ بدعم عملي مباشر" },
      },
      {
        step: "04",
        title: { en: "Review", ae: "المراجعة" },
        desc: { en: "Measure impact and optimize", ae: "قياس الأثر والتحسين" },
      },
    ],
    ctaTitle: { en: "Ready to Scale With Confidence?", ae: "هل أنت مستعد للتوسع بثقة؟" },
    ctaCopy: {
      en: "Talk to our consultants about a tailored advisory engagement for your business.",
      ae: "تحدث مع مستشارينا حول مشاركة استشارية مخصصة لعملك.",
    },
  },

  "digital-marketing-media": {
    slug: "digital-marketing-media",
    icon: "Megaphone",
    title: { en: "Advertising, Marketing & Media", ae: "الإعلان والتسويق والإعلام" },
    heroTag: { en: "Marketing & Media", ae: "التسويق والإعلام" },
    heroTitleLine1: { en: "Growth-Focused", ae: "تسويق" },
    heroTitleLine2: { en: "Marketing Systems", ae: "مركز على النمو" },
    heroCopy: {
      en: "Growth-focused campaigns and media management to strengthen brand presence and drive measurable results.",
      ae: "حملات مركزة على النمو وإدارة إعلامية لتعزيز حضور العلامة التجارية وتحقيق نتائج قابلة للقياس.",
    },
    ctaLabel: { en: "Start a Campaign", ae: "ابدأ حملة" },
    features: [
      {
        title: { en: "Digital Marketing", ae: "التسويق الرقمي" },
        description: {
          en: "Performance campaigns across search, social, and paid channels.",
          ae: "حملات أداء عبر البحث والمنصات الاجتماعية والقنوات المدفوعة.",
        },
      },
      {
        title: { en: "Branding & Social", ae: "العلامة التجارية والتواصل" },
        description: {
          en: "Brand identity, content, and community management that converts.",
          ae: "هوية العلامة التجارية والمحتوى وإدارة المجتمع التي تحقق التحويل.",
        },
      },
      {
        title: { en: "PR & Media", ae: "العلاقات العامة والإعلام" },
        description: {
          en: "Press, media buying, and sales-promotion programs.",
          ae: "الصحافة، وشراء الإعلام، وبرامج ت Promotion المبيعات.",
        },
      },
      {
        title: { en: "Analytics", ae: "التحليلات" },
        description: {
          en: "Tracking, attribution, and reporting to prove ROI.",
          ae: "التتبع والإسناد والتقارير لإثبات العائد على الاستثمار.",
        },
      },
    ],
    benefitsTitleLine1: { en: "Why Choose Our", ae: "لماذا تختار" },
    benefitsTitleLine2: { en: "Marketing?", ae: "تسويقنا؟" },
    benefitsCopy: {
      en: "We build marketing infrastructure that compounds — turning attention into pipeline and pipeline into revenue.",
      ae: "نبني بنية تسويقية تتضاعف — نحول الانتباه إلى مسار مبيعات والمسار إلى إيرادات.",
    },
    benefits: [
      { en: "Higher qualified leads", ae: "عملاء محتملون مؤهلون أكثر" },
      { en: "Stronger brand recall", ae: "تذكر أقوى للعلامة التجارية" },
      { en: "Lower acquisition cost", ae: "تكلفة اكتساب أقل" },
      { en: "Full-funnel coverage", ae: "تغطية كاملة للمسار" },
      { en: "Transparent reporting", ae: "تقارير شفافة" },
      { en: "Creative that converts", ae: "إبداع يحقق التحويل" },
    ],
    processTitle: { en: "Campaign Process", ae: "عملية الحملة" },
    steps: [
      {
        step: "01",
        title: { en: "Audit", ae: "التدقيق" },
        desc: { en: "Review brand, channels, and competitors", ae: "مراجعة العلامة والقنوات والمنافسين" },
      },
      {
        step: "02",
        title: { en: "Strategy", ae: "الاستراتيجية" },
        desc: { en: "Define audience, message, and channels", ae: "تحديد الجمهور والرسالة والقنوات" },
      },
      {
        step: "03",
        title: { en: "Launch", ae: "الإطلاق" },
        desc: { en: "Produce and run campaigns", ae: "إنتاج وتشغيل الحملات" },
      },
      {
        step: "04",
        title: { en: "Optimize", ae: "التحسين" },
        desc: { en: "Iterate on data for better ROI", ae: "التكرار بناءً على البيانات لعائد أفضل" },
      },
    ],
    ctaTitle: { en: "Ready to Grow Your Audience?", ae: "هل أنت مستعد لزيادة جمهورك؟" },
    ctaCopy: {
      en: "Let's design a marketing system that drives consistent, measurable growth.",
      ae: "لنصمم نظام تسويق يحقق نموًا مستمرًا وقابلاً للقياس.",
    },
  },

  "retail-e-commerce": {
    slug: "retail-e-commerce",
    icon: "ShoppingCart",
    title: { en: "Retail & E-Commerce", ae: "التجزئة والتجارة الإلكترونية" },
    heroTag: { en: "Retail & E-Commerce", ae: "التجزئة والتجارة الإلكترونية" },
    heroTitleLine1: { en: "Online Retail", ae: "تجزئة" },
    heroTitleLine2: { en: "Operations Support", ae: "عبر الإنترنت" },
    heroCopy: {
      en: "Online retail and multi-channel selling support for smooth day-to-day e-commerce operations.",
      ae: "دعم البيع بالتجزئة عبر الإنترنت والبيع متعدد القنوات لعمليات تجارة إلكترونية سلسة يوميًا.",
    },
    ctaLabel: { en: "Boost Online Sales", ae: "عزز المبيعات عبر الإنترنت" },
    features: [
      {
        title: { en: "Store Setup", ae: "إعداد المتجر" },
        description: {
          en: "Shopify, WooCommerce, and marketplace onboarding.",
          ae: "إعداد Shopify وWooCommerce والانضمام للأسواق.",
        },
      },
      {
        title: { en: "Operations", ae: "العمليات" },
        description: {
          en: "Catalog, fulfillment, and order-management support.",
          ae: "دعم الكتالوج والوفاء وإدارة الطلبات.",
        },
      },
      {
        title: { en: "Multi-Channel", ae: "متعدد القنوات" },
        description: {
          en: "Sell across web, marketplaces, and social commerce.",
          ae: "البيع عبر الويب والأسواق والتجارة الاجتماعية.",
        },
      },
      {
        title: { en: "Conversion", ae: "التحويل" },
        description: {
          en: "CRO, payments, and checkout optimization.",
          ae: "تحسين معدل التحويل والمدفوعات والدفع.",
        },
      },
    ],
    benefitsTitleLine1: { en: "Why Choose Our", ae: "لماذا تختار" },
    benefitsTitleLine2: { en: "E-Commerce?", ae: "تجارتنا الإلكترونية؟" },
    benefitsCopy: {
      en: "We help retailers launch, automate, and scale online with compliant, conversion-ready storefronts.",
      ae: "نساعد تجار التجزئة على الإطلاق والأتمتة والتوسع عبر الإنترنت بمتاجر متوافقة وجاهزة للتحويل.",
    },
    benefits: [
      { en: "Faster store launch", ae: "إطلاق متجر أسرع" },
      { en: "Streamlined fulfillment", ae: "وفاء مبسط" },
      { en: "Higher conversion rates", ae: "معدلات تحويل أعلى" },
      { en: "Multi-market reach", ae: "وصول لأسواق متعددة" },
      { en: "Lower overhead", ae: "نفقات أقل" },
      { en: "Data-driven decisions", ae: "قرارات مبنية على البيانات" },
    ],
    processTitle: { en: "Launch Process", ae: "عملية الإطلاق" },
    steps: [
      {
        step: "01",
        title: { en: "Plan", ae: "التخطيط" },
        desc: { en: "Define catalog, markets, and stack", ae: "تحديد الكتالوج والأسواق والنظام" },
      },
      {
        step: "02",
        title: { en: "Build", ae: "البناء" },
        desc: { en: "Set up store and integrations", ae: "إعداد المتجر والربط" },
      },
      {
        step: "03",
        title: { en: "Operate", ae: "التشغيل" },
        desc: { en: "Manage listings, orders, and support", ae: "إدارة القوائم والطلبات والدعم" },
      },
      {
        step: "04",
        title: { en: "Scale", ae: "التوسع" },
        desc: { en: "Expand channels and markets", ae: "توسيع القنوات والأسواق" },
      },
    ],
    ctaTitle: { en: "Ready to Sell Online?", ae: "هل أنت مستعد للبيع عبر الإنترنت؟" },
    ctaCopy: {
      en: "Get a conversion-ready storefront with operations built to scale.",
      ae: "احصل على متجر جاهز للتحويل بعمليات مصممة للتوسع.",
    },
  },

  "training-professional-development": {
    slug: "training-professional-development",
    icon: "GraduationCap",
    title: {
      en: "Education, Training & Professional Development",
      ae: "التعليم والتدريب والتطوير المهني",
    },
    heroTag: { en: "Training & Development", ae: "التدريب والتطوير" },
    heroTitleLine1: { en: "Build Capability", ae: "تطوير" },
    heroTitleLine2: { en: "That Lasts", ae: "مهني مستدام" },
    heroCopy: {
      en: "Structured learning programs designed to build capability and support long-term performance.",
      ae: "برامج تعليمية منظمة مصممة لبناء القدرات ودعم الأداء طويل المدى.",
    },
    ctaLabel: { en: "Explore Programs", ae: "استكشف البرامج" },
    features: [
      {
        title: { en: "Corporate Training", ae: "التدريب المؤسسي" },
        description: {
          en: "Custom workshops aligned to your business goals.",
          ae: "ورش عمل مخصصة تتماشى مع أهداف عملك.",
        },
      },
      {
        title: { en: "Skill Development", ae: "تطوير المهارات" },
        description: {
          en: "Professional tracks in finance, ops, and digital.",
          ae: "مسارات مهنية في المالية والعمليات والرقميات.",
        },
      },
      {
        title: { en: "Learning & Development", ae: "التعلم والتطوير" },
        description: {
          en: "L&D strategy, content, and certification paths.",
          ae: "استراتيجية التعلم والتطوير والمحتوى ومسارات الشهادات.",
        },
      },
      {
        title: { en: "Coaching", ae: "التوجيه" },
        description: {
          en: "Leadership and team coaching for outcomes.",
          ae: "توجيه القادة والفرق لتحقيق النتائج.",
        },
      },
    ],
    benefitsTitleLine1: { en: "Why Choose Our", ae: "لماذا تختار" },
    benefitsTitleLine2: { en: "Programs?", ae: "برامجنا؟" },
    benefitsCopy: {
      en: "We turn learning into measurable performance with practical, business-ready programs.",
      ae: "نحول التعلم إلى أداء قابل للقياس ببرامج عملية وجاهزة للأعمال.",
    },
    benefits: [
      { en: "Job-ready skills", ae: "مهارات جاهزة للعمل" },
      { en: "Higher engagement", ae: "تفاعل أعلى" },
      { en: "Retained knowledge", ae: "معرفة محفوظة" },
      { en: "Aligned to goals", ae: "متوافقة مع الأهداف" },
      { en: "Flexible delivery", ae: "تقديم مرن" },
      { en: "Measured impact", ae: "أثر قابل للقياس" },
    ],
    processTitle: { en: "Program Design", ae: "تصميم البرنامج" },
    steps: [
      {
        step: "01",
        title: { en: "Assess", ae: "التقييم" },
        desc: { en: "Identify skills and gaps", ae: "تحديد المهارات والفجوات" },
      },
      {
        step: "02",
        title: { en: "Design", ae: "التصميم" },
        desc: { en: "Build a tailored curriculum", ae: "بناء منهج مخصص" },
      },
      {
        step: "03",
        title: { en: "Deliver", ae: "التقديم" },
        desc: { en: "Run live or online sessions", ae: "تشغيل جلسات حية أو عبر الإنترنت" },
      },
      {
        step: "04",
        title: { en: "Measure", ae: "القياس" },
        desc: { en: "Track outcomes and adoption", ae: "تتبع النتائج والاعتماد" },
      },
    ],
    ctaTitle: { en: "Ready to Upskill Your Team?", ae: "هل أنت مستعد لرفع كفاءة فريقك؟" },
    ctaCopy: {
      en: "Design a learning path that drives real performance gains.",
      ae: "صمم مسار تعلم يحقق مكاسب أداء حقيقية.",
    },
  },

  "usa-company-formation": {
    slug: "usa-company-formation",
    icon: "Building2",
    title: { en: "USA Company Formation", ae: "تأسيس الشركات في الولايات المتحدة" },
    heroTag: { en: "USA Setup", ae: "تأسيس في أمريكا" },
    heroTitleLine1: { en: "USA Business", ae: "تأسيس أعمال" },
    heroTitleLine2: { en: "Formation", ae: "في أمريكا" },
    heroCopy: {
      en: "Formation support with EIN registration, documentation guidance, and compliance setup.",
      ae: "دعم التأسيس مع تسجيل EIN وإرشادات المستندات وإعداد الامتثال.",
    },
    ctaLabel: { en: "Form a US Company", ae: "أسّس شركة أمريكية" },
    features: [
      {
        title: { en: "LLC & Corporation", ae: "LLC والشركات" },
        description: {
          en: "USA LLC & Corporation formation in leading states.",
          ae: "تأسيس LLC والشركات في الولايات الرائدة.",
        },
      },
      {
        title: { en: "EIN Registration", ae: "تسجيل EIN" },
        description: {
          en: "Employer Identification Number support.",
          ae: "دعم رقم التعريف الضريبي (EIN).",
        },
      },
      {
        title: { en: "State Registration", ae: "التسجيل على مستوى الولاية" },
        description: {
          en: "State business registration and filings.",
          ae: "تسجيل الأعمال على مستوى الولاية والتقارير.",
        },
      },
      {
        title: { en: "Banking & Agent", ae: "البنك والوكيل" },
        description: {
          en: "Bank account assistance and registered agent setup.",
          ae: "مساعدة فتح الحساب البنكي وإعداد الوكيل المسجل.",
        },
      },
    ],
    benefitsTitleLine1: { en: "Why Choose Our", ae: "لماذا تختار" },
    benefitsTitleLine2: { en: "US Setup?", ae: "التأسيس الأمريكي؟" },
    benefitsCopy: {
      en: "We make US formation simple, compliant, and fast — with ongoing support after launch.",
      ae: "نجعل التأسيس في أمريكا بسيطًا ومتوافقًا وسريعًا — مع دعم مستمر بعد الإطلاق.",
    },
    benefits: [
      { en: "Fast formation", ae: "تأسيس سريع" },
      { en: "Compliant structure", ae: "هيكل متوافق" },
      { en: "EIN handled", ae: "إنهاء إجراءات EIN" },
      { en: "Banking guidance", ae: "إرشادات بنكية" },
      { en: "Registered agent", ae: "وكيل مسجل" },
      { en: "Ongoing support", ae: "دعم مستمر" },
    ],
    processTitle: { en: "Formation Steps", ae: "خطوات التأسيس" },
    steps: [
      {
        step: "01",
        title: { en: "Choose Entity", ae: "اختيار الكيان" },
        desc: { en: "Select state and entity type", ae: "اختيار الولاية ونوع الكيان" },
      },
      {
        step: "02",
        title: { en: "Incorporate", ae: "الدمج" },
        desc: { en: "File formation documents", ae: "تقديم مستندات التأسيس" },
      },
      {
        step: "03",
        title: { en: "Tax & EIN", ae: "الضرائب وEIN" },
        desc: { en: "Obtain EIN and tax setup", ae: "الحصول على EIN وإعداد الضرائب" },
      },
      {
        step: "04",
        title: { en: "Operate", ae: "التشغيل" },
        desc: { en: "Banking, agent, and compliance", ae: "البنك والوكيل والامتثال" },
      },
    ],
    ctaTitle: { en: "Ready to Launch in the US?", ae: "هل أنت مستعد للإطلاق في أمريكا؟" },
    ctaCopy: {
      en: "Start your US company with clear, compliant documentation support.",
      ae: "ابدأ شركتك الأمريكية بدعم مستندات واضح ومتوافق.",
    },
  },

  "uk-company-formation": {
    slug: "uk-company-formation",
    icon: "Building2",
    title: { en: "UK Company Formation", ae: "تأسيس الشركات في المملكة المتحدة" },
    heroTag: { en: "UK Setup", ae: "تأسيس في بريطانيا" },
    heroTitleLine1: { en: "UK Business", ae: "تأسيس أعمال" },
    heroTitleLine2: { en: "Formation", ae: "في بريطانيا" },
    heroCopy: {
      en: "UK company formation guidance with documentation support and ongoing compliance structure.",
      ae: "إرشاد تأسيس الشركات في بريطانيا مع دعم المستندات وهيكل امتثال مستمر.",
    },
    ctaLabel: { en: "Form a UK Company", ae: "أسّس شركة بريطانية" },
    features: [
      {
        title: { en: "LTD Formation", ae: "تأسيس LTD" },
        description: {
          en: "UK LTD company formation and setup.",
          ae: "تأسيس وإعداد شركة LTD في بريطانيا.",
        },
      },
      {
        title: { en: "Companies House", ae: "Companies House" },
        description: {
          en: "Companies House registration handled for you.",
          ae: "تتم معالجة التسجيل في Companies House نيابة عنك.",
        },
      },
      {
        title: { en: "Documentation", ae: "المستندات" },
        description: {
          en: "Complete documentation guidance and articles.",
          ae: "إرشادات المستندات والنظام الأساسي كاملة.",
        },
      },
      {
        title: { en: "Banking & Filings", ae: "البنك والتقارير" },
        description: {
          en: "Bank account assistance and annual filing support.",
          ae: "مساعدة الحساب البنكي ودعم التقارير السنوية.",
        },
      },
    ],
    benefitsTitleLine1: { en: "Why Choose Our", ae: "لماذا تختار" },
    benefitsTitleLine2: { en: "UK Setup?", ae: "التأسيس البريطاني؟" },
    benefitsCopy: {
      en: "We handle the paperwork so you can operate a compliant UK company with confidence.",
      ae: "نتولى الأوراق حتى تتمكن من تشغيل شركة بريطانية متوافقة بثقة.",
    },
    benefits: [
      { en: "Hassle-free registration", ae: "تسجيل بلا متاعب" },
      { en: "Compliant structure", ae: "هيكل متوافق" },
      { en: "Banking guidance", ae: "إرشادات بنكية" },
      { en: "Annual filings", ae: "التقارير السنوية" },
      { en: "Clear documentation", ae: "مستندات واضحة" },
      { en: "Ongoing support", ae: "دعم مستمر" },
    ],
    processTitle: { en: "Formation Steps", ae: "خطوات التأسيس" },
    steps: [
      {
        step: "01",
        title: { en: "Choose Structure", ae: "اختيار الهيكل" },
        desc: { en: "Select LTD or suitable entity", ae: "اختيار LTD أو كيان مناسب" },
      },
      {
        step: "02",
        title: { en: "Register", ae: "التسجيل" },
        desc: { en: "File with Companies House", ae: "التقديم في Companies House" },
      },
      {
        step: "03",
        title: { en: "Documents", ae: "المستندات" },
        desc: { en: "Prepare articles and records", ae: "إعداد النظام الأساسي والسجلات" },
      },
      {
        step: "04",
        title: { en: "Operate", ae: "التشغيل" },
        desc: { en: "Banking and compliance setup", ae: "إعداد البنك والامتثال" },
      },
    ],
    ctaTitle: { en: "Ready to Launch in the UK?", ae: "هل أنت مستعد للإطلاق في بريطانيا؟" },
    ctaCopy: {
      en: "Start your UK company with documentation handled end to end.",
      ae: "ابدأ شركتك البريطانية مع إنهاء المستندات من البداية للنهاية.",
    },
  },

  "vat-tax-advisory": {
    slug: "vat-tax-advisory",
    icon: "Receipt",
    title: { en: "International VAT & Tax Advisory", ae: "الخدمات الدولية للضريبة والقيمة المضافة" },
    heroTag: { en: "VAT & Tax Advisory", ae: "استشارات الضريبة والقيمة المضافة" },
    heroTitleLine1: { en: "Cross-Border", ae: "ضرائب" },
    heroTitleLine2: { en: "Tax Expertise", ae: "عبر الحدود" },
    heroCopy: {
      en: "Cross-border VAT, corporate tax support, and compliance management across multiple jurisdictions.",
      ae: "ضريبة القيمة المضافة عبر الحدود، ودعم ضريبة الشركات، وإدارة الامتثال عبر ولايات متعددة.",
    },
    ctaLabel: { en: "Get Tax Advice", ae: "احصل على استشارة ضريبية" },
    features: [
      {
        title: { en: "VAT Registration", ae: "تسجيل ضريبة القيمة المضافة" },
        description: {
          en: "VAT registration services across all regions.",
          ae: "خدمات تسجيل ضريبة القيمة المضافة في جميع المناطق.",
        },
      },
      {
        title: { en: "Return Filing", ae: "تقديم الإقرارات" },
        description: {
          en: "VAT return filing and management.",
          ae: "تقديم وإدارة إقرارات ضريبة القيمة المضافة.",
        },
      },
      {
        title: { en: "Corporate Tax", ae: "ضريبة الشركات" },
        description: {
          en: "Corporate tax support and advisory.",
          ae: "دعم واستشارات ضريبة الشركات.",
        },
      },
      {
        title: { en: "Compliance", ae: "الامتثال" },
        description: {
          en: "International tax compliance assistance.",
          ae: "مساعدة الامتثال الضريبي الدولي.",
        },
      },
    ],
    benefitsTitleLine1: { en: "Why Choose Our", ae: "لماذا تختار" },
    benefitsTitleLine2: { en: "Tax Advisory?", ae: "استشاراتنا الضريبية؟" },
    benefitsCopy: {
      en: "We keep you compliant across jurisdictions while reducing avoidable tax leakage.",
      ae: "نحافظ على امتثالك عبر الولايات مع تقليل التسرب الضريبي غير الضروري.",
    },
    benefits: [
      { en: "Multi-jurisdiction coverage", ae: "تغطية متعددة الولايات" },
      { en: "Fewer penalties", ae: "غرامات أقل" },
      { en: "Clean filings", ae: "إقرارات نظيفة" },
      { en: "Clear advice", ae: "نصائح واضحة" },
      { en: "Audit readiness", ae: "جاهزية للتدقيق" },
      { en: "Cost efficiency", ae: "كفاءة التكلفة" },
    ],
    processTitle: { en: "Advisory Process", ae: "عملية الاستشارة" },
    steps: [
      {
        step: "01",
        title: { en: "Assess", ae: "التقييم" },
        desc: { en: "Map obligations by jurisdiction", ae: "رسم الالتزامات حسب الولاية" },
      },
      {
        step: "02",
        title: { en: "Register", ae: "التسجيل" },
        desc: { en: "Complete VAT/tax registrations", ae: "إكمال تسجيلات الضريبة والقيمة المضافة" },
      },
      {
        step: "03",
        title: { en: "File", ae: "التقديم" },
        desc: { en: "Prepare and submit returns", ae: "إعداد وتقديم الإقرارات" },
      },
      {
        step: "04",
        title: { en: "Monitor", ae: "المراقبة" },
        desc: { en: "Ongoing compliance monitoring", ae: "مراقبة امتثال مستمرة" },
      },
    ],
    ctaTitle: { en: "Ready to Stay Compliant?", ae: "هل أنت مستعد للبقاء متوافقًا؟" },
    ctaCopy: {
      en: "Get cross-border tax support tailored to your footprint.",
      ae: "احصل على دعم ضريبي عبر الحدود مخصص لنطاق عملك.",
    },
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICES);
