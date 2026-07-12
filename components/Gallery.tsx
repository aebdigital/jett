import Reveal from "./Reveal";
import GalleryClient from "./GalleryClient";
import { t, type Lang } from "@/lib/i18n";
import { getGalleryImages } from "@/lib/cms";

const SEO_TEXT = {
  sk: {
    heading: "JETTransfer – Spoľahlivá doprava na Schwechat a iné letiská",
    p1: "Naša profesionálna prepravná služba sa špecializuje na letiskové transfery a taxi z Bratislavy na Schwechat. Zabezpečujeme komfortnú, bezpečnú a cenovo prístupnú prepravu na letisko Schwechat, letisko v Bratislave, Budapešti a Prahe.",
    p2: "Vďaka dlhoročnej praxi a individuálnemu prístupu ponúkame nonstop prepravu 24/7, aby ste sa dostali na letisko včas a bez stresu. Naše vozidlá sú pohodlné, pravidelne kontrolované a naši vodiči skúsení a ústretoví.",
    p3: "Objednajte si letiskový transfer jednoducho online alebo telefonicky a cestujte pohodlne a bez starostí!",
  },
  en: {
    heading: "JETTransfer – Reliable transport to Schwechat and other airports",
    p1: "Our professional transport service specialises in airport transfers and taxi rides from Bratislava to Schwechat. We provide comfortable, safe and affordable transport to Schwechat Airport, Bratislava Airport, Budapest and Prague.",
    p2: "Thanks to years of experience and an individual approach, we offer non-stop 24/7 transport so you reach the airport on time and without stress. Our vehicles are comfortable and regularly inspected, and our drivers are experienced and accommodating.",
    p3: "Book your airport transfer easily online or by phone and travel comfortably and worry-free!",
  },
};

export default async function Gallery({ lang = "sk" }: { lang?: Lang }) {
  const d = t(lang);
  const s = SEO_TEXT[lang];
  const photos = await getGalleryImages();
  
  return (
    <section id="galeria" className="bg-ink-2/50 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">{d.gallery.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-5xl">{d.gallery.h2}</h2>
        </Reveal>

        <GalleryClient photos={photos} />

        {/* SEO text carried over from the client's original site */}
        <Reveal>
          <div className="mx-auto mt-16 max-w-3xl text-center">
            <h3 className="text-2xl font-bold text-white sm:text-3xl">{s.heading}</h3>
            <p className="mt-5 leading-relaxed text-neutral-300">{s.p1}</p>
            <p className="mt-4 leading-relaxed text-neutral-300">{s.p2}</p>
            <p className="mt-4 font-medium text-gold-2">{s.p3}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
