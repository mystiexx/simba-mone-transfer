import prisma from "../lib/prisma";
import {  getSession } from "next-auth/client";
import { GetServerSideProps } from "next";
import React from "react";
import Wrapper from "../component/wrapper";
import Head from "next/head";
import TransactionCard from "../component/transactionCard";

export type PostProps = {
    id: number;
    sender: string;
    recipient: string;
    amount: number;
    baseCurrency: string;
    toCurrency: string;
    user: {
        name: string;
        email: string;
    } | null;
    status: boolean;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getSession({ req });

    if (!session) {
        res.statusCode = 403;
        return { props: { transaction: [] } };
    }

    const transaction = await prisma.transaction.findMany({
        where: {
            user: {
                email: session?.user?.email,
            },
        },
    });
    console.log(transaction);
    return {
        props: { transaction },
    };
};

type Props = {
    transaction: PostProps[];
};

const Transaction = (props) => {
    return (
        <div>
            <Wrapper>
                <Head>
                    <title>Transaction</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <div className="bg-gray-50 h-screen  p-4 md:flex">
                    <div className="container max-w-6xl  mx-auto">
                        <TransactionCard transaction={props.transaction} />
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

export default Transaction;
