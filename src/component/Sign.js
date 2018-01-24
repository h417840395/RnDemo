import React from "react";
import {Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Dimensions} from 'react-native';
import {observable, action} from "mobx";
import BaiduMap from "./BaiduMap";
import {observer} from "mobx-react";
import SignatureCapture from 'react-native-signature-capture';
import ImagePicker from "react-native-image-picker";

const deviceH = Dimensions.get('window').height;
const deviceW = Dimensions.get('window').width;

let time = "";

class Location {
    @observable location = "";
    @action setLocation = (str) => {
        this.location = str;
    }
}

class DataStore {

    constructor() {
        this.images.push(
            <View style={{height: 100, width: 0}}/>
        )
    }

    @observable images = [];

    imageUri = [];
    reason = "";
    signUri = "";
    tips = "";

}

const locationStore = new Location();
const dataStore = new DataStore;

@observer
export default class Sign extends React.Component {


    componentWillMount() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        time = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute + ':' + second;
        console.log(time)


    }


    onSaveSign(result) {
        // console.log(result.encoded + result.pathName)
        dataStore.signUri = result.pathName;
    }

    onDragSign() {
        console.log("drag")
    }

    addPic() {

        // More info on all the options is below in the README...just some common use cases shown here
        var options = {
            // title: 'Select Avatar',
            // customButtons: [
            //     {name: 'fb', title: 'Choose Photo from Facebook'},
            // ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                let source = {uri: response.uri};

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                // this.setState({
                //     avatarSource: source
                // });
                dataStore.imageUri.push(response.path)
                dataStore.images.push(
                    <Image source={source} style={{width: (deviceW - 64) / 4, height: 72, margin: 8}}/>
                );
            }
        });

    }

    removeAllPic() {
        dataStore.images.splice(1, dataStore.images.length);
        dataStore.imageUri.slice(0, dataStore.images.length);
    }

    updateData(url, param) {

        return new Promise(function (resolve, reject) {
            let formData = new FormData();
            for (var key in params) {
                formData.append(key, params[key]);
            }
            let file = {uri: params.path, type: 'application/octet-stream', name: 'image.jpg'};
            formData.append("file", file);
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data;charset=utf-8',
                    "x-access-token": token,
                },
                body: formData,
            }).then((response) => response.json())
                .then((responseData) => {
                    console.log('uploadImage', responseData);
                    resolve(responseData);
                })
                .catch((err) => {
                    console.log('err', err);
                    reject(err);
                });
        });

    }

    submitData() {

        let msg = "Time：" + time + "\n";
        msg += "Location：" + locationStore.location + "\n";
        msg += "Reason：" + dataStore.reason + "\n";

        for (let i in dataStore.imageUri) {
            msg += "Uri:" + dataStore.imageUri[i] + "\n";
        }

        msg += "Sign:" + dataStore.signUri + "\n";

        msg += "Tips:" + dataStore.tips + "\n";

        Alert.alert('Data', msg)
        // console.log(dataStore.imageUri)
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <TouchableOpacity
                        style={{height: 40, width: 80, justifyContent: "center", alignItems: "flex-start"}}>
                        <Image style={{height: 20, width: 20, marginLeft: 8}} source={require('../res/back.png')}/>
                    </TouchableOpacity>
                    <View style={{height: 40, width: 80, justifyContent: "center", alignItems: "center"}}>
                        <Text style={{fontSize: 16, color: "#000000"}}>签到</Text>
                    </View>
                    <TouchableOpacity style={{height: 40, width: 80, alignItems: 'center', justifyContent: 'center',}}>
                        <Text style={{color: "#3a75ea"}}>我的足迹</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.scroll}>
                    <View style={styles.itemRow}>
                        <Image style={{height: 20, width: 20}} source={require('../res/time.png')}/>
                        <Text style={{flex: 1, marginLeft: 8}}>{time}</Text>
                    </View>

                    <View style={{
                        height: 220,
                        marginTop: 8,
                        marginBottom: 8,
                        backgroundColor: "#ffffff",
                        justifyContent: "center"
                    }}>
                        <Text style={{height: 20, marginLeft: 8}}>{locationStore.location}</Text>
                        <BaiduMap store={locationStore}/>
                    </View>

                    <View style={styles.itemRow}>
                        <Text>事由:</Text>
                        <TextInput style={{flex: 1}}
                                   onChangeText={(text) => {
                                       dataStore.reason = text
                                   }}
                                   underlineColorAndroid='transparent'/>
                    </View>

                    <View style={{marginTop: 8, marginBottom: 8, backgroundColor: "#ffffff",}}>

                        <View style={{flexDirection: "row", height: 20}}>
                            <Text style={{marginLeft: 8, flex: 1, textAlign: "left"}}>照片</Text>
                            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{color: "#3a75ea", marginRight: 16}} onPress={() => {
                                    this.addPic();
                                }}>添加</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{color: "#3a75ea", marginRight: 8}} onPress={() => {
                                    this.removeAllPic();
                                }}>清空</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            flex: 1,
                            // backgroundColor: "#ff00ff",
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: "center"
                        }}>
                            {dataStore.images}
                        </View>
                    </View>


                    <View style={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: 160,
                        paddingLeft: 8,
                        paddingRight: 8,
                        backgroundColor: "#ffffff",
                        marginBottom: 8
                    }}>
                        <View style={{flexDirection: "row", marginTop: 4}}>
                            <Text style={{flex: 1, textAlign: "left"}}>签字（框内）</Text>
                            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{color: "#3a75ea"}} onPress={() => {
                                    this.refs.signView.resetImage();
                                }}>重置</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center', marginLeft: 16}}>
                                <Text style={{color: "#3a75ea"}} onPress={() => {
                                    this.refs.signView.saveImage();
                                }}>保存</Text>
                            </TouchableOpacity>

                        </View>
                        <View style={{flex: 1, marginTop: 4}}>
                            <SignatureCapture
                                ref="signView"
                                style={{
                                    width: deviceW,
                                    height: 130,
                                    backgroundColor: '#f5f5f5',
                                }}
                                onSaveEvent={this.onSaveSign.bind(this)}
                                onDragEvent={this.onDragSign.bind(this)}
                                saveImageFileInExtStorage={false}
                                showNativeButtons={false}
                                showTitleLabel={false}
                                viewMode={"portrait"}/>
                        </View>
                    </View>

                    <View style={{
                        flexDirection: "row",
                        height: 40,
                        width: deviceW,
                        alignItems: "center",
                        backgroundColor: "#ffffff",
                        paddingLeft: 8,
                        paddingRight: 8,
                        marginBottom: 8
                    }}>
                        <TextInput style={{flex: 1}}
                                   onChangeText={(text) => {
                                       dataStore.tips = text
                                   }}
                                   underlineColorAndroid="transparent"
                                   placeholder="备注：点击输入"/>
                    </View>
                </ScrollView>

                <TouchableOpacity style={styles.submit} onPress={this.submitData}>
                    <Text style={{color: "#ffffff"}}
                    >签到</Text>
                </TouchableOpacity>


            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: deviceW,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    header: {
        width: deviceW, height: 40, flexDirection: "row", justifyContent: "space-between",
        backgroundColor: '#ffffff', alignItems: "center"
    },
    itemRow: {
        flexDirection: "row",
        height: 40,
        width: deviceW,
        alignItems: "center",
        backgroundColor: "#ffffff",
        paddingLeft: 8,
        paddingRight: 8
    },
    scroll: {flex: 1, width: deviceW, paddingTop: 8, paddingBottom: 8},
    submit: {width: deviceW, height: 40, backgroundColor: "#3a75ea", justifyContent: "center", alignItems: "center",}
});
