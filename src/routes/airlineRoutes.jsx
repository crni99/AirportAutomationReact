import React from "react";
import { Route } from "react-router-dom";
import AirlinesList from "../components/airline/AirlinesList";
import AirlineDetails from "../components/airline/AirlineDetails";
import AirlineCreateForm from "../components/airline/AirlineCreateForm";
import AirlineEditForm from "../components/airline/AirlineEditForm";

const AirlinesRoutes = (
    <>
        <Route path="/airlines" element={<AirlinesList />} />
        <Route path="/airlines/:id" element={<AirlineDetails />} />
        <Route path="/airlines/create" element={<AirlineCreateForm />} />
        <Route path="/airlines/edit/:id" element={<AirlineEditForm/>} />
    </>
);

export default AirlinesRoutes;