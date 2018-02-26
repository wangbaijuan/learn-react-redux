# state:
# store: 管理 state
# action: 通过 action 修改 state
# reducer: 调用 action

每个reducer都有自己要负责的state,和action

state
应用的数据是一个对象.
可以放在store中管理．
修改应用的数据要指派动作(action),
动作会在reducer中处理．

reducer 收到动作,检查动作的类型,然后根据动作里的其他数据,加工成应用需要的数据.再返回新生成的数据.
subscribe 应用可以订阅数据发生的变化,如果应用发生变化,我们可以做一些反应.比如重新渲染页面,显示修改之后的数据.


1. yarn add redux
