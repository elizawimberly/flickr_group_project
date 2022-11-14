/******************************** IMPORTS ********************************/
// local files
import { normalizeArray } from "../component-resources/index";


/********************************* TYPES *********************************/
// photos
const PHOTOS_CREATE_SINGLE_PHOTO = 'photos/CREATE_SINGLE_PHOTO';
const PHOTOS_READ_ALL_PHOTOS = 'photos/READ_ALL_PHOTOS';
const PHOTOS_READ_ALL_PHOTOS_BY_USER = 'photos/READ_ALL_PHOTOS_BY_USER';
const PHOTOS_READ_SINGLE_PHOTO_DETAILS = 'photos/READ_SINGLE_PHOTO_DETAILS';
const PHOTOS_UPDATE_SINGLE_PHOTO = 'photos/UPDATE_SINGLE_PHOTO';
const PHOTOS_DELETE_SINGLE_PHOTO = 'photos/DELETE_SINGLE_PHOTO';
// tags
const PHOTOS_CREATE_SINGLE_TAG = 'photos/CREATE_SINGLE_TAG';
const PHOTOS_DELETE_SINGLE_TAG = 'photos/DELETE_SINGLE_TAG';
// comments
const PHOTOS_CREATE_SINGLE_COMMENT = 'photos/CREATE_SINGLE_COMMENT';
const PHOTOS_DELETE_SINGLE_COMMENT = 'photos/DELETE_SINGLE_COMMENT';


/**************************** ACTION CREATORS ****************************/
// photos
export const actionCreateSinglePhoto = (newPhoto) => ({
    type: PHOTOS_CREATE_SINGLE_PHOTO,
    payload: newPhoto
});

export const actionReadAllPhotos = (photos) => ({
    type: PHOTOS_READ_ALL_PHOTOS,
    payload: photos
});

export const actionReadAllPhotosByUser = (userPhotos) => ({
    type: PHOTOS_READ_ALL_PHOTOS,
    payload: userPhotos
});

export const actionReadSinglePhotoDetails = (singlePhotoDetails) => ({
    type: PHOTOS_READ_SINGLE_PHOTO_DETAILS,
    payload: singlePhotoDetails
});

export const actionUpdateSinglePhoto = (updatePhoto) => ({
    type: PHOTOS_UPDATE_SINGLE_PHOTO,
    payload: updatePhoto
});

export const actionDeleteSinglePhoto = (photoId) => ({
    type: PHOTOS_DELETE_SINGLE_PHOTO,
    payload: photoId
});

// tags
export const actionCreateSingleTag = (newTag) => ({
    type: PHOTOS_CREATE_SINGLE_TAG,
    payload: newTag
});

export const actionDeleteSingleTag = (tagId) => ({
    type: PHOTOS_DELETE_SINGLE_TAG,
    payload: tagId
});

// comments
export const actionCreateSingleComment = (newComment) => ({
    type: PHOTOS_CREATE_SINGLE_COMMENT,
    payload: newComment
});

export const actionDeleteSingleComment = (commentId) => ({
    type: PHOTOS_DELETE_SINGLE_COMMENT,
    payload: commentId
});


/***************************** THUNKS (API) ******************************/
// photos
export const thunkCreateSinglePhoto = (createPhotoData) => async (dispatch) => {
    const response = await fetch(`/api/photos`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json'} ,
        body: JSON.stringify(createPhotoData)
    });
    if (response.ok) {
        const newPhoto = await response.json();
        dispatch(actionCreateSinglePhoto(newPhoto));
        return newPhoto;
    }
}

export const thunkReadAllPhotos = () => async (dispatch) => {
    const response = await fetch(`/api/photos`);
    if (response.ok) {
        const photos = await response.json();
        dispatch(actionReadAllPhotos(photos.Photos))
        return photos
    }
}

