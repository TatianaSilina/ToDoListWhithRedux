import '../App.css';
import {FilterValuesType} from "../state/TodoListsReducer";

type propsType={
    name: string,
    callBack: () => void
    filter?: FilterValuesType
}
export const Button = (props:propsType) => {
    
    const onClickHandler = () => {
        props.callBack()
    }
    return (
        <button className={props.filter === props.name ? 'activeFilter' : ''} onClick={onClickHandler}>{props.name}</button>
    )
}