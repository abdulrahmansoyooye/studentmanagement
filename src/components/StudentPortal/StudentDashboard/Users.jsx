import React from "react";
import { Outlet } from "react-router-dom";

const Users = () => {
  return (
    <div>
      <h2>User Component</h2>
      <Outlet />
    </div>
  );
};

export default Users;
