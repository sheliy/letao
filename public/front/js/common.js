 // 区域滚动功能
mui(".mui-scroll-wrapper").scroll({
     indicators: false
});

 // 轮播图初始化
var gallery = mui('.mui-slider');
gallery.slider({
    interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
});