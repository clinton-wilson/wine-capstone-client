import { useEffect, useState } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { deleteWine, favoriteWine, getWines, unfavoriteWine } from "../managers/WineManager"
import { Search } from "../search/Search"
import { WineDelete } from "./WineDelete"

export const WineList = () => {
    const [wines, setWines] = useState([])
    const navigate = useNavigate()
    const localWineAdmin = localStorage.getItem("wine_admin")
    const wineUserAdmin = JSON.parse(localWineAdmin)
    const localWineUser = localStorage.getItem("current_wine_user")
    const currentWineUser = JSON.parse(localWineAdmin)
    const Wines = () => {
        getWines()
            .then(setWines)
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
                    return <section key={`wine--${wine.id}`}
                        className="wine"><Link to={`/wines/${wine.id}`}>
                            <div className="wine__photo"><img src={wine.photo} alt={wine.vintner} /></div>
                            <div className="wine__name">{wine.vintner} {wine.vintage} {wine?.varietal?.varietal}</div></Link>
                        {
                            wine?.favorited ?
                                <button className="unfavoriteButton" onClick={() => {
                                    unfavoriteWine(wine.id)
                                        .then(() => {
                                            Wines()
                                        })
                                }}>Unfavorite</button>
                                :
                                <button className="favoriteButton" onClick={() => {
                                    favoriteWine(wine.id)
                                        .then(() => {
                                            Wines()
                                        })
                                }}>Favorite</button>
                        }
                        {
                            (wineUserAdmin === true)
                                ? <><Link to={`/wines/edit/${wine.id}`}><FaEdit /></Link>
                                    <WineDelete wineId={wine.id} /></>
                                : ""
                        }
                    </section>
                })
            }
        </article>
    )
}