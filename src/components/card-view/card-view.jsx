import { Dropdown } from "react-bootstrap"

export const CardView = () => {
  return (
    <>
      <div className="flex align-middle card-default w-full max-w-md h-50 p-2 rounded-lg border-1 shadow">
        <div className="w-32 h-32 bg-black m-2 shrink-0"></div>
        <div className="flex flex-col flex-grow ml-3 justify-between">
          <h2>title</h2>
          <span className="clamp-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
          <div className="flex justify-between items-center mt-auto">
            <span>24/05/1965</span>
            
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