import { describe, expect, it } from "vitest";
import { faq } from "@/data/portfolio";

describe("portfolio FAQ", () => {
  it("covers the common questions with substantive answers", () => {
    expect(faq.length).toBeGreaterThanOrEqual(6);
    for (const f of faq) {
      expect(f.q.length).toBeGreaterThan(5);
      expect(f.a.length).toBeGreaterThan(20);
    }
  });

  it("never quotes specific rates or prices", () => {
    for (const f of faq) {
      expect(f.a).not.toMatch(/\$\s?\d|\b\d+\s?(usd|uzs|som)\b/i);
    }
  });

  it("answers contact questions with the real contact details", () => {
    const contact = faq.find((f) => /contact/i.test(f.q));
    expect(contact?.a).toContain("boburakhone@gmail.com");
    expect(contact?.a).toContain("@boobur_akh");
  });
});
