import { configureStore } from '@reduxjs/toolkit';
import GetFixturesSlice from './TeamSportsData/GetFixturesSlice';
import MarketsSlice from './Market/MarketsSlice';
import LegsSlice from './Legs/LegsSlice';
import BetBuilderBetsSlice from './BetBuilderBets/BetBuilderBetsSlice';
import DateTransfer_ from './DateTransfer/DateTransfer_';
const store = configureStore({
  reducer: {
    TeamLeaguesData: GetFixturesSlice,
    Market: MarketsSlice,
    Legs: LegsSlice,
    BetBuilder: BetBuilderBetsSlice,
    FilterDate:DateTransfer_,
  },
});

export default store;
