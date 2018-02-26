import {
    combineReducers
} from 'redux'

// reducer
const postReducer = (state = [], action) => {
    switch (action.type) {
        // prue function: 不能直接修改state的值
        case 'ADD_POST':
            return [
                ...state,
                { ...action.post }
            ]
        case 'DELETE_POST':
            // filter 返回新的数组. 不能直接修改state的值
            // 要根据动作生成新的 state
            return state.filter(item =>
                action.id !== item.id
            )
        default:
            return state;
    }
}

const commentReducer = (state = [], action) => {
    switch (action.type) {
        // prue function: 不能直接修改state的值
        case 'ADD_COMMENT':
            return [
                ...state,
                { ...action.comment }
            ]
        default:
            return state;
    }
}

const mainReducer = combineReducers({
    posts: postReducer,
    comments: commentReducer,
})

export default mainReducer