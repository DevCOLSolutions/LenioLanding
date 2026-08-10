export type FeatureId =
  | "planning"
  | "classes"
  | "activities"
  | "assessment"
  | "grading"
  | "documents"
  | "ai"
  | "agents"

export type FeatureLayout =
  | "editorial"
  | "split"
  | "steps"
  | "ui"
  | "stat"
  | "visual"
  | "spotlight"
  | "quote"

export type FeatureTheme = "light" | "dark"

export interface FeatureConfig {
  id: FeatureId
  layout: FeatureLayout
  theme?: FeatureTheme
  image: string
  altKey: string
  /** Par position (0 | 1). Verdadero = segunda feature de la pantalla */
  pair?: boolean
}

export const UNSPLASH = "https://images.unsplash.com"

/**
 * Las 8 funcionalidades de Lenio, definidas como datos.
 * `layout` decide la variante visual (FeatureLayout.tsx),
 * `theme` cambia la ambientación (algunas solo en modo oscuro).
 * El contenido (títulos, descripciones, pasos, agentes…) vive en
 * el namespace i18n "funcionalidades" de messages/{es,en}.json.
 */
export const FEATURES: FeatureConfig[] = [
  {
    id: "planning",
    layout: "editorial",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    altKey: "planning",
  },
  {
    id: "classes",
    layout: "split",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    altKey: "classes",
  },
  {
    id: "activities",
    layout: "steps",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80",
    altKey: "activities",
  },
  {
    id: "assessment",
    layout: "ui",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    altKey: "assessment",
  },
  {
    id: "grading",
    layout: "stat",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80",
    altKey: "grading",
  },
  {
    id: "documents",
    layout: "visual",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    altKey: "documents",
  },
  {
    id: "ai",
    layout: "spotlight",
    theme: "dark",
    image:
      "https://images.unsplash.com/photo-1677442136019-a21765ecb0de?auto=format&fit=crop&w=1200&q=80",
    altKey: "ai",
  },
  {
    id: "agents",
    layout: "quote",
    theme: "dark",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    altKey: "agents",
  },
]

/** Agrupa features en pares para mostrarlas de a dos por pantalla. */
export const FEATURE_PAIRS: FeatureConfig[][] = FEATURES.reduce<
  FeatureConfig[][]
>((acc, feature, index) => {
  const pairIndex = Math.floor(index / 2)
  if (!acc[pairIndex]) acc[pairIndex] = []
  acc[pairIndex].push({ ...feature, pair: index % 2 === 1 })
  return acc
}, [])