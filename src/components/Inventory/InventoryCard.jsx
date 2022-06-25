import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
// yarn add @mui/lab @mui/material
import BannerImg from "../../resources/images/tokenImage (900 × 700 px).png";
import { Input } from "web3uikit";
import CheckIcon from "@mui/icons-material/Check";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CountDown from "../stake/CountDown";
import LoadingButton from "@mui/lab/LoadingButton";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MoreInfo from "../stake/MoreInfo";
import { useState, useEffect } from "react";
import ErrorNotifications from "../Notifications/ErrorNotifications";
import { NotificationProvider } from "web3uikit";
import ConfirmationNotification from "../Notifications/ConfirmationNotification";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "2rem",
  borderRadius: "16px",
  alignItems: "center",
};

export default function InventoryCard(props) {
  const { poolInfo, contract, signer,walletAddress } = props;
  const [showMoreModal, setShowMoreModal] = useState(false);
  const handleOpen = () => setShowMoreModal(true);
  const handleClose = () => setShowMoreModal(false);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [metaMaskErrors, setMetaMaskErrors] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);
  const [transactionConfirmed, setTransactionConfirmed] = useState(0);

  useEffect(() => {
    const renderUserTransactionCount = async () => {
      const userTransactionCount = await signer?.getTransactionCount();
      setTransactionCount(userTransactionCount);
    };
    renderUserTransactionCount();
  }, [transactionConfirmed]);

  const handleClick = async () => {
    try {
      setIsButtonLoading(true);
      const unsatake_tx = await contract.unstake(poolInfo.id);
       unstakeEvent()
    } catch (e) {
      setMetaMaskErrors(e.code);
      setErrorCount(errorCount + 1);
      setIsButtonLoading(false);
    }

   
  };

  const isTimeToStake = async () => {
    const now = new Date() / 1000;

    const stakeEndAt =
      Number(poolInfo.depositTime) + Number(poolInfo.stakeTime);
    if (now > stakeEndAt * 86400 + Number(poolInfo.createdAt.toString())) {
      setButtonIsDisabled(false);
    }
  };

  const isUserStillStaker = async () => {
    const userBalance = await contract.userBalanceInPool(
      walletAddress,
      poolInfo.id.toString()
    );
    if (userBalance.toString() === "0") {
      setButtonIsDisabled(true);
    }
  };
  
  
  const unstakeEvent = async()=>{
    contract?.on("Unstaked", async (id, user) => {
    if (user === walletAddress) {
      setIsButtonLoading(false);
      setTransactionConfirmed(transactionConfirmed + 1);
    }
  });
  }
  

  useEffect(() => {
    isTimeToStake();
    isUserStillStaker();
  }, []);

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
        <Modal
          open={showMoreModal}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: { xs: 300, sm: 400, md: 600 } }}>
            <Typography variant="h6" gutterBottom>
              More details about the pool #{poolInfo?.id.toString()}
            </Typography>
            <MoreInfo poolInfo={poolInfo} />
          </Box>
        </Modal>
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
            <Typography variant="h6" component="div">
              Investment Pool #{poolInfo.id.toString()}
            </Typography>
            <Typography gutterBottom>
              {/* <Chip
                label={poolInfo?.status.toString() === "0" ? "Live" : "Ended"}
                variant="outlined"
                color={poolInfo?.status.toString() === "0" ? "success" : "error"}
                size="small"
              /> */}
            </Typography>
            <Typography gutterBottom variant="subtitle2">
              Staking end at :
            </Typography>

            <Typography
              gutterBottom
              variant="subtitle2"
              component="span"
              sx={{ color: "#F7B93F" }}
            >
              <CountDown
                timeInDays={
                  Number(poolInfo.depositTime.toString()) +
                  Number(poolInfo.stakeTime.toString())
                }
                createdAt={poolInfo.createdAt.toString()}
              ></CountDown>
            </Typography>
          </CardContent>
          <CardActions
            sx={{ marginBottom: 1, marginLeft: "30px", alignItems: "center" }}
            align={"center"}
          >
            <LoadingButton
              loading={isButtonLoading}
              size="Medium"
              variant="contained"
              onClick={() => {
                handleClick();
              }}
              startIcon={<CheckIcon sx={{ fontSize: 20 }} />}
              disabled={buttonIsDisabled}
            >
              Unsatake
            </LoadingButton>
            <Button
              size="Small"
              variant="outlined"
              endIcon={<AccountBalanceWalletIcon sx={{ fontSize: 20 }} />}
              onClick={() => {
                handleOpen();
              }}
            >
              show more
            </Button>
          </CardActions>
        </Card>
      </NotificationProvider>
    </>
  );
}
