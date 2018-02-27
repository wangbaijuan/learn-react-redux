import React from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from 'react-router-dom'

const Header = () => {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/roster'>Roster</Link></li>
                    <li><Link to='/schedule'>Schedule</Link></li>
                </ul>
            </nav>
        </header>
    )
}

const Main = () => (
    <main>
        <Switch>

            <Route exact path='/' component={Home}/> {/*准确匹配path*/}
            {/*
            /roster/:number并未包含在<Switch>中。它由<Roster>组件负责在路径包含'/roster'的情形下进行渲染
            */}
            <Route path='/roster' component={Roster}/>
            <Route path='/schedule' component={Schedule}/>
        </Switch>
    </main>
)

const Home = () => (
    <h2>Home exact / </h2>
)

const PlayerAPI = {
    players: [
        { number: 1, name: "Ben Blocker", position: "G" },
        { number: 2, name: "Dave Defender", position: "D" },
        { number: 3, name: "Sam Sweeper", position: "D" },
        { number: 4, name: "Matt Midfielder", position: "M" },
        { number: 5, name: "William Winger", position: "M" },
        { number: 6, name: "Fillipe Forward", position: "F" }
    ],
    all: function() { return this.players},
    get: function(id) {
        return this.players.find(p => p.number === id)
    }
}

// <Roster>用来渲染所有以/roster开始的全部路由。
const Roster = ({match}) => (
    <div>
        <h2>This is a roster page!</h2>
        <Switch>
            <Route exact path={`${match.url}`} component={RosterList}/>
            {/*会获取到一个对象：{ number: '6' }*/}
            <Route path={`${match.url}/:number`} component={Player}/>
        </Switch>
    </div>
)

const RosterList = () => {
    let allPlayers = [
        {
            number: 1,
            name:'shaonian'
        },{
            number: 2,
            name:'bai'
        }
    ]
    return (
        <div>
            <ul>
                {
                    allPlayers.map(p => (
                        <li key={p.number}>
                            {/*
                               在各个页面间切换。如果使用锚点元素（<a/>）实现，在每次点击时页面将被重新加载
                               React Router提供了<Link>组件用来避免这种状况的发生。
                               当你点击<Link>时，URL会更新，组件会被重新渲染，但是页面不会重新加载。
                            */}
                            <Link to={`/roster/${p.number}`}>{p.name}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

// <Player>组件可以使用props.match.params对象来确定需要被渲染的运动员的数据。
const Player = (props) => {
    console.log(props.match) //{path: "/roster/:number", url: "/roster/1", isExact: true, params: {…}}
    console.log(props.match.params);//object: {number: "1"}
    console.log(JSON.stringify(props.match.params)); //string:{"number":"1"}
    let player = PlayerAPI.get(parseInt(props.match.params.number, 10));
    //
    if (!player) {
        return <div>Sorry, but the player was not found</div>
    }
    return (
        <div>
            <h3>Roster player: {player.number}</h3>
            <p>Roster name: {player.name}</p>
            <Link to='/roster'>Back</Link>
        </div>
    )
}

const Schedule = () => (
    <h2>Schedule list</h2>
)

const App = () => (
    <div>
        <Header/>
        <Main/>
    </div>
)


ReactDOM.render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
),
document.getElementById('root'));