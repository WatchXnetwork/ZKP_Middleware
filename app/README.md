# Solana Based Data Privacy

### Project description

- Functional requirements: ZK-based privacy protection of personal health data middleware DEMO
- Middleware Name: WatchXZK Middleware, WZM
- Development Requirements:
  1.  Need to use some of solana's unique technical features, such as SPL, state compression, hookup, etc.
  2.  Using mature solutions, frameworks and components from other Solana projects, using existing achievements in the Solana ecosystem to check whether Solana has ZK-related functional modules, or whether there are privacy protection projects in the Solana ecosystem.
  3.  Check the technology used by other zk and privacy protection related projects, such as the open source project Tornado on the ETH chain
  4.  Make a few pages of PPT to introduce the technical characteristics and advantages of the privacy protection middleware
      Scenario:
- Input: Input is a file of human physiological parameters such as blood oxygen, pulse and other information collected by smart watches, including the user's wallet address personal information.
- Processing: digital processing through WZM middleware
- Output: Output is the processed file that has been processed for the user information, The health warning information returned after AI training can be returned to the user, but the AI training party does not know the specific information of the user, so as to achieve the user's privacy protection.
- Please make a demo interface based on this demand, the core is the SOL privacy contract, which needs to be uploaded to Github open source for the judges to consult.
- TODO: Work on the ppt when the code is ok.

- 功能需求：基于 ZK 的个人健康数据的隐私保护中间件 DEMO
- 中间件名字：WatchX ZK Middleware,简称 WZM
- 开发需求：
  1.  需要用到 solana 独有的一些技术特性， 如 SPL,状态压缩， hookup 等
  2.  利用 solana 其他项目的成熟方案，框架和组件，利用 solana 生态的现有成果，查阅 Solana 是否有 zk 相关的功能 module，或者 solana 生态有没有涉及隐私保护的项目
  3.  查阅其他 zk 和隐私保护相关项目使用的技术，如 ETH 链上的开源项目 Tornado
  4.  做一个几页的 PPT 对该隐私保护中间件的技术特性和优势等做一个介绍
      场景：
- Input: input 是智能手表收集的血氧、脉搏等人体生理参数信息的一个文件，同时包括用户的钱包地址个人信息，
  处理： 经过 WZM 中间件进行数据处理
- Output: output 是经过处理后的文件， 已经对用户信息进行了处理， 可以进入 AI 健康训练、健康咨询等后续应用，AI 训练后返回的健康预警信息可以返回到用户， 但 AI 训练方是不知道用户的具体信息的，以此实现对用户的隐私保护。
- 请依据该需求做一个演示界面， 核心是 SOL 隐私处理合约，这块需要上传到 Github 开源供评委查阅。

## Resources

- [https://solscan.io](https://solscan.io)
- [Use solana as a database](https://medium.com/@moocowdrinksmilk/web2-to-web3-on-solana-databases-and-accounts-b14fbb05820e)
- [Zero knowledge proof in solana](https://spl.solana.com/confidential-token/deep-dive/zkps)
- [Zero knowledge proof](https://www.youtube.com/watch?v=5qzNe1hk0oY)
- [Solana Explorer](https://explorer.solana.com/)
