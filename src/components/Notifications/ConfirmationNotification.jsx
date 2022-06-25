import React from "react";
import { useNotification } from "web3uikit";
import { useEffect } from "react";
export default function ConfirmationNotification(props) {
  const dispatch = useNotification();
  const {confirmedTransactionCount} = props;
  const handleNewNotification = () => {
    dispatch({
      type: "success",
      message: "Transaction confirmed successfully",
      title: "Confirmation",
      position: "topR",
    });
  };
  useEffect(() => {
    if(confirmedTransactionCount > 0){
      handleNewNotification();
    }
    
  }, [confirmedTransactionCount]);

  return <></>;
}
