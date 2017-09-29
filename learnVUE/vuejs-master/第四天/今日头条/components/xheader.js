Vue.component("x-header", {
	props: ["title"],
	template: `
					<header>{{title?title:"正在加载中..."}}</header>
				`
})