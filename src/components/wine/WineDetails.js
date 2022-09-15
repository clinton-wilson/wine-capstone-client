import { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getSingleWine } from "../managers/WineManager"
import { RecipePairings } from "../recipes/RecipePairings"
import { WineDelete } from "./WineDelete"

export const WineDetails = () => {
    const [wine, setWine] = useState([])
    const navigate = useNavigate()
    const localWineAdmin = localStorage.getItem("wine_admin")
    const wineUserAdmin = JSON.parse(localWineAdmin)
    const { wineId } = useParams()
    const Wine = () => {
        getSingleWine(wineId)
            .then(setWine)
    }

    useEffect(() => {
        Wine()
    }, [])

    return (
        <article className="wineDetails">
            <h2 className="wineDetails__name">{wine.vintner} {wine.vintage} {wine?.varietal?.varietal}</h2>
            <div className="wineDetails__photo"><img src={wine.photo} alt={wine.vintner}/></div>
            <div className="wineDetails__pairings">Pairing main ingredients: <ul><Link to={<RecipePairings/>}><li>{wine?.main_ingredient?.ingredient}</li></Link></ul></div>
            {
                            (wineUserAdmin === true)
                                ? <><Link to={`/wines/edit/${wine.id}`}><FaEdit /></Link>
                                    <WineDelete wineId = {wine.id}/></>
                                : ""
                        }
                        <button type="cancel"
                onClick={() => navigate(`/wines`)}>Back to Wines</button>
        </article>
    )

}