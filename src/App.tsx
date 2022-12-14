import React from "react";
import Footer from "./components/footer";
import Loader from "./components/loader";
import NavBar from "./components/navbar";
import Service from "./components/service";
import Transaction from "./components/transaction";
import Welcome from "./components/welcome";

function App() {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome ">
      <NavBar />
      <Welcome />
      </div>
      {/* <Loader /> */}
      <Service />
      <Transaction />
      <Footer />
      
    </div>
  );
}

export default App;
