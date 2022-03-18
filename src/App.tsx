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
	const startIndex = useRef(0) // 记录当前滚动的第一个数据的索引
	const endIndex = useRef(0) // 记录滚动页面的最后一个数据索引
	const domHeight = 100 // item 固定高度
	const itemSize = useRef(0) // 当前页面可以放置多少个item
	const deviceHeight = useRef(0) //
	const domRef = useRef()
	const { list } = data
	const computedDevicesHight = () => {
		const dom = domRef.current
		if (dom) {
			console.log(dom.offsetHeight,'dom.offsetHeight ')
			deviceHeight.current = dom.offsetHeight
			// 计算一个屏幕可以放下多少item
			itemSize.current = (~~(dom.offsetHeight / domHeight) + 2)
		}
	}

	const onScroll = () => {
		const dom = domRef.current
		if (dom) {
			const scrollTop = dom.scrollTop //页面滚动的高度
			startIndex.current = ~~(scrollTop / domHeight)
			endIndex.current = startIndex.current + itemSize.current
			// endIndex 需要进行判断
			if (!list[ endIndex.current ]) {
				endIndex.current = list.length - 1
			}

			console.log(endIndex.current,'xx')
			console.log(startIndex.current,'xx')
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
