import React from "react";
import { Input } from "web3uikit";
import Box from "@mui/material/Box";
import { NotificationProvider } from "web3uikit";
import ErrorNotifications from "../Notifications/ErrorNotifications";
import LoadingButton from "@mui/lab/LoadingButton";
import SavingsIcon from "@mui/icons-material/Savings";
import { ethers } from "ethers";
import ConfirmationNotification from "../Notifications/ConfirmationNotification";

import { useState, useEffect } from "react";
const style = {};

export default function StakeInfo(props) {
  const {
    poolInfo,
    contract,
    tokenContract,
    signer,
    handleStakeClose,
    setPoolInfo,
    setTransactionConfirmed,
    transactionConfirmed,
    walletAddress,
  } = props;
  const [errorInput, setErrorInput] = useState(false);
  const [miniEntry, setMiniEntry] = useState(poolInfo?.minDeposit.toString());
  const [maxEntry, setMaxEntry] = useState(poolInfo?.maxSupply.toString());
  const [amount, setAmount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [errorCode, setErrorCode] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const [transactionCount, setTransactionCount] = useState(0);
  // const [transactionConfirmed, setTransactionConfirmed] = useState(0);
  const [buttonIsWaiting, setButtonIsWaiting] = useState(false);

  const handleChange = (event) => {
    if (
      Number(event.target.value) >= Number(miniEntry) &&
      Number(event.target.value) <= Number(maxEntry)
    ) {
      setErrorInput(false);
      setAmount(event.target.value);
    } else {
      setErrorInput(true);
    }
  };

  const handleClick = async () => {
    if (errorInput === false && isApproved === true) {
      try {
        setButtonIsWaiting(true);
        const stake = await contract.stake(poolInfo.id.toString(), amount);
        newStakerEvent();
      } catch (e) {
        setButtonIsWaiting(false);
        setErrorCount(errorCount + 1);
        setErrorCode(e.code);
      }
    } else if (isApproved === false) {
      const totalSupply = await tokenContract.totalSupply();
      try {
        setButtonIsWaiting(true);

        const approve = await tokenContract.approve(
          contract.address,
          totalSupply
        );
        approvalEvent();
      } catch (e) {
        setButtonIsWaiting(false);
        setErrorCount(errorCount + 1);
        setErrorCode(e.code);
      }
    }
  };
  const checkApproval = async () => {
    const allowance = await tokenContract.allowance(
      walletAddress,
      contract.address
    );
    if (Number(allowance.toString()) > 0) {
      setIsApproved(true);
    }
  };
  useEffect(() => {
    checkApproval();
  }, []);


  const approvalEvent = async () => {
    tokenContract?.on("Approval", async (owner, spender, value) => {
      if (owner === walletAddress) {
        console.log("Error")
        handleStakeClose();
        setTransactionConfirmed(transactionConfirmed + 1);
        setButtonIsWaiting(false);
      }
    });
  };

  const newStakerEvent = async () => {
    contract?.on("NewStaker", async (id, user) => {
      if (user === walletAddress) {
        console.log("Error")
        const detail = await contract.getIVPdetails(poolInfo.id);
        setPoolInfo(detail);
        handleStakeClose();
        setTransactionConfirmed(transactionConfirmed + 1);
        setButtonIsWaiting(false);
      }
    });
  };

  return (
    <>
      <NotificationProvider>
        
        <Box align={"center"}>
          <Input
            label="Enter the amount you want to stake"
            name="Test text Input"
            onBlur={function noRefCheck() {}}
            onChange={handleChange}
            style={{ marginBottom: "2rem" }}
            state={errorInput ? "error" : "initial"}
            errorMessage={errorInput ? "Enter a valid amount" : ""}
          />
          <LoadingButton
            loading={buttonIsWaiting}
            size="Medium"
            variant="contained"
            align={"center"}
            onClick={() => {
              handleClick();
            }}
            startIcon={<SavingsIcon sx={{ fontSize: 20 }} />}
          >
            {isApproved ? "Stake" : "Approve"}
          </LoadingButton>
        </Box>
      </NotificationProvider>
    </>
  );
}
