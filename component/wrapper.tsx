import { useSession } from "next-auth/client";
import Navbar from "./Navbar";

export const isSessionValid = (session) => {
    if (
        typeof session !== typeof undefined &&
        session !== null &&
        typeof session.user !== typeof undefined
    ) {
        return true;
    } else {
        return false;
    }
};

function Wrapper(props) {
    const [session, loading] = useSession();

    if (!loading) {
        if (isSessionValid(session)) {
            return (
                <div>
                    <Navbar name={session.user.name} />

                    {props.children}
                </div>
            );
        } else {
            return (
                <div>
                    <p>Your not signed in</p>
                </div>
            );
        }
    } else {
        return null;
    }
}

export default Wrapper;
