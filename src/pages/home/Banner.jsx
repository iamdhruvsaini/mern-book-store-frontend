import React, { useRef, useState } from 'react'

import bannerImg from "../../assets/banner.png"

const Banner = () => {
  const [subscribe,setSubscribe] = useState("Subscribe");
  const subscribeButton=useRef();

  const handleClick=()=>{
    if(subscribe==='Subscribe'){
      setSubscribe('Subscribed');
      subscribeButton.current.style.backgroundColor='#1e40af';
      subscribeButton.current.style.color='white';
    }
    else{
      setSubscribe('Subscribe');
      subscribeButton.current.style.backgroundColor='#fbbf24';
      subscribeButton.current.style.color='black';
    }
  }


  return (
    <div className='flex flex-col md:flex-row-reverse py-6 justify-between items-center gap-12'>
        <div className='md:w-1/2 w-full flex items-center md:justify-end'>
          <img src={bannerImg} alt="" />
        </div>
        <div className='md:w-1/2 w-full'>
            <h1 className='md:text-5xl text-2xl font-medium mb-7'>New Releases This Week</h1>
            <p className='mb-10'>It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone</p>
            <button className='btn-primary' onClick={handleClick} ref={subscribeButton}>{subscribe}</button>
        </div>
        
    </div>
  )
}

export default Banner