import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect, useState } from "react";
import { Alert, Button, FloatingLabel, Form } from "react-bootstrap";
import { TagInput } from "./tag-input";
import { useSelector } from "react-redux";
import { useFetchWithAuth } from "../../service/fetchWithAuth";

export const Editor = ({initialData, handleSave, isNew}) => {
  const fetchWithAuth = useFetchWithAuth();
  const [alert, setAlert] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [validated, setValidated] = useState(false);
  const userId = useSelector((state) => state.user.id);
  const [entryId, setEntryId] = useState('');
  const [data, setData] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [entryDate, setEntryDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {

    const getCategory = async () => {
      try {
        const response = await fetchWithAuth(`/category?userId=${userId}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          }
        });

        setCategories(response);
      } catch (err) {
        console.log(err);
      }
    }
    getCategory();

    if (!isNew) {
      setEntryId(initialData.id);
      setTitle(initialData.title);
      setData(initialData.description);
      setEntryDate(initialData.entry_date);
      setCategory(initialData.category.id);
      setTags(initialData.tags);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if(form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setAlert(false);
    setAlertText('');

    let missingFields = '';

    if(!title) {
      missingFields += ' title';
    } 

    if(!category) {
      missingFields += ' category';
    }

    if(!entryDate) {
      missingFields += ' date';
    }
    
    if (missingFields) {
      setAlertText(missingFields);
      setAlert(true);
      return;
    }

    const cat = categories.find(c => String(c.id) === String(category));
    const tagsInput = tags.map(t => ({
      tag_name: t
    }));

    const dataBody = {
      id: entryId,
      title: title,
      description: data,
      category: cat,
      tags: tagsInput,
      entry_date: entryDate,
    }

    handleSave(dataBody);
    setValidated(true);
  }

  return (
    <div className="flex flex-col items-center  justify-center px-10 w-full">
      {alert && <Alert key="danger" variant="danger" onClose={() => setAlert(false)} dismissible>[<b>{alertText}</b>] must not be empty!</Alert>}
      <h2>{isNew ? 'Create' : 'Edit'}</h2>
      <Form noValidate validated={validated} className="max-w-3xl w-full" onSubmit={handleSubmit}>
        <Form.Group className="mb-3 mt-3">
          <FloatingLabel 
          controlId="floatingInput"
          label="Title"
          className="mb-3" 
          >
            <Form.Control type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required />
          </FloatingLabel>
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" 
            value={entryDate}
            onChange={e => setEntryDate(e.target.value)}
            required/>
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
          value={category}
            onChange={e => setCategory(e.target.value)}
            required>
            <option value="">Select a category</option>
            {categories && categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.category_name}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
              Please choose a category.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mt-3 overflow-auto">
        <div className="columns-3 w-full">
        <TagInput tags={tags} setTags={setTags} /></div>
        </Form.Group>
        <Form.Group className="flex justify-center mt-4">
          <Button className="btn-default" type="submit">Save</Button>
        </Form.Group>
      </Form>
    </div>
  );
}