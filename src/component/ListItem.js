import React from "react";
import {Image, Text, View} from "react-native";

export default class ListItem extends React.Component {

    render() {
        return (<View>
            <Image style={{flex: 1, alignItems: "center", flexDirection: "column", width: 100, height: 120}}>
                {/*<View style={{flexDirection: "row", width: 100, height: 20}}>*/}
                    {/*<Image source={require('../res/live_type_pc.png')}*/}
                           {/*style={{width: 40, height: 20}}/>*/}
                    {/*<View style={{flex: 1}}/>*/}
                    {/*<Image source={require('../res/eye.png')}*/}
                           {/*style={{width: 20, height: 20}}/>*/}
                    {/*<Text style={{width: 40, height: 20}}>*/}
                    {/*</Text>*/}
                {/*</View>*/}
                {/*<View style={{flex: 1}}/>*/}
                {/*<View style={{flexDirection: "row", width: 100, height: 20}}>*/}
                    {/*<Image source={require('../res/head.png')}*/}
                           {/*style={{width: 20, height: 20}}/>*/}
                    {/*<Text*/}
                        {/*style={{flex: 1}}>123</Text>*/}
                {/*</View>*/}
            </Image>
            <Text style={{height: 20, width: 100}}>{this.props.room_id}</Text>
        </View>)
    }

}
