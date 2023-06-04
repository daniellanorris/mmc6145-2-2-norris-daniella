
import React, { useState } from "react";
// import { start } from "repl";
import CardGame from "./components/cardGame";
import Header from "./components/header";
import Modal from "./components/modal";
import { useTimer } from "./util/customHooks";

export default function App({ }) {
  const [showModal, setShowModal] = useState(false);

  const {
    time,
    start: timerStart,
    stop: timerStop,
    reset: timerReset,
  } = useTimer();

  const [bestTime, setBestTime] = useState(0)
 
  const [previousTime, setPreviousTime] = useState(0)

  function onGameStart() {
    timerStart()
    
    
  }

  function onGameEnd() {
    timerStop();
    timerReset();
  
    if (previousTime) {
      setPreviousTime(time);
    }
  
    if (bestTime === 0 || time < bestTime) {
      setBestTime(time);
      setPreviousTime(time)
    }
  
    return { previousTime, bestTime };
  }
  const cardTexts = [
    "Bunny 🐰",
    "Frog 🐸",
    "Panda 🐼",
    "Doggy 🐶",
    "Kitty 😺",
    "Duck 🦆",
  ];

  return (
    <>
      <Header
        // add time, bestTime, previousTime props
        time={time}
        bestTime= {bestTime}
        previousTime={previousTime}
        openModal={() => setShowModal(true)}
      />

      <CardGame
        // add onGameStart, onGameEnd props
        onGameStart={onGameStart}
        onGameEnd={onGameEnd}
        cardTexts={cardTexts}
      />
      <Modal isShown={showModal} close={() => setShowModal(false)} />
    </>
  );
}

