import Link from "next/link";

const TransactionCard = (props) => {
    console.log(props);
    return (
        <div>
            <div className="bg-white max-w-screen-lg p-4 space-y-8 rounded-md overflow-hidden shadow-lg w-full">
                <div className="flex justify-between">
                    <h1 className="font-medium text-gray-400 text-xl">Transaction</h1>

                    <Link href="/send-money">
                        <a className="bg-green-400 font-medium inline-flex items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-green-500">
                            {" "}
                            Send Money{" "}
                        </a>
                    </Link>
                </div>
                <div>
                    {props.transaction.length <= 0 ? (
                        <>
                            <p className='text-red-400'> No transaction yet</p>
                        </>
                    ) : (
                        <table className="w-full table-auto">
                            <thead>
                                <tr>
                                    <th>Sender</th>
                                    <th>Recipient</th>
                                    <th>Amount</th>
                                    <th>Currency</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.transaction.map((data) => (
                                    <tr key={data.id}>
                                        <td className="text-center">{data.sender} </td>
                                        <td className="text-center">{data.recipient} </td>
                                        <td className="text-center">{data.amount} </td>
                                        <td className="text-center">{data.baseCurrency} </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TransactionCard;
