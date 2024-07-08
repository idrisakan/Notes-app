import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Create from "./pages/Create";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Note, NoteData, Tag } from "./types";
import { v4 } from "uuid";
import Layout from "./components/Layout";

const App = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  //Etiket oluşturma fonksiyonu
  const createTag = (tag: Tag): void => {
    setTags([...tags, tag]);
  };

  //not oluşturma fonksiyonu
  const createNote = (noteData: NoteData): void => {
    // form dan gelen dataları id ekle
    const newNote: Note = {
      id: v4(),
      ...noteData,
    };
    setNotes([...notes, newNote]);
  };

  //note silme fonksiyonu
  const deleteNote = (id: string): void => {
    setNotes(notes.filter((n) => n.id !== id));
  };
  //note düzenleme fonksiyonu

  const updateNote = (id: string, updatedData: NoteData): void => {
    const updateArr = notes.map((note) =>
      note.id === id ? { id, ...updatedData } : note
    );
    setNotes(updateArr);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main notes={notes} availableTags={tags} />} />
        <Route
          path="new"
          element={
            <Create
              handleSubmit={createNote}
              createTag={createTag}
              availableTags={tags}
            />
          }
        />

        <Route path="/note/:id" element={<Layout notes={notes} />}>
          <Route index element={<Detail deleteNote={deleteNote} />} />
          <Route
            path="edit"
            element={
              <Edit
                handleSubmit={updateNote}
                createTag={createTag}
                availableTags={tags}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
