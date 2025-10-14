import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import google from "next-auth/providers/google"
import github from "next-auth/providers/github"
import discord from "next-auth/providers/discord"
import { prisma } from "prisma";
import { customFetch } from 'next-auth'

const timeout = async (input: URL | RequestInfo, init?:RequestInit) => {

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000)

    if (init) init.signal = controller.signal;

    try {

        const response = await fetch(input, init)
        return response

    } finally {

        clearTimeout(timeoutId)
        
    }
}



export const { handlers, signIn, signOut, auth } = NextAuth({

    session: {strategy:'jwt'},
    providers: [google({

        [customFetch]:timeout,

    }), github, discord],
    adapter: PrismaAdapter(prisma),
    callbacks: {

        async session({session, token}) {
            
            if(token.sub) {
                
                session.user.id = token.sub

            }
            return session

        }

    }

})