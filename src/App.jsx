import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchParams from "./Pages/SearchParams";
import Details from "./Pages/Details";
import AdoptedPetContext from "./AdoptedPetContext";

const queryClient = new QueryClient({
  defaultOption: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null); // it passes the whole state, so its read and write
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <header>
            <Link to="/">Adopt Me!</Link>
          </header>

          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </AdoptedPetContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
