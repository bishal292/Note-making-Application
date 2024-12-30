
export const HOST = import.meta.env.VITE_HOST_URL;

export const SIGNUP_ROUTE = "/user/register";
export const LOGIN_ROUTE = "/user/login";
export const LOGOUT_ROUTE = "/user/logout";
export const USER_INFO_ROUTE = "/user/user-info";


export const CREATE_NOTE_ROUTE = "/notes/create-note";
export const UPDATE_NOTE_ROUTE = "/notes/update-note";
export const DELETE_NOTE_ROUTE = "/notes/delete-note";
export const GET_NOTES_ROUTE = "/notes/get-notes";
export const SEARCH_NOTE_ROUTE = "/notes/get-note"; // takes query parameter as title to search and fetch the note matching title.
export const GET_NOTE_BY_ID_ROUTE = "/notes/get-note-by-id"; // takes query parameter as id to fetch the note with that NoteId.
export const UPLOAD_IMAGE_ROUTE = "/notes/upload-image"; // takes file as image to upload and returns the image url.