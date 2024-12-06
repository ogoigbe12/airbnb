import { View, Text, StyleSheet, FlatList, Image, ListRenderItem, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { defaultStyles } from '../constants/Styles'
import { Link } from 'expo-router'
import { Listing } from '../interface/listing'
import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet';

interface Props {
    listings: any[]
    refresh: number;
    category: string
}
const Listings = ({listings:items, refresh,category}: Props) => {
    const [loading, setLoading] = useState(false);
    const listRef = useRef<BottomSheetFlatListMethods>(null);

     // Update the view to scroll the list back top
  useEffect(() => {
    if (refresh) {
      scrollListTop();
    }
  }, [refresh]);

  const scrollListTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

   // Use for "updating" the views data after category changed
    useEffect(() => {
        // console.log('Reload', items.length)
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
        }, 200)
    },[category])

    const renderRow: ListRenderItem<Listing> = ({item}) => (
        <Link href={`/listing/${item.id}`} asChild>
            <TouchableOpacity>
                <View style={styles.listing}>
                <Image source={{uri: item.medium_url}} style={styles.image}/>
                <TouchableOpacity style={{position: 'absolute', left: 30, top: 30}}>
                    <Ionicons name='heart-outline' size={24} color='#000'/>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontFamily: 'mon-sb', fontSize: 16}}>{item.name}</Text>
                <View style={{flexDirection: 'row', gap: 4}}>
                <Ionicons name='star' size={16}/>
                <Text style={{fontFamily: 'mon-sb'}}>{item.review_scores_rating / 20}</Text>
                </View>
                </View>
                <Text style={{fontFamily: 'mon'}}>{item.room_type}</Text>
                <View style={{flexDirection: 'row', gap: 4}}>
                    <Text style={{fontFamily: 'mon-sb'}}>$ {item.price}</Text>
                    <Text style={{fontFamily: 'mon'}}>night</Text>
                </View>
                </View>
            </TouchableOpacity>
        </Link>
    )

  return (
    <View style={defaultStyles.container}>
      <BottomSheetFlatList
      renderItem={renderRow}
      ref={listRef}
      data={loading ? [] : items }
      ListHeaderComponent={<Text style={styles.info}>{items.length} homes</Text>}
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


