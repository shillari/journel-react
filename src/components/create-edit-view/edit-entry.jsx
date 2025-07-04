import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Editor } from "./editor";
import { useFetchWithAuth } from "../../service/fetchWithAuth";
import { Spinner } from "react-bootstrap";

export const EditEntry = ({userId}) => {
  const {entryId} = useParams();
  const [entry, setEntry] = useState(null);
  const fetchWithAuth = useFetchWithAuth();

  useEffect(() => {
    const getEntry = async () => {
      try {
        const response = await fetchWithAuth(`/entry?userId=${userId}&entryId=${entryId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const tagsInput = response.tags.map(t => t.tag_name);
        const dataBody = {
          id: response.id,
          title: response.title,
          description: response.description,
          category: response.category,
          tags: tagsInput,
          entry_date: response.entry_date,
        }

        setEntry(dataBody);
      } catch (err) {
        console.log(err);
      }
    }

    getEntry();
  }, []);

  const handleSave = async (formData) => {
    const dataBody = {
      id: formData.id,
      title: formData.title,
      description: formData.description,
      category: formData.category,
      tags: formData.tags,
      entry_date: formData.entry_date,
    }

    try {
      const response = await fetchWithAuth(`/entry?userId=${userId}`, {
        method: "PUT",
        body: JSON.stringify(dataBody),
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = {
        id: response.id,
        title: response.title,
        description: response.description,
        category: response.category,
        tags: response.tags,
        entry_date: response.entry_date,
      }

      setEntry(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
    {entry ? 
      <Editor initialData={entry} handleSave={handleSave} isNew={false} /> :
      <div className="flex justify-center align-middle space-x-1">
        <Spinner animation="grow" size="sm" />
        <Spinner animation="grow" size="sm" />
        <Spinner animation="grow" size="sm" />
      </div>
    }
    </>
  );
}