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

    return(
        <section>
            {
                users.map(user => {
                    return <div>
                        <div>Name: {user.user.first_name} {user.user.last_name}</div>
                        <div>Username: {user.user.username}</div>
                        <div><IsAdmin userId={user.id}/></div>
                        </div>
                })
            }
        </section>
    )
}