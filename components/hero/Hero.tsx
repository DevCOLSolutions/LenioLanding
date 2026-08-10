"use client"

import { useTranslations } from "next-intl"
import { BotMessageSquare, Play } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { externalLinks } from "@/lib/externalLinks"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  FolderOpen,
  BookOpen,
  FileText,
  CalendarCheck,
  ClipboardList,
  Users,
  BarChart3,
  type LucideIcon,
} from "lucide-react"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

interface Feature {
  label: string
  icon: LucideIcon
  color: string
}

const features: Feature[] = [
  { label: "Repositorio", icon: FolderOpen, color: "bg-blue-500" },
  { label: "Clases", icon: BookOpen, color: "bg-teal-500" },
  { label: "Formatos", icon: FileText, color: "bg-yellow-500" },
  { label: "Asistencia", icon: CalendarCheck, color: "bg-orange-500" },
  { label: "Tareas", icon: ClipboardList, color: "bg-cyan-500" },
  { label: "Agentes IA", icon: BotMessageSquare, color: "bg-purple-500" },
  { label: "Estudiantes", icon: Users, color: "bg-green-500" },
  { label: "Reportes", icon: BarChart3, color: "bg-indigo-500" },
]

/* ── animation variants ─────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.6 } },
}

const staggerChild = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  const t = useTranslations("hero")

  /* ── scroll-driven parallax for the image ──────────────────────────────── */
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.07])
  const imageOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      id="producto"
      ref={sectionRef}
      className="scroll-mt-20 w-full h-[92vh] overflow-hidden"
    >
      {/* ========================================================================= */}
      {/* 1. MAIN HERO SECTION CONTAINER (TEXT CENTER + CARDS ON FLANKS)            */}
      {/* ========================================================================= */}
      <div className="flex flex-col h-full justify-center items-center gap-8">

        {/* ── headline + subtitle ─────────────────────────────────────────────── */}
        <div className="w-full">
          <div className="relative z-20 text-center">
            <h1

              className="font-heading text-balance max-w-6xl mx-auto text-4xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[#19303E] leading-[1.05]"
            >
              {t("title.part1")}{" "}
              <span
                className="
                  bg-gradient-to-r
                  from-[#19303E]
                  via-[#1D5969]
                  via-60%
                  to-[#FFC83D]
                  bg-clip-text
                  text-transparent
                "
              >
                {t("title.part2")}{" "}
                <span className="underline">{t("title.part3")}</span>
              </span>{" "}
              {t("title.part4")}

            </h1>

            <p
              className="max-w-3xl mx-auto mt-4 text-base sm:text-lg font-normal leading-relaxed text-muted-foreground text-balance"
            >
              {t("subtitle")}
            </p>
          </div>
        </div>

        {/* ── hero image with scroll-parallax ──────────────────────────────────── */}
        <div

          className="will-change-transform"
        >
          <Image
            src="/bg_teachers.svg"
            alt="Dashboard Preview"
            width={1600}
            height={900}
            priority
          />
        </div>

        {/* ── CTA row: avatars + buttons ────────────────────────────────────────── */}
        <div className="mt-5 max-w-6xl mx-auto w-full">
          <div

            className="flex flex-col md:flex-row justify-center gap-10 items-center"
          >
            {/* avatars + counter */}
            <div className="flex gap-2">
              <AvatarGroup className="flex justify-end w-full">
                <Avatar size="lg">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar size="lg">
                  <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </AvatarGroup>
              <div className="flex flex-col justify-center">
                <p className="font-medium text-lg leading-none text-[#19303E]">600+</p>
                <p className="text-sm leading-none">Profesores</p>
              </div>
            </div>

            {/* buttons */}
            <div className="flex gap-4">
              <Link href={externalLinks.app} className="block">
                <Button className="h-10 px-6 bg-gradient-to-r from-[#19303E] to-[#1D5969] text-white">
                  Comienza a usar Lenio
                </Button>
              </Link>
              <Link href={externalLinks.app} className="hidden md:block">
                <Button className="h-10 px-6" variant="outline">
                  <Play /> Ver demostración
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

/* ========================================================================= */
/* COMPONENT HELPERS                                                         */
/* ========================================================================= */
