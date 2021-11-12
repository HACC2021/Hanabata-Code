import React from 'react';
import { Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

export default function CommunityDetail(props) {
    return (
        <ScrollView>
            <Text>{props.route.params.name}</Text>
        </ScrollView>
    );
}
