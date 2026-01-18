import Header from '../components/shared/Header';
import Hero from '../components/home/Hero';
import FeaturesSection from '../components/home/FeaturesSection';

export default function Home({ handleScan }: { handleScan: (discPattern: string) => void }) {
  return (
    <div
      className="
        min-h-screen
        flex flex-col justify-center items-center gap-6
        p-8 md:p-12
      bg-stone-900 text-emerald-100"
    >
      <Header />

      <Hero handleScan={handleScan} />

      <FeaturesSection />
    </div>
  );
}
