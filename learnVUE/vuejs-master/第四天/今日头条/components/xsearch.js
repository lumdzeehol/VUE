Vue.component("x-search", {
	template: `
					<div class="weui-search-bar" :class="{'weui-search-bar_focusing':isShowSearchBar}" id="searchBar">
						<form class="weui-search-bar__form">
							<div class="weui-search-bar__box">
								<i class="weui-icon-search"></i>
								<input type="search" class="weui-search-bar__input" id="searchInput" placeholder="搜索" required="">
								<a href="javascript:" class="weui-icon-clear" id="searchClear"></a>
							</div>
							<label v-focuss @click="showSearchBar" class="weui-search-bar__label" id="searchText" style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);">
		                    <i class="weui-icon-search"></i>
		                    <span>搜索</span>
		                </label>
						</form>
						<a href="javascript:" @click="cancelSearchBar" class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
					</div>
				`,
	data() {
		return {
			isShowSearchBar: false,
		}
	},
	methods: {
		showSearchBar() {
			this.isShowSearchBar = true
		},
		cancelSearchBar() {
			this.isShowSearchBar = false
		}
	}
})