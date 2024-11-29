import { createContext, useContext, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Lottie from 'lottie-react';

const AnimationContext = createContext({});

export const useAnimation = () => useContext(AnimationContext);

export const AnimatedElement = ({ 
  children, 
  animation = 'fade', 
  delay = 0,
  threshold = 0.2,
  triggerOnce = true,
  className = '',
}) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce,
  });

  const getAnimationClass = () => {
    const baseClasses = 'transition-all duration-1000 ease-out';
    const delayClass = delay ? `delay-${delay}` : '';
    
    const animationClasses = {
      fade: `${baseClasses} ${delayClass} ${
        inView ? 'opacity-100' : 'opacity-0'
      }`,
      slideUp: `${baseClasses} ${delayClass} transform ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`,
      slideDown: `${baseClasses} ${delayClass} transform ${
        inView ? 'translate-y-0 opacity-100' : '-translate-y-16 opacity-0'
      }`,
      slideLeft: `${baseClasses} ${delayClass} transform ${
        inView ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-0'
      }`,
      slideRight: `${baseClasses} ${delayClass} transform ${
        inView ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'
      }`,
      scale: `${baseClasses} ${delayClass} transform ${
        inView ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`,
      rotate: `${baseClasses} ${delayClass} transform ${
        inView ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
      }`,
    };

    return `${animationClasses[animation]} ${className}`;
  };

  return (
    <div ref={ref} className={getAnimationClass()}>
      {children}
    </div>
  );
};

export const ParallaxBackground = ({ 
  children, 
  image,
  speed = 0.5,
  className = '',
}) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setOffset(window.pageYOffset);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
          transform: `translateY(${offset * speed}px)`,
          zIndex: -1,
        }}
      />
      {children}
    </div>
  );
};

export const LottieAnimation = ({
  animationData,
  loop = true,
  autoplay = true,
  className = '',
  style = {},
}) => {
  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      style={style}
    />
  );
};

const AnimationProvider = ({ children }) => {
  return (
    <AnimationContext.Provider value={{}}>
      {children}
    </AnimationContext.Provider>
  );
};

export default AnimationProvider;
