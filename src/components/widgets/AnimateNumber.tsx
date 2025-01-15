import { useState, useEffect } from 'react';

interface AnimatedNumberProps {
  value: string;
  duration?: number;
}

const AnimatedNumber = ({ value, duration = 3000 }: AnimatedNumberProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const end = parseInt(value.replace(/\D/g, ''), 10); 
    const totalSteps = 100;
    const increment = end / totalSteps; 
    const intervalTime = duration / totalSteps; 

    let currentCount = 0;

    const timer = setInterval(() => {
      currentCount += increment;
      setCount(Math.min(currentCount, end));
      if (currentCount >= end) clearInterval(timer);
    }, intervalTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{Math.round(count)}</span>; 
};

export default AnimatedNumber;