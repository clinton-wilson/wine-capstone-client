import { useEffect, useState } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { deleteRecipe, getRecipes } from "../managers/RecipeManager"
import { RecipeDelete } from "./RecipeDelete"
import React from 'react';


export const RecipeList = () => {
    const [recipes, setRecipes] = useState([])
    const localWineAdmin = localStorage.getItem("wine_admin")
    const wineUserAdmin = JSON.parse(localWineAdmin)
    const navigate = useNavigate()
    const Recipes = () => {
        getRecipes()
            .then(setRecipes)
    }

    const deleteRecipeEvent = (recipeId) => {
        deleteRecipe(recipeId)
            .then(() => {
                Recipes()
            })
    }

    const confirmDelete = (id) => {
        if (window.confirm("Do you want to delete this recipe?")) {
            deleteRecipeEvent(id)
        }
    }

    useEffect(() => {
        Recipes()
    }, [])

    const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)
    const randomRecipes = shuffle(recipes)
    return (
        <section className="section">
            <h3 className="title">Recipes</h3>
            <div className="list_container">
                {
                    randomRecipes.map(recipe => {
                        return (
                            <div key={`recipe--${recipe.id}`} className="list_item">
                                <div className="is-3-desktop">
                                    <div className="card">
                                        <Link to={`/recipes/${recipe.id}`}>
                                            <div className="list_image"><img src={recipe.image} alt={recipe.summary} /></div>
                                            <div className="list_content">{recipe.name}</div>
                                        </Link>
                                        <div className="list_icons">
                                            {
                                                (wineUserAdmin === true)
                                                    ? <><p className="list_icon"><Link to={`/recipes/edit/${recipe.id}`}><FaEdit /></Link></p>
                                                        <p className="list_icon">
                                                            <span className="" onClick={() => {
                                                                confirmDelete(recipe.id)
                                                            }}><FaTrash /></span>
                                                        </p></>
                                                    : ""
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    })
                }
            </div>
        </section>

    )
}