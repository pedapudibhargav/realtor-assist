'use client'
import AppNavigation from '@/components/navigation'
import { GetActiveBrokerage } from '@/services/brokerageService'
import React from 'react'
import { useRouter } from 'next/navigation'

export default function page() {
  // get active brokerage from local storage on component load from GetActiveBrokerage useEffect
  const [activeBrokerage, setActiveBrokerage] = React.useState(null)
  const router = useRouter();

  React.useEffect(() => {
    const brokerage = GetActiveBrokerage();
    console.log('active brokerage:', brokerage)
    if (brokerage) {
      console.log('active brokerage found:', brokerage)
      setActiveBrokerage(brokerage)
    } else {      
      console.log('No active brokerage found, redirecting to /app/brokerages');
      console.error('No active brokerage found');
      router.push('/app/brokerages');
    }
  }
  , []);

  return (
    <>
      <AppNavigation />
      <div className="container">
        <div className="row">
          <div className="col-12">
            {JSON.stringify(activeBrokerage)}
            {/* <h1>Welcome to: {activeBrokerage.name}</h1> */}
            <p>This is the main page of the app.</p>
          </div>
        </div>
      </div>
    </>
  )
}
