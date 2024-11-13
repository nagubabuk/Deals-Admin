// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface User {
//     id: string;
//     name: string;
//     email: string;
//     avatar:string;
// }

// interface AuthState {
//     user: User | null;
//     isAuthenticated: boolean;
// }

// const initialState: AuthState = {
//     user: null,
//     isAuthenticated: false,
// };

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         setUser: (state, action: PayloadAction<User>) => {
//             state.user = action.payload;
//             state.isAuthenticated = true;
//         },
//         clearUser: (state) => {
//             state.user = null;
//             state.isAuthenticated = false;
//         },
//     },
// });

// export const { setUser, clearUser } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../store';
import api from '../../services/api';

interface User {
    id?: string;
    username: string;
    email: string;
    avatar?: string;
    role: 'admin' | 'merchant';
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}
interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            state.error = null;
        },
        clearUser: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setUser, clearUser, setLoading, setError } = authSlice.actions;

export const login = (username: string, password: string): AppThunk => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await api.post('/auth/login', { username, password });
        const { user, token } = response.data;
        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("access-token", token)
        dispatch(setUser({ user, token }));
    } catch (error) {
        dispatch(setError('Login failed'));
    } finally {
        dispatch(setLoading(false));
    }
};

export const logout = (): AppThunk => (dispatch) => {
    localStorage.removeItem('user');
    dispatch(clearUser());
};

// export const signup = (name: string, email: string, password: string): AppThunk => async (dispatch) => {
//     dispatch(setLoading(true));
//     try {
//         const response = await api.post('/signup', { name, email, password });
//         dispatch(setUser(response.data));
//         localStorage.setItem('user', JSON.stringify(response.data));
//     } catch (error) {
//         dispatch(setError('Signup failed'));
//     } finally {
//         dispatch(setLoading(false));
//     }
// };
export const signup = (username: string, email: string, password: string, role: 'admin' | 'merchant'): AppThunk => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await api.post('/auth/signup', { username, email, password, role });
        const { user, token } = response.data;
        dispatch(setUser({ user, token }));
    } catch (error) {
        dispatch(setError('Signup failed'));
    } finally {
        dispatch(setLoading(false));
    }
};
export const checkAuthStatus = (): AppThunk => (dispatch) => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        console.log("storedUser", storedUser)
        dispatch(setUser(JSON.parse(storedUser)));
    }
};

export default authSlice.reducer;