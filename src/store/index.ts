// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';
// import salesReducer from './slices/salesSlice';

// export const store = configureStore({
//     reducer: {
//         auth: authReducer,
//         sales: salesReducer,
//     },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import salesReducer from './slices/salesSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        sales: salesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;