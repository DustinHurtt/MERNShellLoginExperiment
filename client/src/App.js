import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirstMountState } from 'react-use';
import { post } from "./authService/authService";

import SnackbarError from "./components/SnackbarError";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";

const AuthorizationContext  = React.createContext();

const App = (props) => {

    const [errorMessage, setErrorMessage] = useState("");
    const [snackBarOpen, setSnackBarOpen] = useState(false);

    const isFirstMount = useFirstMountState();

    const navigate = useNavigate();

    let token = localStorage.getItem("authToken");

  const login = async (credentials) => {
    post("/users/login", credentials)
        .then((results) => {
          localStorage.setItem("authToken", results.data.token);
          localStorage.setItem("id", results.data.id);
          navigate("/");
        })
        .catch((err) => {
          console.log("Something went wrong", err.message);
        });
  };

  const register = async (credentials) => {
    post("/users/signup", credentials)
        .then((results) => {
          localStorage.setItem("authToken", results.data.token);
          localStorage.setItem("id", results.data.id);
          navigate("/");
        })
        .catch((err) => {
          console.log("Something went wrong", err.message);
        });
  };

  const logout = () => {
    console.log("Clicking LOGOUT")
    localStorage.clear();
    navigate("/");
  };

  useEffect(()=> {
    if (!isFirstMount) {
    setSnackBarOpen(true)
    }
  }, [errorMessage])

  return (
    <div>
      {snackBarOpen && (
        <SnackbarError
          setSnackBarOpen={setSnackBarOpen}
          errorMessage={errorMessage}
          snackBarOpen={snackBarOpen}
        />
      )}

        <AuthorizationContext.Provider value={token}>
            {!!token ? <PrivateRoutes logout={logout} /> : <PublicRoutes register={register} login={login} setErrorMessage={setErrorMessage}  />}
        </AuthorizationContext.Provider>


    </div>
  );
};

export default App;