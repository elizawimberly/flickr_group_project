/******************************** IMPORTS ********************************/
// local files
import { normalizeArray } from "../component-resources/index";

/********************************* TYPES *********************************/
const ALBUMS_CREATE_SINGLE_ALBUM = "albums/CREATE_SINGLE_ALBUM";
const ALBUMS_READ_ALL_ALBUMS = "albums/READ_ALL_ALBUMS";
const ALBUMS_READ_SINGLE_ALBUM_DETAILS =
  "albums/ALBUMS_READ_SINGLE_ALBUM_DETAILS";
const ALBUMS_UPDATE_SINGLE_ALBUM = "albums/UPDATE_SINGLE_ALBUM";
const ALBUMS_DELETE_SINGLE_ALBUM = "albums/DELETE_SINGLE_ALBUM";

/**************************** ACTION CREATORS ****************************/
export const actionCreateSingleAlbum = (newAlbum) => ({
  type: ALBUMS_CREATE_SINGLE_ALBUM,
  payload: newAlbum,
});

export const actionReadAllAlbums = (allAlbums) => ({
  type: ALBUMS_READ_ALL_ALBUMS,
  payload: allAlbums,
});

export const actionReadSingleAlbumDetails = (singleAlbumDetails) => ({
  type: ALBUMS_READ_SINGLE_ALBUM_DETAILS,
  payload: singleAlbumDetails,
});

export const actionUpdateSingleAlbum = (updateAlbum) => ({
  type: ALBUMS_UPDATE_SINGLE_ALBUM,
  payload: updateAlbum,
});

export const actionDeleteSingleAlbum = (albumId) => ({
  type: ALBUMS_DELETE_SINGLE_ALBUM,
  payload: albumId,
});

/***************************** THUNKS (API) ******************************/


export const thunkCreateSingleAlbum = (name, about, photos = []) => async (dispatch) => {

    const response = await fetch(`/api/albums/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
        photos,
      }),
    });
    if (response.ok) {
      const newAlbum = await response.json();
      dispatch(actionCreateSingleAlbum(newAlbum));
      return newAlbum;
    }
  };

export const thunkReadAllAlbums = () => async (dispatch) => {
  const response = await fetch(`/api/albums/`);
  if (response.ok) {
    const allAlbums = await response.json();
    dispatch(actionReadAllAlbums(allAlbums.Albums));
    return allAlbums;
  }
};

export const thunkReadSingleAlbumDetails = (albumId) => async (dispatch) => {
  const response = await fetch(`/api/albums/${albumId}`);
  if (response.ok) {
    const singleAlbumDetails = await response.json();
    dispatch(actionReadSingleAlbumDetails(singleAlbumDetails));
    return singleAlbumDetails;
  }
};

export const thunkUpdateSingleAlbum =
  (name, about, photos, albumId) => async (dispatch) => {
    const response = await fetch(`/api/albums/${albumId}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        about,
        photos,
      }),
    });
    if (response.ok) {
      const updateAlbum = await response.json();
      dispatch(actionUpdateSingleAlbum(updateAlbum));
      return updateAlbum;
    }
  };

export const thunkDeleteSingleAlbum = (albumId) => async (dispatch) => {
  const response = await fetch(`/api/albums/${albumId}`, {
    method: "delete",
  });
  if (response.ok) {
    dispatch(actionDeleteSingleAlbum(albumId));
    return;
  }
};

/***************************** STATE SHAPE *******************************/
const initialState = {
  allAlbums: {},
  singleAlbumDetails: {
    Photos: {},
  },
};

/******************************* REDUCER *********************************/
const albumsReducer = (state = initialState, action) => {
  let newState = { ...state };

  switch (action.type) {
    case ALBUMS_CREATE_SINGLE_ALBUM:
      newState.allAlbums = { ...state.allAlbums };
      // add new photo to normalized object of all photos
      newState.allAlbums[action.payload.id] = { ...action.payload };
      newState.singleAlbumDetails = { ...action.payload };
      // deep copy nested structures: singleAlbumDetails.Photos
      newState.singleAlbumDetails.Photos = normalizeArray(
        action.payload.Photos
      );
      return newState;

    case ALBUMS_READ_ALL_ALBUMS:
      newState.allAlbums = { ...state.allAlbums };
      newState.allAlbums = normalizeArray(action.payload);
      newState.singleAlbumDetails = { ...state.singleAlbumDetails };
      // deep copy nested structures: singleAlbumDetails.Photos
      let readAllAlbums_RevertPhotosArr = Object.values(
        newState.singleAlbumDetails.Photos
      );
      let readAllAlbums_NewCopyPhotosObj = normalizeArray(
        readAllAlbums_RevertPhotosArr
      );
      newState.singleAlbumDetails.Photos = readAllAlbums_NewCopyPhotosObj;
      return newState;

    case ALBUMS_READ_SINGLE_ALBUM_DETAILS:
      newState.allAlbums = { ...state.allAlbums };
      newState.singleAlbumDetails = { ...action.payload };
      // deep copy nested structures: singleAlbumDetails.Photos
      newState.singleAlbumDetails.Photos = normalizeArray(
        action.payload.Photos
      );
      return newState;

    case ALBUMS_UPDATE_SINGLE_ALBUM:
      newState.allAlbums = { ...state.allAlbums };
      // add new photo to normalized object of all photos
      newState.allAlbums[action.payload.id] = { ...action.payload };
      newState.singleAlbumDetails = { ...action.payload };
      // deep copy nested structures: singleAlbumDetails.Photos
      newState.singleAlbumDetails.Photos = normalizeArray(
        action.payload.Photos
      );
      return newState;

    case ALBUMS_DELETE_SINGLE_ALBUM:
      newState.allAlbums = { ...state.allAlbums };
      // remove album
      delete newState.allAlbums[action.payload.id];
      newState.singleAlbumDetails = { ...state.singleAlbumDetails };
      // deep copy nested structures: singleAlbumDetails.Photos
      let deleteSingleAlbum_RevertPhotosArr = Object.values(
        newState.singleAlbumDetails.Photos
      );
      let deleteSingleAlbum_NewCopyPhotosObj = normalizeArray(
        deleteSingleAlbum_RevertPhotosArr
      );
      newState.singleAlbumDetails.Photos = deleteSingleAlbum_NewCopyPhotosObj;
      return newState;

    default:
      return state;
  }
};

/******************************** EXPORTS ********************************/
export default albumsReducer;
