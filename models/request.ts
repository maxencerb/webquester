import { methods } from '@services/utils/request';

type HeadersType = Array<{
    name: string
    value: string
    uid: string
}>

type Request = {
    url: string;
    method: string,
    headers: HeadersType,
    body: string;
}

type AuthorizationInfo = {
    type: "Bearer" | "Custom";
    token: string;
} | {
    type: "Basic";
    username: string;
    password: string;
}

type AppRequestType = Request & { authInfo: AuthorizationInfo }

type SaveRequestType = {
    request: AppRequestType,
    title: string,
    uid: string,
    timestamp: number
}

type OkAppResponse = {
    type: "ok";
    status: number;
    body: string;
    time: number;
    size: number;
    headers: {
        [key: string]: string;
    }
}

type ErrorAppResponse = {
    type: "error";
    error: string;
}

type AppResponse = OkAppResponse | ErrorAppResponse

export type {
    Request,
    AuthorizationInfo,
    HeadersType,
    AppRequestType,
    SaveRequestType,
    AppResponse,
    OkAppResponse,
    ErrorAppResponse
}