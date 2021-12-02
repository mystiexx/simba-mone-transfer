import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import * as bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

let userAccount = null;

const prisma = new PrismaClient();

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, configuration);
export default authHandler;

const configuration = {
    cookie: {
        secure: process.env.NODE_ENV && process.env.NODE_ENV === "production",
    },
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60,
    },
    providers: [
        Providers.Credentials({
            id: "credentials",
            name: "Login",
            async authorize(credentials) {
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });
                if (!user) {
                }
                const checkPassword = await bcrypt.compareSync(credentials.password, user.password);
                if (!checkPassword) {
                    console.error("Password doesnt match");
                }
                userAccount = user;
                return user;
            },
        }),
    ],
    callbacks: {
        async signIn(user, account, profile) {
            if (typeof user.id !== typeof undefined) {
                if (user.isActive === 1) {
                    return user;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        async session(session, token) {
            if (userAccount !== null) {
                session.user = userAccount;
            } else if (
                typeof token.user !== typeof undefined &&
                (typeof session.user === typeof undefined ||
                    (typeof session.user !== typeof undefined &&
                        typeof session.user.id === typeof undefined))
            ) {
                session.user = token.user;
            } else if (typeof token !== typeof undefined) {
                session.token = token;
            }
            return session;
        },
        async jwt(token, user, account, profile, isNewUser) {
            if (typeof user !== typeof undefined) {
                token.user = user;
            }
            return token;
        },
    },
};

// export default ( req, res ) => NextAuth(req, res, configuration)
