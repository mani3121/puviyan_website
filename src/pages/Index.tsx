import ImageScrollStack from '@/components/ImageScrollStack';
import Footer from '../components/Footer';

const images: string[] = [
  'https://github.com/mani3121/puviyan_website/blob/main/src/assets/img/puviyan000.png?raw=true',
    'https://github.com/mani3121/puviyan_website/blob/main/src/assets/img/puviyan118.png?raw=true'
];
const Index = () => {

  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-grow">
        
      <ImageScrollStack images={images} />
      </main>
          {/* <AnimatedSplitImages/> */}
    
     
      
        <Footer />
    </div>
  );
};

export default Index;
