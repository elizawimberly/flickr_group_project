/******************************** IMPORTS ********************************/
// local files
import { normalizeArray } from "../component-resources/index";

/********************************* TYPES *********************************/
// photos
const PHOTOS_CREATE_SINGLE_PHOTO = "photos/CREATE_SINGLE_PHOTO";
const PHOTOS_READ_ALL_PHOTOS = "photos/READ_ALL_PHOTOS";
const PHOTOS_READ_ALL_PHOTOS_BY_USER = "photos/READ_ALL_PHOTOS_BY_USER";
const PHOTOS_READ_SINGLE_PHOTO_DETAILS = "photos/READ_SINGLE_PHOTO_DETAILS";
const PHOTOS_UPDATE_SINGLE_PHOTO = "photos/UPDATE_SINGLE_PHOTO";
const PHOTOS_DELETE_SINGLE_PHOTO = "photos/DELETE_SINGLE_PHOTO";
// tags
const PHOTOS_CREATE_SINGLE_TAG = "photos/CREATE_SINGLE_TAG";
const PHOTOS_DELETE_SINGLE_TAG = "photos/DELETE_SINGLE_TAG";
// comments
const PHOTOS_CREATE_SINGLE_COMMENT = "photos/CREATE_SINGLE_COMMENT";
const PHOTOS_DELETE_SINGLE_COMMENT = "photos/DELETE_SINGLE_COMMENT";

/**************************** ACTION CREATORS ****************************/
// photos
export const actionCreateSinglePhoto = (newPhoto) => ({
  type: PHOTOS_CREATE_SINGLE_PHOTO,
  payload: newPhoto,
});

export const actionReadAllPhotos = (allPhotos) => ({
  type: PHOTOS_READ_ALL_PHOTOS,
  payload: allPhotos,
});

export const actionReadAllPhotosByUser = (userPhotos) => ({
  type: PHOTOS_READ_ALL_PHOTOS_BY_USER,
  payload: userPhotos,
});

export const actionReadSinglePhotoDetails = (singlePhotoDetails) => ({
  type: PHOTOS_READ_SINGLE_PHOTO_DETAILS,
  payload: singlePhotoDetails,
});

export const actionUpdateSinglePhoto = (updatePhoto) => ({
  type: PHOTOS_UPDATE_SINGLE_PHOTO,
  payload: updatePhoto,
});

export const actionDeleteSinglePhoto = (photoId) => ({
  type: PHOTOS_DELETE_SINGLE_PHOTO,
  payload: photoId,
});

// tags
export const actionCreateSingleTag = (newTag) => ({
  type: PHOTOS_CREATE_SINGLE_TAG,
  payload: newTag,
});

export const actionDeleteSingleTag = (tagId) => ({
  type: PHOTOS_DELETE_SINGLE_TAG,
  payload: tagId,
});

// comments
export const actionCreateSingleComment = (newComment) => ({
  type: PHOTOS_CREATE_SINGLE_COMMENT,
  payload: newComment,
});

export const actionDeleteSingleComment = (commentId) => ({
  type: PHOTOS_DELETE_SINGLE_COMMENT,
  payload: commentId,
});

/***************************** THUNKS (API) ******************************/
// photos

export const thunkCreateSinglePhoto = (name, about, url, takenOn, privateVar, tags, albumId) => async (dispatch) => {
  if(!albumId){
    const response = await fetch(`/api/photos/`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        about,
        url,
        takenOn,
        private: privateVar,
        tags,
      }),
    });
    if (response.ok) {
      const newPhoto = await response.json();
      dispatch(actionCreateSinglePhoto(newPhoto));
      return newPhoto;
    }
  }
  const response = await fetch(`/api/photos/`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      about,
      url,
      takenOn,
      private: privateVar,
      tags,
      albumId
    }),
  });
  if (response.ok) {
    const newPhoto = await response.json();
    dispatch(actionCreateSinglePhoto(newPhoto));
    return newPhoto;
  }
};

export const thunkReadAllPhotos = () => async (dispatch) => {
  const response = await fetch(`/api/photos/`);
  if (response.ok) {
    const allPhotos = await response.json();
    dispatch(actionReadAllPhotos(allPhotos.Photos));
    return allPhotos;
  }
};

