
// =========================================================
// * Volt Pro React Dashboard
// =========================================================

// * Product Page: https://themesberg.com/product/dashboard/volt-pro-react
// * Copyright 2021 Themesberg (https://www.themesberg.com)
// * License Information (https://themesberg.com/licensing)

// * Designed and coded by https://themesberg.com

// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. Please contact us to request a removal.

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from "react-router-dom";

// ceramic provider
// import { Provider } from '@self.id/react'

// core styles
import "./scss/volt.scss";

// vendor styles
import "leaflet/dist/leaflet.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "react-datetime/css/react-datetime.css";

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";
import { OrbisProvider } from 'services/context';
import { PizzlyProvider } from 'services/contextPizzly';

ReactDOM.render(
  <HashRouter>
      <OrbisProvider>
      <PizzlyProvider>
        <ScrollToTop />
        <HomePage />
      </PizzlyProvider>
      </OrbisProvider>
  </HashRouter>
  , document.getElementById("root")
);
