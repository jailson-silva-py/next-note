const useLocalStorage = () => {
   
    const getStorage = <T>(name:string) => {

        const jsonData = localStorage.getItem(name) as string
        const data = JSON.parse(jsonData)
        return data as T

    }

    const setStorage = (name:string, value:any) => {

        localStorage.setItem(name, JSON.stringify(value))

    }

    return { getStorage, setStorage }

}

export default useLocalStorage