

import "./stylesheets/app.css";
import Layout from "./Pages/Layout";
import Home from "./Pages/Home/Home";
import ContactPage from "./Pages/Contact/ContactPage";


import ADbaseComponent from "./Pages/ADeditor/ADbase";
import EditorText from "./Components/BASEalignment/TextAdEDITOR/EditorText";
import ADselectionConfigLayout from "./Pages/ADselectionConfigLayout";
import { Section as SelectADcategory } from "./Components/BASEalignment/SelectCategory/Section";
import SelectAdType from "./Components/BASEalignment/SelectAdType/SelectAdType";
import PaymentComponent from "./Components/BASEalignment/Payment/Payment";

import { AnimatePresence } from "framer-motion";


import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="App app__main">
      <BrowserRouter>
        <AnimatePresence wait>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/ad" element={<ADbaseComponent />} >
                <Route path="select" element={<ADselectionConfigLayout />} >
                    <Route index path="category" element={<SelectADcategory/>} />
                    <Route  path="adtype" element={<SelectAdType/>} />
                    <Route  path="newspaper" element={<h1>Newspaper</h1>} />
                </Route>
                <Route path="compose">
                    <Route path="textad" element={<EditorText/>}/>
                    <Route path="textdisplayad" element={<h1>Display AD</h1>}/>
                </Route>
                <Route path="publish">
                  <Route path="Payment" element={<PaymentComponent/>} />
                  <Route path="redirect_payment" element={<h1>Payment Status</h1>} />
                </Route>
              </Route>
              <Route path="/about" element={<h1>About us</h1>}/>
              <Route path="/contact" element={<ContactPage/>}/>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </div>
  )
}



// exporting by default
export default App;


