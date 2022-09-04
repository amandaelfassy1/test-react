import Home from "./pages/Home";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  BrowserRouter,
} from "react-router-dom";

export default function DefaultRouter() {
  return (
    <BrowserRouter>
      <Router>
        <Switch>
          <Route exact path="/articles" component={Home} />
        </Switch>
      </Router>
    </BrowserRouter>
  );
}
