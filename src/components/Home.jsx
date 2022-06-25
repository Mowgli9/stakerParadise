import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import image from "../resources/images/SPT2.png";
import waiting from "../resources/images/waiting model 1.png";
import stakinImage from "../resources/images/staking.png";
import earn from "../resources/images/earn model 1.png";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import SavingsIcon from "@mui/icons-material/Savings";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArticleIcon from "@mui/icons-material/Article";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";

import TelegramIcon from "@mui/icons-material/Telegram";
export default function Home(props) {
  const {sptAddress} = props
  // import  Token to metamask
  const addToken = async () => {
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      const wasAdded = await window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20", // Initially only supports ERC20, but eventually more!
          options: {
            address: "0x7fd745D5869Fc8c4afd50ffDe85dF8341337bfC5", // The address that the token is at.
            symbol: "SPT", // A ticker symbol or shorthand, up to 5 chars.
            decimals: 18, // The number of decimals in the token
            image:  "https://i.ibb.co/hMcX17m/sPTTKEN.png"// A string url of the token logo
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
  return (
    <>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} sm={6} md={6} lg={6} align={"center"}>
            <Box sx={{ marginTop: { xs: 5, sm: 7, md: 10 } }}>
              {" "}
              <Typography
                gutterBottom
                variant="h3"
                sx={{
                  fontFamily: "Crete Round",
                  fontSize: { xs: 30, sm: 35, md: 45 },
                }}
              >
                <Typography variant="span" sx={{ paddingLeft: 2 }}>
                  Sow
                </Typography>
                <Typography
                  variant="span"
                  sx={{ paddingLeft: 2, color: "#1976D2" }}
                >
                  Tokens
                </Typography>
                <br></br>
                <Typography variant="span" sx={{ paddingLeft: 2 }}>
                  Reap
                </Typography>
                <Typography
                  variant="span"
                  sx={{ paddingLeft: 2, color: "#1976D2" }}
                >
                  Tokens & SPT
                </Typography>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  px: 4,
                  paddingTop: 2,
                  fontFamily: "Inconsolata",
                  fontSize: { xs: 15, sm: 20, md: 20 },
                }}
              >
                The easiest way to earn the SPT token is entering to our
                investments pool and stake some specific tokens and the reward
                pool will be shared between the stakers.
              </Typography>
              <Grid container sx={{ marginTop: 4 }}>
                <Grid item xs={6} sm={6} md={6} lg={6} align={"right"}>
                <Link to="/stake" style={{ textDecoration: "none" }}>

                  <Button
                    size="Medium"
                    variant="contained"
                    align={"center"}
                    startIcon={<SavingsIcon sx={{ fontSize: 20 }} />}
                    
                  >
                    {" "}
                    Stake
                  </Button>
                  </Link>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  lg={6}
                  align={"left"}
                  sx={{ paddingLeft: 1 }}
                >
                  <Button
                    variant="outlined"
                    endIcon={<AccountBalanceWalletIcon sx={{ fontSize: 20 }} />}
                    size="Medium"
                    onClick={()=>{
                      addToken()
                    }}
                  >
                    {" "}
                    Add to{" "}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={6}
            align={"center"}
            sx={{ marginTop: { xs: 2, sm: 5, md: 10 } }}
          >
            <ImageList cols={1}>
              <ImageListItem>
                <img src={image} alt={"spt"} />
              </ImageListItem>
            </ImageList>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            marginTop: { md: 4, sm: 4, xs: 4 },
            marginBottom: { md: 2, sm: 2, xs: 2 },
          }}
        >
          <Grid item xs={12} sm={12} md={12} lg={12} align={"center"}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Crete Round",
                fontSize: { xs: 30, sm: 35, md: 40 },
              }}
            >
              Easy Steps ...
            </Typography>
          </Grid>
          <Grid container sx={{ marginTop: { xs: 5, sm: 7, md: 10 } }}>
            <Grid xs={12} sm={6} md={4} item sx={{ paddingBottom: { xs: 2 } }}>
              <Card
                sx={{
                  maxWidth: 345,
                  borderRadius: "16px",
                  alignItems: "center",
                }}
                md={{ width: 200 }}
                elevation={5}
                align={"center"}
              >
                <CardMedia
                  component="img"
                  // height="250"
                  // width="250"
                  image={stakinImage}
                  alt="green iguana"
                />
                <CardContent align={"center"}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontFamily: "Crete Round", color: "#1565C0" }}
                  >
                    Stake
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    component="span"
                    sx={{ px: 2, fontFamily: "Inconsolata" }}
                  >
                    Stake the token required by the pool before the deposit time
                    end and before the max supply reached.
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    marginBottom: 1,
                    marginLeft: "30px",
                    alignItems: "center",
                  }}
                  align={"center"}
                >
                  <Button
                    size="Small"
                    variant="outlined"
                    endIcon={<ArticleIcon sx={{ fontSize: 20 }} />}
                  >
                    Docs
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid xs={12} sm={6} md={4} item sx={{ paddingBottom: { xs: 2 } }}>
              <Card
                sx={{
                  maxWidth: 345,
                  borderRadius: "16px",
                  alignItems: "center",
                }}
                md={{ width: 200 }}
                elevation={5}
                align={"center"}
              >
                <CardMedia
                  component="img"
                  // height="250"
                  // width="250"
                  image={waiting}
                  alt="green iguana"
                />
                <CardContent align={"center"}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontFamily: "Crete Round", color: "#1565C0" }}
                  >
                    Wait
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    component="span"
                    sx={{ px: 2, fontFamily: "Inconsolata" }}
                  >
                    Wait until the staking time end, which is declaring by the
                    owner, and it can be different each time.
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    marginBottom: 1,
                    marginLeft: "30px",
                    alignItems: "center",
                  }}
                  align={"center"}
                >
                  <Button
                    size="Small"
                    variant="outlined"
                    endIcon={<ArticleIcon sx={{ fontSize: 20 }} />}
                  >
                    Docs
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid xs={12} sm={6} md={4} item sx={{ paddingBottom: { xs: 2 } }}>
              <Card
                sx={{
                  maxWidth: 345,
                  borderRadius: "16px",
                  alignItems: "center",
                }}
                md={{ width: 200 }}
                elevation={5}
                align={"center"}
              >
                <CardMedia
                  component="img"
                  // height="250"
                  // width="250"
                  image={earn}
                  alt="green iguana"
                />
                <CardContent align={"center"}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontFamily: "Crete Round", color: "#1565C0" }}
                  >
                    Claim
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="subtitle2"
                    component="span"
                    sx={{ px: 2, fontFamily: "Inconsolata" }}
                  >
                    After the staking time end, stakers can withdraw their
                    tokens and claim SPT token as reward.
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    marginBottom: 1,
                    marginLeft: "30px",
                    alignItems: "center",
                  }}
                  align={"center"}
                >
                  <Button
                    size="Small"
                    variant="outlined"
                    endIcon={<ArticleIcon sx={{ fontSize: 20 }} />}
                  >
                    Docs
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} align="center">
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Crete Round",
                fontSize: { xs: 30, sm: 35, md: 40 },
              }}
            >
              Project overview
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={12}
            sx={{ marginTop: 10 }}
            align={"center"}
          >
            <Card
              sx={{
                maxWidth: 600,
                borderRadius: "16px",
                alignItems: "center",
              }}
              md={{ width: 200 }}
              elevation={5}
              align={"center"}
            >
              <CardContent align={"center"}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ fontFamily: "Crete Round", color: "#1565C0" }}
                >
                  Staker Paradise
                </Typography>
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  component="span"
                  sx={{ px: 2, fontFamily: "Inconsolata" }}
                >
                  This project is a yield farming. The owner of this contract
                  can create an investment pool given arguments like deposit
                  time and which token will be staked etc... Then stakers can
                  stake the token for a time (set by the owner) then they can
                  unstake their tokens and claim the reward pool (set by the
                  owner) and calculated by the smart contract (
                  TotalDeposit/userDeposit ) . I created this from scratch and I
                  will make it open source. I'm ready to make your web3 project
                  (everything). Contact me on Telegram or Email
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  marginBottom: 1,
                  
                  alignItems: "center",
                }}
                align={"center"}
              >
                <Button
                  size="Small"
                  variant="contained"
                  endIcon={<GitHubIcon sx={{ fontSize: 20 }} />}
                  href=""
                >
                  Source
                </Button>
                <Button
                  size="Small"
                  variant="outlined"
                  endIcon={<TelegramIcon sx={{ fontSize: 20 }} />}
                >
                  Telegram
                </Button>
                <Button
                  size="Small"
                  variant="outlined"
                  endIcon={<MailIcon sx={{ fontSize: 20 }} />}
                >
                  email
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Grid container sx={{ marginTop: 10 }}>
        <Grid item xs={12} sm={12} md={12} lg={12} align={"center"}>
          <Box sx={{ backgroundColor: "#1976D2" ,py:2}}>
            <Typography variant="body1" gutterBottom sx={{fontFamily: "Inconsolata"}}>
                Created  with ❤️ by Mowgli
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
