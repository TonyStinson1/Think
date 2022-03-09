import React, { useEffect, useState, useRef } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";

const { width } = Dimensions.get('window');

const SPACING = 5;
const ITEM_LENGTH = width * 0.5; // Item is a square. Therefore, its height and width are of the same length.
const BORDER_RADIUS = 20;

const ImageRender = ({ item, type, cat, setLoading, imageData }) => {

    const dispatch = useDispatch();

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

    if (cat && item.category == type) {
        return (
            <View style={{ width: ITEM_LENGTH }}>
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
    } else{
        return <></>
    }
}

export default ImageRender

const styles = StyleSheet.create({
    itemContent: {
        alignItems: 'center',
        flex: 1,
        borderRadius: BORDER_RADIUS + SPACING * 2,
    },
    itemImage: {
        width: '100%',
        height: '100%',
        borderRadius: BORDER_RADIUS,
        resizeMode: 'contain',
    },
    iconPosition: { position: 'absolute', left: 0, top: 0 },
});