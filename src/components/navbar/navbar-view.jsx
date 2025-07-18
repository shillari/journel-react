import { Button, Form, Image, InputGroup } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch} from "react-redux";
import { toggleSlidebar } from "../../redux/reducers/sidebarSlice";
import { useState } from "react";
import { useNavigate } from "react-router";

export const NavbarView = ({user,}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const toggleSideMenu = (e) => {
    e.preventDefault();
    dispatch(toggleSlidebar());
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    navigate(`/search/tag?tag=${encodeURIComponent(searchText)}`);
  }

  return (
    <>
      <Navbar className="navbar h-11 shadow-xl">
        <Container>
          {user ?
          (<>
          <Navbar.Text className="bg-none mr-5">
            <button onClick={toggleSideMenu} className="bg-transparent cursor-pointer p-0 px-2 rounded-lg border-0" variant="light">
              <span className="material-icons-outlined hover:!text-gray-500 md-18">menu</span>
            </button>
          </Navbar.Text>
            
            <Navbar.Brand href="/">
              <Image className="h-10" src="assets/logo.svg" />
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <div className="search-bar">
                <Form onSubmit={handleSearch} className="d-flex">
                  <Form.Group>
                    <InputGroup>
                      <Form.Control
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        type="search"
                        placeholder="Search tag"
                        className="!p-1"
                        aria-label="Search"
                        size="sm"
                      />
                      <Button className="bg-white border-1 !border-gray-200 " variant="outline-secondary" size="sm" type="submit">
                        <span className="material-icons-outlined text-gray-700 hover:!text-gray-500 md-18">search</span>
                      </Button>
                    </InputGroup>
                  </Form.Group>
                </Form>
              </div>
            </Navbar.Collapse>
          </>) : (<><Navbar.Collapse className="justify-content-end space-x-2">
              <Navbar.Text>
                  <a className="signup-link shadow" href="/">Login</a>
              </Navbar.Text>
              <Navbar.Text>
                <a className="signup-link shadow" href="/signup">Create an account</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </>)
          }
        </Container>
      </Navbar>
    </>
  );
}