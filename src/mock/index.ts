import Mock,{ Random } from 'mockjs'
export const data = Mock.mock({
	// 属性 list 的值是一个数组，其中含有 1 到 10 个元素
	'list|8': [ {
		// 属性 id 是一个自增数，起始值为 1，每次增 1
		'id|+1': 1,
		title: "@ctitle(15,25)",
		image: Random.dataImage('130x80'),
		reads: "@natural(3,99999)",
		from: "@ctitle(3, 10)",
		time: "@date('yyyy-mm-dd')"
	} ]
})
