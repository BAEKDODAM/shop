import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import {Nav} from 'react-bootstrap';
import {addItem} from './../store';
import {useDispatch} from 'react-redux';

function Detail(props) {

    let {id} = useParams();
    let 찾은상품 = props.shoes.find((x)=> x.id == id )
    let [alert, setAlert] = useState(true)
    let [tab, setTab] = useState(0)
    let [fade2, setFade2] = useState('')
    let dispatch = useDispatch()

    useEffect(()=>{// Detail 컴포넌트가 mount, update될 때 실행됨. html  랜더링 후 동작함.
        let a = setTimeout(()=>{ setAlert(false)},2000)
        setFade2('end')
        return ()=>{
            // 기존 타이머 제거, 타이머 사용할 때 안전하게 사용 가능
            clearTimeout(a)
            setFade2('')
        } // useEffect 동작 전에 실행됨, 기존 코드 지우는 거 여기에 많이 작성함

    }, []) // useEffect 실행조건 넣을 수 있는 곳은 [], [] 안이 변할 때마다 실행됨
    return(
        <div className="container" >
            <div className={`container start ${fade2}`}>
            {
                alert == true ? <div className="alert alert-warning">2초 이내 구매시 할인</div> : null
            }
            </div>
            <div className="row">
                <div className="col-md-6">
                <img src={"https://codingapple1.github.io/shop/shoes"+(찾은상품.id+1)+".jpg"} width="100%" />
                </div>
                <div className="col-md-6">
                <h4 className="pt-5">{찾은상품.title}</h4>
                <p>{찾은상품.content}</p>
                <p>{찾은상품.price}원</p>
                <button className="btn btn-danger" onClick={()=>{
                    dispatch(addItem( {id: 찾은상품.id, name:찾은상품.title, count:1} ))
                }}>주문하기</button> 
                </div>
            </div>
            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={()=>setTab(0)}>버튼 0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={()=>setTab(1)}>버튼 1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={()=>setTab(2)}>버튼 2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab}/>

        </div> 
    )
}

function TabContent({tab}) {
    let [fade, setFade] = useState('')

    useEffect (()=>{
        setTimeout(()=> { setFade('end')  }, 100)
        
        return ()=>{ // clean up function: useEffect 동작하기 전에 실행하고자 하는 코드 작성
            setFade('')
        }
    }, [tab])

    return (
    <div className={`start ${fade}`}>
        {[ <div>내용0</div>, <div>내용1</div>, <div>내용2</div> ][tab]}
    </div>)
} 



export default Detail;