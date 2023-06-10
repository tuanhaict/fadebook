import { useEffect, useState} from "react"
import { setLoading } from "../../redux/features/loadingSlice"


export const useFetchData = (callback: Function) => {
    const [isFetched, setIsFetched] = useState(false);
    useEffect(()=> {
        setLoading(true);
        callback().then(() => {
            setIsFetched(true);
            setLoading(false)
        })
    }, [])
    return isFetched;
}