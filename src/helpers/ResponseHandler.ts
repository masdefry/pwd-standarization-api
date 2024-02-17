import { IResponseHandlerProps } from "./types";

export const responseHandler = ({ res, status, data, message, error }: IResponseHandlerProps) => {
    return res.status(status || 200).send({
        error: error || false,
        message,
        data: data || null,
    });
}