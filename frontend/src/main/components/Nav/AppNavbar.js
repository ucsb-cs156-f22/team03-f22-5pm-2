import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";
import AppNavbarLocalhost from "main/components/Nav/AppNavbarLocalhost";

export default function AppNavbar({
  currentUser,
  systemInfo,
  doLogout,
  currentUrl = window.location.href,
}) {
  return (
    <>
      {(currentUrl.startsWith("http://localhost:3000") ||
        currentUrl.startsWith("http://127.0.0.1:3000")) && (
        <AppNavbarLocalhost url={currentUrl} />
      )}
      <Navbar
        expand="xl"
        variant="dark"
        bg="dark"
        sticky="top"
        data-testid="AppNavbar"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            Example
          </Navbar.Brand>

          <Navbar.Toggle />

          <>
            {/* be sure that each NavDropdown has a unique id and data-testid */}
          </>

          <Navbar.Collapse>
            {/* This `nav` component contains all navigation items that show up on the left side */}
            <Nav className="me-auto">
              {
                systemInfo?.springH2ConsoleEnabled && (
                  <>
                    <Nav.Link href="/h2-console">H2Console</Nav.Link>
                  </>
                )
              }
              {
                systemInfo?.showSwaggerUILink && (
                  <>
                    <Nav.Link href="/swagger-ui/index.html">Swagger</Nav.Link>
                  </>
                )
              }
              {
                hasRole(currentUser, "ROLE_ADMIN") && (
                  <NavDropdown title="Admin" id="appnavbar-admin-dropdown" data-testid="appnavbar-admin-dropdown" >
                    <NavDropdown.Item as={Link} to="/admin/users">Users</NavDropdown.Item>
                  </NavDropdown>
                )
              }
              {
                hasRole(currentUser, "ROLE_USER") && (
                  <NavDropdown title="Todos" id="appnavbar-todos-dropdown" data-testid="appnavbar-todos-dropdown" >
                    <NavDropdown.Item as={Link} to="/todos/list">List Todos</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/todos/create">Create Todo</NavDropdown.Item>
                  </NavDropdown>
                )
              }
               {
                hasRole(currentUser, "ROLE_USER") && (
                  <NavDropdown title="Dining Commons" id="appnavbar-dining-commons-dropdown" data-testid="appnavbar-dining-commons-dropdown" >
                    <NavDropdown.Item as={Link} to="/diningCommons/list" data-testid="appnavbar-dining-commons-list">List</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/diningCommons/create" data-testid="appnavbar-dining-commons-create">Create</NavDropdown.Item>
                  </NavDropdown>
                )
              }
              {
                hasRole(currentUser, "ROLE_USER") && (
                  <NavDropdown title="Articles" id="appnavbar-articles-dropdown" data-testid="appnavbar-articles-dropdown" >
                    <NavDropdown.Item as={Link} to="/Articles/list" data-testid="appnavbar-articles-list">List</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/Articles/create" data-testid="appnavbar-articles-create">Create</NavDropdown.Item>
                  </NavDropdown>
                )
              }
              {
                hasRole(currentUser, "ROLE_USER") && (
                  <NavDropdown title="UCSBDates" id="appnavbar-ucsbdates-dropdown" data-testid="appnavbar-ucsbdates-dropdown" >
                    <NavDropdown.Item as={Link} to="/ucsbdates/list" data-testid="appnavbar-ucsbdates-list">List</NavDropdown.Item>
                    {
                      hasRole(currentUser, "ROLE_ADMIN") && (
                        <NavDropdown.Item as={Link} to="/ucsbdates/create" data-testid="appnavbar-ucsbdates-create">Create</NavDropdown.Item>
                      )
                    }
                  </NavDropdown>
                )
              }
              {
                hasRole(currentUser, "ROLE_USER") && (
                  <NavDropdown title="UCSBOrganizations" id="appnavbar-ucsborganizations-dropdown" data-testid="appnavbar-ucsborganizations-dropdown" >
		                <NavDropdown.Item as={Link} to="/UCSBOrganizations/list" data-testid="appnavbar-ucsborganizations-list">List</NavDropdown.Item>
	                  {
	                    hasRole(currentUser, "ROLE_ADMIN") && (
		                    <NavDropdown.Item as={Link} to="/UCSBOrganizations/create" data-testid="appnavbar-ucsborganizations-create">Create</NavDropdown.Item>
	                    )
	                  }
		              </NavDropdown>
		            )
	            }
              {
                hasRole(currentUser, "ROLE_USER") && (
                  <NavDropdown title="Help Requests" id="appnavbar-helprequests-dropdown" data-testid="appnavbar-helprequests-dropdown" >
                    <NavDropdown.Item as={Link} to="/helprequests/list" data-testid="appnavbar-helprequests-list">List</NavDropdown.Item>
                    {
                      hasRole(currentUser, "ROLE_ADMIN") && (
                        <NavDropdown.Item as={Link} to="/helprequests/create" data-testid="appnavbar-helprequests-create">Create</NavDropdown.Item>
                      )
                    }
                  </NavDropdown>
                )
              }
              {
                hasRole(currentUser, "ROLE_USER") && (
                  <NavDropdown title="Menu Item Review" id="appnavbar-menuitemreview-dropdown" data-testid="appnavbar-menuitemreview-dropdown" >
                    <NavDropdown.Item as={Link} to="/menuitemreview/list" data-testid="appnavbar-menuitemreview-list">List</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/menuitemreview/create" data-testid="appnavbar-menuitemreview-create">Create</NavDropdown.Item>
                  </NavDropdown>
                )
              }
              {
                hasRole(currentUser, "ROLE_USER") && (
                  <NavDropdown title="UCSBDiningCommonsMenuItem" id="appnavbar-ucsb-dining-commons-menuitem-dropdown" data-testid="appnavbar-ucsb-dining-commons-menuitem-dropdown" >
                        <NavDropdown.Item as={Link} to="/diningCommonsMenuItem/list" data-testid="appnavbar-ucsb-dining-commons-menuitem-list">List</NavDropdown.Item>
                    {
                      hasRole(currentUser, "ROLE_ADMIN") && (
                        <NavDropdown.Item as={Link} to="/diningCommonsMenuItem/create" data-testid="appnavbar-ucsb-dining-commons-menuitem-create">Create</NavDropdown.Item>
                      )
                    }
                  </NavDropdown>
                )
              }

              {hasRole(currentUser, "ROLE_USER") && (
                <NavDropdown title="Recommendation" id="appnavbar-recommendation-dropdown" data-testid="appnavbar-recommendation-dropdown" >
                  <NavDropdown.Item as={Link} to="/recommendation/list" data-testid="appnavbar-recommendation-list" >List</NavDropdown.Item>
                  {
                    hasRole(currentUser, "ROLE_ADMIN") && (
                    <NavDropdown.Item as={Link} to="/recommendation/create" data-testid="appnavbar-recommendation-create">Create</NavDropdown.Item>
                    )
                  }
                </NavDropdown>
              )}
            </Nav>

            <Nav className="ml-auto">
              {/* This `nav` component contains all navigation items that show up on the right side */}
              {currentUser && currentUser.loggedIn ? (
                <>
                  <Navbar.Text className="me-3" as={Link} to="/profile">
                    Welcome, {currentUser.root.user.email}
                  </Navbar.Text>
                  <Button onClick={doLogout}>Log Out</Button>
                </>
              ) : (
                <Button href="/oauth2/authorization/google">Log In</Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
