import React, { Component } from 'react'
import PropTypes from 'prop-types'

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

// 展示组件
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


class Posts extends Component {

    static contextTypes = {
        store: PropTypes.object
    }

    constructor(props, context) {
        super(props);
        console.log('Context: ', context)
        console.log('State: ', context.store.getState())
        this.store = context.store;
    }

    onClickDeleteButton = (id) => {

        this.store.dispatch({
            type: 'DELETE_POST',
            id
        })
    }

    render() {
        // postList 只负责显示,那么,数据和行为都可以通过 container 这个组件定义.
        // 然后通过属性的方式传递给 postList
        const entities = this.store.getState().posts;
        return (
            <div>

                <PostList
                    entities={ entities }
                    onClickDeleteButton={ this.onClickDeleteButton }
                />
            </div>
        )
    }
}

export default Posts;