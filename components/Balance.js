import React from "react";
import { Box, Text } from "@chakra-ui/core";
import NumberFormat from "react-number-format";
import config from "../config";
import useAccount from "../hooks/useAccount";

export default (props) => {
  const { balance } = useAccount();

  return (
    <Box {...props}>
      <Box textAlign="center">
        <Text fontSize="3rem" fontWeight="bold">
          <NumberFormat value={balance} {...config.numberFormat} />
        </Text>
      </Box>
      <Box textAlign="center" pb="3">
        {balance < 1000 && "Parents place is pretty nice 🙄"}
        {balance > 1000 && balance < 10000 && "#Vanlife"}
        {balance > 10000 && balance < 100000 && "💰 Ballin' 💰"}
        {balance > 100000 && balance < 500000 && "Truffles are pretty dope!"}
        {balance > 500000 &&
          balance < 1000000 &&
          "🍔 Everything on the menu please"}
        {balance > 1000000 && balance < 50000000 && "There's too much of it"}
        {balance > 50000000 &&
          balance < 100000000 &&
          "Have my 🍰🍰🍰 AND eat it too?!"}
        {balance > 100000000 && "🤩"}
      </Box>
    </Box>
  );
};
