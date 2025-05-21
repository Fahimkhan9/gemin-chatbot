import Link from 'next/link'
import React from 'react'

function HomePage() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <h1 className="text-5xl my-5 font-bold">Welcome to Gemini ChatBot</h1>
         
          <Link href='/dashboard'><button className="btn btn-primary">Get Started</button></Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage