import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import ScrollProgress from "./components/ScrollProgress";
import SiteLayout from "./components/SiteLayout";
import AboutPage from "./pages/AboutPage";
import CommissionPage from "./pages/CommissionPage";
import ContactPage from "./pages/ContactPage";
import GalleryPage from "./pages/GalleryPage";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <HashRouter>
      <ScrollProgress />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/commission" element={<CommissionPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
