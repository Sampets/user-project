import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createUser, getUser } from "../api/UserService";
import { Link, useNavigate, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

function UserForm() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    gender: "",
    birthdate: "",
  });

  const [address, setAddress] = useState({
    workAddress: "",
    homeAddress: "",
  });

  const [validated, setValidated] = useState(false);

  const [userFound, setUserFound] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getUser(id)
        .then((response) => {
          console.log(response.data);
          const picked = (({ name, surname, gender, birthdate }) => ({
            name,
            surname,
            gender,
            birthdate,
          }))(response.data);
          setFormData(picked);

          setAddress(response.data.address);

          setUserFound(true);
        })
        .catch((error) => {
          console.error("User not found");
          setUserFound(false);
        })
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddress = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      const completeFormData = { address, ...formData, id };

      console.log("Complete form data: " + completeFormData);
      createUser(completeFormData)
        .then((response) => {
          console.log(response.data);
          navigator("/");
        })
        .catch((error) => console.error(error));
    }
    e.preventDefault();
    setValidated(true);
  };

  const getIsFormValid = () => {
    return (
      formData.name && formData.surname && formData.gender && formData.birthdate
    );
  };

  return (
    <>
      {" "}
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden text-center">Loading...</span>
        </Spinner>
      ) : userFound ? (
        <>
          <Row className="d-flex justify-content-center">
            {id ? (
              <>
                <h2 className="text-center mt-5">
                  User with id={id} is displayed.
                </h2>
                <h4 className="text-center mb-5">
                  You can edit the user by changing fields and pressing Submit
                </h4>
              </>
            ) : (
              <h2 className="text-center m-5">Add new user.</h2>
            )}
          </Row>
          <Row className="d-flex justify-content-center">
            <Col className="col-lg-5 col-md-7 mx-auto">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter a first name"
                    value={formData.name}
                    onChange={handleFormChange}
                    name="name"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please fill out a name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formSurname">
                  <Form.Label>Surname</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter a last name"
                    value={formData.surname}
                    onChange={handleFormChange}
                    name="surname"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please fill out a surname.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGender">
                  <Form.Label>Gender</Form.Label>{" "}
                  <Form.Select
                    aria-label="Gender select"
                    value={formData.gender}
                    onChange={handleFormChange}
                    name="gender"
                    required
                  >
                    <option></option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please choose a gender from the list.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBirthdate">
                  <Form.Label>Birthdate</Form.Label>
                  <Form.Control
                    type="date"
                    value={formData.birthdate}
                    onChange={handleFormChange}
                    name="birthdate"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please fill out a date of birth.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formWorkAddress">
                  <Form.Label>Work Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={address.workAddress}
                    onChange={handleAddress}
                    name="workAddress"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formHomeAddress">
                  <Form.Label>Home Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={address.homeAddress}
                    onChange={handleAddress}
                    name="homeAddress"
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </>
      ) : (
        <Row className="d-flex justify-content-center">
          <Col className="col-lg-5 col-md-7 text-center mx-auto m-5">
            <h1>User not found</h1>
            <Link to="/">Return Home</Link>
          </Col>
        </Row>
      )}
    </>
  );
}

export default UserForm;
