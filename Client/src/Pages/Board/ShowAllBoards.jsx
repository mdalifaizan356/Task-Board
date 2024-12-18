import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../ContextProvider/UserContextProvider";
import axios from "axios";
import { Navbar, Nav, Container, Row, Col, Offcanvas, Dropdown, Modal, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserHeader from '../../Components/UserHeader';

const ShowAllBoards = () => {
  const [boardData, setBoardData] = useState(null);
  const { user } = useContext(UserContext);
  const userId = user ? user._id : null;

  const fetchBoardData = async () => {
    try {
      if (!userId) return;
      const response = await axios.get(`http://localhost:6080/newboard/showAllBoard/${userId}`);
      if (response.data.boards) {
        setBoardData(response.data.boards);
      } else {
        setBoardData([]);
      }
    } catch (error) {
      console.error("Error fetching board data:", error);
      setBoardData([]);
    }
  };

  useEffect(() => {
    fetchBoardData();
  }, [userId]);

  return (
    <>
      <UserHeader />
      <div className="mt-2">
             <Button><h1>+</h1><p>Create New Board</p></Button>
            </div>
      <div className="container mt-4 border border-danger d-flex">
        {boardData === null ? ( 
          <h2>Loading...</h2>
        ) : boardData.length === 0 ? (
          <h2>No Boards Available</h2>
        ) : (
          boardData.map(board => (
            <div key={board._id} className="border border-dark m-2">
              <h1>{board.boardName}</h1>
              <p>Board ID: {board.boardId}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ShowAllBoards;
