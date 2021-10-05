module.exports={
    devServer: {
        proxy: {
          '/api': {
            target: 'http://localhost:4000',
            ws: true,
            changeOrigin: true,
            pathRewrite: {// 重写路径: 去掉路径中开头的'/api'
                '^/api': ''
            }
          }
        }
    }
}