import Wrapper from "../component/wrapper";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import Link from "next/link";

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

    const user = await prisma.user.findMany({
        where: {
            email: session?.user?.email,
        },
        include: {
            transaction: true,
            wallet: true,
        },
    });
    return {
        props: { user },
    };
};

type Props = {
    user: PostProps[];
};

const Dashboard = (props) => {
    const [balance, setBalance] = useState();
    const [transaction, setTransaction] = useState();

    const getTransaction = () => {
        let user = props.user.map((data) => {
            return data.transaction.reduce(function (prev, current) {
                return prev + +current.amount;
            }, 0);
        });
        setBalance(user.toString());
    };

    useEffect(() => {
        getTransaction();
    }, []);
    return (
        <Wrapper>
            <Head>
                <title>Dashboard</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="bg-gray-50 h-screen  p-4 md:flex">
                <div className="container max-w-6xl  mx-auto">
                    <h1 className="text-gray-700 font-medium">Overview</h1>
                    <div className="flex">
                        <div className="bg-white shadow-md w-1/2 p-4 mt-5 overflow-hidden rounded-md">
                            <p className="text-center text-gray-700 font-medium">
                                Your Total Balance
                            </p>
                            <h1 className="font-medium text-green-400 text-center text-7xl">
                                {balance}
                            </h1>
                        </div>

                        <div className="bg-white  shadow-md w-1/2 p-5 mt-5 overflow-hidden rounded-md ml-5">
                            <p className="text-center text-gray-700 font-medium">Wallet</p>
                            <div className='grid grid-cols-3 gap-4 flex item-center justify-center'>
                                {props.user.map((data) => {
                                    return data.wallet.map((wallet) => (
                                        <div key={wallet.id}>
                                            <p className='text-center mt-5 text-2xl'>
                                                {" "}
                                                {wallet.amount} {wallet.currency}{" "}
                                            </p>
                                        </div>
                                    ));
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-md w-full p-4 mt-5 rounded-lg">
                        <div className="flex justify-between">
                            <h1 className="font-medium text-gray-400 text-xl">Transaction</h1>

                            <Link href="/send-money">
                                <a className="bg-green-400 font-medium inline-flex items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-green-500">
                                    {" "}
                                    Send Money{" "}
                                </a>
                            </Link>
                        </div>
                        <table className="w-full border-collapse mt-4 border border-gray-100">
                            <thead>
                                <tr>
                                    <th className="border border-gray-100 bg-gray-200">Sender</th>
                                    <th className="border border-gray-100">Recipient</th>
                                    <th className="border border-gray-100">Amount</th>
                                    <th className="border border-gray-100">Currency</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.user.map((data) => {
                                    return data.transaction.map((trans) => (
                                        <tr key={trans.id}>
                                            <td className="border border-gray-100 text-center">
                                                {trans.sender}
                                            </td>
                                            <td className="border border-gray-100 text-center">
                                                {trans.recipient}
                                            </td>
                                            <td className="border border-gray-100 text-center">
                                                {trans.amount}
                                            </td>
                                            <td className="border border-gray-100 text-center">
                                                {trans.baseCurrency}
                                            </td>
                                        </tr>
                                    ));
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Dashboard;
