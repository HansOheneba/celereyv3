"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { BeginJourneyModal } from "@/components/homepage/beginModal";

type DropdownKey = "insights" | "tools" | "about";

type NavLink = {
  name: string;
  href: string;
};

type DropdownItem = {
  name: string;
  href: string;
  description?: string;
};

type DropdownMenu = {
  key: DropdownKey;
  label: string;
  items: DropdownItem[];
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isActivePath(pathname: string, href: string): boolean {
  if (pathname === "/") return false;
  const [pathOnly] = href.split("#");
  if (pathOnly === "/") return pathname === "/";
  return pathname === pathOnly || pathname.startsWith(`${pathOnly}/`);
}

const flatLinks: NavLink[] = [
  { name: "How it works", href: "/#how-it-works" },
  { name: "What we help with", href: "/services" },
  { name: "Our advisors", href: "/advisors" },
  { name: "Pricing", href: "/pricing" },
];

const dropdownMenus: DropdownMenu[] = [
  {
    key: "tools",
    label: "Tools",
    items: [
      {
        name: "All Tools",
        href: "/tools",
        description: "See all available tools in one place",
      },
      {
        name: "Budget Planner",
        href: "/tools/budget-planner",
        description: "Track spending and set category limits",
      },
      {
        name: "Savings Calculator",
        href: "/tools/savings-calculator",
        description: "Project how your savings grow over time",
      },
      {
        name: "Money Manager",
        href: "/tools/money-manager",
        description: "Holistic view of income, outgoings, and net worth",
      },
    ],
  },
  {
    key: "insights",
    label: "Insights",
    items: [
      {
        name: "Market Insights",
        href: "/resources/insights",
        description: "Market outlooks, frameworks, and deep dives",
      },
      {
        name: "Stories",
        href: "/resources/stories",
        description: "Practical guidance, explained simply",
      },
      {
        name: "Podcasts",
        href: "/resources/podcasts",
        description: "Conversations on discipline and decision-making",
      },
    ],
  },
  {
    key: "about",
    label: "About Us",
    items: [
      {
        name: "Who we are",
        href: "/about",
        description: "Principles, standards, and how we work",
      },
      {
        name: "FAQs",
        href: "/faqs",
        description: "How engagements and membership work",
      },
      {
        name: "Contact",
        href: "/contact",
        description: "Speak with the team",
      },
    ],
  },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState<DropdownKey | null>(
    null,
  );
  const closeTimerRef = React.useRef<number | null>(null);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const currentScrollY = window.scrollY;
      const nextVisible = currentScrollY < lastScrollY || currentScrollY < 100;
      setVisible(nextVisible);
      setIsScrolled(currentScrollY > 50);
      if (!nextVisible) setDropdownOpen(null);
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateHeader();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    setDropdownOpen(null);
  }, [pathname]);

  React.useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  const openDropdown = (key: DropdownKey) => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    setDropdownOpen(key);
  };

  const closeDropdownSoon = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = window.setTimeout(() => {
      setDropdownOpen(null);
    }, 140);
  };

  if (!mounted) return null;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        "bg-white text-black py-3",
        isScrolled ? "shadow-sm" : "border-b border-gray-100",
        visible
          ? "pointer-events-auto"
          : "-translate-y-full pointer-events-none",
      )}
    >
      <div className="mx-auto flex md:px-24 items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logos/logoDark.png"
            alt="Celerey Logo"
            width={90}
            height={20}
            priority
            className="h-auto w-20 md:w-[90px]"
          />
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-0.5 lg:flex"
          onMouseLeave={closeDropdownSoon}
        >
          {/* Flat links */}
          {flatLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-2 text-sm rounded-lg transition-colors whitespace-nowrap",
                isActivePath(pathname, link.href)
                  ? "text-black font-medium"
                  : "text-gray-600 hover:text-black hover:bg-gray-50",
              )}
            >
              {link.name}
            </Link>
          ))}

          {/* Dropdown links */}
          {dropdownMenus.map((m) => {
            const isOpen = dropdownOpen === m.key;

            return (
              <div key={m.key} className="relative">
                <button
                  onMouseEnter={() => openDropdown(m.key)}
                  className={cn(
                    "inline-flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors whitespace-nowrap",
                    isOpen
                      ? "text-black bg-gray-50"
                      : "text-gray-600 hover:text-black hover:bg-gray-50",
                  )}
                >
                  {m.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>

                {/* Dropdown panel */}
                <div
                  onMouseEnter={() => openDropdown(m.key)}
                  className={cn(
                    "absolute left-1/2 top-full mt-2 w-64 -translate-x-1/2",
                    "rounded-2xl bg-white text-black shadow-xl border border-gray-100",
                    "transition-all duration-200",
                    isOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-2 pointer-events-none",
                  )}
                >
                  <div className="p-2">
                    {m.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex flex-col rounded-xl px-3 py-2.5 transition-colors hover:bg-gray-50",
                          isActivePath(pathname, item.href) && "bg-gray-50",
                        )}
                      >
                        <span className="text-sm font-medium text-gray-900">
                          {item.name}
                        </span>
                        {item.description && (
                          <span className="mt-0.5 text-xs leading-snug text-gray-400">
                            {item.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Right CTAs */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <button
            onClick={() => router.push("/login")}
            className="text-sm text-gray-600 hover:text-black transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
          >
            Login
          </button>
          <Button
            onClick={() => router.push("/pricing")}
            className="bg-primary hover:bg-primary/90 text-white text-sm px-5 whitespace-nowrap"
          >
            Book your session
          </Button>
        </div>

        {/* Mobile hamburger */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-black">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-full max-w-sm bg-white p-0 overflow-y-auto"
            >
              <SheetTitle className="sr-only">Navigation</SheetTitle>

              {/* Mobile header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <Image
                  src="/logos/logoDark.png"
                  alt="Logo"
                  width={90}
                  height={24}
                />
                <SheetClose className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <X className="w-5 h-5 text-gray-600" />
                </SheetClose>
              </div>

              {/* Mobile nav links */}
              <nav className="px-4 py-4 space-y-1">
                {flatLinks.map((link) => (
                  <SheetClose key={link.href} asChild>
                    <Link
                      href={link.href}
                      className="flex items-center px-3 py-3 rounded-xl text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                ))}

                {dropdownMenus.map((m) => (
                  <MobileNavSection
                    key={m.key}
                    label={m.label}
                    items={m.items}
                    onClose={() => setOpen(false)}
                  />
                ))}
              </nav>

              {/* Mobile CTAs */}
              <div className="px-6 pb-8 pt-4 border-t border-gray-100 mt-2 space-y-3">
                <SheetClose asChild>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/login")}
                    className="w-full"
                  >
                    Login
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button
                    onClick={() => router.push("/pricing")}
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                  >
                    Book your session
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <BeginJourneyModal open={modalOpen} onOpenChange={setModalOpen} />
    </header>
  );
}

// ---- Mobile accordion section ----
function MobileNavSection({
  label,
  items,
  onClose,
}: {
  label: string;
  items: { name: string; href: string; description?: string }[];
  onClose: () => void;
}) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors"
      >
        {label}
        <ChevronDown
          className={cn(
            "h-4 w-4 text-gray-500 transition-transform duration-200",
            expanded && "rotate-180",
          )}
        />
      </button>

      {expanded && (
        <div className="ml-3 mt-1 mb-2 space-y-0.5">
          {items.map((item) => (
            <SheetClose key={item.href} asChild>
              <Link
                href={item.href}
                onClick={onClose}
                className="flex flex-col px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-gray-900">
                  {item.name}
                </span>
                {item.description && (
                  <span className="text-xs text-gray-400 leading-snug mt-0.5">
                    {item.description}
                  </span>
                )}
              </Link>
            </SheetClose>
          ))}
        </div>
      )}
    </div>
  );
}
