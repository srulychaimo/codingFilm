// Imports
import { useEffect, useState, useRef } from "react";

// custom hook that returns ref and isVisible & will set isVisible to true only when the ref element is shown on screen.
export const useOnScreenElement = (options) => {
  // ref with useRef react hook
  const ref = useRef(null);

  // isVisible state
  const [isVisible, setIsVisible] = useState(false);

  // callBackFunction will set isVisible to entry.isIntersecting that will be true if element of ref is shown.
  const callBackFunction = (entries) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  // useEffect will run on componentDidMount & when ref or options will change.
  useEffect(() => {
    // sets an observer
    const observer = new IntersectionObserver(callBackFunction, options);
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return [ref, isVisible];
};
