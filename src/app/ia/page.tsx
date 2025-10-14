import IaPageClient from "./client"
//carregar os .env 

export default async function IaPage() {

    const api = process.env.API_URL as string
    const token = process.env.API_KEY as string

    return (

        <IaPageClient api={api} token={token}/>

    )


}

