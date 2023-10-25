import './App.css';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Button, Navbar, Container, Nav, Row, Col, NavLink } from 'react-bootstrap';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import {useQuery} from "react-query";

//import Detail from './routes/Detail';
//import Cart from './routes/Cart';

// 메인 페이지에서 디테일 페이지와 장바구니 페이지는 꼭 바로 import할 필요 없음
// 그래서 나중에 필요할 때 import 해오기 위해 lazy 사용
// 사이트 발행할 때 별도의 js 파일로 분리됨
const Detail = lazy(()=> import('./routes/Detail.js'))
const Cart = lazy(()=> import('./routes/Cart.js'))
// 단점: cart, detail 컴포넌트 로딩시간 발생
// 장점: 메인 페이지 로딩 속도 개선


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
            {/*<Nav.Link as={Link} to="/detail">Detail</Nav.Link>*/}
          </Nav>
          <Nav className="ms-auto">
            { result.isLoading ? '로딩중...' : result.data.name }
          </Nav>
        </Container>
      </Navbar>

      <Suspense fallback={<div>로딩중</div>}>
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
          <button className='button' onClick={()=>{
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
      </Suspense>
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
