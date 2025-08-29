import './assets/css/App.css'
import {Route, Routes} from "react-router-dom";
import Header from "./Components/Header.tsx";
import HomePage from "./Pages/HomePage.tsx";
import UserPage from "./Pages/UserPage.tsx";

function App() {

  return (
        <>
          <Header/>
          <Routes>
              <Route path={""} element={<HomePage/>}></Route>
              <Route path={`/userPage`} element={<UserPage/>}></Route>
          </Routes>

        </>
    )
}

export default App
