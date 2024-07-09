import { readFile } from "fs/promises";
import { Sponsorship } from "sponsorkit";
import { defineConfig, tierPresets } from "sponsorkit";

export default defineConfig({
  afdian: {},

  width: 900,
  renderer: "tiers",
  formats: ["json", "svg", "png"],
  outputDir: "./src/sponsorkit",

  tiers: [
    {
      title: "Appreciated Donation",
      monthlyDollars: -1,
      preset: tierPresets.xs,
    },
    {
      title: "Backers",
      preset: tierPresets.base,
    },
    {
      title: "Sponsors",
      monthlyDollars: 10,
      preset: tierPresets.medium,
    },
  ],

  async onSponsorsReady(sponsors) {
    const data = (await import("./src/sponsorkit/additional.json"))
      .default as Sponsorship[];
    const defaultAvatarFile = await readFile(
      "./src/sponsorkit/default-avatar.png"
    );
    const defaultAvatarBase64 = `data:image/png;base64,${defaultAvatarFile.toString(
      "base64"
    )}`;
    data.forEach((s) => {
      if (!s.sponsor.avatarUrl) {
        s.sponsor.avatarUrl = defaultAvatarBase64;
      }
      sponsors.push(s);
    });
    return sponsors;
  },
});
