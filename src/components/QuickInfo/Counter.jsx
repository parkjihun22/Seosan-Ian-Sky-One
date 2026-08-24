// src/components/Counter/Counter.jsx

import React, { useEffect, useRef, useState } from "react";

export default function Counter({
  end = 0,
  suffix = "",
  duration = 2200,
  startOnView = true,
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnView);
  const counterRef = useRef(null);

  useEffect(() => {
    if (!startOnView) return;

    const target = counterRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 화면에 들어오면 다시 0부터 시작
        if (entry.isIntersecting) {
          setCount(0);
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.9,
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [startOnView]);

  useEffect(() => {
    if (!isVisible) return;

    let animationId;
    const startTime = performance.now();

    const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = easeOutCubic(progress);

      setCount(Math.floor(end * eased));

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isVisible, end, duration]);

  return (
    <strong ref={counterRef}>
      {count}
      {suffix}
    </strong>
  );
}