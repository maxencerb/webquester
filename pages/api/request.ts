// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { AppRequestType, AppResponse } from '@models/request'
import { getHeaders, isValidRequest } from '@services/request'
import { serverFetch, setParamters } from '@services/serverRequest'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<AppResponse>
) {
    const { method, body } = req
    if (method === 'POST') {
        try {
        const request: AppRequestType = body as AppRequestType

        // Validate request
        if (!isValidRequest(request)) {
            res.status(400).json({
                type: 'error',
                error: 'Invalid request',
            })
        }

        // Get headers
        const headers = getHeaders(request)

        // Get parameters
        const parameters = setParamters(request, headers)

        // Start timer
        const timestamp1 = Date.now()
        // Make request
        const response = await serverFetch(request.url, parameters)
        // Stop timer
        const timestamp2 = Date.now()

        // If response is a string, it's an error
        if (typeof response === 'string') {
            res.status(500).json({
                type: 'error',
                error: response,
            })
            return
        }

        // const timeStamp1 = Date.now()
        const responseBody = await response.text()
        const responseSize = responseBody.length
        var responseHeaders: any = {}
        response.headers.forEach((value, key) => {
            responseHeaders[key] = value
        })
        const responseStatus = response.status
        const responseTime = timestamp2 - timestamp1
        res.status(200).json({
            type: 'ok',
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
