import { useState, memo } from 'react';
import {Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, increase}  from './../store';
import {addCount} from './../store'

// 내가 원하는 자식 컴포넌트의 재랜더링을 막고 싶을 때 memo 사용
let Child = memo( function() { 
    console.log("재랜더링됨")
    //return <div>자식임</div>
})
function Cart() {

    let state = useSelector((state)=>{return state}) // Redux store 가져와줌
    let dispatch = useDispatch() // store.js에 요청 보냄
    let [count, setCount] = useState(0)

    // + 버튼을 누를 때마다 재랜더링이 발생하고,
    // Cart가 재랜더링 되면 cart의 모든 자식 컴포넌트(Child)도 재랜더링 된다
    // memo 사용하여 방지 가능
    return (
        <div>
            <Child></Child>

            <div className='cart_member'>{state.user.name}, {state.user.age}의 장바구니</div>
            {/*<button onClick={() => {
                dispatch(increase(5))
            }}>버튼</button>*/}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    state.cart.map((a, i)=>{
                        return(
                            <tr key={i}>
                                <td>{a.id}</td>
                                <td>{a.name}</td>
                                <td>{a.count}</td>
                                <td>
                                    <button className='button2' onClick={()=>{
                                        dispatch(addCount(a.id))
                                    }}>+</button>
                                </td>
                            </tr>
                        )
                        
                    })
                    }
                </tbody>
            </Table>
        </div>
        
    )
}

export default Cart