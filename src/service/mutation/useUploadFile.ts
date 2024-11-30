import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";
import { CreateType } from "./useCreateType";

export const useUploadFile = () => {
    return useMutation({
        mutationFn: (data: FormData) => request.post<CreateType>("/api/staff/upload/contract/attachment", data).then((res) => res.data)
    })
}