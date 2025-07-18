import { useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link,  } from "react-router";
import { useFetchWithAuth } from "../../service/fetchWithAuth";

export const CardView = ({entry, onDelete}) => {
  const [show, setShow] = useState(false);
  const userId = useSelector((state) => state.user.id);
  const fetchWithAuth = useFetchWithAuth();

  const handleDelete = async () => {
    try {
      await fetchWithAuth(`/entry?userId=${userId}&entryId=${entry.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
      });

      setShow(false);
      onDelete(entry.id);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="flex align-middle card-default w-full max-w-2xl h-50 p-2 rounded-lg border-1 shadow my-1 mb-3">
       {/*<div className="w-32 h-32 bg-black m-2 shrink-0"></div> */} 
       <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>Delete entry</Modal.Header>
        <Modal.Body>Are you sure you want to delete <b>{entry.title}</b>?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
       </Modal>
        <div className="flex flex-col flex-grow ml-3 justify-between">
          <h3>{entry.title}</h3>
          <span className="clamp-text" dangerouslySetInnerHTML={{ __html: entry.description }} />
          <div className="flex justify-between items-center mt-auto">
            <span className="font-bold">{entry.entry_date}</span>
            
            <Dropdown align="end">
              <Dropdown.Toggle className="btn-default" size="sm" id="dropdown-basic" />
              <Dropdown.Menu>
                <Dropdown.Item as={Link} 
                  to={`/entry/${entry.id}/edit`}
                >
                  <span className="material-icons-outlined md-18">edit</span> Edit entry
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setShow(true)}>
                  <span className="material-icons-outlined md-18">delete</span> Delete entry
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
          </div>
        </div>
      </div>
    </>
  )
}