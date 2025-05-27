import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Linking,
  StyleSheet,
} from "react-native";
import { Icons } from "../constants/Icons";

const AnimeDetailsModal = ({
  anime,
  visible,
  onClose,
  onToggleFavorite,
  isFavorite,
}) => {
  const [trailerUrl, setTrailerUrl] = useState(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      if (!anime?.id) return;

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${anime.id}/videos?api_key=021d724ac74ffe96244cd92eaa2d02c2&language=en-US`
        );
        const data = await res.json();

        const trailer = data.results.find(
          (vid) =>
            vid.type === "Trailer" &&
            vid.site === "YouTube" &&
            vid.official === true
        );

        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
        } else {
          setTrailerUrl(null);
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
        setTrailerUrl(null);
      }
    };

    if (visible) {
      fetchTrailer();
    }
  }, [anime, visible]);

  const getGenres = (genreIds) => {
    const genreMap = {
      16: "Animation",
      28: "Action",
      35: "Comedy",
      18: "Drama",
      10759: "Action & Adventure",
    };
    return genreIds?.map((id) => genreMap[id]).join(", ") || "Animation";
  };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.detailsContainer}>
        <StatusBar barStyle="light-content" />

        {/* Header */}
        <View style={styles.detailsHeader}>
          <TouchableOpacity style={styles.backBtn} onPress={onClose}>
            <Text style={styles.backIcon}>{Icons.back}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.favoriteDetailBtn}
            onPress={() => onToggleFavorite(anime)}
          >
            <Text style={styles.favoriteDetailIcon}>
              {isFavorite ? Icons.heartFilled : Icons.heart}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Poster and Basic Info */}
          <View style={styles.detailsTop}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${anime.poster_path}`,
              }}
              style={styles.detailsPoster}
              defaultSource={{
                uri: "https://via.placeholder.com/300x450/333/fff?text=No+Image",
              }}
            />
            <View style={styles.detailsInfo}>
              <Text style={styles.detailsTitle}>{anime.name}</Text>
              <View style={styles.detailsRating}>
                <Text style={styles.star}>{Icons.star}</Text>
                <Text style={styles.detailsRatingText}>
                  {anime.vote_average}/10
                </Text>
              </View>
              <Text style={styles.detailsYear}>
                {new Date(anime.first_air_date).getFullYear()}
              </Text>
              <Text style={styles.detailsGenres}>
                {getGenres(anime.genre_ids)}
              </Text>
            </View>
          </View>

          {/* Play Button */}
          <TouchableOpacity
            style={styles.playBtn}
            onPress={() => {
              if (trailerUrl) {
                Linking.openURL(trailerUrl);
              } else {
                Alert.alert("Trailer not available");
              }
            }}
          >
            <Text style={styles.playIcon}>{Icons.play}</Text>
            <Text style={styles.playText}>Watch Trailer</Text>
          </TouchableOpacity>

          {/* Overview */}
          <View style={styles.overviewSection}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.overviewText}>{anime.overview}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  detailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#1a1a2e",
  },
  backBtn: {
    padding: 8,
  },
  backIcon: {
    fontSize: 24,
    color: "#fff",
  },
  favoriteDetailBtn: {
    padding: 8,
  },
  favoriteDetailIcon: {
    fontSize: 24,
    color: "#F8FAFC",
  },
  detailsTop: {
    flexDirection: "row",
    padding: 20,
  },
  detailsPoster: {
    width: 120,
    height: 180,
    borderRadius: 12,
    marginRight: 20,
  },
  detailsInfo: {
    flex: 1,
    justifyContent: "flex-start",
  },
  detailsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#16213e",
    marginBottom: 12,
    lineHeight: 30,
  },
  detailsRating: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  star: {
    fontSize: 12,
    color: "#FFD700",
    marginRight: 4,
  },
  detailsRatingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFD700",
    marginLeft: 8,
  },
  detailsYear: {
    fontSize: 16,
    color: "#999",
    marginBottom: 8,
  },
  detailsGenres: {
    fontSize: 14,
    color: "#FF90BB",
    lineHeight: 20,
  },
  playBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#16213e",
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  playIcon: {
    fontSize: 20,
    color: "#fff",
    marginRight: 12,
  },
  playText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  overviewSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#16213e",
    marginBottom: 16,
  },
  overviewText: {
    fontSize: 16,
    color: "#16213e",
    lineHeight: 24,
  },
});

export default AnimeDetailsModal;
