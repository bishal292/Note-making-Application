import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiClient } from "../lib/ApiClient";
import { GET_NOTES_ROUTE } from "../lib/constant";

const Home = () => {
  const [notes, setNotes] = useState([
    // Sample notes data
    { id: 1, title: "Note 1", content: "Content of Note 1" },
    { id: 2, title: "Note 2", content: "Content of Note 2" },
    { id: 3, title: "Note 3", content: "Content of Note 3" },
    { id: 4, title: "Note 4", content: "Content of Note 4" },
    { id: 5, title: "Note 5", content: "Content of Note 5" },
    { id: 6, title: "Note 6", content: "Content of Note 6" },
    { id: 7, title: "Note 7", content: "Content of Note 7" },
    { id: 8, title: "Note 8", content: "Content of Note 8" },
    { id: 9, title: "Note 9", content: "Content of Note 9" },
    { id: 10, title: "Note 10", content: "Content of Note 10" },
    { id: 11, title: "Note 11", content: "Content of Note 11" },
    { id: 12, title: "Note 12", content: "Content of Note 12" },
    { id: 13, title: "Note 13", content: "Content of Note 13" },
    { id: 14, title: "Note 14", content: "Content of Note 14" },
    { id: 15, title: "Note 15", content: "Content of Note 15" },
    { id: 16, title: "Note 16", content: "Content of Note 16" },
    { id: 17, title: "Note 17", content: "Content of Note 17" },
    { id: 18, title: "Note 18", content: "Content of Note 18" },
    { id: 19, title: "Note 19", content: "Content of Note 19" },
    { id: 20, title: "Note 20", content: "Content of Note 20" },
    { id: 21, title: "Note 21", content: "Content of Note 21" },
    { id: 22, title: "Note 22", content: "Content of Note 22" },
    { id: 23, title: "Note 23", content: "Content of Note 23" },
    { id: 24, title: "Note 24", content: "Content of Note 24" },
    { id: 25, title: "Note 25", content: "Content of Note 25" },
    { id: 26, title: "Note 26", content: "Content of Note 26" },
    { id: 27, title: "Note 27", content: "Content of Note 27" },
    { id: 28, title: "Note 28", content: "Content of Note 28" },
    // ...more notes
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorOccured, setErrorOccured] = useState(false)
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

  const deleteNote = (id) => {
    // Handle deleting a note
    setNotes(notes.filter((note) => note.id !== id));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current notes
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  if(isLoading){
    return <div>Loading ....</div>
  }
  if(errorOccured){
    return <div>Some error Occured while loading notes...</div>
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
