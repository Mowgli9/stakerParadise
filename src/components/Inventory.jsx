import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TokenIcon from "@mui/icons-material/Token";
import InventoryCard from "./Inventory/InventoryCard";
import LoadingButton from "@mui/lab/LoadingButton";
import { NotificationProvider } from "web3uikit";
import ConfirmationNotification from "./Notifications/ConfirmationNotification";
import ErrorNotifications from "./Notifications/ErrorNotifications";

import { useState, useEffect } from "react";
// contract={contract}
//                 signer={signer}
//                 key={pool}
//                 pool={pool}
//                 setPools={setPools}

//                 tokenContract={tokenContract}

export default function Inventory(props) {
  const { contract, signer, walletAddress } = props;
  const [pools, setPools] = useState();
  const [balance, setBalance] = useState(0);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
  const [metaMaskErrors, setMetaMaskErrors] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);
  const [transactionConfirmed, setTransactionConfirmed] = useState(0);

  const handleClick = async () => {
    try {
      setIsButtonLoading(true);
      const claim = await contract.claimReward();
      claimEvent()
    } catch (e) {
      setMetaMaskErrors(e.code);
      setErrorCount(errorCount + 1);
      setIsButtonLoading(false);
    }
   
  };

  const getUSerBalance = async () => {
    const userBalance = await contract.userRewards(walletAddress);
    setBalance(userBalance);
    if (userBalance > 0) {
      setButtonIsDisabled(false);
    }
  };

  const getUserInvestment = async () => {
    const userInvestment = await contract.getUserInvestment(
      walletAddress
    );
    setPools(userInvestment);
  };
  const claimEvent = async()=>{
    contract?.on("Claimed", async (user) => {
    if (user === walletAddress) {
      setIsButtonLoading(false);
      setTransactionConfirmed(transactionConfirmed + 1);
    }


  });
  }

  
  useEffect(() => {
    getUSerBalance();
  }, [walletAddress]);

  useEffect(() => {
    getUserInvestment();
  }, [walletAddress]);
  return (
    <>
      <NotificationProvider>
        <ErrorNotifications
          errorCode={metaMaskErrors}
          errorCount={errorCount}
        ></ErrorNotifications>
        <ConfirmationNotification
          confirmedTransactionCount={transactionConfirmed}
        ></ConfirmationNotification>
        <Typography
          variant="h4"
          align={"center"}
          sx={{ marginTop: 3 }}
          gutterBottom
        >
          {" "}
          Your Inventory
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} align={"center"}>
            <Box sx={{ maxWidth: { xs: 320, sm: 400, md: 300 } }}>
              <Card align={"center"} elevation={4}>
                <CardContent align={"center"}>
                  <Grid container spacing={3}>
                    <Grid item xs={3} sm={5} md={5} sx={{ marginTop: 1 }}>
                      <TokenIcon sx={{ fontSize: 40 }}></TokenIcon>
                    </Grid>
                    <Grid item xs={9} sm={7} md={7}>
                      <Typography
                        sx={{ marginTop: 1 }}
                        variant="button"
                        color="text.primary"
                        gutterBottom
                      >
                        {" "}
                        Reward :{" "}
                        {balance.toString() === "0"
                          ? "000"
                          : balance.toString()}
                      </Typography>
                      <LoadingButton
                        loading={isButtonLoading}
                        size="Medium"
                        variant="contained"
                        onClick={() => {
                          handleClick();
                        }}
                        disabled={buttonIsDisabled}
                      >
                        Unsatake
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>{" "}
          </Grid>
          {pools?.map((pool) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              align={"center"}
              sx={{ marginTop: 5 }}
              key={pool}
            >
              <InventoryCard
                key={pool}
                poolInfo={pool}
                signer={signer}
                walletAddress={walletAddress}
                contract={contract}
              ></InventoryCard>
            </Grid>
          ))}
        </Grid>
      </NotificationProvider>
    </>
  );
}
