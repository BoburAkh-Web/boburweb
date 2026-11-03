// "How I can help you" section — plain-language value for non-technical visitors, in EN/UZ/RU.
import type { Lang } from "./translations";

export type Audience = { icon: string; who: string; pain: string; offer: string[] };
export type HelpContent = {
  eyebrow: string;
  title: string;
  intro: string;
  problemLabel: string;
  offerLabel: string;
  audiences: Audience[];
  whyTitle: string;
  why: { title: string; detail: string }[];
  cta: string;
};

const icons = ["Stethoscope", "Briefcase", "Calculator", "UtensilsCrossed", "Truck", "GraduationCap"];

const en: HelpContent = {
  eyebrow: "How I can help you",
  title: "Why you need a website — explained simply",
  intro:
    "You don't need to know anything about code. Tell me what your business does, and I turn it into a clear, fast website or online tool that brings clients and saves your time.",
  problemLabel: "The problem",
  offerLabel: "What I build for you",
  audiences: [
    { icon: icons[0], who: "Doctors & clinics", pain: "Patients call all day to ask for prices and book visits.", offer: ["Clinic website with services and prices", "Online appointment booking", "Doctor profiles that build trust"] },
    { icon: icons[1], who: "Business owners", pain: "Customers can't find you online or don't trust a business without a website.", offer: ["Professional company website", "Request & order forms straight to Telegram", "Admin panel to manage everything yourself"] },
    { icon: icons[2], who: "Accountants & finance", pain: "Repeated calculations and paperwork take hours every week.", offer: ["Online calculators and reports", "Client cabinet to share documents", "Dashboards with clear charts"] },
    { icon: icons[3], who: "Restaurants & cafés", pain: "Orders by phone get lost and delivery is hard to track.", offer: ["Online menu and ordering", "Courier and kitchen panels", "Sales analytics"] },
    { icon: icons[4], who: "Logistics & transport", pain: "Clients wait for quotes and shipment updates.", offer: ["Instant shipping cost calculator", "Quote request forms", "Shipment status pages"] },
    { icon: icons[5], who: "Schools & educators", pain: "Learning feels boring and progress is hard to follow.", offer: ["Interactive learning platforms", "Quizzes and games for students", "Course landing pages"] },
  ],
  whyTitle: "Why work with me",
  why: [
    { title: "Simple language", detail: "No technical jargon — I explain every step." },
    { title: "Works on every phone", detail: "Fast, modern and mobile-friendly by default." },
    { title: "In your language", detail: "Websites in Uzbek, Russian and English." },
    { title: "Support after launch", detail: "I stay with you for fixes and improvements." },
  ],
  cta: "Tell me about your business",
};

