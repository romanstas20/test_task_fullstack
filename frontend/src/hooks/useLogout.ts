import {Cookies} from "react-cookie";
import {useCallback, useMemo} from "react";
import {useRouter} from "next/navigation";


export function useLogout() {
    const {push} = useRouter()

    const logout = useCallback(() => {
        const cookies = new Cookies();
        cookies.remove("token");
        push("/login");
    }, [push]);

    return useMemo(() => ({logout}), [logout])
}
