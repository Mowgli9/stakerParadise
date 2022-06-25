import React from "react";
import { NotificationProvider, useNotification } from "web3uikit";
import { useEffect } from "react";
export default function ErrorNotifications(props) {
  const { errorCode, errorCount } = props;

  const dispatch = useNotification();
  const handleNewNotification = (type, icon, position, message, title) => {
    dispatch({
      type,
      message: message,
      title: title,

      position: position || "topR",
    });
  };

  useEffect(() => {
    
    switch (errorCode) {
      case 4001:
      
        handleNewNotification(
          "error",
          "error",
          "topR",
          "Request rejected by the user",
          "Rejection"
        );
        break;
      case 4200:
        handleNewNotification(
          "error",
          "error",
          "topR",
          "The requested method is not supported by this Ethereum provider",
          "restricted "
        );
        break;
      case 4900:
        handleNewNotification(
          "error",
          "error",
          "topR",
          "you're disconnected from all chains",
          "Not connected"
        );
        break;
      case 4901:
        handleNewNotification(
          "error",
          "error",
          "topR",
          "Please switch your network",
          "Connection Error"
        );
        break;
      case 32602:
        handleNewNotification(
          "error",
          "error",
          "topR",
          "Invalid parametres.",
          "Failed "
        );
        break;
      case 32600:
        handleNewNotification(
          "error",
          "error",
          "topR",
          "The JSON sent is not a valid Request object",
          "Wrong inputs "
        );
        break;
      case 32000:
        handleNewNotification(
          "error",
          "error",
          "topR",
          "Invalid input.",
          "Failed "
        );
        break;
      case 32003:
        handleNewNotification(
          "error",
          "error",
          "topR",
          "Transaction rejected",
          "Error "
        );
        break;
      case 32603:
        handleNewNotification(
          "error",
          "error",
          "topR",
          "Transaction Failed",
          "Error "
        );
        break;
      default:
        break;
    }
  }, [errorCount]);
  return <></>;
}
