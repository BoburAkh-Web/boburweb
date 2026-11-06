// All visitor-facing text in English, Uzbek and Russian. English content lives in @/data/portfolio.
import { about, career, education, faq, profile, projects } from "@/data/portfolio";

export type Lang = "en" | "uz" | "ru";
export const LANGS: Lang[] = ["en", "uz", "ru"];
export const LANG_NAMES: Record<Lang, string> = { en: "English", uz: "Uzbek (O'zbek)", ru: "Russian (Русский)" };

type Item = { title: string; detail: string };
type Period = Item & { period: string };

export type Content = {
  role: string;
  roles: string[];
  location: string;
  tagline: string;
  heroExperience: string;
  greeting: (name: string, role: string) => string;
  openToWork: string;
  nav: { about: string; projects: string; skills: string; resume: string; contact: string };
  viewProjects: string;
  contact: string;
  aboutEyebrow: string;
  aboutTitle: string;
  workEyebrow: string;
  workTitle: string;
  stackEyebrow: string;
  stackTitle: string;
  resumeEyebrow: string;
  resumeTitle: string;
  workHistory: string;
  education: string;
  skills: string;
  askAssistant: string;
  discussProject: string;
  hireQuestion: string;
  contactEyebrow: string;
  contactTitle: string;
  formName: string;
  formMessage: string;
  formSend: string;
  formHello: (n: string) => string;
  formOpening: string;
  live: string;
  screenshot: string;
  footer: (name: string, loc: string) => string;
  about: Item[];
  career: Period[];
  educationList: Period[];
  projectDescriptions: string[];
  faq: { q: string; a: string }[];
  stats: { experience: string; projects: string; languages: string };
  chat: {
    open: string;
    close: string;
    title: (n: string) => string;
    subtitle: string;
    intro: string;
    askMore: string;
    placeholder: string;
    send: string;
    stop: string;
    errBusy: string;
    errCredits: string;
    errGeneric: string;
  };
};

const en: Content = {
  role: profile.role,
  roles: ["Frontend Developer", "React Developer", "Next.js Developer"],
  location: profile.location,
  tagline: profile.tagline,
  heroExperience: profile.experience,
  greeting: (n, r) => `Hi, I'm ${n} — ${r}`,
  openToWork: "Open to work",
  nav: { about: "About", projects: "Projects", skills: "Skills", resume: "Resume", contact: "Contact" },
  viewProjects: "View Projects",
  contact: "Contact",
  aboutEyebrow: "01 — About",
  aboutTitle: "A little about me",
  workEyebrow: "02 — Work",
  workTitle: "Selected projects",
  stackEyebrow: "03 — Stack",
  stackTitle: "Tools I work with",
  resumeEyebrow: "04 — Resume",
  resumeTitle: "Work, education & skills",
  workHistory: "Work history",
  education: "Education",
  skills: "Skills",
  askAssistant: "Ask the assistant",
  discussProject: "Discuss a project",
  hireQuestion: "How can I hire him for a project?",
  contactEyebrow: "05 — Contact",
  contactTitle: "Let's build something",
  formName: "Your name",
  formMessage: "Tell me about your project",
  formSend: "Send message",
  formHello: (n) => `Hello from ${n}`,
  formOpening: "Opening your email app…",
  live: "Live",
  screenshot: "screenshot",
  footer: (n, l) => `© ${new Date().getFullYear()} ${n} · Built with React & care in ${l}`,
  about,
  career,
  educationList: education,
  projectDescriptions: projects.map((p) => p.description),
  faq,
  stats: {
    experience: "years of experience",
    projects: "projects shipped",
    languages: "languages spoken",
  },
  chat: {
    open: "Ask about my work",
    close: "Close",
    title: (n) => `Ask ${n}'s assistant`,
    subtitle: "Answers from this portfolio",
    intro: "Common questions — tap one for an instant answer.",
    askMore: "Ask the assistant for more →",
    placeholder: "Ask a question…",
    send: "Send",
    stop: "Stop",
    errBusy: "Too many questions right now — try again in a moment.",
    errCredits: "The assistant is out of credits for now.",
    errGeneric: "Couldn't reach the assistant. Please try again.",
  },
};

