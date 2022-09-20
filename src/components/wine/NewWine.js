import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getIngredients } from "../managers/MainIngredientManager"
import { getVarietals } from "../managers/VarietalManager"
import { createWine } from "../managers/WineManager"
import React from 'react';


export const NewWine = () => {
    const navigate = useNavigate()
    const [varietals, setVarietals] = useState([])
    const [ingredients, setIngredients] = useState([])
    const user = localStorage.getItem("current_wine_user")
    const currentWineUser = JSON.parse(user)
    const [wine, setWine] = useState({
        vintner: "",
        vintage: 2022,
        varietal_id: 0,
        photo: "",
        submitted_by: currentWineUser,
        main_ingredient_id: 0
    })

    useEffect(() => {
        getVarietals().then(data => setVarietals(data))
    }, [])

    useEffect(() => {
        getIngredients().then(data => setIngredients(data))
    }, [])

    const changeWineState = (e) => {
        const newWine = { ...wine }
        newWine[e.target.name] = e.target.value
        setWine(newWine)
    }
    return (
        <form className="form">
            <h1 className="title">Add Wine</h1>
            <fieldset className="field">
                <div className="form-group">
                    <label className="label" htmlFor="vintner">Vintner: </label>
                    <input type="text" name="vintner" required autoFocus className="form-control"
                        value={wine.vintner}
                        onChange={changeWineState} />
                </div>
            </fieldset>
            <fieldset className="field">
                <div className="form-group">
                    <label className="label" htmlFor="vintage">Vintage: </label>
                    <input type="number" min="1900" max="2022" name="vintage" className="form-control"
                        value={wine.vintage}
                        onChange={changeWineState} />
                </div>
            </fieldset>
            <fieldset className="field">
                <div className="form-group">
                    <label className="label" htmlFor="varietal_id">Varietal: </label>
                    <select name="varietal_id"
                        proptype="int"
                        value={parseInt(wine.varietal_id)}
                        onChange={changeWineState}>
                        <option value="0">Select Varietal</option>
                        {varietals.map(v => (
                            <option key={v.id} value={v.id}>
                                {v.varietal}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset className="field">
                <div className="form-group">
                    <label htmlFor="photo">Photo: </label>
                    <input type="textarea" name="photo" className="form-control"
                        value={wine.photo}
                        onChange={changeWineState} />
                </div>
            </fieldset>
            <fieldset className="field">
                <div className="form-group">
                    <label className="label" htmlFor="main_ingredient_id">Main Ingredient: </label>
                    <select name="main_ingredient_id"
                        proptype="int"
                        value={parseInt(wine.main_ingredient_id)}
                        onChange={changeWineState}>
                        <option value="0">Select Main Ingredient Pairing</option>
                        {ingredients.map(mi => (
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

                    const newWine = {
                        vintner: wine.vintner,
                        vintage: wine.vintage,
                        varietal: parseInt(wine.varietal_id),
                        photo: wine.photo,
                        submitted_by: currentWineUser,
                        main_ingredient: parseInt(wine.main_ingredient_id)
                    }

                    createWine(newWine)
                    .then(() => navigate("/wines"))
                }}
                className="btn btn-primary">Save</button>
                <button type="cancel"
                onClick={() => navigate(`/wines`)}>Cancel</button>
        </form>
    )
}