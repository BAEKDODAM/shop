import {Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, increase}  from './../store';
import {addCount} from './../store'

function Cart() {

    let state = useSelector((state)=>{return state}) // Redux store 가져와줌
    let dispatch = useDispatch() // store.js에 요청 보냄

    return (
        <div>
            <h6>{state.user.name}, {state.user.age}의 장바구니</h6>
            <button onClick={() => {
                dispatch(increase(5))
            }}>버튼</button>

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
                                    <button onClick={()=>{
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