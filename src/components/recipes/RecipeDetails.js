import { useEffect, useState } from "react"
import { FaEdit, FaTrash, FaTrashAlt } from "react-icons/fa"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteRecipe, getSingleRecipe } from "../managers/RecipeManager"
import { getWines } from "../managers/WineManager"
import { RecipeDelete } from "./RecipeDelete"

export const RecipeDetails = () => {
    const [recipe, setRecipe] = useState([])
    const [wines, setWines] = useState([])
    const { recipeId } = useParams()
    const navigate = useNavigate()
    const localWineAdmin = localStorage.getItem("wine_admin")
    const wineUserAdmin = JSON.parse(localWineAdmin)
    const Recipe = () => {
        getSingleRecipe(recipeId)
            .then(setRecipe)
    }

    const Wines = () => {
        getWines()
            .then(setWines)
    }

    useEffect(() => {
        Wines()
    }, [])

    useEffect(() => {
        Recipe()
    }, [])


    return (
        <article className="recipeDetails">
            <h2 className="recipeDetails__name">{recipe.name}</h2>
            <div className="recipeDetails__photo"><img src={recipe.image} alt={recipe.summary} /></div>
            {
                (recipe.main_ingredient === null)
                    ? ""
                    : <div className="recipeDetails__main_ingredient">Main Ingredient: {recipe.main_ingredient?.ingredient}</div>
            }
            <div className="recipeDetails__ingredients">Ingredients: {recipe.ingredients}</div>
            <div className="recipeDetails__instructions">Instructions: {recipe.instructions}</div>
            <div className="recipeDetails__readyInMinutes">Ready in {recipe.ready_in_minutes} minutes</div>
            <div className="recipeDetails__serves">Serves {recipe.serves} people</div>
            <div className="recipeDetails__more_info">More information at <Link to={`${recipe.more_info}`}>{recipe.more_info}</Link></div>
            <h4>These varietals may pair nicely with this recipe</h4>
            {
                wines.map(wine => {
                    if (wine?.main_ingredient?.id === recipe?.main_ingredient?.id) {
                        return <>
                        <Link to={`/wines/varietal/${wine?.varietal?.id}`}><ol>{wine?.varietal?.varietal}</ol></Link></>

                    }
                })
            }
            <br />
            {
                (wineUserAdmin === true)
                    ? <><Link to={`/recipes/edit/${recipe.id}`}><FaEdit /></Link>
                        <RecipeDelete recipeId={recipe.id} /></>
                    : ""
            }
            <button type="cancel"
                onClick={() => navigate(`/recipes`)}>Back to Recipes</button>

        </article>
    )
}