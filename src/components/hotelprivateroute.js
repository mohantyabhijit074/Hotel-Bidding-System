import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Authcontext } from "./hotelauth";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const {currentUser} = useContext(Authcontext);
  return (
    <Route
      {...rest}
      render={routeProps =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/Hotellogin"} />
        )
      }
    />
  );
};


export default PrivateRoute