import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    key: "haldi",
    title: "Haldi Ceremony",
    date: "18th April 2026",
    time: "7:00 AM onwards",
    venue: "Row House No-11, Classic County CHS Ltd, Mira Road - 401105",
    align: "left",
    theme: "haldi",
    image: "/haldi-event.jpg",
    accent:
      "A splash of yellow, a touch of tradition, and a whole lot of laughter.",
    venueLines: [
      "Row House No-11, Classic County",
      "CHS Ltd, Mira Road - 401105",
    ],
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Row+House+No+11+Classic+County+CHS+Ltd+Mira+Road+401105",
  },
  {
    key: "mehendi",
    title: "Mehendi Ceremony",
    date: "18th April 2026",
    time: "2:00 PM onwards",
    venue: "Row House No-11, Classic County CHS Ltd, Mira Road - 401105",
    align: "right",
    theme: "mehendi",
    image: "/mehendi-event.avif",
    accent: "Intricate designs, beautiful traditions, and heartfelt smiles.",
    venueLines: [
      "Row House No-11, Classic County",
      "CHS Ltd, Mira Road - 401105",
    ],
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Row+House+No+11+Classic+County+CHS+Ltd+Mira+Road+401105",
  },
  {
    key: "katha",
    title: "Katha Matkor",
    date: "19th April 2026",
    time: "10:00 AM onwards",
    venue: "Row House No-11, Classic County CHS Ltd, Mira Road - 401105",
    align: "left",
    theme: "katha",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80",
    accent:
      "A moment of blessings, gratitude, and tradition. Let us come together to seek divine blessings for the journey ahead.",
    venueLines: [
      "Row House No-11, Classic County",
      "CHS Ltd, Mira Road - 401105",
    ],
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Row+House+No+11+Classic+County+CHS+Ltd+Mira+Road+401105",
  },
  {
    key: "sangeet",
    title: "Sangeet & Engagement",
    date: "19th April 2026",
    time: "5:00 PM onwards",
    venue: "The Fern Residency, Western Express Highway, Mira Road - 401107",
    align: "right",
    theme: "sangeet",
    image: "/sangeet-engagement.png",
    accent:
      "An evening of music, dance, and celebration. Where rhythms meet emotions, and two souls promise forever.",
    venueLines: [
      "The Fern Residency",
      "Western Express Highway, Mira Road - 401107",
    ],
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=The+Fern+Residency+Western+Express+Highway+Mira+Road+401107",
  },
];

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

const coupleImages = {
  selfie: "/couple-selfie.jpeg",
  portrait: "/couple-portrait.jpeg",
};

