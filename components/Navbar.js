"use client"
import React, { useState, useRef, useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

const Navbar = () => {
    const { data: session } = useSession()
    const [showdropdown, setshowdropdown] = useState(false)
    const dropdownRef = useRef(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setshowdropdown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className="logo flex bg-blue-200 justify-between items-center p-4 flex-col md:flex-row">
            <Link className='' href={"/"}>
                <h1 className="text-3xl font-bold">Get me a chai!!!</h1>
            </Link>
            <div className="flex items-center gap-4 relative flex-col md:flex-row" ref={dropdownRef}>
                {session ? (
                    <>
                        <button
                            id="dropdownDefaultButton"
                            type="button"
                            onClick={() => setshowdropdown(!showdropdown)}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Welcome {session.user?.email}
                            <svg
                                className="w-2.5 h-2.5 ms-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                />
                            </svg>
                        </button>

                        <div
                            id="dropdown"
                            className={`z-10 ${showdropdown ? "" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 absolute top-10 left-[100px]`}
                        >
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                <li>
                                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                                </li>
                                <li>
                                    <Link href={`${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">YourPage</Link>
                                </li>
                                <li>
                                    <button
                                        onClick={() => signOut()}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                    >
                                        Sign out
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <button
                            onClick={() => signOut()}
                            className="rounded-lg bg-red-500 text-white px-4 py-2"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link href="/login">
                        <button className="rounded-lg bg-amber-500 px-4 py-2 text-white">
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Navbar
