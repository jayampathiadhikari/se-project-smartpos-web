import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux'
import {store,persistor} from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import 'react-toastify/dist/ReactToastify.css';
import "assets/css/custom.css"
// import requiresAuth from './components/RequiresAuth';
import requiresAuthExecutive from './components/RequiresAuthExecutive';
import requiresAuthAgent from './components/RequiresAuthAgent'
// import AdminLayout from "layouts/Admin.js";
import AgentLayout from "layouts/Agent"
import AuthLayout from "layouts/Auth.js";
import ExecutiveLayout from "layouts/Executive";
import ErrorLayout from "./layouts/Error";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <Switch>
          {/*<Route path="/admin" component={requiresAuth(AdminLayout)} />*/}
          <Route path="/executive" component={requiresAuthExecutive(ExecutiveLayout)} />
          <Route path="/agent" component={requiresAuthAgent(AgentLayout)} />
          <Route path="/auth" render={props => <AuthLayout {...props} />} />
          <Route path="/error/404" render={props => <ErrorLayout {...props} />} />
          <Redirect from="/" exact to="/auth/login" />
          <Redirect from="*" to="/error/404" />
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  ,
  document.getElementById("root")
);
