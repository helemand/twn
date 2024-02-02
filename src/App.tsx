import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Article from "./pages/Article";
import Table from "./pages/Table";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Game from "./pages/Game";
import Navigation from "./components/Navigation";
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/article/:id?" element={<Article />} />
          <Route path="/table" element={<Table />} />
          <Route path="/life" element={<Game />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
