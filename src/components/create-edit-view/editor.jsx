import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { TagInput } from "./tag-input";

export const Editor = ({isNew}) => {
  const [data, setData] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (!isNew) {
      // TODO
    }
  }, []);

  return (
    <>
    <h2>{{isNew} ? 'Create' : 'Edit'}</h2>
    <Form>
      <Form.Group className="mb-3 mt-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text"
          value={title}
          onChange={e => setTitle(e.target.value)} />
      </Form.Group>
      <CKEditor
        editor={ClassicEditor}
        data={data}
        onChange={(event, editor) => {
          const data = editor.getData();
          setData(data);
        }}
      />
      <Form.Group className="mt-3">
        <Form.Select className="columns-2 h-100" aria-label="select category"
          onChange={e => setCategory(e.target.value)}>
        <option>Select a category</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </Form.Select>
      <div className="columns-3 w-full">
      <TagInput tags={tags} setTags={setTags} /></div>
      </Form.Group>
      <Form.Group className="flex justify-center mt-4">
        <Button className="btn-default" type="submit">{{isNew} ? 'Create' : 'Edit'} </Button>
      </Form.Group>
    </Form>
    </>
  );
}