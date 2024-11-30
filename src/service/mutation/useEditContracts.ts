import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";
import { client } from "../../config/query-client";
import { EditType } from "./useEditType";

export const useEditContracts = () => {
    return useMutation({
        mutationFn: ({id, data}: { id: number; data: EditType }) => request.put(`/api/staff/contracts/${id}`, data).then((res) => res.data),
        onSuccess: () => {
            client.invalidateQueries(["contract"])
        }   })
}