import { useEffect, useState } from "react"
import { FaEdit, FaHeart, FaHeartBroken, FaTrash } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { deleteWine, favoriteWine, getWines, unfavoriteWine } from "../managers/WineManager"
import { Search } from "../search/Search"
import React from 'react';

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
                Wines()
            })
            .then(() => {
                navigate('/wines')
            })
    }

    const confirmDelete = (id) => {
        if (window.confirm("Do you want to delete this wine?")) {
            deleteWineEvent(id)
        }
    }

    useEffect(() => {
        Wines()
    }, [])

    return (
        <section className="section">
            <h3 className="title">Wines</h3>
            <Search setWines={setWines} wines={Wines} />
            {
                (wineUserAdmin === true)
                    ? <button className="new_wine_button" onClick={() => navigate('/wines/new')}>Add New Wine</button>
                    : ""
            }
            <article className="list_container">
                {
                    wines.map(wine => {
                        return <div key={`wine--${wine.id}`}
                            className="list_item">
                                <Link to={`/wines/${wine.id}`}>
                                    <div className="card">
                                        <div className="list_image"><img src={wine.photo} alt={wine.vintner} /></div>
                                        <div className="list_content">{wine.vintner} {wine.vintage} {wine?.varietal?.varietal}</div>
                                    </div></Link>

                                <div className="list_icons">
                                    {
                                        wine?.favorited ?
                                            <p className="list_icon">
                                                <FaHeart color="red" className="m-1" onClick={() => {
                                                    unfavoriteWine(wine.id)
                                                        .then(() => {
                                                            Wines()
                                                        })
                                                }} />Unlike</p>
                                            :
                                            <p className="list_icon">

                                                <FaHeart color="grey" className="m-1" onClick={() => {
                                                    favoriteWine(wine.id)
                                                        .then(() => {
                                                            Wines()
                                                        })
                                                }} />Like</p>
                                    }
                                    {
                                        (wineUserAdmin === true)
                                            ? <>                                        <p className="list_icon">
                                                <Link to={`/wines/edit/${wine.id}`}><FaEdit />Edit</Link></p>
                                                <p className="list_icon">
                                                    <span className="" onClick={() => {
                                                        confirmDelete(wine.id)
                                                    }}><FaTrash className="" />Delete</span></p></>
                                            : ""
                                    }
                                </div>
                        </div>
                    })
                }
            </article>
        </section>
    )
}