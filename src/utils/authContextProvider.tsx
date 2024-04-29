import { useContext } from "react";
import { AuthContext } from "../App";

export const useAuthContext = () => useContext(AuthContext);
