import { useEffect, useState } from "react";
import { CardView } from "../card-view/card-view";
import { useSelector } from "react-redux";
import { Link } from "react-router";

export const ListView = () => {
  const apiUrl = 'http://localhost:8081/api/v1';
  const userId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/entry/entries?userId=${userId}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": token,
      }
    })
      .then(response => {
        return response.json()
      })
      .then(response => {
        console.log(response)
        setEntries(response);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {entries.map(entry => {
          return <CardView key={entry.id} entry={entry}></CardView>
        })}
        <Link to="/entry" className="text-black">
          <button className="bg-button text-xl w-10 h-10 rounded-full mt-5 border-1 border-black shadow active:scale-80 flex items-center justify-center">
            <span className="material-icons md-18">add</span>
          </button>
        </Link>
      </div>
    </>
  );
}