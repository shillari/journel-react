import { Editor } from "./editor";
import { useNavigate } from "react-router";
import { useFetchWithAuth } from "../../service/fetchWithAuth";

export const CreateEntry = ({ userId}) => {
  const navigate = useNavigate();
  const fetchWithAuth = useFetchWithAuth();

  const handleSave = async (formData) => {
    const dataBody = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      tags: formData.tags,
      entry_date: formData.entry_date,
    }

    try {
      await fetchWithAuth(`/entry?userId=${userId}`, {
        method: "POST",
        body: JSON.stringify(dataBody),
        headers: {
          "Content-Type": "application/json",
        }
      });

      // TODO create alert
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Editor handleSave={handleSave} isNew={true} />
    </>
  );
}