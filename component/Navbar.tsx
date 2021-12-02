import Link from "next/link";
import {  signOut } from "next-auth/client";


const Navbar = (props) => {
    return (
        <>
            <nav className="bg-white-100 border-bottom border-gray-500">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between">
                        <div className="flex space-x-4">
                            <div className="py-3 px-2">
                                <h2 className="py-4 px-3 text-green-400 font-medium text-xl">
                                    RBank
                                </h2>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Link href="/dashboard">
                                    <a className="py-4 px-3 text-gray-700 hover: text-gray-900">
                                        Overview
                                    </a>
                                </Link>
                                <Link href="/transaction">
                                    <a className="py-4 px-3 text-gray-700 hover: text-gray-900">
                                        Transaction
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center space-x-1">
                            <p className="py-4 px-3 text-gray-700">Welcome, {props.name}</p>
                            <button
                                className="ml-3 py-2 px-3 transition duration-300 border-2 border-red-500 hover:border-gray-500  text-red-500 rounded"
                                onClick={() =>
                                    signOut({
                                        callbackUrl: `${window.location.origin}`,
                                    })
                                }
                            >
                                Log out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
