import { useSession } from "next-auth/client";
import React, { useState, useEffect } from "react";
import Wrapper from "../component/wrapper";
import Head from "next/head";

const BASE_URL =
    "http://api.exchangeratesapi.io/v1/latest?access_key=3177c602fb93040e5e58345ae045f2cb";

export default function Transfer() {
    const [session] = useSession();
    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [fromCurrency, setFromCurrency] = useState("");
    const [toCurrency, setToCurrency] = useState("");
    const [exchangeRate, setExchangeRate] = useState(null);
    const [amount, setAmount] = useState(1);
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

    useEffect(() => {
        if (fromCurrency !== null && toCurrency !== null) {
            fetch(`${BASE_URL} ?base=${fromCurrency}&symbols=${toCurrency}`)
                .then((res) => res.json())
                .then((data) => setExchangeRate(data.rates[toCurrency]));
        }
    }, [fromCurrency, toCurrency]);

    useEffect(() => {
        fetch(BASE_URL)
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
                <div className="bg-white items-center max-w-screen-sm p-4 space-y-8 overflow-hidden rounded-lg shadow-lg w-full md:flex-row md:w-1/2">
                    <div className="flex flex-col items-center">
                        <h1 className="font-medium text-green-400 text-xl">Send money</h1>
                    </div>
                    <form className="flex flex-col space-y-4">
                        <select className="w-full border border-gray-300 outline-none placeholder-gray-400 pl-3 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-green-300">
                            <option>Name</option>
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
                            className="text-center bg-green-400 font-medium inline-flex items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-green-500"
                            type="submit"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </Wrapper>
    );
}
