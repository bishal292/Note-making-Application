import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
            
            <Link to="/" className="bg-blue-500 text-white px-3 py-1 rounded">Go Home</Link>
        </div>
    )
}

export default Error404
