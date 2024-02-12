import React, { useEffect, useState } from 'react'
import { Blocks, Oval } from 'react-loader-spinner';

const NoDataFound = () => {
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 5000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>{loading?<div className='flex justify-center py-32 '>
      <Oval
      visible={true}
      height="70"
      width="70"
      ariaLabel="Oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
      colors="#34BE82"
    />
      </div>:
    <div>
    
    <div className='flex justify-center'>
    <img
    src={"/nodatafound.svg"}
    style={{ height: '300px',marginTop:"30px" }}
    />
   
</div>
<h2 className='text-center text-2xl font-bold'>No Data Found</h2>
<center>"Sorry, there is no data available at the moment."</center></div>}

    </>
   
  )
}

export default NoDataFound