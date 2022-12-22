import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";

import * as Speech from "expo-speech";

import { DrawerContentComponentProps } from "@react-navigation/drawer";

import { useIsFocused } from "@react-navigation/native";

import { IconCaretButton } from "../../components/Button/IconCaretButton";

const exercises = [
  {
    id: 1,
    title: "Tongue In-and-Outs",
    description:
      "Tongue In-and-Outs...Stick your tongue out and hold it for 2 seconds, then pull it back in. Hold for 2 seconds, and repeat. This helps train your tongue to move with coordinated patterns, which will help you produce better speech. It's best to do all of these speech therapy exercises in front of the mirror so that you can get visual feedback.",
    image: require(`../../assets/exercises-tongue-out.png`),
  },
  {
    id: 2,
    title: "Tongue Side-to-Side",
    description:
      "Tongue Side-to-Side...For this speech therapy exercise, open your mouth and move your tongue to touch the right corner of your mouth. Hold for 2 seconds, then touch the left corner of your mouth. Hold for 2 seconds, and repeat.",
    image: require(`../../assets/exercises-tongue-side-to-side.png`),
  },
  {
    id: 3,
    title: "Tongue Up-and-Down",
    description:
      "Tongue Up-and-Down... Open your mouth and stick your tongue out. Then, reach your tongue up toward your nose. Hold for 2 seconds, then reach your tongue down toward your chin. Hold for 2 seconds, and repeat.",
    image: require(`../../assets/exercises-tongue-nose.png`),
  },
  {
    id: 4,
    title: "Say Cheese!",
    description:
      "Say Cheese!...Here’s another simple speech therapy exercise that improves oral motor skills. Practice smiling in front of a mirror. Smile, then relax. Repeat as much as you can stand. The mirror is important because it provides feedback, which is fuel for your brain!",
    image: require(`../../assets/exercises-cheese-smile.png`),
  },
  {
    id: 5,
    title: "Practice Your Kissy Face",
    description:
      "Practice Your Kissy Face...When you’re done practicing those smiles, try making kissy faces by puckering your lips. Pucker your lips together, then relax. Repeat as often as you can. You should slow down the movement for even better control.",
    image: require(`../../assets/exercises-kissy-face.png`),
  },
];

type LevelProps = {
  navigation: DrawerContentComponentProps["navigation"];
  isDescriptionMuted: boolean;
};

export const Exercises = ({ navigation, isDescriptionMuted }: LevelProps) => {
  const [exerciseIndex, setExerciseIndex] = useState(0);

  const isFocused = useIsFocused();

  const {
    title = "",
    description = "",
    image = "",
  } = { ...exercises[exerciseIndex] };

  const exerciseEnd = exerciseIndex === exercises.length;

  const speakDescription = async () => {
    const thingToSay = description;
    Speech.speak(thingToSay, {
      language: "en-AU",
    });
  };

  useEffect(() => {
    if (isFocused && !isDescriptionMuted) {
      Speech.stop();
      speakDescription();
    }
  }, [isFocused, exerciseIndex]);

  useEffect(() => {
    if (isDescriptionMuted) {
      Speech.stop();
    }
  }, [isDescriptionMuted]);

  useEffect(() => {
    if (isFocused && exerciseEnd) {
      const thingToSay =
        "Well Done! The mouth exercises are completed, press the middle button to move on to speech exercises starting at level 1";
      Speech.speak(thingToSay, {
        language: "en-AU",
      });
    }
  }, [exerciseIndex]);

  const onNextPress = () => {
    Speech.stop();
    setExerciseIndex((prevWord) => prevWord + 1);
  };

  const onBackPress = () => {
    Speech.stop();
    setExerciseIndex((prevWord) => prevWord - 1);
  };

  const onPlaySoundPress = () => {
    Speech.speak(description, {
      language: "en-AU",
    });
  };

  return (
    <View>
      <View style={styles.container}>
        <IconCaretButton
          direction="caret-back"
          handleOnPress={onBackPress}
          isDisabled={exerciseIndex === 0}
        />
        {!exerciseEnd ? (
          <View style={styles.txtImageContainer}>
            <Text style={styles.largeText}>{title}</Text>
            <Image
              source={image}
              style={{ width: 300, height: 150, borderRadius: 100 }}
            />
          </View>
        ) : (
          <View>
            <Text style={styles.mediumText}>
              Well Done! The mouth exercises are completed
            </Text>
            <Button
              title="Move on to the speech exercises starting at level 1"
              onPress={() => navigation.jumpTo("Level 1")}
            />
          </View>
        )}

        <IconCaretButton
          direction="caret-forward"
          handleOnPress={onNextPress}
          isDisabled={exerciseIndex === exercises.length}
        />
      </View>

      {!exerciseEnd && (
        <View style={styles.playSoundBtn}>
          <Button title="Play description" onPress={onPlaySoundPress} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  txtImageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  largeText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  mediumText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  playSoundBtn: {
    display: "flex",
    alignItems: "center",
  },
});
