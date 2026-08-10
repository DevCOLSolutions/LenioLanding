import * as motion from "motion/react-client"
import type { Variants } from "motion/react"
import Image from "next/image"

export default function Product() {
    return (
        <div style={container}>
            <Card />
        </div>
    )
}

function Card() {
    return (
        <motion.div
            style={cardContainer}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ amount: 0.3 }}
        >
            <motion.div style={card} variants={cardVariants}>
                <Image
                    src="/lenio_das.png"
                    alt="Dashboard de Lenio"
                    fill
                    className="object-cover object-top rounded-[20px]"
                    priority
                />
            </motion.div>
        </motion.div>
    )
}

const cardVariants: Variants = {
    offscreen: {
        y: 80,
        opacity: 0,
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.3,
            duration: 1,
        },
    },
}

/**
 * ==============   Styles   ================
 */

const container: React.CSSProperties = {
    margin: "40px auto 0",
    maxWidth: 900,
    paddingBottom: 60,
    width: "100%",
    paddingLeft: 16,
    paddingRight: 16,
}

const cardContainer: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const card: React.CSSProperties = {
    position: "relative",
    width: "100%",
    maxWidth: 900,
    aspectRatio: "16 / 9",
    borderRadius: 20,
    overflow: "hidden",
    background: "#f1f5f9",
    boxShadow:
        "0 4px 6px hsl(0deg 0% 0% / 0.05), 0 10px 15px hsl(0deg 0% 0% / 0.08), 0 20px 40px hsl(0deg 0% 0% / 0.12), 0 0 0 1px hsl(0deg 0% 0% / 0.06)",
}
