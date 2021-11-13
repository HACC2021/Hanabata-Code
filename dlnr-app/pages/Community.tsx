import React, { useState } from "react";
import {  View } from "react-native";
import {Avatar, ListItem} from 'react-native-elements';

export default function Community({ navigation }) {
    const list = [
        {
            name: 'Amy Farha',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
            subtitle: 'Vice President'
        },
        {
            name: 'Chris Jackson',
            avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            subtitle: 'Vice Chairman'
        },
        ]
    return (
        <View>
            {
                list.map((l, i) => (
                    <ListItem key={i} bottomDivider>
                        <Avatar source={{uri: l.avatar_url}} />
                        <ListItem.Content>
                            <ListItem.Title>{l.name}</ListItem.Title>
                            <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </View>
  );
}