import { useEffect, useState } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import { Link, useParams } from "react-router-dom"
import { getSingleRecipe } from "../managers/RecipeManager"

export const RecipeDetails = () => {
    const [recipe, setRecipe] = useState([])
    const { recipeId } = useParams()
    const Recipe = () => {
        getSingleRecipe(recipeId)
            .then(setRecipe)
    }

    useEffect(() => {
        Recipe()
    }, [])

    return (
        <article className="recipeDetails">
            <h2 className="recipeDetails__name">{recipe.name}</h2>
            <div className="recipeDetails__photo"><img src={recipe.image} alt={recipe.summary} /></div>
            <div className="recipeDetails__ingredients">Ingredients: {recipe.ingredients}</div>
            <div className="recipeDetails__instructions">Instructions: {recipe.instructions}</div>
            <div className="recipeDetails__readyInMinutes">Ready in {recipe.ready_in_minutes} minutes</div>
            <div className="recipeDetails__serves">Serves {recipe.serves} people</div>
            <Link to={`/recipes/edit/${recipe.id}`}><FaEdit/></Link>
            <a><FaTrash/></a>
        </article>
    )
}