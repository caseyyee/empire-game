import React, { useEffect, useRef, useContext } from "react";

import { AccountsDispatch } from "../containers/Container";

export default ({ delay = 4000 } = {}) => {
  const accountsDispatch = useContext(AccountsDispatch);

  const queue = useRef([]);
  const last = useRef(Date.now());

  const dispatchQueue = () => {
    if (queue.current.length !== 0) {
      const sum = queue.current.reduce((a, b) => a + b);
      accountsDispatch({ type: "apply_amount", payload: sum });
      queue.current = [];
    }
  };

  const applyAmount = (value) => {
    if (value === 0) {
      return;
    }

    queue.current.push(value);

    const now = Date.now();
    const lastQueued = now - last.current;

    if (queue.current.length === 1 && lastQueued > delay) {
      dispatchQueue();
    }

    last.current = now;
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
    applyAmount,
  };
};
