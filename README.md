Rouwan
========

**Rouwan** 是一个基于 [NodeJs](http://www.nodejs.org/) 的 Web Server。

**Rouwan** 具有以下几个特点：
* 支持vHost, Router以及SSL
* 提供Email(基于nodemailer), MongoDB(基于mongodb-native)支持
* 提供Session(会话), Cache(缓存), Log(日志), Counter(计数器), Template(模板), Validator(验证器)等功能支持
* 提供BackStage(后台), 可直接管理全部变量及当前运行的代码
* BackStage(后台)提供代码编辑器, 可在线编辑服务端托管代码
* BackStage(后台)提供Time Tag记录请求处理时间，帮助分析代码效率问题
* 提供脚本及模板动态加载功能, 如有变更自动重新加载, 无需重启整个应用服务
* 提供负载监控, 可按设定自动重启Rouwan并邮件通报
* 更多功能请查看API文档：http://rouwan.us/api/index.html

使用
========

请参考API文档：http://rouwan.us/api/index.html

正在努力(2014.04.04)
========

* 添加连接池