import ImageScrollStack from '@/components/ImageScrollStack';
import Footer from '../components/Footer';
import Header from '../components/Header';

const images: string[] = [
  'https://github.com/mani3121/puviyan_website/blob/main/src/assets/img/puviyan000.png?raw=true',
    'https://github.com/mani3121/puviyan_website/blob/main/src/assets/img/puviyan118.png?raw=true'
];
const Index = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      <main className="flex-grow w-full">
        {/* First section with ImageScrollStack */}
        <section className="h-[calc(100vh-72px)] w-full relative overflow-hidden">
          <div className="w-full h-full">
            <ImageScrollStack images={images} />
          </div>
        </section>

        {/* Next section that appears after scroll */}
        <section className="min-h-screen w-full bg-white">
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-4xl font-bold mb-8">Next Section</h2>
            <p className="text-lg">
              This section appears after the image scroll effect is complete.
              Add your content here.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
