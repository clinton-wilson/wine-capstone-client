import { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getSingleWine } from "../managers/WineManager"
import { RecipePairings } from "../recipes/RecipePairings"
import { WineDelete } from "./WineDelete"
import React from 'react';


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

    return (<section className="detail_container">
        <h2 className="title">{wine.title}</h2>
        <article className="details">
            <div className="detail_image"><img src={wine.photo} alt={wine.vintner} /></div>
            <div className="detail">{wine.description}</div>
            <div className="detail">Price: {wine.price}</div>
            <div className="detail">Pairing main ingredients: <Link to={`/pairings/${wine.id}`}>{wine?.main_ingredient?.ingredient}</Link></div>
            <div className="detail_icons">
            {
                (wineUserAdmin === true)
                    ? <><Link to={`/wines/edit/${wine.id}`}><FaEdit /></Link>
                        <WineDelete wineId={wine.id} /></>
                    : ""
            }</div>
            <button type="detail_icon"
                onClick={() => navigate(`/wines`)}>Back to Wines</button>
        </article>
    </section>
    )

}