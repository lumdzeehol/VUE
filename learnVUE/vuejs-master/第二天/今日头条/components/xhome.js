var xhome = {
	template: `
		<div>
			<header>{{title?title:"正在加载中..."}}</header>
			<!--weui-search-bar_focusing-->
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
			<div class="weui-panel weui-panel_access">
				<!--<div class="weui-panel__hd">图文组合列表</div>-->
				<div class="weui-panel__bd">
					<a v-for="n in news" :href="'#/detail/'+n.id+'/laoyao'" class="weui-media-box weui-media-box_appmsg">
						<div class="weui-media-box__hd" v-if="n.chlid!='1048'">
							<img @click="showGallery(n.bigImage[0])" class="weui-media-box__thumb" :src="n.bigImage[0]" alt="">
						</div>
						<div class="weui-media-box__bd">
							<h4 class="weui-media-box__title">{{n.source}}</h4>
							<p class="weui-media-box__desc">{{n.title}}</p>
						</div>
					</a>
				</div>
				<div class="weui-panel__ft" v-show="!isLoadMore" style="margin-bottom: 50px;">
					<a href="javascript:void(0);" @click="loadMore" class="weui-cell weui-cell_access weui-cell_link">
						<div class="weui-cell__bd">查看更多</div>
						<span class="weui-cell__ft"></span>
					</a>
				</div>
				<div class="weui-loadmore" v-show="isLoadMore" style="margin-bottom: 50px;">
					<i class="weui-loading"></i>
					<span class="weui-loadmore__tips">正在加载</span>
				</div>
			</div>
			<div id="loadingToast" v-show="isLoadMore">
				<div class="weui-mask_transparent"></div>
				<div class="weui-toast">
					<i class="weui-loading weui-icon_toast"></i>
					<p class="weui-toast__content">数据加载中</p>
				</div>
			</div>
			<div class="weui-gallery" :class="{'weui-galleryed':isShowGallery,'weui-gallerye-animate':isShowGallery}">
				<span class="weui-gallery__img" :style="{backgroundImage: 'url('+imgUrl+')'}"></span>
				<div class="weui-gallery__opr">
					<a href="javascript:" @click="isShowGallery=false" class="weui-gallery__del">
						<i class="weui-icon-delete weui-icon_gallery-delete"></i>
					</a>
				</div>
			</div>
			<div class="weui-tabbar" style="position: fixed; bottom: 0; left: 0;">
				<a @click="toggle(t.id)" :class="{'weui-bar__item_on':t.id==tab}" :t="tab" v-for="t in tabbar" href="javascript:;" class="weui-tabbar__item">
					<span style="display: inline-block;position: relative;">
                        <img :src="t.src" alt="" class="weui-tabbar__icon">
                        <span class="weui-badge" v-show="t.isBadge" style="position: absolute;top: -2px;right: -13px;">{{t.badge}}</span>
					</span>
					<p class="weui-tabbar__label">{{t.text}}</p>
				</a>
			</div>
			</div>
				`,
	data() {
		return {
			//model
			tabbar: [{
				text: "微信",
				badge: 8,
				isBadge: true,
				src: "./images/icon_tabbar.png",
				id: 0

			}, {
				text: "通讯录",
				badge: 0,
				isBadge: false,
				src: "./images/icon_tabbar.png",
				id: 1

			}, {
				text: "发现",
				badge: 0,
				isBadge: true,
				src: "./images/icon_tabbar.png",
				id: 2

			}, {
				text: "我",
				badge: 0,
				isBadge: true,
				src: "./images/icon_tabbar.png",
				id: 3

			}, {
				text: "个人中心",
				badge: 0,
				isBadge: false,
				src: "./images/icon_tabbar.png",
				id: 4
			}],
			tab: 0,
			isShowSearchBar: false,
			news: [],
			isLoadMore: true,
			title: "",
			isShowGallery: false,
			imgUrl: ""
		}
	},
	methods: {
		toggle(id) {
			console.log(id)
			this.tab = id
		},
		showSearchBar() {
			this.isShowSearchBar = true
		},
		cancelSearchBar() {
			this.isShowSearchBar = false
		},
		loadMore() {
			this.isLoadMore = true;
			var self = this;
			$.ajax({
				type: "GET",
				url: "http://localhost:81/1704/vuejs/%E7%AC%AC%E4%BA%8C%E5%A4%A9/%E4%BB%8A%E6%97%A5%E5%A4%B4%E6%9D%A1/qqnews.json",
				data: {

				},
				success: function(data) {
					setTimeout(function() {
						self.title = data.title;
						self.news = self.news.concat(data.newslist);
						console.log(self.news)
						self.isLoadMore = false;
					}, 200)
				}
			})
		},
		showGallery(src) {
			console.log(src);
			this.imgUrl = src;
			this.isShowGallery = true

		}
	},
	mounted() {
		this.loadMore()
	},
}