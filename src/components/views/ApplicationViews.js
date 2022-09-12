import { Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login"
import { Register } from "../auth/Register"
import { WineDetails } from "../wine/WineDetails"
import { WineList } from "../wine/WineList"
import { Authorized } from "./Authorized"



export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/wines" element={<WineList />} />
                <Route path="/winedetails/:wineId" element={<WineDetails/>}/>
            </Route>
        </Routes>
    </>
}