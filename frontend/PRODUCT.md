# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recruiters and hiring managers (in-house teams and ESNs/consultancies) evaluating Vincent Simonin, a full-stack software engineer based in Dijon, for a role. They arrive from a CV, LinkedIn or a job application, often skim on a phone first, and need to judge quickly: what he has built, for whom, with which stack, and whether he can own a project on his own. Success = they reach out (contact form, e-mail, LinkedIn) for an interview.

Secondary audience: companies looking for an engineer for a business application. Current copy still speaks to them in places ("vos applications sur mesure", "Un projet, une question ou une collaboration ?"); see the open decision below.

## Product Purpose

A personal portfolio site (`vincentsimonin.fr`) that presents Vincent's professional work, method and career so a recruiter can assess his profile without a call, and contact him in one step. Pages: home (hook, references, featured projects, method, career), projects, contact.

## Positioning

One engineer who covers the whole lifecycle of a business application, from requirements and functional specs through architecture, back end to UI, CI/CD and Azure deployment, to corrective and evolutive maintenance, on complex systems for large accounts: Smart Building hypervision (Kardham Digital, for EY), highway traffic management and GIS (APRR), water-resource management (Inetum). Backed by an engineering master's (DIIAGE) and Microsoft Azure certifications (AZ-204, Azure Fundamentals, Azure AI Fundamentals).

## Operating Context

- Visitors read in French (default), English (`en-us`) or German (`de`); every piece of copy exists in all three.
- Typical evaluation: skim the home page, open a project or two, check the stack and the career timeline, then contact.
- The site itself is evidence of engineering quality: it is fast (static, CDN-served), accessible, SEO-complete and bilingual-plus. A recruiter technical enough to open devtools should find it clean.

## Capabilities and Constraints

- Contact goes through a client-side EmailJS form, plus direct e-mail, GitHub and LinkedIn links.
- Projects are structured data (client, period, role, phases covered, stack, illustration) in the i18n dictionaries; phases are `specify`, `design`, `build`, `ship`, `maintain`.
- Technical constraints: performance budget (mobile Lighthouse), every page prerendered and served from the CDN, no hardcoded user-facing text, deliberately pinned dependencies.
- **Open decision:** the copy's addressee. Recruiters are the primary audience, but the hook, CTA and meta description are written for clients. Not yet decided whether to rewrite them.

## Brand Commitments

- Name: Vincent Simonin. Domain: `vincentsimonin.fr`.
- Voice: first person, plain and factual, no superlatives; claims are tied to a named project or employer ("En pratique" proof lines in the method section).
- Visual identity is defined by the existing implementation and `DESIGN.md`, not here.

## Evidence on Hand

- Client and employer names may be cited publicly: Kardham Digital, EY, APRR, Inetum, INRAE.
- Project write-ups for 5+ projects with role, period, phases and stack (`i18n/*.json`, `projects.items`).
- Career timeline 2021 to today, diploma and certifications (`homePage.career`).
- **Absent, must not be fabricated:** project screenshots (projects are shown with illustrations only), testimonials or quotes, metrics and outcome figures.

## Product Principles

1. Prove, don't claim: every capability shown points to a real project, client or certification.
2. Scannable in under a minute: role, stack, clients and contact are findable without reading paragraphs.
3. Ownership over breadth: present the end-to-end lifecycle, not a list of buzzwords.
4. The site is a work sample: its speed, accessibility and polish are part of the pitch.

## Accessibility & Inclusion

WCAG AA contrast (small text uses the theme-aware `text-brand` shade), reduced-motion support on every animation, keyboard-usable navigation and menus, full content parity across the three locales.
