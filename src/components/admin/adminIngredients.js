import { useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { deleteIngredient, getIngredients } from "../managers/MainIngredientManager"
import { NewIngredient } from "./newIngredient"

export const AdminIngredients = () => {
    const [ingredients, setIngredients] = useState([])
    const [isShown, setIsShown] = useState(false)
    const navigate = useNavigate()
    const Ingredients = () => {
        getIngredients()
            .then(setIngredients)
    }

    const handleForm = event => {
        setIsShown(true)
        
    }

    useEffect(() => {
        Ingredients()
    }, [])

    const deleteIngredientEvent = (ingredientId) => {
        deleteIngredient(ingredientId)
            .then(() => {
                Ingredients()
            })
        
    }
    const confirmDelete = (id) => {
        if (window.confirm("Do you want to delete this ingredient?")) {
            deleteIngredientEvent(id)
        }
    }
    return (
        <section>
            <h3 className="title">Ingredients</h3>
            <button className="" onClick={handleForm}>Add New Ingredient</button>
            {isShown && <NewIngredient setIsShown={setIsShown}  ingredients={Ingredients}/>}
            <div className="list_container">
                {
                    ingredients.map(ingredient => {
                        return (
                            <div>
                                <div>{ingredient.ingredient}</div>
                                <div className="list_icon">
                                    <div className="" onClick={() => {
                                        confirmDelete(ingredient.id)
                                    }}><FaTrash /></div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>)
}