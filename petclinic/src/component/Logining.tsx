import axios from "axios"
import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { backend_url } from "../const/const"
import { user } from "../type/user"

type prop = {
    setUser: React.Dispatch<React.SetStateAction<user | undefined>>
}
const Logining: React.FC<prop> = (prop: prop) => {
    const navigate = useNavigate();
    const [params] = useSearchParams()
    useEffect(() => {
        axios.get(`http://${backend_url}/login`, {
            params: {
                oauth_token: params.get("oauth_token"),
                oauth_verifier: params.get("oauth_verifier")

            }
        }).then(res => prop.setUser(res.data)).then(() => navigate("/"))
    }, [])
    return (
        <>
            認証中…
        </>
    )
}

export default Logining;