"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Check,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import { useCountry } from "@/components/country/country-provider";
import {
  annualGoRate,
  annualProRate,
  annualSchoolRate,
  formatAmount,
  monthlyGoRate,
  planRateForCurrency,
} from "@/lib/country/pricing";
import { toFlagClass } from "@/lib/country/countries";

import { cn } from "@/lib/utils";

interface Plan {
  priceType: "free" | "go" | "pro" | "school";
  i18nKey: "lite" | "go" | "pro" | "school";
  popular?: boolean;
  href: string;
}

const plans: Plan[] = [
  {
    priceType: "free",
    i18nKey: "lite",
    href: "/docs/plans/lite",
  },
  {
    priceType: "go",
    i18nKey: "go",
    href: "/docs/plans/go",
  },
  {
    priceType: "pro",
    i18nKey: "pro",
    popular: true,
    href: "/docs/plans/pro",
  },
  {
    priceType: "school",
    i18nKey: "school",
    href: "/docs/plans/school",
  },
];

type Billing = "monthly" | "annual";

export function PricingSection() {
  const t = useTranslations("precios");
  const { selection } = useCountry();
  const rates = planRateForCurrency(selection.currency);
  const money = (amount: number) => formatAmount(amount, selection);
  const [billing, setBilling] = useState<Billing>("monthly");
  const [seats, setSeats] = useState(1);
  const [isEditingSeats, setIsEditingSeats] = useState(false);
  const [seatsInput, setSeatsInput] = useState("1");

  const handleStartEditing = () => {
    setSeatsInput(seats.toString());
    setIsEditingSeats(true);
  };

  const handleSaveSeats = (valueStr: string) => {
    const parsed = parseInt(valueStr, 10);
    if (!isNaN(parsed) && parsed >= 1) {
      setSeats(parsed);
      setSeatsInput(parsed.toString());
    } else {
      setSeatsInput(seats.toString());
    }
    setIsEditingSeats(false);
  };

  return (
    <section id="precios" className="w-full py-16 sm:py-20">
      <div className="mt-2 mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl text-[#19303E] font-bold tracking-tight sm:text-5xl">
            {t("title")}
          </h2>

          {/* Billing toggle */}
          <div className="mt-6 inline-flex items-center rounded-full border border-slate-200 bg-muted/60 p-1 shadow-inner">
            {(["monthly", "annual"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setBilling(option)}
                className={[
                  "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200",
                  billing === option
                    ? "bg-gradient-to-r from-[#19303E] to-[#1D5969] text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {option === "monthly" ? t("monthly") : t("annual")}
              </button>
            ))}
          </div>
        </div>

        {/* Section Banners for Desktop Comparison */}




        {/* Plans Grid */}
        <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-stretch">
          {plans.map((plan) => {
            const isSchool = plan.priceType === "school";
            const planName =
              plan.i18nKey.charAt(0).toUpperCase() + plan.i18nKey.slice(1);
            const subtitle = t(`plans.${plan.i18nKey}.subtitle`);
            const groups = t.raw(`plans.${plan.i18nKey}.groups`) as {
              category: string;
              items: string[];
            }[];
            const cta = t(`plans.${plan.i18nKey}.cta`);

            return (
              <article
                key={plan.priceType}
                className={cn(
                  "relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1",
                  isSchool
                    ? "bg-[#172B36] text-[#F1F6F4] border border-[#114C5A] shadow-xl"
                    : plan.popular
                      ? "bg-background border-2 border-[#1D5969] shadow-md ring-2 ring-[#1D5969]/15"
                      : "bg-background border border-slate-200 shadow-sm hover:shadow-md"
                )}
              >
                {/* Recommended Badge for Go */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-[#19303E] to-[#1D5969] text-white px-3.5 py-1 text-xs font-semibold text-primary-foreground shadow-md">
                      <Sparkles className="h-3 w-3" />
                      {t("preferred")}
                    </div>
                  </div>
                )}

                {/* Main Content Area */}
                <div className="flex flex-col">
                  {/* Institutional Header Label for School */}

                  {/* Plan Name & Country Flag */}
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={cn("text-2xl font-bold tracking-tight", isSchool ? "text-[#F1F6F4]" : "text-[#19303E]")}>
                      Lenio {planName}
                    </h3>
                    <span
                      aria-hidden
                      className={cn(
                        toFlagClass(selection.code),
                        "h-4 w-5 shrink-0 rounded-[2px] opacity-90"
                      )}
                    />
                  </div>

                  {/* Plan Subtitle */}
                  <p
                    className={cn(
                      "mt-2 text-sm leading-relaxed min-h-[40px]",
                      isSchool ? "text-[#D9E8E2]" : "text-muted-foreground"
                    )}
                  >
                    {subtitle}
                  </p>



                  {/* Price Header */}
                  <div className=" dark:border-slate-700/50">
                    {plan.priceType === "free" && (
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold tracking-tight text-[#19303E]">
                          $0
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">
                          {t("perMonth")}
                        </span>
                      </div>
                    )}

                    {plan.priceType === "go" && (
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold tracking-tight text-[#19303E]">
                          {billing === "annual"
                            ? money(annualGoRate(rates))
                            : money(monthlyGoRate(rates))}
                        </span>
                        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                          {billing === "annual" ? t("perYearMonths") : t("perMonth")}
                        </span>
                      </div>
                    )}

                    {plan.priceType === "pro" && (
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold tracking-tight text-[#19303E]">
                          {billing === "annual"
                            ? money(annualProRate(rates))
                            : money(rates.pro)}
                        </span>
                        <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                          {billing === "annual" ? t("perYearMonths") : t("perMonth")}
                        </span>
                      </div>
                    )}

                    {plan.priceType === "school" && (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-baseline gap-1.5 flex-wrap">
                          <span className="text-3xl font-extrabold tracking-tight text-[#F1F6F4]">
                            {billing === "annual"
                              ? money(annualSchoolRate(rates) * seats)
                              : money(rates.school * seats)}
                          </span>
                          <span className="text-xs font-medium text-[#D9E8E2]">
                            {billing === "annual"
                              ? t("perSeatYear", { count: seats })
                              : t("perSeatMonth", { count: seats })}
                          </span>
                        </div>

                        {isSchool && (
                          <div className="mt-2 mb-1 flex items-center justify-between gap-3 rounded-xl border border-[#114C5A] bg-[#114C5A]/60 px-3.5 py-2.5">
                            <span className="text-xs font-semibold text-[#D9E8E2]">
                              {t("seatsLabel")}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                aria-label={t("removeSeat")}
                                onClick={() => {
                                  setIsEditingSeats(false);
                                  setSeats((value) => Math.max(1, value - 1));
                                }}
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D9E8E2]/30 bg-[#172B36] text-base font-bold leading-none text-[#F1F6F4] transition-colors hover:bg-[#114C5A] disabled:opacity-40"
                                disabled={seats <= 1}
                              >
                                −
                              </button>

                              {isEditingSeats ? (
                                <input
                                  type="number"
                                  min={1}
                                  autoFocus
                                  value={seatsInput}
                                  onChange={(e) => setSeatsInput(e.target.value)}
                                  onFocus={(e) => e.target.select()}
                                  onBlur={() => handleSaveSeats(seatsInput)}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      handleSaveSeats(seatsInput);
                                    } else if (e.key === "Escape") {
                                      setIsEditingSeats(false);
                                    }
                                  }}
                                  className="w-14 text-center text-sm font-bold bg-[#172B36] text-white border border-[#D9E8E2]/60 rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-white/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                />
                              ) : (
                                <button
                                  type="button"
                                  onClick={handleStartEditing}
                                  title={t("editSeatsHint")}
                                  className="min-w-8 px-1.5 py-0.5 rounded text-center text-sm font-bold tabular-nums text-white hover:bg-white/15 focus:outline-none focus:ring-1 focus:ring-white/40 transition-colors cursor-pointer"
                                >
                                  {seats}
                                </button>
                              )}

                              <button
                                type="button"
                                aria-label={t("addSeat")}
                                onClick={() => {
                                  setIsEditingSeats(false);
                                  setSeats((value) => value + 1);
                                }}
                                className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D9E8E2]/30 bg-[#172B36] text-base font-bold leading-none text-[#F1F6F4] transition-colors hover:bg-[#114C5A]"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Categorized Features */}
                  <div className="mt-6 space-y-5">
                    {groups.map((group) => (
                      <div key={group.category} className="space-y-2">
                        <h4
                          className={cn(
                            "text-md font-semibold ",
                            isSchool ? "text-white" : "text-[#19303E]"
                          )}
                        >
                          {group.category}
                        </h4>
                        <ul className="space-y-2">
                          {group.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-xs sm:text-sm"
                            >
                              <span
                                className={cn(
                                  "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                                  isSchool
                                    ? "bg-[#114C5A] text-white"
                                    : "bg-[#1D5969]/10 text-[#1D5969]"
                                )}
                              >
                                <Check className="h-3 w-3 stroke-[2.5]" />
                              </span>
                              <span
                                className={cn(
                                  "leading-snug",
                                  isSchool ? "text-[#F1F6F4]" : "text-slate-700"
                                )}
                              >
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Section: CTA Button */}
                <div className="mt-8 pt-4">
                  <Link
                    href={plan.href}
                    className={cn(
                      "group inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 shadow-sm",
                      isSchool
                        ? "bg-white text-[#172B36] hover:brightness-105 shadow-amber-900/30"
                        : plan.popular
                          ? "bg-gradient-to-r from-[#19303E] to-[#1D5969] text-white hover:opacity-95 shadow-slate-900/20"
                          : "border border-slate-300 bg-background text-[#19303E] hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    {cta}
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom note */}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          {t.rich("docsNote", {
            link: (chunks) => (
              <Link
                href="/docs/plans/pro"
                className="underline font-medium text-[#19303E]"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
      </div>
    </section>
  );
}