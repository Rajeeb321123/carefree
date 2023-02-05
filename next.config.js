/** @type {import('next').NextConfig} */



// if you get Error: Invalid src prop (https://lh3.googleusercontent.com/a/AEdFTp6xKvLTKjuujE_d3C-cGFqg7UOj6Uvaq2d_HqTZ=s96-c) on `next/image`, hostname "lh3.googleusercontent.com" is not configured under images in your `next.config.js`

const nextConfig = {
  reactStrictMode: true,
  // configuring images hostname
  images:{
    domains:['pbs.twimg.com',"lh3.googleusercontent.com"
  ]
  }
}

module.exports = nextConfig
