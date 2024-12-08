import api from "@/services/api_helper";

export const moviesService = {
  list: async (params: SearchParams): Promise<SearchResponse> => {
    if (params.type === "episode") {
      params = {
        ...params,
        t: params.s,
        type: undefined,
        s: undefined,
        Season: params.Season || 1,
        y: undefined
      };
    }

    const response = await api.get("", { params });

    return response.data;
  },

  detail: async (id?: string): Promise<MovieResponse> => {
    const params = {
      i: id
    };
    const response = await api.get("", { params });
    return response.data;
  }
};
