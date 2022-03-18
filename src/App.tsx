import React from 'react'
import { data } from './mock'
import './index.less'


type IItem = {
	title: string
	form: string
	time: string
}
const Item: React.FC<IItem> = (props) => {
	const { title,from,time,image } = props
	return (
		<div className="item">
			<div className="textContet">
				<div>{ title }</div>
				<div>
					<span className="tip">{ from }</span>
					<span className="tip one">{ time }</span>
				</div>
			</div>
			<div className="img">
				<img src={ image } alt="" />
			</div>
		</div>
	)
}
const App = () => {
	const { list } = data
	console.log(list)
	return (
		<div>
			{
				list.map(item => (
					<Item key={ item.id } { ...item } />
				))
			}
		</div>
		// <ul>
		// 	{ list.map((item) => (
		// 		<li key={ item.id }>{ item.title }</li>
		// 	)) }
		// </ul>
	)
}

export default App
