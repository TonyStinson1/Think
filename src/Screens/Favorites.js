import React, { useState, } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";
import { Icon } from "react-native-elements";

import { useSelector, useDispatch } from "react-redux";

//Utils
import { Colors } from "../Utils/Colors";

const { width } = Dimensions.get('window');

const SPACING = 5;
const ITEM_LENGTH = width * 0.5; // Item is a square. Therefore, its height and width are of the same length.
const BORDER_RADIUS = 20;

const Favorites = (props) => {

    const dispatch = useDispatch();

    // Favorite Screen state
    const [loading, setLoading] = useState(false);

    // Redux state
    const favData = useSelector((state) => state.imageData.favData);
    const imageData = useSelector((state) => state.imageData.data);

    // Loading Indicator 
    if (loading) {
        return (
            <View style={{ ...styles.container, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    // Empty Component
    const emptyComponent = () => {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyTextInfo}>You don't have any favorites</Text>
            </View>
        )
    }

    const favSelector = (item) => {
        setLoading(true)

        let imgObj = { ...item };
        imgObj = {
            ...imgObj,
            fav: !imgObj.fav,
        }
        let imageArray = imageData.map((img) => {
            if (img.uri == imgObj.uri) {
                return imgObj
            } else {
                return img
            }
        })
        dispatch({
            type: 'SET_DATA',
            payload: imageArray
        })
        let favSelect = imageArray.filter((img) => {
            if (img.fav) {
                return img
            }
        })
        dispatch({
            type: 'SET_FAV_DATA',
            payload: favSelect
        })
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }

    // Image Render for each image
    const imageRender = (item) => {
        return (
            <View style={styles.imageContainer}>
                <View style={styles.itemContent}>
                    <Image source={{ uri: item.uri }} style={styles.itemImage} />
                    <TouchableOpacity onPress={() => favSelector(item)} style={styles.iconPosition}>
                        <Icon name={item.fav ? "star" : "staro"}
                            type="antdesign"
                            size={20}
                            color={'#000'} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Favorites</Text>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={favData}
                    numColumns={2}
                    contentContainerStyle={{ flexGrow: 1 }}
                    renderItem={({ item }) => imageRender(item)}
                    nestedScrollEnabled={true}
                    keyExtractor={(index) => index}
                    ListEmptyComponent={() => emptyComponent()}
                />
            </View>
        </View>
    );
};

export default Favorites;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: { 
        width: '100%', 
        height: '7%', 
        borderWidth: 0.3, 
        borderTopWidth: 0, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    headerTitle: { fontWeight: '600', fontSize: 25, color: Colors.activedot },
    itemContent: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
        borderRadius: BORDER_RADIUS + SPACING * 2,
        padding: 15,
    },
    itemImage: {
        width: '100%',
        height: '100%',
        borderRadius: BORDER_RADIUS,
        resizeMode: 'contain',
    },
    listContainer: { height: '93%', flex: 1, marginTop: 10 },
    imageContainer: { width: ITEM_LENGTH, height: 250, marginTop: 20 },
    emptyContainer: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', },
    emptyTextInfo: { fontSize: 20, fontWeight: '600', color: Colors.shadowColor },
    iconPosition: { position: 'absolute', left: 5, top: -15 }
});