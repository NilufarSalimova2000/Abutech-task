import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";
import { CreateType } from "./useCreateType";

export const useCreateContracts = () => {
    return useMutation({
        mutationFn: (data:CreateType ) => request.post("/api/staff/contracts/create", data).then((res) => res.data)
    })
}