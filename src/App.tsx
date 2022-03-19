import React,{ useRef,useEffect,useMemo,useState } from 'react'
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
	const [ startIndex,setStartIndex ] = useState(0)
	const [ endIndex,setEndIndex ] = useState(0)
	const domHeight = 100 // item 固定高度
	const itemSize = useRef(0) // 当前页面可以放置多少个item
	const deviceHeight = useRef(0) //
	const domRef = useRef()
	const { list } = data
	const computedDevicesHight = () => {
		const dom = domRef.current
		if (dom) {
			deviceHeight.current = dom.offsetHeight
			// 计算一个屏幕可以放下多少item
			const items = (~~(dom.offsetHeight / domHeight) + 2)
			itemSize.current = items
			console.log(items, 'items')
		}
	}

	const onScroll = () => {
		const dom = domRef.current
		if (dom) {
			const scrollTop = dom.scrollTop //页面滚动的高度
			const s1 = ~~(scrollTop / domHeight)
			const s2 = s1 + itemSize.current
			setStartIndex(s1)
			// endIndex 需要进行判断
			if (list[ s2 ]) {
				setEndIndex(s2)
			} else {
				setEndIndex(list.length)
			}
		}

	}

	/**
	 * init page
	 */
	useEffect(() => {
		const dom = domRef.current
		if (dom) {
			deviceHeight.current = dom.offsetHeight
			// 计算一个屏幕可以放下多少item
			const items = (~~(dom.offsetHeight / domHeight) + 2)
			itemSize.current = items
			setStartIndex(0)
			// 如果 list[items] 存在则
			if (list[ items ]) {
				setEndIndex(items)
			} else {
				setEndIndex(list.length)
			}
		}
	},[])

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

	const virtualList = useMemo(() => {
		console.log(startIndex,endIndex)
		return list.slice(startIndex,endIndex)
	},[ startIndex,endIndex ])

	const stylePadding = useMemo(() => {
		console.log()
		return {
			paddingTop: startIndex * domHeight + 'px',
			paddingBottom: (list.length - endIndex) * domHeight + 'px',
		}
	},[ startIndex,endIndex ])

	return (
		<div className="wrapper">

			<div className="scrollContainer" ref={ domRef }>
				<div style={ stylePadding }>
					{
						virtualList.map(item => (
							<Item key={ item.id } { ...item } />
						))
					}
				</div>
			</div>
		</div>
	)
}

export default App
