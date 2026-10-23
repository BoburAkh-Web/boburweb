import { describe, expect, it } from "vitest";
import { collaboration, heroStack, profile, skills } from "@/data/portfolio";
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
});
