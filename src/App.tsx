import { BaseProvider, LightTheme, DarkTheme } from "baseui";
import { SnackbarProvider } from "baseui/snackbar";
import MainPage from "./pages/MainPage.jsx";
import { useAppSettings } from "./app/store.js";

const App = () => {
  const theme = useAppSettings((s) => s.theme);
  return (
    <BaseProvider
      theme={theme.toLowerCase() == "light" ? LightTheme : DarkTheme}
    >
      <SnackbarProvider>
        <MainPage />
      </SnackbarProvider>
    </BaseProvider>
  );
};

export default App;
