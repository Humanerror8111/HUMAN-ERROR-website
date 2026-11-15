
"use client";

import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";

import { ScrollVideo } from "./ScrollVideo";
import { LogoSymbol } from "@/components/brand/Logo";

function Overlay({
  progress,
  isStatic,
}: {
  progress: MotionValue<number>;
  isStatic: boolean;
}) {
  // Logo and website name disappear as the intro progresses.
  const titleOpacity = useTransform(
    progress,
    [0, 0.08],
    [1, 0]
  );

  const titleScale = useTransform(
    progress,
    [0, 0.08],
    [1, 1.08]
  );

  const titleBlur = useTransform(
    progress,
    [0, 0.08],
    ["blur(0px)", "blur(10px)"]
  );

  const cueOpacity = useTransform(
    progress,
    [0, 0.04],
    [1, 0]
  );

  const bar = useTransform(
    progress,
    [0, 1],
    [0, 1]
  );

  const letters = "HUMAN ERROR".split("");

  return (
    <>
      {/* LOGO AND WEBSITE NAME */}

      <motion.div
        style={
          isStatic
            ? undefined
            : {
                opacity: titleOpacity,
                scale: titleScale,
                filter: titleBlur,
              }
        }
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center will-change-transform"
      >
        {/* LOGO */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.7,
            filter: "blur(12px)",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <LogoSymbol
            id="hero"
            className="h-16 w-16 sm:h-24 sm:w-24"
          />
        </motion.div>

        {/* WEBSITE NAME */}

        <h1
          className="mt-6 font-display font-black uppercase leading-[0.95] tracking-[0.06em] text-[clamp(2.4rem,11.5vw,9.5rem)]"
          aria-label="HUMAN ERROR"
        >
          <span aria-hidden className="metal inline-block">
            {letters.map((ch, i) => (
              <motion.span
                key={i}
                initial={{
                  opacity: 0,
                  y: 28,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  delay: 0.5 + i * 0.07,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
                style={{
                  width:
                    ch === " "
                      ? "0.35em"
                      : undefined,
                }}
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* SUBTITLE */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.7,
            duration: 1,
          }}
          className="mt-5 font-mono text-[10px] tracking-[0.4em] text-silver/70 sm:text-xs"
        >
          DIGITAL STUDIO · AI · WEB
        </motion.p>
      </motion.div>

      {/* SCROLL INDICATOR */}

      {!isStatic && (
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="font-mono text-[10px] tracking-[0.4em] text-silver"
          >
            SCROLL TO EXPLORE
          </motion.span>

          <span className="drift block h-8 w-px bg-gradient-to-b from-volt to-transparent" />
        </motion.div>
      )}

      {/* PROGRESS BAR */}

      {!isStatic && (
        <motion.div
          aria-hidden
          style={{ scaleX: bar }}
          className="absolute bottom-0 left-0 z-20 h-[2px] w-full origin-left bg-gradient-to-r from-volt to-crimson"
        />
      )}
    </>
  );
}

export function IntroSequence() {
  return (
    <ScrollVideo
      src="/videos/human-error-intro.mp4"
      scrollLength={480}
    >
      {(progress, status) => (
        <Overlay
          progress={progress}
          isStatic={
            status === "static" ||
            status === "error"
          }
        />
      )}
    </ScrollVideo>
  );
}
