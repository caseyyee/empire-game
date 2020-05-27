import { Box, Heading, Image, Flex } from "@chakra-ui/core";
import { useContext, useMemo, useReducer, useEffect } from "react";
import { GameDispatch, CompaniesState } from "../containers/Container";
import useAccount from "../hooks/useAccount";
import AppHead from "./AppHead";
import OpenFromDock from "./OpenFromDock";
import AppInstallButton from "./AppInstallButton";
import empire from "../images/empire.png";
import managers from "../images/managers.png";

// todo: this can move to container
const ComponentState = Object.freeze({
  Intro: "INTRO",
  Installed: "INSTALLED",
  CanManage: "CAN_MANAGE",
  Managed: "MANAGED",
});

const reducer = (state, action) => {
  switch (action.type) {
    case "Install":
      return ComponentState.Installed;
    case "CanManage":
      return ComponentState.CanManage;
    case "Managed":
      return ComponentState.Managed;
  }
};

export default (props) => {
  const gameDispatch = useContext(GameDispatch);
  const companiesState = useContext(CompaniesState);
  const { balance } = useAccount();
  const initialState = ComponentState.Intro;
  const [state, dispatch] = useReducer(reducer, initialState);

  const minManagerCost = useMemo(() => {
    let managersCost = [];
    Object.keys(companiesState).map((key) =>
      managersCost.push(companiesState[key].manager_cost)
    );
    return Math.min(...managersCost);
  }, []);

  useEffect(() => {
    // Users balance is larger than the minimum cost of a manager,
    // We'll notify to Install the Managers app.
    if (balance > minManagerCost && state !== ComponentState.Managed) {
      dispatch({ type: "CanManage" });
      gameDispatch({
        type: "set_app_badge",
        payload: { key: "news", value: true },
      });
    }
  }, [balance]);

  useEffect(() => {
    if (state === ComponentState.CanManage) {
      gameDispatch({
        type: "set_app_badge",
        payload: { key: "news", value: true },
      });
    }
  }, [state]);

  return (
    <Box {...props}>
      <AppHead
        background="transparent"
        foreground="#9a9a9a"
        position="absolute"
      />
      <Flex
        maxWidth="30rem"
        m="auto"
        p="2rem"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        {state === ComponentState.Intro && (
          <Box>
            <Heading textAlign="center">Your Tech Startup Dreams!</Heading>
            <Box mt="1rem" display={["none", "block"]}>
              Ride profits all the way to the moon by creating companies,
              increasing profits and hiring a unicorn team to run it all while
              you work on that moonshot!
            </Box>
            <Box mt="2rem">
              <Flex alignItems="center" justifyContent="center">
                <Box>
                  <Image src={empire} width="4rem" />
                </Box>
                <Box px="1rem">
                  <Box fontWeight="bold">Megapreneur</Box>
                  <Box color="grey" fontSize="sm">
                    Sweet Success Inc.
                  </Box>
                </Box>
              </Flex>
              <Box textAlign="center" mt="2rem">
                <AppInstallButton
                  onClick={() => {
                    gameDispatch({
                      type: "install_app",
                      payload: "companies",
                    });
                    dispatch({ type: "Install" });
                  }}
                />
              </Box>
            </Box>
          </Box>
        )}

        {state === ComponentState.Installed && (
          <Box textAlign="center">
            <Box textAlign="center" width="4rem" m="auto">
              <Image src={empire} />
            </Box>
            <Heading fontSize="xl" mt="2rem" textAlign="center">
              Megapreneur
            </Heading>

            <Box fontStyle="italic">Installed!</Box>

            <Box mt="1rem">
              ...those billions aren't going to make themselves!
            </Box>

            <OpenFromDock />
          </Box>
        )}

        {state === ComponentState.CanManage && (
          <Box>
            <Heading textAlign="center">Up'n Up!</Heading>
            <Box mt="2rem">
              Hire a unicorn team to manage your highly profitable companies so
              you don't have to.
            </Box>
            <Box mt="2rem">
              <Flex alignItems="center" justifyContent="center">
                <Box>
                  <Image src={managers} width="4rem" />
                </Box>
                <Box px="1rem">
                  <Box fontWeight="bold">Mega Hire</Box>
                  <Box color="grey" fontSize="sm">
                    Sweet Success Inc.
                  </Box>
                </Box>
              </Flex>
              <Box textAlign="center" mt="2rem">
                <AppInstallButton
                  onClick={() => {
                    gameDispatch({
                      type: "install_app",
                      payload: "managers",
                    });
                    dispatch({ type: "Managed" });
                  }}
                />
              </Box>
            </Box>
          </Box>
        )}

        {state === ComponentState.Managed && (
          <Box textAlign="center">
            <Box textAlign="center" width="4rem" m="auto">
              <Image src={managers} />
            </Box>

            <Heading fontSize="xl" mt="2rem" textAlign="center">
              Mega Hire
            </Heading>
            <Box fontStyle="italic">Installed!</Box>

            <Box mt="1rem">Move Fast, Break Things!</Box>

            <OpenFromDock />
          </Box>
        )}
      </Flex>
    </Box>
  );
};
