import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import Slider from '@react-native-community/slider';

import "./Components/MyText";
import MyText from './Components/MyText';
import { useState } from 'react';

export default function App() {

  const [percentage, setPercentage] = useState(20);
  const [bill, setBill] = useState("0.00");
  const [total, setTotal] = useState("0.00")
  const [image, setImage] = useState({uri: require("./img/neutral.png")})

  const updateBill = (billString) => {
    setBill(billString)
    calculateTotal(percentage)
  }

  const updatePercentage = (rawPercentage) => {
    setPercentage(rawPercentage)
    if(rawPercentage < 5) {
      setImage({uri: require("./img/reallysad.png")})
    } else if(rawPercentage >= 5 && rawPercentage < 10) {
      setImage({uri: require("./img/sad.png")})
    } else if(rawPercentage >= 10 && rawPercentage < 15) {
      setImage({uri: require("./img/neutral.png")})
    } else if(rawPercentage >= 15 && rawPercentage < 20) {
      setImage({uri: require("./img/cool.png")})
    } else if(rawPercentage >= 20 && rawPercentage < 80) {
      setImage({uri: require("./img/happy.png")})
    } else if(rawPercentage >= 80 && rawPercentage < 101) {
      setImage({uri: require("./img/money.png")})
    }

    calculateTotal(rawPercentage)
  }

  const calculateTotal = (rawPercentage) => {
    if(!isNaN(bill)) {
      totalCalc = 1* bill + (bill * (rawPercentage/100))
      setTotal(totalCalc)
    }
  }

  return (
    <View style={styles.container}>
      <MyText text="Tip Calculator" style={styles.title}/>
      <View style={styles.bill}>
        <MyText text="Bill Total:"/>
        <TextInput style={styles.input} placeholder={bill} value={bill} onChangeText={newBill => updateBill(newBill)}/>
      </View>
      <View style={styles.total}>
        <MyText text="Total:"/>
        <MyText text={`$${total}`}/>
      </View>
      <Image source={image.uri} style={styles.face}/>
      <View style={styles.percentage}>
        <MyText text={`${percentage}%`}/>
        <Slider style={styles.slider} onValueChange={(newPercentage) => updatePercentage(newPercentage)} value={percentage} step={1} minimumValue={0} maximumValue={100} maximumTrackTintColor='white' minimumTrackTintColor='green'/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: "#8bc48d",
  },
  title: {
    padding: 50,
    fontSize: 40,
    fontWeight: "bold"
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderStyle: "solid",
    borderWidth: 2,
    backgroundColor: "white",
    flexGrow: 3,
    textAlign: "right",
    fontSize: 18
  },
  bill: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    position: "absolute",
    top: "25%",
    width: "80%"
  },
  total: {
    position: 'absolute',
    top: "45%",
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  percentage: {
    position: "absolute", 
    top: "85%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  slider: {
    width: "55%", 
    height: 40
  },
  face: {
    position: "absolute",
    top: "60%",
    width: "43%",
    height: "20%"
  }
});
