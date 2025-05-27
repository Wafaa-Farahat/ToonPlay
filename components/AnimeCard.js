import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Icons } from "../constants/Icons";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2;

const AnimeCard = ({ anime, onPress, onToggleFavorite, isFavorite }) => {
  const getGenres = (genreIds) => {
    const genreMap = {
      16: "Animation",
      28: "Action",
      35: "Comedy",
      18: "Drama",
      10759: "Action & Adventure",
    };
    return (
      genreIds
        ?.slice(0, 2)
        .map((id) => genreMap[id])
        .join(", ") || "Animation"
    );
  };

  return (
    <TouchableOpacity style={styles.animeCard} onPress={onPress}>
      <View style={styles.posterContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${anime.poster_path}`,
          }}
          style={styles.poster}
          defaultSource={{
            uri: "https://via.placeholder.com/300x450/333/fff?text=No+Image",
          }}
        />
        <TouchableOpacity
          style={styles.favoriteBtn}
          onPress={() => onToggleFavorite(anime)}
        >
          <Text style={styles.favoriteIcon}>
            {isFavorite ? Icons.heartFilled : Icons.heart}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.animeTitle} numberOfLines={1}>
          {anime.name}
        </Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.star}>{Icons.star}</Text>
          <Text style={styles.rating}>{anime.vote_average}</Text>
        </View>
        <Text style={styles.year}>
          {new Date(anime.first_air_date).getFullYear()}
        </Text>
        <Text style={styles.genres} numberOfLines={1}>
          {getGenres(anime.genre_ids)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  animeCard: {
    width: cardWidth,
    backgroundColor: "#16213e",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  posterContainer: {
    position: "relative",
  },
  poster: {
    width: "100%",
    height: cardWidth * 1.5,
  },
  favoriteBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 20,
    padding: 8,
  },
  favoriteIcon: {
    fontSize: 16,
    color: "#AAD7D9",
  },
  cardInfo: {
    padding: 12,
  },
  animeTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  star: {
    fontSize: 12,
    color: "#FFD700",
    marginRight: 4,
  },
  rating: {
    color: "#FFD700",
    fontSize: 12,
    fontWeight: "bold",
  },
  year: {
    color: "#999",
    fontSize: 12,
    marginBottom: 4,
  },
  genres: {
    color: "#FF90BB",
    fontSize: 11,
  },
});

export default AnimeCard;
