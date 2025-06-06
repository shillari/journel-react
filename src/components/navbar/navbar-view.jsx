import { Button, Form, Image } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector} from "react-redux";
import { toggleSlidebar } from "../../redux/reducers/sidebarSlice";

export const NavbarView = () => {
  const user = useSelector((state => state.user.username));
  const dispatch = useDispatch();

  const toggleSideMenu = (e) => {
    e.preventDefault();
    console.log("toggle clicked")
    dispatch(toggleSlidebar());
  }

  return (
    <>
      <Navbar className="navbar h-11 shadow-xl">
        <Container>
          {user ?
          (<>
          <Navbar.Text className="bg-none mr-5">
            <button onClick={toggleSideMenu} className="bg-transparent cursor-pointer p-0 px-2 rounded-lg border-0" variant="light">
              <span className="material-icons icon-default hover:!text-white md-18">menu</span>
            </button>
          </Navbar.Text>
            
            <Navbar.Brand href="#home">
              <Image className="h-10" src="logo.svg" />
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    size="sm"
                  />
                  <Button className="btn-default" size="sm" type="submit">Search</Button>
                </Form>
                <Navbar.Text className="bg-none ml-5">
                  <button className="bg-transparent cursor-pointer p-0 px-2 border-0 rounded-lg" variant="light">
                    <span className="material-icons icon-default hover:!text-white md-18">filter_alt</span>
                  </button>
                </Navbar.Text>
            </Navbar.Collapse>
          </>) : (<><Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Create account
              </Navbar.Text>
            </Navbar.Collapse>
          </>)
          }
        </Container>
      </Navbar>
    </>
  );
}