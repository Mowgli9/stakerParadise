import React from "react";
import NavBar from "./components/NavBar";
import Stake from "./components/Stake";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import FreeToken from "./components/FreeToken";
import Inventory from "./components/Inventory";
import stakerParadiseAbi from "./contracts/StakerParadise.json";
import tkn1Abi from "./contracts/FreeToken1.json";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

const staker_paradise_abi = stakerParadiseAbi.abi;
const tkn1_abi = tkn1Abi.abi;
const stakerParadiseAddress = "0x2aFA49A08AAC17992C6E0103bAA056D03d3eeD14";
const tkn1Address = "0xbd581234CBa1d85FF6Cac3317eEbFa9a889ee0f4";
const tkn1Address2 = "0x120E02C2BFe7eE4F1eaf0274b653Ae05FC685600";
const tkn1Address3 = "0xB7188Dd8Cfdf593BFbdB025fd6AC3036D43e6c20";
const sptAddress ="0x7fd745D5869Fc8c4afd50ffDe85dF8341337bfC5"

export default function App() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const [walletAddress, setWalletAddress] = useState("");

  const stakerParadisecontract = new ethers.Contract(
    stakerParadiseAddress,
    staker_paradise_abi,
    signer
  );

  const tkn1Contract = new ethers.Contract(tkn1Address, tkn1_abi, signer);
  const tkn1Contract2 = new ethers.Contract(tkn1Address2, tkn1_abi, signer);
  const tkn1Contract3 = new ethers.Contract(tkn1Address3, tkn1_abi, signer);

  const getAddress = async () => {
    const wallet_address = await signer.getAddress();
    setWalletAddress(wallet_address);
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home sptAddress={sptAddress}></Home>} />
          <Route
            path="/stake"
            element={
              <Stake
                contract={stakerParadisecontract}
                signer={signer}
                walletAddress={walletAddress}
                tokenContract={tkn1Contract}
              />
            }
          />
          <Route
            path="/free-tokens"
            element={
              <FreeToken
                contract={tkn1Contract}
                tkn1Address={tkn1Address}
                walletAddress={walletAddress}
                signer={signer}
                tkn1Contract2={tkn1Contract2}
                tkn1Contract3={tkn1Contract3}
                tkn1Address2={tkn1Address2}
                tkn1Address3={tkn1Address3}
              ></FreeToken>
            }
          />
          <Route
            path="/inventory"
            element={
              <Inventory
                contract={stakerParadisecontract}
                signer={signer}
                walletAddress={walletAddress}
                tokenContract={tkn1Contract}
              ></Inventory>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
