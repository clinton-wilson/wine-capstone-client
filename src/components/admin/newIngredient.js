import { useState } from "react"
import { createIngredient } from "../managers/MainIngredientManager"

export const NewIngredient = ({ setIsShown, ingredients }) => {
    const [ingredient, setIngredient] = useState({
        ingredient: ""
    })
    const handleForm = event => {
        ingredients()
        setIsShown(false)
    }
    const changeIngredientState = (e) => {
        const newIngredient = { ...ingredient }
        newIngredient[e.target.name] = e.target.value
        setIngredient(newIngredient)
    }
    return (
        <form className="form">
            <h5 className="">Add Ingredient</h5>
            <fieldset className="field">
                <div className="form-group">
                    <label className="label" htmlFor="ingredient">Ingredient: </label>
                    <input type="text" name="ingredient" required autoFocus
                        className="form-control"
                        value={ingredient.ingredient}
                        onChange={changeIngredientState} />
                </div>
            </fieldset>
            <button type="submit"
                onClick={e => {
                    e.preventDefault()

                    const newIngredient = {
                        ingredient: ingredient.ingredient
                    }

                    createIngredient(newIngredient)
                        .then(handleForm)
                }}>Save</button>
            <button className="" onClick={handleForm}>Cancel</button>
        </form>
    )
}