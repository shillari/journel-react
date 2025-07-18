import { Pagination } from "react-bootstrap";
import { CardView } from "../card-view/card-view";

export const PaginationEntriesView = ({entries, totalPages, currentPage, onPageChange, onDelete}) => {
  const pageItems = [];

  for (let page = 1; page <= totalPages; page++) {
    pageItems.push(
      <Pagination.Item
        className={`${page === currentPage}` ? "font-bold" : ""}
        key={page}
        active={page === currentPage}
        onClick={() => onPageChange(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  return (
    <>
      {entries.map(entry => {
        return <CardView key={entry.id} entry={entry} onDelete={onDelete}></CardView>
      })}

      <div className="mt-4">
        <Pagination>
          {pageItems}
        </Pagination>
      </div>
    </>
  )
}