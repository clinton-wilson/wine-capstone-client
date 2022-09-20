import { useEffect, useState } from "react"
import { FaEdit } from "react-icons/fa"
import { Link, useParams } from "react-router-dom"
import { favoriteWine, getWines, unfavoriteWine } from "../managers/WineManager"
import { WineDelete } from "./WineDelete"
import React from 'react';


export const WineVarietals = () => {
    const [wines, setWines] = useState([])
    const localWineAdmin = localStorage.getItem("wine_admin")
    const wineUserAdmin = JSON.parse(localWineAdmin)
    const { varietalId } = useParams()
    const Wines = () => {
        getWines()
            .then(setWines)
    }

    useEffect(() => {
        Wines()
    }, [])

    return (
        wines.map(wine => {
            if (wine?.varietal?.id === parseInt(varietalId)) {
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
            }
        })
    )
}