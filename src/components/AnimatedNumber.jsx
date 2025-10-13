import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const AnimatedNumber = ({ value, duration = 1000 }) => {
  const [displayValue, setDisplayValue] = useState(Number(value) || 0);
  const startValueRef = useRef(displayValue);
  const rafRef = useRef(null);

  useEffect(() => {
    const startValue = startValueRef.current;
    const endValue = Number(value) || 0;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = startValue + (endValue - startValue) * progress;
      setDisplayValue(currentValue);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        startValueRef.current = endValue;
      }
    };

    // start animation
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration]);

  return Number(displayValue).toFixed(2);
};

AnimatedNumber.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  duration: PropTypes.number,
};

export default AnimatedNumber;