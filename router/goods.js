const { pool, router, resJson } = require('../connect')
const goodsSQL = require('../db/goodsSQL')

//按类型获取商品数组
router.get('/getGoodsByType', (req, res) => {
    //获取前台参数
    let types = {
        goodsType: req.query.type
    }
    let _res = res;
    let _data;
    pool.getConnection((err, conn) => {
        conn.query && conn.query(goodsSQL.queryAll, [types.goodsType], (e, result) => {
            if (e) _data = {
                code: -1,
                msg: e
            }
            if (result && result.length) {
                _data = {
                    msg: '',
                    data: {
                        list: result,
                        status: 1,
                    }
                }
            }
            resJson(_res, { ..._data })
        })
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })
})

//新增/编辑商品
router.get('/updateGoods', (req, res) => {
    //获取前台参数
    let params = {
        id: req.query.id || "",
        price: req.query.price,
        img: req.query.img,
        type: req.query.type,
    }
    let _res = res;

    let _data;
    //判断是否为新增 id===''
    if (params.id === '') {
        pool.getConnection((err, conn) => {
            // 查询数据库该用户是否已存在
            conn.query && conn.query(goodsSQL.insert, [...params], (e, result) => {
                if (e) _data = {
                    code: -1,
                    msg: e
                }
                if (result && result.length) {
                   _data={
                       msg:"新增成功"
                   }
                }
                resJson(_res, { ..._data })
            })
            pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
        })
    } else {
        pool.getConnection((err, conn) => {
            // 查询数据库该用户是否已存在
            conn.query && conn.query(goodsSQL.queryById, [params.id], (e, result) => {
                if (e) _data = {
                    code: -1,
                    msg: e
                }
                if (result && result.length) {
                    conn.query(goodsSQL.updateGoods, [{
                        password: user.newPassword
                    }, user.username], (err, result) => {
                        if (result) {
                            _data = {
                                msg: '密码修改成功'
                            }
                        } else {
                            _data = {
                                code: -1,
                                msg: '密码修改失败'
                            }
                        }
                    })
                }
                resJson(_res, { ..._data })
            })
            pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
        })
    }
})


module.exports = router;