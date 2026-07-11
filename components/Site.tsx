import type { Lang } from "@/lib/i18n";
import Intro from "./Intro";
import Header from "./Header";
import Hero from "./Hero";
import WhyUs from "./WhyUs";
import Pricing from "./Pricing";
import Fleet from "./Fleet";
import Reviews from "./Reviews";
import Gallery from "./Gallery";
import BookingForm from "./BookingForm";
import Footer from "./Footer";
import FloatingCTA from "./FloatingCTA";
import FloatingLang from "./FloatingLang";
import Popup from "./Popup";

export default function Site({ lang }: { lang: Lang }) {
  return (
    <>
      <Intro />
      <Header lang={lang} />
      <main>
        <Hero lang={lang} />
        <WhyUs lang={lang} />
        <Pricing lang={lang} />
        <Fleet lang={lang} />
        <Reviews lang={lang} />
        <Gallery lang={lang} />
        <BookingForm lang={lang} />
      </main>
      <FloatingCTA lang={lang} />
      <FloatingLang lang={lang} />
      <Popup lang={lang} />
      <Footer lang={lang} />
    </>
  );
}
