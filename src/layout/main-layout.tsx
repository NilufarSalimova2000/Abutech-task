import { Navigate, Outlet } from "react-router-dom"
import { loadState } from "../config/storage";

export const MainLayout = () => {
    const accessToken = loadState("token");
    if (!accessToken) {
        return <Navigate replace to={"/"} />
    }
    return (
        <>
            <header></header>
            <Outlet />
        </>
    )
}