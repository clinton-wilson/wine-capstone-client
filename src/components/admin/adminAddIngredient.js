import { useEffect, useState } from "react"
import { getSingleRecipe } from "../managers/RecipeManager"
import { getIngredients } from "../managers/MainIngredientManager"

export const AdminAddIngredient = ({ recipeId }) => {
    const [recipe, setRecipe] = useState([])
    const [ingredients, setIngredients] = useState([])

    const mainIngredients = () => {
        getIngredients()
            .then(setIngredients)

    }

    const Recipe = (id) => {
        getSingleRecipe(id)
            .then(setRecipe)
    }

    useEffect((recipeId) => {
        Recipe(recipeId)
    }, [])

    return (
        <section>
            <h3>Add Ingredient</h3>
        {
            
        }
        </section>
    )
}