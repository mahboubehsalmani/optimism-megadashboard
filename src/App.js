import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Route, Routes, Navigate } from "react-router-dom";
import Activity from "./pages/activity/index";
import Home from "./pages/home/index";
import Wallets from "./pages/wallets";
import MaterialSidabar from "./global/MaterialSidebar";
import Development from "./pages/development/index";
import Supply from "./pages/supply/index";
import About from "./pages/about/index";
import Governance from "./pages/governance/index";
import Staking from "./pages/staking/index";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <MaterialSidabar />
          <main className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/wallets" element={<Wallets />} />
              <Route path="/developments" element={<Development />} />
              <Route path="/supply" element={<Supply />} />
              <Route path="/about" element={<About />} />
              <Route path="/governance" element={<Governance />} />
              <Route path="/staking" element={<Staking />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
