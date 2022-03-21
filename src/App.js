import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { useNavigate } from "react-router-dom";


function App() {
  let navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // The provided API (on server side) should accepting request from localhost, so I use Chrome extension called Allow CORS 
    axios.get('https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-categories').then((res) => {
      setCategories(res.data);
    });
  }, []);

  const onClickCategory = (categoryId) => {
    navigate(`/category/${categoryId}`);
  }

  const renderCategory = () => {
    return categories.map((el, index) => {
      return (
        <Col
          key={index} md="3" sm="6"
          onClick={() => onClickCategory(el.id)}
        >
          <Card className="my-2 category-card">
            <CardBody>
              <CardTitle className="category-title">
                {el.name}
              </CardTitle>
            </CardBody>
          </Card>
        </Col>
      );
    });
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <h2 className="my-4">
              Book List App
            </h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5 className="my-4">
              Select Category
            </h5>
          </Col>
        </Row>
        <Row>
          {renderCategory()}
        </Row>
      </Container>
    </div>
  );
}

export default App;
