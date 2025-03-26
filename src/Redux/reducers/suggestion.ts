import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import smileGreenFace from "../../assets/img/overwhelmed.svg";
import boredomFace from "../../assets/img/disappointed.svg";

interface SuggestionItem {
  id: string;
  imgUrl: string;
  title: string;
  description: string;
  dateandTime: string;
  food: boolean;
  emoji_url: string;
}

const initialState: SuggestionItem[] = [
  {
    id: "11",
    imgUrl:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1494&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Desert Stargazing Night",
    description: "Night with neom",
    dateandTime: new Date().toDateString(),
    food: true,
    emoji_url: smileGreenFace,
  },
  {
    id: "12",
    imgUrl:
      "https://img.freepik.com/premium-photo/futuristic-fashion-show-with-neon-models-luminous-runway_1282444-120204.jpg",
    title: "Neom Fashion Show",
    description: "Book for the best fashion show",
    dateandTime: new Date().toDateString(),
    food: false,
    emoji_url: boredomFace,
  },
  {
    id: "13",
    imgUrl:
      "https://images.carandbike.com/cms/cms/articles/2023/2/3205780/Mahindra_BE_Rall_E_c3f86c3471.jpg",
    title: "Electric Vehicle Rally",
    description: "Join the rally for a better future",
    dateandTime: new Date().toDateString(),
    food: true,
    emoji_url: smileGreenFace,
  },
];

const suggestionSlice = createSlice({
  name: "suggestion",
  initialState,
  reducers: {
    removeSuggestionReducer: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { removeSuggestionReducer } = suggestionSlice.actions;
export default suggestionSlice.reducer;
