import React from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";
import { Input } from "web3uikit";
import useStyles from "../style";
import PoolCard from "./stake/PoolCard";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";

export default function Stake(props) {
  const { contract, signer, tokenContract,walletAddress } = props;
  const classes = useStyles();
  const [sortBy, setSoryBy] = useState(1);


  
  const handleChange = (event) => {
   
    setSoryBy(event.target.value);
  };
  const [pools, setPools] = useState([]);

  const getAllIVP = async () => {
    if (sortBy === 1) {
      const allIVP = await contract.getLiveIVP();
      setPools(allIVP);
    } else {
      const allIVP = await contract.getEndIVP();
      setPools(allIVP);
    }
  };

  const getPoolDetail = async (e) => {
    const detail = await contract.getIVPdetails(Number(e.target.value));
    if (detail.id.toString() !== "0") {
      setPools([detail]);
    }
    else {
      setPools([]);
    }
  
  };

  useEffect(() => {
    getAllIVP();
  }, [sortBy]);

  return (
    <Container maxWidth="lg" className={classes.heroContainer}>
      <Grid container spacing={2} className={classes.gridContainer}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          className={classes.searchBarGrid}
          align={"center"}
        >
          <Input
            className={classes.searchBar}
            label="Search by pool ID"
            name="Test text Input"
            // onBlur={}
            onChange={getPoolDetail}
            //  value={"fefe"}
          />
        </Grid>
        <Grid item xs={10} sm={12} md={12} align={"right"}>
          <Box
            sx={{
              // minWidth: { xs: 120, sm: 160, md: 200 },
              maxWidth: { xs: 120, sm: 160, md: 200 },
              width: { xs: 40, sm: 100, md: 100 },
            }}
            // mt={2}
          >
            <FormControl sx={{ width: 100 }}>
              <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortBy}
                label="Sort By"
                onChange={handleChange}
              >
                <MenuItem value={1}>Live</MenuItem>
                <MenuItem value={2}>End</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <Box align={"center"}>
        <Grid
          container
          className={classes.cardsContainer}
          align={"center"}
          spacing={7}
        >
          {pools.map((pool) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              className={classes.cardGrid}
              key={pool}
            >
              <PoolCard
                contract={contract}
                signer={signer}
                key={pool}
                pool={pool}
                setPools={setPools}
                sortBy={sortBy}
                tokenContract={tokenContract}
                walletAddress={walletAddress}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
//xs, sm, md, lg, and xl
