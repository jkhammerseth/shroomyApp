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

export const StyledBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.3;
  z-index: -1;
  filter: contrast(130%) brightness(550%);
  background: radial-gradient(
      circle at 92% 131%,
      rgba(0, 0, 255, 0.2),
      rgba(25, 56, 156, 0.4)
    ),
    radial-gradient(circle at 99% 131%, #2595be25, rgba(255, 255, 255, 0)),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 76 76' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='6.01' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
`;
