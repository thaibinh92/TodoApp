/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ListView
} from 'react-native';
var Firebase = require('firebase');

export default class TodoApp extends Component {
    constructor(props) {
        super(props);
        var root = new Firebase('https://demoreactnative-4ddde.firebaseio.com/');
        this.itemsRef = root.child('AppToDo');
        this.state = {
            ds: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            })
        }
        this.items = [];
        this.itemsRef.on('child_added', (dataSnapshot) => {
            this.items.push({
                id: dataSnapshot.key(),
                value: dataSnapshot.val().IOS
            })
            this.setState({
                ds: this.state.ds.cloneWithRows(this.items)
            })
        })

    }

    saveSet() {
        this.itemsRef.set({
            reactNative: "Thai Binh Training",
        })
    }

    savePush() {
        this.itemsRef.child('Trung Tam Dao Tao Thai Binh').push({
            PUSH: 'Fire trong react native',

        });
    }

    addData() {
        this.itemsRef.child('ThaiBinh/reactNative').on("value", function (snapshot) {
            alert(snapshot.val());
        })
    }

    view_table(row) {
        return (
            <TouchableOpacity>
                <View>
                    <View style={styles.row} >
                        <Text>
                            {row.value}
                        </Text>
                    </View>
                    <View style={styles.separator}>

                    </View>
                </View>
            </TouchableOpacity>


        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>
                        App Todo List
                    </Text>
                </View>

                <View style={styles.inputContainer} >
                    <TextInput style={styles.input} />
                    <TouchableOpacity>
                        <Text style={styles.btnText} >Add</Text>
                    </TouchableOpacity>
                </View>

                <ListView dataSource={this.state.ds}
                          renderRow={this.view_table.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    titleView:{
        backgroundColor:"#2ca8e2",
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'row'
    },
    titleText:{
        color:'white',
        textAlign:'center',
        fontWeight:'bold',
        flex:1,
        fontSize:20
    },
    inputContainer:{
        marginTop:5,
        padding:10,
        flexDirection:'row'
    },
    row:{
        flexDirection:'row',
        padding:12,
        height:44
    },
    separator:{
        height:1,
        backgroundColor:'silver'
    },
    todoText:{
        flex:1
    },
    button:{
        height:36,
        flex:2,
        flexDirection:'row',
        backgroundColor:'#2f9beb',
        justifyContent:'center',
        color:'#ffffff',
        borderRadius:4
    },
    btnText:{
        fontSize:18,
        color:'#fff',
        marginTop:6
    },
    input:{
        height:36,
        padding:4,
        marginRight:5,
        flex:4,
        fontSize:18,
        borderWidth:1,
        borderColor:'#2ca8e2',
        borderRadius:4,
        color:'#2ca8e2'
    }

});

AppRegistry.registerComponent('TodoApp', () => TodoApp);
