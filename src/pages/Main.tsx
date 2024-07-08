import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Note, Tag } from "../types";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useState } from "react";
import ReactSelect from "react-select";

interface Props {
  notes: Note[];
  availableTags: Tag[];
}

const Main = ({ notes, availableTags }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  /*
  1) Not başlığı 1.inputla aratılan metni içermelidir. Note'un başlığının küçük harfe çevrilmiş hali aratılan metnin küçük harfe çevrilmiş halini içeriyorsa koşul sağlanır.

  &&

  2) 2.input ile seçilen etiketler note'un içersindeki etiketler ile birebir eşleşmeli. Seçilen etiket dizisindeki her bir etiket için note'a ait etiketler arasında eşleşme kontolü yapılmalı
  */

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()) &&
      selectedTags.every((s_tag) =>
        note.tags.some((noteTag) => noteTag.value == s_tag.value)
      )
  );

  return (
    <div className="container mx-auto py-5">
      {/* üst kısım */}
      <Stack direction="horizontal" className="justify-content-between ">
        <h1>Notlar</h1>
        <Link to="/new">
          <Button>Oluştur</Button>
        </Link>
      </Stack>

      {/* form alanı */}
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Başlığa Göre Ara</Form.Label>
              <Form.Control onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Etikete Göre Ara</Form.Label>
              <ReactSelect
                onChange={(all_tags) => setSelectedTags(all_tags as Tag[])}
                isMulti
                options={availableTags}
                className="text-black"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      {/* Not Listesi */}
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3 mt-4">
        {filteredNotes.map((note) => (
          <Col>
            <Card key={note.id} note={note} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Main;
