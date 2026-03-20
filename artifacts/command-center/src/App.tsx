import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import NotFound from "@/pages/not-found";

// Pages
import Intel from "./pages/intel";
import Receipts from "./pages/receipts";
import Clips from "./pages/clips";
import Scripts from "./pages/scripts";
import Episodes from "./pages/episodes";
import Brand from "./pages/brand";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Intel} />
        <Route path="/receipts" component={Receipts} />
        <Route path="/b-roll" component={Clips} />
        <Route path="/scripts" component={Scripts} />
        <Route path="/ops" component={Episodes} />
        <Route path="/brand" component={Brand} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
