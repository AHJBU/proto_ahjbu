
export const setupScrollAnimation = (
  elementRefs: (HTMLElement | null)[],
  options?: IntersectionObserverInit
) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: options?.threshold || 0.15,
      rootMargin: options?.rootMargin || '0px 0px -50px 0px',
      root: options?.root || null,
    }
  );

  elementRefs.forEach((el) => {
    if (el) observer.observe(el);
  });

  // Return cleanup function
  return () => {
    elementRefs.forEach((el) => {
      if (el) observer.unobserve(el);
    });
  };
};

// Create staggered animation delay for multiple elements
export const getStaggeredDelay = (index: number, baseDelay: number = 0.1): string => {
  return `${baseDelay * index}s`;
};

// Function to add CSS class with delay
export const addClassWithDelay = (
  element: HTMLElement, 
  className: string, 
  delay: number
): void => {
  setTimeout(() => {
    element.classList.add(className);
  }, delay);
};

// Utility to create animated elements array with refs
export const createAnimatedRefs = <T>(
  count: number
): React.MutableRefObject<(T | null)[]> => {
  return { current: Array(count).fill(null) };
};
