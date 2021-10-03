import React from "react";
import { ToastContainer } from "react-toastify";
import AppProvider from "./providers/app";
import DefaultNavigation from "./navigations/default-navigation";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Loader from "./reuseable/Loader";
import ErrorBoundary from "./error-handling/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <DefaultNavigation />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Loader />
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;
