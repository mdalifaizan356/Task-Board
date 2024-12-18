// import React, { useState, useEffect } from "react";
// import { Navbar, Nav, Container, Row, Col, Offcanvas, Dropdown, Modal, Button} from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link, useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';
// import UserHeader from "../../Components/UserHeader";
// import GetAllTask from '../../Components/GetAllBoard';


// const UserDashboard = () => {
//   const [modalShow, setModalShow] = React.useState(false);

//   function MyVerticallyCenteredModal(props) {
//     return (
//       <Modal
//         {...props}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="contained-modal-title-vcenter">
//             Modal heading
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <h4>Centered Modal</h4>
//           <p>
//             Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//             dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
//             consectetur ac, vestibulum at eros.
//           </p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={props.onHide}>Close</Button>
//         </Modal.Footer>
//       </Modal>
//     );
//   }

//   return (
//     <>
//     <UserHeader/>
//     <Container className="mt-3">
//       <Row>
//         <Col>
//         <Button variant="primary" onClick={() => setModalShow(true)}>
//         Add New Board
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//         </Col>
//       </Row>
//     </Container>
      
//     </>
//   );
// };

// export default UserDashboard;
