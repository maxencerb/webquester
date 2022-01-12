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
    uid: string
}

type AppResponse = {
    status: number;
    body: string;
    time: number;
    size: number;
    headers: {
        [key: string]: string;
    }
}

export type {
    Request,
    AuthorizationInfo,
    HeadersType,
    AppRequestType,
    SaveRequestType,
    AppResponse
}