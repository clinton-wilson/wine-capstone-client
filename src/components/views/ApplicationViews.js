import { Route, Routes } from "react-router-dom"
import { Login } from "../auth/Login"
import { Register } from "../auth/Register"
import { RecipeDetails } from "../recipes/RecipeDetails"
import { RecipeEdit } from "../recipes/RecipeEdit"
import { RecipeList } from "../recipes/RecipeList"
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
                <Route path="/wines/:wineId" element={<WineDetails />} />
                <Route path="/recipes" element={<RecipeList />} />
                <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
                <Route path="/recipes/edit/:recipeId" element={<RecipeEdit />} />
            </Route>
        </Routes>
    </>
}