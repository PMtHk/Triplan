// logout API

import { connectToDB } from '@/lib/mongoose'
import Token from '@/lib/models/token.model'
import { NextApiRequest, NextApiResponse } from 'next'

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try{
        // Connect to MongoDB
        connectToDB()

        // remove refreshToken from HTTPOnly cookie
        const { refreshToken } = req.cookies
        res.setHeader(
            'Set-Cookie',
            `refreshToken=; Path=/; Expires=${new Date(
                Date.now() - 1,
            ).toUTCString()}; HttpOnly;`
        )

        // remove refreshToken from DB
        if (refreshToken) {
            await Token.findByIdAndUpdate({
                refresh_token: refreshToken
            }, {
                refresh_token: ''
            })

            res.statusCode = 200
            return res.json({
                serviceCode: 'SUCCESS_LOGOUT',
                message: '로그아웃에 성공했습니다.'
            })
        }

        res.statusCode = 200
        return res.json({
            serviceCode: 'INFO_NOT_LOGGED_IN',
            message: '로그인 상태가 아닙니다.'
        })
    } catch (error: any) {
        res.statusCode = 500
        return res.json({
            serviceCode: 'ERROR_LOGOUT',
            message: '로그아웃 중 오류가 발생했습니다.'
        })
    }
}
