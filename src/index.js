import React from 'react'
import { render } from 'react-dom';
import {
 createStore
} from 'redux'

import {Provider} from 'react-redux'

import mainReducer  from './learn-react-redux/reducers'
import App from './components/App'

// 需要一种方法把 store 传递给应用里的所有组件
// 这样就可以通过 store 得到应用中的数据,
// 也可以指派动作.

const store = createStore(mainReducer)

const log = () => {
    console.log(store.getState())
}

store.subscribe(log)

log()

store.dispatch({
    type: 'ADD_POST',
    post: {
        id:1,
        title: 'welcome to baijuan blog 1'
    }
})

store.dispatch({
    type: 'ADD_POST',
    post: {
        id:2,
        title: ' react redux'
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

render(
    <Provider store={ store }>
        <App/>
    </Provider>,
    document.getElementById('root')
)