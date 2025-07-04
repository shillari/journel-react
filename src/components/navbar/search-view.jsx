import { useLocation, useSearchParams } from "react-router";
import { useFetchWithAuth } from "../../service/fetchWithAuth";
import { CardView } from "../card-view/card-view"
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

export const SearchView = ({userId}) => {
  const [searchParams] = useSearchParams();
  const tag = searchParams.get('tag');
  const fetchWithAuth = useFetchWithAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const onDelete = (id) => {
    setEntries(entries => entries.filter(entry => entry.id !== id));
  }

  useEffect(() => {
    const handleSearch = async () => {
      setLoading(true);
      try {
        if (tag) {
          const response = await fetchWithAuth(`/entry/tag?userId=${userId}&tagName=${tag}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
          });

          if(response) {
            setEntries(response);
          }
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    handleSearch();
  },[tag]);

  

  return (
    <div className="flex flex-col items-center justify-center mx-10">
      {loading ?
        <div className="flex justify-center align-middle space-x-1">
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" size="sm" />
          </div>
          :
        <>
        <h1>Search</h1>
          {entries && entries.length > 0 ? entries.map(entry => {
            return <CardView key={entry.id} entry={entry} onDelete={onDelete} />
          })
          :
          <span className="mt-5">Nothing found</span>
          }
        </>
    }
      
    </div>
  )
}