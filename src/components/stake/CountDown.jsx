import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

export default function CountDown(props) {
  const { timeInDays, createdAt } = props;
  const [currentTime, setCurrentTime] = useState(Math.floor(Date.now() / 1000));

  const targetTime = Number(timeInDays * 86400) + Number(createdAt);
  const timeBetween = targetTime - currentTime;
  const seconds = Math.floor(timeBetween % 60);
  const minutes = Math.floor((timeBetween / 60) % 60);
  const hours = Math.floor((timeBetween / (60 * 60)) % 24);
  const days = Math.floor(timeBetween / (60 * 60 * 24));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Typography variant="body2" color="text.primary">
        {timeBetween > 0
          ? `${days} d, ${hours} h, ${minutes} min, ${seconds} s`
          : "0 d, 0 h, 0 min, 0 s"}
      </Typography>
    </>
  );
}
