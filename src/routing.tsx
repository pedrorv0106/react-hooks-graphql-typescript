import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

type RoutingItem = {
  title: string;
  component: JSX.Element;
  path: string;
  exact: boolean;
};

const RoutingList: Array<RoutingItem> = [
  {
    title: "Home Screen",
    component: <h1>Hola</h1>,
    path: "/",
    exact: false,
  },
];

export default function Routing(): JSX.Element {
  return (
    <Router>
      <Switch>
        {RoutingList.map((item: RoutingItem) => {
          return (
            <Route path={item.path} exact={item.exact || false}>
              {item.component}
            </Route>
          );
        })}
      </Switch>
    </Router>
  );
}
