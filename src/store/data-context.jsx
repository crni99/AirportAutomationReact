import { createContext } from "react";

export const DataContext = createContext({
    apiUrl: "https://localhost:44362/api",
    pageSize: 10,
});