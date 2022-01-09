import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import {IFolder, defaultValue} from "../types/folder"
import { cleanEntity, createEntitySlice, EntityState } from './utils';
import { BASE_URI } from '../config/constants';

const initialState: EntityState<IFolder> = {
  loading: false,
  entities: [],
  entity: defaultValue
};

const apiUrl = BASE_URI + '/folder';

export const getFolders = createAsyncThunk('folder/get_all',
async () => {
  const requestUrl = `${apiUrl}`;
  return axios.get<IFolder[]>(requestUrl);
});

export const getFolder = createAsyncThunk(
  'folder/get_one',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IFolder>(requestUrl);
  }
);

export const createFolder = createAsyncThunk(
  'folder/create',
  async (entity: IFolder, thunkAPI) => {
    console.log(entity)
    const result = await axios.post<IFolder>(apiUrl, {name: entity.name});
    thunkAPI.dispatch(getFolders());
    return result;
  }
);

export const updateFolder = createAsyncThunk(
  'folder/update',
  async (entity: IFolder, thunkAPI) => {
    console.log(entity)
    const result = await axios.put<IFolder>(`${apiUrl}/${entity.id}`, entity);
    thunkAPI.dispatch(getFolders());
    return result;
  }
);

export const deleteFolder = createAsyncThunk(
  'folder/delete',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<IFolder>(requestUrl);
    thunkAPI.dispatch(getFolders());
    return result;
  }
);
export const FolderSlice = createEntitySlice({
  name: 'folder',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getFolder.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addCase(deleteFolder.fulfilled, state => {
        state.loading = false
      })
      .addMatcher(isFulfilled(getFolders), (state, action) => {
        return {
          ...state,
          loading: false,
          entities: action.payload.data,
        };
      })
      .addMatcher(isFulfilled(createFolder, updateFolder), (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addMatcher(isPending(getFolders, getFolder), state => {
        state.loading = true;
      });
  },
});

export const { reset } = FolderSlice.actions;

export default FolderSlice.reducer;
