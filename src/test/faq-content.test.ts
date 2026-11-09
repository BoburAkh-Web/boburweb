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

  it("quotes the published starting prices and points to the Pricing section", () => {
    const pricing = faq.find((f) => /cost/i.test(f.q));
    expect(pricing?.a).toContain("$150");
    expect(pricing?.a).toContain("$300");
    expect(pricing?.a).toContain("$600");
    expect(pricing?.a).toMatch(/pricing/i);
  });

  it("answers contact questions with the real contact details", () => {
    const contact = faq.find((f) => /contact/i.test(f.q));
    expect(contact?.a).toContain("boburakhone@gmail.com");
    expect(contact?.a).toContain("@boobur_akh");
  });
});
