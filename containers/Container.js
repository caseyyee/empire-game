import React, { createContext, useReducer, useState, useRef } from "react";
import useQueue from "../hooks/useQueue";
import initialCompaniesState from "../data/companies";
import menu from "../data/menu";

const gameInitialState = {
  menu,
  current_menu: "news",
};

const companyStateDefaults = {
  manager: false,
  purchased: false,
};

export const AccountsState = createContext();
export const AccountsDispatch = createContext();
export const CompaniesState = createContext();
export const CompaniesDispatch = createContext();
export const GameState = createContext();
export const GameDispatch = createContext();

const companyReducer = (state, action) => {
  switch (action.type) {
    case "buy_company":
      state[action.payload].purchased = true;
      return {
        ...state,
      };
    case "hire_manager":
      state[action.payload].manager = true;
      return {
        ...state,
      };
    default:
      throw new Error();
  }
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case "open_menu": {
      state.menu[action.payload].bounce = false;
      state.menu[action.payload].badge = false;
      return {
        ...state,
        current_menu: action.payload,
      };
    }
    case "install_app": {
      state.menu[action.payload].installed = true;
      state.menu[action.payload].bounce = true;
      return {
        ...state,
      };
    }
    case "set_app_badge": {
      state.menu[action.payload.key].badge = action.payload.value;
      state.menu[action.payload.key].bounce = action.payload.value;
      return { ...state };
    }
    default:
      throw new Error();
  }
};

const Container = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [gameState, gameDispatch] = useReducer(gameReducer, gameInitialState);
  const { add } = useQueue();

  const addBalance = (value) => {
    add(value, (sum) => setBalance((prev) => prev + sum));
  };

  const mergedInitialCompanyState = () => {
    let merged = {};
    Object.keys(initialCompaniesState).map((key) => {
      merged[key] = {
        ...initialCompaniesState[key],
        ...companyStateDefaults,
      };
    });
    return merged;
  };

  const [companies, dispatchCompanies] = useReducer(
    companyReducer,
    mergedInitialCompanyState()
  );

  return (
    <GameDispatch.Provider value={gameDispatch}>
      <GameState.Provider value={gameState}>
        <AccountsDispatch.Provider value={addBalance}>
          <AccountsState.Provider value={balance}>
            <CompaniesDispatch.Provider value={dispatchCompanies}>
              <CompaniesState.Provider value={companies}>
                {children}
              </CompaniesState.Provider>
            </CompaniesDispatch.Provider>
          </AccountsState.Provider>
        </AccountsDispatch.Provider>
      </GameState.Provider>
    </GameDispatch.Provider>
  );
};

export default Container;
