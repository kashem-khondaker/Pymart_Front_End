import React, { useEffect, useState } from "react";

const DiscountTimer = () => {
  const tergetDate = new Date().getTime() + 1000 * 60 * 60 * 24 * 30; // 30 days from now
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const different = tergetDate - now;
    const days = Math.floor(different / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (different % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((different % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((different % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  return (
    <div className="flex justify-center md:justify-start space-x-8 text-2xl font-semibold my-6">
      <div>
        <span className="text-3xl text-pink-500">{timeLeft.days}</span>
        <br />
        Days
      </div>
      <div>
        <span className="text-3xl text-pink-500">{timeLeft.hours}</span>
        <br />
        Hrs
      </div>
      <div>
        <span className="text-3xl text-pink-500">{timeLeft.minutes}</span>
        <br />
        Min
      </div>
      <div>
        <span className="text-3xl text-pink-500">{timeLeft.seconds}</span>
        <br />
        Sec
      </div>
    </div>
  );
};

export default DiscountTimer;
