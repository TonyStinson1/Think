import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ImageRender from "../Components/ImageRender";

//Utils
import { Colors } from "../Utils/Colors";

const categories = [
    {
        title: 'Popular',
        type: 'popular'
    },
    {
        title: 'Common',
        type: 'common'
    },
    {
        title: 'Memories',
        type: 'memories'
    },
]

const Categories = (props) => {

    // Category Screen state 
    const [loading, setLoading] = useState(false);

    // Redux state
    const imageData = useSelector((state) => state.imageData.data);

    // Loading Indicator 
    if (loading) {
        return (
            <View style={{ ...styles.container, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="small" color="#0000ff" />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Categories</Text>
            </View>
            {
                categories.map((category) => (
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryTitle}>{category.title}</Text>
                        <View style={styles.listContainer}>
                            <FlatList
                                data={imageData}
                                horizontal
                                renderItem={({ item }) =>
                                    <ImageRender
                                        item={item}
                                        type={category.type}
                                        cat={true}
                                        setLoading={setLoading}
                                        imageData={imageData}
                                    />}
                                nestedScrollEnabled={true}
                                keyExtractor={(index) => index}
                            />
                        </View>
                    </View>
                ))
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: { width: '100%', height: '7%', borderWidth: 0.3, borderTopWidth: 0, justifyContent: 'center', alignItems: 'center' },
    headerTitle: { fontWeight: '600', fontSize: 25, color: Colors.activedot },
    categoryContainer: { height: '31%', padding: 10 },
    categoryTitle: { fontSize: 18, fontWeight: '700' },
    listContainer: { flex: 1, marginTop: 10 },
});

export default Categories;