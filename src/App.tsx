import React from "react";

import ChatInterface from "./components/ChatInterface.tsx";
import backgroundImage from "./assets/images/Background.jpg";
import lightSaberDuel from "./assets/images/lightsaber_duel.gif";

const App = () => {
  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute top-4 left-4 flex items-center">
        <h1 className="text-4xl font-bold text-white">JedAI</h1>
        <img
          src={lightSaberDuel}
          alt="lightsaber"
          className="w-10 h-10 object-contain"
        />
      </div>
      <div className="h-full flex justify-center items-center">
        <ChatInterface />
      </div>
    </div>
  );
};

export default App;
