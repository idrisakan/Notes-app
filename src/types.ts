//etiket tipi

export type Tag = {
  label: string;
  value: string;
};

// formlarda alınacak olan note verisinin tipi
export type NoteData = {
  title: string;
  tags: Tag[];
  markdown: string;
};

//state kaydedilecek olan note verisinin tipi (id)

export type Note = {
  id: string;
} & NoteData;
