import './App.css';
import { useState } from 'react';
import { Button, Navbar, Container, Nav, Row, Col, NavLink } from 'react-bootstrap';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail';


function App() {
  let [shoes] = useState(data); //서버에서 가져온 데이터라고 가정
  let navigate = useNavigate(); // 페이지 이동 도와줌
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail') }}>Cart</Nav.Link>
            <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={
          <>
          <div className="main-bg"></div>
          <Container>
            <Row>
            {
                shoes.map((a,i)=>{
                  return (
                    <Card shoes={shoes[i]} i={i}></Card>
                  )
                })
              }
            </Row>
          </Container>
          </>
        }/>

        <Route path='/detail/:id' element={ <Detail shoes={shoes} /> } />
        <Route path='*' element={<div>없는 페이지</div> } />
      </Routes>
    </div>
  );
}


function Card(props) {
  return (
    <Col>
      <img src={"https://codingapple1.github.io/shop/shoes"+(props.i+1)+".jpg"} width="80%"></img>
        <h4>{props.shoes.title}</h4>
        <p>{props.shoes.content}</p>
    </Col>
  )
}

export default App;
