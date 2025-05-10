
import React, { useRef, useEffect, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  distance?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  threshold?: number;
  once?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 500,
  distance = '20px',
  direction = 'up',
  threshold = 0.1,
  once = true,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial styles
    const directionMap = {
      up: `translateY(${distance})`,
      down: `translateY(-${distance})`,
      left: `translateX(${distance})`,
      right: `translateX(-${distance})`,
    };

    element.style.opacity = '0';
    element.style.transform = directionMap[direction];
    element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
    element.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.style.opacity = '1';
          element.style.transform = 'translate(0, 0)';
          
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          element.style.opacity = '0';
          element.style.transform = directionMap[direction];
        }
      },
      { 
        threshold: threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [delay, duration, distance, direction, threshold, once]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;
