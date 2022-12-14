import './App.css';
import { useEffect, useState } from 'react';
import { Button, Navbar, Container, Nav, Row, Col, NavLink } from 'react-bootstrap';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail';
import axios from 'axios';
import Cart from './routes/Cart';
import {useQuery} from "react-query";

function App() {

  let [shoes, setShoes] = useState(data); //서버에서 가져온 데이터라고 가정
  let navigate = useNavigate(); // 페이지 이동 도와줌
  let n=0;

  let result = useQuery('작명', ()=>{
    return axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
      return a.data
    })
  })

  useEffect(()=>{
    if (localStorage.getItem('watched')==null){
      console.log('null')
      localStorage.setItem('watched', JSON.stringify( [] ))
    }
  })

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/cart') }}>Cart</Nav.Link>
            <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            { result.isLoading ? '로딩중...' : result.data.name }
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={
          <>
          <div className="main-bg"></div>
          <div className="container">
            <div className="row">
            {
              shoes.map((a,i)=>{
                return (
                  <Card shoes={shoes[i]} i={i}></Card>
                )
              })
            }
            </div>
          </div>
          <button onClick={()=>{
            n+=1
            if(n==1) {
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((결과)=>{ 
                let copy = [...shoes, ...결과.data];
                setShoes(copy);
              }) // 요청 결과는 axios.get('url').then()
              .catch(()=>{console.log('실패')})
            }
          }}>더보기</button>
          </>
        }/>
        <Route path='/detail/:id' element={ <Detail shoes={shoes} /> } />
        <Route path="/cart" element={ <Cart/> }/>
        <Route path='*' element={<div>없는 페이지</div> } />
      </Routes>
    </div>
  );
}


function Card(props) {
  let navigate = useNavigate();
  let onClickItem=(i)=>{
    navigate(`/detail/${i}`)
  }
  return (
    <div className="col-md-4" onClick={()=>onClickItem(props.i)}>
      <img src={'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg'} width="80%" />
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.price }</p>
    </div>
    
  )
}

export default App;
