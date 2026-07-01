import React from "react";
import Header from "./[_components]/header";
import DistroGrid from "./[_components]/distroGrid";

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
              - pre-installed apps, background services,{" "}
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
              seamlessly on Linux - often with{" "}
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
          <DistroGrid />
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
              <strong className="text-ink">balenaEtcher</strong>. Boot from it -
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