const uz: Content = {
  role: "Frontend dasturchi",
  roles: ["Frontend dasturchi", "React dasturchi", "Next.js dasturchi"],
  location: "Toshkent, O'zbekiston",
  tagline:
    "2+ yillik tajribaga ega frontend dasturchi — JavaScript, React, Next.js va TypeScript yordamida tez va animatsiyali veb-mahsulotlar yarataman.",
  heroExperience: "2+ yillik tajriba",
  greeting: (n, r) => `Salom, men ${n} — ${r}`,
  openToWork: "Ishga ochiqman",
  nav: { about: "Men haqimda", projects: "Loyihalar", skills: "Ko'nikmalar", resume: "Rezyume", contact: "Aloqa" },
  viewProjects: "Loyihalarni ko'rish",
  contact: "Aloqa",
  aboutEyebrow: "01 — Men haqimda",
  aboutTitle: "Qisqacha o'zim haqimda",
  workEyebrow: "02 — Ishlar",
  workTitle: "Tanlangan loyihalar",
  stackEyebrow: "03 — Texnologiyalar",
  stackTitle: "Men ishlatadigan vositalar",
  resumeEyebrow: "04 — Rezyume",
  resumeTitle: "Ish, ta'lim va ko'nikmalar",
  workHistory: "Ish tajribasi",
  education: "Ta'lim",
  skills: "Ko'nikmalar",
  askAssistant: "Yordamchidan so'rash",
  discussProject: "Loyihani muhokama qilish",
  hireQuestion: "Uni loyiha uchun qanday yollash mumkin?",
  contactEyebrow: "05 — Aloqa",
  contactTitle: "Keling, birga yarataylik",
  formName: "Ismingiz",
  formMessage: "Loyihangiz haqida yozing",
  formSend: "Xabar yuborish",
  formHello: (n) => `${n} dan salom`,
  formOpening: "Pochta ilovangiz ochilmoqda…",
  live: "Sayt",
  screenshot: "skrinshoti",
  footer: (n, l) => `© ${new Date().getFullYear()} ${n} · ${l}da React va mehr bilan yaratilgan`,
  about: [
    { title: "Frontend dasturchi", detail: "Gross Insurance — Nuxt 3, Vue 3, TypeScript" },
    { title: "Kompyuter injiniringi talabasi", detail: "Farg'ona davlat texnika universiteti" },
    { title: "Frontend dasturchi va bolalar uchun IT mentor", detail: "Newton IT Academy" },
    { title: "Frilanser", detail: "Mijozlar uchun veb-mahsulotlar yarataman" },
  ],
  career: [
    {
      period: "Hozir",
      title: "Frontend dasturchi — Gross Insurance",
      detail: "Sug'urta kompaniyasi uchun Nuxt 3, Vue 3 va TypeScript yordamida veb-mahsulotlar yaratadi va qo'llab-quvvatlaydi. Sayt: https://gross.uz.",
    },
    {
      period: "Hozir",
      title: "Frilans veb-dasturchi",
      detail: "Mijozlar bilan to'g'ridan-to'g'ri ishlaydi — landing sahifalar, to'liq platformalar va Chrome kengaytmalarini boshidan oxirigacha yaratadi.",
    },
    {
      period: "Hozir",
      title: "Frontend dasturchi va bolalar uchun IT mentor — Newton IT Academy",
      detail: "Akademiya uchun frontend interfeyslar yaratadi va bolalarga dasturlash asoslarini o'rgatadi, jumladan EasyCoddy kabi jonli ko'p o'yinchili kodlash mashg'ulotlari orqali.",
    },
  ],
  educationList: [
    {
      period: "Hozir",
      title: "Kompyuter injiniringi talabasi — Farg'ona davlat texnika universiteti",
      detail: "To'liq kunlik dasturlash ishi bilan birga kompyuter injiniringini o'qiydi.",
    },
  ],
  projectDescriptions: [
    "Admin, oshpaz, kuryer va mijoz panellari, onlayn buyurtma va analitika paneli bo'lgan ko'p tilli restoran platformasi.",
    "Stomatologik CBCT apparati qismlari uchun xarajat optimizatori: dinamik dasturlash yordamida qismlarni almashtirishning eng arzon rejasini topadi, o'zbek va rus tillarida.",
    "Geolokatsiya manzili, qo'shimchalar savati, tezkor yetkazish va jonli buyurtma kuzatuvi bilan pizza buyurtma veb-ilovasi.",
    "Interaktiv yuk tashish narxi kalkulyatori bilan logistika landing sahifasi qayta dizayni.",
    "Jonli dispetcher holati, tezkor xizmatlar va narx so'rovlari bilan logistika kompaniyasi sayti.",
    "Bolalar uchun jonli ko'p o'yinchili o'yin xonalari bo'lgan ta'lim platformasi.",
    "Nuxt 3 va Vue 3 da yaratilgan korporativ sug'urta sayti.",
    "Sun'iy intellektga asoslangan veb-ilova.",
    "Interaktiv onlayn viktorina ilovasi.",
  ],
  faq: [
    {
      q: "Uning ish tajribasi qanday?",
      a: "U 2+ yildan beri frontend dasturchi bo'lib ishlaydi va hozir Gross Insurance kompaniyasida frontend dasturchi sifatida Nuxt 3, Vue 3 va TypeScript bilan veb-mahsulotlar yaratadi. Shuningdek, frilans loyihalarni bajaradi, Newton IT Academy'da frontend dasturchi bo'lib ishlaydi va bolalarga IT bo'yicha mentorlik qiladi hamda Farg'ona davlat texnika universitetida kompyuter injiniringini o'qiydi.",
    },
    {
      q: "U qanday loyihalar yaratgan?",
      a: "Asosiylari: **Bogizilol** (buyurtma va admin panelli ko'p tilli restoran platformasi), **CBCT Optimizator** (dinamik dasturlash asosidagi stomatologik CBCT xarajatlarini optimallashtirish ilovasi), **Modern Pizza Restaurant** (jonli buyurtma kuzatuvi bilan pizza buyurtma ilovasi), **EZ Trans Group** va **Sapphire Transportation** (logistika saytlari), **Gross Insurance** (korporativ sug'urta sayti), **EasyCoddy** (bolalar uchun jonli kodlash xonalari), **Spartans AI** va **Happy Quiz**. Loyihalar bo'limidagi har bir karta jonli saytga olib boradi.",
    },
    {
      q: "U qaysi texnologiyalar bilan ishlaydi?",
      a: "JavaScript, TypeScript, React, Next.js, Vue 3 / Nuxt 3, Tailwind CSS, shadcn/ui, daisyUI, Material UI va Claude AI, shuningdek Node.js, Express, MongoDB, PostgreSQL va Git — landing sahifalar, veb-platformalar, API va brauzer kengaytmalari uchun.",
    },
    {
      q: "U yangi ishga tayyormi?",
      a: "Ha — u to'liq kunlik frontend lavozimlari va frilans loyihalarga ochiq, masofaviy yoki O'zbekistonda ofisda.",
    },
    {
      q: "Loyiha qancha turadi?",
      a: "Narx har bir loyiha uchun alohida kelishiladi. Email yoki Telegram orqali nima kerakligini qisqacha yozing — u taklif bilan javob beradi.",
    },
    {
      q: "Qanday qilib birga ishlashni boshlaymiz?",
      a: "1. Email yoki Telegram orqali loyiha yoki lavozim haqida qisqacha yozing.\n2. Hajm, muddat va byudjetni kelishish uchun qisqa qo'ng'iroq yoki suhbat.\n3. U muntazam ko'rsatuvlar bilan kichik bosqichlarda ishlaydi.\n4. Ishga tushirish va tuzatishlar hamda yaxshilashlar bo'yicha yordam.",
    },
    {
      q: "U bilan qanday bog'lanish mumkin?",
      a: `Email: ${profile.email} · Telegram: ${profile.telegram} — yoki pastdagi Aloqa bo'limidagi formadan foydalaning.`,
    },
  ],
  stats: {
    experience: "yillik tajriba",
    projects: "loyiha yaratildi",
    languages: "tilda gaplashaman",
  },
  chat: {
    open: "Ishlarim haqida so'rang",
    close: "Yopish",
    title: (n) => `${n}ning yordamchisi`,
    subtitle: "Ushbu portfolio asosida javob beradi",
    intro: "Ko'p so'raladigan savollar — darhol javob uchun bosing.",
    askMore: "Yordamchidan batafsil so'rash →",
    placeholder: "Savol bering…",
    send: "Yuborish",
    stop: "To'xtatish",
    errBusy: "Hozir savollar juda ko'p — birozdan keyin urinib ko'ring.",
    errCredits: "Yordamchining kreditlari hozircha tugagan.",
    errGeneric: "Yordamchiga ulanib bo'lmadi. Qayta urinib ko'ring.",
  },
};

