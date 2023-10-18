import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Create from "./pages/Create";
import SingleProduct from "./pages/SingleProduct";
import Navbar from "./components/Navbar";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";

function App() {
  return (
    <div className="App flex">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/products/:id" component={SingleProduct} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/edit/:id" component={Edit} />
      </Switch>
    </div>
  );
}

export default App;
