import React, { useState, useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { animesContext } from "../context/AnimeContext";
import { Icons } from "../constants/Icons";
import AnimeCard from "../components/AnimeCard";
import AnimeDetailsModal from "../screens/AnimeDetailsModal";

const FavoritesScreen = () => {
  const { state, toggleFavorite, isFavorite } = useContext(animesContext);
  const [selectedAnime, setSelectedAnime] = useState(null);

  const handleAnimePress = (anime) => {
    setSelectedAnime(anime);
  };

  const renderAnimeItem = ({ item }) => (
    <AnimeCard
      anime={item}
      onPress={() => handleAnimePress(item)}
      onToggleFavorite={toggleFavorite}
      isFavorite={isFavorite(item.id)}
    />
  );

  if (state.favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>{Icons.heartFilled}</Text>
        <Text style={styles.emptyTitle}>No Favorites Yet</Text>
        <Text style={styles.emptyText}>
          Start adding anime to your favorites!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={state.favorites}
        renderItem={renderAnimeItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.favoritesContainer}
      />

      {/* Details Modal */}
      {selectedAnime && (
        <AnimeDetailsModal
          anime={selectedAnime}
          visible={!!selectedAnime}
          onClose={() => setSelectedAnime(null)}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite(selectedAnime.id)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  row: {
    justifyContent: "space-between",
  },
  favoritesContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    backgroundColor: "#fff",
  },
  emptyIcon: {
    fontSize: 64,
    color: "#333",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#16213e",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    lineHeight: 24,
  },
});

export default FavoritesScreen;
