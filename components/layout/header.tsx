"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type DropdownKey = "insights" | "tools" | "about" | "life";

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

function isActivePath(pathname: string, href: string): boolean {
  if (pathname === "/") return false;
  const [pathOnly] = href.split("#");
  if (pathOnly === "/") return pathname === "/";
  return pathname === pathOnly || pathname.startsWith(`${pathOnly}/`);
}

const flatLinks: NavLink[] = [
  { name: "Start here", href: "/#wealth-scan" },
  { name: "Advisors", href: "/advisors" },
  { name: "Subscribe", href: "/pricing" },
];

const dropdownMenus: DropdownMenu[] = [
  {
    key: "tools",
    label: "Wealth Planning Tools",
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
    key: "life",
    label: "Life Situations",
    items: [
      {
        name: "Business Sale",
        href: "/life/business-sale",
      },
      {
        name: "Significant Life Event",
        href: "/life/significant-life-event",
      },
      {
        name: "Financial Planning",
        href: "/life/financial-planning",
      },
      {
        name: "Private Markets",
        href: "/life/private-markets",
      },
      {
        name: "Cross Border Wealth Management",
        href: "/life/cross-border-wealth-management",
      },
      {
        name: "Tax And Inheritance",
        href: "/life/tax-and-inheritance",
      },
      {
        name: "Retirement Planning",
        href: "/life/retirement-planning",
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

// Mobile dropdown section component
const MobileDropdownSection = ({
  label,
  items,
  onClose,
}: {
  label: string;
  items: DropdownItem[];
  onClose: () => void;
}) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-sm text-zinc-800 hover:bg-zinc-50 transition-colors"
      >
        {label}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-zinc-500 transition-transform duration-200",
            expanded && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "flex flex-col overflow-hidden transition-all duration-200 ease-in-out",
          expanded ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0",
        )}
      >
        <div className="flex flex-col pl-4 space-y-0.5">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800 transition-colors"
            >
              {item.name}
              {item.description && (
                <span className="block text-xs text-zinc-400 mt-0.5">
                  {item.description}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState<DropdownKey | null>(
    null,
  );
  const closeTimerRef = React.useRef<number | null>(null);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    const updateHeader = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleScroll = () => requestAnimationFrame(updateHeader);

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

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  if (!mounted) return null;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        "bg-white",
        isScrolled ? "shadow-sm" : "border-b border-zinc-100",
      )}
    >
       <div className="mx-auto w-full max-w-360 px-4 sm:px-6">
    <nav className="py-4 flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logos/logoDark.png"
            alt="Celerey Logo"
            width={90}
            height={20}
            priority
            className="h-auto w-auto"
            style={{ width: "80px", height: "auto" }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {/* Flat links */}
          {flatLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-colors",
                isActivePath(pathname, link.href)
                  ? "text-zinc-900 font-medium"
                  : "text-zinc-500 hover:text-zinc-800",
              )}
            >
              {link.name}
            </Link>
          ))}

          {/* Dropdown menus */}
          {dropdownMenus.map((menu) => {
            const isOpen = dropdownOpen === menu.key;

            return (
              <div key={menu.key} className="relative group">
                <button
                  onMouseEnter={() => openDropdown(menu.key)}
                  className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors cursor-pointer bg-transparent border-0 py-2"
                >
                  {menu.label}
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 transition-transform duration-200",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>

                <div
                  onMouseEnter={() => openDropdown(menu.key)}
                  onMouseLeave={closeDropdownSoon}
                  className={cn(
                    "absolute top-full left-0 mt-1 w-64 bg-white border border-zinc-200 rounded-xl shadow-lg py-2 z-50 transition-all duration-200",
                    isOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2",
                  )}
                >
                  {menu.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block px-4 py-2 text-sm transition-colors",
                        isActivePath(pathname, item.href)
                          ? "text-zinc-900 bg-zinc-50 font-medium"
                          : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900",
                      )}
                    >
                      {item.name}
                      {item.description && (
                        <span className="block text-xs text-zinc-400 mt-0.5">
                          {item.description}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() =>
              window.open(
                "https://celerey.app/",
                "_blank",
                "noopener,noreferrer",
              )
            }
            className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors px-3 py-2 rounded-lg hover:bg-zinc-50"
          >
            Login
          </button>
          <Button
            onClick={() => router.push("/free-consultation")}
         
          >
            Book your free session
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-0 p-1 z-50 relative"
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              "block w-6 h-0.5 bg-zinc-800 transition-all duration-300 ease-in-out",
              mobileMenuOpen && "translate-y-2 rotate-45",
            )}
          />
          <span
            className={cn(
              "block w-6 h-0.5 bg-zinc-800 transition-all duration-300 ease-in-out",
              mobileMenuOpen && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block w-6 h-0.5 bg-zinc-800 transition-all duration-300 ease-in-out",
              mobileMenuOpen && "-translate-y-2 -rotate-45",
            )}
          />
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 md:hidden",
            mobileMenuOpen
              ? "opacity-100 z-40"
              : "opacity-0 pointer-events-none z-[-1]",
          )}
          onClick={closeMobileMenu}
        />

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed top-0 left-0 h-full w-full max-w-sm bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out md:hidden overflow-y-auto",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
              <Image
                src="/logos/logoDark.png"
                alt="Celerey Logo"
                width={80}
                height={20}
                className="h-auto w-auto"
                priority
              />
              <button
                onClick={closeMobileMenu}
                className="p-2 hover:bg-zinc-50 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-zinc-600" />
              </button>
            </div>

            {/* Mobile Menu Navigation */}
            <div className="flex-1 px-4 py-6 space-y-1">
              {/* Flat links */}
              {flatLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="flex items-center px-4 py-2.5 rounded-lg text-sm text-zinc-800 hover:bg-zinc-50 transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              {/* Dropdown sections */}
              {dropdownMenus.map((menu) => (
                <MobileDropdownSection
                  key={menu.key}
                  label={menu.label}
                  items={menu.items}
                  onClose={closeMobileMenu}
                />
              ))}
            </div>

            {/* Mobile Menu Footer with CTAs */}
            <div className="border-t border-zinc-100 px-5 py-6 space-y-3">
              <button
                onClick={() => {
                  window.open(
                    "https://celerey.app/",
                    "_blank",
                    "noopener,noreferrer",
                  );
                  closeMobileMenu();
                }}
                className="w-full px-4 py-2.5 rounded-lg text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
              >
                Login
              </button>
              <Button
                onClick={() => {
                  router.push("/free-consultation");
                  closeMobileMenu();
                }}
                className="w-full "
              >
                Book your free session
              </Button>
            </div>
          </div>
        </div>
      </nav>
      </div>
    </header>
  );
}
