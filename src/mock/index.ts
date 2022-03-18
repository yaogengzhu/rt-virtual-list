import Mock from 'mockjs'
export const data = Mock.mock({
	// 属性 list 的值是一个数组，其中含有 1 到 10 个元素
	'list|10000': [ {
		// 属性 id 是一个自增数，起始值为 1，每次增 1
		'id|+1': 1,
		title: "@title(3,10)",
		image: "@natural(0,15)",
		reads: "@natural(3,99999)",
		from: "@ctitle(3, 10)",
		data: "@date('yyyy-mm-dd')"
	} ]
})
