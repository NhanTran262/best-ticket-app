import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {showAllTimeByEventId} from "../api/TimeApi.js";


const initialState = {
  values: JSON.parse(localStorage.getItem("times")),
  value: null,
  loading: false,
  success: false,
  error: null,
};


export const getTimeByEventId = createAsyncThunk(
  "tickets/showTimeByEventId",
  async (eventId) => {
    const response = await showAllTimeByEventId(eventId);
    return response.data;
  }
);
const handlePending = (state) => {
  state.success = false;
  state.loading = true;
  state.error = false;
};

const handleRejected = (state, action) => {
  state.success = false;
  state.loading = false;
  state.error = action.error;
};

const handleFulfilled = (state, action) => {
  state.success = true;
  state.loading = false;
  state.values = action.payload;
  state.value = action.payload;
  localStorage.setItem("times", JSON.stringify(action.payload));
  state.error = false;
};

export const TimeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTimeByEventId.pending, handlePending)
      .addCase(getTimeByEventId.rejected, handleRejected)
      .addCase(getTimeByEventId.fulfilled, handleFulfilled)
  }
});
export const {setLoading, setError, setSuccess} = TimeSlice.actions;

export const selectShowTimeByEventId = (state) => state.time.values;

export default TimeSlice.reducer;
