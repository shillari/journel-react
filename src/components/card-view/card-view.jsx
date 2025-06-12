import { Dropdown } from "react-bootstrap"

export const CardView = ({entry}) => {
  return (
    <>
      <div className="flex align-middle card-default w-full max-w-md h-50 p-2 rounded-lg border-1 shadow">
        <div className="w-32 h-32 bg-black m-2 shrink-0"></div>
        <div className="flex flex-col flex-grow ml-3 justify-between">
          <h2>{entry.title}</h2>
          <span className="clamp-text">{entry.description}</span>
          <div className="flex justify-between items-center mt-auto">
            <span>{entry.entry_date}</span>
            
            <Dropdown align="end">
              <Dropdown.Toggle className="btn-default" size="sm" id="dropdown-basic" />
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-2">
                  <span className="material-icons md-18">edit</span> Edit entry
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  <span className="material-icons md-18">delete</span> Delete entry
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
          </div>
        </div>
      </div>
    </>
  )
}