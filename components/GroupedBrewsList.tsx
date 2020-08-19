import React from "react";
import memoizee from "memoizee";
import { View, Text, StyleSheet, SectionList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { selector, useRecoilValue } from "recoil";
import brewListState  from "../atoms/brewListState";
import { Brew, BrewMap, AllowedBrewGrouping } from '../types';
import BrewItem from "./BrewItem";


type GroupedBrewsListProps = {
  groupBy: AllowedBrewGrouping
}

const brewsByGrouping = memoizee((groupBy: AllowedBrewGrouping) => selector({
  key: groupBy,
  get: ({ get }) => {
    const brewsMap = get<BrewMap>(brewListState);
    const brews = Object.entries(brewsMap).map(
      ([brewId, brewInfo]: [string, Brew]) => {
        return {
          brewId,
          ...brewInfo,
        };
      }
    );
    const brewMappedByGrouping = brews.reduce((acc, brew: Brew) => {
      // if (acc[brew.brewery]) {
      //   acc[brew.brewery].push(brew);
      // }
      // acc[brew.brewery] = [brew];
      // return acc;
      const propertyToGroupBy = brew[groupBy];
      const currentBrewsForBrewery: Array<Brew> = acc[propertyToGroupBy] || [];
      return {
        ...acc,
        [propertyToGroupBy]: [...currentBrewsForBrewery, brew],
      };
    }, {} as { [key: string]: Array<Brew> });

    return Object.entries(brewMappedByGrouping).map(
      ([grouping, brews]: [string, Array<Brew>]) => {
        return {
          heading: grouping,
          data: brews,
        };
      }
    );
  },
}));

const GroupedBrewsList = ({ groupBy }: GroupedBrewsListProps) => {
  const groupedBrewsData = useRecoilValue(brewsByGrouping(groupBy));

  // useEffect(() => {
  //   getPersistedState("brews").then((brews: BrewMap) => {
  //     brews && setBrewList(brews);
  //   });
  // }, []);

  // const data = Object.entries(brews).map(
  //   ([brewId, brewInfo]: [string, Brew]) => {
  //     return {
  //       brewId,
  //       ...brewInfo,
  //     };
  //   }
  // );
  return (
    <LinearGradient colors={["#FFE898", "#FF5F04"]} style={styles.container}>
      <View style={styles.listContainer}>
        <SectionList
          sections={groupedBrewsData}
          keyExtractor={(item) => item.brewId as string}
          renderItem={({ item }) => (
            <BrewItem
              key={item.brewId}
              brewId={item.brewId as string}
              name={item.name}
              brewery={item.brewery}
              style={item.style}
              rating={item.rating}
              brewImage={item.brewImage}
            />
          )}
          renderSectionHeader={({ section: { heading } }) => (
            <Text style={styles.breweryHeader}>{heading}</Text>
          )}
        />
        {/* !data.length ? (
          <View style={styles.emptyMessageContainer}>
            <Text style={styles.emptyMessageText}>
              {"The brews you add will be displayed here! Trying adding you first brew!"}
            </Text>
          </View>
        ): null */}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.64)",
  },
  breweryHeader: {
    fontSize: 18,
    padding: 8,
    backgroundColor: "#FBB453",
  },
});

GroupedBrewsList.AllowedBrewGrouping = AllowedBrewGrouping;

export default GroupedBrewsList;
