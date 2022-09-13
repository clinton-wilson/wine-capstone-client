import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { getSearch } from "../managers/WineManager"

export const Search = ({ setWines, wines }) => {
    const [searchCriteria, setSearchCriteria] = useState([])
    const searchedWines = () => {
        getSearch(searchCriteria)
            .then(setWines)
    }
    
    return <section className="search">
        <p className="panel-heading">
            Search Wines
        </p>
        <div className="field has-addons">
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
            <div className="control">
                <a className="button is-info" onClick={searchedWines} ><FaSearch /></a>
            </div>
        </div>
    </section>
}