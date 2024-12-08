import "./Filter.scss";
import { Input, Select } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setFilter } from "@/redux/slices/filterSlice";
import { memo, useCallback } from "react";

import { debounce } from "lodash";
import { generateYears } from "@/utils/generateYear";
import { generateSeasonOptions } from "@/utils/generateSeasons";

interface IFilter {
  totalSeason?: string;
}
const Filter: React.FC<IFilter> = ({ totalSeason }) => {
  const filter = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();

  const yearOptions = generateYears(1970, 2025);
  const seasonOptions = totalSeason ? generateSeasonOptions(totalSeason) : [];

  const itemTypes = [
    { value: "movie", label: "Movie" },
    { value: "series", label: "Series" },
    { value: "episode", label: "Episode" }
  ];

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      dispatch(
        setFilter({
          s: term,
          type: undefined,
          y: undefined,
          page: undefined,
          Season: undefined
        })
      );
    }, 300),
    []
  );
  const handleSearch = (term: string) => {
    debouncedSearch(term);
  };

  return (
    <div className="filterContainer">
      <Input
        size="large"
        placeholder="Search..."
        className="filterInput"
        defaultValue={"Pokemon"}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Select
        size="large"
        placeholder="Type"
        className="filterSelect"
        allowClear
        value={filter.type || undefined}
        onChange={(res) => {
          dispatch(
            setFilter({
              type: res,
              page: undefined,
              y: undefined,
              Season: undefined
            })
          );
        }}
        options={itemTypes}
      />

      {filter.type !== "episode" ? (
        <Select
          size="large"
          placeholder="Year"
          className="filterSelect"
          allowClear
          options={yearOptions}
          value={filter.y || undefined}
          showSearch
          disabled={filter.type === "episode"}
          onChange={(res) => {
            dispatch(
              setFilter({
                y: res,
                page: undefined
              })
            );
          }}
        />
      ) : (
        <Select
          size="large"
          placeholder="Season"
          className="filterSelect"
          allowClear
          options={seasonOptions}
          value={
            filter.Season
              ? `Season ${filter.Season}`
              : totalSeason
              ? `Season 1`
              : undefined
          }
          showSearch
          onChange={(res) => {
            dispatch(
              setFilter({
                Season: Number(res),
                page: undefined
              })
            );
          }}
        />
      )}
    </div>
  );
};

export default memo(Filter);
