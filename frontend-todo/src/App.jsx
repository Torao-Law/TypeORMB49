import React, { useEffect, useContext, useState } from "react"
import { API, setAuthToken } from "./config/API"
import { PrivateRouteLogin } from "./config/PrivateRoute"
import { Route, Routes } from "react-router-dom"
import { UserContext } from "./store/Context"
import LandingPage from "./pages/LandingPage"
import TodoPage from "./pages/TodoPage"

function App() {
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false)
    }
  }, []);

  const checkUser = async () => {
    try {
      const response = await API.get('/auth/check');
      let payload = response.data.user;
      console.log(payload);

      payload.token = localStorage.getItem(token);
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
      setIsLoading(false)
    } catch (error) {
      console.log("check user failed : ", error);
      dispatch({
        type: 'AUTH_ERROR',
      });
      setIsLoading(false)
    }
  };
  return (
    <>
      {isLoading ? null : 
        <Routes>
          <Route exac path="/" element={<LandingPage />}/>
    
          <Route element={<PrivateRouteLogin />}>
            <Route exac path="/todo" element={<TodoPage />} />
          </Route>
        </Routes>
      }
    </>
  )
}

export default App
