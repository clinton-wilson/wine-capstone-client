import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getRecipes } from "../managers/RecipeManager"

export const RecipeList = () => {
    const [recipes, setRecipes] = useState([])

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
                    return <Link to={`/recipes/${recipe.id}`}>
                        <section key={`recipe--${recipe.id}`} className="recipe">
                            <div className="recipe__photo"><img src={recipe.image} alt={recipe.summary}/></div>
                            <div className="recipe__name">{recipe.name}</div>
                        </section>
                    </Link>
                })
            }
        </article>

    )
}