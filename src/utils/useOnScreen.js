import { useEffect, useState, useRef } from "react";

export const useOnScreenElement = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const callBackFunction = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };
  useEffect(() => {
    const observer = new IntersectionObserver(callBackFunction, options);
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]); // Empty array ensures that effect is only run on mount and unmount
  return [ref, isVisible];
};
