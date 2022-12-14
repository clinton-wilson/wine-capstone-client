import { useEffect, useState } from "react"
import { getUsers } from "../managers/UserManager"
import { IsAdmin } from "./isAdmin"

export const AdminUserEdit = () => {
    const [users, setUsers] = useState([])

    const Users = () => {
        getUsers()
            .then(setUsers)
    }

    useEffect(() => {
        Users()
    }, [])

    return (
        <section className="section">
            <h2 className="title">Users</h2>
            <div className="list_container">
                {
                    users.map(user => {
                        return <div className="list_item">
                            <div>Name: {user.user.first_name} {user.user.last_name}</div>
                            <div>Username: {user.user.username}</div>
                            <div><IsAdmin userId={user.id} /></div>
                        </div>
                    })
                }
            </div>
        </section>
    )
}