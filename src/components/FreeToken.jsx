import React from "react";
import Paper from "@mui/material/Paper";
import FreeTokenCard from "./free_tokens/FreeTokenCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { NotificationProvider } from "web3uikit";
export default function FreeToken(props) {
  const {
    contract,
    tkn1Address,
    signer,
    walletAddress,
    tkn1Contract2,
    tkn1Contract3,
    tkn1Address2,
    tkn1Address3
  } = props;
  return (
    <>
      <Typography variant="h4" gutterBottom sx={{}} align={"center"} mt={3}>
        Get Free Token{" "}
      </Typography>
      <Grid container spacing={3} align={"center"} mt={1}>
        <Grid item xs={12} sm={6} md={4}>
          <FreeTokenCard
            tokenName={"FT1"}
            contract={contract}
            tkn1Address={tkn1Address}
            signer={signer}
            walletAddress={walletAddress}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FreeTokenCard
            tokenName={"TN2"}
            contract={tkn1Contract2}
            tkn1Address={tkn1Address2}
            signer={signer}
            walletAddress={walletAddress}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FreeTokenCard
            tokenName={"TN3"}
            contract={tkn1Contract3}
            tkn1Address={tkn1Address3}
            signer={signer}
            walletAddress={walletAddress}
          />
        </Grid>
      </Grid>
    </>
  );
}
