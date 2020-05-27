import React, {
  useReducer,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { Box, Flex, Badge, Button } from "@chakra-ui/core";
import NumberFormat from "react-number-format";
import { useAnimation } from "framer-motion";
import { CompaniesDispatch } from "../containers/Container";
import useAccount from "../hooks/useAccount";
import CompanyIconButton from "./CompanyIconButton";
import CompanyLevelProgress from "./CompanyLevelProgress";
import BoxButton from "./BoxButton";
import config from "../config";

const initialCompanyState = {
  branches: 1,
  level: 1,
  selling: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "selling":
      return { ...state, selling: action.payload };
    case "buy_company":
      return { ...state, purchased: true };
    case "buy_branch":
      return { ...state, branches: state.branches + 1 };
    case "add_level":
      return { ...state, level: state.level + 1 };
    default:
      throw new Error();
  }
};

export default ({
  id,
  name,
  icon,
  unit_price,
  company_purchase_cost,
  company_branch_cost,
  company_branch_cost_multiplier,
  production_time,
  branch_level_up_count,
  manager,
  purchased,
}) => {
  const companiesDispatch = useContext(CompaniesDispatch);
  const countdownInterval = useRef(null);
  const animationControl = useAnimation();

  const [state, dispatch] = useReducer(reducer, initialCompanyState);

  const { applyAmount, balance } = useAccount();

  const duration = production_time / state.level / 1000;
  const [countdown, setCountdown] = useState(duration);

  const aggregateCost = state.branches * unit_price;
  const branchCost =
    state.branches * company_branch_cost * company_branch_cost_multiplier;
  const canBePurchased = balance >= company_purchase_cost;

  const getLevelProgress = (branches) =>
    (branches % branch_level_up_count) / branch_level_up_count;

  const sell = async () => {
    dispatch({ type: "selling", payload: true });
    await animationControl.start({
      transition: { duration },
      scaleY: [0, 1],
      originY: [1, 1],
    });
    dispatch({ type: "selling", payload: false });
    applyAmount(aggregateCost);
  };

  const onFinishSale = () => {
    // if we've got a manager on board, we'll continue the gravy train!
    if (manager) {
      sell();
    }
  };

  const buyBranch = () => {
    if (getLevelProgress(state.branches + 1) === 0) {
      dispatch({ type: "add_level" });
    }
    dispatch({ type: "buy_branch" });
    applyAmount(-branchCost);
  };

  useEffect(() => {
    if (purchased) {
      applyAmount(-company_purchase_cost);
    }
  }, [purchased]);

  useEffect(() => setCountdown(duration), [state.level]);

  useEffect(() => {
    // Set the countdown timer
    if (state.selling) {
      countdownInterval.current = setInterval(() => {
        setCountdown((prevState) => prevState - 1);
      }, 1000);
    } else {
      if (countdownInterval.current !== null || countdown <= 0) {
        setCountdown(duration);
        clearInterval(countdownInterval.current);
        onFinishSale();
      }
    }
    return () => {
      clearInterval(countdownInterval.current);
    };
  }, [state.selling, manager]);

  const containerStyles = {
    borderWidth: "1px",
    background: canBePurchased || purchased ? "#2a4361" : "white",
    color: canBePurchased || purchased ? "white" : "black",
    boxShadow:
      canBePurchased || (purchased && "3px 3px 10px 0px rgba(0,0,0,0.24)"),
  };

  return (
    <Box
      height="100%"
      borderRadius="0.75rem"
      py="3"
      px="5"
      {...containerStyles}
    >
      {!purchased ? (
        <BoxButton
          disabled={!canBePurchased}
          onClick={() =>
            companiesDispatch({ type: "buy_company", payload: id })
          }
          textAlign="center"
          width="100%"
          height="100%"
        >
          <Flex
            width="100%"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              <CompanyIconButton
                disabled={!canBePurchased}
                icon={icon}
                hasProgress={false}
              />
            </Box>
            <Box flex="1">
              <Box fontWeight="bold">{name}</Box>
              <Button
                mt="0.5rem"
                minWidth="6rem"
                borderRadius="0.5rem"
                variantColor={canBePurchased ? "blue" : "gray"}
                fontWeight="bold"
                fontSize="lg"
              >
                {company_purchase_cost === 0 ? (
                  "Start"
                ) : (
                  <NumberFormat
                    value={company_purchase_cost}
                    {...config.numberFormat}
                  />
                )}
              </Button>
            </Box>
          </Flex>
        </BoxButton>
      ) : (
        <Box textAlign="center">
          <Flex height="100%">
            <Box>
              <CompanyIconButton
                disabled={state.selling}
                icon={icon}
                onClick={sell}
                hasProgress={true}
                animationControl={animationControl}
              />
              <CompanyLevelProgress
                mt="0.5rem"
                value={getLevelProgress(state.branches)}
              >
                {state.branches}
              </CompanyLevelProgress>
            </Box>

            <Box flex="1">
              <Box fontWeight="bold">{name}</Box>

              <Box fontSize="xl" fontWeight="bold">
                ${aggregateCost}
              </Box>

              <Box mt="0.5rem" id="countdown-timer" fontSize="sm">
                <NumberFormat
                  displayType="text"
                  value={countdown}
                  decimalScale="2"
                />
                s&nbsp;
                {state.level > 1 && (
                  <Badge borderRadius="0.25rem" variantColor="gray">
                    {state.level}x
                  </Badge>
                )}
              </Box>

              <Button
                mt="0.5rem"
                disabled={balance < branchCost}
                onClick={() => buyBranch()}
                borderRadius="0.5rem"
                borderWidth={balance < branchCost ? "1px" : "0"}
                _hover="#3182ce"
                background={balance > branchCost ? "#3182ce" : "transparent"}
              >
                Buy &nbsp;
                <NumberFormat
                  value={branchCost}
                  decimalScale="2"
                  fixedDecimalScale={true}
                  {...config.numberFormat}
                />
              </Button>
            </Box>
          </Flex>
        </Box>
      )}
    </Box>
  );
};
