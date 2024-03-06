import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

import { CurrentUserProvider } from "./contexts/CurrentUserContext";

function App() {
  return (
    <div className="page">
      <Header />
      <CurrentUserProvider>
        <Main />
      </CurrentUserProvider>
      <Footer />
    </div>
  );
}

export default App;
