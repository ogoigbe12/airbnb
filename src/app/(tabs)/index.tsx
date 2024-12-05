import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '@/src/components/ExploreHeader'
import Listings from '@/src/components/Listings'
import listingsData from '@/assets/data/airbnb-listings.json'

const Index = () => {
  const items = useMemo(() => listingsData as any, [])
  const [category, setCategory] = useState('Tiny homes')
  const onDataChanged = (category: string) => {
    setCategory(category);
  }
  return (
   <View style={{flex:1}}>
    <Stack.Screen
    options={{
      header: () => <ExploreHeader onCategoryChanged={onDataChanged} />
    }}
    />
    <Listings listings={items} category={category} />
   </View>         
  )
}

export default Index