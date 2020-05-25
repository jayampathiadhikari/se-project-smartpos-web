/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux'
import {store,persistor} from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

// import requiresAuth from './components/RequiresAuth';
import requiresAuthExecutive from './components/RequiresAuthExecutive';
import requiresAuthAgent from './components/RequiresAuthAgent'
// import AdminLayout from "layouts/Admin.js";
import AgentLayout from "layouts/Agent"
import AuthLayout from "layouts/Auth.js";
import ExecutiveLayout from "layouts/Executive";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <Switch>
          {/*<Route path="/admin" component={requiresAuth(AdminLayout)} />*/}
          <Route path="/executive" component={requiresAuthExecutive(ExecutiveLayout)} />
          <Route path="/agent" component={requiresAuthAgent(AgentLayout)} />
          <Route path="/auth" render={props => <AuthLayout {...props} />} />
          <Redirect from="/" to="/auth/login" />

        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  ,
  document.getElementById("root")
);
