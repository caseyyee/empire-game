import React, { useContext } from "react";
import useQueue from "../hooks/useQueue";
import { AccountsDispatch, AccountsState } from "../containers/Container";

export default () => {
  const addBalance = useContext(AccountsDispatch);
  const balance = useContext(AccountsState);

  const { add } = useQueue();

  const applyAmount = (value) => {
    if (value === 0) {
      return;
    }
    add(value, (sum) => addBalance(sum));
  };

  return {
    applyAmount,
    balance,
  };
};
