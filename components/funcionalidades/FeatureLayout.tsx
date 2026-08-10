import type { ComponentType } from "react"

import type { FeatureLayout as FeatureLayoutName } from "./data"
import { EditorialLayout } from "./layouts/EditorialLayout"
import { QuoteLayout } from "./layouts/QuoteLayout"
import { SplitLayout } from "./layouts/SplitLayout"
import { SpotlightLayout } from "./layouts/SpotlightLayout"
import { StatLayout } from "./layouts/StatLayout"
import { StepsLayout } from "./layouts/StepsLayout"
import { UiShowcaseLayout } from "./layouts/UiShowcaseLayout"
import { VisualLayout } from "./layouts/VisualLayout"
import type { FeatureSceneProps } from "./layouts/types"

const LAYOUTS: Record<
  FeatureLayoutName,
  ComponentType<FeatureSceneProps>
> = {
  editorial: EditorialLayout,
  split: SplitLayout,
  steps: StepsLayout,
  ui: UiShowcaseLayout,
  stat: StatLayout,
  visual: VisualLayout,
  spotlight: SpotlightLayout,
  quote: QuoteLayout,
}

/**
 * Registro de variantes de presentación. Cada feature declara en
 * su configuración qué layout usar; aquí se resuelve.
 */
export function FeatureLayout(props: FeatureSceneProps) {
  const Layout = LAYOUTS[props.feature.layout]
  return <Layout {...props} />
}