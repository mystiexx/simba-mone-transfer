import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
    const { recipient, fromCurrency, toCurrency, toAmount } = req.body;

    const session = await getSession({ req });

    const result = await prisma.transaction.create({
        data: {
            sender: session?.user?.name,
            recipient: recipient,
            amount: toAmount,
            baseCurrency: fromCurrency,
            toCurrency: toCurrency,
            user: { connect: { email: session?.user?.email } },
        },
    });
    res.json(result);
}
