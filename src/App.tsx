import { RouterProvider } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext";
import { NotificationDisplay } from "./components/NotificationDisplay";
import { router as appRouter } from "./routes";
import "./Body.css";
import "./App.css";
import { ModalProvider } from "./context/ModelContext";
import GlobalModal from "./components/Models/ModelDisplay";

const AppWithNotifications = () => {
  return (
    <NotificationProvider>
      <ModalProvider>
        <RouterProvider router={appRouter} />
        <GlobalModal />
      </ModalProvider>
      <NotificationDisplay />
    </NotificationProvider>
  );
};

function App() {
  return <AppWithNotifications />;
}

export default App;