const ru: Content = {
  role: "Frontend-разработчик",
  roles: ["Frontend-разработчик", "React-разработчик", "Next.js-разработчик"],
  location: "Ташкент, Узбекистан",
  tagline:
    "Frontend-разработчик с опытом 2+ года — создаю быстрые анимированные веб-продукты на JavaScript, React, Next.js и TypeScript.",
  heroExperience: "Более 2 лет опыта",
  greeting: (n, r) => `Привет, я ${n} — ${r}`,
  openToWork: "Открыт к работе",
  nav: { about: "Обо мне", projects: "Проекты", skills: "Навыки", resume: "Резюме", contact: "Контакты" },
  viewProjects: "Смотреть проекты",
  contact: "Связаться",
  aboutEyebrow: "01 — Обо мне",
  aboutTitle: "Немного обо мне",
  workEyebrow: "02 — Работы",
  workTitle: "Избранные проекты",
  stackEyebrow: "03 — Стек",
  stackTitle: "Инструменты, с которыми я работаю",
  resumeEyebrow: "04 — Резюме",
  resumeTitle: "Опыт, образование и навыки",
  workHistory: "Опыт работы",
  education: "Образование",
  skills: "Навыки",
  askAssistant: "Спросить ассистента",
  discussProject: "Обсудить проект",
  hireQuestion: "Как нанять его на проект?",
  contactEyebrow: "05 — Контакты",
  contactTitle: "Давайте создадим что-то вместе",
  formName: "Ваше имя",
  formMessage: "Расскажите о вашем проекте",
  formSend: "Отправить сообщение",
  formHello: (n) => `Привет от ${n}`,
  formOpening: "Открываем почтовое приложение…",
  live: "Сайт",
  screenshot: "скриншот",
  footer: (n, l) => `© ${new Date().getFullYear()} ${n} · Сделано на React с любовью, ${l}`,
  about: [
    { title: "Frontend-разработчик", detail: "Gross Insurance — Nuxt 3, Vue 3, TypeScript" },
    { title: "Студент компьютерной инженерии", detail: "Ферганский государственный технический университет" },
    { title: "Frontend-разработчик и IT-ментор для детей", detail: "Newton IT Academy" },
    { title: "Фрилансер", detail: "Создаю веб-продукты для клиентов" },
  ],
  career: [
    {
      period: "Сейчас",
      title: "Frontend-разработчик — Gross Insurance",
      detail: "Разрабатывает и поддерживает веб-продукты страховой компании на Nuxt 3, Vue 3 и TypeScript. Сайт: https://gross.uz.",
    },
    {
      period: "Сейчас",
      title: "Фриланс веб-разработчик",
      detail: "Работает напрямую с клиентами — от идеи до запуска: лендинги, полноценные платформы и расширения для Chrome.",
    },
    {
      period: "Сейчас",
      title: "Frontend-разработчик и IT-ментор для детей — Newton IT Academy",
      detail: "Разрабатывает frontend-интерфейсы для академии и обучает детей основам программирования, в том числе через живые многопользовательские занятия вроде EasyCoddy.",
    },
  ],
  educationList: [
    {
      period: "Сейчас",
      title: "Студент компьютерной инженерии — Ферганский государственный технический университет",
      detail: "Учится компьютерной инженерии параллельно с работой разработчиком.",
    },
  ],
  projectDescriptions: [
    "Многоязычная ресторанная платформа с панелями администратора, повара, курьера и клиента, онлайн-заказами и аналитикой.",
    "Оптимизатор затрат для стоматологического КЛКТ: динамическое программирование подбирает самый дешёвый график замены деталей, интерфейс на узбекском и русском.",
    "Веб-приложение для заказа пиццы: адрес по геолокации, корзина с добавками, срочная доставка и отслеживание заказа.",
    "Редизайн логистического лендинга с интерактивным калькулятором стоимости доставки.",
    "Сайт логистической компании со статусом диспетчеров онлайн, срочными услугами и запросом расчёта.",
    "Образовательная платформа с живыми многопользовательскими игровыми комнатами для детей.",
    "Корпоративный сайт страховой компании на Nuxt 3 и Vue 3.",
    "Веб-приложение на базе искусственного интеллекта.",
    "Интерактивное онлайн-приложение для викторин.",
  ],
  faq: [
    {
      q: "Какой у него опыт работы?",
      a: "Он работает frontend-разработчиком более 2 лет — сейчас frontend-разработчиком в Gross Insurance, где создаёт веб-продукты на Nuxt 3, Vue 3 и TypeScript. Параллельно делает фриланс-проекты под ключ, работает frontend-разработчиком и IT-ментором для детей в Newton IT Academy и учится на компьютерной инженерии в Ферганском государственном техническом университете.",
    },
    {
      q: "Какие проекты он создал?",
      a: "Среди главных: **Bogizilol** (многоязычная ресторанная платформа с заказами и админ-панелями), **CBCT Optimizator** (оптимизатор затрат для стоматологического КЛКТ на динамическом программировании), **Modern Pizza Restaurant** (приложение для заказа пиццы с отслеживанием заказа), **EZ Trans Group** и **Sapphire Transportation** (логистические сайты), **Gross Insurance** (корпоративный страховой сайт), **EasyCoddy** (живые комнаты программирования для детей), **Spartans AI** и **Happy Quiz**. Каждая карточка в разделе «Проекты» ведёт на рабочий сайт.",
    },
    {
      q: "С какими технологиями он работает?",
      a: "JavaScript, TypeScript, React, Next.js, Vue 3 / Nuxt 3, Tailwind CSS, shadcn/ui, daisyUI, Material UI и Claude AI, а также Node.js, Express, MongoDB, PostgreSQL и Git — для лендингов, веб-платформ, API и браузерных расширений.",
    },
    {
      q: "Он свободен для новой работы?",
      a: "Да — он открыт к полной занятости на позиции frontend-разработчика и к фриланс-проектам, удалённо или в офисе в Узбекистане.",
    },
    {
      q: "Сколько стоит проект?",
      a: "Бюджет обсуждается индивидуально для каждого проекта. Кратко опишите задачу по email или в Telegram — он ответит с предложением.",
    },
    {
      q: "Как начать работать вместе?",
      a: "1. Напишите по email или в Telegram с кратким описанием проекта или вакансии.\n2. Короткий созвон или переписка, чтобы согласовать объём, сроки и бюджет.\n3. Работа небольшими итерациями с регулярными превью.\n4. Запуск и поддержка: исправления и улучшения.",
    },
    {
      q: "Как с ним связаться?",
      a: `Email: ${profile.email} · Telegram: ${profile.telegram} — или воспользуйтесь формой в разделе «Контакты» ниже.`,
    },
  ],
  stats: {
    experience: "года опыта",
    projects: "проектов готово",
    languages: "языка",
  },
  chat: {
    open: "Спросить о моих работах",
    close: "Закрыть",
    title: (n) => `Ассистент ${n}`,
    subtitle: "Отвечает по данным портфолио",
    intro: "Частые вопросы — нажмите, чтобы сразу увидеть ответ.",
    askMore: "Спросить ассистента подробнее →",
    placeholder: "Задайте вопрос…",
    send: "Отправить",
    stop: "Остановить",
    errBusy: "Сейчас слишком много вопросов — попробуйте чуть позже.",
    errCredits: "У ассистента временно закончились кредиты.",
    errGeneric: "Не удалось связаться с ассистентом. Попробуйте ещё раз.",
  },
};

export const content: Record<Lang, Content> = { en, uz, ru };
