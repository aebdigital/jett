export interface Review { name: string; when: string; text: string; isNew?: boolean }

export const RATING = { value: "5,0", count: 19 };

export const REVIEWS: Review[] = [
  {
    name: "Iveta Nagyova",
    when: "pred 3 mesiacmi",
    text: "Veľmi milý, príjemný a spoľahlivý pán taxikár. Už dávno nás na Schwechate nikto tak pekne neprivítal a cestou aj sranda bola :)",
  },
  {
    name: "Pavol Vavrik",
    when: "pred rokom",
    text: "Vždy super cesta, Peter ochotný! milý 🙌 Na jeho služby sa dá splynúť",
  },
  {
    name: "Laura Krockova",
    when: "pred 10 mesiacmi",
    text: "Sofer prisiel v predstihu. Vsetko v poriadku. Odporucame. Sofer bol mily a spolahlivy.",
  },
  {
    name: "Michal Musak",
    when: "pred 2 rokmi",
    text: "Spoľahlivý a príjemný šofér, ktorého pravidelne využívame najmä na Schwechat.",
  },
  {
    name: "Juraj Jombík",
    when: "pred 2 rokmi",
    text: "Som si to užil, Petržalka–Devínska Nová Ves, konečne super taxi 😉",
  },
  {
    name: "Laura",
    when: "pred 2 rokmi",
    text: "Skvely vodic, prijemna jazda, cistucke auto. Takto maju sluzby vyzerat. Na jednotku",
  },
  {
    name: "Tome Tome",
    when: "pred 2 rokmi",
    text: "najspolahlivejsi a cenovo dostupny odvoz na Schwechat, vrelo odporucam vsetkym",
  },
  {
    name: "Zuzana Radičová",
    when: "pred 2 rokmi",
    text: "Chcem velmi pekne podakovat za profesionalny pristup, vrelo odporucam kazdemu",
  },
  {
    name: "Jozef Zielbauer",
    when: "pred 2 rokmi",
    text: "Ďakujeme s rodinou za komfortnú jazdu… odporucam.",
  },
  {
    name: "nino biga",
    when: "pred 3 dňami",
    isNew: true,
    text: "Ďakujem za urgentnú pomoc, večerné lietadlo meškalo skoro 3 hodiny a všetky busy z viedenského letiska už odišli, poslednou nádejou bola polnočná sms a okamžitá pomoc…",
  },
];
