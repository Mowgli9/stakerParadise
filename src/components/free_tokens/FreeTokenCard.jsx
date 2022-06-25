import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
// yarn add @mui/lab @mui/material
import BannerImg from "../../resources/images/tokenImage (900 × 700 px).png";
import useStyles from "../../style";
import { useState, useEffect } from "react";
import { Input } from "web3uikit";
import CheckIcon from "@mui/icons-material/Check";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { ethers } from "ethers";
import ErrorNotifications from "../Notifications/ErrorNotifications";
import { NotificationProvider } from "web3uikit";
import ConfirmationNotification from "../Notifications/ConfirmationNotification";
import LoadingButton from "@mui/lab/LoadingButton";

export default function FreeTokenCard(props) {
  const [metaMaskErrors, setMetaMaskErrors] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);
  const [transactionConfirmed, setTransactionConfirmed] = useState(0);
  const [buttonIsWaiting, setButtonIsWaiting] = useState(false);

  const { tokenName, contract, tkn1Address, signer ,walletAddress} = props;
  const classes = useStyles();
  const [errorValue, setErrorValue] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const tokenAddress = "0xd00981105e61274c8a5cd5a88fe7e037d935b513";
  const tokenSymbol = "TKN1";
  const tokenDecimals = 18;
  const tokenImage = "https://i.postimg.cc/cCKwnZV8/token.png";

  const request_to_get_free_tokens = async () => {
    try {
      const getFreeTokens = await contract.getFree(inputValue);
    } catch (e) {
      setButtonIsWaiting(false);
      setMetaMaskErrors(e.code);
      setErrorCount(errorCount + 1);
    }
    checkEvents()
  };

  // import  Token to metamask
  const addToken = async () => {
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: tkn1Address, // The address that the token is at.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: tokenDecimals, // The number of decimals in the token
            image: "https://i.ibb.co/Y76fQ1V/token.png", // A string url of the token logo
          },
        },
      });

      if (wasAdded) {
        console.log("Thanks for your interest!");
      } else {
        console.log("Your loss!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChangeInpuy = (e) => {
    if (
      (Number(e.target.value) > 0 && Number(e.target.value) <= 1000) ||
      e.target.value.length === 0
    ) {
      setErrorValue(false);
      setInputValue(e.target.value);
    } else {
      setErrorValue(true);
    }
  };

  const handleClick = async () => {
    if (errorValue === false) {
      if (inputValue.length > 0) {
        setButtonIsWaiting(true);
        request_to_get_free_tokens();
      } else {
        setErrorValue(true);
      }
    } else {
      console.log("error");
    }
  };
  // useEffect(() => {
  //   const renderUserTransactionCount = async () => {
  //     const userTransactionCount = await signer?.getTransactionCount();
  //     setTransactionCount(userTransactionCount);
  //   };
  //   renderUserTransactionCount();
  // }, [transactionConfirmed]);

  
  
  const checkEvents  = async ()=>{
    contract?.on("Transfer", async (from, to, value) => {

      if(to === walletAddress){
        console.log("Succes2")
      setTransactionConfirmed(transactionConfirmed + 1);
      setButtonIsWaiting(false);
      }
      // if (
      //   (await signer?.getTransactionCount()) > transactionCount &&
      //   transactionCount > 0
      // ) {
      //   setTransactionConfirmed(transactionConfirmed + 1);
      //   setButtonIsWaiting(false);
      // }
    });
  }
    
  

  

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
        <Card
          sx={{ maxWidth: 345, borderRadius: "16px", alignItems: "center" }}
          md={{ width: 200 }}
          elevation={5}
          align={"center"}
        >
          <CardMedia
            component="img"
            height="250"
            // width="250"
            image={BannerImg}
            alt="green iguana"
          />
          <CardContent align={"center"}>
            <Typography gutterBottom variant="h6" component="div">
              Get Free ${tokenName}
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle2"
              component="span"
              sx={{ color: "#F7B93F" }}
            >
              MAX : 1000 $TKN per transaction
            </Typography>
            <Input
              label="Enter an amount"
              errorMessage={errorValue ? "Please enter a valid amount" : ""}
              name="Test text Input"
              onBlur={function noRefCheck() {}}
              onChange={handleOnChangeInpuy}
              style={{ marginTop: "1rem", maxWidth: "270px" }}
              state={errorValue ? "error" : "initial"}
            />
          </CardContent>
          <CardActions
            sx={{ marginBottom: 1, marginLeft: "30px", alignItems: "center" }}
            align={"center"}
          >
            <LoadingButton
              loading={buttonIsWaiting}
              size="Medium"
              variant="contained"
              onClick={() => {
                handleClick();
              }}
              startIcon={<CheckIcon sx={{ fontSize: 20 }} />}
            >
              Confirme
            </LoadingButton>
            <Button
              size="Small"
              variant="outlined"
              endIcon={<AccountBalanceWalletIcon sx={{ fontSize: 20 }} />}
              onClick={() => {
                addToken();
              }}
            >
              Add to
            </Button>
          </CardActions>
        </Card>
      </NotificationProvider>
    </>
  );
}
