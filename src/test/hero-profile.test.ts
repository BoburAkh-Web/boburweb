import { describe, expect, it } from "vitest";
import { about, career, collaboration, education, faq, heroStack, profile, skills } from "@/data/portfolio";
import { content, LANGS } from "@/i18n/translations";

describe("hero identity", () => {
  it("shows the owner's real name, not a placeholder", () => {
    expect(profile.name).toBe("Bobur");
    expect(collaboration.compensation).not.toContain("Jigar");
    expect(profile.experience).toContain("2");
  });

  it("lists the languages, frameworks and UI libraries named by the owner", () => {
    for (const tech of ["JavaScript", "React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "daisyUI", "Material UI", "Claude AI"]) {
      expect(heroStack).toContain(tech);
    }
    expect(skills.map((s) => s.name)).toEqual(expect.arrayContaining(heroStack.filter((t) => t !== "JavaScript")));
  });

  it("states the experience level in every language", () => {
    for (const l of LANGS) {
      expect(content[l].heroExperience).toContain("2");
      expect(content[l].tagline).toContain("Next.js");
    }
  });

  it("never labels him Junior in any language", () => {
    const texts = [
      ...about.map((a) => `${a.title} ${a.detail}`),
      ...career.map((c) => `${c.title} ${c.detail}`),
      ...faq.map((f) => `${f.q} ${f.a}`),
      ...LANGS.flatMap((l) => [
        ...content[l].about.map((a) => `${a.title} ${a.detail}`),
        ...content[l].career.map((c) => `${c.title} ${c.detail}`),
        ...content[l].educationList.map((e) => `${e.title} ${e.detail}`),
        ...content[l].faq.map((f) => `${f.q} ${f.a}`),
      ]),
    ].join(" ");
    expect(texts.toLowerCase()).not.toContain("junior");
  });

  it("shows him as Frontend Developer and mentor at Newton IT Academy", () => {
    const newton = about.find((a) => a.detail.includes("Newton"));
    expect(newton?.title).toBe("Frontend Developer & IT mentor for kids");
    expect(newton?.detail).toBe("Newton IT Academy");
    for (const l of LANGS) {
      const card = content[l].about.find((a) => a.detail.includes("Newton"));
      expect(card?.detail).toBe("Newton IT Academy");
      expect(card?.title).toMatch(/mentor/);
      expect(card?.title).toMatch(/frontend/i);
    }
  });

  it("names Fergana State Technology University in every language", () => {
    expect(education[0].title).toContain("Fergana State Technology University");
    expect(about.find((a) => a.detail.includes("Fergana"))?.detail).toBe("Fergana State Technology University");
    expect(content.uz.about.find((a) => a.detail.includes("Farg'ona"))?.detail).toBe(
      "Farg'ona davlat texnika universiteti",
    );
    expect(content.ru.about.find((a) => a.detail.includes("Ферганский"))?.detail).toBe(
      "Ферганский государственный технический университет",
    );
  });
});
