import {
    createStore
} from 'redux'

// state
{
    posts:[
        {id: 1, title: 'welcome to ninghao.net'}
    ]
    comments:[
        {id:1, postId:1, content: 'nice ~'}
    ]

}

// reducer
const postReducer = (state = [], action) => {
    switch (action.type) {
        // prue function: 不能直接修改state的值
        case 'ADD_POST':
            return [
                ...state,
                { ...action.post }
            ]
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

const mainReducer = (state = {}, action) => {
    return {
        posts: postReducer(state.posts, action),
        comments: commentReducer(state.comments, action)
    }
}
/*
const mainReducer = combineReducers({
    posts: postReducer,
    comments: commentReducer,
})

 */



// const counterReducer = (state = 0, action) => {
//     switch (action.type) {
//         case 'INCREMENT':
//             return state + 1;
//         default:
//             return state;
//     }
// }

const store = createStore(mainReducer);



const log = () => {
    console.log(store.getState())
}

log();

store.subscribe(log); // state 有变化都会执行

store.dispatch({
    type: 'ADD_POST',
    post: {
        id:1,
        title: 'welcome to baijuan blog'
    }
})
const a = {
    type: 'ADD_COMMENT',
    comment: {
        id:1,
        postId: 1,
        content: 'nice ~'
    }
};
store.dispatch(a);
console.log({...a})// == console.log(a)