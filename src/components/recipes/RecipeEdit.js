import { useEffect, useState } from "react"
import { FaRegSave, FaSave, FaStore } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"
import { getIngredients } from "../managers/MainIngredientManager"
import { getSingleRecipe, updateRecipe } from "../managers/RecipeManager"
import React from 'react';


export const RecipeEdit = () => {
    const [mainIngredient, setMainIngredient] = useState([])
    const { recipeId } = useParams()
    const [editRecipe, setEditRecipe] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        getIngredients()
            .then(data => setMainIngredient(data))
    }, [])

    useEffect(() => {
        getSingleRecipe(recipeId)
            .then(data => {
                data.main_ingredient = data?.main_ingredient?.id
                setEditRecipe(data)
            })
    }, [])

    return (<section className="form_section">
        <form className="form">
            <h2 className="form_title">Edit Recipe</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" required autoFocus
                        className="form-control"
                        value={editRecipe.name}
                        onChange={(e) => {
                            const copy = { ...editRecipe }
                            copy.name = e.target.value
                            setEditRecipe(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients: </label>
                    <textarea type="textarea" name="ingredients"
                        className="form-control"
                        value={editRecipe.ingredients}
                        onChange={(e) => {
                            const copy = { ...editRecipe }
                            copy.ingredients = e.target.value
                            setEditRecipe(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="instructions">Instructions: </label>
                    <textarea type="textarea" name="instructions"
                        className="form-control"
                        value={editRecipe.instructions}
                        onChange={(e) => {
                            const copy = { ...editRecipe }
                            copy.instructions = e.target.value
                            setEditRecipe(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="ready_in_minutes">Ready in </label>
                    <input type="number" name="ready_in_minutes"
                        className="field_number"
                        value={editRecipe.ready_in_minutes}
                        onChange={(e) => {
                            const copy = { ...editRecipe }
                            copy.ready_in_minutes = e.target.value
                            setEditRecipe(copy)
                        }}
                    />
                    <label>minutes</label>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="serves">Serves </label>
                    <input type="number" name="serves"
                        className="field_number"
                        value={editRecipe.serves}
                        onChange={(e) => {
                            const copy = { ...editRecipe }
                            copy.serves = e.target.value
                            setEditRecipe(copy)
                        }}
                    />
                    <label>people</label>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="image">Image: </label>
                    <input type="textarea" name="image"
                        className="form-control"
                        value={editRecipe.image}
                        onChange={(e) => {
                            const copy = { ...editRecipe }
                            copy.image = e.target.value
                            setEditRecipe(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="summary">Summary: </label>
                    <textarea type="url" name="summary"
                        className="form-control"
                        value={editRecipe.summary}
                        onChange={(e) => {
                            const copy = { ...editRecipe }
                            copy.summary = e.target.value
                            setEditRecipe(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="more_info">More information: </label>
                    <input type="url" name="more_info"
                        className="form-control"
                        value={editRecipe.more_info}
                        onChange={(e) => {
                            const copy = { ...editRecipe }
                            copy.more_info = e.target.value
                            setEditRecipe(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="main_ingredient">Main ingredient: </label>
                    <select name="main_ingredient"
                    className="form-control"
                        proptype="int"
                        value={parseInt(editRecipe.main_ingredient)}
                        onChange={(e) => {
                            const copy = { ...editRecipe }
                            copy.main_ingredient = e.target.value
                            setEditRecipe(copy)
                        }}>
                        <option value="0">Select Main Ingredient</option>
                        {mainIngredient.map(mi => (
                            <option key={mi.id} value={mi.id}>
                                {mi.ingredient}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={e => {
                    e.preventDefault()

                    const recipe = {
                        id: recipeId,
                        instructions: editRecipe.instructions,
                        ingredients: editRecipe.ingredients,
                        ready_in_minutes: editRecipe.ready_in_minutes,
                        serves: editRecipe.serves,
                        image: editRecipe.image,
                        name: editRecipe.name,
                        main_ingredient: editRecipe.main_ingredient,
                        summary: editRecipe.summary,
                        more_info: editRecipe.more_info
                    }
                    updateRecipe(recipeId, recipe)
                        .then(() => navigate(`/recipes/${recipeId}`))
                }}
                className="btn btn-primary">Save</button>
            <button type="cancel"
                onClick={() => navigate(`/recipes`)}>Cancel</button>
        </form>
    </section>
    )
}