import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Singup from "../pages/Singup";

function Routes() {
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("@Doit:token"));
    if (token) {
      return setAutenticado(true);
    }
  }, [autenticado]);

  return (
    <Switch>
      <Route exact path="/">
        <Home autenticado={autenticado} />
      </Route>
      <Route path="/singup">
        <Singup autenticado={autenticado} />
      </Route>
      <Route path="/login">
        <Login autenticado={autenticado} setAutenticado={setAutenticado} />
      </Route>
      <Route path="/dashboard">
        <Dashboard autenticado={autenticado} setAutenticado={setAutenticado} />
      </Route>
    </Switch>
  );
}

export default Routes;
