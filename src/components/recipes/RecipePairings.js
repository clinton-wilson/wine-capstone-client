import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getRecipes } from "../managers/RecipeManager"
import { getSingleWine } from "../managers/WineManager"

export const RecipePairings = () => {
    const { wineId } = useParams()
    const [wine, setWine] = useState([])
    const [recipes, setRecipes] = useState([])
    const Wine = () => {
        getSingleWine(wineId)
            .then(setWine)
    }

    const Recipes = () => {
        getRecipes()
            .then(setRecipes)
    }

    useEffect(() => {
        Wine()
    }, [])

    useEffect(() => {
        Recipes()
    }, [])
    return (
        <article className="pairings">
            <h2 className="pairings__title">Recipes that pair well with {wine.vintner} {wine.vintage} {wine?.varietal?.varietal}</h2>
            {
                recipes.map(recipe => {return(
                    (recipe?.main_ingredient?.id === wine?.main_ingredient?.id)
                        ? <><Link to={`/recipes/${recipe.id}`}>
                            <section key={`recipe--${recipe.id}`} className="recipe">
                                <div className="recipe__photo"><img src={recipe.image} alt={recipe.summary} /></div>
                                <div className="recipe__name">{recipe.name}</div>
                            </section>
                        </Link></>
                        :"")
                })
            }
        </article>
    )
}