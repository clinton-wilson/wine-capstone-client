import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { getSearch } from "../managers/WineManager"
import "./search.css"
export const Search = ({ setWines, wines }) => {
    const [searchCriteria, setSearchCriteria] = useState([])
    const searchedWines = (e) => {
        e.preventDefault()
        getSearch(searchCriteria)
            .then(setWines)
    }

    return <section className="search">
            <form  onSubmit={searchedWines}>
                    <input
                        onChange={
                            (e) => {
                                setSearchCriteria(e.target.value.toLowerCase())
                                if (e.target.value === "") {
                                    wines()
                                }
                            }
                        }

                        type="search" placeholder="Search wine"
                        className="input" />
            </form>
            <div className="control">
                <button className="search_button" type="submit"  ><FaSearch /></button>
            </div>
    </section>
}