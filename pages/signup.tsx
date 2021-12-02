import React, { useState } from "react";
import Link from "next/link";
import Head from 'next/head'
import Router from 'next/router'


const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const body = { name, email, password };
            const res = await fetch("/api/auth/signup", {
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
    return (
        <>
          <Head>
                    <title>Sign up</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
        <div className="bg-gradient-to-r from-green-300 via-yellow-50 to-green-300 block h-screen items-center justify-center p-4 md:flex">
            <div className="bg-white items-center max-w-screen-sm p-4 space-y-8 overflow-hidden rounded-lg shadow-lg w-full md:flex-row">
                <div className="flex flex-col items-center">
                    <h1 className="font-medium text-green-400 text-xl">Welcome</h1>
                    <p>Create account</p>
                </div>
                <form onSubmit={submitData} className="flex flex-col items-center space-y-4">
                    <input
                        className="border border-gray-300 outline-none placeholder-gray-400 pl-3 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-green-300"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        type="text"
                        value={name}
                    />
                    <input
                        className="border border-gray-300 outline-none placeholder-gray-400 pl-3 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-green-300"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        type="text"
                        value={email}
                    />
                    <input
                        className="border border-gray-300 outline-none placeholder-gray-400 pl-3 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-green-300"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        type="Password"
                        value={password}
                    />
                    <button
                        className="bg-green-400 font-medium inline-flex items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-green-500"
                        type="submit"
                    >
                        Sign up
                    </button>
                    <div className="flex flex-col items-center">
                        <p className="italic">
                             Have an account
                            <Link href="/">
                                <a className="ml-1 text-green-500 hover:underline">Log in</a>
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
};

export default SignUp;
