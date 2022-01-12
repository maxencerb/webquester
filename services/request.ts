import { defaultHeaders } from "@services/utils/request";
import { Request, AppRequestType, AppResponse } from "@models/request";

const localRequest = async (request: Request) => {
    const headers: any = {
        ...defaultHeaders,
        ...request.headers,
    }

    const res = await fetch(request.url, {
            method: request.method,
            headers,
        })
    
    return res
}

const fromRequestToRawRequest = (request: AppRequestType): string => {
    let content = `${request.method} /${request.url.split('/').splice(3).join('/')} HTTP/1.1\r\n`;
    content += `Host: ${request.url.split('/')[2]}\r\n`;

    if ((request.authInfo.type === 'Basic' && request.authInfo.username && request.authInfo.password) || ((request.authInfo.type === 'Bearer' || request.authInfo.type === 'Custom') && request.authInfo.token)) {
        const type = request.authInfo.type !== 'Custom' ? request.authInfo.type : '';
        const token = request.authInfo.type === 'Basic' ? btoa(`${request.authInfo.username}:${request.authInfo.password}`) : request.authInfo.token;
        content += `Authorization: ${type} ${token}\r\n`;
    }
    request.headers.forEach((header) => {
        if (header.name === 'Content-Type' && request.body.length === 0) return 
        content += `${header.name}: ${header.value}\r\n`;
    });
    if (request.body.length !== 0) {
        content += `Content-Length: ${request.body.length}\r\n\r\n`;
        content += request.body;
    }
    return content;
}

const getHeaders = (req: AppRequestType): { [key: string]: string } => {
    const headers: { [key: string]: string } = {};
    if ((req.authInfo.type === 'Basic' && req.authInfo.username && req.authInfo.password) || ((req.authInfo.type === 'Bearer' || req.authInfo.type === 'Custom') && req.authInfo.token)) {
        const type = req.authInfo.type !== 'Custom' ? req.authInfo.type : '';
        const token = req.authInfo.type === 'Basic' ? btoa(`${req.authInfo.username}:${req.authInfo.password}`) : req.authInfo.token;
        headers['Authorization'] = `${type} ${token}`;
    }
    req.headers.forEach((header) => {
        if (header.name === 'Content-Type' && req.body.length === 0) return 
        headers[header.name] = header.value;
    });
    return headers;
}

const makeRequest = async (request: AppRequestType): Promise<AppResponse> => {
    const res = await fetch('/api/request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    })
    const data = await res.json();
    return data as AppResponse;
}

export {
    localRequest,
    fromRequestToRawRequest,
    getHeaders,
    makeRequest,
}