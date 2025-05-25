import gsap from 'gsap';
import { useEffect, useRef } from 'react';

export default function UniteWithPuviyan() {
  const sectionRef = useRef(null);
  const sunRef = useRef(null);
  const peopleRef = useRef(null);
  const greenWaveRef = useRef(null);
  const blueWaveRef = useRef(null);
  const blackWaveRef = useRef(null);
  const formRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const tl = gsap.timeline({ defaults: { duration: 1.5, ease: 'power2.out' } });

          tl.fromTo(sunRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, delay: 0.5 })
            .fromTo(peopleRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, '-=1.2')
            .fromTo(greenWaveRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, '-=1.2')
            .fromTo(blueWaveRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, '-=1.2')
            .fromTo(blackWaveRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, '-=1.2')
            .fromTo(formRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1 }, '-=1.2');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div
      className="relative min-h-screen bg-white font-sans overflow-hidden"
      ref={sectionRef}
    >
      {/* Page Header */}
      <div className="absolute top-0 left-0 w-full flex justify-center pt-16 z-50">
        <h2 className="text-3xl font-bold text-gray-800">Unite with Puviyan</h2>
      </div>
      {/* Sun and hill silhouette with people */}
      <div
        className="absolute left-0 top-0 z-10 w-1/2 h-full flex items-start justify-start"
        ref={sunRef}
      >
        <div className="relative left-0 w-[500px] h-[500px] mt-10 ml-0">
          <img
            src="https://puviyan-website.vercel.app/images/sun.png"
            alt="Sun"
            className="absolute top-0 left-0 w-full h-full rounded-full z-10"
          />
        </div>
      </div>
      {/* people climbing */}
      <div
        className="absolute left-40 top-10 z-20 w-1/2 h-full flex items-start justify-start"
        ref={peopleRef}
      >
        <div className="relative w-[200%] h-[500px] mt-20 ml-[-10%]">
          <div className="absolute bottom-0 left-0 w-full h-auto z-10">
            <img
              src="https://puviyan-website.vercel.app/images/People_claimbing.png"
              alt="People Climbing"
              className="w-full h-auto"
              style={{ transform: 'scaleX(1.2)' }}
            />
          </div>
        </div>
      </div>
      {/* Background waves as images */}
      <img
        src="https://puviyan-website.vercel.app/images/Green_wave.png"
        alt="Green Wave"
        className="absolute bottom-10 left-0 w-full h-auto z-30"
        ref={greenWaveRef}
      />
      <img
        src="https://puviyan-website.vercel.app/images/Blue_wave.png"
        alt="Blue Wave"
        className="absolute bottom-0 left-0 w-full h-auto z-40"
        ref={blueWaveRef}
      />
      <img
        src="https://puviyan-website.vercel.app/images/Black_wave.png"
        alt="Black Wave"
        className="absolute bottom-0 left-0 w-full h-auto z-50"
        ref={blackWaveRef}
      />
      {/* Contact Form */}
      <div className="relative z-50 flex justify-end items-center h-[70vh] pr-16 mt-[-50px]">
        <div ref={formRef}>
          <form className="bg-white shadow-xl p-6 w-[400px] space-y-4 rounded-xl">
            <input
              className="w-full px-4 py-2 border rounded-md"
              type="text"
              placeholder="Name*"
              required
            />
            <input
              className="w-full px-4 py-2 border rounded-md"
              type="email"
              placeholder="Email address*"
              required
            />
            <textarea
              className="w-full px-4 py-2 border rounded-md"
              rows="4"
              placeholder="Your Message*"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-400 to-yellow-300 text-white font-semibold py-2 px-4 rounded-md w-full hover:opacity-90"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

     </div>
  );
}
