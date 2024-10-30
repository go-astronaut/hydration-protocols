import React from "react";
import { Provider } from "react-redux";
import AppRoutes from "./Routes/Routes";
import AuthProvider from "./Hooks/Auth";
import ScreenWidthProvider from "./Components/Providers/ScreenWidth";
import { ThemeProvider } from "@mui/material";
import store from "./Reducers/Store";
import theme from "./Theme/theme";
import "./App.css";
// tailwind
import "./tailwind.css";
// OverlayScrollbars
import "overlayscrollbars/overlayscrollbars.css";
// slick carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <ScreenWidthProvider>
            <AppRoutes />
          </ScreenWidthProvider>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
