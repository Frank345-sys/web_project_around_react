import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

import { ApiProvider } from "./contexts/CurrentUserContext";

function App() {
  return (
    <div className="page">
      <Header></Header>
      <ApiProvider>
        <Main />
      </ApiProvider>
      <Footer></Footer>
    </div>
  );
}

export default App;
