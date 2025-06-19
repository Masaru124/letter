import React, { useState, useRef, useEffect } from "react";
import "./LoveLetter.css";
import audioFile from "./rangreza.mp3";

const LoveLetter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullSize, setIsFullSize] = useState(false);
  const twoYearsInSeconds = 2 * 365 * 24 * 3600;
  const [timer, setTimer] = useState(twoYearsInSeconds);
  const [timerStarted, setTimerStarted] = useState(false);
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isOpen && !timerStarted) {
      console.log("Starting timer");
      setTimerStarted(true);
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          console.log("Timer tick", prev + 1);
          return prev + 1;
        });
      }, 1000);
    }
    if (!isOpen && timerStarted) {
      console.log("Stopping timer");
      clearInterval(timerRef.current);
      setTimerStarted(false);
      // Do not reset timer to 0, keep running continuously
      // setTimer(0);
    }
    return () => {
      console.log("Cleaning up timer");
      clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days} days ${hours} hours ${minutes} minutes ${secs} seconds`;
  };

  const handleOpenLetter = () => {
    setIsOpen(true);
    setTimeout(() => {
      setIsFullSize(true);
      // Ensuring audio play is directly a result of this user interaction
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => console.log("Playback succeeded"))
          .catch((e) => console.error("Playback failed:", e));
      }
    }, 800);
  };

  const handleCloseLetter = () => {
    setIsFullSize(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsOpen(false);
    }, 800);
  };

  return (
    <>
      <div
        className={`envelope ${isOpen ? "open" : ""}`}
        onClick={!isFullSize ? handleOpenLetter : handleCloseLetter}
      >
        <div className="flap"></div>
        <div className="body"></div>
        <div className={`letter ${isFullSize ? "fullSize" : ""}`}>
          My dearest Love 💙,
          <br />
          <br />
          Your essence flows like blood through my veins,
          <br />
          A mystery I long to understand, with no restraint.
          <br />
          <br />
          Each time I see the beauty of delicate clothes and jhumkas,
          <br />
          I can't help but imagine how they'd shine on you—
          <br />
          Like the shimmer of moonlight on a tranquil sea.
          <br />
          <br />
          I breathe easier with your presence, my heart racing,
          <br />
          Every word I speak finds itself lost in your name.
          <br />
          <br />
          There's nothing left of me but you,
          <br />
          Like a flame reduced to ash,
          <br />
          A match burnt, yet still longing for warmth.
          <br />
          <br />
          But with every thought of you,
          <br />
          I find a spark alive, glowing even in the dark.
          <br />
          <br />
          Darling, loving you is like loving the moon—
          <br />
          A quiet madness that consumes me,
          <br />
          Turning me into a lunatic,
          <br />
          And I'd surrender, gladly, to your pull.
        </div>

        <audio
          ref={audioRef}
          src={audioFile}
          onError={(e) => console.error("Audio error:", e.message)}
        />
      </div>
      {isOpen && (
        <div className="heart-timer">
          <span>First time I saw you:</span>
          <br />
          <span className="timer">{formatTime(timer)}</span>
        </div>
      )}
    </>
  );
};

export default LoveLetter;
