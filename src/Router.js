import { Articles } from "./pages/Articles";
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
          <Route exact path="/articles" component={Articles} />
        </Switch>
      </Router>
    </BrowserRouter>
  );
}
