import { Routes, Route } from "react-router";
import Layout from "./layout/Layout";
// import Navbar from "./layout/Navbar.jsx"
import Home from "./Ezsplit/Home";
import EZsplitOptions from "./Ezsplit/EzsplitOptions";
import FullPaymentPage from "./PayInFull/FullPayment";
import SplitEvenlyPayment from "./splitEvenly/SplitEvenlyPayment";
import Confirmation from "./sharedFunctions/Confirmation";
import Receipt from "./sharedFunctions/Receipt";
import ThankYou from "./sharedFunctions/ThankYou";
import NumberOfGuests from "./Ezsplit/NumberOfGuest";
//import CustomSplitPayment from "./customSplit/customSplitPayment";
import CustomOrSplit from "./customSplit/customSplitPayment";
import SelectItems from "./customSplit/selectItems";
import PayForCustomSplit from "./customSplit/PayFormCustomSplit";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="/table/:tableNumber/NumberOfGuests"
          element={<NumberOfGuests />}
        />

        <Route
          path="table/:tableNumber/options"
          element={<EZsplitOptions />}
        />
        <Route
          path="/table/:tableNumber/FullPaymentPage"
          element={<FullPaymentPage />}
        />
        <Route path="table/:tableNumber/guests" element={<NumberOfGuests />} />
        <Route
          path="table/:tableNumber/select-items"
          element={<SelectItems />}
        />
        <Route
          path="table/:tableNumber/customSplitPayment"
          element={<CustomOrSplit />}
        />
        <Route
          path="table/:tableNumber/select-items"
          element={<SelectItems />}
        />
        <Route
          path="table/:tableNumber/customSplitPayment"
          element={<customSplitPayment />}
        />
        <Route
          path="table/:tableNumber/NumberOfGuests "
          element={<NumberOfGuests  />}
        />
        <Route
          path="table/:tableNumber/PayForCustomSplit"
          element={<PayForCustomSplit />}
        />
        
       
        <Route path="table/:tableNumber/receipt" element={<Receipt />} />
        <Route path="table/:tableNumber/thank-you" element={<ThankYou />} />
        <Route path="Confirmation" element={<Confirmation />} />
        <Route path="SplitEvenlyPayment" element={<SplitEvenlyPayment />} />
        <Route path="CustomOrSplit" element={<CustomOrSplit />} />
      </Route>
    </Routes>
  );
}
