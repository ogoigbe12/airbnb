import { View, Text, StyleSheet, FlatList, ListRenderItem } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { defaultStyles } from '../constants/Styles'
import { Link } from 'expo-router'

interface Props {
    listings: any[]
    category: string
}
const Listings = ({listings:items,category}: Props) => {
    const [loading, setLoading] = useState(false);
    const listRef = useRef<FlatList>(null);


    useEffect(() => {
        console.log('Reload', items.length)
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 200)
    },[category])

    const renderRow: ListRenderItem<any> = ({item}) => (
        <Link href={`/listing/${item.id}`}>
            Go there
        </Link>
    )

  return (
    <View style={defaultStyles.container}>
      <FlatList
      renderItem={renderRow}
      ref={listRef}
      data={loading ? [] : items }
      />
    </View>
  )
}
const styles = StyleSheet.create({
    listing: {
      padding: 16,
      gap: 10,
      marginVertical: 16,
    },
    image: {
      width: '100%',
      height: 300,
      borderRadius: 10,
    },
    info: {
      textAlign: 'center',
      fontFamily: 'mon-sb',
      fontSize: 16,
      marginTop: 4,
    },
  });
export default Listings