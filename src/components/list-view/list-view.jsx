import { useEffect, useState } from "react";
import { CardView } from "../card-view/card-view";
import { Link } from "react-router";
import { Form, Pagination, Spinner } from "react-bootstrap";
import { useFetchWithAuth } from "../../service/fetchWithAuth";
import { PaginationEntriesView } from "../pagination-view/pagination-entries-view";

export const ListView = ( { userId}) => {
  const fetchWithAuth = useFetchWithAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState('');
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const pagItems = [];

  useEffect(() => {
    console.log(showFilter)
    const loadEntries = async () => {
      try {
        {/*
        const response = await fetchWithAuth(`/entry/entries?userId=${userId}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          }
        });
        */ }

        const response = await fetchWithAuth(`/entry/entries/page?userId=${userId}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          }
        });

        if (response) {
          setEntries(response.entries);
          setTotalElements(response.totalElements);
          setTotalPages(response.totalPages);
          setLoading(false);
        }
        
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    loadEntries();
  }, []);

  const onPageChange = async (page) => {
    setLoading(true);
    setCurrentPage(page);

    const response = await fetchWithAuth(`/entry/entries/page?userId=${userId}&page=${page-1}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      }
    });

    if (response) {
      setEntries(response.entries);
      setTotalElements(response.totalElements);
      setTotalPages(response.totalPages);
      setLoading(false);
    }
  }

  const onDelete = (id) => {
    setEntries(entries => entries.filter(entry => entry.id !== id));
  }

  const applyFilter = (e) => {
    e.preventDefault();
    const valueSelected = e.target.value;
    setFilter(valueSelected);
    let sorted = [...entries];

    if (valueSelected === '1') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (valueSelected === '2') {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    } else if (valueSelected === '3') {
      sorted.sort((a, b) => new Date(b.entry_date) - new Date(a.entry_date));
    } else if (valueSelected === '4') {
      sorted.sort((a, b) => new Date(a.entry_date) - new Date(b.entry_date));
    }

    setEntries(sorted);
  }

  for (let page = totalPages; page <= totalPages; page++) {
    pagItems.push(
      <Pagination.Item
        key={page}
        active={page === currentPage}
        onClick={() => setcu}
      >
        {page}
      </Pagination.Item>
    )
  }

  return (
    <>
      <div className="flex flex-col justify-center ml-1 items-end">
        <button onClick={() => setShowFilter(!showFilter)} className="bg-transparent cursor-pointer p-0 px-2 border-0 rounded-lg" variant="light">
          <span className="inline-flex items-center gap-1 hover:!text-gray-500 text-sm">
            <span className="material-icons-outlined text-base">filter_alt</span> Filter 
            <span className="material-icons-outlined text-base">{showFilter ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</span>
          </span>
        </button>
        <div className={`transition-all duration-300 transform origin-top ${
              showFilter
                ? 'opacity-100 scale-y-100 max-h-40'
                : 'opacity-0 scale-y-0 max-h-0 pointer-events-none'
            } overflow-hidden`}>
          <Form.Select className="max-w-100" aria-label="select a filter to apply"
            value={filter}
            onChange={applyFilter}
          >
            <option value="">Select a filter</option>
            <option value="1">Ascending order</option>
            <option value="2">Descending order</option>
            <option value="3">Newest date</option>
            <option value="4">Oldest date</option>
          </Form.Select>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mx-10">
        {loading ?  
          <div className="flex justify-center align-middle space-x-1">
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" size="sm" />
          </div>
        :
          <>
          
            <Link to="/entry/new" className="text-black">
              <button className="bg-button text-xl w-10 h-10 rounded-full my-5 border-1 border-black shadow active:scale-80 flex items-center justify-center">
                <span className="material-icons md-18">add</span>
              </button>
            </Link>
            <PaginationEntriesView entries={entries} totalPages={totalPages} currentPage={currentPage} onPageChange={(page) => onPageChange(page)} onDelete={onDelete} />
          </>
        }
      </div>
    </>
  );
}