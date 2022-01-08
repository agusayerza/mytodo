import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import { defaultValue, ITodo } from '../types/todo';
import { cleanEntity, createEntitySlice, EntityState } from './utils';
import { BASE_URI } from '../config/constants';

const initialState: EntityState<ITodo> = {
  loading: false,
  entities: [],
  entity: defaultValue
};

const apiUrl = BASE_URI + '/todo';

export const getTodos = createAsyncThunk('todo/get_all',
async () => {
  const requestUrl = `${apiUrl}`;
  return axios.get<ITodo[]>(requestUrl);
});

export const getTodo = createAsyncThunk(
  'todo/get_one',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<ITodo>(requestUrl);
  }
);

export const createTodo = createAsyncThunk(
  'todo/create',
  async (entity: ITodo, thunkAPI) => {
    const result = await axios.post<ITodo>(apiUrl, cleanEntity(entity));
    thunkAPI.dispatch(getTodos());
    return result;
  }
);

export const updateTodo = createAsyncThunk(
  'todo/update',
  async (entity: ITodo, thunkAPI) => {
    const result = await axios.put<ITodo>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getTodos());
    return result;
  }
);

export const deleteTodo = createAsyncThunk(
  'todo/delete',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<ITodo>(requestUrl);
    thunkAPI.dispatch(getTodos());
    return result;
  }
);
export const TodoSlice = createEntitySlice({
  name: 'todo',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addCase(deleteTodo.fulfilled, state => {
        state.loading = false
      })
      .addMatcher(isFulfilled(getTodos), (state, action) => {
        return {
          ...state,
          loading: false,
          entities: action.payload.data,
        };
      })
      .addMatcher(isFulfilled(createTodo, updateTodo), (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addMatcher(isPending(getTodos, getTodo), state => {
        state.loading = true;
      });
  },
});

export const { reset } = TodoSlice.actions;

export default TodoSlice.reducer;