export const thunkReadAllPhotosByUser = () => async (dispatch) => {
  const response = await fetch(`/api/photos/current`);
  if (response.ok) {
    const userPhotos = await response.json();
    dispatch(actionReadAllPhotosByUser(userPhotos.Photos));
    return userPhotos;
  }
};

export const thunkReadSinglePhotoDetails = (photoId) => async (dispatch) => {
  const response = await fetch(`/api/photos/${photoId}`);
  if (response.ok) {
    const singlePhotoDetails = await response.json();
    dispatch(actionReadSinglePhotoDetails(singlePhotoDetails));
    return singlePhotoDetails;
  }
};

export const thunkUpdateSinglePhoto =
  (photoId, name, about, url, takenOn, privateVar, albumId) => async (dispatch) => {
    const response = await fetch(`/api/photos/${photoId}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        about,
        url,
        takenOn,
        private: privateVar,
        albumId
      }),
    });
    if (response.ok) {
      const updatePhoto = await response.json();
      dispatch(actionUpdateSinglePhoto(updatePhoto));
      return updatePhoto;
    }
  };

export const thunkDeleteSinglePhoto = (photoId) => async (dispatch) => {
  const response = await fetch(`/api/photos/${photoId}`, {
    method: "delete",
  });
  if (response.ok) {
    dispatch(actionDeleteSinglePhoto(photoId));
    return;
  }
};

// tags
export const thunkCreateSingleTag =
  (photoId, createTagData) => async (dispatch) => {
    const response = await fetch(`/api/photos/${photoId}/tags`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({tags: createTagData}),
    });
    if (response.ok) {
      const newTags = await response.json();
      dispatch(actionCreateSingleTag(newTags.Tags));
      return newTags;
    }
  };

export const thunkDeleteSingleTag = (photoId, tagId) => async (dispatch) => {
  const response = await fetch(`/api/photos/${photoId}/tags/${tagId}`, {
    method: "delete",
  });
  if (response.ok) {
    dispatch(actionDeleteSingleTag(tagId));
    return;
  }
};

// comments
export const thunkCreateSingleComment =
  (photoId, createCommentData) => async (dispatch) => {
    const response = await fetch(`/api/photos/${photoId}/comments`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({comment: createCommentData}),
    });
    if (response.ok) {
      const newComment = await response.json();
      dispatch(actionCreateSingleComment(newComment));
      return newComment;
    }
  };

export const thunkDeleteSingleComment =
  (photoId, commentId) => async (dispatch) => {
    const response = await fetch(
      `/api/photos/${photoId}/comments/${commentId}`,
      {
        method: "delete",
      }
    );
    if (response.ok) {
      dispatch(actionDeleteSingleComment(commentId));
      return;
    }
  };

/***************************** STATE SHAPE *******************************/
const initialState = {
  allPhotos: {},
  userPhotos: {},
  singlePhotoDetails: {
    Comments: {},
    Tags: {},
  },
};

/******************************* REDUCER *********************************/
const photosReducer = (state = initialState, action) => {

  let newState = { ...state };

  switch (action.type) {
    // photos
    case PHOTOS_CREATE_SINGLE_PHOTO:
      newState.allPhotos = { ...state.allPhotos };
      // add new photo to normalized object of all photos
      newState.allPhotos[action.payload.id] = { ...action.payload };
      newState.userPhotos = { ...state.userPhotos };
      newState.singlePhotoDetails = { ...action.payload };
      // deep copy nested structures
      newState.singlePhotoDetails.Comments = normalizeArray(
        action.payload.Comments
      );
      newState.singlePhotoDetails.Tags = normalizeArray(action.payload.Tags);
      return newState;

    case PHOTOS_READ_ALL_PHOTOS:
      newState.allPhotos = { ...state.allPhotos };
      newState.allPhotos = normalizeArray(action.payload);
      newState.userPhotos = { ...state.userPhotos };
      newState.singlePhotoDetails = { ...state.singlePhotoDetails };
      // deep copy nested structures: singlePhotoDetails.Comments
      let readAllPhotos_RevertCommentsArr = Object.values(
        newState.singlePhotoDetails.Comments
      );
      let readAllPhotos_NewCopyCommentsObj = normalizeArray(
        readAllPhotos_RevertCommentsArr
      );
      newState.singlePhotoDetails.Comments = readAllPhotos_NewCopyCommentsObj;
      // deep copy nested structures: singlePhotoDetails.Comments
      let readAllPhotos_RevertTagsArr = Object.values(
        newState.singlePhotoDetails.Tags
      );
      let readAllPhotos_NewCopyTagsObj = normalizeArray(
        readAllPhotos_RevertTagsArr
      );
      newState.singlePhotoDetails.Tags = readAllPhotos_NewCopyTagsObj;
      return newState;

    case PHOTOS_READ_ALL_PHOTOS_BY_USER:
      newState.allPhotos = { ...state.allPhotos };
      newState.userPhotos = { ...state.userPhotos };
      newState.userPhotos = normalizeArray(action.payload);
      newState.singlePhotoDetails = { ...state.singlePhotoDetails };
      // deep copy nested structures: singlePhotoDetails.Comments
      let readAllPhotosByUser_RevertCommentsArr = Object.values(
        newState.singlePhotoDetails.Comments
      );
      let readAllPhotosByUser_NewCopyCommentsObj = normalizeArray(
        readAllPhotosByUser_RevertCommentsArr
      );
      newState.singlePhotoDetails.Comments =
        readAllPhotosByUser_NewCopyCommentsObj;
      // deep copy nested structures: singlePhotoDetails.Comments
      let readAllPhotosByUser_RevertTagsArr = Object.values(
        newState.singlePhotoDetails.Tags
      );
      let readAllPhotosByUser_NewCopyTagsObj = normalizeArray(
        readAllPhotosByUser_RevertTagsArr
      );
      newState.singlePhotoDetails.Tags = readAllPhotosByUser_NewCopyTagsObj;
      return newState;

    case PHOTOS_READ_SINGLE_PHOTO_DETAILS:
      newState.allPhotos = { ...state.allPhotos };
      newState.userPhotos = { ...state.userPhotos };
      newState.singlePhotoDetails = { ...action.payload };
      // deep copy nested structures
      newState.singlePhotoDetails.Comments = normalizeArray(
        action.payload.Comments
      );
      newState.singlePhotoDetails.Tags = normalizeArray(action.payload.Tags);
      return newState;

    case PHOTOS_UPDATE_SINGLE_PHOTO:
      newState.allPhotos = { ...state.allPhotos };
      newState.userPhotos = { ...state.userPhotos };
      newState.singlePhotoDetails = { ...action.payload };
      // deep copy nested structures
      newState.singlePhotoDetails.Comments = normalizeArray(
        action.payload.Comments
      );
      newState.singlePhotoDetails.Tags = normalizeArray(action.payload.Tags);
      return newState;

    case PHOTOS_DELETE_SINGLE_PHOTO:
      newState.allPhotos = { ...state.allPhotos };
      // remove photo
      delete newState.allPhotos[action.payload.id];
      newState.userPhotos = { ...state.userPhotos };
      newState.singlePhotoDetails = { ...state.singlePhotoDetails };
      // deep copy nested structures: singlePhotoDetails.Comments
      let deleteSinglePhoto_RevertCommentsArr = Object.values(
        newState.singlePhotoDetails.Comments
      );
      let deleteSinglePhoto_NewCopyCommentsObj = normalizeArray(
        deleteSinglePhoto_RevertCommentsArr
      );
      newState.singlePhotoDetails.Comments =
        deleteSinglePhoto_NewCopyCommentsObj;
      // deep copy nested structures: singlePhotoDetails.Comments
      let deleteSinglePhoto_RevertTagsArr = Object.values(
        newState.singlePhotoDetails.Tags
      );
      let deleteSinglePhoto_NewCopyTagsObj = normalizeArray(
        deleteSinglePhoto_RevertTagsArr
      );
      newState.singlePhotoDetails.Tags = deleteSinglePhoto_NewCopyTagsObj;
      return newState;

    // tags
    case PHOTOS_CREATE_SINGLE_TAG:
      newState.allPhotos = { ...state.allPhotos };
      newState.userPhotos = { ...state.userPhotos };
      newState.singlePhotoDetails = { ...state.singlePhotoDetails };
      // deep copy nested structure: singlePhotoDetails.Comments
      let createSingleTag_RevertCommentsArr = Object.values(
        newState.singlePhotoDetails.Comments
      );
      let createSingleTag_NewCopyCommentsObj = normalizeArray(
        createSingleTag_RevertCommentsArr
      );
      newState.singlePhotoDetails.Comments = createSingleTag_NewCopyCommentsObj;
      // deep copy nested structures: singlePhotoDetails.Tags
      let createSingleTag_RevertTagsArr = Object.values(
        newState.singlePhotoDetails.Tags
      );
      let createSingleTag_NewCopyTagsObj = normalizeArray(
        createSingleTag_RevertTagsArr
      );
      newState.singlePhotoDetails.Tags = createSingleTag_NewCopyTagsObj;
      // add new tag
      action.payload.forEach(tag => {
        newState.singlePhotoDetails.Tags[tag.id] = tag
      });
      return newState;

    case PHOTOS_DELETE_SINGLE_TAG:
      newState.allPhotos = { ...state.allPhotos };
      newState.userPhotos = { ...state.userPhotos };
      newState.singlePhotoDetails = { ...state.singlePhotoDetails };
      // deep copy nested structure: singlePhotoDetails.Comments
      let deleteSingleTag_RevertCommentsArr = Object.values(
        newState.singlePhotoDetails.Comments
      );
      let deleteSingleTag_NewCopyCommentsObj = normalizeArray(
        deleteSingleTag_RevertCommentsArr
      );
      newState.singlePhotoDetails.Comments = deleteSingleTag_NewCopyCommentsObj;
      // deep copy nested structures: singlePhotoDetails.Tags
      let deleteSingleTag_RevertTagsArr = Object.values(
        newState.singlePhotoDetails.Tags
      );
      let deleteSingleTag_NewCopyTagsObj = normalizeArray(
        deleteSingleTag_RevertTagsArr
      );
      newState.singlePhotoDetails.Tags = deleteSingleTag_NewCopyTagsObj;
      // remove tag
      delete newState.singlePhotoDetails.Tags[action.payload];
      return newState;

    // comments
    case PHOTOS_CREATE_SINGLE_COMMENT:
      newState.allPhotos = { ...state.allPhotos };
      newState.userPhotos = { ...state.userPhotos };
      newState.singlePhotoDetails = { ...state.singlePhotoDetails };
      // deep copy nested structures: singlePhotoDetails.Comments
      let createSingleComment_RevertCommentsArr = Object.values(
        newState.singlePhotoDetails.Comments
      );
      let createSingleComment_NewCopyCommentsObj = normalizeArray(
        createSingleComment_RevertCommentsArr
      );
      newState.singlePhotoDetails.Comments =
        createSingleComment_NewCopyCommentsObj;
      // add new comment
      newState.singlePhotoDetails.Comments[action.payload.id] = {
        ...action.payload,
      };
      // deep copy nested structure: singlePhotoDetails.Tags
      let createSingleComment_RevertTagsArr = Object.values(
        newState.singlePhotoDetails.Tags
      );
      let createSingleComment_NewCopyTagsObj = normalizeArray(
        createSingleComment_RevertTagsArr
      );
      newState.singlePhotoDetails.Tags = createSingleComment_NewCopyTagsObj;
      return newState;

    case PHOTOS_DELETE_SINGLE_COMMENT:
      newState.allPhotos = { ...state.allPhotos };
      newState.userPhotos = { ...state.userPhotos };
      newState.singlePhotoDetails = { ...state.singlePhotoDetails };
      // deep copy nested structure: singlePhotoDetails.Comments
      let deleteSingleComment_RevertCommentsArr = Object.values(
        newState.singlePhotoDetails.Comments
      );
      let deleteSingleComment_NewCopyCommentsObj = normalizeArray(
        deleteSingleComment_RevertCommentsArr
      );
      // delete deleteSingleComment_NewCopyCommentsObj[action.payload.id];
      newState.singlePhotoDetails.Comments =
      deleteSingleComment_NewCopyCommentsObj;
      // remove comment
      delete newState.singlePhotoDetails.Comments[action.payload];
      // deep copy nested structures: singlePhotoDetails.Tags
      let deleteSingleComment_RevertTagsArr = Object.values(
        newState.singlePhotoDetails.Tags
      );
      let deleteSingleComment_NewCopyTagsObj = normalizeArray(
        deleteSingleComment_RevertTagsArr
      );
      newState.singlePhotoDetails.Tags = deleteSingleComment_NewCopyTagsObj;
      return newState;

    default:
      return state;
  }
};

/******************************** EXPORTS ********************************/
export default photosReducer;
