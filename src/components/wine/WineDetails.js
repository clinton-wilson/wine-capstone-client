import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSingleWine } from "../managers/WineManager"

export const WineDetails = () => {
    const [wine, setWine] = useState([])
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
        </article>
    )

}