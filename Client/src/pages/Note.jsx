import React, { useEffect, useState } from "react";
import { ApiClient } from "../lib/ApiClient";
import {
  DELETE_NOTE_ROUTE,
  GET_NOTE_BY_ID_ROUTE,
  HOST,
  UPDATE_NOTE_ROUTE,
  UPLOAD_IMAGE_ROUTE,
} from "../lib/constant";

const Note = () => {
  const [note, setNote] = useState({
    _id: "",
    title: "",
    content: "",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [errorOccured, setErrorOccured] = useState(false);

  useEffect(() => {
    // Fetch the note data from the server using the note id from the url

    const getNoteWithId = async () => {
      {
        const noteId = window.location.pathname.split("/").pop();
        try {
          const response = await ApiClient.get(
            `${GET_NOTE_BY_ID_ROUTE}?id=${noteId}`
          );
          console.log(response);

          if (response.status === 200) {
            setNote(response.data);
          }
        } catch (error) {
          console.error("Error fetching note:", error);
          setErrorOccured(true);
        } finally {
          setLoading(false);
        }
      }
    };

    getNoteWithId();
  }, []);

  const handleTitleChange = (e) => {
    setNote({
      ...note,
      title: e.target.value,
    });
  };

  const handleContentChange = (e) => {
    setNote({
      ...note,
      content: e.target.value,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    console.log({ file });
    if (file) {
      const formData = new FormData();
      formData.append("note-image", file);
      const response = await ApiClient.post(UPLOAD_IMAGE_ROUTE, formData);
      console.log(response);

      if (response.status === 200 && response.data.image) {
        setNote({
          ...note,
          image: response.data.image,
        });
        console.log(note);
        console.log(note.image);
      }
    }
  };

  const deleteNote = async () => {
    try {
      const response = await ApiClient.delete(`${DELETE_NOTE_ROUTE}`,{noteId:note._id});

      console.log(response)
    } catch (error) {
      
    }
  };

  const saveNote = async () => {
    try {
      const response = await ApiClient.patch(UPDATE_NOTE_ROUTE, {
        ...note,
        noteId: note._id,
      });
      console.log(response);
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (errorOccured) {
    return <div>Error fetching note</div>;
  }

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <input
          type="text"
          value={note.title}
          placeholder="Heading of the Note"
          onChange={handleTitleChange}
          className="text-2xl font-bold w-full"
        />
        <button
          className="bg-red-500 text-white px-3 py-1 rounded ml-2"
          onClick={deleteNote}
        >
          Delete
        </button>
      </div>
      <textarea
        value={note.content}
        onChange={handleContentChange}
        placeholder="Enter the content for the note here.........."
        className="w-full h-64 p-3 border border-gray-300 rounded mb-5"
      />
      {note.image && (
        <div className="mb-5">
          <img
            src={`${HOST}/${note.image}`}
            alt="Note"
            className="w-36 h-auto mb-3"
          />
          {/* <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => setNote({ ...note, image: null })}
          >
            Remove Image
          </button> */}
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-5"
      />
      <div className="flex justify-center">
        <button
          className="bg-blue-500 text-white px-5 py-2 rounded"
          onClick={saveNote}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Note;
