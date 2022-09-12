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

    return
}