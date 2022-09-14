import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getWines } from "../managers/WineManager"
import { Search } from "../search/Search"

export const WineList = () => {
    const [wines, setWines] = useState([])
    const navigate = useNavigate()
    const localWineAdmin = localStorage.getItem("wine_admin")
    const wineUserAdmin = JSON.parse(localWineAdmin)
    const Wines = () => {
        getWines()
        .then(setWines)
    }

    useEffect(() => {
        Wines()
    }, [])

    return (
        <article className="wines">
            <Search setWines={setWines} wines={Wines}/>
            {
                (wineUserAdmin===true)
                ? <button onClick={() => navigate('/wine/new')}>Add New Wine</button>
                : ""
            }
            
            {
                wines.map(wine => {
                    return <Link to={`/wines/${wine.id}`}><section key={`wine--${wine.id}`}
                    className="wine">
                        <div className="wine__photo"><img src={wine.photo} alt={wine.vintner}/></div>
                        <div className="wine__name">{wine.vintner} {wine.vintage} {wine?.varietal?.varietal}</div>
                    </section></Link>
                })
            }
        </article>
    )
}