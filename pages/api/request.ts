// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { AppRequestType } from '@models/request'

type Response = {
    status: number;
    body: string;
    time: number;
    size: number;
    headers: {
        [key: string]: string;
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>
) {
    const { method, body } = req
    if (method === 'POST') {
        const request: AppRequestType = JSON.parse(body)
        const response = await 
    } else {
        // incorrect request method
        res.status(405).end()
    }
}
