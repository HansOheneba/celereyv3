export type LifeSituation = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
  faqs: { question: string; answer: string }[];
  relatedTags: string[];
};

export const lifeSituations: LifeSituation[] = [
  {
    slug: "business-sale",
    title: "Business Sale",
    tagline: "Exit with clarity, structure, and confidence.",
    description:
      "Selling a business is one of the most complex financial events of a lifetime. The decisions you make in the months before a sale determine how much you keep, how your proceeds are structured, and what your financial life looks like on the other side. We help founders and business owners navigate the full arc of a business exit with independent advisory that puts your interests first.",
    highlights: [
      "Pre-sale structuring to maximise net proceeds",
      "Capital gains and tax exposure planning",
      "Reinvestment and post-exit wealth strategy",
    ],
    image: "/services/business.jpeg",
    imageAlt: "Founders reviewing business sale documents",
    ctaLabel: "Explore Business Financing",
    ctaHref: "/services/capital#inquiry",
    faqs: [
      {
        question: "When should I start planning my business exit?",
        answer:
          "Ideally 12 to 24 months before any transaction. Early planning gives you time to restructure ownership, optimise your tax position, and position the business to attract better terms. Advisory sought after heads of terms are signed is significantly less effective.",
      },
      {
        question: "How do I minimise tax on business sale proceeds?",
        answer:
          "The answer depends on your structure, jurisdiction, and how the deal is constructed. Key levers include business asset disposal relief, hold-over reliefs, share vs. asset deals, and deferred consideration arrangements. A structured review before the sale is the most reliable way to surface what applies to your situation.",
      },
      {
        question: "What do I do with the proceeds after a sale?",
        answer:
          "Post-exit wealth planning is a distinct discipline. Proceeds from a business sale often represent a liquidity event that has never been experienced before. The decisions around reinvestment, drawdown structure, and portfolio construction require a different framework than ongoing wealth management.",
      },
      {
        question:
          "Should I take cash at completion or accept deferred consideration?",
        answer:
          "This depends on your confidence in the buyer, your tax position, and your cash flow needs. Deferred consideration, earn-outs, and loan notes each carry different risk and tax profiles. Independent advisory helps you evaluate the true value of the deal rather than the headline number.",
      },
    ],
    relatedTags: ["Investment", "Strategy", "Wealth Management"],
  },
  {
    slug: "significant-life-event",
    title: "Significant Life Event",
    tagline: "Major transitions deserve a financial plan that moves with you.",
    description:
      "Divorce, inheritance, bereavement, relocation, or a sudden change in income can fundamentally alter your financial position overnight. These moments demand clear thinking at exactly the time when clear thinking is hardest. We help you understand the financial implications of what has happened, what decisions need to be made, and in what order.",
    highlights: [
      "Immediate financial position review",
      "Asset division, transfer, and protection guidance",
      "Forward planning from a new baseline",
    ],
    image: "/homepage/family-walking.png",
    imageAlt: "Family navigating a life transition together",
    ctaLabel: "Talk to us",
    ctaHref: "/contact",
    faqs: [
      {
        question:
          "What financial steps should I take immediately after a divorce?",
        answer:
          "The priority is understanding the full picture of assets and liabilities before any settlement is agreed. This includes pensions, business interests, and offshore holdings that are often undervalued or overlooked in negotiations. Separating finances cleanly, updating beneficiaries, and restructuring accounts are all early priorities.",
      },
      {
        question:
          "I have just received an inheritance. What should I do first?",
        answer:
          "Before making any investment or spending decisions, take time to understand the full value and nature of what you have received. Some inherited assets carry embedded tax liabilities or legal complexities. A structured review of your new financial position is the most valuable first step.",
      },
      {
        question: "How do I handle a sudden large windfall responsibly?",
        answer:
          "The most common mistake is moving too fast. Placing funds in a holding account while you arrange proper advisory is a sound first step. The key questions are how it fits with your existing financial position, what your goals are over the next 5 to 10 years, and what tax events the receipt may have triggered.",
      },
      {
        question:
          "Can you help if I am going through a significant life change but not sure what I need?",
        answer:
          "Yes. A discovery conversation is exactly the right starting point. We will help you understand what questions are relevant to your situation before identifying what advisory engagement makes sense.",
      },
    ],
    relatedTags: ["Psychology", "Behavioral Finance", "Wealth Growth"],
  },
  {
    slug: "financial-planning",
    title: "Financial Planning",
    tagline: "A plan that reflects your life, not just your assets.",
    description:
      "Financial planning is not a product. It is a process of understanding where you are, where you want to go, and what it will take to get there with confidence. At Celerey, we begin with your goals and work backwards to build a coherent strategy across income, assets, tax, protection, and long-term growth.",
    highlights: [
      "Comprehensive financial health assessment",
      "Goal-based planning across short, medium, and long-term horizons",
      "Strategy across savings, investment, protection, and tax",
    ],
    image: "/services/investment.jpeg",
    imageAlt: "Advisor reviewing a comprehensive financial plan with a client",
    ctaLabel: "Book a free session",
    ctaHref: "/free-consultation",
    faqs: [
      {
        question:
          "What is the difference between financial planning and investment management?",
        answer:
          "Investment management focuses on the selection and management of assets. Financial planning is broader: it covers cash flow, goals, tax, protection, and the interaction between all aspects of your financial life. Good investment management should always sit within a financial plan, not in place of one.",
      },
      {
        question: "When is the right time to start financial planning?",
        answer:
          "The best time is before a major decision, not after. Whether you are approaching a career change, planning a family, coming into money, or simply feeling that your finances lack structure, the right time is now. Planning compounds in value the earlier it starts.",
      },
      {
        question: "How often should a financial plan be reviewed?",
        answer:
          "At a minimum, annually. In practice, any significant life change, income shift, tax rule change, or major purchase should trigger a review. A good financial plan is a living document, not a one-time deliverable.",
      },
      {
        question:
          "What information do I need to bring to a financial planning session?",
        answer:
          "A rough picture of your income, assets, liabilities, protection arrangements, and what you want your financial life to look like in the next 5 to 10 years. We will help you organise and interpret the rest.",
      },
    ],
    relatedTags: ["Investment", "Strategy", "Finance"],
  },
  {
    slug: "private-markets",
    title: "Private Markets",
    tagline:
      "Access the asset class that drives long-term wealth for institutions.",
    description:
      "Private equity, venture capital, private credit, and alternative assets have historically delivered superior risk-adjusted returns for investors who can access them. Understanding how to evaluate, structure, and size these allocations within a broader portfolio requires specialist knowledge. We help clients assess whether private market exposure is appropriate for their situation and how to access it intelligently.",
    highlights: [
      "Private equity and venture capital allocation guidance",
      "Liquidity and lock-up period planning",
      "Portfolio construction within a broader wealth strategy",
    ],
    image: "/services/investment.png",
    imageAlt: "Reviewing private market investment opportunities",
    ctaLabel: "Talk to us",
    ctaHref: "/contact",
    faqs: [
      {
        question: "Who should consider private market investments?",
        answer:
          "Investors who have a sufficiently liquid portfolio to accommodate illiquid commitments, a long enough time horizon, and the ability to absorb capital call schedules. Private markets are not appropriate as a core holding for individuals who may need access to capital in the short term.",
      },
      {
        question: "What is the minimum I need to invest in private equity?",
        answer:
          "Direct fund access typically starts at significant minimums. However, feeder vehicles and co-investment platforms have lowered access points for qualified investors. The right structure depends on your goals, liquidity position, and jurisdiction.",
      },
      {
        question: "How do private credit and direct lending work?",
        answer:
          "Private credit involves lending to companies outside the public debt markets, typically at higher yields in exchange for illiquidity. It has become a significant allocation for sophisticated investors seeking income with lower correlation to public market volatility.",
      },
      {
        question:
          "How do I evaluate whether a private market opportunity is well-structured?",
        answer:
          "Key factors include the manager track record, fee structure, alignment of interest, vintage year, and how the allocation sits within your overall portfolio. Independent advisory before committing capital is essential, particularly for first-time private market investors.",
      },
    ],
    relatedTags: ["Investment", "Strategy", "Finance"],
  },
  {
    slug: "cross-border-wealth-management",
    title: "Cross Border Wealth Management",
    tagline: "Wealth that spans borders deserves advice that does the same.",
    description:
      "Living across multiple countries, holding assets in different jurisdictions, or having family and business interests that span borders creates a level of financial complexity that standard advisory cannot adequately address. We help internationally mobile individuals understand and navigate the tax, regulatory, and structural implications of their cross-border financial position.",
    highlights: [
      "Multi-jurisdiction tax position review",
      "Offshore asset structuring and compliance",
      "International property and residency planning",
    ],
    image: "/services/property.png",
    imageAlt: "Globally connected individual reviewing international assets",
    ctaLabel: "Explore International Advisory",
    ctaHref: "/services/property#inquiry",
    faqs: [
      {
        question:
          "I live in one country but earn income in another. What do I need to know?",
        answer:
          "Your tax obligations depend on your residency status, domicile, and the tax treaty position between the countries involved. Without a structured review, double taxation, reporting failures, and missed reliefs are common outcomes.",
      },
      {
        question:
          "What are the risks of holding assets informally across borders?",
        answer:
          "Unstructured cross-border holdings can create estate planning complications, currency exposure, regulatory reporting failures, and unexpected tax events. The cost of structuring correctly upfront is almost always lower than unwinding incorrectly structured positions later.",
      },
      {
        question:
          "Can I hold property in a foreign country in my personal name?",
        answer:
          "You can, but whether you should depends on the jurisdiction. In some markets, personal ownership creates inheritance complications, currency repatriation restrictions, or higher transaction costs on exit. An advisory review before acquisition is strongly recommended.",
      },
      {
        question: "What is a tax treaty and does it affect me?",
        answer:
          "Tax treaties are bilateral agreements between countries that determine how income and assets are taxed when a person has connections to both. Understanding whether a treaty applies, and how to benefit from it, is a key part of cross-border tax planning.",
      },
    ],
    relatedTags: ["Investment", "Strategy", "Wealth Management"],
  },
  {
    slug: "tax-and-inheritance",
    title: "Tax and Inheritance",
    tagline:
      "Preserving wealth across generations requires foresight and precision.",
    description:
      "The wealth you have built deserves to be passed on the way you intend. Tax exposure at death, poorly structured estate plans, and absent governance frameworks are the most common reasons wealth fails to transfer across generations. We help clients structure their affairs so that what they have built continues to benefit the people and causes that matter most to them.",
    highlights: [
      "Inheritance and succession planning",
      "Trust and estate coordination",
      "Family-focused tax strategy",
    ],
    image: "/services/legacy.png",
    imageAlt: "Family discussing legacy and estate planning",
    ctaLabel: "Explore Estate Planning",
    ctaHref: "/services/estate#inquiry",
    faqs: [
      {
        question: "Why is estate planning important if I already have a will?",
        answer:
          "A will governs the distribution of your estate, but it does not reduce your estate&apos;s tax liability or protect assets from probate delays, creditor claims, or family disputes. Estate planning addresses the structure of your assets before death, which a will alone cannot achieve.",
      },
      {
        question: "How can I reduce inheritance tax?",
        answer:
          "The principal tools include gifts made during your lifetime, trust structures, business property relief, agricultural property relief, and charitable giving. Each has eligibility conditions and timing implications. A structured plan is more effective than ad hoc gifts.",
      },
      {
        question: "Is estate planning only for very wealthy families?",
        answer:
          "No. Any individual with dependants, property, business interests, or assets they want to pass on should have a considered estate plan. The complexity and tools involved scale with the size and nature of the estate, but the need exists at all levels of wealth.",
      },
      {
        question: "How often should my estate plan be reviewed?",
        answer:
          "Any significant life event should trigger a review: marriage, divorce, a new child or grandchild, a significant change in asset value, or a change in tax legislation. A routine review every two to three years is good practice regardless.",
      },
    ],
    relatedTags: ["Wealth Management", "Strategy", "Finance"],
  },
  {
    slug: "retirement-planning",
    title: "Retirement Planning",
    tagline: "Financial independence on your terms, not by accident.",
    description:
      "Retirement is not an event. It is a phase of life that requires a fundamentally different financial strategy from the accumulation years. The transition from earning to drawing, from building to preserving, is one of the most consequential financial shifts a person makes. We help clients plan the full arc of retirement: from accumulation strategy through to income drawdown, healthcare planning, and estate considerations.",
    highlights: [
      "Pension and retirement account optimisation",
      "Drawdown and income sequencing strategy",
      "Healthcare, longevity, and legacy planning",
    ],
    image: "/services/legacy.png",
    imageAlt: "Couple planning their retirement with a financial advisor",
    ctaLabel: "Talk to us",
    ctaHref: "/contact",
    faqs: [
      {
        question: "How much do I need to retire comfortably?",
        answer:
          "This depends on your expected lifestyle costs, longevity assumptions, existing assets, and any guaranteed income sources such as state pensions or annuities. A retirement projection that models different scenarios is more useful than a single target number.",
      },
      {
        question:
          "What is the difference between a pension and an ISA for retirement saving?",
        answer:
          "Pensions offer upfront tax relief but have access restrictions and lifetime allowance considerations. ISAs offer tax-free growth and flexible access. Most individuals benefit from a combination of both, structured to optimise tax efficiency across both accumulation and drawdown phases.",
      },
      {
        question: "When should I start drawing from my pension?",
        answer:
          "The optimal timing depends on your other income sources, tax position in retirement, state pension entitlement, and estate planning objectives. Drawing too early or in the wrong sequence can create unnecessary tax costs and reduce the longevity of your assets.",
      },
      {
        question: "What happens to my pension if I die before I retire?",
        answer:
          "This depends on your pension type and nominations. Defined contribution pensions can typically be passed on to nominated beneficiaries outside of your estate, potentially free of inheritance tax. Reviewing and updating nominations is an often-overlooked but critical step.",
      },
    ],
    relatedTags: ["Investment", "Wealth Management", "Behavioral Finance"],
  },
];

export function getLifeSituationBySlug(
  slug: string,
): LifeSituation | undefined {
  return lifeSituations.find((s) => s.slug === slug);
}
