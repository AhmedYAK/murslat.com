import React from 'react';
import { StyleSheet, Text, View ,ScrollView,FlatList,TouchableOpacity} from 'react-native';

export default class Search extends React.Component {
    state = {
        names: [
            {
                id: 0,
                name: 'Ben',
            },
            {
                id: 1,
                name: 'Susan',
            },
            {
                id: 2,
                name: 'Robert',
            },
            {
                id: 3,
                name: 'Mary',
            },
            {
                id: 4,
                name: 'Ben',
            },
            {
                id: 5,
                name: 'Susan',
            },
            {
                id: 6,
                name: 'Robert',
            },
            {
                id: 7,
                name: 'Mary',
            },
            {
                id: 8,
                name: 'Ben',
            },
            {
                id: 9,
                name: 'Susan',
            },
            {
                id: 10,
                name: 'Robert',
            },
            {
                id: 11,
                name: 'Mary',
            }
        ]
    };

    _keyExtractor = (item, index) => item.id;
    _renderItem = ({item}) => (

        <TouchableOpacity style={styles.item} id={item.id}>
            <Text>{item.name}</Text>
        </TouchableOpacity>

    );
    alertItemName = (item) => {
        alert(item.name)
    }

    render() {
        return (
            <View>

                <FlatList
                    data={this.state.names}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#d2f7f1'
    }
});