function App() {
  const appRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".event-card-shell, .transition-copy", {
        opacity: 0,
      });

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

      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#17070b_0%,#2c0f17_55%,#5c1a22_100%)] px-5 pb-20 pt-28 text-white sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,224,159,0.22),transparent_34%)]" />
        <div className="relative z-10 mx-auto max-w-6xl rounded-[2.5rem] border border-white/10 bg-white/5 px-6 py-12 shadow-[0_0_120px_rgba(214,165,75,0.12)] backdrop-blur-md sm:px-10 sm:py-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="text-center lg:text-left">
              <p className="text-xs uppercase tracking-[0.6em] text-[#f5d991]/70">
                The Wedding Of
              </p>
              <h1 className="mt-6 font-display text-5xl leading-none text-[#fff4d9] sm:text-7xl lg:text-8xl">
                Dipesh
                <span className="mx-3 inline-block text-[#d6a54b] sm:mx-5">
                  &amp;
                </span>
                <span className="whitespace-nowrap">[Her Name]</span>
              </h1>
              <p className="mt-8 text-sm uppercase tracking-[0.45em] text-white/65 sm:text-base">
                request the honour of your presence
              </p>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg lg:mx-0">
                as they begin a new chapter of love, companionship, and forever.
              </p>

              <div className="mt-12 max-w-3xl border-t border-white/10 pt-10">
                <p className="text-xs uppercase tracking-[0.55em] text-[#f5d991]/65">
                  Invitation Message
                </p>
                <p className="mt-6 text-base leading-8 text-white/76 sm:text-lg">
                  Together with their families, we invite you to be a part of
                  the joyous celebrations filled with love, laughter, and
                  blessings.
                </p>
                <p className="mt-4 text-base leading-8 text-white/76 sm:text-lg">
                  Join us as we celebrate the union of hearts and the beginning
                  of forever.
                </p>
              </div>
            </div>

            <div className="relative mx-auto h-[380px] w-full max-w-[460px]">
              <div className="couple-orb--portrait absolute right-0 top-0 h-[290px] w-[290px] overflow-hidden rounded-full border border-white/20 bg-white/10 p-3 shadow-[0_0_80px_rgba(214,165,75,0.18)] backdrop-blur-md">
                <img
                  src={coupleImages.portrait}
                  alt="Bride and groom portrait"
                  className="h-full w-full rounded-full object-cover object-top"
                />
              </div>
              <div className="couple-orb--selfie absolute bottom-0 left-0 h-[210px] w-[210px] overflow-hidden rounded-full border border-[#f5d991]/30 bg-white/10 p-3 shadow-[0_0_70px_rgba(214,165,75,0.16)] backdrop-blur-md">
                <img
                  src={coupleImages.selfie}
                  alt="Bride and groom selfie"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div className="absolute left-[42%] top-[58%] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#f5d991]/30 bg-[#f5d991]/10 backdrop-blur-md" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#f7eddf] px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.55em] text-[#9f6b2f]">
              The Celebrations Begin
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {events.map((event, index) => (
              <a
                key={event.key}
                href={`#${event.key}`}
                className="rounded-[1.6rem] border border-[#a0733f]/10 bg-white/70 px-5 py-5 shadow-[0_16px_50px_rgba(72,44,23,0.08)] transition hover:-translate-y-1"
              >
                <p className="text-[11px] uppercase tracking-[0.4em] text-[#9f6b2f]/70">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 font-display text-3xl text-[#3a2418]">
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
          className={`scene-${event.key} relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br ${themeClasses[event.theme]}`}
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

          <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-10">
            <div
              className={`event-card-shell ${
                event.align === "left" ? "lg:order-1" : "lg:order-2"
              }`}
            >
              <div className="overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 shadow-glow backdrop-blur-xl">
                <div className="relative h-[320px] overflow-hidden sm:h-[420px]">
                  <img
                    src={event.image}
                    alt={`${event.title} celebration`}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.45em] text-white/80">
                      Scene {index + 1}
                    </p>
                    <h2 className="font-display text-5xl text-white sm:text-6xl">
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
              <div className="rounded-[2rem] border border-current/15 bg-white/12 p-6 shadow-[0_20px_80px_rgba(33,19,13,0.12)] backdrop-blur-xl sm:p-8">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.55em] text-current/70">
                  {event.date}
                </p>
                <h3 className="font-display text-5xl leading-none sm:text-7xl">
                  {event.title}
                </h3>
                <p className="mt-6 max-w-lg text-base leading-8 text-current/80 sm:text-lg">
                  {event.accent}
                </p>

                <div className="mt-8 grid gap-4">
                  <div className="rounded-[1.5rem] border border-current/10 bg-black/10 p-5">
                    <p className="text-[11px] uppercase tracking-[0.38em] text-current/60">
                      Date
                    </p>
                    <p className="mt-2 text-xl font-semibold">{event.date}</p>
                  </div>

                  <div className="rounded-[1.5rem] border border-current/10 bg-black/10 p-5">
                    <p className="text-[11px] uppercase tracking-[0.38em] text-current/60">
                      Time
                    </p>
                    <p className="mt-2 text-xl font-semibold">{event.time}</p>
                  </div>

                  <div className="rounded-[1.5rem] border border-current/10 bg-black/10 p-5">
                    <p className="text-[11px] uppercase tracking-[0.38em] text-current/60">
                      Venue
                    </p>
                    <div className="mt-2 space-y-1">
                      {event.venueLines.map((line) => (
                        <p
                          key={line}
                          className="text-base font-semibold leading-7 text-current/90 sm:text-lg"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={event.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-full border border-current/25 bg-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-current transition hover:-translate-y-1 hover:bg-white/15"
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

      <section className="transition-panel relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#f6ebdc] px-6 py-24 text-center text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(165,18,42,0.22),transparent_32%)]" />
        <div className="transition-copy relative z-10 max-w-3xl">
          <h2 className="mt-5 font-display text-5xl sm:text-7xl">And now...</h2>
          <p className="mt-6 text-base leading-8 text-white/75 sm:text-lg">
            with hearts full of love, and dreams ready to unfold,
          </p>
          <p className="mt-4 text-base leading-8 text-white/75 sm:text-lg">
            we invite you to witness the most awaited moment...
          </p>
        </div>
      </section>

      <section className="wedding-section relative overflow-hidden bg-[#090204] px-5 py-24 text-white sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,213,120,0.18),transparent_28%),linear-gradient(180deg,#180106_0%,#6a1020_46%,#130205_100%)]" />
        <div className="wedding-shell relative z-10 mx-auto max-w-7xl rounded-[2.5rem] border border-[#f0d598]/20 bg-white/5 p-8 shadow-[0_0_120px_rgba(214,165,75,0.15)] backdrop-blur-md sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="wedding-copy">
              <p className="text-xs uppercase tracking-[0.6em] text-[#f6d999]/75">
                The Wedding
              </p>
              <h2 className="mt-6 font-display text-6xl leading-none text-[#fff4d9] sm:text-8xl">
                Two hearts,
                <br />
                one promise
              </h2>
              <div className="name-shimmer mt-6 inline-block bg-[linear-gradient(110deg,rgba(255,255,255,0.2)_20%,rgba(255,233,167,0.95)_50%,rgba(255,255,255,0.2)_80%)] bg-[length:200%_100%] bg-clip-text font-display text-4xl text-transparent sm:text-6xl">
                a lifetime of togetherness
              </div>
              <p className="mt-8 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
                Join us as Dipesh ties the knot and begins a beautiful forever.
              </p>
            </div>

            <div className="wedding-copy rounded-[2rem] border border-[#f3d790]/20 bg-black/20 p-6 shadow-glow">
              <div className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#f6d999]/65">
                    Date
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-[#fff4d9]">
                    20th April 2026
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#f6d999]/65">
                    Time
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-[#fff4d9]">
                    11:00 AM onwards
                  </p>
                  <p className="mt-1 text-sm text-white/65">(Baraat &amp; Shaadi)</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#f6d999]/65">
                    Venue
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-[#fff4d9]">
                    GCC Club
                  </p>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    Off Mira Bhayandar Road, 92/1
                    <br />
                    GCC Club Road - 401107
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#f6d999]/65">
                    Banquet
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#fff4d9]">
                    Sapphire Banquet
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#f6d999]/65">
                    Function Hall
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#fff4d9]">
                    Hazel Hall - 3rd Floor
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-[#f6d999]/65">
                    Buffet
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#fff4d9]">
                    Senate Hall - 2nd Floor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-[#130306] px-5 py-24 text-white sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.55em] text-[#f6d999]/70">
              Final Destination
            </p>
            <h2 className="mt-4 font-display text-5xl text-[#fff3d4] sm:text-6xl">
              Map to the Venue
            </h2>
            <p className="mt-5 text-base leading-8 text-white/72">
              Follow the map below to reach GCC Club for the wedding ceremony.
            </p>
          </div>

          <div className="map-shell relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 shadow-[0_0_100px_rgba(214,165,75,0.12)]">
            <iframe
              title="GCC Club Mira Road Map"
              src="https://www.google.com/maps?q=GCC+Club+Mira+Road&output=embed"
              className="h-[420px] w-full border-0 sm:h-[520px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="map-marker pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full text-5xl">
              📍
            </div>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=GCC+Club+Mira+Road"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-full border border-[#f0d598]/30 bg-[#d6a54b]/15 px-6 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#fff3d4] transition hover:-translate-y-1 hover:bg-[#d6a54b]/25"
          >
            Open in Google Maps
          </a>
        </div>
      </section>

      <section className="ending-section relative overflow-hidden bg-gradient-to-b from-[#130306] to-[#070203] px-5 py-24 text-center text-white sm:px-8">
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
          <p className="text-xs uppercase tracking-[0.6em] text-[#f6d999]/65">
            With Love
          </p>
          <h2 className="mt-5 font-display text-5xl text-[#fff4d9] sm:text-7xl">
            Your presence will make this occasion even more special
          </h2>
          <p className="mt-6 text-base leading-8 text-white/72 sm:text-lg">
            We look forward to celebrating this beautiful day with you.
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
