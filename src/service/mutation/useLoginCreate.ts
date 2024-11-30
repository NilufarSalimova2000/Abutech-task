import { request } from "../../config/request";
import { useMutation } from "@tanstack/react-query";
import { tokenType, useLoginType } from "./useLoginType";

export const useLoginCreate = () => {
    return useMutation({
        mutationFn:(data: useLoginType) => request.post<tokenType>("/api/staff/auth/sign-in", data).then((res) => res.data)
    })
}
