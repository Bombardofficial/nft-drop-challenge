import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import {useState, useEffect} from 'react';
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'
import { motion,AnimatePresence } from "framer-motion"
interface Props {
  collections: Collection[]
}
const Home = ({ collections }: Props) => {

  const [loading, setLoading] = useState(false);
  const [indexfix, setIndexfix] = useState<boolean>(true);
  useEffect(()  => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(()  => {
    let details = navigator.userAgent;
    let regexp = /android|iphone|kindle|ipad/i;
    let isMobileDevice = regexp.test(details);
    if(isMobileDevice){
      setIndexfix(true);

    }
    else {
      setIndexfix(false);
    }
  }, []);
  
  return (
    
    <div className=" mx-auto flex flex-col lg:min-h-screen py-20 px-10 2xl:px-0 backgroundstatic  lg:h-screen overflow-hidden">
      
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/*{loading ? (
        <div className="preloader"></div>
      ) : (*/}

      
      
      <motion.div
              initial="hidden"
              animate="visible"
              transition={{ duration: 1 }}
              variants={{
                hidden: { opacity: 0, x: 0 },
                visible: { opacity: 1, x: 0 },
              }}
            >
        <h1 className="w-100 pb-10 lg:pb-5 cursor-pointer text-3xl sm:w-80 font-extrabold py-2 text-white pl-12 league">
                    
        <p className="line text-4xl "> 
            <span className="fast-flicker"><img className="h-12 lg:h-30 animate-pulse" src="https://i.postimg.cc/wMDFYb5Y/cooltext407788678248890.png" alt="" /> </span>
        </p>
        
        
        NFT Market Place
        {/*The 
        <span className="font-extrabold underline decoration-pink-600/50"> 
        {' '}Bombard{' '}
        </span>{' '}
         NFT Market Place
        <img src="https://i.postimg.cc/ydsRRZ1z/The-Bombard-s-NFT-Market-Place-1.png"/>*/}
        </h1>
        </motion.div>
        
        
        <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 1 }}
        variants={{
          hidden: { opacity: 0, x: 0 },
          visible: { opacity: 1, x: !indexfix ? 250 : 0 },
        }}
      >

        <main className="bg-slate-100 p-10 shadow-xl shadow-pink-400/20 max-w-7xl pb-0 glass lg:h-100 h-100">
        <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 justify-center content-center pb-0 ">
          {collections.map(collection => (
            <Link href={`/nft/${collection.slug.current}`}>


            <div className="flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-105">
              
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ duration: 1 }}
              variants={{
                hidden: { opacity: 0, x: -100 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <div className="background p-2 rounded-xl shadow-lg shadow-gray-500/80 hover:shadow-white/80">
              <img className="h-96 w-60 rounded-2xl object-cover" src={urlFor(collection.mainImage).url()} alt="" />
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
              <div className="p-5">
                <h2 className="text-3xl font-bold text-white league">{collection.title}</h2>
                <p className="mt-2 text-sm text-gray-400 pb-5 lg:pb-0 league">{collection.description}</p>
              </div>
              </motion.div>
            </div>

            

            </Link>
          ))}
        </div>
        </main>
        </motion.div>
      {/*)}*/}
    </div>
  )

}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
 const query = `*[_type == "collection"] {
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
const collections = await sanityClient.fetch(query)
return {
  props: {
    collections
  }
}
}