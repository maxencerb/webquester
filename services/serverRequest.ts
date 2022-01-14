import { AppRequestType } from "@models/request";

const setParamters = (request: AppRequestType, headers: { [key: string]: string }) => {
    var parameters: any = {
        method: request.method,
        headers,
    }
    if (request.body.length !== 0) {
        parameters['body'] = request.body
    }
    return parameters
}

const serverFetch = async (url: string, parameters: any): Promise<Response | string> => {
    const controller = new AbortController()
    const id = setTimeout(() => {
        controller.abort()
    }, 8000)
    try {
        const response = await fetch(url, {
            ...parameters,
            signal: controller.signal,
        })
        clearTimeout(id)
        return response
    } catch (error: any) {
        return error.message
    }
}

export {
    setParamters,
    serverFetch
}