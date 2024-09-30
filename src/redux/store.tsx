import { configureStore } from "@reduxjs/toolkit";

import ThemeReducer from "./reducer/ThemeReduce";
import UserReducer from "./reducer/UserReduce";
import RefreshReducer from "./reducer/RefreshReduce";
import MenuReducer from "./reducer/MenuReduce";
import AlertReducer from "./reducer/alertReducer";
import NoticeReducer from "./reducer/noticeReducer";
import PlayerReducer from "./reducer/playerReducer";
import ChangePageReducer from "./reducer/changPageReduce";
import ScrollReducer from "./reducer/DetailScrollReduce";
import MenuAdminReducer from './reducer/MenuAdminReduce'

const store = configureStore({
    reducer: {
        theme: ThemeReducer.reducer,
        user: UserReducer.reducer,
        menu: MenuReducer.reducer,
        menuadmin: MenuAdminReducer.reducer,
        refresh: RefreshReducer.reducer,
        alert: AlertReducer.reducer,
        notice: NoticeReducer.reducer,
        player: PlayerReducer.reducer,
        changePage: ChangePageReducer.reducer,
        scroll: ScrollReducer.reducer,
    }
})

export default store