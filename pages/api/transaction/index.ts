import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
    const { recipient, fromCurrency, toCurrency, amount } = req.body;

    const session = await getSession({ req });
    let sender = session.user.name

    const result = await prisma.transaction.create({
        data: {
            sender: sender,
            recipient: recipient,
            amount: Number(amount),
            baseCurrency: fromCurrency,
            toCurrency: toCurrency,
            user: { connect: { email: session?.user?.email } },
        },
    });
    res.json(result);
}
