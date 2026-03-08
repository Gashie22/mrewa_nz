import React, { useState, useEffect } from 'react';

export default function Typewriter({ text, speed = 50, delay = 0 }) {
  const [displayedText, setDisplayedText] = useState('');
  const [start, setStart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStart(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (start && displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, start, text, speed]);

  return (
    <span>
      {displayedText}
    </span>
  );
}