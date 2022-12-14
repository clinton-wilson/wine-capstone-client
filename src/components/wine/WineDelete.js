import { useState } from "react"
import { FaTrash } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { deleteWine, getWines } from "../managers/WineManager"

export const WineDelete = ({ wineId }) => {
    const navigate = useNavigate()


    const deleteWineEvent = (id) => {
        deleteWine(id)
            .then(() => {
                navigate('/wines')
            })
    }

    const confirmDelete = (id) => {
        if (window.confirm("Do you want to delete this wine?")) {
            deleteWineEvent(id)
        }
    }

    return (
        <span className="icon" onClick={() => {
            confirmDelete(wineId)
        }}><FaTrash /></span>
    )
}