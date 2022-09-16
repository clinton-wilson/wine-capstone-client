import { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { Link } from "react-router-dom"
import { getRecipes } from "../managers/RecipeManager"
import { RecipeDelete } from "./RecipeDelete"

export const RecipeList = () => {
    const [recipes, setRecipes] = useState([])
    const localWineAdmin = localStorage.getItem("wine_admin")
    const wineUserAdmin = JSON.parse(localWineAdmin)
    const Recipes = () => {
        getRecipes()
            .then(setRecipes)
    }

    useEffect(() => {
        Recipes()
    }, [])

    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)
    const randomRecipes = shuffle(recipes)
    return (
        <article className="recipes">
            {
                randomRecipes.map(recipe => {
                    return(
                    <section key={`recipe--${recipe.id}`} className="recipe">
                        <Link to={`/recipes/${recipe.id}`}>
                            <div className="recipe__photo"><img src={recipe.image} alt={recipe.summary} /></div>
                            <div className="recipe__name">{recipe.name}</div>
                        </Link>
                        {
                (wineUserAdmin === true)
                    ? <><Link to={`/recipes/edit/${recipe.id}`}><FaEdit /></Link>
                        <RecipeDelete recipeId={recipe.id} /></>
                    : ""
            }
                    </section>)
                })
            }
        </article>

    )
}