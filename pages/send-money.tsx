import { useSession } from "next-auth/client";
import React, { useState, useEffect } from "react";
import Wrapper from "../component/wrapper";
import Head from "next/head";
import prisma from "../lib/prisma";
import { getSession } from "next-auth/client";
import { GetServerSideProps } from "next";
import Router from 'next/router'




export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const session = await getSession({ req });

    if (!session) {
        res.statusCode = 403;
        return { props: { user: [] } };
    }

    const user = await prisma.user.findMany();
    return {
        props: { user },
    };
};
const Transfer = (props) => {
    const [session] = useSession();
    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [fromCurrency, setFromCurrency] = useState("");
    const [toCurrency, setToCurrency] = useState("");
    const [exchangeRate, setExchangeRate] = useState(null);
    const [amount, setAmount] = useState(1);
    const [recipient, setRecipient] = useState("");
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

    let toAmount, fromAmount;

    if (amountInFromCurrency) {
        fromAmount = amount;
        toAmount = amount * exchangeRate;
    } else {
        toAmount = amount;
        fromAmount = amount / exchangeRate;
    }

    function handleFromAmountChange(e) {
        setAmount(e.target.value);
        setAmountInFromCurrency(true);
    }

    function handleToAmountChange(e) {
        setAmount(e.target.value);
        setAmountInFromCurrency(false);
    }

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const amount = Math.round(toAmount)
        try {
            const body = { recipient, fromCurrency, toCurrency, amount };
            const res = await fetch("/api/transaction", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            await res.json();
            await Router.push('/dashboard')
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (fromCurrency !== null && toCurrency !== null) {
            fetch("http://api.exchangeratesapi.io/v1/latest?access_key=3177c602fb93040e5e58345ae045f2cb")
                .then((res) => res.json())
                .then((data) => setExchangeRate(data.rates[toCurrency]));
        }
    }, [fromCurrency, toCurrency]);

    useEffect(() => {
        fetch("httppp://api.exchangeratesapi.io/v1/latest?access_key=3177c602fb93040e5e58345ae045f2cb")
            .then((res) => res.json())
            .then((data) => {
                const firstCurrency = Object.keys(data.rates)[0];
                setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
                setFromCurrency(data.base);
                setToCurrency(firstCurrency);
                setExchangeRate(data.rates[firstCurrency]);
            });
    }, []);
    return (
        <Wrapper>
            <Head>
                <title>Send Money</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="bg-gray-50 block h-screen items-center justify-center -my-32 p-4 md:flex">
                <div className="bg-white items-center p-4 space-y-8 overflow-hidden rounded-lg shadow-lg w-96 md:flex-row md:w-1/2">
                    <div className="flex flex-col items-center">
                        <h1 className="font-medium text-green-400 text-xl">Send money</h1>
                    </div>
                    <form onSubmit={submitData} className="flex flex-col space-y-4">
                        <select
                            onChange={(e) => setRecipient(e.target.value)}
                            value={recipient}
                            className="w-full border border-gray-300 outline-none placeholder-gray-400 pl-3 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-green-300"
                        >
                            {props.user.map((data) => (
                                <option key={data.id} value={data.name}>
                                    {data.name}
                                </option>
                            ))}
                        </select>
                        <div className="flex">
                            <input
                                type="number"
                                className="w-full border border-gray-300 outline-none placeholder-gray-400 pl-3 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-green-300"
                                value={fromAmount}
                                onChange={handleFromAmountChange}
                            />
                            <select
                                className="ml-5 border border-gray-300 outline-none placeholder-gray-400 pl-3 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-green-300"
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                            >
                                {currencyOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex">
                            <input
                                className="w-full border border-gray-300 outline-none placeholder-gray-400 pl-3 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-green-300"
                                type="number"
                                value={toAmount}
                                onChange={handleToAmountChange}
                            />
                            <select
                                className="ml-5 border border-gray-300 outline-none placeholder-gray-400 pl-3 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-green-300"
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                            >
                                {currencyOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            className="text-center bg-green-400 font-medium  items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-green-500"
                            type="submit"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </Wrapper>
    );
};

export default Transfer;
