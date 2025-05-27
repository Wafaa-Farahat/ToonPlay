import React from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";

const CategorySlider = ({ onCategorySelect, selectedCategory }) => {
  const categories = [
    { id: "popularity.desc", name: "Popular", color: "#AAD7D9" },
    { id: "vote_average.desc", name: "Top Rated", color: "#FF90BB" },
    { id: "first_air_date.desc", name: "Latest", color: "#81BFDA" },
    { id: "trending", name: "Trending", color: "#FFC785" },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categorySlider}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryCard,
            { backgroundColor: category.color },
            selectedCategory === category.id && styles.selectedCategory,
          ]}
          onPress={() => onCategorySelect(category.id)}
        >
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categorySlider: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  categoryCard: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 12,
    minWidth: 100,
    alignItems: "center",
  },
  selectedCategory: {
    transform: [{ scale: 1.05 }],
    elevation: 6,
  },
  categoryText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default CategorySlider;
