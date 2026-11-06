import { describe, expect, it } from "vitest";
import { content, LANGS } from "@/i18n/translations";
import { projects, yearsExperience } from "@/data/portfolio";

describe("stats band", () => {
  it("counts up 2+ years, every project and all three languages", () => {
    expect(yearsExperience).toBe(2);
    expect(projects).toHaveLength(9);
    expect(LANGS).toHaveLength(3);
  });

  it("labels every number in English, Uzbek and Russian", () => {
    for (const l of LANGS) {
      const s = content[l].stats;
      expect(s.experience.length).toBeGreaterThan(0);
      expect(s.projects.length).toBeGreaterThan(0);
      expect(s.languages.length).toBeGreaterThan(0);
    }
    expect(content.uz.stats.experience).not.toBe(content.en.stats.experience);
    expect(content.ru.stats.experience).not.toBe(content.en.stats.experience);
  });
});
