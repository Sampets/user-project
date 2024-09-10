import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { deleteUser, getAllUsers } from "../api/UserService";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

function UserList() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // called when we enter the page to populate table
  useEffect(() => {
    getListOfUsers();
  }, []); // called only the first time because of empty dependency array

  //  Gets all users
  function getListOfUsers() {
    getAllUsers()
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }

  // Deletes a user
  function removeUser(id) {
    deleteUser(id)
      .then((response) => {
        getListOfUsers(); // Get updated list of users
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden text-center">Loading...</span>
        </Spinner>
      ) : users.length > 0 ? (
        <>
          <h2 className="text-center m-5">Users</h2>
          <Table className="text-center">
            <thead>
              <tr>
                <th>Name</th>
                <th>Surname</th>
                <th colSpan="2"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id} //onClick={() => navigator(`/users/${user.id}`)}  //this will not open in new tab (onNavigate hasn't implemented it)
                >
                  <td className="col-4">{user.name}</td>
                  <td className="col-4">{user.surname}</td>
                  <td className="col-2">
                    {" "}
                    <Link to={`/users/${user.id}`} target="_blank">
                      <Button
                        variant="outline-primary"
                        onClick={(e) => {
                          e.stopPropagation(); //stops click propagation to not click the link to user details
                        }}
                      >
                        Show User
                      </Button>
                    </Link>
                  </td>

                  <td className="col-2">
                    <Button
                      variant="outline-danger"
                      onClick={(e) => {
                        e.stopPropagation(); //stops click propagation to not click the link to user details
                        removeUser(user.id);
                      }}
                    >
                      Delete User
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <Row className="d-flex justify-content-center">
          <Col className="col-lg-5 col-md-7 text-center mx-auto m-5">
            <h1>No users found</h1>
            <Link to="/">Return Home</Link>
          </Col>
        </Row>
      )}
    </>
  );
}

export default UserList;
