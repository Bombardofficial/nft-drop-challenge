import React from 'react'
import { useAddress, useDisconnect, useMetamask, useNFTDrop } from "@thirdweb-dev/react";
import {useState, useEffect} from 'react';
import { GetServerSideProps } from 'next';
import { sanityClient, urlFor } from '../../sanity';
import { Collection } from '../../typings'
import Link from 'next/link';
import { BigNumber } from 'ethers';
import { motion } from "framer-motion"


interface Props {
    collection: Collection
}

function NFTDropPage({collection}: Props) {

    const [claimedSupply, setClaimedSupply] = useState<number>(0);
    const [totalSupply, setTotalSupply] = useState<BigNumber>();
    const [loading,setLoading] = useState<boolean>(true);
    const [priceInEth,setPriceInEth] = useState<string>();
    const nftDrop = useNFTDrop(collection.address);
    //Auth

    const connectWithMetamask = useMetamask();
    const address = useAddress();
    const disconnect = useDisconnect();
    



    useEffect(() => {
        if(!nftDrop) return;
        const fetchPrice = async() => {
            const claimConditions = await nftDrop.claimConditions.getAll();
            setPriceInEth(claimConditions?.[0].currencyMetadata.displayValue)
        }
        fetchPrice();
    }, [nftDrop])
    
    useEffect(() => {
        if(!nftDrop) return;
        const fetchNFTDropData = async() => {
            setLoading(true);
            const claimed = await nftDrop.getAllClaimed();
            const total = await nftDrop.totalSupply();

            setClaimedSupply(claimed.length);
            setTotalSupply(total);
            setLoading(false);
        }
        fetchNFTDropData();
    }, [nftDrop])

const mintNft = () => {
    if(!nftDrop || !address) return;
 
    const quantity = 1;

    setLoading(true);

    nftDrop.claimTo(address, quantity)
    .then(async (tx) => {
        const receipt = tx[0].receipt;
        const claimTokenId = tx[0].id;
        const claimedNFT = await tx[0].data();

        console.log(receipt)
        console.log(claimTokenId)
        console.log(claimedNFT)
    })
    .catch((err) => {
        console.log(err)
    })
    .finally(() => {
        setLoading(false);
    })
}


  return (
    
    <div className="flex lg:h-screen flex-col lg:grid lg:grid-cols-10 backgroundstatic h-50 league">
        
        

        {/*left */}
        <div className="lg:col-span-4 glass">

        
            <div className="flex flex-col items-center justify-center py-2 lg:min-h-screen">


            <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 1 }}
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0 },
          }}
        >
                <div className="background p-2 rounded-xl">
                    <img className="w-44 rounded-xl object-cover lg:h-96 lg:w-72" 
                    src={urlFor(collection.previewImage).url()} alt=""/>
                </div>
                </motion.div>
                <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 2 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
                <div className="p-5 text-center space-y-2">
                    <h1 className="text-4xl font-semibold text-white fjalla">
                        {collection.nftCollectionName}
                    </h1>
                    <h2 className="text-2xl text-gray-300">
                    {collection.description}
                    </h2>
                    
                </div>
                </motion.div>
                
                {collection.nftCollectionName  === 'PAPAFAM Apes'? (
                    <iframe className="rounded-lg" src="https://open.spotify.com/embed/track/1WxfLem16KNzd29dtLwJcE?utm_source=generator" width="50%" height="80" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                ) : collection.nftCollectionName  === 'Agile Lego Figures' ?(
                    <iframe className="rounded-lg" src="https://open.spotify.com/embed/track/2wi6V9TPFAqciBWQ2FmD7o?utm_source=generator" width="50%" height="80" frameBorder="0"  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                ) : (
                    <iframe 
                    className="rounded-lg" 
                    src="https://open.spotify.com/embed/track/4gNzzCqaoePJzKxN7NzHlO?utm_source=generator&theme=0" 
                    width="60%" height="80" frameBorder="0"  
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                )}
                
            </div>

            

            
        </div>
        {/*right */}
        <div className="flex flex-1 flex-col p-12 lg:col-span-6  ">

        <motion.div
              initial="hidden"
              animate="visible"
              transition={{ duration: 1 }}
              variants={{
                hidden: { opacity: 0, x: 0 },
                visible: { opacity: 1, x: 0 },
              }}
            >

            {/*header */}
            <header  className="flex items-center justify-between">
                <Link href={'/'}>
                <h1 className="w-52 cursor-pointer text-3xl sm:w-80 font-extrabold py-2 text-white league">
                    
                    <p className="line text-4xl"> 
                        <span className="fast-flicker"><img className="h-10 lg:h-30 animate-pulse" src="https://i.postimg.cc/wMDFYb5Y/cooltext407788678248890.png" alt="" /> </span>
                    </p>
                    
                    
                    NFT Market Place
                    {/*The 
                    <span className="font-extrabold underline decoration-pink-600/50"> 
                    {' '}Bombard{' '}
                    </span>{' '}
                     NFT Market Place
                    <img src="https://i.postimg.cc/ydsRRZ1z/The-Bombard-s-NFT-Market-Place-1.png"/>*/}
                </h1>
                </Link>
                


                <a onClick={() => (address ? disconnect() : connectWithMetamask())} 
                className=" pink text-white cta
                 text-xs sizefix font-bold lg:px-5 lg:py-3 w-20 lg:w-60 lg:text-xl shadow-sm shadow-pink-900 cursor-pointer">
                    <span>{address ? 'Sign Out' : 'Sign In'}</span>
                    <span>
                    <svg className="pr-10"width="66px" height="43px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <g id="arrow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <path className="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                        <path className="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                        <path className="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
                        </g>
                    </svg>
                    </span> 
                </a>






            </header>

            <hr className="my-2 border"/>

            </motion.div>

            {address && (
            <p className="text-center text-xl text-rose-300 font-italic">You're logged in with wallet {address.substring(0, 5)}..
            .{address.substring(address.length - 5)}
            </p>
            )}
            {/*content */}

            <div className="text-white mt-10 flex flex-1 flex-col items-center space-y-6 text-center lg:space-y-0 lg:justify-center">

                <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{
                    scale: 0.95,

                    border: "none",
                    color: "#000",
                }}
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {
                    scale: 0.8,
                    opacity: 0,
                    },
                    visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                        delay: 0.4,
                    },
                    },
                }}
                >
                <img className="w-80 object-cover pb-10 lg:h-60" src={urlFor(collection.mainImage).url()} alt="" />
                </motion.div>
                <h1 className="text-3xl font-bold lg:text-6xl lg:font-extrabold">{collection.title}</h1>
                {loading ? (
                    
                    <p className="pt-2 text-2xl text-green-500 animate-pulse">
                        
                        Loading Supply Count...</p>
                ) : (
                    <p className="pt-2 text-2xl text-green-500">{claimedSupply}/{totalSupply?.toString()} NFT's claimed</p>
                )}
                
                {loading && (
                    <img className="h-12 pt-2 object-contain" src="https://i.postimg.cc/28q8mWq5/loading.gif" alt="" />
                )}
                
            </div>
            {/*mint */}

            <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{
            scale: 0.95,
            
            border: "none",
            color: "#000",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
        >


            <button 
            onClick={mintNft}
            disabled ={loading || claimedSupply === totalSupply?.toNumber() || !address} 
            className="h-16 w-full red shadow-lg shadow-red-900 text-white text-4xl rounded-full mt-10 font-bold disabled:bg-gray-400 disabled:shadow-gray-400">
                
                {loading ? (
                    <>Loading</>
                ) : claimedSupply === totalSupply?.toNumber() ? (
                    <>SOLD OUT</>
                ) : !address ? (
                    <>Sign in to Mint</>
                ) : (
                    <span className="font-bold">Mint NFT ( {priceInEth} ETH )</span>
                )}
                
                
            </button>
            </motion.div>
        </div>
        
    </div>
    
  )
}

export default NFTDropPage

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const query = `*[_type == "collection" && slug.current == $id] [0] {
        _id,
        title,
        address,
        description,
        nftCollectionName,
        mainImage {
        asset
      },
      previewImage {
        asset
      },
      slug {
        current
      },
      creator-> {
        _id,
        name,
        address,
        slug {
        current
      },
      },
      }`
      
      const collection = await sanityClient.fetch(query, {
          id: params?.id
      })

      if(!collection) {
          return {
              notFound: true,
          }
      }

      return {
          props: {
            collection,
          },
      }
}