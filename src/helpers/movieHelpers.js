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
  // console.log(media.videos.results.filter((video) => video.type === "Trailer" &&  video.site === "YouTube"));
  return media.videos.results.filter((video) => video.type === "Trailer" && video.site === "YouTube");
}