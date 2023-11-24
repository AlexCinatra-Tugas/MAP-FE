import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MissionPage from "./pages/MissionPage";

const App = () => {
  return (
    <div className='bg-[#000011] text-white overflow-auto max-h-screen max-w-screen'>
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={HomePage} />
          <Route path='/mission' Component={MissionPage} />
          {/* <Route path='/' Component={HomePage} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
