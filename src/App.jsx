
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


  console.log(useTimer.timerId)
  const previousTime = time


  function onGameStart() {
    timerReset()
    timerStart()
  }

  function onGameEnd() {
    timerStop()
    if (bestTime > previousTime) {
      setBestTime()
    }
    if (bestTime === 0) {
      setBestTime(previousTime)
    }
    return { previousTime, bestTime }
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

