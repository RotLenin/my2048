import React from "react";
import { Route, Redirect } from "react-router-dom";

import Routes from "./constants/Routes";

function PrivateRoute({ component: Component, ...rest}) {
    const haveAccess = true;
    return <Route
        {...rest}
        render={props => haveAccess ?
            <Component {...props} />
            :
            <Redirect to={Routes.ERROR_404}/>
        }
    />
}

export default PrivateRoute;
