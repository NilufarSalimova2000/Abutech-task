import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";
import { Contract } from "../../pages/home/type";

export const useGetContracts = () => {
    return useQuery({
        queryKey: ["contract"],
        queryFn: () => request.get<Contract>("/api/staff/contracts/all").then((res) => res.data)
    })
}