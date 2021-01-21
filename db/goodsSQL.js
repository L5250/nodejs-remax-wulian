const userSQL = {
    queryAll: 'select * from goods',   // 查询所有用户
    queryByName: 'select * from  goods where username=?',  // 通过用户名索引查询用户
    queryByNamePassword: 'select * from  goods where username=? and password=?',  // 通过用户名和密码索引查询用户
    insert: 'insert into goods set ?',  // 插入新用户
    updateUser: 'update goods set ? where username=?',// 更新用户信息
    deleteUser: 'delete from goods where username=?' // 删除用户
}

module.exports = userSQL