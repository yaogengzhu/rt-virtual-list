import { data } from './mock'
import './index.less'
const App = () => {
	const { list } = data
	return (
		<ul>
			{ list.map((item) => (
				<li key={ item.id }>{ item.title }</li>
			)) }
		</ul>
	)
}

export default App
