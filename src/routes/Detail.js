import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';


function Detail(props) {

    let {id} = useParams();
    let 찾은상품 = props.shoes.find((x)=> x.id == id )
    let [alert, setAlert] = useState(true)

    useEffect(()=>{// Detail 컴포넌트가 mount, update될 때 실행됨. html  랜더링 후 동작함.
        setTimeout(()=>{ setAlert(false) },2000)
    }, [])
    return(
        <div className="container">
            {
                alert == true ? <div className="alert alert-warning">2초 이내 구매시 할인</div> : null
            }
            <div className="row">
                <div className="col-md-6">
                <img src={"https://codingapple1.github.io/shop/shoes"+(찾은상품.id+1)+".jpg"} width="100%" />
                </div>
                <div className="col-md-6">
                <h4 className="pt-5">{찾은상품.title}</h4>
                <p>{찾은상품.content}</p>
                <p>{찾은상품.price}원</p>
                <button className="btn btn-danger">주문하기</button> 
                </div>
            </div>
        </div> 
    )
}

export default Detail;