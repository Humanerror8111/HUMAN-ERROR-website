
"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  motion,
  useMotionValue,
  type MotionValue,
} from "framer-motion";

type Status = "loading" | "ready" | "error" | "static";

type Props = {
  src: string;
  scrollLength?: number;
  children?: (
    progress: MotionValue<number>,
    status: Status
  ) => ReactNode;
  className?: string;
};

export function ScrollVideo({
  src,
  children,
  className,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progress = useMotionValue(0);

  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    let disposed = false;
    let started = false;

    const updateProgress = () => {
      if (
        !Number.isFinite(video.duration) ||
        video.duration <= 0
      ) {
        return;
      }

      progress.set(
        Math.min(video.currentTime / video.duration, 1)
      );
    };

    const startVideo = async () => {
      if (started || disposed) return;

      started = true;

      try {
        await video.play();

        if (!disposed) {
          setStatus("ready");
        }
      } catch {
        if (!disposed) {
          setStatus("error");
        }
      }
    };

    const onReady = () => {
      if (disposed) return;

      setStatus("ready");
      startVideo();
    };

    const onError = () => {
      if (!disposed) {
        setStatus("error");
      }
    };

    const onEnded = () => {
      progress.set(1);
    };

    video.addEventListener("canplay", onReady);
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);

    video.muted = true;

    // Start immediately if the video is already ready.
    if (video.readyState >= 3) {
      onReady();
    }

    return () => {
      disposed = true;

      video.pause();

      video.removeEventListener("canplay", onReady);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
    };
  }, [progress, src]);

  const isStatic = status === "static" || status === "error";

  return (
    <div
      data-scroll-video
      className={className}
      style={{
        height: "100svh",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <div className="sticky top-0 h-screen h-[100svh] w-full overflow-hidden bg-void">

        {/* AUTOMATIC INTRO VIDEO */}

        <motion.video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          aria-hidden="true"
          controls={false}
          loop={true}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          disableRemotePlayback
          style={{
            opacity: 1,
            objectFit: "cover",
          }}
          className="absolute inset-0 z-0 h-full w-full"
        />

        {/* INTRO OVERLAY */}

        {children?.(progress, status)}

        {/* LOADING MESSAGE */}

        {status === "loading" && (
          <div
            role="status"
            aria-live="polite"
            className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-silver/60"
          >
            LOADING SEQUENCE…
          </div>
        )}

        {/* ERROR MESSAGE - NO PLAY BUTTON */}

        {isStatic && (
          <div className="absolute bottom-10 left-1/2 z-30 -translate-x-1/2 text-center">
            <p className="font-mono text-[10px] tracking-widest text-silver/60">
              VIDEO COULD NOT PLAY AUTOMATICALLY
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
