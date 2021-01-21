const { app, pool } = require('./connect')

app.all('*', (req, res, next) => {
    //这里处理全局拦截，一定要写在最上面
    next()
})
app.get('/', (req, res) => {  //首页路由
    res.sendFile(__dirname + '/' + 'index.html')
})
app.all('/', (req, res) => {
    pool.getConnection((err, conn) => {
        res.json({ type: 'test' })
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })
})

//引入user接口
const user = require('./router/user')
app.use('/user', user)

//引入获取商品数据接口
const goods = require('./router/goods')
app.use('/goods', goods)

//服务启动
app.listen(3000, () => {
    console.log('服务启动', 'localhost:3000')
})