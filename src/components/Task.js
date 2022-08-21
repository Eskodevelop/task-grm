/* eslint-disable */
import React, { useState } from "react";
import "./Task.css";
import { Button, Table, Modal, Form } from "react-bootstrap";

const list = [
  {
    position: 1,
    name: "Item1",
    score: 0,
  },
  {
    position: 2,
    name: "Item2",
    score: 0,
  },
  {
    position: 3,
    name: "Item3",
    score: 0,
  },
  {
    position: 4,
    name: "Item4",
    score: 0,
  },
  {
    position: 5,
    name: "Item5",
    score: 0,
  },
  {
    position: 6,
    name: "Item6",
    score: 0,
  },
];

const Task = () => {
  const [items, setItems] = useState(list);
  const [randomItems, setRandomItems] = useState([]);
  const [compareItems, setCompareItems] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    let temp = [...items];
    setCompareItems(temp.sort(() => 0.5 - Math.random()).slice(0, 2));
    setShow(true);
  };

  const handleSubmit = () => {
    let equal = false;
    for (let i = 0; i < randomItems.length; i++) {
      if (
        randomItems[i] ===
        compareItems[0].position + compareItems[1].position
      ) {
        console.log("Error");
        equal = true;
        return;
      }
    }
    if (!equal) {
      let array = compareItems[0].position + compareItems[1].position;
      setRandomItems([...randomItems, array]);
      if (compareItems[0].value > compareItems[1].value) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].position === compareItems[0].position) {
            items[i].score = items[i].score + 1;
          }
        }
      } else {
        for (let i = 0; i < items.length; i++) {
          if (items[i].position === compareItems[1].position) {
            items[i].score = items[i].score + 1;
          }
        }
      }

      let temp = items;
      temp.sort((a, b) => b.score - a.score);
      setItems(temp);
    }

    handleClose();
  };

  return (
    <div>
      <Modal className="modal" show={show} onHide={handleClose}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          {compareItems.length > 0 ? (
            <div>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={compareItems[0].name}
                  disabled
                ></Form.Control>
                <Form.Label>Score</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => {
                    compareItems[0].value = e.target.value;
                    let array = compareItems;
                    setCompareItems(array);
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={compareItems[1].name}
                  disabled
                ></Form.Control>
                <Form.Label>Score</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) => {
                    compareItems[1].value = e.target.value;
                    let array = compareItems;
                    setCompareItems(array);
                  }}
                ></Form.Control>
              </Form.Group>
            </div>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <Table className="table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, id) => (
            <tr key={id}>
              <td>{item.position}</td>
              <td>{item.name}</td>
              <td>{item.score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <button className="open-btn" onClick={() => handleShow()}>
        Open
      </button>
    </div>
  );
};

export default Task;
