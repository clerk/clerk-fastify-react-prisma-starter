import { ClerkProvider } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Apartments } from "./components/Apartments";
import { Header } from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { MyApartments } from "./components/MyApartments";
import { Footer } from "./components/Footer";

// Get the Frontend API from the environment
const frontendApi = process.env.REACT_APP_CLERK_FRONTEND_API;

function App() {
  const navigate = useNavigate();
  return (
    <ClerkProvider frontendApi={frontendApi} navigate={(to) => navigate(to)}>
      <Header />
      <Routes>
        <Route path="/my-apartments" element={<MyApartments />}></Route>
        <Route path="*" element={<Apartments />}></Route>
      </Routes>
      <Footer />
    </ClerkProvider>
  );
}

export default App;
