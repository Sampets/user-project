import "./App.css";
import UserList from "./components/UserList";
import Homepage from "./components/Homepage";
import { Routes, Route } from "react-router-dom";
import UserForm from "./components/UserForm";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

function App() {
  return (
    <>
      <Container className="d-flex justify-content-center mt-3">
        <Card style={{ width: "58rem" }}>
          <Card.Body>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/new-user" element={<UserForm />} />
              <Route path="/users/:id" element={<UserForm />} />
            </Routes>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default App;
