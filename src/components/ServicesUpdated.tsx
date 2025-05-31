import { useMediaQuery } from "react-responsive";
import Services from "./Services";

const ServicesUpdated = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  if (isMobile) {
    return <Services />;
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-white hidden md:flex">
      <img
        src="https://puviyan-website.vercel.app/images/Services1.gif"
        alt="Services"
        className="max-w-full h-auto"
        loading="lazy"
      />
    </div>
  );
};

export default ServicesUpdated;
