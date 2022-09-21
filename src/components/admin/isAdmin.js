import { useEffect, useState } from "react"
import { getSingleUser, updateUser } from "../managers/UserManager"

export const IsAdmin = ({ userId }) => {
    const [user, setUser] = useState({})
    const User = (userId) => {
        getSingleUser(userId)
            .then(setUser)
    }

    useEffect(() => {
        User(userId)
    }, [])

    return (
        <section>
            <form>
                <fieldset>
                    <div>{user.admin}</div>
                    <div className="form-group">
                        <label htmlFor="admin"> Admin </label>
                        <input type="checkbox" name="admin" checked={user.admin}
                            onChange={(e) => {
                                const copy = { ...user }
                                copy.admin = e.target.checked
                                setUser(copy)
                            }}
                        />
                    </div>
                </fieldset>
                <button type="submit"
                onClick={e => {
                    e.preventDefault()
                
                    const updatedUser = {
                        id: user.id,
                        photo: user.photo,
                        bio: user.bio,
                        admin: user.admin,
                        user: user.user
                    }
                    updateUser(userId, updatedUser)
                    
                }}>Update</button>
            </form>
        </section>
    )
}