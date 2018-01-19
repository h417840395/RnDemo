import React from "react";
import {Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Dimensions} from 'react-native'

const deviceH = Dimensions.get('window').height;
const deviceW = Dimensions.get('window').width;

export default class Sign extends React.Component {
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
                        <Text style={{flex: 1, marginLeft: 8}}>1231321</Text>
                    </View>

                    <View style={{height:180,marginTop: 8, marginBottom: 8, backgroundColor: "#ffffff"}}>
                        <Text style={{marginLeft: 8}}>1231222232</Text>
                    </View>

                    <View style={styles.itemRow}>
                        <Text style={{color: "#000000"}}>事由:</Text>
                        <TextInput style={{flex: 1}}
                                   underlineColorAndroid='transparent'/>
                    </View>

                    <View style={{height:120,marginTop: 8, marginBottom: 8, backgroundColor: "#ffffff"}}>
                        <Text style={{marginLeft: 8}}>照片</Text>
                        <View></View>
                    </View>

                    <View style={{height:120,paddingLeft:8,paddingRight:8,backgroundColor:"#ffffff",marginBottom:8}}>
                        <View style={{flexDirection:"row"}}>
                            <Text style={{flex:1,textAlign:"left"}}>签字（框内）</Text>
                            <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{color:"#3a75ea"}}>重置</Text>
                            </TouchableOpacity>
                        </View>
                        <View></View>
                    </View>

                    <View style={styles.itemRow}>
                        <TextInput style={{flex:1}}
                                   underlineColorAndroid="transparent"
                                   placeholder="备注：点击输入"/>
                    </View>
                </ScrollView>

                <TouchableOpacity style={styles.submit}>
                    <Text style={{color: "#ffffff"}}>签到</Text>
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
        submit: {width: deviceW, height: 40, backgroundColor: "#3a75ea", justifyContent: "center", alignItems: "center"}
    })


;
