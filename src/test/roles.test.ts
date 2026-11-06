import { describe, expect, it } from "vitest";
import { content, LANGS } from "@/i18n/translations";
import { profile } from "@/data/portfolio";

describe("typed hero roles", () => {
  it("gives every language three roles to type", () => {
    for (const l of LANGS) {
      expect(content[l].roles).toHaveLength(3);
      for (const r of content[l].roles) expect(r.trim().length).toBeGreaterThan(0);
    }
  });

  it("keeps the roles localised, not copied from English", () => {
    expect(content.uz.roles).not.toEqual(content.en.roles);
    expect(content.ru.roles).not.toEqual(content.en.roles);
    expect(content.en.roles[0]).toBe("Frontend Developer");
  });

  it("still spells the greeting with the real name when the role is typed separately", () => {
    for (const l of LANGS) {
      const line = content[l].greeting(profile.name, "");
      expect(line).toContain(profile.name);
      expect(line.trim().endsWith("—")).toBe(true);
    }
  });
});
