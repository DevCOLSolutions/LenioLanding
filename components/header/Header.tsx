"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { ArrowUpRight, Menu, X, ChevronDown, GraduationCap } from "lucide-react"
import Image from "next/image"

import { Button } from "../ui/button"
import { CountrySelector } from "../country/country-selector"
import { Link, usePathname, useRouter } from "@/i18n/routing"
import { externalLinks, withUtm } from "@/lib/externalLinks"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "../ui/navigation-menu"

const SECTIONS = ["producto", "features", "precios", "cta"] as const
type SectionId = (typeof SECTIONS)[number]

const navLinkBase =
    "inline-flex h-9 w-max items-center justify-center rounded-lg px-2.5 py-1.5 text-md transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"

const navLinkDefault =
    `${navLinkBase} font-normal text-muted-foreground hover:text-foreground hover:bg-muted `

const navLinkActive =
    `${navLinkBase} text-foreground bg-muted`

function scrollToSection(id: string, closeMobile?: () => void) {
    const el = document.getElementById(id)
    if (el) {
        el.scrollIntoView({ behavior: "smooth" })
    }
    closeMobile?.()
}

export default function Header() {
    const t = useTranslations("nav")
    const pathname = usePathname()
    const router = useRouter()
    const isSchools = pathname === "/schools" || pathname?.endsWith("/schools")

    const [activeSection, setActiveSection] = useState<SectionId>("producto")
    const [mobileOpen, setMobileOpen] = useState(false)
    const [resourcesOpen, setResourcesOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0)
        }

        handleScroll()
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleSectionClick = (id: string, closeMobileFn?: () => void) => {
        if (pathname === "/" || pathname === "") {
            scrollToSection(id, closeMobileFn)
        } else {
            closeMobileFn?.()
            router.push(`/#${id}`)
        }
    }

    useEffect(() => {
        const observers: IntersectionObserver[] = []

        SECTIONS.forEach((id) => {
            const el = document.getElementById(id)
            if (!el) return

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(id)
                    }
                },
                { threshold: 0.3 }
            )

            observer.observe(el)
            observers.push(observer)
        })

        return () => {
            observers.forEach((o) => o.disconnect())
        }
    }, [pathname])

    const linkClass = (id: SectionId) =>
        !isSchools && activeSection === id ? navLinkActive : navLinkDefault

    const closeMobile = () => setMobileOpen(false)

    return (
        <>
            <header
                className={`sticky top-0 z-50 w-full border-b transition-colors duration-200 bg-background/95 backdrop-blur-md supports-backdrop-filter:bg-background/60 ${
                    isScrolled || mobileOpen
                        ? "border-border"
                        : "border-transparent"
                }`}
            >
                <div className="flex h-16 w-full items-center justify-between px-6 sm:px-12 md:px-12">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2  text-foreground"
                    >
                        <Logo />
                        <span className="text-3xl font-semibold tracking-">Lenio.</span>
                    </Link>

                    {/* Nav desktop */}
                    <nav className="hidden items-center gap-1 text-md text-muted-foreground md:flex">
                        <button onClick={() => handleSectionClick("producto")} className={linkClass("producto")}>
                            {t("product")}
                        </button>

                        <button onClick={() => handleSectionClick("features")} className={linkClass("features")}>
                            {t("features")}
                        </button>
                        <button onClick={() => handleSectionClick("precios")} className={linkClass("precios")}>
                            {t("pricing")}
                        </button>

                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="text-md text-muted-foreground font-normal hover:text-foreground">
                                        {t("resources")}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-2 lg:w-[300px]">
                                            <ListItem title={t("documentation")} href={externalLinks.documentacion}>
                                                {t("documentationDescription")}
                                            </ListItem>
                                            <ListItem title={t("help")} href={externalLinks.centroAyuda}>
                                                {t("helpDescription")}
                                            </ListItem>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>

                        {/* Botón destacado Lenio Schools */}
                        {/* <Link
                            href="/schools"
                            className={`ml-2 inline-flex h-9 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition-all border ${isSchools
                                ? "bg-[#19303E] text-white border-[#19303E] shadow-sm ring-2 ring-[#1D5969]/30"
                                : "border-[#1D5969]/35 bg-[#1D5969]/5 text-[#19303E] hover:bg-[#1D5969]/15 hover:text-[#1D5969] hover:border-[#1D5969]/50"
                                }`}
                        >
                            <GraduationCap className={`size-4 ${isSchools ? "text-[#FCD116]" : "text-[#1D5969]"}`} />
                            <span>Lenio Schools</span>
                            <span
                                className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${isSchools
                                    ? "bg-white/20 text-white"
                                    : "bg-[#1D5969] text-white"
                                    }`}
                            >
                                Colegios
                            </span>
                        </Link> */}
                    </nav>

                    {/* Acciones desktop + botn hamburguesa */}
                    <div className="flex items-center gap-2 h-9">
                        {/* Selector de pas y moneda - visible siempre */}
                        <CountrySelector />

                        {/* CTA - solo desktop */}
                        <Link href={withUtm(externalLinks.app, "header")} className="hidden md:inline-block">
                            <Button className="bg-gradient-to-r from-[#19303E] to-[#1D5969] text-white h-9 px-4">
                                {t("startNow")} <ArrowUpRight />
                            </Button>
                        </Link>

                        {/* Hamburguesa - solo mvil */}
                        <Button
                            variant="outline"
                            size="icon"
                            className="md:hidden"
                            aria-label={t("openMenu")}
                            onClick={() => setMobileOpen((v) => !v)}
                        >
                            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                        </Button>
                    </div>
                </div>
            </header>

            {/* Men mvil */}
            {/* Overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={closeMobile}
            />

            {/* Panel deslizante */}
            <div
                className={`fixed inset-x-0 top-16 z-40 bg-white border-b border-border/60 shadow-lg md:hidden transition-all duration-300 ease-in-out ${mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
            >
                <nav className="flex flex-col px-4 py-4 gap-1.5">
                    {/* Botón destacado Lenio Schools móvil */}
                    <Link
                        href="/schools"
                        onClick={closeMobile}
                        className={`mb-2 flex items-center justify-between rounded-xl border p-3 text-left transition-all ${isSchools
                            ? "border-[#19303E] bg-[#19303E] text-white shadow-md"
                            : "border-[#1D5969]/30 bg-gradient-to-r from-[#19303E]/5 via-[#1D5969]/10 to-transparent hover:bg-[#1D5969]/20"
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className={`flex size-9 items-center justify-center rounded-lg shadow-sm ${isSchools ? "bg-white/15 text-[#FCD116]" : "bg-[#19303E] text-white"
                                    }`}
                            >
                                <GraduationCap className="size-5" />
                            </div>
                            <div>
                                <div
                                    className={`flex items-center gap-1.5 text-sm font-semibold ${isSchools ? "text-white" : "text-[#19303E]"
                                        }`}
                                >
                                    Lenio Schools
                                    <span className="rounded bg-[#1D5969] px-1.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                                        Colegios
                                    </span>
                                </div>
                                <div className={`text-xs ${isSchools ? "text-white/80" : "text-muted-foreground"}`}>
                                    Centro de mando y workspaces institucionales
                                </div>
                            </div>
                        </div>
                        <ArrowUpRight className={`size-4 ${isSchools ? "text-[#FCD116]" : "text-[#1D5969]"}`} />
                    </Link>

                    <button
                        onClick={() => handleSectionClick("producto", closeMobile)}
                        className={`${linkClass("producto")} w-full justify-start px-3`}
                    >
                        {t("product")}
                    </button>

                    <button
                        onClick={() => handleSectionClick("features", closeMobile)}
                        className={`${linkClass("features")} w-full justify-start px-3`}
                    >
                        {t("features")}
                    </button>
                    <button
                        onClick={() => handleSectionClick("precios", closeMobile)}
                        className={`${linkClass("precios")} w-full justify-start px-3`}
                    >
                        {t("pricing")}
                    </button>

                    {/* Recursos acorden mvil */}
                    <div>
                        <button
                            onClick={() => setResourcesOpen((v) => !v)}
                            className={`${navLinkDefault} w-full justify-between px-3`}
                        >
                            {t("resources")}
                            <ChevronDown
                                className={`size-4 ml-1 transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`}
                            />
                        </button>
                        {resourcesOpen && (
                            <div className="mt-1 ml-3 flex flex-col gap-1 border-l border-border/60 pl-3">
                                <Link
                                    href={externalLinks.documentacion}
                                    onClick={closeMobile}
                                    className="flex flex-col py-2 text-sm hover:text-foreground text-muted-foreground"
                                >
                                    <span className="font-medium text-foreground">{t("documentation")}</span>
                                    <span>{t("documentationDescription")}</span>
                                </Link>
                                <Link
                                    href={externalLinks.centroAyuda}
                                    onClick={closeMobile}
                                    className="flex flex-col py-2 text-sm hover:text-foreground text-muted-foreground"
                                >
                                    <span className="font-medium text-foreground">{t("help")}</span>
                                    <span>{t("helpDescription")}</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* CTA mvil */}
                    <div className="mt-3 pt-3 border-t border-border/60">
                        <Link href={withUtm(externalLinks.app, "header")} className="block" onClick={closeMobile}>
                            <Button className="w-full bg-gradient-to-r from-[#19303E] to-[#1D5969] text-white">
                                {t("startNow")} <ArrowUpRight />
                            </Button>
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    )
}

function Logo() {
    return <Image src="/logoLenio.png" alt="Lenio Logo" width={30} height={30} />
}

function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink
                render={
                    <Link href={href}>
                        <div className="flex flex-col gap-1 text-sm">
                            <div className="leading-none font-medium">{title}</div>
                            <div className="line-clamp-2 text-muted-foreground">{children}</div>
                        </div>
                    </Link>
                }
            />
        </li>
    )
}
