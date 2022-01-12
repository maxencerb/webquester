// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { AppRequestType, AppResponse } from '@models/request'
import { getHeaders } from '@services/request'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AppResponse>
) {
    const { method, body } = req
    if (method === 'POST') {
        try {
        const request: AppRequestType = body as AppRequestType
        const headers = getHeaders(request)
        const currentTimeStamp = Date.now()

        var parameters: any = {
            method: request.method,
            headers,
        }
        if (request.body.length !== 0) {
            parameters['body'] = request.body
        }
        const response = await fetch(request.url, parameters)


        // const timeStamp1 = Date.now()
        const responseBody = await response.text()
        const timeStamp2 = Date.now()
        const responseSize = responseBody.length
        var responseHeaders: any = {}
        response.headers.forEach((value, key) => {
            responseHeaders[key] = value
        })
        const responseStatus = response.status
        const responseTime = timeStamp2 - currentTimeStamp
        res.status(responseStatus).json({
            status: responseStatus,
            body: responseBody,
            time: responseTime,
            size: responseSize,
            headers: responseHeaders,
        })} catch (error) {
            res.status(500)
        }
    } else {
        // incorrect request method
        res.status(405).end()
    }
}