const uz: HelpContent = {
  eyebrow: "Sizga qanday yordam beraman",
  title: "Nega sizga sayt kerak — oddiy tilda",
  intro:
    "Dasturlashni bilishingiz shart emas. Biznesingiz haqida aytib bering — men uni mijoz olib keladigan va vaqtingizni tejaydigan tushunarli, tez sayt yoki onlayn vositaga aylantiraman.",
  problemLabel: "Muammo",
  offerLabel: "Siz uchun nima qilaman",
  audiences: [
    { icon: icons[0], who: "Shifokorlar va klinikalar", pain: "Bemorlar kun bo'yi narx so'rash va yozilish uchun qo'ng'iroq qilishadi.", offer: ["Xizmatlar va narxlar bilan klinika sayti", "Onlayn qabulga yozilish", "Ishonch uyg'otadigan shifokor profillari"] },
    { icon: icons[1], who: "Tadbirkorlar", pain: "Mijozlar sizni internetda topa olmaydi yoki saytsiz biznesga ishonmaydi.", offer: ["Professional kompaniya sayti", "Arizalar to'g'ridan-to'g'ri Telegramga", "Hammasini o'zingiz boshqaradigan admin panel"] },
    { icon: icons[2], who: "Buxgalterlar va moliya", pain: "Takroriy hisob-kitob va hujjatlar har hafta soatlab vaqt oladi.", offer: ["Onlayn kalkulyatorlar va hisobotlar", "Hujjat almashish uchun mijoz kabineti", "Tushunarli grafikli dashboardlar"] },
    { icon: icons[3], who: "Restoran va kafelar", pain: "Telefon orqali buyurtmalar yo'qoladi, yetkazib berishni kuzatish qiyin.", offer: ["Onlayn menyu va buyurtma", "Kuryer va oshxona panellari", "Savdo tahlili"] },
    { icon: icons[4], who: "Logistika va transport", pain: "Mijozlar narx va yuk holatini kutib qolishadi.", offer: ["Yetkazish narxini darhol hisoblovchi kalkulyator", "Narx so'rash formalari", "Yuk holati sahifalari"] },
    { icon: icons[5], who: "Maktab va o'qituvchilar", pain: "Dars zerikarli, o'quvchi natijasini kuzatish qiyin.", offer: ["Interaktiv ta'lim platformalari", "O'quvchilar uchun test va o'yinlar", "Kurs sahifalari"] },
  ],
  whyTitle: "Nega men bilan ishlash kerak",
  why: [
    { title: "Oddiy til", detail: "Texnik atamalarsiz — har bir qadamni tushuntiraman." },
    { title: "Har qanday telefonda ishlaydi", detail: "Tez, zamonaviy va mobilga mos." },
    { title: "Sizning tilingizda", detail: "O'zbek, rus va ingliz tillarida saytlar." },
    { title: "Ishga tushgandan keyin yordam", detail: "Tuzatish va yaxshilashlarda yoningizdaman." },
  ],
  cta: "Biznesingiz haqida aytib bering",
};

const ru: HelpContent = {
  eyebrow: "Чем я могу помочь",
  title: "Зачем вам сайт — простыми словами",
  intro:
    "Вам не нужно разбираться в коде. Расскажите, чем занимается ваш бизнес, а я превращу это в понятный, быстрый сайт или онлайн-инструмент, который приводит клиентов и экономит ваше время.",
  problemLabel: "Проблема",
  offerLabel: "Что я сделаю для вас",
  audiences: [
    { icon: icons[0], who: "Врачи и клиники", pain: "Пациенты весь день звонят узнать цены и записаться.", offer: ["Сайт клиники с услугами и ценами", "Онлайн-запись на приём", "Профили врачей, вызывающие доверие"] },
    { icon: icons[1], who: "Предприниматели", pain: "Клиенты не находят вас в интернете или не доверяют бизнесу без сайта.", offer: ["Профессиональный сайт компании", "Заявки и заказы прямо в Telegram", "Админ-панель, чтобы управлять всем самому"] },
    { icon: icons[2], who: "Бухгалтеры и финансы", pain: "Повторяющиеся расчёты и бумаги отнимают часы каждую неделю.", offer: ["Онлайн-калькуляторы и отчёты", "Личный кабинет клиента для документов", "Дашборды с понятными графиками"] },
    { icon: icons[3], who: "Рестораны и кафе", pain: "Заказы по телефону теряются, доставку сложно отслеживать.", offer: ["Онлайн-меню и заказы", "Панели для курьеров и кухни", "Аналитика продаж"] },
    { icon: icons[4], who: "Логистика и перевозки", pain: "Клиенты ждут расчёт стоимости и статус груза.", offer: ["Мгновенный калькулятор доставки", "Формы запроса цены", "Страницы статуса груза"] },
    { icon: icons[5], who: "Школы и преподаватели", pain: "Учёба скучная, прогресс сложно отслеживать.", offer: ["Интерактивные обучающие платформы", "Тесты и игры для учеников", "Страницы курсов"] },
  ],
  whyTitle: "Почему со мной удобно",
  why: [
    { title: "Простой язык", detail: "Без технических терминов — объясняю каждый шаг." },
    { title: "Работает на любом телефоне", detail: "Быстро, современно и удобно на мобильных." },
    { title: "На вашем языке", detail: "Сайты на узбекском, русском и английском." },
    { title: "Поддержка после запуска", detail: "Помогаю с исправлениями и улучшениями." },
  ],
  cta: "Расскажите о вашем бизнесе",
};

export const help: Record<Lang, HelpContent> = { en, uz, ru };
