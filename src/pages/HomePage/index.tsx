import { Filter, MovieTable, Container } from "@/components";
import { useAppSelector } from "@/redux/hook";
import { moviesService } from "@/services/movies.service";
import { useQuery } from "@tanstack/react-query";

const HomePage: React.FC = () => {
  const filter = useAppSelector((state) => state.filter);

  const { data, isLoading } = useQuery({
    queryKey: ["movies", filter],
    enabled: filter.s !== "",
    queryFn: () => moviesService.list({ ...filter }),
    select: (data) => ({
      items: data.Search || data.Episodes,
      totalCount: data.totalResults || data.Episodes?.length?.toString(),
      totalSeason: data.totalSeasons
    })
  });

  return (
    <Container>
      <Filter totalSeason={data?.totalSeason} />
      <MovieTable
        data={data?.items || []}
        totalCount={data?.totalCount || "0"}
        loading={isLoading}
      />
    </Container>
  );
};
export default HomePage;
