export interface Review { name: string; when: string; when_en: string; text: string; text_en: string; isNew?: boolean }

export const RATING = { value: "5,0", count: 19 };

export const REVIEWS: Review[] = [
  {
    name: "Iveta Nagyova",
    when: "pred 3 mesiacmi",
    when_en: "3 months ago",
    text: "Veľmi milý, príjemný a spoľahlivý pán taxikár. Už dávno nás na Schwechate nikto tak pekne neprivítal a cestou aj sranda bola :)",
    text_en: "A very kind, pleasant and reliable taxi driver. It's been a long time since anyone welcomed us so nicely at Schwechat — and we had fun on the way too :)",
  },
  {
    name: "Pavol Vavrik",
    when: "pred rokom",
    when_en: "a year ago",
    text: "Vždy super cesta, Peter ochotný! milý 🙌 Na jeho služby sa dá splynúť",
    text_en: "Always a great ride, Peter is helpful and kind 🙌 You can rely on his services",
  },
  {
    name: "Laura Krockova",
    when: "pred 10 mesiacmi",
    when_en: "10 months ago",
    text: "Sofer prisiel v predstihu. Vsetko v poriadku. Odporucame. Sofer bol mily a spolahlivy.",
    text_en: "The driver arrived ahead of time. Everything was fine. We recommend him — kind and reliable.",
  },
  {
    name: "Michal Musak",
    when: "pred 2 rokmi",
    when_en: "2 years ago",
    text: "Spoľahlivý a príjemný šofér, ktorého pravidelne využívame najmä na Schwechat.",
    text_en: "A reliable and pleasant driver we use regularly, mainly for Schwechat.",
  },
  {
    name: "Juraj Jombík",
    when: "pred 2 rokmi",
    when_en: "2 years ago",
    text: "Som si to užil, Petržalka–Devínska Nová Ves, konečne super taxi 😉",
    text_en: "I really enjoyed it — Petržalka to Devínska Nová Ves. Finally a great taxi 😉",
  },
  {
    name: "Laura",
    when: "pred 2 rokmi",
    when_en: "2 years ago",
    text: "Skvely vodic, prijemna jazda, cistucke auto. Takto maju sluzby vyzerat. Na jednotku",
    text_en: "Great driver, pleasant ride, spotless car. This is what service should look like. Top marks.",
  },
  {
    name: "Tome Tome",
    when: "pred 2 rokmi",
    when_en: "2 years ago",
    text: "najspolahlivejsi a cenovo dostupny odvoz na Schwechat, vrelo odporucam vsetkym",
    text_en: "The most reliable and affordable ride to Schwechat, I warmly recommend it to everyone",
  },
  {
    name: "Zuzana Radičová",
    when: "pred 2 rokmi",
    when_en: "2 years ago",
    text: "Chcem velmi pekne podakovat za profesionalny pristup, vrelo odporucam kazdemu",
    text_en: "A big thank you for the professional approach — I warmly recommend to everyone",
  },
  {
    name: "Jozef Zielbauer",
    when: "pred 2 rokmi",
    when_en: "2 years ago",
    text: "Ďakujeme s rodinou za komfortnú jazdu… odporucam.",
    text_en: "My family and I thank you for a comfortable ride… I recommend.",
  },
  {
    name: "nino biga",
    when: "pred 3 dňami",
    when_en: "3 days ago",
    isNew: true,
    text: "Ďakujem za urgentnú pomoc, večerné lietadlo meškalo skoro 3 hodiny a všetky busy z viedenského letiska už odišli, poslednou nádejou bola polnočná sms a okamžitá pomoc…",
    text_en: "Thank you for the urgent help — our evening flight was almost 3 hours late and all the buses from Vienna airport had already left. A midnight text was our last hope, and help came immediately…",
  },
];

export const reviewText = (r: Review, lang: "sk" | "en") => (lang === "en" ? r.text_en : r.text);
export const reviewWhen = (r: Review, lang: "sk" | "en") => (lang === "en" ? r.when_en : r.when);
