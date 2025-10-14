
import { redirect } from "next/navigation"
import ProfileClientPage from "./client"
import { getUserById } from "@/actions"

const ProfilePage = async () => {

    const user = await getUserById()

    if (user === null) redirect('/todos')

    return (

        <ProfileClientPage user={user}/>

    )

}

export default ProfilePage