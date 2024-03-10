/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the software.

*/

import React from "react";
import { createRoot} from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Vision UI Dashboard React Context Provider
import { VisionUIControllerProvider } from "context";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "Store";
import { Provider } from "react-redux";
import { Store } from "Store";

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


root.render(<BrowserRouter>
<Provider store={Store}>

<PersistGate loading={null} persistor={persistor}>
  <VisionUIControllerProvider>
    <App />
  </VisionUIControllerProvider>
</PersistGate>
</Provider>
</BrowserRouter>
)

