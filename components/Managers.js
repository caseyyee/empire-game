import React, { useContext } from "react";

import { Box, Flex, Button } from "@chakra-ui/core";
import {
  AccountsState,
  CompaniesState,
  CompaniesDispatch,
} from "../containers/Container";
import useAccount from "../hooks/useAccount";
import AppHead from "./AppHead";
import NumberFormat from "react-number-format";
import BoxButton from "./BoxButton";
import CompanyIconButton from "./CompanyIconButton";
import config from "../config";

export default (props) => {
  const accountsState = useContext(AccountsState);
  const companies = useContext(CompaniesState);
  const dispatch = useContext(CompaniesDispatch);

  const { applyAmount } = useAccount();

  const hireManager = (key, cost) => {
    dispatch({ type: "hire_manager", payload: key });
    applyAmount(-cost);
  };

  return (
    <Box {...props}>
      <AppHead>Mega Hire</AppHead>
      <Box p="3">
        {Object.keys(companies).map((key) => {
          const company = companies[key];
          const enabled = company.manager_cost < accountsState.balance;
          const elementProps = enabled && {
            background: "#2a4361",
            color: "white",
          };

          if (!company.manager) {
            return (
              <BoxButton
                key={`manager-${key}`}
                borderWidth="1px"
                mb="2"
                borderRadius="0.75rem"
                p="3"
                onClick={() => hireManager(key, company.manager_cost)}
                disabled={!enabled}
                fontWeight="bold"
                {...elementProps}
              >
                <Flex justifyContent="center" alignItems="center">
                  <Box>
                    <CompanyIconButton
                      icon={company.icon}
                      hasProgress={false}
                    />
                  </Box>
                  <Box ml="4">
                    <Box>
                      Manager runs&nbsp;
                      <em>{companies[key].name}</em>
                    </Box>
                    <Button variantColor={enabled ? "blue" : "gray"} mt="2">
                      Hire for &nbsp;
                      <NumberFormat
                        value={companies[key].manager_cost}
                        {...config.numberFormat}
                      />
                    </Button>
                  </Box>
                </Flex>
              </BoxButton>
            );
          }
        })}
      </Box>
    </Box>
  );
};
