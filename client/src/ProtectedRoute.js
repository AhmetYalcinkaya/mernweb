import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

function ProtectedRoute({ auth, component: Component, ...rest }) {
  return (
    <div>
      <Routes>
        <Route
          {...rest}
          render={(props) => {
            if (auth) return <Component {...props} />;
            if (!auth)
              return (
                <Navigate to={{ path: "/", state: { from: props.location } }} />
              );
          }}
        />
      </Routes>
    </div>
  );
}

export default ProtectedRoute;
