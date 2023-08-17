import {Cookies} from "react-cookie";
import {useMemo} from "react";
import {useRouter} from "next/navigation";


export function useLogout() {
    const {push} = useRouter()

    const cookies = new Cookies();

    const logout = () => {
        cookies.remove("token");
        push("/login")
    }
    return useMemo(() => ({logout}), [push])
}
