import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getIngredients } from "../managers/MainIngredientManager"
import { getVarietals } from "../managers/VarietalManager"
import { getSingleWine, updateWine } from "../managers/WineManager"
import React from 'react';


export const WineEdit = () => {
    const [mainIngredients, setMainIngredient] = useState([])
    const [varietals, setVarietals] = useState([])
    const { wineId } = useParams()
    const [editWine, setEditWine] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        getIngredients().then(data => setMainIngredient(data))
    }, [])

    useEffect(() => {
        getSingleWine(wineId).then(data => {
            // data.main_ingredient = data.main_ingredient.id
            // data.varietal = data.varietal.id
            setEditWine(data)
        })
    }, [])

    useEffect(() => {
        getVarietals().then(data => setVarietals(data))
    }, [])

    return (<section className="form_section">
        <form className="form">
            <h2 className="title">Edit Wine</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus
                        className="form-control"
                        value={editWine.title}
                        onChange={(e) => {
                            const copy = { ...editWine }
                            copy.title = e.target.value
                            setEditWine(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <textarea type="text" name="description" required autoFocus
                        className="form-control"
                        value={editWine.description}
                        onChange={(e) => {
                            const copy = { ...editWine }
                            copy.description = e.target.value
                            setEditWine(copy)
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Price: </label>
                    <input type="text" name="price" className="form-control"
                        value={editWine.price}
                        onChange={(e) => {
                            const copy = { ...editWine }
                            copy.price = e.target.value
                            setEditWine(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="varietal_id">Varietal: </label>
                    <select name="varietal_id"
                        proptype="int"
                        value={parseInt(editWine.varietal)}
                        onChange={(e) => {
                            const copy = { ...editWine }
                            copy.varietal = e.target.value
                            setEditWine(copy)
                        }}>
                        <option value="0">Select Varietal</option>
                        {varietals.map(v => (
                            <option key={v.id} value={v.id}>
                                {v.varietal}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="photo">Photo: </label>
                    <input type="textarea" name="photo" className="form-control"
                        value={editWine.photo}
                        onChange={(e) => {
                            const copy = { ...editWine }
                            copy.photo = e.target.value
                            setEditWine(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="main_ingredient_id">Main Ingredient: </label>
                    <select name="main_ingredient_id"
                        proptype="int"
                        value={parseInt(editWine.main_ingredient)}
                        onChange={(e) => {
                            const copy = { ...editWine }
                            copy.main_ingredient = e.target.value
                            setEditWine(copy)
                        }}>
                        <option value="0">Select Main Ingredient Pairing</option>
                        {mainIngredients.map(mi => (
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

                    const wine = {
                        id: wineId,
                        title: editWine.title,
                        price: editWine.price,
                        description: editWine.description,
                        varietal: parseInt(editWine.varietal),
                        photo: editWine.photo,
                        submitted_by: editWine.submitted_by,
                        main_ingredient: parseInt(editWine.main_ingredient)
                    }
                    updateWine(wineId, wine)
                        .then(() => navigate(`/wines/${wineId}`))
                }}
                className="btn btn-primary"
            >Save</button>
            <button type="cancel"
                onClick={() => navigate(`/wines`)}>Cancel</button>
        </form>
    </section>
    )
}