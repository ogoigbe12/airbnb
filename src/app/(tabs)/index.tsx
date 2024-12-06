import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import { Link, Stack } from 'expo-router'
import ExploreHeader from '@/src/components/ExploreHeader'
import Listings from '@/src/components/Listings'
import listingsData from '@/assets/data/airbnb-listings.json'
import ListingsMap from '@/src/components/ListingsMap'
import ListingsDataGeo from '@/assets/data/airbnb-listings.geo.json'
import ListingsBottomSheet from '@/src/components/ListingsBottomSheet'
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Index = () => {
  const items = useMemo(() => listingsData as any, [])
  const [category, setCategory] = useState('Tiny homes')
  const onDataChanged = (category: string) => {
    setCategory(category);
  }
  return (
    <GestureHandlerRootView>
   <View style={{flex:1}}>
    <Stack.Screen
    options={{
      header: () => <ExploreHeader onCategoryChanged={onDataChanged} />
    }}
    />
    {/* <Listings listings={items} category={category} /> */}
    <ListingsMap listings={ListingsDataGeo}/>
    <ListingsBottomSheet listings={items} category={category} />
   </View>  
   </GestureHandlerRootView>       
  )
}



export default Index