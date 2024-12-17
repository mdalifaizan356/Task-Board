import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import UserHeader from "../Components/UserHeader";

const PNF = () => {

  return (
    <>
    <UserHeader/>
     <Container style={{ maxWidth: "500px", marginTop: "150px" }}>
      <h1 className="text-center mb-4">404 </h1>
      <p className="text-center mb-4">Page Not Found</p>
    </Container>
    </>
  );
};

export default PNF;
