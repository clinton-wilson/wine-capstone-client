import { useEffect, useState } from "react"
import { FaEdit, FaTrash, FaTrashAlt } from "react-icons/fa"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteRecipe, getSingleRecipe } from "../managers/RecipeManager"
import { getWines } from "../managers/WineManager"
import { RecipeDelete } from "./RecipeDelete"
import React from 'react';


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


    return (<section className="detail_container">
        <h2 className="title">{recipe.name}</h2>
        <article className="details">
            <div className="detail_image"><img src={recipe.image} alt={recipe.summary} /></div>
            {
                (recipe.main_ingredient === null)
                    ? ""
                    : <div className="detail">Main Ingredient: {recipe.main_ingredient?.ingredient}</div>
            }
            <div className="detail">Ingredients: {recipe.ingredients}</div>
            <div className="detail">Instructions: {recipe.instructions}</div>
            <div className="detail">Ready in {recipe.ready_in_minutes} minutes</div>
            <div className="detail">Serves {recipe.serves} people</div>
            <div className="detail">More information at <a href={`${recipe.more_info}`}>{recipe.more_info}</a></div>
            <h2>These varietals may pair nicely with this recipe</h2>
            {
                wines.map(wine => {
                    if (wine?.main_ingredient?.id === recipe?.main_ingredient?.id) {
                        return <>
                            <Link to={`/wines/varietal/${wine?.varietal?.id}`}>{wine?.varietal?.varietal}</Link></>

                    }
                })
            }
            <br /><div className="detail_icons">
            {
                (wineUserAdmin === true)
                    ? <p className="detail_icon"><Link to={`/recipes/edit/${recipe.id}`}><FaEdit /></Link>
                        <RecipeDelete recipeId={recipe.id} /></p>
                    : ""
            }</div>
            <button type="detail_icon"
                onClick={() => navigate(`/recipes`)}>Back to Recipes</button>

        </article>
    </section>
    )
}