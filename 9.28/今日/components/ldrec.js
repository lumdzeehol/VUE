var ldrec = {
    template:`
        <div id="main">
            <input type="search" id="srh" v-model="srh"/>
            <div class="weui-panel weui-panel_access" v-scroll="loadMore">
                <div class="weui-panel__bd">
                    <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg" v-for="item in filterlist">
                        <div class="weui-media-box__hd">
                            <img class="weui-media-box__thumb" :src="item.imgsrc" alt="">
                        </div>
                        <div class="weui-media-box__bd">
                            <h4 class="weui-media-box__title">{{item.title}}</h4>
                            <p class="weui-media-box__desc">{{item.digest}}</p>
                        </div>
                    </a>
                    <div class="ld-refresh" @click="loadMore"><span v-show="!isLoading">加载更多</span><span v-show="isLoading">正在加载...</span></div>
                </div>
            </div>
        </div>
    `,
    data(){
        return {
            news: [],
            srh:"",
            isLoading: false
        }
    },
    methods:{
        loadMore(){this.isLoading = true;
            setTimeout(()=>{
                this.news = this.news.concat(dataArr);
                this.isLoading = false;
            }, 1000);
        }
    },
    computed:{
        filterlist:function(){
            var self = this;
            var list = this.news;
            var ftlist = list.filter(function(item){
                     
                if (item.title.includes(self.srh)) {
                    return 1;
                }
                if (item.digest.includes(self.srh)) {
                    return 1;
                }
                return 0;
            });
                 
            if (this.srh === "") {
                return this.news;
            }else{
                return ftlist;
            }
        }
    },
    mounted(){
        // this.loadMore();
    }
}