import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";
import Root from "./Root.js"
import Layout from "./Layout.js";
import UserProvider from "./UserProvider";
import OrganizationProvider from "./OrganizationProvider.js";
import Login from "./Login.js"
import NewOrganization from "./NewOrganization.js";
import MyOrganization from "./MyOrganization.js";
import AllRecords from "./AllRecords.js";
import AllUsers from "./AllUsers.js";
import React, { createContext, useState } from 'react';
import "./Style.css";
function App() {


  const [user, setUser] = useState('Nějaká hodnota');

  return (
    <div >
      <UserProvider >
        <OrganizationProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Root />} />
                <Route
                  path="newOrganization"
                  element={
                    <NewOrganization />
                  }
                />
                <Route
                  path="Login"
                  element={
                    <Login />
                  }
                />
                <Route
                  path="MyOrganization"
                  element={
                    <MyOrganization />
                  }
                />
                <Route
                  path="AllUsers"
                  element={
                    <AllUsers />
                  }
                />
                <Route
                  path="AllRecords"
                  element={
                    <AllRecords />
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </OrganizationProvider>
      </UserProvider>
    </div>
  );
}

export default App;
