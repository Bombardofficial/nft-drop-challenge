import React from 'react'
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
function NFTDropPage() {

    //Auth

    const connectWithMetamask = useMetamask();
    const address = useAddress();
    const disconnect = useDisconnect();
    console.log(address);


  return (
    
    <div className="flex h-screen flex-col lg:grid lg:grid-cols-10 backgroundstatic">
        
  

        {/*left */}
        <div className="lg:col-span-4 glass">
            <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">
                <div className="background p-2 rounded-xl">
                    <img className="w-44 rounded-xl object-cover lg:h-96 lg:w-72" 
                    src="https://i.postimg.cc/2SfPh9fL/Bombard-1.jpg" alt=""/>
                </div>
                <div className="p-5 text-center space-y-2">
                    <h1 className="text-4xl font-bold text-white fjalla">
                        BOMBARD ARTWORKS
                    </h1>
                    <h2 className="text-xl text-gray-300">
                    A collection of Bombard's music artworks that will keep you energized and get you pumped every day!
                    </h2>
                    
                </div>
                <iframe 
                        className="rounded-lg" 
                        src="https://open.spotify.com/embed/track/4gNzzCqaoePJzKxN7NzHlO?utm_source=generator&theme=0" 
                        width="60%" height="80" frameBorder="0"  
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">

                </iframe>
            </div>
            
        </div>
        {/*right */}
        <div className="flex flex-1 flex-col p-12 lg:col-span-6  ">

        

            {/*header */}
            <header  className="flex items-center justify-between">
                <h1 className="w-52 cursor-pointer text-3xl sm:w-80 font-extrabold py-2 text-white">
                    
                    <p className="line text-4xl "> 
                        <span className="fast-flicker"><img src="https://i.postimg.cc/wMDFYb5Y/cooltext407788678248890.png" alt="" /> </span>
                    </p>
                    
                    
                    NFT Market Place
                    {/*The 
                    <span className="font-extrabold underline decoration-pink-600/50"> 
                    {' '}Bombard{' '}
                    </span>{' '}
                     NFT Market Place
                    <img src="https://i.postimg.cc/ydsRRZ1z/The-Bombard-s-NFT-Market-Place-1.png"/>*/}
                </h1>
                <button onClick={() => (address ? disconnect() : connectWithMetamask())} 
                className="rounded-full pink text-white 
                px-4 py-2 text-xs font-bold lg:px-5 lg:py-3 lg:text-base shadow-sm shadow-pink-900">
                    {address ? 'Sign Out' : 'Sign In'}
                </button>

            </header>

            <hr className="my-2 border"/>
            {address && (
            <p className="text-center text-md text-rose-300 font-italic">You're logged in with wallet {address.substring(0, 5)}..
            .{address.substring(address.length - 5)}
            </p>
            )}
            {/*content */}

            <div className="text-white mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:space-y-0 lg:justify-center">
            

            



                <img className="w-80 object-cover pb-10 lg:h-60" src="https://i.postimg.cc/9QV4bXLB/K-perny-k-p-2022-03-31-205420.png" alt="" />
                <h1 className="text-3xl font-bold lg:text-5xl lg:font-extrabold">BOMBARD FAN CLUB | NFT DROP</h1>
                <p className="pt-2 text-xl text-green-500">1/5 NFT's claimed</p>
            </div>
            {/*mint */}
            <button className="h-16 w-full red shadow-lg shadow-red-900 text-white rounded-full mt-10 font-bold">
                Mint NFT (0.01 ETH)
            </button>
        </div>
    </div>
    
  )
}

export default NFTDropPage