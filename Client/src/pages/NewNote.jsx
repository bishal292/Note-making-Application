import React, { useEffect, useState } from "react";
import { ApiClient } from "../lib/ApiClient";
import { CREATE_NOTE_ROUTE, GET_NOTE_BY_ID_ROUTE, HOST, UPLOAD_IMAGE_ROUTE } from "../lib/constant";
import { Link, useNavigate } from "react-router-dom";

const NewNote = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: "",
    content: "",
    image: "",
  });

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
    setNote({...note,image:file});
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
      }
    }
  };


  const createNote = async() => {
    console.log("Note saved:", note);
    try {
      const response = await ApiClient.post(CREATE_NOTE_ROUTE,note);
      if(response.status === 201){
        alert("Note Created");
        navigate("/");
      }
    } catch (error) {
      
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <input
          type="text"
          value={note.title}
          required
          placeholder="Heading of the Note"
          onChange={handleTitleChange}
          className="text-2xl font-bold w-full"
        />
        <Link to={"/"} className="bg-red-500 text-white px-3 py-1 rounded ml-2" >
        Discard
        </Link>
      </div>
      <textarea
        value={note.content}
        required
        onChange={handleContentChange}
        placeholder="Enter the content for the note here.........."
        className="w-full h-64 p-3 border border-gray-300 rounded mb-5"
      />
      {note.image && (
        <div className="mb-5">
          <img src={`${HOST}/${note.image}`} alt="Note" className="w-36 h-auto mb-3" />
        </div>
      )}
      <input
        type="file"
        required
        accept="image/*"
        onChange={(e)=> handleImageChange(e)}
        className="mb-5"
      />
      <div className="flex justify-center">
        <button
          className="bg-blue-500 text-white px-5 py-2 rounded"
          onClick={createNote}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default NewNote;
