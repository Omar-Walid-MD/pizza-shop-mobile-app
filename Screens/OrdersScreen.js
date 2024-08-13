import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Pressable, FlatList } from 'react-native';
import styles from "../styles";
import { LinearGradient } from 'expo-linear-gradient';
import Text from '../Components/Text';
import Background from '../Components/Background';
import ScreenContent from '../Components/Layout/ScreenContent';
import { useSelector } from 'react-redux';
import Button from '../Components/Button';

import { MaterialIcons } from "react-native-vector-icons";
import Accordion from '../Components/Accordion';
import { useTranslation } from 'react-i18next';

const sizeColors = {
    "s": "#589941",
    "m": "#C0851A",
    "l": "#C03E3E"
};

const statusStrings = {
    "pending": "قيد الإنتظار",
    "success": "تم التوصيل"
}

const statusColors = {
    "success": "#589941",
    "pending": "#C0851A"
};


export default function OrdersScreen({navigation}) {

    const orders = useSelector(store => store.orders.orders);
    const items = useSelector(store => store.items.items);
    const { t: translate} = useTranslation();

    return (
        <View style={{...styles['screen-container']}}>
            {/* Background */}
            {/* <Background /> */}

            {/* Screen Content */}
            <ScreenContent
                header={
                    <View
                        style={{...styles['w-100'], ...styles['flex-row'], ...styles['al-items-c'], ...styles['j-content-b'], ...styles['px-2']}}
                    >
                        <Text font='accent' style={{width:"100%",textAlign:"center",fontSize:40}}>
                            {translate("orders.title")}
                        </Text>

                        <Button variant="green" onPress={() => navigation.navigate("Main")}>
                            <Text style={{...styles['col-white']}}>
                                {translate("orders.back_button")}
                            </Text>
                        </Button>
                    </View>
                }
            >
                <View style={{...styles['al-items-c']}}>
                    <FlatList
                        //style[w-100]
                        style={{...styles['w-100']}}
                        scrollEnabled={false}
                        data={Object.keys(orders)}
                        renderItem={({item: orderID}) => {
                            const order = orders[orderID];
                            return (
                                <View
                                    //style[flex:1 border-2 border-danger rounded shadow bg-main m-1 p-1 gap-3]
                                    style={{flex: 1, ...styles['border-2'], ...styles['border-danger'], ...styles['rounded'], ...styles['shadow'], ...styles['bg-main'], ...styles['m-1'], ...styles['p-1'], ...styles['gap-3']}}
                                >
                                    <View
                                        //style[w-100 flex-row j-content-b]
                                        style={{...styles['w-100'], ...styles['flex-row'], ...styles['j-content-b']}}
                                    >
                                        <Text weight="b" style={{color: statusColors[order.orderStatus]}}>
                                            {translate(statusStrings[order.orderStatus])}
                                        </Text>
                                        <Text>{new Date(order.date).toLocaleString()}</Text>
                                    </View>

                                    <Accordion content={<Text style={{...styles['fs-3']}}>{translate("orders.items")}</Text>}>
                                        <FlatList
                                            scrollEnabled={false}
                                            data={order.items}
                                            renderItem={({item}) => {
                                                const itemInfo = items[item.id];

                                                return (
                                                    <View
                                                        //style[bg-white rounded shadow p-1 flex-row j-content-b marginVertical:5]
                                                        style={{...styles['bg-white'], ...styles['rounded'], ...styles['shadow'], ...styles['p-1'], ...styles['flex-row'], ...styles['j-content-b'], marginVertical: 5}}
                                                    >
                                                        <View
                                                            //style[gap-1]
                                                            style={{...styles['gap-1']}}
                                                        >
                                                            <Text weight="sb" style={{...styles['fs-4']}}>
                                                                {itemInfo.name}
                                                            </Text>
                                                            <View
                                                                style={{...styles['al-items-c'], ...styles['rounded'], ...styles['shadow'], padding: 2.5, backgroundColor: sizeColors[item.size]}}
                                                            >
                                                                <Text weight="sb" style={{...styles['col-white']}}>
                                                                    {translate(`size.${item.size}`)}
                                                                </Text>
                                                            </View>
                                                        </View>

                                                        <View
                                                            //style[gap-1]
                                                            style={{...styles['gap-1']}}
                                                        >
                                                            <Text weight="sb" style={{...styles['fs-4']}}>
                                                                {item.unitPrice} {translate("orders.currency")}
                                                            </Text>
                                                            <Text>({item.count}x)</Text>
                                                        </View>
                                                    </View>
                                                );
                                            }}
                                        />
                                        <View
                                            //style[w-100 border-2 my-2 mt-3]
                                            style={{...styles['w-100'], ...styles['border-2'], ...styles['my-2'], ...styles['mt-3']}}
                                        />
                                    </Accordion>

                                    <View
                                        //style[w-100 gap-1]
                                        style={{...styles['w-100'], ...styles['gap-1']}}
                                    >
                                        <View style={{...styles['w-100'], ...styles['flex-row'], ...styles['px-2'], ...styles['j-content-b']}}>
                                            <Text style={{...styles['text-center'], ...styles['fs-4']}}>
                                                {translate("orders.subtotal")}
                                            </Text>
                                            <Text style={{...styles['text-center'], ...styles['fs-4']}}>
                                                {order.subtotal} {translate("orders.currency")}
                                            </Text>
                                        </View>

                                        <View style={{...styles['w-100'], ...styles['flex-row'], ...styles['px-2'], ...styles['j-content-b']}}>
                                            <Text style={{...styles['text-center'], ...styles['fs-4']}}>
                                                {translate("orders.delivery_fees")}
                                            </Text>
                                            <Text style={{...styles['text-center'], ...styles['fs-4']}}>
                                                {order.deliveryFees} {translate("orders.currency")}
                                            </Text>
                                        </View>

                                        <View style={{...styles['w-100'], ...styles['flex-row'], ...styles['px-2'], ...styles['j-content-b']}}>
                                            <Text style={{...styles['text-center'], ...styles['fs-4']}}>
                                                {translate("orders.total")}
                                            </Text>
                                            <Text style={{...styles['text-center'], ...styles['fs-3']}}>
                                                {(order.total).toFixed(2)} {translate("orders.currency")}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        }}
                    />
                </View>
            </ScreenContent>

            <StatusBar style="auto" />
        </View>

    );
}
 
