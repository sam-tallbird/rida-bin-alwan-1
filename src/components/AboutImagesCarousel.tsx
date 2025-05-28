'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';

const AboutImagesCarousel = () => {
  const locale = useLocale();
  const isRTL = locale === 'ar' || locale === 'ku';

  return (
    <>
      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scrollLTR {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          @keyframes scrollRTL {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0);
            }
          }

          .carousel-scroll-ltr {
            animation: scrollLTR 20s linear infinite;
          }

          .carousel-scroll-rtl {
            animation: scrollRTL 20s linear infinite;
          }
        `
      }} />

      <div className="overflow-hidden relative h-[30rem] md:h-[36rem] lg:h-[42rem] w-full">
        {/* Outer Container (Viewport/Mask) */}
        
        <div 
          className={`flex flex-nowrap h-full ${
            isRTL ? 'space-x-reverse space-x-4 md:space-x-6 carousel-scroll-rtl' : 'space-x-4 md:space-x-6 carousel-scroll-ltr'
          }`}
          style={{ width: 'max-content' }}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* First set of images */}
          <div className="w-80 md:w-96 lg:w-[30rem] h-full flex-shrink-0 overflow-hidden">
            <Image
              src="/imgs/about-01.jpg"
              alt="About Us Image 1"
              width={400}
              height={500}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 480px"
            />
          </div>

          <div className="w-80 md:w-96 lg:w-[30rem] h-full flex-shrink-0 overflow-hidden">
            <Image
              src="/imgs/about-02.jpg"
              alt="About Us Image 2"
              width={400}
              height={500}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 480px"
            />
          </div>

          <div className="w-40 md:w-48 lg:w-60 h-full flex-shrink-0 overflow-hidden">
            <Image
              src="/imgs/about-03.jpg"
              alt="About Us Image 3"
              width={300}
              height={700}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 160px, (max-width: 1024px) 192px, 240px"
            />
          </div>

          <div className="w-80 md:w-96 lg:w-[30rem] h-full flex-shrink-0 overflow-hidden">
            <Image
              src="/imgs/about-04.jpg"
              alt="About Us Image 4"
              width={400}
              height={500}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 480px"
            />
          </div>

          {/* Duplicate set for seamless looping */}
          <div className="w-80 md:w-96 lg:w-[30rem] h-full flex-shrink-0 overflow-hidden" aria-hidden="true">
            <Image
              src="/imgs/about-01.jpg"
              alt=""
              width={400}
              height={500}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 480px"
              aria-hidden="true"
            />
          </div>

          <div className="w-80 md:w-96 lg:w-[30rem] h-full flex-shrink-0 overflow-hidden" aria-hidden="true">
            <Image
              src="/imgs/about-02.jpg"
              alt=""
              width={400}
              height={500}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 480px"
              aria-hidden="true"
            />
          </div>

          <div className="w-40 md:w-48 lg:w-60 h-full flex-shrink-0 overflow-hidden" aria-hidden="true">
            <Image
              src="/imgs/about-03.jpg"
              alt=""
              width={300}
              height={700}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 160px, (max-width: 1024px) 192px, 240px"
              aria-hidden="true"
            />
          </div>

          <div className="w-80 md:w-96 lg:w-[30rem] h-full flex-shrink-0 overflow-hidden" aria-hidden="true">
            <Image
              src="/imgs/about-04.jpg"
              alt=""
              width={400}
              height={500}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 480px"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutImagesCarousel; 