import {FlatList, Image, ImageBackground, Text, View} from "react-native";
import React, {Component} from 'react';
import ListItem from "./ListItem"

class item extends Component {

    render() {
        return (
            <text></text>
        )
    }

}


export default class MainScence extends Component {

    constructor() {
        super();

        this.state = {
            // dataList: [{key: 'a'}, {key: 'b'}, {key: 'b'}, {key: 'a'},
            //     {key: 'b'}, {key: 'b'}, {key: 'a'}, {key: 'b'},
            //     {key: 'b'}, {key: 'a'}, {key: 'b'}, {key: 'b'},
            //     {key: 'b'}, {key: 'b'}, {key: 'a'}, {key: 'b'},
            //     {key: 'b'}, {key: 'b'}, {key: 'a'}, {key: 'b'},
            //     {key: 'b'}, {key: 'b'}, {key: 'a'}, {key: 'b'},],
            dataList: [],
            // viewPrepared:false,
            baseUrl: "http://capi.douyucdn.cn/api/v1/live",
            offset: 0,
            loading: false,
        }
    }

    renderItem = ({item}) => {
        // return <Text style={{color: '#ffffff', height: 30, textAlign: "center"}}>{item.key}</Text>
        // return <ListItem key={item.room_id}/>
        return
        <View style={{flex: 1, alignItems: "center", flexDirection: "column", width: 100, height: 120}}>
            <ImageBackground style={{flex: 1, alignItems: "center", flexDirection: "column", width: 100, height: 120}}>
                <View style={{flexDirection: "row", width: 100, height: 20}}>
                <Image source={require('../res/live_type_pc.png')}
                style={{width: 40, height: 20}}/>
                <View style={{flex: 1}}/>
                <Image source={require('../res/eye.png')}
                style={{width: 20, height: 20}}/>
                <Text style={{width: 40, height: 20}}>
                </Text>
                </View>
                <View style={{flex: 1}}/>
                <View style={{flexDirection: "row", width: 100, height: 20}}>
                <Image source={require('../res/head.png')}
                style={{width: 20, height: 20}}/>
                <Text
                style={{flex: 1}}>123</Text>
                </View>
            </ImageBackground>
            <Text style={{height: 20, width: 100}}>{item.room_id}</Text>
        </View>


    }

    // componentDidMount() {
    //     // this.fetchData();
    // }

    onLoad() {

        if (this.state.loading == true) {
            return
        }

        this.setState({
            loading: true
        })

        let url = this.state.baseUrl + "?offset=" + this.state.offset + "&limit=20&client_sys=android"
        console.log(url)

        fetch(url)
            .then((resp) => resp.json())
            .then((json) => {
                console.log(json)
                this.setState({
                    loading: false,
                    dataList: this.state.dataList.concat(json.data)
                })
            })
            .catch((e) => {
                this.setState({
                    loading: false
                })
                alert(e)
            })

        this.setState({
            offset: this.state.offset + 20
        })
    }


    render() {
        return (<View>
            <FlatList style={{backgroundColor: "#121212", width: 200}}
                      data={this.state.dataList}
                // renderItem={({item}) =><Text style={{color: '#ffffff'}}>{item.key}</Text> }
                      renderItem={this.renderItem}
                      onEndReachedThreshold={0.2}
                      numColumns={2}
                      onEndReached={
                          this.onLoad()
                      }
            />
        </View>);
    }

}

