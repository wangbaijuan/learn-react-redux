import React from 'react'
// react 组件可以是一个 class,也可以是一个function.
// redux 把 react 分成了两种类型, 一种 container (class, 行为)组件, 一种　presentation (function, 展示组件, props)
import Posts from './Posts'
const App = () => {
    return (
        <div>
            <h1>App</h1>
            <Posts/>
        </div>
    )
}

export default App;