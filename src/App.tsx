import { RouterProvider } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext";
import { NotificationDisplay } from "./components/NotificationDisplay";
import { router as appRouter } from "./routes";
import "./Body.css";
import "./App.css";
 
const AppWithNotifications = () => {
  return (
    <NotificationProvider>
      <RouterProvider router={appRouter} />
      <NotificationDisplay />
    </NotificationProvider>
  );
};
 
function App() {
  return <AppWithNotifications />;
}
 
export default App;
