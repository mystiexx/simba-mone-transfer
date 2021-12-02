import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import Head from "next/head";

function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = (e) => {
        setLoading(true);
        e.preventDefault();
        e.stopPropagation();

        signIn("credentials", {
            email,
            password,
            callbackUrl: `${window.location.origin}/dashboard`,
            redirect: false,
        }).then(function (result) {
            if (result.error !== null) {
                if (result.status === 401) {
                    setLoginError("Your username/password is not correct. Please try again");
                } else {
                    setLoginError(result.error);
                }
            } else {
                router.push(result.url);
            }
        });
    };

    return (
        <>
            <Head>
                <title>Log in</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="bg-gradient-to-r from-green-300 via-yellow-50 to-green-300 block h-screen items-center justify-center p-4 md:flex">
                <div className="bg-white items-center max-w-screen-sm p-4 space-y-8 overflow-hidden rounded-lg shadow-lg w-full md:flex-row md:w-1/2">
                    <div className="flex flex-col items-center">
                        <h1 className="font-medium text-xl">Welcome</h1>
                        <p>Login to your account</p>
                    </div>
                    <form onSubmit={handleLogin} className="flex flex-col items-center space-y-4">
                        <p className="text-red-400"> {loginError} </p>
                        <input
                            className="border border-gray-300 outline-none placeholder-gray-400 pl-3 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-green-300"
                            type="text"
                            value={email}
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            className="border border-gray-300 outline-none placeholder-gray-400 pl-3 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-green-300"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="bg-green-400 font-medium inline-flex items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-green-500"
                            type="submit"
                        >
                            { loading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5"
                                        viewBox="0 0 24 24"
                                    />
                                </>
                            ) : (
                                <>Log in</>
                            )}
                        </button>
                        <div className="flex flex-col items-center">
                            <p className="italic">
                                Don't have an account
                                <Link href="/signup">
                                    <a className="ml-1 text-green-500 hover:underline">
                                        Register here
                                    </a>
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Home;
