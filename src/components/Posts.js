import React from 'react'
import { connect } from 'react-redux'

// Posts.contextTypes = {
//     store: PropTypes.object
// }


const PostItem = ({entity, onClickDeleteButton }) => {

    return (
        <div>
            <h3>{entity.title}</h3>
            <button onClick={ () => onClickDeleteButton(entity.id) }>DELETE</button>
        </div>

    )
}

// ui 组件 (presentational component): 自负责ui, 没有状态, 所有数据由参数 (this.props) 提供, 不使用 redux api
// 容器组件 (container component):　管理数据和业务逻辑,　不负责 ui 呈现, 带有内部状态, 使用 redux api.

// 如果一个组件既有ui又有业务,怎么？
// 将他拆分成下面的结构：外面是一个容器组件, 里面包含一个 ui 组件.
// 前者负责与外部的通信,将数据传递后者,后者渲染出视图.

// react-redux 规定, 所有 ui 组件都有用户提供, 容器组件由 react-redux 自动生成, 也就是说,
// 用户负责视觉层, 状态管理则是全部交给 react-redux.
const PostList = ({entities, onClickDeleteButton }) => {
    const items = entities.map(item =>
        <PostItem
            key={ item.id }
            entity = { item }
            onClickDeleteButton = { onClickDeleteButton }
        />
    );

    return (
        <div>
            {items}
        </div>
    )

}

// 外部 state 对象到 ui props 对象的映射关系
// 返回一个对象.每一个键值对都是一个映射.
// 会订阅 store, 每当 state 更新的时候,　会自动执行, 重新计算 ui 组件参数, 触发 ui 组件的重新渲染.
const mapStateToProps = (state) => {
    return {
        entities: state.posts
    }
}

// ui 组件参数到 store.dispatch 方法的映射．
// 定义了那些操作应该当做 action, 传给　store.他可以是一个函数，也可以是一个对象．
const mapDispatchToProps = (dispatch) => {
    return {
        onClickDeleteButton: (id) => {
            dispatch({
                type: 'DELETE_POST',
                id
            })
        }
    }
}

// 用于从 ui 组件生成容器组件. connect 的意思, 就是将这两种组件连起来.
const Posts = connect(
    mapStateToProps,// 负责输入逻辑,将 外部数据 (state 对象) 映射到 ui 组件的参数(props)
    mapDispatchToProps// 负责输出逻辑, 用户发出的动作, 如何变成 action 对象, 从 ui 组件传出去. 用户对 ui 组件的操作映射成 action.
)(PostList)


// class Posts extends Component {
//
//     static contextTypes = {
//         store: PropTypes.object
//     }
//
//     constructor(props, context) {
//         super(props);
//         console.log('Context: ', context)
//         console.log('State: ', context.store.getState())
//         this.store = context.store;
//         this.unsubscribe = this.store.subscribe(() => this.forceUpdate())
//     }
//
//     // 移除
//     componentWillUnMount(){
//         console.log("will un mount")
//         this.unsubscribe();
//     }
//
//     onClickDeleteButton = (id) => {
//
//         this.store.dispatch({
//             type: 'DELETE_POST',
//             id
//         })
//     }
//
//     render() {
//         // postList 只负责显示,那么,数据和行为都可以通过 container 这个组件定义.
//         // 然后通过属性的方式传递给 postList
//         const entities = this.store.getState().posts;
//         return (
//             <div>
//
//                 <PostList
//                     entities={ entities }
//                     onClickDeleteButton={ this.onClickDeleteButton }
//                 />
//             </div>
//         )
//     }
// }

export default Posts;