import React from "react";
import Header from "./[_components]/header";
import Image from "next/image";

const distros = [
  {
    name: "Linux Mint",
    tagline: "Most beginner-friendly",
    href: "https://linuxmint.com",
    logo: <Image src="/mint.svg" alt="Linux Mint" width={36} height={36} />,
    color: "bg-pine",
    textColor: "text-alice",
    best: "Complete beginners switching from Windows",
    desc: "Familiar desktop layout, excellent hardware support, and a focus on stability. The closest thing to Windows without being Windows.",
    badges: {
      difficulty: "Beginner",
      base: "Ubuntu",
      unique: "Cinnamon desktop",
    },
  },
  {
    name: "Pop!_OS",
    tagline: "Best for NVIDIA & gaming laptops",
    href: "https://pop.system76.com",
    logo: <Image src="/popos.svg" alt="Pop!_OS" width={36} height={36} />,
    color: "bg-pine",
    textColor: "text-alice",
    best: "Gamers with NVIDIA GPUs, laptop users, developer–gamers",
    desc: "Ubuntu-based with dedicated NVIDIA ISO, hybrid GPU switching that actually works, and the new Rust-based COSMIC desktop. A general-purpose distro that takes gaming seriously — perfect if you game and work on the same machine.",
    badges: {
      difficulty: "Beginner–Intermediate",
      base: "Ubuntu",
      unique: "NVIDIA ISO",
    },
  },
  {
    name: "Bazzite",
    tagline: "The console-like experience",
    href: "https://bazzite.gg",
    logo: <Image src="/bazzite.svg" alt="Bazzite" width={36} height={36} />,
    color: "bg-pine",
    textColor: "text-alice",
    best: "Anyone who wants Steam Deck–like experience on desktop or handheld",
    desc: "Fedora Atomic (immutable) with Steam pre-installed, HDR/VRR support, and an optional Steam Gaming Mode session. It turns any PC into a console. Perfect for handhelds (ROG Ally, Legion Go), HTPCs, and gamers who want stability over tinkering.",
    badges: {
      difficulty: "Intermediate",
      base: "Fedora Atomic",
      unique: "Immutable",
    },
  },
  {
    name: "Nobara",
    tagline: "Tuned by the Proton maintainer",
    href: "https://nobaraproject.org",
    logo: <Image src="/nobara.svg" alt="Nobara" width={36} height={36} />,
    color: "bg-pine",
    textColor: "text-alice",
    best: "Gamers who want Fedora without immutability, curated tweaks",
    desc: "Fedora-based distro maintained by GloriousEggroll — the lead Proton developer at Valve. Comes with proton patches, Wine fixes, and gaming tools pre-configured. Less locked-down than Bazzite, more gaming-focused than Fedora stock.",
    badges: {
      difficulty: "Intermediate",
      base: "Fedora",
      unique: "Steam staff expertise",
    },
  },
  {
    name: "CachyOS",
    tagline: "Maximum performance, Arch-based",
    href: "https://cachyos.org",
    logo: <Image src="/cachyos.svg" alt="CachyOS" width={36} height={36} />,
    color: "bg-pine",
    textColor: "text-alice",
    best: "Experienced users who want every last frame",
    desc: "Arch Linux rebuilt from source with CPU-optimized binaries (x86-64-v3/v4), LTO, and a custom kernel with scheduler choices (BORE for gaming). Their Proton fork delivers 8–12% lower frame-time variance in CPU-bound titles. Has a Handheld edition for Steam Deck alternatives.",
    badges: { difficulty: "Advanced", base: "Arch", unique: "CPU-optimized" },
  },
  {
    name: "NixOS",
    tagline: "Declarative & indestructible",
    href: "https://nixos.org",
    logo: <Image src="/nixos.svg" alt="NixOS" width={36} height={36} />,
    color: "bg-pine",
    textColor: "text-alice",
    best: "Developers and tinkerers who value reproducibility",
    desc: "The entire OS is defined in a single config file. Atomic updates, instant rollbacks, and nearly impossible to break once set up. A different philosophy — steep learning curve but unmatched reliability once it clicks.",
    badges: {
      difficulty: "Advanced",
      base: "Independent",
      unique: "Declarative config",
    },
  },
];

function DistroCard({
  name,
  tagline,
  logo,
  href,
  color,
  textColor,
  best,
  desc,
  badges,
}: (typeof distros)[number]) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block border-2 border-ink/10 bg-white transition hover:border-celadon hover:-translate-y-0.5 hover:shadow-md"
    >
      <div
        className={`flex items-center gap-3 ${color} ${textColor} px-5 py-3`}
      >
        <span className="flex h-9 w-9 items-center justify-center text-sm font-bold tracking-tight">
          {logo}
        </span>
        <div>
          <h3 className="text-base font-bold leading-tight">{name}</h3>
          <p className="text-xs opacity-80">{tagline}</p>
        </div>
      </div>
      <div className="space-y-3 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted">
          Best for:{" "}
          <span className="font-normal normal-case text-ink">{best}</span>
        </p>
        <p className="text-sm leading-relaxed text-ink/80">{desc}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1 text-[11px]">
          <span>
            <span className="font-semibold text-muted">Difficulty:</span>{" "}
            <span className="text-ink">{badges.difficulty}</span>
          </span>
          <span>
            <span className="font-semibold text-muted">Base:</span>{" "}
            <span className="text-ink">{badges.base}</span>
          </span>
          <span>
            <span className="font-semibold text-muted">Unique:</span>{" "}
            <span className="text-ink">{badges.unique}</span>
          </span>
        </div>
      </div>
    </a>
  );
}

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Header current="why" />

      <div className="mx-auto max-w-3xl py-6">
        <section className="mb-14">
          <h2 className="mb-4 text-2xl font-bold text-ink">
            Why Windows is a problem
          </h2>
          <div className="space-y-3 text-base leading-relaxed text-ink/75">
            <p>
              Windows ships with ever-increasing amounts of{" "}
              <strong className="text-ink">
                <u>bloatware</u>
              </strong>{" "}
              — pre-installed apps, background services,{" "}
              <strong className="text-ink">
                <u>telemetry</u>
              </strong>
              , and ads embedded in the OS itself. A fresh install of Windows 11
              consumes 30–40 GB and runs dozens of background processes you
              never asked for.
            </p>
            <p>
              <strong className="text-ink">
                <u>Forced updates</u>
              </strong>
              ,{" "}
              <strong className="text-ink">
                <u>data collection</u>
              </strong>
              , and degrading performance over time are baked into the
              experience. Microsoft&apos;s strategy has shifted from selling an
              OS to{" "}
              <strong className="text-ink">
                <u>selling you as the product</u>
              </strong>{" "}
              - through OneDrive, ads in the start menu, and telemetry you
              can&apos;t fully disable.
            </p>
            <p>
              On top of that, licensing costs add up. Windows licenses are
              expensive, and the{" "}
              <strong className="text-ink">
                <u>subscription model</u>
              </strong>{" "}
              (Microsoft 365) turns your PC into a recurring bill.
            </p>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="mb-4 text-2xl font-bold text-ink">
            Why Linux is a great alternative
          </h2>
          <div className="space-y-3 text-base leading-relaxed text-ink/75">
            <p>
              Linux is{" "}
              <strong className="text-ink">
                <u>free</u>
              </strong>
              ,{" "}
              <strong className="text-ink">
                <u>open-source</u>
              </strong>
              , and gives you{" "}
              <strong className="text-ink">
                <u>full control</u>
              </strong>{" "}
              over your system. No telemetry, no forced updates, no ads. You
              install only what you need, and your system stays lean and fast.
            </p>
            <p>
              With{" "}
              <strong className="text-ink">
                <u>Steam Proton</u>
              </strong>{" "}
              (built into Steam Play), thousands of Windows games now run
              seamlessly on Linux — often with{" "}
              <strong className="text-ink">
                <u>equal or better performance</u>
              </strong>{" "}
              than on Windows. Anti-cheat support has improved dramatically in
              recent years, and tools like Heroic Games Launcher, Lutris, and
              Bottles cover non-Steam games.
            </p>
            <p>
              Beyond gaming, Linux excels at software development, server
              management, and customization. If you value{" "}
              <strong className="text-ink">
                <u>privacy</u>
              </strong>
              ,{" "}
              <strong className="text-ink">
                <u>performance</u>
              </strong>
              , and ownership of your machine,{" "}
              <strong className="text-ink">
                <u>Linux is the clear choice</u>
              </strong>
              .
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-bold text-ink">
            Which Linux distribution to choose
          </h2>
          <p className="mb-6 text-sm text-muted">
            There&apos;s no single best distro — the right one depends on your
            hardware, your experience level, and what you want to do.
            Here&apos;s a breakdown of the strongest options in 2026.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            {distros.map((distro) => (
              <DistroCard key={distro.name} {...distro} />
            ))}
          </div>
        </section>

        <section className="mt-14 border-2 border-celadon bg-white p-6">
          <h2 className="mb-3 text-xl font-bold text-ink">
            How to get started
          </h2>
          <div className="space-y-3 text-base leading-relaxed text-ink/75">
            <p>
              Create a USB stick with your chosen distro using{" "}
              <strong className="text-ink">Ventoy</strong>,{" "}
              <strong className="text-ink">Rufus</strong> or{" "}
              <strong className="text-ink">balenaEtcher</strong>. Boot from it —
              most distros let you try the live environment without installing
              anything.
            </p>
            <p>
              When you&apos;re ready,{" "}
              <strong className="text-ink">
                <u>install alongside Windows</u>
              </strong>{" "}
              (dual-boot) or wipe and replace entirely. Before you do,{" "}
              <strong className="text-ink">
                <u>use this tool</u>
              </strong>{" "}
              to check if the games you care about run well on Linux. If your
              library miss some games that you don&apos;t care about, you can{" "}
              <strong className="text-ink">
                <u>make the switch with confidence</u>
              </strong>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
