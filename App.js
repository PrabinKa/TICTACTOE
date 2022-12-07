import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground, Alert, Pressable } from "react-native";
import Cross from "./components/Cross";

const emptyArray = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
]

export default function App() {
  const [map, setMap] = useState(emptyArray);
  const [currentTurn, setCurrentTurn] = useState('x');

  const onPress = (rowIndex, columnIndex) => {
    if(map[rowIndex][columnIndex] !== ""){
      Alert.alert("Position Already Occupied")
      return;
    }

    setMap((existingMap) => {
      const updatedMap = [...existingMap];
      updatedMap[rowIndex][columnIndex] = currentTurn
      return updatedMap;
    })

    setCurrentTurn(currentTurn === 'x' ? 'o' : 'x')

    const winner = checkWinningState();
    if(winner){
      gameWinningAlert(winner)
    } else {
      gameTieState()
    }
  }

  const checkWinningState = () => {
    //check rows
    for (let i = 0; i < 3; i++ ){
      const isRowXWinning = map[i].every((cell) => cell === "x")
      const isRowOWinning = map[i].every((cell) => cell === "o")

      if(isRowXWinning){
        return "X";
      }
      if(isRowOWinning){
        return "O";
      }
    }


    //check column
    for (let col = 0; col < 3; col++){
      let isColumnXWinner = true;
      let isColumnOWinner = true;

      for (let row = 0; row < 3; row++){
        if(map[row][col] != "x"){
          isColumnXWinner = false;
        }
        if(map[row][col] != "o"){
          isColumnOWinner = false;
        }
      }

      if (isColumnXWinner){
        return "X";
      }
      if (isColumnOWinner){
        return "O";
      }
    }

    //check diagonal
    let isDiagonalOWinning = true;
    let isDiagonalXWinning = true;
    let isDiagonal2OWinning = true;
    let isDiagonal2XWinning = true;
    for (let i = 0; i < 3; i++){
      if (map[i][i] != "o"){
        isDiagonalOWinning = false;
      }
      if (map[i][i] != "x"){
        isDiagonalXWinning = false;
      }
      if (map[i][2 - i] != "o"){
        isDiagonal2OWinning = false;
      }
      if (map[i][2 - i] != "x"){
        isDiagonal2XWinning = false;
      }
    }

    if (isDiagonalOWinning || isDiagonal2OWinning) {
      return "O";
    }
    if (isDiagonalXWinning || isDiagonal2XWinning) {
      return "X";
    }

  }

  const gameWinningAlert = (player) => {
    Alert.alert(`Hurray`, `Player ${player} won the game`, [
      {text: "Restart",
      onPress: resetGame},
    ])
  }

  const gameTieState = () => {
    if(!map.some(row => row.some(cell => cell === ""))){
      Alert.alert(`Tie`, `It's a Tie`, [
        {text: "Restart",
        onPress: resetGame},
      ])
    }
  }

  const resetGame = () => {
    setMap([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
    setCurrentTurn("x");
  }
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/background.png")}
        style={styles.background}
        resizeMode="contain"
      >
        <Text style={{position: "absolute",top: 40, alignSelf: "center", fontSize: 24, fontWeight: "bold", color: "white", marginBottom: "auto"}}>Current Turn: {currentTurn.toUpperCase()}</Text>
        <View style={styles.map}>
          {map.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, columnIndex) => (
                <Pressable key={`row-${rowIndex}-col-${columnIndex}`} onPress={()=> onPress(rowIndex, columnIndex)} style={styles.cell}>
                  {cell === "o" && <View style={styles.circle} />}
                  {cell === "x" && <Cross />}
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </ImageBackground>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#434040",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  map: {
    width: "80%",
    aspectRatio: 1,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  cell: {
    width: 100,
    height: 110,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    height: 70,
    width: 70,
    backgroundColor: "#434040",
    borderRadius: 50,
    borderWidth: 10,
    borderColor: "white",
    marginTop: 5,
  },

});
