import { FaTrash } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { deleteWine } from "../managers/WineManager"

export const WineDelete = ({ wineId }) => {
    const navigate = useNavigate()
    const deleteWineEvent = (id) => {
        deleteWine(id)
            .then(() => {
                navigate('/wines')
            })
    }

    const confirmDelete = (id) => {
        if (window.confirm("Do you want to delete this recipe?")) {
            deleteWineEvent(id)
        }
    }

    return (
        <span className="icon" onClick={() => {
            confirmDelete(wineId)
        }}><FaTrash /></span>
    )
}