import React,{ useRef,useEffect } from 'react'
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
	const domRef = useRef()
	const computedDevicesHight = () => {
		const dom = domRef.current
		if (dom) {
			console.log(dom.offsetHeight,'dom.offsetHeight ')
			// 计算一个屏幕可以放下多少
			console.log(~~(dom.offsetHeight / 100) + 2)
		}
	}

	const onScroll = () => {
		const dom = domRef.current
		if (dom) {
			console.log(dom.scrollTop,'xxx')
		}

	}

	useEffect(() => {
		computedDevicesHight()
		const dom = domRef.current
		if (dom) {
			console.log(dom)
			dom.addEventListener('scroll',onScroll,{
				passive: true,
			})
		}
		window.addEventListener('resize',computedDevicesHight)
		return () => {
			window.removeEventListener('resize',computedDevicesHight)
		}
	},[])
	return (
		<div className="wrapper">
			<div className="scrollContainer" ref={ domRef }>
				{
					list.map(item => (
						<Item key={ item.id } { ...item } />
					))
				}
			</div>
		</div>
	)
}

export default App
