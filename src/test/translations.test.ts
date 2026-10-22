import { describe, expect, it } from "vitest";
import { content, LANGS } from "@/i18n/translations";
import { projects } from "@/data/portfolio";

describe("translations", () => {
  it("offers English, Uzbek and Russian", () => {
    expect(LANGS).toEqual(["en", "uz", "ru"]);
  });
  it("translates every project, FAQ and career entry in each language", () => {
    for (const l of LANGS) {
      expect(content[l].projectDescriptions).toHaveLength(projects.length);
      expect(content[l].faq).toHaveLength(content.en.faq.length);
      expect(content[l].career).toHaveLength(content.en.career.length);
      expect(content[l].about).toHaveLength(content.en.about.length);
    }
  });
});
