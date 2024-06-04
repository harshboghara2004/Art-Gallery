import React from 'react'

const LoadingData = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-black">
      <h1 className="text-5xl font-bold mb-0 uppercase bg-gradient-to-r from-purple-500 to-red-500 text-transparent bg-clip-text">
        Fetching {data} ...
      </h1>
    </div>
  )
}

export default LoadingData