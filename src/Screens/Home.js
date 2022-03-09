import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { Icon } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-native-modal";

import ImagePicker from 'react-native-image-crop-picker';

//Utils
import { Colors } from "../Utils/Colors";

const Home = (props) => {

    // Home Screen state
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [imageObject, setImageObject] = useState({});

    const dispatch = useDispatch();

    // Redux state
    const imageData = useSelector((state) => state.imageData.data);

    // Loading Indicator
    if (loading) {
        return (
            <View style={{ ...styles.container, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }

    // Selecting images from Phone's Gallery
    const imagePicker = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then((image) => {
            let imgObj = {};
            let imgUrl = 'data:image/jpeg;base64,' + image.data;
            imgObj['uri'] = imgUrl;

            setImageObject(imgObj)
            setTimeout(() => {
                setVisible(true)
            }, 1000);
        });
    };

    // Clicking Image from Phone's Camera
    const imageClicker = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(image => {
            console.log("Image data", image);
            let imgObj = {};
            let imgUrl = 'data:image/jpeg;base64,' + image.data;
            imgObj['uri'] = imgUrl;

            setImageObject(imgObj)
            setTimeout(() => {
                setVisible(true)
            }, 1000);
        });
    };

    // Selecting image's category
    const imageSelect = (type) => {
        setLoading(true);
        let imgObj = { ...imageObject };
        imgObj['category'] = type;
        imgObj['fav'] = false;
        let imageArray = [...imageData];
        imageArray.unshift(imgObj);
        dispatch({
            type: 'SET_DATA',
            payload: imageArray
        })
        setTimeout(() => {
            setVisible(false)
            setLoading(false)
        }, 1000);
    }

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Home</Text>
                </View>
                <View style={styles.contentContainer}>
                    <TouchableOpacity onPress={() => imageClicker()} activeOpacity={0.5} style={styles.btnContainer}>
                        <View style={{ marginRight: 10 }}>
                            <Icon name="camera"
                                type="fontisto"
                                size={20}
                                color={'#000'} />
                        </View>
                        <Text style={{ color: '#fff' }}>Open Camera</Text>
                    </TouchableOpacity>
                    <View style={{ marginTop: 20, marginBottom: 20 }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>OR</Text>
                    </View>
                    <TouchableOpacity onPress={() => imagePicker()} activeOpacity={0.5} style={styles.btnContainer}>
                        <View style={{ marginRight: 10 }}>
                            <Icon name="photo"
                                type="font-awesome"
                                size={20}
                                color={'#000'} />
                        </View>
                        <Text style={{ color: '#fff' }}>Open Gallery</Text>
                    </TouchableOpacity>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.infoText}>Click on one of the above buttons to add pictures</Text>
                    </View>
                </View>
            </View>
            <Modal isVisible={visible}>  {/* Modal Container  */}
                <View style={styles.modalContent}>
                    <View>
                        <Text>Please choose a category for the selected photo</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity onPress={() => imageSelect('popular')} style={styles.modalBtnContainer}>
                            <Text style={styles.btnText}>Popular</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => imageSelect('common')} style={styles.modalBtnContainer}>
                            <Text style={styles.btnText}>Common</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => imageSelect('memories')} style={styles.modalBtnContainer}>
                            <Text style={styles.btnText}>Memories</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Home;

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
    modalBtnContainer: {
        backgroundColor: '#000',
        width: 100,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    btnText: { color: '#fff', fontSize: 16 },
    contentContainer: { height: '93%', justifyContent: 'center', alignItems: 'center' },
    btnContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.reputation,
        opacity: 0.8,
        height: 40,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoText: { fontSize: 15, fontWeight: '600' },
    modalContent: {
        width: '95%',
        height: '28%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        alignSelf: 'center'
    },
});
