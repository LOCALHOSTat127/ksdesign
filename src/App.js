

import "./stylesheets/app.css";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home/Home";
import ContactPage from "./Pages/Contact/ContactPage";
import AboutUs from "./Pages/About/About";

import ADbaseComponent from "./Pages/ADeditor/ADbase";
import EditorText from "./Components/BASEalignment/TextAdEDITOR/EditorText";
import ADselectionConfigLayout from "./Pages/ADselectionConfigLayout";
import { Section as SelectADcategory } from "./Components/BASEalignment/SelectCategory/Section";
import SelectAdType from "./Components/BASEalignment/SelectAdType/SelectAdType";
import PaymentComponent from "./Components/BASEalignment/Payment/Payment";
import PaymentVerification from "./Components/BASEalignment/smComponents/paymentVerification/paymentVerification";
import LockStep from "./Api/StepsLock/LockStep";
import { Section as SelectNewspaper } from "./Components/BASEalignment/selectNewspaper/Section";
import { store } from "./app/store";
import { Provider } from "react-redux";



import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="App app__main">
      <Provider store={store}>
        <BrowserRouter>

          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/ad" element={<ADbaseComponent />} >
                <Route path="select" element={<ADselectionConfigLayout />} >
                  <Route index path="category" element={<LockStep component={<SelectADcategory />} TYPE="SELECT_AD_CATEGORY" />} />
                  <Route path="adtype" element={<LockStep component={<SelectAdType />} TYPE="SELECT_AD_TYPE" />} />
                  <Route path="newspaper" element={<LockStep component={<SelectNewspaper />} TYPE="SELECT_AD_NEWSPAPER" />} />
                </Route>
                <Route path="compose">
                  <Route path="textad" element={<LockStep component={<EditorText />} TYPE="COMPOSE_AD" />} />
                  <Route path="textdisplayad" element={<h1>Display AD</h1>} />
                </Route>
                <Route path="publish">
                  <Route path="Payment" element={<LockStep component={<PaymentComponent />} TYPE="PAYMENT_PAGE" />} />
                  <Route path="paymentVerification" element={<PaymentVerification />} />
                </Route>
              </Route>
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

        </BrowserRouter>
      </Provider>
    </div>
  )
}



// exporting by default
export default App;




