import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit';
import { defaultValue, ITodo } from '../types/todo';
import { createEntitySlice, EntityState } from './utils';
import { BASE_URI } from '../config/constants';
import {IRootState} from '../config/store'
import { getFolder } from './folder';
const initialState: EntityState<ITodo> = {
  loading: false,
  entities: [],
  entity: defaultValue
};

const apiUrl = BASE_URI + '/todo';

export const getTodos = createAsyncThunk('todo/get_all',
async(v, thunkAPI) => {
  const state = thunkAPI.getState() as IRootState;
  const requestUrl = `${apiUrl}/folder/${state.folder.entity.id}`;
  return axios.get<ITodo[]>(requestUrl);
});

export const getTodosForFolder = createAsyncThunk('todo/get_for_folder',
async (folderId: number) => {
  const requestUrl = `${apiUrl}/folder/${folderId}`;
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
    entity.folderId = (thunkAPI.getState() as IRootState).folder.entity.id
    console.log(entity)
    const result = await axios.post<ITodo>(apiUrl, entity);
    thunkAPI.dispatch(getTodos());
    return result;
  }
);

export const updateTodo = createAsyncThunk(
  'todo/update',
  async (entity: ITodo, thunkAPI) => {
    entity.folderId = (thunkAPI.getState() as IRootState).folder.entity.id
    console.log(entity)
    const result = await axios.put(`${apiUrl}/${entity.id}`, entity);
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
    const currentFolder = (thunkAPI.getState() as IRootState).folder.entity.id;
    if(currentFolder !== -1)
    thunkAPI.dispatch(getFolder(currentFolder));
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
      .addMatcher(isFulfilled(getTodos, getTodosForFolder), (state, action) => {
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
      .addMatcher(isPending(getTodos, getTodosForFolder, getTodo), state => {
        state.loading = true;
      });
  },
});

export const { reset } = TodoSlice.actions;

export default TodoSlice.reducer;
