import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import PlaybookLogin from "@/pages/PlaybookLogin";

const App = () => (
  <BrowserRouter>
    <Toaster />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/playbook/login" element={<PlaybookLogin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
