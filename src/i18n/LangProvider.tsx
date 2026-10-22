import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { content, LANGS, type Content, type Lang } from "./translations";

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Content }>({
  lang: "en",
  setLang: () => {},
  t: content.en,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && LANGS.includes(saved)) setLangState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };
  return <Ctx.Provider value={{ lang, setLang, t: content[lang] }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
