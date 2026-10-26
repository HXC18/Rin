import { AppProviders } from "./app/providers";
import { AppRoutes } from "./app/routes";
import { useAppBootstrap } from "./app/use-app-bootstrap";
import { ScrollEnhancements } from "./components/scroll-enhancements";

function App() {
  const { config, profile } = useAppBootstrap();

  return (
    <AppProviders config={config} profile={profile}>
      <ScrollEnhancements />
      <AppRoutes />
    </AppProviders>
  )
}

export default App;
