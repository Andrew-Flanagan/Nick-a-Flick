export const getGenres = (movie) => {
    return movie.genres.map((genre) => genre.name).join(", ")
  }

export const getTitle = (movie) => {
  if (movie.title === undefined) {
      return movie.name;
  }
  return movie.title;
}

export const getReleaseDate = (movie) => {
  if (movie.release_date === undefined) {
      return movie.first_air_date.substring(0, 4);
  }
  return movie.release_date.substring(0, 4);
}

export const getRuntime = (movie) => {
  if (movie.runtime === undefined) {
      return movie.episode_run_time[0];
  }
  return movie.runtime;
}

export const getTrailers = (media) => {
  return media.videos.results.filter((video) => video.type === "Trailer" && video.site === "YouTube");
}

export const getKeywords = (media) => {
  return media.keywords.keywords.map((keyword) => keyword.name).join(", ");
}

export const getCast = (media, num) => {
  return media.credits.cast.slice(0, num).map((actor) => actor.name).join(", ");
}

export const getCrew = (media, job) => {
  return media.credits.crew.filter((crew) => crew.job === job).map((crew) => crew.name).join(", ");
}