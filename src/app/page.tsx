import AnimatedSplitImages from '@/components/AnimatedSplitImages';
import CarbonFootprintBanner from '@/components/CarbonFootprintBanner';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <AnimatedSplitImages />
      <CarbonFootprintBanner />
      <Footer />
    </main>
  );
} 