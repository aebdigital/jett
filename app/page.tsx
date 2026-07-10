import Intro from "@/components/Intro";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Pricing from "@/components/Pricing";
import Fleet from "@/components/Fleet";
import Reviews from "@/components/Reviews";
import Gallery from "@/components/Gallery";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <>
      <Intro />
      <Header />
      <main>
        <Hero />
        <WhyUs />
        <Pricing />
        <Fleet />
        <Reviews />
        <Gallery />
        <BookingForm />
      </main>
      <FloatingCTA />
      <Footer />
    </>
  );
}
