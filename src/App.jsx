import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./EZSplit/home";
import EZsplitOptions from "./EZSplit/ezsplitoptions";
import PayInFull from "./payInFull/fullPaymentPage";
import NumberOfGuests from "./EZSplit/numberOfGuests";
import CustomOrSplit from "./EZSplit/CustomOrSplit";
import SelectItems from "./customSplit/selectItems";
// import SplitEvenlyPayment from "./splitEvenly/SplitEvenlyPayment";
// import Confirmation from "./sharedFunctions/Confirmation";
// import Receipt from "./sharedFunctions/Receipt";
// import ThankYou from "./sharedFunctions/thankYou";

export default function App() {
  return (
    <Routes>
      {/* <Route element={<Layout />}>
        <Route index element={<p>Home page</p>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> */
      /*{" "}
      </Route> */}
      <Route index element={<Home />} />
      <Route path="/table/:tableNumber/options" element={<EZsplitOptions />} />

      <Route
        path="/table/:tableNumber/ezsplit"
        element={<CustomOrSplit />}
      ></Route>
      <Route path="/menu" element={<SelectItems />}></Route>
      {/* <Route path="/table/pay-full" element={<PayInFull />}></Route>*{" "} */}
      {/* <Route path="/Confirmation" element={<Confirmation />}></Route>
      <Route path="Receipt" element={<Receipt />}></Route>
      <Route path="ThankYou" element={<ThankYou />}></Route>
      <Route
        path="/SplitEvenlyPayment"
        element={<SplitEvenlyPayment />}
      ></Route>
      <Route path="/customSplit" element={<customSplit />}></Route> */}
    </Routes>
  );
}
