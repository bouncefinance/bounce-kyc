// import Test from './test'
import Page from './pages'
import './Font.css'
import './App.css'
import './assets/css/_modal.scss'
import { Reducer } from './redux'
import { ContextProvider } from "./reducer";
import { Web3Provider } from "@ethersproject/providers"
import { Web3ReactProvider } from "@web3-react/core"
import { BrowserRouter } from 'react-router-dom'
import { InitPage } from "./pages/InitPage";

function App() {
  const getLibrary = (provider) => {
    const library = new Web3Provider(provider);
    library.pollingInterval = 8000;
    return library;
  }

  return (

    <div className="App">
      <ContextProvider>
        <Reducer>
          <Web3ReactProvider getLibrary={getLibrary}>
            <InitPage />
            <BrowserRouter>
              {/* <Test /> */}
              <Page />
            </BrowserRouter>
          </Web3ReactProvider>
        </Reducer>
      </ContextProvider>
    </div>
  );
}

export default App;
