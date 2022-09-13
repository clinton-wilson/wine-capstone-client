import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { getSearch } from "../managers/WineManager"

export const Search = ({ setWines, wines }) => {
    const [searchCriteria, setSearchCriteria] = useState([])
    const searchedWines = (e) => {
        e.preventDefault()
        getSearch(searchCriteria)
            .then(setWines)
    }

    return <section className="search">
        <p className="panel-heading">
            Search Wines
        </p>
        <div className="field has-addons">
            <form onSubmit={searchedWines}>
                <div className="control">
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
                </div>
            </form>
            <div className="control">
                <button className="button is-info" type="submit"  ><FaSearch /></button>
            </div>
        </div>
    </section>
}