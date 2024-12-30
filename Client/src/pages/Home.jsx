import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiClient } from "../lib/ApiClient";
import { DELETE_NOTE_ROUTE, GET_NOTES_ROUTE } from "../lib/constant";
import Loading from "../components/Loading";
import Error404 from "../components/Error404";

const Home = () => {
  const [notes, setNotes] = useState([
    {
      _id: "",
      title: "",
      content: "",
      createdAt: "",
      image: "",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorOccured, setErrorOccured] = useState(false);
  const notesPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await ApiClient.get(GET_NOTES_ROUTE);
        console.log(response);
        if (response.status === 200) {
          setNotes(response.data);
        }
      } catch (err) {
        console.log(err);
        setErrorOccured(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const openNote = (id) => {
    navigate(`/notes/${id}`);
  };

  const deleteNote = async (id) => {
    setIsLoading(true);
    try {
      const response = await ApiClient.post(`${DELETE_NOTE_ROUTE}`, {
        noteId: id,
      });
      if (response.status === 200) {
        setNotes(notes.filter((note) => note._id !== id));
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current notes
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  if (isLoading) {
    return <Loading />
  }
  if (errorOccured) {
    return <Error404 />
  }
  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-5">Notes</h1>

        <Link
          to={"/new-note"}
          className="mr-2 bg-blue-500 text-white px-3 py-1 rounded"
        >
          Create New
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {currentNotes.map((note) => (
          <div
            key={note._id}
            className="bg-gray-100 border border-gray-300 p-5 rounded-md"
          >
            <h2 className="text-xl font-semibold">{note.title}</h2>
            <p className="mb-3">{note.content}</p>
            <button
              className="mr-2 bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => openNote(note._id)}
            >
              Open
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => deleteNote(note._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="mt-5">
        {Array.from(
          { length: Math.ceil(notes.length / notesPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              className="mr-2 bg-gray-300 px-3 py-1 rounded"
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
