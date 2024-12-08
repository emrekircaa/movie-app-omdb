import "./DetailPage.scss";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Placeholder from "@/assets/placeholder.webp";
import { Spin } from "antd";
import { Container } from "@/components";
import { moviesService } from "@/services/movies.service";

const DetailPage: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data: movie, isLoading } = useQuery({
    queryKey: ["moviesId", params?.id],
    queryFn: () => moviesService.detail(params?.id),
    enabled: !!params?.id
  });

  if (isLoading)
    return (
      <Container>
        <div className="loading">
          <Spin size="large" />
        </div>
      </Container>
    );

  if (!movie || movie.Response === "False")
    return (
      <Container>
        <div className="error">Movie not found</div>
      </Container>
    );

  return (
    <Container>
      <button className="backButton" onClick={() => navigate("/")}>
        <ArrowLeft size={22} />
      </button>
      <div className="detailPage">
        <div className="posterContainer">
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="poster"
            onError={(e) => {
              e.currentTarget.src = Placeholder;
            }}
          />
        </div>
        <div className="infoContainer">
          <h1 className="title">{movie.Title}</h1>
          <div className="metadata">
            <span>{movie.Year}</span> • <span>{movie.Rated}</span> •{" "}
            <span>{movie.Runtime}</span>
          </div>
          <div className="genre">{movie.Genre}</div>
          <p className="plot">{movie.Plot}</p>
          <div className="crew">
            <p>
              <strong>Director:</strong> {movie.Director}
            </p>
            <p>
              <strong>Writers:</strong> {movie.Writer}
            </p>
            <p>
              <strong>Stars:</strong> {movie.Actors}
            </p>
          </div>
          <div className="ratings">
            <h3>Ratings</h3>
            {movie.Ratings.map((rating, index) => (
              <div key={index} className="rating">
                <span>{rating.Source}:</span> <span>{rating.Value}</span>
              </div>
            ))}
          </div>
          <div className="additionalInfo">
            <p>
              <strong>Box Office:</strong> {movie.BoxOffice}
            </p>
            <p>
              <strong>Awards:</strong> {movie.Awards}
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DetailPage;
