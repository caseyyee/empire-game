import React, { useEffect, useRef } from "react";

export default ({ delay = 500 } = {}) => {
  const queue = useRef([]);
  const last = useRef(Date.now());
  const fn = useRef(null);

  // call to add to queue
  const add = (value, callback) => {
    queue.current.push(value);
    fn.current = callback;

    // determine if we should dispatch immediately
    const now = Date.now();
    const lastQueued = now - last.current;

    // Immediately dispatch the queue if under update time.
    if (queue.current.length === 1 && lastQueued > delay) {
      dispatchQueue();
    }
    last.current = now;
  };

  const dispatchQueue = () => {
    if (queue.current.length !== 0) {
      const sum = queue.current.reduce((a, b) => a + b);
      // callback
      fn.current(sum);
      queue.current = [];
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatchQueue();
    }, delay);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return {
    add,
  };
};
