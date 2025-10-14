import { getUserById } from "@/actions"
import NavBarClient from "./NavBarClient"


const NavBar = async ()  => {

    const user = await getUserById()
    


    return (

        <NavBarClient user={user}/>

    )

}

export default NavBar