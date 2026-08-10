"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { ArrowUpRight, Menu, X, ChevronDown } from "lucide-react"
import Image from "next/image"

import { Button } from "../ui/button"
import { CountrySelector } from "../country/country-selector"
import { Link } from "@/i18n/routing"
import { externalLinks } from "@/lib/externalLinks"
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
    "inline-flex h-9 w-max items-center justify-center rounded-lg px-2.5 py-1.5 text-md  transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer"

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
    const [activeSection, setActiveSection] = useState<SectionId>("producto")
    const [mobileOpen, setMobileOpen] = useState(false)
    const [resourcesOpen, setResourcesOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    // Bloquear scroll del body cuando el menú móvil está abierto
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [mobileOpen])

    // Mostrar borde inferior del header al hacer cualquier scroll
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 0)
        handleScroll()
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id as SectionId)
                    }
                })
            },
            {
                rootMargin: "-20% 0px -60% 0px",
                threshold: 0,
            }
        )

        SECTIONS.forEach((id) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    const linkClass = (id: SectionId) =>
        activeSection === id ? navLinkActive : navLinkDefault

    const closeMobile = () => setMobileOpen(false)

    return (
        <>
            <header className={`sticky top-0 z-50 bg-white backdrop-blur  ${scrolled ? "border-b " : ""}`}>
                <div className="mx-auto flex h-16 w-full items-center justify-between px-4 xl:px-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Logo />
                        <span className="font-heading text-3xl text-[#19303E]">Lenio.</span>
                    </Link>

                    {/* Nav desktop */}
                    <nav className="hidden items-center gap-1 text-md text-muted-foreground md:flex">
                        <button onClick={() => scrollToSection("producto")} className={linkClass("producto")}>
                            {t("product")}
                        </button>
                        <button onClick={() => scrollToSection("features")} className={linkClass("features")}>
                            {t("features")}
                        </button>
                        <button onClick={() => scrollToSection("precios")} className={linkClass("precios")}>
                            {t("pricing")}
                        </button>

                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="text-md text-muted-foreground font-normal hover:text-foreground">
                                        Recursos
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-2 lg:w-[300px]">
                                            <ListItem title="Documentación" href={externalLinks.documentacion}>
                                                Conoce todas las funcionalidades
                                            </ListItem>
                                            <ListItem title="Centro de ayuda" href={externalLinks.centroAyuda}>
                                                Resuelve dudas y encuentra guías rápidas
                                            </ListItem>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </nav>

                    {/* Acciones desktop + botón hamburguesa */}
                    <div className="flex items-center gap-2 h-9">
                        {/* Selector de país y moneda — visible siempre */}
                        <CountrySelector />

                        {/* CTA — solo desktop */}
                        <Link href={externalLinks.app} className="hidden md:inline-block">
                            <Button className="bg-gradient-to-r from-[#19303E] to-[#1D5969] text-white h-9 px-4">
                                {t("startNow")} <ArrowUpRight />
                            </Button>
                        </Link>

                        {/* Hamburguesa — solo móvil */}
                        <Button
                            variant="outline"
                            size="icon"
                            className="md:hidden"
                            aria-label="Abrir menú"
                            onClick={() => setMobileOpen((v) => !v)}
                        >
                            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                        </Button>
                    </div>
                </div>
            </header>

            {/* ── Menú móvil ── */}
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
                <nav className="flex flex-col px-4 py-4 gap-1">
                    <button
                        onClick={() => scrollToSection("producto", closeMobile)}
                        className={`${linkClass("producto")} w-full justify-start px-3`}
                    >
                        {t("product")}
                    </button>
                    <button
                        onClick={() => scrollToSection("features", closeMobile)}
                        className={`${linkClass("features")} w-full justify-start px-3`}
                    >
                        {t("features")}
                    </button>
                    <button
                        onClick={() => scrollToSection("precios", closeMobile)}
                        className={`${linkClass("precios")} w-full justify-start px-3`}
                    >
                        {t("pricing")}
                    </button>

                    {/* Recursos acordeón móvil */}
                    <div>
                        <button
                            onClick={() => setResourcesOpen((v) => !v)}
                            className={`${navLinkDefault} w-full justify-between px-3`}
                        >
                            Recursos
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
                                    <span className="font-medium text-foreground">Documentación</span>
                                    <span>Conoce todas las funcionalidades</span>
                                </Link>
                                <Link
                                    href={externalLinks.centroAyuda}
                                    onClick={closeMobile}
                                    className="flex flex-col py-2 text-sm hover:text-foreground text-muted-foreground"
                                >
                                    <span className="font-medium text-foreground">Centro de ayuda</span>
                                    <span>Resuelve dudas y encuentra guías rápidas</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* CTA móvil */}
                    <div className="mt-3 pt-3 border-t border-border/60">
                        <Link href={externalLinks.app} className="block" onClick={closeMobile}>
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