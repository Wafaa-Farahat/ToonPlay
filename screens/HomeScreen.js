import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { animesContext } from "../context/AnimeContext";
import { Icons } from "../constants/Icons";
import CategorySlider from "../components/CategorySlider";
import AnimeCard from "../components/AnimeCard";
import FilterModal from "../components/FilterModal";
import AnimeDetailsModal from "../screens/AnimeDetailsModal";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

const HomeScreen = () => {
  const { state, searchAnime, setFilter, toggleFavorite, isFavorite } =
    useContext(animesContext);
  const [searchText, setSearchText] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);

  const handleSearch = (text) => {
    setSearchText(text);
    searchAnime(text);
  };

  const handleCategorySelect = (categoryId) => {
    setFilter(categoryId);
  };

  const handleAnimePress = (anime) => {
    setSelectedAnime(anime);
  };

  const renderAnimeItem = ({ item, index }) => (
    <AnimeCard
      anime={item}
      onPress={() => handleAnimePress(item)}
      onToggleFavorite={toggleFavorite}
      isFavorite={isFavorite(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Categories Slider */}
        <CategorySlider
          onCategorySelect={handleCategorySelect}
          selectedCategory={state.currentFilter}
        />

        {/* Search and Filter */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Text style={styles.searchIcon}>{Icons.search}</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search anime..."
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={handleSearch}
            />
          </View>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => setShowFilterModal(true)}
          >
            <Text style={styles.filterIcon}>{Icons.filter}</Text>
          </TouchableOpacity>
        </View>

        {/* Anime Grid */}
        <View style={styles.animeGrid}>
          {state.loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading anime...</Text>
            </View>
          ) : (
            <FlatList
              data={state.animeList}
              renderItem={renderAnimeItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={styles.row}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        currentFilter={state.currentFilter}
        onFilterSelect={setFilter}
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
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#16213e",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  searchIcon: {
    fontSize: 16,
    color: "#999",
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingVertical: 12,
  },
  filterBtn: {
    backgroundColor: "#16213e",
    padding: 12,
    borderRadius: 12,
  },
  filterIcon: {
    fontSize: 16,
    color: "#fff",
  },
  animeGrid: {
    paddingHorizontal: 16,
  },
  row: {
    justifyContent: "space-between",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  loadingText: {
    color: "#16213e",
    fontSize: 16,
  },
});

export default HomeScreen;
