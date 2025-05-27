import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
// import UniteWithUs from "./components/UniteWithUs";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from './pages/PrivacyPolicy';
import Product from "./pages/Product";
import TermsConditions from './pages/TermsConditions';
import UniteWithUs from "./pages/UniteWithUs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>

      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/animated-split-images" element={<Product />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          {/* <Route path="/animated-split-images" element={<AnimatedSplitImages />} /> */}
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/unite-with-us" element={<UniteWithUs />} />
          <Route path="/services" element={<Services />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  </QueryClientProvider>
);

export default App;
