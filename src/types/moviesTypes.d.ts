interface DefaultItem {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}
interface EpisodeItem {
  Title: string;
  Released: string;
  Episode: string;
  imdbRating: string;
  imdbID: string;
}
interface SearchResponse {
  Search?: DefaultItem[];
  Episodes?: EpisodeItem[];
  totalResults: string;
  Response: string;
  totalSeasons?: string;
}
