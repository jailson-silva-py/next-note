import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"

const useCustomParams  = () => {

    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const params = new URLSearchParams(searchParams.toString())

    const updateUrl = (replace:boolean=true) => {
        /* use To params from to update Url */
        if(replace) {

            router.replace(pathname+'?'+params.toString())
            return
            
        } 
        
        router.push(pathname+'?'+params.toString())

    }


    return {pathname, router, searchParams, params, updateUrl}

}

export default useCustomParams