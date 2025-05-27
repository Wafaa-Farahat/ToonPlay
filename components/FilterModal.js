import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const FilterModal = ({ visible, onClose, currentFilter, onFilterSelect }) => {
  const filters = [
    { id: "popularity.desc", name: "Most Popular" },
    { id: "vote_average.desc", name: "Highest Rated" },
    { id: "first_air_date.desc", name: "Latest Release" },
    { id: "trending", name: "Trending Now" },
  ];

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.filterModal}>
          <Text style={styles.filterTitle}>Filter Anime</Text>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterOption,
                currentFilter === filter.id && styles.activeFilterOption,
              ]}
              onPress={() => {
                onFilterSelect(filter.id);
                onClose();
              }}
            >
              <Text
                style={[
                  styles.filterOptionText,
                  currentFilter === filter.id && styles.activeFilterText,
                ]}
              >
                {filter.name}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.closeFilterBtn} onPress={onClose}>
            <Text style={styles.closeFilterText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  filterModal: {
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 20,
    width: width * 0.8,
    maxWidth: 320,
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  filterOption: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: "#16213e",
  },
  activeFilterOption: {
    backgroundColor: "#F8FAFC",
  },
  filterOptionText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  activeFilterText: {
    fontWeight: "bold",
  },
  closeFilterBtn: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#333",
    borderRadius: 12,
  },
  closeFilterText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});

export default FilterModal;
