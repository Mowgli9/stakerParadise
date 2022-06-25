import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CountDown from "./CountDown";
import Chip from "@mui/material/Chip";
import { Typography } from "web3uikit";
export default function MoreInfo(props) {
  const { poolInfo ,tokenSymbole} = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 250 }} aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell>Token Name : </TableCell>
            <TableCell align="left">{tokenSymbole}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Token Address : </TableCell>
            <TableCell align="left">
              <Typography
                copyable
                onCopy={function noRefCheck() {}}
                variant="span"
              >
                {`${poolInfo.tokenAddress
                  .toString()
                  .slice(0, 6)}...${poolInfo.tokenAddress
                  .toString()
                  .slice(
                    poolInfo.tokenAddress.toString().length - 6,
                    poolInfo.tokenAddress.toString().length
                  )}`}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Deposit End : </TableCell>
            <TableCell align="left">
              <CountDown
                timeInDays={poolInfo.depositTime.toString()}
                createdAt={poolInfo.createdAt.toString()}
              ></CountDown>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Max Supply : </TableCell>
            <TableCell align="left">{poolInfo.maxSupply.toString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Min Deposit : </TableCell>
            <TableCell align="left">{poolInfo.minDeposit.toString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Token Reward : </TableCell>
            <TableCell align="left">
              {poolInfo.amountOfTokenReward.toString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Current Balance : </TableCell>
            <TableCell align="left">
              {poolInfo.currentBalance.toString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Staking Time (days) </TableCell>
            <TableCell align="left">
              
              <CountDown
                timeInDays={
                  Number(poolInfo.depositTime.toString()) +
                  Number(poolInfo.stakeTime.toString())
                }
                createdAt={poolInfo.createdAt.toString()}
              ></CountDown>
            </TableCell>
          </TableRow>
  
        </TableBody>
      </Table>
    </TableContainer>
  );
}
