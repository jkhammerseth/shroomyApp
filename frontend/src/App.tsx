import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import styled from "styled-components";
import NavigationHeader from "./components/navigation/NavigationHeader";
import LandingPage from "./components/pages/home/Home";
import PredictionPage from "./components/pages/prediction/PredictionPage";
import SearchPage from "./components/pages/search/SearchPage";

function App() {
  return (
    <AppWrapper>
      <BrowserRouter>
        <NavigationHeader />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/prediction" element={<PredictionPage />} />
          <Route path="/*" element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
      <StyledFooter>
        <p>&copy; {"Gruppe 1 - DAT251 - 2023"}</p>
      </StyledFooter>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div``;

const StyledFooter = styled.footer`
  text-align: center;
`;
