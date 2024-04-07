import React from "react";
import Main from "./component/Main";
import { Route, Routes } from "react-router-dom";
import Signin from "./component/Signin";
import Connection from "./component/Connection";
import Invitation from "./component/Invitation";
import Network from "./component/Network";
import Message from "./component/Message";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/main" element={<Main />} />
        <Route path="/connect" element={<Connection />} />
        <Route path="/invite" element={<Invitation />} />
        <Route path="/network" element={<Network />} />
        <Route path="/chat" element={<Message />} />
      </Routes>
    </div>
  );
}

export default App;
