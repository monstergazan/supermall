//配置别名
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // '@': 'src', 这是默认配置的
        'common': '@/common',
        'assets': '@/assets',
        'views': '@/views',
        'components': '@/components',
        'network': '@/network'
        //别名的配置，在cli3可以用@，cli2不行，要用绝对路径
      }
    }
  }
}