import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Index = () => {
  return (
   <>
   <Link href={'/(modals)/login'}>
          Login
      </Link>
      <Link href={'/(modals)/booking'}>
              Booking
          </Link>
          <Link href={'/listing/1234'}>
              DetailPage
          </Link>
          </>          
  )
}

export default Index