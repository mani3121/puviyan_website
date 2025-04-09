
import Footer from '../components/Footer';
import AnimatedSplitImages from '@/components/AnimatedSplitImages'; 
import VerticalImage from '@/components/VerticalImage';



const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-grow">
        
          <VerticalImage />
          <AnimatedSplitImages/>
    
      </main>
      
        <Footer />
    </div>
  );
};

export default Index;
