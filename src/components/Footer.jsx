import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 p-6 text-center text-white mt-8 absolute inset-x-0 bottom-0">
      <h1 className="text-lg font-semibold">Your Company</h1>
      <p className="mt-1 text-sm">© {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  )
}

export default Footer