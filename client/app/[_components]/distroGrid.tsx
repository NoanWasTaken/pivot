"use client";
import Image from "next/image";
import { useFadeInOnScroll } from "../[_hooks]/useFadeInOnScroll";
import { useStaggerIn } from "../[_hooks]/useStaggerIn";

const distros = [
  {
    name: "Linux Mint",
    tagline: "Most beginner-friendly",
    href: "https://linuxmint.com",
    logo: <Image src="/mint.svg" alt="Linux Mint" width={36} height={36} />,
    best: "Complete beginners switching from Windows",
    desc: "Familiar desktop layout, excellent hardware support, and a focus on stability. The closest thing to Windows without being Windows.",
    badges: { difficulty: "Beginner", base: "Ubuntu", unique: "Cinnamon desktop" },
  },
  {
    name: "Pop!_OS",
    tagline: "Best for NVIDIA & gaming laptops",
    href: "https://pop.system76.com",
    logo: <Image src="/popos.svg" alt="Pop!_OS" width={36} height={36} />,
    best: "Gamers with NVIDIA GPUs, laptop users, developer-gamers",
    desc: "Ubuntu-based with dedicated NVIDIA ISO, hybrid GPU switching that actually works, and the new Rust-based COSMIC desktop. A general-purpose distro that takes gaming seriously - perfect if you game and work on the same machine.",
    badges: { difficulty: "Beginner-Intermediate", base: "Ubuntu", unique: "NVIDIA ISO" },
  },
  {
    name: "Bazzite",
    tagline: "The console-like experience",
    href: "https://bazzite.gg",
    logo: <Image src="/bazzite.svg" alt="Bazzite" width={36} height={36} />,
    best: "Anyone who wants Steam Deck-like experience on desktop or handheld",
    desc: "Fedora Atomic (immutable) with Steam pre-installed, HDR/VRR support, and an optional Steam Gaming Mode session. It turns any PC into a console. Perfect for handhelds (ROG Ally, Legion Go), HTPCs, and gamers who want stability over tinkering.",
    badges: { difficulty: "Intermediate", base: "Fedora Atomic", unique: "Immutable" },
  },
  {
    name: "Nobara",
    tagline: "Tuned by the Proton maintainer",
    href: "https://nobaraproject.org",
    logo: <Image src="/nobara.svg" alt="Nobara" width={36} height={36} />,
    best: "Gamers who want Fedora without immutability, curated tweaks",
    desc: "Fedora-based distro maintained by GloriousEggroll - the lead Proton developer at Valve. Comes with proton patches, Wine fixes, and gaming tools pre-configured. Less locked-down than Bazzite, more gaming-focused than Fedora stock.",
    badges: { difficulty: "Intermediate", base: "Fedora", unique: "Steam staff expertise" },
  },
  {
    name: "CachyOS",
    tagline: "Maximum performance, Arch-based",
    href: "https://cachyos.org",
    logo: <Image src="/cachyos.svg" alt="CachyOS" width={36} height={36} />,
    best: "Experienced users who want every last frame",
    desc: "Arch Linux rebuilt from source with CPU-optimized binaries (x86-64-v3/v4), LTO, and a custom kernel with scheduler choices (BORE for gaming). Their Proton fork delivers 8-12% lower frame-time variance in CPU-bound titles. Has a Handheld edition for Steam Deck alternatives.",
    badges: { difficulty: "Advanced", base: "Arch", unique: "CPU-optimized" },
  },
  {
    name: "NixOS",
    tagline: "Declarative & indestructible",
    href: "https://nixos.org",
    logo: <Image src="/nixos.svg" alt="NixOS" width={36} height={36} />,
    best: "Developers and tinkerers who value reproducibility",
    desc: "The entire OS is defined in a single config file. Atomic updates, instant rollbacks, and nearly impossible to break once set up. A different philosophy - steep learning curve but unmatched reliability once it clicks.",
    badges: { difficulty: "Advanced", base: "Independent", unique: "Declarative config" },
  },
];

function DistroCard({
  name,
  tagline,
  logo,
  href,
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
      <div className="flex items-center gap-3 bg-pine px-5 py-3 text-alice">
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

export default function DistroGrid() {
  const titleRef = useFadeInOnScroll<HTMLHeadingElement>();
  const gridRef = useStaggerIn<HTMLDivElement>([], { from: 32, delay: 80 });

  return (
    <>
      <h2
        ref={titleRef}
        className="mb-6 text-2xl font-bold text-ink"
      >
        Which Linux distribution to choose
      </h2>
      <p className="mb-6 text-sm text-muted">
        There&apos;s no single best distro - the right one depends on your
        hardware, your experience level, and what you want to do. Here&apos;s a
        breakdown of the strongest options in 2026.
      </p>
      <div ref={gridRef} className="grid gap-5 sm:grid-cols-2">
        {distros.map((distro) => (
          <DistroCard key={distro.name} {...distro} />
        ))}
      </div>
    </>
  );
}
