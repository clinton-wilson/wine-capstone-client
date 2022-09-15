import { useEffect, useState } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { deleteWine, getWines } from "../managers/WineManager"
import { Search } from "../search/Search"
import { WineDelete } from "./WineDelete"

export const WineList = () => {
    const [wines, setWines] = useState([])
    const navigate = useNavigate()
    const localWineAdmin = localStorage.getItem("wine_admin")
    const wineUserAdmin = JSON.parse(localWineAdmin)
    const Wines = () => {
        getWines()
            .then(setWines)
    }

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

    useEffect(() => {
        Wines()
    }, [])

    return (
        <article className="wines">
            <Search setWines={setWines} wines={Wines} />
            {
                (wineUserAdmin === true)
                    ? <button onClick={() => navigate('/wines/new')}>Add New Wine</button>
                    : ""
            }
            {
                wines.map(wine => {
                    return <Link to={`/wines/${wine.id}`}><section key={`wine--${wine.id}`}
                        className="wine">
                        <div className="wine__photo"><img src={wine.photo} alt={wine.vintner} /></div>
                        <div className="wine__name">{wine.vintner} {wine.vintage} {wine?.varietal?.varietal}</div>
                        {
                            (wineUserAdmin === true)
                                ? <><Link to={`/wines/edit/${wine.id}`}><FaEdit /></Link>
                                    <WineDelete wineId = {wine.id}/></>
                                : ""
                        }
                    </section></Link>
                })
            }
        </article>
    )
}