import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BaseLayout } from "./components";
import { Dashboard } from "./screens";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme/theme";
import { GlobalStyles } from "./styles/global/GlobalStyles";
import { useEffect, useState } from "react";
import DataContext from "./context/DataContext";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_DOMAIN}/api/data`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={data}>
      <ThemeProvider theme={theme}>
        <Router>
          <GlobalStyles />
          <Routes>
            <Route path="/" element={<BaseLayout />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </DataContext.Provider>
  );
}

export default App;
