import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Defined as undefined to prevent being sent as a query string in API requests
const initialState: SearchParams = {
  s: "Pokemon",
  y: undefined,
  type: undefined,
  page: undefined,
  t: undefined
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<Partial<SearchParams>>) {
      return { ...state, ...action.payload };
    }
  }
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
