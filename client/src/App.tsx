import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/hooks/use-language";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";

// Import all pages
import Landing from "@/pages/landing";
import Onboarding from "@/pages/onboarding";
import Home from "@/pages/home";
import Bookings from "@/pages/bookings";
import Profile from "@/pages/profile";
import Support from "@/pages/support";

// Moving flow pages
import MovingOptions from "@/pages/moving/moving-options";
import MovingRooms from "@/pages/moving/moving-rooms";
import MovingLocations from "@/pages/moving/moving-locations";
import MovingContact from "@/pages/moving/moving-contact";
import MovingSuccess from "@/pages/moving/moving-success";

// Disposal flow pages
import DisposalItems from "@/pages/disposal/disposal-items";
import DisposalSchedule from "@/pages/disposal/disposal-schedule";
import DisposalSuccess from "@/pages/disposal/disposal-success";

// Transport flow pages
import TransportLocations from "@/pages/transport/transport-locations";
import TransportContact from "@/pages/transport/transport-contact";
import TransportSuccess from "@/pages/transport/transport-success";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Switch>
      {isLoading || !isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/onboarding" component={Onboarding} />
          <Route component={Landing} />
        </>
      ) : (
        <>
          {/* Default redirect to home for authenticated users */}
          <Route path="/">
            <Redirect to="/home" />
          </Route>
          
          {/* Main pages */}
          <Route path="/home" component={Home} />
          <Route path="/bookings" component={Bookings} />
          <Route path="/profile" component={Profile} />
          <Route path="/support" component={Support} />
          
          {/* Moving flow */}
          <Route path="/moving/options" component={MovingOptions} />
          <Route path="/moving/rooms" component={MovingRooms} />
          <Route path="/moving/locations" component={MovingLocations} />
          <Route path="/moving/contact" component={MovingContact} />
          <Route path="/moving/success" component={MovingSuccess} />
          
          {/* Disposal flow */}
          <Route path="/disposal/items" component={DisposalItems} />
          <Route path="/disposal/schedule" component={DisposalSchedule} />
          <Route path="/disposal/success" component={DisposalSuccess} />
          
          {/* Transport flow */}
          <Route path="/transport/locations" component={TransportLocations} />
          <Route path="/transport/contact" component={TransportContact} />
          <Route path="/transport/success" component={TransportSuccess} />
          
          {/* Fallback to 404 */}
          <Route component={NotFound} />
        </>
      )}
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
