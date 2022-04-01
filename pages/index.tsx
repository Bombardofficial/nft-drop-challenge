import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import {useState, useEffect} from 'react';
import { sanityClient, urlFor } from '../sanity'
import { Collection } from '../typings'

interface Props {
  collections: Collection[]
}
const Home = ({ collections }: Props) => {

  const [loading, setLoading] = useState(false);

  useEffect(()  => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    
    <div className=" mx-auto flex flex-col min-h-screen py-20 px-10 2xl:px-0 backgroundstatic  h-screen">
      
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/*{loading ? (
        <div className="preloader"></div>
      ) : (*/}

      
      

        <h1 className="w-52 cursor-pointer text-3xl sm:w-80 font-extrabold py-2 text-white pl-12">
                    
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


        <main className="bg-slate-100 p-10 shadow-xl shadow-rose-400/20 max-w-7xl pb-5 glass">
        <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-center">
          {collections.map(collection => (
            <Link href={`/nft/${collection.slug.current}`}>
            <div className="flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-105">

              <img className="h-96 w-60 rounded-2xl object-cover" src={urlFor(collection.mainImage).url()} alt="" />

              <div className="p-5">
                <h2 className="text-3xl">{collection.title}</h2>
                <p className="mt-2 text-sm text-gray-400">{collection.description}</p>
              </div>
            </div>
            </Link>
          ))}
        </div>
        </main>

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