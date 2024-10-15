import React from "react";
import { Route } from "react-router-dom";
import DestinationsList from "../components/destination/DestinationsList";
import DestinationDetails from "../components/destination/DestinationDetails";
import DestinationCreateForm from "../components/destination/DestinationCreateForm";
import DestinationEditForm from "../components/destination/DestinationEditForm";

const DestinationsRoutes = (
    <>
        <Route path="/destinations" element={<DestinationsList />} />
        <Route path="/destinations/:id" element={<DestinationDetails />} />
        <Route path="/destinations/create" element={<DestinationCreateForm />} />
        <Route path="/destinations/edit/:id" element={<DestinationEditForm/>} />
    </>
);

export default DestinationsRoutes;