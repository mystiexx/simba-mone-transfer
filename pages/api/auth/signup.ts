import * as bcrypt from 'bcrypt'
import prisma from '../../../lib/prisma'

export default async function handler(req, res) {
    const {  name, email, password } = req.body

    const salt = bcrypt.genSaltSync(12)
    const hash = bcrypt.hashSync(password, salt)

    //create new user
    const result = await prisma.user.create({
        data : {
            name: name,
            email: email,
            password: hash
        }
    })
    res.json(result)

    //if user is created, create user wallet
    if(result) {
        const newBalance = await prisma.wallet.createMany({
            data: [
                {
                    userId: result.id,
                    amount: 1000,
                    currency: 'USD',
                },
                {
                    userId: result.id,
                    amount: 0,
                    currency: 'EUR',
                },
                {
                    userId: result.id,
                    amount: 0,
                    currency: 'NGN',
                },
            ]
        })
        res.json(newBalance)
    }
}