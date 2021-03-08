import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Country } from "./components/Country/Country";
import { Home } from "./components/Home";

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/:countryName">
            <Country />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
