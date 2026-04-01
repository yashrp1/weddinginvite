import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { couple, coupleImages, events, weddingInfo } from "./inviteData";

gsap.registerPlugin(ScrollTrigger);

const themeClasses = {
  haldi:
    "from-[#fffef7] via-[#ffe38b] to-[#f0bf39] text-[#43250b] before:bg-[radial-gradient(circle_at_top,rgba(255,252,229,0.7),transparent_35%)]",
  mehendi:
    "from-[#edf5e8] via-[#87ac66] to-[#244a2a] text-white before:bg-[radial-gradient(circle_at_top,rgba(249,255,241,0.24),transparent_36%)]",
  katha:
    "from-[#faf5ee] via-[#ead8c4] to-[#cfb498] text-[#2d1b10] before:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.4),transparent_38%)]",
  sangeet:
    "from-[#18091d] via-[#4e155d] to-[#0e1026] text-white before:bg-[radial-gradient(circle_at_top,rgba(222,116,255,0.15),transparent_40%)]",
};

function App() {
  const appRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      gsap.set(".event-card-shell, .transition-copy", {
        opacity: 0,
      });

      mm.add("(max-width: 767px)", () => {
        events.forEach((event) => {
          const section = `.scene-${event.key}`;

          gsap
            .timeline({
              scrollTrigger: {
                trigger: section,
                start: "top 86%",
                end: "bottom 35%",
                toggleActions: "play none none reverse",
              },
            })
            .fromTo(
              `${section} .scene-bg`,
              { opacity: 0.72, scale: 1.04 },
              { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" }
            )
            .fromTo(
              `${section} .event-card-shell`,
              { y: 48, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.75,
                ease: "power3.out",
              },
              "-=0.45"
            )
            .fromTo(
              `${section} .event-copy > *`,
              { y: 22, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.07,
                ease: "power2.out",
              },
              "-=0.3"
            );

          if (event.theme === "mehendi") {
            gsap.fromTo(
              `${section} .leaf`,
              { opacity: 0, y: 20, scale: 0.92 },
              {
                opacity: 0.5,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.08,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 84%",
                },
              }
            );
          }

          if (event.theme === "sangeet") {
            gsap.fromTo(
              `${section} .light-orb`,
              { opacity: 0, scale: 0.55 },
              {
                opacity: 0.45,
                scale: 1,
                duration: 0.9,
                stagger: 0.06,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 82%",
                },
              }
            );
          }
        });

        gsap.to(".couple-orb--selfie", {
          y: -5,
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".couple-orb--portrait", {
          y: -7,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      mm.add("(min-width: 768px)", () => {
        events.forEach((event) => {
          const section = `.scene-${event.key}`;
          const direction = event.align === "left" ? -140 : 140;

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              end: "bottom 30%",
              toggleActions: "play none none reverse",
            },
          });

          timeline
            .fromTo(
              `${section} .scene-bg`,
              { opacity: 0.6, scale: 1.08 },
              { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
            )
            .fromTo(
              `${section} .event-card-shell`,
              { x: direction, opacity: 0, rotate: event.theme === "sangeet" ? 1.8 : 0 },
              {
                x: 0,
                opacity: 1,
                duration: event.theme === "sangeet" ? 1.1 : 0.95,
                ease: event.theme === "sangeet" ? "back.out(1.2)" : "power3.out",
              },
              "-=0.9"
            )
            .fromTo(
              `${section} .event-copy > *`,
              {
                y: event.theme === "katha" ? 28 : 42,
                opacity: 0,
                scale: event.theme === "katha" ? 0.96 : 1,
              },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: event.theme === "haldi" ? 0.9 : 0.8,
                stagger: 0.1,
                ease:
                  event.theme === "haldi"
                    ? "back.out(1.35)"
                    : event.theme === "katha"
                      ? "power2.out"
                      : "power3.out",
              },
              "-=0.65"
            );

          if (event.theme === "mehendi") {
            gsap.fromTo(
              `${section} .leaf`,
              { opacity: 0, y: 30, rotate: -8 },
              {
                opacity: 0.9,
                y: 0,
                rotate: 0,
                duration: 1,
                stagger: 0.12,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 72%",
                },
              }
            );

            gsap.to(`${section} .scene-bg`, {
              yPercent: -12,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          }

          if (event.theme === "sangeet") {
            gsap.fromTo(
              `${section} .light-orb`,
              { opacity: 0, scale: 0.4 },
              {
                opacity: 0.9,
                scale: 1,
                duration: 1.2,
                stagger: 0.08,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section,
                  start: "top 70%",
                },
              }
            );

            gsap.to(`${section} .event-card-shell`, {
              y: "-=8",
              repeat: -1,
              yoyo: true,
              duration: 1.8,
              ease: "sine.inOut",
            });
          }
        });

        gsap.to(".couple-orb--selfie", {
          y: -10,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".couple-orb--portrait", {
          y: -14,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.3,
        });
      });

      gsap.fromTo(
        ".transition-panel",
        { backgroundColor: "#f6ebdc" },
        {
          backgroundColor: "#050505",
          duration: 1.4,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".transition-panel",
            start: "top 60%",
            end: "bottom 40%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        ".transition-copy",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".transition-panel",
            start: "top 70%",
          },
        }
      );

      const weddingTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".wedding-section",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      weddingTl
        .fromTo(
          ".wedding-shell",
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" }
        )
        .fromTo(
          ".wedding-copy > *",
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=1.1"
        )
        .fromTo(
          ".name-shimmer",
          { backgroundPositionX: "-200%" },
          {
            backgroundPositionX: "220%",
            duration: 2.6,
            repeat: -1,
            ease: "none",
          },
          "-=1"
        );

      gsap.fromTo(
        ".map-shell",
        { opacity: 0, scale: 0.95, filter: "blur(18px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".map-shell",
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".map-marker",
        { y: -90, opacity: 0, scale: 0.6 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: ".map-shell",
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".confetti-piece",
        {
          y: -120,
          opacity: 0,
          rotate: () => gsap.utils.random(-60, 60),
          x: () => gsap.utils.random(-20, 20),
        },
        {
          y: 520,
          opacity: 1,
          rotate: () => gsap.utils.random(220, 520),
          x: () => gsap.utils.random(-180, 180),
          duration: () => gsap.utils.random(2.8, 4.2),
          stagger: 0.06,
          repeat: -1,
          repeatDelay: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: ".ending-section",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".ending-copy > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ending-section",
            start: "top 78%",
          },
        }
      );
    }, appRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={appRef} className="bg-[#f8eedf] font-body text-ink">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-4 py-4">
        <div className="max-w-fit rounded-full border border-white/30 bg-black/20 px-5 py-2 text-center text-[10px] uppercase tracking-[0.5em] text-white backdrop-blur-md sm:text-xs">
          Wedding Invitation
        </div>
      </div>

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#17070b_0%,#2c0f17_55%,#5c1a22_100%)] px-4 pb-14 pt-24 text-white sm:px-8 sm:pb-20 sm:pt-28 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,224,159,0.22),transparent_34%)]" />
        <div className="relative z-10 mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-white/5 px-4 py-8 shadow-[0_0_120px_rgba(214,165,75,0.12)] backdrop-blur-md sm:rounded-[2.5rem] sm:px-10 sm:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
            <div className="text-center lg:text-left">
              <p className="text-xs uppercase tracking-[0.6em] text-[#f5d991]/70">
                The Wedding Of
              </p>
              <h1 className="mt-4 font-display text-[2.7rem] leading-[0.9] text-[#fff4d9] sm:mt-6 sm:text-7xl lg:text-[5.4rem]">
                <span className="block">{couple.groom}</span>
                <span className="my-1 inline-block text-[#d6a54b] lg:my-3">
                  &amp;
                </span>
                <span className="block">{couple.bride}</span>
              </h1>
              <p className="mt-6 text-[11px] uppercase tracking-[0.34em] text-white/65 sm:mt-8 sm:text-base sm:tracking-[0.45em]">
                request the honour of your presence
              </p>
              <p className="mt-5 max-w-2xl text-[0.95rem] leading-7 text-white/78 sm:mt-6 sm:text-lg sm:leading-8 lg:mx-0">
                as they begin a new chapter of love, companionship, and forever.
              </p>

              <div className="mt-8 max-w-3xl border-t border-white/10 pt-7 sm:mt-12 sm:pt-10">
                <p className="text-[11px] uppercase tracking-[0.38em] text-[#f5d991]/65 sm:text-xs sm:tracking-[0.55em]">
                  Invitation Message
                </p>
                <p className="mt-4 text-[0.96rem] leading-7 text-white/76 sm:mt-6 sm:text-lg sm:leading-8">
                  Together with their families, we invite you to be a part of
                  the joyous celebrations filled with love, laughter, and
                  blessings.
                </p>
                <p className="mt-3 text-[0.96rem] leading-7 text-white/76 sm:mt-4 sm:text-lg sm:leading-8">
                  Join us as we celebrate the union of hearts and the beginning
                  of forever.
                </p>
              </div>
            </div>

            <div className="relative order-first mx-auto h-[220px] w-full max-w-[260px] sm:h-[360px] sm:max-w-[360px] lg:order-none">
              <div className="couple-orb--portrait absolute right-0 top-0 h-[150px] w-[150px] overflow-hidden rounded-full border border-white/20 bg-white/10 p-2 shadow-[0_0_80px_rgba(214,165,75,0.18)] backdrop-blur-md sm:right-0 sm:h-[250px] sm:w-[250px] sm:p-3">
                <img
                  src={coupleImages.portrait}
                  alt="Bride and groom portrait"
                  className="h-full w-full rounded-full object-cover object-[center_18%]"
                />
              </div>
              <div className="couple-orb--selfie absolute bottom-0 left-2 h-[110px] w-[110px] overflow-hidden rounded-full border border-[#f5d991]/30 bg-white/10 p-2 shadow-[0_0_70px_rgba(214,165,75,0.16)] backdrop-blur-md sm:left-0 sm:h-[180px] sm:w-[180px] sm:p-3">
                <img
                  src={coupleImages.selfie}
                  alt="Bride and groom selfie"
                  className="h-full w-full rounded-full object-cover object-[center_30%]"
                />
              </div>
              <div className="absolute left-[42%] top-[52%] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f5d991]/30 bg-[#f5d991]/10 backdrop-blur-md sm:top-[56%] sm:h-14 sm:w-14" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#f7eddf] px-4 py-8 sm:px-8 sm:py-10 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5 sm:mb-8">
            <p className="text-[11px] uppercase tracking-[0.36em] text-[#9f6b2f] sm:text-xs sm:tracking-[0.55em]">
              The Celebrations Begin
            </p>
          </div>
          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {events.map((event, index) => (
              <a
                key={event.key}
                href={`#${event.key}`}
                className="min-w-[220px] snap-center rounded-[1.35rem] border border-[#a0733f]/10 bg-white/80 px-4 py-4 shadow-[0_16px_50px_rgba(72,44,23,0.08)] transition hover:-translate-y-1 sm:min-w-0 sm:rounded-[1.6rem] sm:px-5 sm:py-5"
              >
                <p className="text-[11px] uppercase tracking-[0.4em] text-[#9f6b2f]/70">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 font-display text-[2rem] leading-none text-[#3a2418] sm:mt-3 sm:text-3xl">
                  {event.title}
                </h2>
                <p className="mt-2 text-sm text-[#6f5443]">{event.date}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {events.map((event, index) => (
        <section
          id={event.key}
          key={event.key}
          className={`scene-${event.key} relative flex min-h-[100svh] items-center overflow-hidden bg-gradient-to-br ${themeClasses[event.theme]}`}
        >
          <div className="scene-bg absolute inset-0">
            <img
              src={event.image}
              alt={`${event.title} event scene`}
              className="h-full w-full object-cover opacity-20 mix-blend-multiply"
            />
          </div>

          {event.theme === "mehendi" && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {Array.from({ length: 8 }).map((_, leafIndex) => (
                <div
                  key={leafIndex}
                  className="leaf absolute text-4xl opacity-0 sm:text-6xl"
                  style={{
                    left: `${10 + leafIndex * 11}%`,
                    top: `${12 + (leafIndex % 4) * 18}%`,
                  }}
                >
                  ❋
                </div>
              ))}
            </div>
          )}

          {event.theme === "sangeet" && (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {Array.from({ length: 10 }).map((_, orbIndex) => (
                <span
                  key={orbIndex}
                  className="light-orb absolute block rounded-full bg-white/40 blur-xl"
                  style={{
                    width: `${50 + (orbIndex % 4) * 22}px`,
                    height: `${50 + (orbIndex % 4) * 22}px`,
                    left: `${8 + orbIndex * 9}%`,
                    top: `${12 + (orbIndex % 5) * 14}%`,
                  }}
                />
              ))}
            </div>
          )}

          <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-white/20 lg:block" />

          <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 px-4 py-16 sm:gap-10 sm:px-8 sm:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:px-10">
            <div
              className={`event-card-shell ${
                event.align === "left" ? "lg:order-1" : "lg:order-2"
              }`}
            >
              <div className="overflow-hidden rounded-[1.6rem] border border-white/20 bg-white/10 shadow-glow backdrop-blur-xl sm:rounded-[2rem]">
                <div className="relative h-[240px] overflow-hidden sm:h-[420px]">
                  <img
                    src={event.image}
                    alt={`${event.title} celebration`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/80 sm:text-xs sm:tracking-[0.45em]">
                      Scene {index + 1}
                    </p>
                    <h2 className="font-display text-[2.4rem] leading-none text-white sm:text-6xl">
                      {event.title}
                    </h2>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`event-copy max-w-xl ${
                event.align === "left" ? "lg:order-2 lg:pl-12" : "lg:order-1 lg:pr-12"
              }`}
            >
              <div className="rounded-[1.6rem] border border-current/15 bg-white/12 p-4 shadow-[0_20px_80px_rgba(33,19,13,0.12)] backdrop-blur-xl sm:rounded-[2rem] sm:p-8">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-current/70 sm:mb-4 sm:text-xs sm:tracking-[0.55em]">
                  {event.date}
                </p>
                <h3 className="font-display text-[2.3rem] leading-none sm:text-7xl">
                  {event.title}
                </h3>
                <p className="mt-4 max-w-lg text-[0.98rem] leading-7 text-current/80 sm:mt-6 sm:text-lg sm:leading-8">
                  {event.accent}
                </p>

                <div className="mt-6 grid gap-3 sm:mt-8 sm:gap-4">
                  <div className="rounded-[1.15rem] border border-current/10 bg-black/10 p-4 sm:rounded-[1.5rem] sm:p-5">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-current/60 sm:text-[11px] sm:tracking-[0.38em]">
                      Date
                    </p>
                    <p className="mt-2 text-lg font-semibold sm:text-xl">{event.date}</p>
                  </div>

                  <div className="rounded-[1.15rem] border border-current/10 bg-black/10 p-4 sm:rounded-[1.5rem] sm:p-5">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-current/60 sm:text-[11px] sm:tracking-[0.38em]">
                      Time
                    </p>
                    <p className="mt-2 text-lg font-semibold sm:text-xl">{event.time}</p>
                  </div>

                  <div className="rounded-[1.15rem] border border-current/10 bg-black/10 p-4 sm:rounded-[1.5rem] sm:p-5">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-current/60 sm:text-[11px] sm:tracking-[0.38em]">
                      Venue
                    </p>
                    <div className="mt-2 space-y-1">
                      {event.venueLines.map((line) => (
                        <p
                          key={line}
                          className="text-[0.98rem] font-semibold leading-6 text-current/90 sm:text-lg sm:leading-7"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="pt-1 sm:pt-2">
                    <a
                      href={event.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center rounded-full border border-current/25 bg-white/10 px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-current transition hover:-translate-y-1 hover:bg-white/15 sm:w-auto sm:px-5 sm:text-xs sm:tracking-[0.28em]"
                    >
                      View on Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="transition-panel relative flex min-h-[56svh] items-center justify-center overflow-hidden bg-[#f6ebdc] px-4 py-16 text-center text-white sm:min-h-[70vh] sm:px-6 sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(165,18,42,0.22),transparent_32%)]" />
        <div className="transition-copy relative z-10 max-w-3xl">
          <h2 className="mt-3 font-display text-[2.8rem] sm:mt-5 sm:text-7xl">And now...</h2>
          <p className="mt-4 text-[0.98rem] leading-7 text-white/75 sm:mt-6 sm:text-lg sm:leading-8">
            with hearts full of love, and dreams ready to unfold,
          </p>
          <p className="mt-3 text-[0.98rem] leading-7 text-white/75 sm:mt-4 sm:text-lg sm:leading-8">
            we invite you to witness the most awaited moment...
          </p>
        </div>
      </section>

      <section className="wedding-section relative overflow-hidden bg-[#090204] px-4 py-16 text-white sm:px-8 sm:py-24 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,213,120,0.18),transparent_28%),linear-gradient(180deg,#180106_0%,#6a1020_46%,#130205_100%)]" />
        <div className="wedding-shell relative z-10 mx-auto max-w-7xl rounded-[2rem] border border-[#f0d598]/20 bg-white/5 p-5 shadow-[0_0_120px_rgba(214,165,75,0.15)] backdrop-blur-md sm:rounded-[2.5rem] sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="wedding-copy">
              <p className="text-[11px] uppercase tracking-[0.35em] text-[#f6d999]/75 sm:text-xs sm:tracking-[0.6em]">
                The Wedding
              </p>
              <h2 className="mt-4 font-display text-[3rem] leading-none text-[#fff4d9] sm:mt-6 sm:text-8xl">
                Two hearts,
                <br />
                one promise
              </h2>
              <div className="name-shimmer mt-5 inline-block bg-[linear-gradient(110deg,rgba(255,255,255,0.2)_20%,rgba(255,233,167,0.95)_50%,rgba(255,255,255,0.2)_80%)] bg-[length:200%_100%] bg-clip-text font-display text-[2rem] leading-none text-transparent sm:mt-6 sm:text-6xl">
                a lifetime of togetherness
              </div>
              <p className="mt-6 max-w-2xl text-[0.98rem] leading-7 text-white/78 sm:mt-8 sm:text-lg sm:leading-8">
                {weddingInfo.copy}
              </p>
            </div>

            <div className="wedding-copy rounded-[1.6rem] border border-[#f3d790]/20 bg-black/20 p-4 shadow-glow sm:rounded-[2rem] sm:p-6">
              <div className="space-y-4 sm:space-y-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#f6d999]/65 sm:text-xs sm:tracking-[0.35em]">
                    Date
                  </p>
                  <p className="mt-2 text-xl font-semibold text-[#fff4d9] sm:text-2xl">
                    {weddingInfo.date}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#f6d999]/65 sm:text-xs sm:tracking-[0.35em]">
                    Time
                  </p>
                  <p className="mt-2 text-xl font-semibold text-[#fff4d9] sm:text-2xl">
                    {weddingInfo.time}
                  </p>
                  <p className="mt-1 text-sm text-white/65">{weddingInfo.timeNote}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#f6d999]/65 sm:text-xs sm:tracking-[0.35em]">
                    Venue
                  </p>
                  <p className="mt-2 text-xl font-semibold text-[#fff4d9] sm:text-2xl">
                    {weddingInfo.venue}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    {weddingInfo.venueLines[0]}
                    <br />
                    {weddingInfo.venueLines[1]}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#f6d999]/65 sm:text-xs sm:tracking-[0.35em]">
                    Banquet
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#fff4d9]">
                    {weddingInfo.banquet}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#f6d999]/65 sm:text-xs sm:tracking-[0.35em]">
                    Function Hall
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#fff4d9]">
                    {weddingInfo.functionHall}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#f6d999]/65 sm:text-xs sm:tracking-[0.35em]">
                    Buffet
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#fff4d9]">
                    {weddingInfo.buffet}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#130306] px-4 py-16 text-white sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[#f6d999]/70 sm:text-xs sm:tracking-[0.55em]">
              Final Destination
            </p>
            <h2 className="mt-3 font-display text-[2.8rem] text-[#fff3d4] sm:mt-4 sm:text-6xl">
              Map to the Venue
            </h2>
            <p className="mt-4 text-[0.98rem] leading-7 text-white/72 sm:mt-5 sm:text-base sm:leading-8">
              Follow the map below to reach GCC Club for the wedding ceremony.
            </p>
          </div>

          <div className="map-shell relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 shadow-[0_0_100px_rgba(214,165,75,0.12)]">
            <iframe
              title="GCC Club Mira Road Map"
              src={weddingInfo.mapEmbed}
              className="h-[320px] w-full border-0 sm:h-[520px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="map-marker pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full text-5xl">
              📍
            </div>
          </div>

          <a
            href={weddingInfo.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-[#f0d598]/30 bg-[#d6a54b]/15 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#fff3d4] transition hover:-translate-y-1 hover:bg-[#d6a54b]/25 sm:w-auto sm:text-sm sm:tracking-[0.28em]"
          >
            Open in Google Maps
          </a>
        </div>
      </section>

      <section className="ending-section relative overflow-hidden bg-gradient-to-b from-[#130306] to-[#070203] px-4 py-16 text-center text-white sm:px-8 sm:py-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 24 }).map((_, pieceIndex) => (
            <span
              key={pieceIndex}
              className="confetti-piece absolute top-0 block h-4 w-2 rounded-full"
              style={{
                left: `${4 + pieceIndex * 4}%`,
                background:
                  pieceIndex % 3 === 0
                    ? "#f3d27b"
                    : pieceIndex % 3 === 1
                      ? "#f06b7b"
                      : "#ffffff",
              }}
            />
          ))}
        </div>

        <div className="ending-copy relative z-10 mx-auto max-w-3xl">
          <p className="text-[11px] uppercase tracking-[0.34em] text-[#f6d999]/65 sm:text-xs sm:tracking-[0.6em]">
            With Love
          </p>
          <h2 className="mt-4 font-display text-[2.7rem] text-[#fff4d9] sm:mt-5 sm:text-7xl">
            Your presence will make this occasion even more special
          </h2>
          <p className="mt-4 text-[0.98rem] leading-7 text-white/72 sm:mt-6 sm:text-lg sm:leading-8">
            We look forward to celebrating this beautiful day with you.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