export const thunkReadAllPhotosByUser = () => async (dispatch) => {
    const response = await fetch(`/api/photos/current`);
    if (response.ok) {
        const userPhotos = await response.json();
        dispatch(actionReadAllPhotosByUser(userPhotos.Photos))
        return userPhotos
    }
}

export const thunkReadSinglePhotoDetails = (photoId) => async (dispatch) => {
    const response = await fetch(`/api/photos/${photoId}`);
    if (response.ok) {
        const singlePhotoDetails = await response.json();
        dispatch(actionReadSinglePhotoDetails(singlePhotoDetails))
        return singlePhotoDetails;
    }
}

export const thunkUpdateSinglePhoto = (photoId, updatePhotoData) => async (dispatch) => {
    const response = await fetch(`/api/photos/${photoId}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatePhotoData)
    });
    if (response.ok) {
        const updatePhoto = await response.json()
        dispatch(actionUpdateSinglePhoto(updatePhoto))
        return updatePhoto;
    }
}

export const thunkDeleteSinglePhoto = (photoId) => async (dispatch) => {
    const response = await csrfFetch(`/api/photos/${photoId}`, {
        method: 'delete',
    });
    if (response.ok) {
        dispatch(actionDeleteSingleSpot(photoId))
        return
    }
}

// tags
export const thunkCreateSingleTag = (photoId, createTagData) => async (dispatch) => {
    const response = await fetch(`/api/photos/${photoId}/tags`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json'} ,
        body: JSON.stringify(createTagData)
    });
    if (response.ok) {
        const newTag = await response.json();
        dispatch(actionCreateSinglePhoto(newTag.Tags));
        return newTag;
    }
}

export const thunkDeleteSingleTag = (photoId, tagId) => async (dispatch) => {
    const response = await fetch(`/api/photos/${photoId}/tags/${tagId}`, {
        method: 'delete',
    });
    if (response.ok) {
        dispatch(actionDeleteSingleTag(tagId))
        return
    }
}

// comments
export const thunkCreateSingleComment = (photoId, createCommentData) => async (dispatch) => {
    const response = await fetch(`/api/photos/${photoId}/comments`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json'} ,
        body: JSON.stringify(createCommentData)
    });
    if (response.ok) {
        const newComment = await response.json();
        dispatch(actionCreateSinglePhoto(newComment));
        return newComment;
    }
}

export const thunkDeleteSingleComment = (photoId, commentId) => async (dispatch) => {
    const response = await fetch(`/api/photos/${photoId}/comments/${commentId}`, {
        method: 'delete',
    });
    if (response.ok) {
        dispatch(actionDeleteSingleTag(commentId))
        return
    }
}

/***************************** STATE SHAPE *******************************/
const initialState = {
    allPhotos: {},
    userPhotos: {},
    singlePhotoDetails: {
        Comments: [],
        Tags: []
    },
}


/******************************* REDUCER *********************************/
const photosReducer = (state = initialState, action) => {

    let newState = {...state};

    switch (action.type) {

    // photos
        case PHOTOS_CREATE_SINGLE_PHOTO:
            newState.allPhotos = {...state.allPhotos}
                // add new photo to normalized object of all photos
                newState.allPhotos[action.payload.id] = {...action.payload}
            newState.userPhotos = {...state.userPhotos}
            newState.singlePhotoDetails = {...action.payload}
                // deep copy nested structure: singlePhotoDetails.Comments
                let createSinglePhoto_CommentsArr = [];
                action.payload.Comments.forEach(obj => createSinglePhoto_CommentsArr.push({...obj}));
                newState.singlePhotoDetails.Comments = createSinglePhoto_CommentsArr;
                // deep copy nested structure: singlePhotoDetails.Tags
                let createSinglePhoto_TagsArr = [];
                action.payload.Tags.forEach(obj => createSinglePhoto_TagsArr.push({...obj}));
                newState.singlePhotoDetails.Tags = createSinglePhoto_TagsArr;
            return newState

        case PHOTOS_READ_ALL_PHOTOS:
            newState.allPhotos = {...state.allPhotos}
            newState.allPhotos = normalizeArray(action.payload)
            newState.userPhotos = {...state.userPhotos}
            newState.singlePhotoDetails = {...state.singlePhotoDetails}
                // deep copy nested structure: singlePhotoDetails.Comments
                let readAllPhotos_CommentsArr = [];
                newState.singlePhotoDetails.Comments.forEach(obj => readAllPhotos_CommentsArr.push({...obj}));
                newState.singlePhotoDetails.Comments = readAllPhotos_CommentsArr;
                // deep copy nested structure: singlePhotoDetails.Tags
                let readAllPhotos_TagsArr = [];
                newState.singlePhotoDetails.Tags.forEach(obj => readAllPhotos_TagsArr.push({...obj}));
                newState.singlePhotoDetails.Tags = readAllPhotos_TagsArr;
            return newState

        case PHOTOS_READ_ALL_PHOTOS_BY_USER:
            newState.allPhotos = {...state.allPhotos}
            newState.userPhotos = {...state.userPhotos}
            newState.userPhotos = normalizeArray(action.payload)
            newState.singlePhotoDetails = {...state.singlePhotoDetails}
                // deep copy nested structure: singlePhotoDetails.Comments
                let readAllPhotosByUser_CommentsArr = [];
                newState.singlePhotoDetails.Comments.forEach(obj => readAllPhotosByUser_CommentsArr.push({...obj}));
                newState.singlePhotoDetails.Comments = readAllPhotosByUser_CommentsArr;
                // deep copy nested structure: singlePhotoDetails.Tags
                let readAllPhotosByUser_TagsArr = [];
                newState.singlePhotoDetails.Tags.forEach(obj => readAllPhotosByUser_TagsArr.push({...obj}));
                newState.singlePhotoDetails.Tags = readAllPhotosByUser_TagsArr;
            return newState

        case PHOTOS_READ_SINGLE_PHOTO_DETAILS:
            newState.allPhotos = {...state.allPhotos}
            newState.userPhotos = {...state.userPhotos}
            newState.singlePhotoDetails = {...action.payload};
                // deep copy nested structure: singlePhotoDetails.Comments
                let readSinglePhoto_CommentsArr = [];
                action.payload.Comments.forEach(obj => readSinglePhoto_CommentsArr.push({...obj}));
                newState.singlePhotoDetails.Comments = readSinglePhoto_CommentsArr;
                // deep copy nested structure: singlePhotoDetails.Tags
                let readSinglePhoto_TagsArr = [];
                action.payload.Tags.forEach(obj => readSinglePhoto_TagsArr.push({...obj}));
                newState.singlePhotoDetails.Tags = readSinglePhoto_TagsArr;
            return newState

        case PHOTOS_UPDATE_SINGLE_PHOTO:
            newState.allPhotos = {...state.allPhotos}
            newState.userPhotos = {...state.userPhotos}
            newState.singlePhotoDetails = {...action.payload};
                // deep copy nested structure: singlePhotoDetails.Comments
                let updateSinglePhoto_CommentsArr = [];
                action.payload.Comments.forEach(obj => updateSinglePhoto_CommentsArr.push({...obj}));
                newState.singlePhotoDetails.Comments = updateSinglePhoto_CommentsArr;
                // deep copy nested structure: singlePhotoDetails.Tags
                let updateSinglePhoto_TagsArr = [];
                action.payload.Tags.forEach(obj => updateSinglePhoto_TagsArr.push({...obj}));
                newState.singlePhotoDetails.Tags = updateSinglePhoto_TagsArr;
            return newState

    // tags
        case PHOTOS_CREATE_SINGLE_TAG:
            newState.allPhotos = {...state.allPhotos}
            newState.userPhotos = {...state.userPhotos}
            newState.singlePhotoDetails = {...state.singlePhotoDetails}
                // deep copy nested structure: singlePhotoDetails.Comments
                let createSingleTag_CommentsArr = [];
                newState.singlePhotoDetails.Comments.forEach(obj => createSingleTag_CommentsArr.push({...obj}));
                newState.singlePhotoDetails.Comments = createSingleTag_CommentsArr;
                // add new tag
                newState.singlePhotoDetails.Tags.push({...action.payload})
                // deep copy newly modified nested structure: singlePhotoDetails.Tags
                let createSingleTag_TagsArr = [];
                newState.singlePhotoDetails.Tags.forEach(obj => createSingleTag_TagsArr.push({...obj}));
                newState.singlePhotoDetails.Tags = createSingleTag_TagsArr;
            return newState

        case PHOTOS_DELETE_SINGLE_TAG:
            newState.allPhotos = {...state.allPhotos}
            newState.userPhotos = {...state.userPhotos}
            newState.singlePhotoDetails = {...state.singlePhotoDetails}
                // deep copy nested structure: singlePhotoDetails.Comments
                let deleteSingleTag_CommentsArr = [];
                newState.singlePhotoDetails.Comments.forEach(obj => deleteSingleTag_CommentsArr.push({...obj}));
                newState.singlePhotoDetails.Comments = deleteSingleTag_CommentsArr;
                // remove tag; creates shallow copy
                let oldTagsArr = newState.singlePhotoDetails.Tags
                let newTagsArr = oldTagsArr.filter(obj => obj.tagId !== action.payload)
                // deep copy newly modified nested structure: singlePhotoDetails.Tags
                let deleteSingleTag_TagsArr = [];
                newTagsArr.forEach(obj => deleteSingleTag_TagsArr.push({...obj}));
                newState.singlePhotoDetails.Tags = deleteSingleTag_TagsArr;
            return newState

    // comments
        case PHOTOS_CREATE_SINGLE_COMMENT:
            newState.allPhotos = {...state.allPhotos}
            newState.userPhotos = {...state.userPhotos}
            newState.singlePhotoDetails = {...state.singlePhotoDetails}
                // add new comment
                newState.singlePhotoDetails.Comments.push({...action.payload})
                // deep copy newly modified nested structure: singlePhotoDetails.Comments
                let createSingleComment_CommentsArr = [];
                newState.singlePhotoDetails.Comments.forEach(obj => createSingleComment_CommentsArr.push({...obj}));
                newState.singlePhotoDetails.Comments = createSingleComment_CommentsArr;
                // deep copy nested structure: singlePhotoDetails.Tags
                let createSingleComment_TagsArr = [];
                newState.singlePhotoDetails.Tags.forEach(obj => createSingleComment_TagsArr.push({...obj}));
                newState.singlePhotoDetails.Tags = createSingleComment_TagsArr;
            return newState

        case PHOTOS_DELETE_SINGLE_COMMENT:
            newState.allPhotos = {...state.allPhotos}
            newState.userPhotos = {...state.userPhotos}
            newState.singlePhotoDetails = {...state.singlePhotoDetails}
                // remove comment; creates shallow copy
                let oldCommentsArr = newState.singlePhotoDetails.Comments
                let newCommentsArr = oldCommentsArr.filter(obj => obj.commentId !== action.payload)
                // deep copy newly modified nested structure: singlePhotoDetails.Tags
                let deleteSingleComment_CommentsArr = [];
                newCommentsArr.forEach(obj => deleteSingleComment_CommentsArr.push({...obj}));
                newState.singlePhotoDetails.Comments = deleteSingleComment_CommentsArr;
                // deep copy nested structure: singlePhotoDetails.Comments
                let deleteSingleComment_TagsArr = [];
                newState.singlePhotoDetails.Tags.forEach(obj => deleteSingleComment_TagsArr.push({...obj}));
                newState.singlePhotoDetails.Tags = deleteSingleComment_TagsArr;
            return newState

        default:
            return state
    }
}

/******************************** EXPORTS ********************************/
export default photosReducer;

// reminder: spread nested structures for read actions!
