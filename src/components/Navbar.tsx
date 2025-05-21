
'use client'



import { useLogout } from '@/hooks/useLogout';
import { useUser } from '@/hooks/useUser';
import Link from 'next/link';


import React from 'react'



function Navbar() {





    const { loading, user } = useUser()
    const { loading: logoutloading, logout } = useLogout()
    const get = () => {

        if (loading) {
            return <span className="loading loading-dots loading-md"></span>
        }
        if (!user) {
            return (
                <>
                    <li>
                        <Link href={'/login'}>
                            <button className="btn  bg-accent text-accent-content">Sign in</button></Link>
                    </li>

                </>
            )
        }

        return (
            <>
                <li>
                    <li><Link href='/dashboard'>Dashboard</Link></li>
                </li>
                <li>
                    <button disabled={logoutloading} onClick={logout} className="btn  bg-red-500 text-white">Logout</button>
                </li>

            </>
        )
    }
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <Link href='/' className="btn btn-ghost text-xl">Chatbot</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 ">

                    {get()}
                </ul>
            </div>
        </div>
    )
}

export default Navbar