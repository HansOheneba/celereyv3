<!-- BEGIN:nextjs-agent-rules -->
Overview

This project uses Next.js (latest version) and Tailwind CSS (latest version).

You must assume that:

Both frameworks may include breaking changes
APIs, file structure, and conventions may differ from older versions
Linting rules are strict and must be respected

Before implementing anything:

Check official docs inside node_modules/next/dist/docs/
Follow current conventions, not outdated patterns
Core Principles
1. Always Use Latest Tailwind Conventions

Tailwind has introduced updated utility naming. You MUST:

Prefer new syntax over deprecated classes
Avoid any class that triggers warnings
Examples
Old (Deprecated)	New (Required)
bg-gradient-to-r	bg-linear-to-r
bg-gradient-to-b	bg-linear-to-b
bg-gradient-to-tr	bg-linear-to-tr

Rules:

Never use bg-gradient-*
Always replace with bg-linear-*
Follow updated naming across all utilities where applicable

If unsure:

Check Tailwind IntelliSense suggestions
Follow what the linter recommends
2. No Lint Warnings Policy

Your code must:

Produce zero Tailwind warnings
Produce zero TypeScript errors
Avoid deprecated utilities entirely

If a warning appears:

Fix it immediately
Do not ignore or suppress it
3. Component Structure (Next.js)

Use modern Next.js patterns:

Prefer App Router
Use Server Components by default
Only use "use client" when necessary
Guidelines
Keep components small and reusable
Separate UI and logic cleanly
Use meaningful file structure

Example:

app/
  dashboard/
    page.tsx
    components/
      StatsCard.tsx
      Chart.tsx
4. Styling Rules
Use Tailwind only for styling
Avoid inline styles unless absolutely necessary
Avoid custom CSS unless Tailwind cannot handle it
Class Organization

Order classes logically:

Layout (flex, grid)
Spacing (p, m)
Size (w, h)
Typography
Colors
Effects

Example:

<div className="flex items-center gap-4 p-4 w-full text-sm text-white bg-linear-to-r from-blue-500 to-purple-600 rounded-xl">
5. TypeScript Strictness
Do NOT use any
Define explicit types for:
Props
API responses
State

Example:

type User = {
  id: string;
  name: string;
};
6. Reusability & Clean Code
Extract reusable UI into components
Avoid duplication
Use hooks for shared logic
7. Performance Best Practices
Use next/image for images
Use dynamic imports where needed
Avoid unnecessary client components
Tailwind Upgrade Awareness Rule

Tailwind is evolving rapidly.

You must:

Assume some utilities are renamed or deprecated
Prefer modern equivalents
Refactor old utilities when encountered

If you see:

gradient → replace with linear
outdated opacity or color syntax → update to new format
Final Checklist Before Writing Code

Before submitting any code:

 No deprecated Tailwind classes used
 No lint warnings
 Uses latest Tailwind naming conventions
 Uses latest Next.js patterns
 Fully typed (no any)
 Clean and readable structure
<!-- END:nextjs-agent-rules -->
