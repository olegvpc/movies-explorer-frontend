import React, {useEffect} from "react";
import { Route, Redirect } from "react-router-dom";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

const AdminRoute = ({ component: Component, ...props }) => {
   const currentUser = React.useContext(CurrentUserContext);

  return (
    <Route>
      {() =>
        props.currentUser?.email === 'admin@ya.ru' ? <Component {...props} /> : <Redirect to='/' />
      }
    </Route>
  );
};

export default AdminRoute;
