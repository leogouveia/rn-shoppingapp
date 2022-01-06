import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import colors from "../constants/colors";

const StartGameScreen = () => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const handleNumberInput = (value) => {
    setEnteredValue(value.replace(/\D/g, ""));
  };

  const handleResetInput = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const handleConfirmInput = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99",
        [
          {
            text: "Ok",
            style: "destructive",
            onPress: handleResetInput,
          },
        ]
      );
      return;
    }
    setConfirmed(true);
    setSelectedNumber(parseInt(enteredValue));
    setEnteredValue("");
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.confirmedOutputCard}>
        <Text style={styles.confirmedOutputTitle}>Choosen Number</Text>
        <View>
          <Text style={styles.confirmedOutputNumber} color={colors.primary}>
            {selectedNumber}
          </Text>
        </View>
        <View style={styles.confirmedOutputStartButton}>
          <Button title="Start Game" onPress={() => {}} />
        </View>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a new game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a number</Text>
          <Input
            style={styles.input}
            keyboardType="number-pad"
            blurOnSubmit
            maxLength={2}
            value={enteredValue}
            onChangeText={handleNumberInput}
          />
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <Button
                title="Reset"
                color={colors.accent}
                onPress={handleResetInput}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Confirm"
                color={colors.primary}
                onPress={handleConfirmInput}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
  },
  buttonsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  buttonContainer: {
    width: "45%",
  },
  input: {
    width: 50,
    textAlign: "center",
    marginVertical: 20,
  },
  confirmedOutputCard: {
    backgroundColor: colors.primary,
    marginVertical: 10,
    padding: 40,
  },
  confirmedOutputTitle: {
    color: "white",
  },
  confirmedOutputNumber: {
    fontSize: 50,
    color: "white",
    fontWeight: "bold",
  },
  confirmedOutputStartButton: {
    marginTop: 10,
  },
});

export default StartGameScreen;
