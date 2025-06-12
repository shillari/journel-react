export const Tag = ({content, handleDelete, index}) => {
  return (
    <div className="tag-wrapper">
      <span>{content}
        <button className="tag-delete" onClick={() => handleDelete(index)} type="button"><span className="material-icons md-18">close</span></button>
      </span>
    </div>
  );
}