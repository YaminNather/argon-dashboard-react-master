/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

import { initializeApp } from "firebase/app";
import AuthenticationSuccess from "views/examples/AuthenticationSuccess";


const firebaseConfig = {
  apiKey: "AIzaSyDBdAXEikSmUGr8P80e8T-k9td_7L8bNnE",
  authDomain: "booksapp-internship-tryout.firebaseapp.com",
  projectId: "booksapp-internship-tryout",
  storageBucket: "booksapp-internship-tryout.appspot.com",
  messagingSenderId: "778017595304",
  appId: "1:778017595304:web:767786d282b54250e6079d"
};


initializeApp(firebaseConfig);

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/authentication_success" render={(props) => <AuthenticationSuccess {...props} />} />
      <Redirect from="/" to="/admin/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
