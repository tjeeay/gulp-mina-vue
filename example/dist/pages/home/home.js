export default Page({
  $route: "pages/home/home",
  data: {
    title: 'MINA VUE',
    desc: '用Vue单文件组件的方式开发小程序'
  },
  onLoad() {
    console.log('on page load.', this?.data?.title);
  }
});