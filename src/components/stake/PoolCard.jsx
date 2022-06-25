import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BannerImg from "../../resources/images/tokenImage (900 × 700 px).png";
import LinearProgress from "@mui/material/LinearProgress";
import useStyles from "../../style";
import CountDown from "./CountDown";
import Chip from "@mui/material/Chip";
import { useEffect, useState } from "react";
import MoreInfo from "./MoreInfo";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import StakeInfo from "./StakeInfo";
import SavingsIcon from "@mui/icons-material/Savings";
import PreviewIcon from "@mui/icons-material/Preview";
import { ethers } from "ethers";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import erc20 from "../../contracts/erc20.json";
import ConfirmationNotification from "../Notifications/ConfirmationNotification";
import { NotificationProvider } from "web3uikit";
import ErrorNotifications from "../Notifications/ErrorNotifications";
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

export default function PoolCard(props) {
  const { contract, pool, tokenContract, signer, walletAddress} = props;
  const currentTime = new Date() / 1000;

  const classes = useStyles();
  const [showMoreModal, setShowMoreModal] = useState(false);
  const handleOpen = () => setShowMoreModal(true);
  const handleClose = () => setShowMoreModal(false);
  const [stakeModal, setStaleModal] = useState(false);
  const handleStakeOpen = () => setStaleModal(true);
  const handleStakeClose = () => setStaleModal(false);
  const [poolInfo, setPoolInfo] = useState(pool);
  const [canStake, setCanStake] = useState(false);
  const [tokenSymbole, setTokenSymbole] = useState("");
  const [transactionConfirmed, setTransactionConfirmed] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [errorCode, setErrorCode] = useState(0);

  const userCanStake = async () => {
    const endAt = Number(pool.depositTime) * 86400 + Number(pool.createdAt);
    const now = new Date() / 1000;
    if (now > endAt) {
      setCanStake(true);
    }
  };

  const getTokenSymbole = async () => {
    const tokenContract = new ethers.Contract(
      poolInfo.tokenAddress.toString(),
      erc20,
      signer
    );
    const symbole = await tokenContract.symbol();
    setTokenSymbole(symbole);
  };

  useEffect(() => {
    userCanStake();
    getTokenSymbole();
  }, []);

  return (
    <>
      <NotificationProvider>
        <ErrorNotifications
          errorCode={errorCode}
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
            <MoreInfo poolInfo={poolInfo} tokenSymbole={tokenSymbole} />
          </Box>
        </Modal>
        <Modal
          open={stakeModal}
          onClose={handleStakeClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
          sx={{ borderRadius: "20px" }}
          align={"center"}
        >
          <Box sx={{ ...style, width: { xs: 300, sm: 400, md: 400 } }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2.5 }}>
              You will stake in the pool #{poolInfo?.id.toString()}
            </Typography>
            <StakeInfo
              setPoolInfo={setPoolInfo}
              handleStakeClose={handleStakeClose}
              poolInfo={poolInfo}
              signer={signer}
              contract={contract}
              tokenContract={tokenContract}
              setTransactionConfirmed={setTransactionConfirmed}
              setErrorCount={setErrorCount}
              setErrorCode={setErrorCode}
              transactionConfirmed={transactionConfirmed}
              walletAddress={walletAddress}
            />
          </Box>
        </Modal>

        <Card sx={{ maxWidth: 345, borderRadius: "16px" }} elevation={4}>
          <CardMedia
            component="img"
            height="250"
            // width="250"
            image={BannerImg}
            alt="green iguana"
          />
          <CardContent>
            <Tooltip title="Pool ID" placement="right" arrow>
              <Typography gutterBottom variant="h5" component="div">
                Investment Pool #{poolInfo?.id.toString()}
              </Typography>
            </Tooltip>
            {currentTime <
            Number(poolInfo?.depositTime.toString()) * 86400 +
              Number(poolInfo?.createdAt.toString()) ? (
              <Chip
                label={"Live"}
                variant="outlined"
                color="success"
                size="small"
              />
            ) : (
              <Chip
                label={"Ended"}
                variant="outlined"
                color="error"
                size="small"
              />
            )}

            <Typography variant="body1" color="text.secondary" gutterBottom>
              Token : <span>{tokenSymbole} </span>
            </Typography>

            <LinearProgress
              variant="determinate"
              value={(poolInfo?.currentBalance * 100) / poolInfo?.maxSupply}
            />

            <Typography variant="body2" color="text.primary" gutterBottom>
              <Typography component="span">
                <Grid container>
                  <Grid item xs={6} sm={6} md={6} lg={6} align={"left"}>
                    <Tooltip title="Current Stake" placement="bottom" arrow>
                      <Typography component="span">
                        {poolInfo?.currentBalance.toString()}
                      </Typography>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6} sm={6} md={6} lg={6} align="right">
                    <Tooltip title="Target " placement="bottom" arrow>
                      <span>{poolInfo?.maxSupply.toString()}</span>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Minimum Entry : <span>{poolInfo?.minDeposit.toString()}</span>
            </Typography>

            <Typography variant="body2" color="text.secondary" gutterBottom>
              Deposit End in :{" "}
              <span>
                <CountDown
                  timeInDays={poolInfo?.depositTime.toString()}
                  createdAt={poolInfo?.createdAt.toString()}
                />
              </span>
            </Typography>
          </CardContent>
          <CardActions sx={{ marginBottom: 1, marginLeft: "30px" }}>
            <Grid container>
              <Grid item xs={5} sm={5} md={5} lg={5} align={"center"}>
                <Button
                  size="Medium"
                  variant="contained"
                  onClick={() => {
                    handleStakeOpen();
                  }}
                  disabled={canStake}
                  startIcon={<SavingsIcon sx={{ fontSize: 20 }} />}
                >
                  Stake
                </Button>
              </Grid>
              <Grid item xs={7} sm={7} md={7} lg={7} align={"left"}>
                <Button
                  size="Medium"
                  variant="outlined"
                  onClick={() => {
                    handleOpen();
                  }}
                  // startIcon={<PreviewIcon sx={{ fontSize: 20 }} />}
                >
                  Show More
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </NotificationProvider>
    </>
  );
}
