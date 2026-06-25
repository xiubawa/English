const storeKey = "toeic700-offline-state";
const cloudSyncKey = "toeic700-cloud-sync";
const cloudFileName = "toeic700-progress.json";

const phases = [
  ["第 1-2 周", "打基础", "熟悉题型，主攻 Part 1/2/5，建立商务词汇和核心语法。"],
  ["第 3-6 周", "专项突破", "听力问答、语法词汇、阅读定位交替训练，每周半套模拟。"],
  ["第 7-10 周", "真题冲分", "严格计时，阅读 75 分钟完成 100 题，建立取舍节奏。"],
  ["第 11-12 周", "考前稳定", "每周 2-3 套模拟，只复盘错题和高频表达。"]
];

const dailyTasks = [
  ["词汇", "背 50 个 TOEIC 高频词，并用 10 个词造句。"],
  ["听力", "Part 2 做 30 题，Part 3/4 精听 2 组。"],
  ["阅读", "Part 5 做 30 题，Part 7 做 2 篇定位阅读。"],
  ["复盘", "整理错因：词汇、语法、没听出关键词、速度慢。"],
  ["跟读", "选择 1 段听力脚本，跟读 10 分钟。"]
];

const coreTerms = `
office|report|报告|Office
office|document|文件|Office
office|schedule|日程|Office
office|appointment|预约|Office
office|deadline|截止日期|Office
office|assignment|任务|Office
office|project|项目|Office
office|department|部门|Office
office|branch|分公司|Office
office|headquarters|总部|Office
office|facility|设施|Office
office|equipment|设备|Office
office|printer|打印机|Office
office|software|软件|Office
office|password|密码|Office
office|policy|政策|Office
office|procedure|流程|Office
office|memo|备忘录|Office
office|notice|通知|Office
office|announcement|公告|Office
meeting|agenda|议程|Meeting
meeting|conference|会议|Meeting
meeting|seminar|研讨会|Meeting
meeting|workshop|工作坊|Meeting
meeting|presentation|演示|Meeting
meeting|proposal|提案|Meeting
meeting|minutes|会议记录|Meeting
meeting|attendee|参会者|Meeting
meeting|speaker|演讲者|Meeting
meeting|venue|会场|Meeting
meeting|reservation|预订|Meeting
meeting|invitation|邀请|Meeting
meeting|registration|报名|Meeting
meeting|exhibition|展览|Meeting
meeting|booth|展位|Meeting
meeting|brochure|宣传册|Meeting
meeting|feedback|反馈|Meeting
meeting|survey|调查|Meeting
meeting|strategy|策略|Meeting
meeting|campaign|活动|Meeting
finance|invoice|发票|Finance
finance|receipt|收据|Finance
finance|budget|预算|Finance
finance|expense|费用|Finance
finance|reimbursement|报销|Finance
finance|payment|付款|Finance
finance|refund|退款|Finance
finance|deposit|押金|Finance
finance|discount|折扣|Finance
finance|quotation|报价|Finance
finance|estimate|估价|Finance
finance|contract|合同|Finance
finance|account|账户|Finance
finance|balance|余额|Finance
finance|statement|账单|Finance
finance|profit|利润|Finance
finance|revenue|收入|Finance
finance|tax|税|Finance
finance|fee|费用|Finance
finance|purchase order|采购订单|Finance
travel|itinerary|行程表|Travel
travel|flight|航班|Travel
travel|boarding pass|登机牌|Travel
travel|departure|出发|Travel
travel|arrival|到达|Travel
travel|reservation|预订|Travel
travel|accommodation|住宿|Travel
travel|hotel room|酒店房间|Travel
travel|rental car|租车|Travel
travel|shuttle bus|接驳车|Travel
travel|terminal|航站楼|Travel
travel|luggage|行李|Travel
travel|passport|护照|Travel
travel|travel expense|差旅费用|Travel
travel|business trip|商务出差|Travel
travel|tour package|旅行套餐|Travel
travel|complimentary breakfast|免费早餐|Travel
travel|check-in counter|值机柜台|Travel
travel|tour guide|导游|Travel
hiring|applicant|申请人|Hiring
hiring|candidate|候选人|Hiring
hiring|resume|简历|Hiring
hiring|cover letter|求职信|Hiring
hiring|position|职位|Hiring
hiring|vacancy|空缺职位|Hiring
hiring|interview|面试|Hiring
hiring|reference|推荐人|Hiring
hiring|qualification|资质|Hiring
hiring|experience|经验|Hiring
hiring|orientation|入职说明|Hiring
hiring|benefits package|福利方案|Hiring
hiring|salary|薪资|Hiring
hiring|promotion|晋升|Hiring
hiring|transfer|调岗|Hiring
hiring|supervisor|主管|Hiring
hiring|staff member|员工|Hiring
hiring|internship|实习|Hiring
hiring|job opening|职位空缺|Hiring
logistics|shipment|货运|Logistics
logistics|delivery|配送|Logistics
logistics|package|包裹|Logistics
logistics|warehouse|仓库|Logistics
logistics|inventory|库存|Logistics
logistics|supplier|供应商|Logistics
logistics|vendor|供应商|Logistics
logistics|manufacturer|制造商|Logistics
logistics|order|订单|Logistics
logistics|catalog|目录|Logistics
logistics|sample|样品|Logistics
logistics|replacement|替换品|Logistics
logistics|return|退货|Logistics
logistics|defect|缺陷|Logistics
logistics|inspection|检查|Logistics
logistics|maintenance|维护|Logistics
logistics|repair|维修|Logistics
logistics|installation|安装|Logistics
logistics|supply chain|供应链|Logistics
logistics|tracking number|追踪编号|Logistics
`.trim().split("\n").map((line) => {
  const [category, word, meaning, tag] = line.split("|");
  return { category, word, meaning, tag };
});

const extraWords = [
  ["office", "customer service", "客户服务", "Office"], ["office", "market research", "市场调研", "Office"],
  ["office", "annual report", "年度报告", "Office"], ["office", "quality control", "质量控制", "Office"],
  ["finance", "bank transfer", "银行转账", "Finance"], ["finance", "credit card", "信用卡", "Finance"],
  ["meeting", "product launch", "产品发布", "Meeting"], ["meeting", "trade show", "贸易展", "Meeting"],
  ["travel", "travel agency", "旅行社", "Travel"], ["travel", "meeting room", "会议室", "Travel"],
  ["hiring", "employee handbook", "员工手册", "Hiring"], ["hiring", "application form", "申请表", "Hiring"],
  ["logistics", "shipping fee", "运费", "Logistics"], ["logistics", "bulk order", "批量订单", "Logistics"]
].map(([category, word, meaning, tag]) => ({ category, word, meaning, tag }));

const terms = [...coreTerms, ...extraWords];

const phraseTemplates = [
  ["review", "查看", (w) => `review the ${w}`, (w) => `Please review the ${w} before the meeting.`, (m) => `请在会议前查看${m}。`],
  ["update", "更新", (w) => `update the ${w}`, (w) => `The team updated the ${w} this morning.`, (m) => `团队今天上午更新了${m}。`],
  ["submit", "提交", (w) => `submit the ${w}`, (w) => `All employees must submit the ${w} by Friday.`, (m) => `所有员工必须在周五前提交${m}。`],
  ["confirm", "确认", (w) => `confirm the ${w}`, (w) => `Could you confirm the ${w} by email?`, (m) => `你能通过邮件确认${m}吗？`],
  ["arrange", "安排", (w) => `arrange the ${w}`, (w) => `The assistant arranged the ${w} for next week.`, (m) => `助理为下周安排了${m}。`],
  ["discuss", "讨论", (w) => `discuss the ${w}`, (w) => `We will discuss the ${w} during the call.`, (m) => `我们将在电话会议中讨论${m}。`],
  ["approve", "批准", (w) => `approve the ${w}`, (w) => `The manager approved the ${w} yesterday.`, (m) => `经理昨天批准了${m}。`],
  ["complete", "完成", (w) => `complete the ${w}`, (w) => `Please complete the ${w} as soon as possible.`, (m) => `请尽快完成${m}。`],
  ["check", "检查", (w) => `check the ${w}`, (w) => `Please check the ${w} carefully.`, (m) => `请仔细检查${m}。`],
  ["prepare", "准备", (w) => `prepare the ${w}`, (w) => `She prepared the ${w} for the client.`, (m) => `她为客户准备了${m}。`]
];

const wordExampleTemplates = {
  office: [
    [(w) => `The ${w} was placed on the manager's desk.`, (m) => `${m}被放在经理的办公桌上。`],
    [(w) => `Several employees asked for access to the ${w}.`, (m) => `几名员工申请使用${m}。`],
    [(w) => `The new ${w} helped the team work more efficiently.`, (m) => `新的${m}帮助团队更高效地工作。`],
    [(w) => `A notice about the ${w} was posted near the entrance.`, (m) => `关于${m}的通知张贴在入口附近。`]
  ],
  meeting: [
    [(w) => `The ${w} will begin shortly after lunch.`, (m) => `${m}将在午餐后不久开始。`],
    [(w) => `Participants received the ${w} by email yesterday.`, (m) => `参会者昨天通过邮件收到了${m}。`],
    [(w) => `The organizer changed the ${w} at the last minute.`, (m) => `组织者在最后一刻更改了${m}。`],
    [(w) => `Questions about the ${w} should be sent to Ms. Carter.`, (m) => `关于${m}的问题应发送给 Carter 女士。`]
  ],
  finance: [
    [(w) => `The accounting department reviewed the ${w} this morning.`, (m) => `会计部门今天上午审查了${m}。`],
    [(w) => `A copy of the ${w} must be attached to the form.`, (m) => `表格中必须附上一份${m}副本。`],
    [(w) => `The client asked a question about the ${w}.`, (m) => `客户询问了关于${m}的问题。`],
    [(w) => `The ${w} was processed after the manager's approval.`, (m) => `${m}在经理批准后得到了处理。`]
  ],
  travel: [
    [(w) => `The traveler printed the ${w} before going to the airport.`, (m) => `旅客去机场前打印了${m}。`],
    [(w) => `The hotel staff helped guests with the ${w}.`, (m) => `酒店员工帮助客人处理${m}。`],
    [(w) => `Details about the ${w} are included in the confirmation email.`, (m) => `关于${m}的详细信息包含在确认邮件中。`],
    [(w) => `The company paid for the ${w} during the business trip.`, (m) => `公司支付了出差期间的${m}。`]
  ],
  hiring: [
    [(w) => `The human resources team reviewed each ${w}.`, (m) => `人力资源团队审核了每份${m}。`],
    [(w) => `Information about the ${w} is available on the company website.`, (m) => `关于${m}的信息可在公司网站上查看。`],
    [(w) => `The supervisor discussed the ${w} with the new employee.`, (m) => `主管和新员工讨论了${m}。`],
    [(w) => `Several people applied for the ${w} last week.`, (m) => `上周有几个人申请了${m}。`]
  ],
  logistics: [
    [(w) => `The warehouse manager checked the ${w} before noon.`, (m) => `仓库经理在中午前检查了${m}。`],
    [(w) => `Customers can track the ${w} online.`, (m) => `客户可以在线追踪${m}。`],
    [(w) => `The supplier sent an update about the ${w}.`, (m) => `供应商发送了关于${m}的更新。`],
    [(w) => `A delay affected the ${w} schedule.`, (m) => `一次延误影响了${m}的安排。`]
  ]
};

function makeWordExample(term, index) {
  const patterns = [
    [(w) => `During the monthly audit, Ms. Lee verified the ${w}.`, (m) => `在月度审计期间，李女士核实了${m}。`],
    [(w) => `The receptionist placed the ${w} in a folder for the visitor.`, (m) => `接待员把${m}放进文件夹交给访客。`],
    [(w) => `An update about the ${w} appeared on the staff portal.`, (m) => `关于${m}的更新出现在员工门户网站上。`],
    [(w) => `The supervisor mentioned the ${w} during a short briefing.`, (m) => `主管在简短说明会上提到了${m}。`],
    [(w) => `A problem with the ${w} delayed the afternoon schedule.`, (m) => `${m}出现问题，耽误了下午的日程。`],
    [(w) => `The assistant saved a digital copy of the ${w}.`, (m) => `助理保存了一份${m}的电子副本。`],
    [(w) => `Several customers asked whether the ${w} was still available.`, (m) => `几位客户询问${m}是否仍然可用。`],
    [(w) => `The manager compared the ${w} with last year's records.`, (m) => `经理把${m}和去年的记录进行了比较。`],
    [(w) => `A note about the ${w} was added to the confirmation email.`, (m) => `确认邮件中添加了一条关于${m}的说明。`],
    [(w) => `The team found the ${w} while preparing for the inspection.`, (m) => `团队在准备检查时找到了${m}。`],
    [(w) => `The client requested more details about the ${w}.`, (m) => `客户要求了解更多关于${m}的细节。`],
    [(w) => `Staff members discussed the ${w} after the training session.`, (m) => `员工在培训课后讨论了${m}。`],
    [(w) => `The company website now includes information about the ${w}.`, (m) => `公司网站现在包含关于${m}的信息。`],
    [(w) => `The warehouse team labeled the ${w} before shipping began.`, (m) => `仓库团队在发货开始前给${m}贴了标签。`],
    [(w) => `The finance clerk attached the ${w} to the application form.`, (m) => `财务文员把${m}附在申请表上。`],
    [(w) => `A senior employee explained the ${w} to the new staff.`, (m) => `一名资深员工向新员工解释了${m}。`],
    [(w) => `The hotel sent guests a message about the ${w}.`, (m) => `酒店向客人发送了一条关于${m}的信息。`],
    [(w) => `The sales team used the ${w} during the product demonstration.`, (m) => `销售团队在产品演示中使用了${m}。`],
    [(w) => `The technician checked whether the ${w} matched the order details.`, (m) => `技术员检查${m}是否与订单详情一致。`],
    [(w) => `The branch office kept the ${w} for future reference.`, (m) => `分公司保留了${m}以供日后参考。`]
  ];
  const [exampleOf, translationOf] = patterns[index % patterns.length];
  return { example: exampleOf(term.word), translation: translationOf(term.meaning) };
}

const generatedWords = terms.map((t, index) => {
  const example = makeWordExample(t, index);
  return {
    word: t.word,
    meaning: t.meaning,
    phrase: t.word,
    example: example.example,
    translation: example.translation,
    note: `TOEIC 高频单词：${t.word}。`,
    tag: t.tag,
    category: t.category,
    kind: "word",
    pos: t.word.includes(" ") ? "名词短语" : "名词"
  };
});

function makePhraseExample(term, phrase, verbCn, termIndex, templateIndex) {
  const patterns = [
    [(p) => `Before the quarterly review, the assistant needed to ${p}.`, (m) => `在季度审查前，助理需要${m}。`],
    [(p) => `The project leader asked the team to ${p} during the call.`, (m) => `项目负责人要求团队在电话会议中${m}。`],
    [(p) => `After receiving the client's message, Ms. Carter decided to ${p}.`, (m) => `收到客户消息后，Carter 女士决定${m}。`],
    [(p) => `The new system makes it easier to ${p} without delay.`, (m) => `新系统让人能够更容易地及时${m}。`],
    [(p) => `At the end of the workshop, participants learned how to ${p}.`, (m) => `在工作坊结束时，参与者学会了如何${m}。`],
    [(p) => `The branch manager reminded employees to ${p} by noon.`, (m) => `分公司经理提醒员工在中午前${m}。`],
    [(p) => `To avoid confusion, the coordinator chose to ${p} first.`, (m) => `为避免混乱，协调员选择先${m}。`],
    [(p) => `The online form allows users to ${p} from home.`, (m) => `在线表格允许用户在家${m}。`],
    [(p) => `During the inspection, the technician had to ${p} carefully.`, (m) => `检查期间，技术员必须仔细${m}。`],
    [(p) => `The accounting clerk stayed late to ${p} before closing the office.`, (m) => `会计文员加班在办公室关门前${m}。`],
    [(p) => `The customer service team prepared notes to ${p} more accurately.`, (m) => `客服团队准备了笔记，以便更准确地${m}。`],
    [(p) => `Because the schedule changed, the organizer had to ${p}.`, (m) => `由于日程变更，组织者不得不${m}。`],
    [(p) => `The vendor sent a message explaining when to ${p}.`, (m) => `供应商发送消息说明何时${m}。`],
    [(p) => `In the training video, employees are shown how to ${p}.`, (m) => `培训视频中展示了员工如何${m}。`],
    [(p) => `The director used the morning meeting to ${p}.`, (m) => `主管利用晨会来${m}。`]
  ];
  const [exampleOf, translationOf] = patterns[(termIndex * phraseTemplates.length + templateIndex) % patterns.length];
  return {
    example: exampleOf(phrase),
    translation: translationOf(`${verbCn}${term.meaning}`)
  };
}

const generatedPhrases = terms.flatMap((t, termIndex) => phraseTemplates.map(([verb, cn, phraseOf], templateIndex) => {
  const phrase = phraseOf(t.word);
  const example = makePhraseExample(t, phrase, cn, termIndex, templateIndex);
  return {
    word: phrase,
    meaning: `${cn}${t.meaning}`,
    phrase,
    example: example.example,
    translation: example.translation,
    note: `TOEIC 常见搭配：${verb} + ${t.word}。`,
    tag: "TOEIC 搭配",
    category: t.category,
    kind: "phrase",
    pos: "动词短语"
  };
}));

const grammarPhrases = [
  ["decide to do sth", "决定做某事（decide + to do）", "The director decided to postpone the meeting.", "主管决定推迟会议。"],
  ["agree to do sth", "同意做某事（agree + to do）", "The supplier agreed to reduce the price.", "供应商同意降低价格。"],
  ["plan to do sth", "计划做某事（plan + to do）", "We plan to launch the product in July.", "我们计划在七月发布产品。"],
  ["expect to do sth", "预计做某事（expect + to do）", "The company expects to hire more staff.", "公司预计会招聘更多员工。"],
  ["offer to do sth", "主动提出做某事（offer + to do）", "She offered to prepare the report.", "她主动提出准备报告。"],
  ["refuse to do sth", "拒绝做某事（refuse + to do）", "The client refused to sign the contract.", "客户拒绝签合同。"],
  ["fail to do sth", "未能做某事（fail + to do）", "The team failed to meet the deadline.", "团队未能赶上截止日期。"],
  ["manage to do sth", "设法做成某事（manage + to do）", "We managed to complete the order on time.", "我们设法按时完成订单。"],
  ["avoid doing sth", "避免做某事（avoid + doing）", "Please avoid using the printer during maintenance.", "维护期间请避免使用打印机。"],
  ["consider doing sth", "考虑做某事（consider + doing）", "The manager is considering hiring an assistant.", "经理正在考虑招聘助理。"],
  ["finish doing sth", "完成做某事（finish + doing）", "She finished reviewing the document.", "她完成了文件审阅。"],
  ["mind doing sth", "介意做某事（mind + doing）", "Would you mind checking the invoice?", "你介意核对一下发票吗？"],
  ["recommend doing sth", "建议做某事（recommend + doing）", "We recommend booking a room early.", "我们建议尽早预订房间。"],
  ["suggest doing sth", "建议做某事（suggest + doing）", "He suggested changing the delivery date.", "他建议更改送货日期。"],
  ["postpone doing sth", "推迟做某事（postpone + doing）", "They postponed opening the new store.", "他们推迟了新店开业。"],
  ["look forward to doing sth", "期待做某事（to 是介词）", "We look forward to working with you.", "我们期待与您合作。"],
  ["be used to doing sth", "习惯做某事（to 是介词）", "She is used to working with international clients.", "她习惯与国际客户合作。"],
  ["object to doing sth", "反对做某事（to 是介词）", "Some residents objected to renovating the lobby.", "一些住户反对翻新大厅。"],
  ["be responsible for doing sth", "负责做某事（for + doing）", "The assistant is responsible for scheduling interviews.", "助理负责安排面试。"],
  ["prevent sb from doing sth", "阻止某人做某事（from + doing）", "The delay prevented us from shipping the order.", "延误使我们无法发货。"],
  ["have difficulty doing sth", "做某事有困难（difficulty + doing）", "Users had difficulty installing the software.", "用户安装软件时遇到困难。"],
  ["spend time doing sth", "花时间做某事（spend time + doing）", "She spent an hour preparing the presentation.", "她花了一小时准备演示。"],
  ["be required to do sth", "被要求做某事（be required + to do）", "Visitors are required to wear badges.", "访客被要求佩戴胸牌。"],
  ["enable sb to do sth", "使某人能够做某事（enable + sb + to do）", "The update enables users to export reports.", "此次更新使用户能够导出报告。"],
  ["ask sb to do sth", "要求某人做某事（ask + sb + to do）", "The manager asked us to revise the proposal.", "经理要求我们修改提案。"],
  ["remind sb to do sth", "提醒某人做某事（remind + sb + to do）", "Please remind staff to submit receipts.", "请提醒员工提交收据。"]
].map(([phrase, meaning, example, translation]) => ({
  word: phrase,
  meaning,
  phrase,
  example,
  translation,
  note: "TOEIC Reading Part 5 固定搭配。",
  tag: "Part 5 搭配",
  category: "grammar",
  kind: "phrase",
  pos: "动词短语/固定搭配"
}));

const grammarPairGroups = [
  {
    word: "remember",
    variants: [
      ["remember to do sth", "记得要去做某事", "Please remember to submit the expense report by Friday.", "请记得在周五前提交费用报告。"],
      ["remember doing sth", "记得做过某事", "I remember submitting the expense report yesterday.", "我记得昨天提交过费用报告。"]
    ]
  },
  {
    word: "forget",
    variants: [
      ["forget to do sth", "忘记要去做某事", "The assistant forgot to attach the receipt to the email.", "助理忘记把收据附在邮件里。"],
      ["forget doing sth", "忘记做过某事", "He forgot sending the updated schedule to the team.", "他忘记自己已经把更新后的日程发给了团队。"]
    ]
  },
  {
    word: "try",
    variants: [
      ["try to do sth", "努力/设法做某事", "The technician tried to repair the printer before the meeting.", "技术员试图在会议前修好打印机。"],
      ["try doing sth", "试着做某事看看效果", "The technician tried restarting the printer before calling support.", "技术员在联系支持前试着重启了打印机。"]
    ]
  },
  {
    word: "stop",
    variants: [
      ["stop to do sth", "停下来去做另一件事", "The manager stopped to answer a client call.", "经理停下来接了一个客户电话。"],
      ["stop doing sth", "停止正在做的事", "The staff stopped using the old software after the update.", "更新后员工停止使用旧软件。"]
    ]
  },
  {
    word: "regret",
    variants: [
      ["regret to do sth", "遗憾地要做某事/通知某事", "We regret to inform you that the seminar has been canceled.", "我们很遗憾地通知您研讨会已取消。"],
      ["regret doing sth", "后悔做过某事", "The supervisor regretted approving the order without checking the budget.", "主管后悔没有核对预算就批准了订单。"]
    ]
  },
  {
    word: "mean",
    variants: [
      ["mean to do sth", "打算做某事", "I meant to call the supplier before lunch.", "我本打算午餐前给供应商打电话。"],
      ["mean doing sth", "意味着做某事", "Changing the delivery date means updating every customer notice.", "更改配送日期意味着要更新每一份客户通知。"]
    ]
  },
  {
    word: "go on",
    variants: [
      ["go on to do sth", "接着去做另一件事", "After reviewing the proposal, the team went on to discuss the budget.", "审查提案后，团队接着讨论了预算。"],
      ["go on doing sth", "继续做同一件事", "The team went on reviewing the proposal after a short break.", "短暂休息后，团队继续审查提案。"]
    ]
  },
  {
    word: "need",
    variants: [
      ["need to do sth", "需要去做某事", "Employees need to complete the form before orientation.", "员工需要在入职培训前填写表格。"],
      ["need doing sth", "某事需要被做", "The conference room needs cleaning before the guests arrive.", "客人到达前，会议室需要打扫。"]
    ]
  },
  {
    word: "used",
    variants: [
      ["used to do sth", "过去常常做某事", "The company used to hold training sessions every Friday.", "这家公司过去常常每周五举办培训。"],
      ["be used to doing sth", "习惯于做某事", "The new staff are used to working with overseas clients.", "新员工习惯与海外客户合作。"],
      ["be used to do sth", "被用来做某事", "The software is used to track monthly expenses.", "这个软件被用来追踪每月费用。"]
    ]
  },
  {
    word: "propose",
    variants: [
      ["propose to do sth", "打算/提议亲自做某事", "The consultant proposed to review the contract first.", "顾问提议先亲自审查合同。"],
      ["propose doing sth", "建议做某事", "The consultant proposed reviewing the contract first.", "顾问建议先审查合同。"]
    ]
  },
  {
    word: "allow",
    variants: [
      ["allow sb to do sth", "允许某人做某事", "The policy allows employees to work from home twice a week.", "该政策允许员工每周在家办公两次。"],
      ["allow doing sth", "允许做某事", "The new policy allows working from home twice a week.", "新政策允许每周在家办公两次。"]
    ]
  },
  {
    word: "permit",
    variants: [
      ["permit sb to do sth", "允许某人做某事", "The pass permits visitors to enter the building after 6 p.m.", "这张通行证允许访客晚上六点后进入大楼。"],
      ["permit doing sth", "允许做某事", "The rules permit entering the building after 6 p.m. with a pass.", "规定允许持通行证在晚上六点后进入大楼。"]
    ]
  },
  {
    word: "forbid",
    variants: [
      ["forbid sb to do sth", "禁止某人做某事", "The company forbids employees to share confidential files.", "公司禁止员工共享机密文件。"],
      ["forbid doing sth", "禁止做某事", "The company forbids sharing confidential files.", "公司禁止共享机密文件。"]
    ]
  },
  {
    word: "advise",
    variants: [
      ["advise sb to do sth", "建议某人做某事", "The manager advised us to reserve the room early.", "经理建议我们早点预订房间。"],
      ["advise doing sth", "建议做某事", "The manager advised reserving the room early.", "经理建议早点预订房间。"]
    ]
  },
  {
    word: "begin",
    variants: [
      ["begin to do sth", "开始做某事", "The team began to prepare the annual report in March.", "团队三月开始准备年度报告。"],
      ["begin doing sth", "开始做某事", "The team began preparing the annual report in March.", "团队三月开始准备年度报告。"]
    ]
  },
  {
    word: "start",
    variants: [
      ["start to do sth", "开始做某事", "The printer started to make a strange noise.", "打印机开始发出奇怪的声音。"],
      ["start doing sth", "开始做某事", "The printer started making a strange noise.", "打印机开始发出奇怪的声音。"]
    ]
  },
  {
    word: "continue",
    variants: [
      ["continue to do sth", "继续做某事", "The staff continued to process orders during the system update.", "系统更新期间员工继续处理订单。"],
      ["continue doing sth", "继续做某事", "The staff continued processing orders during the system update.", "系统更新期间员工继续处理订单。"]
    ]
  },
  {
    word: "cease",
    variants: [
      ["cease to do sth", "停止做某事/不再做某事", "The old system will cease to operate next month.", "旧系统将在下个月停止运行。"],
      ["cease doing sth", "停止做某事", "The factory ceased producing the item last year.", "工厂去年停止生产该商品。"]
    ]
  },
  {
    word: "prefer",
    variants: [
      ["prefer to do sth", "更喜欢做某事", "Many customers prefer to receive digital receipts.", "许多客户更喜欢接收电子收据。"],
      ["prefer doing sth", "更喜欢做某事", "Many customers prefer receiving digital receipts.", "许多客户更喜欢接收电子收据。"],
      ["prefer doing A to doing B", "比起做B更喜欢做A", "The team prefers meeting online to traveling for short updates.", "比起为了简短更新而出差，团队更喜欢线上开会。"]
    ]
  },
  {
    word: "like",
    variants: [
      ["like to do sth", "喜欢/愿意做某事，常指选择或习惯", "I like to check the schedule before leaving the office.", "我喜欢在离开办公室前查看日程。"],
      ["like doing sth", "喜欢做某事，常指享受某个活动", "I like checking the schedule before leaving the office.", "我喜欢在离开办公室前查看日程。"]
    ]
  },
  {
    word: "hate",
    variants: [
      ["hate to do sth", "不愿意/很遗憾要做某事", "I hate to interrupt the meeting, but the client is waiting.", "我不愿打断会议，但客户正在等。"],
      ["hate doing sth", "讨厌做某事", "She hates commuting during rush hour.", "她讨厌在高峰时段通勤。"]
    ]
  },
  {
    word: "bother",
    variants: [
      ["bother to do sth", "费心去做某事", "Please bother to read the instructions before installing the software.", "安装软件前请费心阅读说明。"],
      ["bother doing sth", "费心做某事", "Few employees bothered checking the old notice after the update.", "更新后很少有员工费心查看旧通知。"]
    ]
  },
  {
    word: "decide",
    variants: [
      ["decide to do sth", "决定做某事", "The director decided to postpone the meeting.", "主管决定推迟会议。"],
      ["decide against doing sth", "决定不做某事", "The company decided against opening a new branch this year.", "公司决定今年不开设新分店。"]
    ]
  },
  {
    word: "plan",
    variants: [
      ["plan to do sth", "计划做某事", "We plan to launch the product in July.", "我们计划在七月发布产品。"],
      ["plan on doing sth", "打算做某事", "The sales team plans on visiting the client next week.", "销售团队打算下周拜访客户。"]
    ]
  },
  {
    word: "help",
    variants: [
      ["help (to) do sth", "帮助做某事", "The new software helps process invoices more quickly.", "新软件帮助更快地处理发票。"],
      ["cannot help doing sth", "忍不住做某事", "The manager could not help noticing the error in the report.", "经理忍不住注意到了报告里的错误。"]
    ]
  },
  {
    word: "require",
    variants: [
      ["require sb to do sth", "要求某人做某事", "The policy requires visitors to wear ID badges.", "该政策要求访客佩戴身份牌。"],
      ["require doing sth", "需要被做某事", "The storage room requires cleaning before the inspection.", "检查前储藏室需要清洁。"]
    ]
  },
  {
    word: "encourage",
    variants: [
      ["encourage sb to do sth", "鼓励某人做某事", "The supervisor encouraged employees to attend the workshop.", "主管鼓励员工参加研讨会。"],
      ["encourage doing sth", "鼓励做某事", "The new policy encourages sharing ideas during meetings.", "新政策鼓励在会议中分享想法。"]
    ]
  },
  {
    word: "recommend",
    variants: [
      ["recommend doing sth", "建议做某事", "We recommend booking a room early.", "我们建议尽早预订房间。"],
      ["recommend that sb do sth", "建议某人做某事", "The consultant recommended that the company reduce costs.", "顾问建议公司降低成本。"]
    ]
  },
  {
    word: "suggest",
    variants: [
      ["suggest doing sth", "建议做某事", "He suggested changing the delivery date.", "他建议更改送货日期。"],
      ["suggest that sb do sth", "建议某人做某事", "The manager suggested that we review the contract again.", "经理建议我们再次审查合同。"]
    ]
  },
  {
    word: "remind",
    variants: [
      ["remind sb to do sth", "提醒某人去做某事", "Please remind staff to submit receipts.", "请提醒员工提交收据。"],
      ["remind sb of doing sth", "使某人想起做过某事", "The notice reminded employees of signing the policy form last year.", "这则通知让员工想起去年签过政策表格。"]
    ]
  },
  {
    word: "lead",
    variants: [
      ["lead sb to do sth", "导致/引导某人做某事", "The survey led managers to change the training schedule.", "这项调查促使经理们更改培训日程。"],
      ["lead to doing sth", "导致做某事/导致某结果", "The delay led to rescheduling the shipment.", "延误导致重新安排发货。"]
    ]
  },
  {
    word: "proceed",
    variants: [
      ["proceed to do sth", "接着做下一件事", "After the presentation, the speaker proceeded to answer questions.", "演示结束后，演讲者接着回答问题。"],
      ["proceed with doing sth", "继续进行某事", "The team proceeded with testing the new system.", "团队继续测试新系统。"]
    ]
  },
  {
    word: "attempt",
    variants: [
      ["attempt to do sth", "试图做某事", "The technician attempted to repair the machine before noon.", "技术员试图在中午前修好机器。"],
      ["attempt doing sth", "尝试做某事", "The technician attempted restarting the machine before replacing it.", "技术员在更换机器前尝试重启它。"]
    ]
  },
  {
    word: "love",
    variants: [
      ["love to do sth", "喜欢/愿意做某事", "Many customers love to receive updates by email.", "许多客户喜欢通过邮件接收更新。"],
      ["love doing sth", "喜欢做某事", "Many customers love receiving updates by email.", "许多客户喜欢通过邮件接收更新。"]
    ]
  },
  {
    word: "bear",
    variants: [
      ["cannot bear to do sth", "无法忍受去做某事", "The client could not bear to wait another week for the replacement.", "客户无法忍受再等一周更换品。"],
      ["cannot bear doing sth", "无法忍受做某事", "The client could not bear waiting another week for the replacement.", "客户无法忍受再等一周更换品。"]
    ]
  },
  {
    word: "approve",
    variants: [
      ["approve sth", "批准某事", "The director approved the revised budget yesterday.", "主管昨天批准了修订后的预算。"],
      ["approve of doing sth", "赞成做某事", "The director approved of reducing travel expenses.", "主管赞成减少差旅费用。"]
    ]
  },
  {
    word: "admit",
    variants: [
      ["admit doing sth", "承认做过某事", "The clerk admitted making a mistake on the invoice.", "职员承认在发票上犯了错误。"],
      ["admit to doing sth", "承认做过某事", "The clerk admitted to making a mistake on the invoice.", "职员承认在发票上犯了错误。"]
    ]
  },
  {
    word: "deny",
    variants: [
      ["deny doing sth", "否认做过某事", "The supplier denied receiving the payment.", "供应商否认收到付款。"],
      ["deny that sb did sth", "否认某事发生", "The supplier denied that it had received the payment.", "供应商否认已经收到付款。"]
    ]
  },
  {
    word: "object",
    variants: [
      ["object to doing sth", "反对做某事", "Some residents objected to renovating the lobby.", "一些住户反对翻新大厅。"],
      ["object that S V", "提出反对意见说...", "Several employees objected that the schedule was too tight.", "几名员工提出反对意见，说日程太紧。"]
    ]
  },
  {
    word: "be afraid",
    variants: [
      ["be afraid to do sth", "不敢/害怕去做某事", "The trainee was afraid to ask the client a direct question.", "实习生不敢直接问客户问题。"],
      ["be afraid of doing sth", "担心做某事会产生后果", "The trainee was afraid of making a mistake during the call.", "实习生担心在电话中犯错。"]
    ]
  },
  {
    word: "be interested",
    variants: [
      ["be interested to do sth", "对得知/看到某事感兴趣", "We were interested to learn that sales had increased.", "我们很有兴趣得知销售额已经增长。"],
      ["be interested in doing sth", "对做某事感兴趣", "Several employees are interested in attending the seminar.", "几名员工有兴趣参加研讨会。"]
    ]
  },
  {
    word: "be sure",
    variants: [
      ["be sure to do sth", "一定会做某事/务必做某事", "Be sure to check the figures before sending the report.", "发送报告前务必核对数字。"],
      ["be sure of doing sth", "确信能做成某事", "The team is sure of completing the project on schedule.", "团队确信能按计划完成项目。"]
    ]
  },
  {
    word: "be worth",
    variants: [
      ["be worth doing sth", "值得做某事", "The proposal is worth reviewing before the meeting.", "会议前这份提案值得审查。"],
      ["be worthy of being done", "值得被做/值得被讨论", "The issue is worthy of being discussed at the next meeting.", "这个问题值得在下次会议上讨论。"]
    ]
  },
  {
    word: "see",
    variants: [
      ["see sb do sth", "看见某人做了某事的全过程", "The guard saw the visitor enter the building.", "保安看见访客进入了大楼。"],
      ["see sb doing sth", "看见某人正在做某事", "The guard saw the visitor waiting in the lobby.", "保安看见访客正在大厅等候。"],
      ["be seen to do sth", "被看见做某事", "The visitor was seen to enter the building.", "访客被看见进入了大楼。"]
    ]
  },
  {
    word: "hear",
    variants: [
      ["hear sb do sth", "听见某人做了某事", "I heard the manager announce the new policy.", "我听见经理宣布了新政策。"],
      ["hear sb doing sth", "听见某人正在做某事", "I heard the manager discussing the new policy.", "我听见经理正在讨论新政策。"],
      ["be heard to do sth", "被听见做某事", "The manager was heard to announce the new policy.", "有人听见经理宣布新政策。"]
    ]
  },
  {
    word: "watch",
    variants: [
      ["watch sb do sth", "观看某人完成某事", "The trainer watched the clerk process the order.", "培训师看着职员处理完订单。"],
      ["watch sb doing sth", "观看某人正在做某事", "The trainer watched the clerk processing the order.", "培训师看着职员正在处理订单。"]
    ]
  },
  {
    word: "notice",
    variants: [
      ["notice sb do sth", "注意到某人做了某事", "The supervisor noticed the assistant leave early.", "主管注意到助理早退了。"],
      ["notice sb doing sth", "注意到某人正在做某事", "The supervisor noticed the assistant checking the inventory.", "主管注意到助理正在核对库存。"]
    ]
  }
];

grammarPairGroups.push(
  ...[
    {
      word: "agree",
      variants: [
        ["agree to do sth", "同意做某事", "The supplier agreed to reduce the price.", "供应商同意降低价格。"],
        ["agree with sb", "同意某人的意见", "The manager agreed with the consultant.", "经理同意顾问的意见。"],
        ["agree on sth", "就某事达成一致", "Both departments agreed on the new schedule.", "两个部门就新日程达成一致。"]
      ]
    },
    {
      word: "expect",
      variants: [
        ["expect to do sth", "预计/期望做某事", "The company expects to hire more staff.", "公司预计会招聘更多员工。"],
        ["expect sb to do sth", "期望某人做某事", "The manager expects employees to arrive on time.", "经理期望员工准时到达。"],
        ["be expected to do sth", "被期待/预计做某事", "All visitors are expected to sign in at reception.", "所有访客都应在前台签到。"]
      ]
    },
    {
      word: "offer",
      variants: [
        ["offer to do sth", "主动提出做某事", "She offered to prepare the report.", "她主动提出准备报告。"],
        ["offer sb sth", "提供某人某物", "The company offered employees additional training.", "公司为员工提供了额外培训。"],
        ["offer sth to sb", "向某人提供某物", "The hotel offered a discount to conference guests.", "酒店向会议客人提供了折扣。"]
      ]
    },
    {
      word: "fail",
      variants: [
        ["fail to do sth", "未能做某事", "The team failed to meet the deadline.", "团队未能赶上截止日期。"],
        ["fail in sth", "在某事上失败", "The company failed in its attempt to reduce costs.", "公司降低成本的尝试失败了。"]
      ]
    },
    {
      word: "manage",
      variants: [
        ["manage to do sth", "设法做成某事", "We managed to complete the order on time.", "我们设法按时完成订单。"],
        ["manage doing sth", "处理/应对做某事", "The supervisor managed scheduling interviews for the new branch.", "主管负责安排新分店的面试。"]
      ]
    },
    {
      word: "afford",
      variants: [
        ["afford to do sth", "负担得起做某事", "The company cannot afford to replace all the equipment this year.", "公司今年负担不起更换所有设备。"],
        ["afford sb sth", "给予某人某物/机会", "The new policy affords employees more flexibility.", "新政策给予员工更多灵活性。"]
      ]
    },
    {
      word: "choose",
      variants: [
        ["choose to do sth", "选择做某事", "Several employees chose to attend the afternoon session.", "几名员工选择参加下午的课程。"],
        ["choose between A and B", "在A和B之间选择", "The client must choose between standard shipping and express delivery.", "客户必须在普通配送和快递之间选择。"]
      ]
    },
    {
      word: "hope",
      variants: [
        ["hope to do sth", "希望做某事", "We hope to open the new office in September.", "我们希望九月开设新办公室。"],
        ["hope that S V", "希望某事发生", "We hope that the new schedule will reduce delays.", "我们希望新日程能减少延误。"]
      ]
    },
    {
      word: "promise",
      variants: [
        ["promise to do sth", "承诺做某事", "The vendor promised to deliver the order by Monday.", "供应商承诺周一前交付订单。"],
        ["promise sb sth", "向某人承诺某物", "The manager promised the team extra support.", "经理承诺给团队额外支持。"]
      ]
    },
    {
      word: "learn",
      variants: [
        ["learn to do sth", "学会做某事", "New employees learn to use the system during orientation.", "新员工在入职培训中学习使用系统。"],
        ["learn about sth", "了解某事", "The staff learned about the updated policy.", "员工了解了更新后的政策。"]
      ]
    },
    {
      word: "prepare",
      variants: [
        ["prepare to do sth", "准备做某事", "The team prepared to present the proposal.", "团队准备展示提案。"],
        ["prepare for doing sth", "为做某事做准备", "The staff prepared for welcoming overseas visitors.", "员工为接待海外访客做准备。"],
        ["prepare sth for sb", "为某人准备某物", "The assistant prepared a packet for each attendee.", "助理为每位参会者准备了一份资料包。"]
      ]
    },
    {
      word: "arrange",
      variants: [
        ["arrange to do sth", "安排做某事", "The client arranged to meet the manager at noon.", "客户安排中午见经理。"],
        ["arrange for sb to do sth", "安排某人做某事", "The company arranged for a technician to inspect the equipment.", "公司安排技术员检查设备。"]
      ]
    },
    {
      word: "ask",
      variants: [
        ["ask to do sth", "请求做某事", "The visitor asked to speak with the manager.", "访客请求与经理交谈。"],
        ["ask sb to do sth", "要求某人做某事", "The manager asked us to revise the proposal.", "经理要求我们修改提案。"],
        ["ask about sth", "询问某事", "The client asked about the delivery schedule.", "客户询问了配送日程。"]
      ]
    },
    {
      word: "request",
      variants: [
        ["request to do sth", "请求做某事", "The employee requested to attend the training session.", "员工请求参加培训课程。"],
        ["request that sb do sth", "要求某人做某事", "The client requested that the order be delivered early.", "客户要求订单提前送达。"],
        ["request permission to do sth", "请求允许做某事", "The vendor requested permission to enter the warehouse.", "供应商请求允许进入仓库。"]
      ]
    },
    {
      word: "urge",
      variants: [
        ["urge sb to do sth", "敦促某人做某事", "The supervisor urged employees to complete the survey.", "主管敦促员工完成调查。"],
        ["urge that sb do sth", "敦促/强烈建议某人做某事", "The report urged that the company improve safety procedures.", "报告敦促公司改进安全流程。"]
      ]
    },
    {
      word: "persuade",
      variants: [
        ["persuade sb to do sth", "说服某人做某事", "The consultant persuaded the client to renew the contract.", "顾问说服客户续签合同。"],
        ["persuade sb of sth", "使某人相信某事", "The data persuaded the board of the plan's value.", "数据使董事会相信该计划的价值。"]
      ]
    },
    {
      word: "convince",
      variants: [
        ["convince sb to do sth", "说服某人做某事", "The results convinced the manager to expand the program.", "结果说服经理扩大该项目。"],
        ["convince sb that S V", "使某人相信某事", "The report convinced us that demand was increasing.", "报告使我们相信需求正在增加。"]
      ]
    },
    {
      word: "enable",
      variants: [
        ["enable sb to do sth", "使某人能够做某事", "The update enables users to export reports.", "此次更新使用户能够导出报告。"],
        ["enable doing sth", "使做某事成为可能", "The new system enables tracking expenses in real time.", "新系统使实时追踪费用成为可能。"]
      ]
    },
    {
      word: "cause",
      variants: [
        ["cause sb to do sth", "导致某人做某事", "The delay caused customers to complain.", "延误导致客户投诉。"],
        ["cause sth to happen", "导致某事发生", "The storm caused several flights to be canceled.", "暴风雨导致几趟航班取消。"]
      ]
    },
    {
      word: "force",
      variants: [
        ["force sb to do sth", "迫使某人做某事", "The shortage forced the company to change suppliers.", "短缺迫使公司更换供应商。"],
        ["be forced to do sth", "被迫做某事", "The store was forced to close early.", "商店被迫提前关门。"]
      ]
    },
    {
      word: "order",
      variants: [
        ["order sb to do sth", "命令/要求某人做某事", "The supervisor ordered staff to leave the building.", "主管命令员工离开大楼。"],
        ["order sth from sb", "从某处订购某物", "The office ordered supplies from a local vendor.", "办公室从本地供应商订购了用品。"]
      ]
    },
    {
      word: "instruct",
      variants: [
        ["instruct sb to do sth", "指示某人做某事", "The manual instructs users to restart the device.", "手册指示用户重启设备。"],
        ["instructions for doing sth", "做某事的说明", "The packet includes instructions for installing the software.", "资料包包含安装软件的说明。"]
      ]
    },
    {
      word: "invite",
      variants: [
        ["invite sb to do sth", "邀请某人做某事", "The organizer invited guests to register online.", "组织者邀请客人在线注册。"],
        ["invite sb to sth", "邀请某人参加某活动", "The company invited clients to the opening ceremony.", "公司邀请客户参加开幕式。"]
      ]
    },
    {
      word: "warn",
      variants: [
        ["warn sb to do sth", "警告/提醒某人做某事", "The sign warns drivers to slow down.", "标志提醒司机减速。"],
        ["warn sb against doing sth", "警告某人不要做某事", "The manager warned employees against sharing passwords.", "经理警告员工不要共享密码。"],
        ["warn sb of sth", "提醒某人注意某事", "The notice warned residents of a water outage.", "通知提醒住户将停水。"]
      ]
    },
    {
      word: "teach",
      variants: [
        ["teach sb to do sth", "教某人做某事", "The trainer taught new employees to use the database.", "培训师教新员工使用数据库。"],
        ["teach sb about sth", "向某人讲解某事", "The seminar taught staff about workplace safety.", "研讨会向员工讲解了工作场所安全。"]
      ]
    },
    {
      word: "train",
      variants: [
        ["train sb to do sth", "培训某人做某事", "The company trained staff to handle customer complaints.", "公司培训员工处理客户投诉。"],
        ["train sb in doing sth", "在某方面培训某人", "The company trained staff in handling customer complaints.", "公司在处理客户投诉方面培训员工。"]
      ]
    },
    {
      word: "prevent",
      variants: [
        ["prevent sb from doing sth", "阻止某人做某事", "The delay prevented us from shipping the order.", "延误使我们无法发货。"],
        ["prevent sth from happening", "防止某事发生", "The new rule prevents errors from occurring.", "新规定防止错误发生。"]
      ]
    },
    {
      word: "prohibit",
      variants: [
        ["prohibit sb from doing sth", "禁止某人做某事", "The policy prohibits employees from using personal devices.", "该政策禁止员工使用个人设备。"],
        ["prohibit doing sth", "禁止做某事", "The policy prohibits using personal devices.", "该政策禁止使用个人设备。"]
      ]
    },
    {
      word: "discourage",
      variants: [
        ["discourage sb from doing sth", "劝阻某人做某事", "The manager discouraged staff from working overtime.", "经理劝员工不要加班。"],
        ["discourage doing sth", "不鼓励做某事", "The company discourages working overtime without approval.", "公司不鼓励未经批准加班。"]
      ]
    },
    {
      word: "keep",
      variants: [
        ["keep doing sth", "持续做某事", "The team kept reviewing the figures until noon.", "团队一直审查数字到中午。"],
        ["keep sb from doing sth", "阻止某人做某事", "Bad weather kept the shipment from arriving on time.", "恶劣天气使货物未能准时到达。"],
        ["keep sb doing sth", "让某人一直做某事", "The issue kept the technicians working late.", "这个问题让技术员一直工作到很晚。"]
      ]
    },
    {
      word: "spend",
      variants: [
        ["spend time doing sth", "花时间做某事", "She spent an hour preparing the presentation.", "她花了一小时准备演示。"],
        ["spend money on sth", "在某物上花钱", "The company spent money on new equipment.", "公司在新设备上花了钱。"]
      ]
    },
    {
      word: "waste",
      variants: [
        ["waste time doing sth", "浪费时间做某事", "The staff wasted time looking for the missing file.", "员工浪费时间寻找丢失的文件。"],
        ["waste money on sth", "在某事上浪费钱", "The company wasted money on unused software.", "公司在未使用的软件上浪费了钱。"]
      ]
    },
    {
      word: "have difficulty",
      variants: [
        ["have difficulty doing sth", "做某事有困难", "Users had difficulty installing the software.", "用户安装软件时遇到困难。"],
        ["have trouble doing sth", "做某事有麻烦/困难", "Visitors had trouble finding the entrance.", "访客很难找到入口。"],
        ["have a problem doing sth", "做某事有问题", "The team had a problem completing the form online.", "团队在线填写表格时遇到问题。"]
      ]
    },
    {
      word: "be busy",
      variants: [
        ["be busy doing sth", "忙于做某事", "The assistants were busy preparing name tags.", "助理们忙着准备名牌。"],
        ["be busy with sth", "忙于某事", "The assistants were busy with conference preparations.", "助理们忙于会议准备。"]
      ]
    },
    {
      word: "look forward",
      variants: [
        ["look forward to doing sth", "期待做某事", "We look forward to working with you.", "我们期待与您合作。"],
        ["look forward to sth", "期待某事", "We look forward to your reply.", "我们期待您的回复。"]
      ]
    },
    {
      word: "be accustomed",
      variants: [
        ["be accustomed to doing sth", "习惯做某事", "The team is accustomed to working under tight deadlines.", "团队习惯在紧期限下工作。"],
        ["be accustomed to sth", "习惯某事", "The team is accustomed to tight deadlines.", "团队习惯紧期限。"]
      ]
    },
    {
      word: "be opposed",
      variants: [
        ["be opposed to doing sth", "反对做某事", "Several residents are opposed to renovating the lobby.", "几名住户反对翻新大厅。"],
        ["be opposed to sth", "反对某事", "Several residents are opposed to the renovation plan.", "几名住户反对翻新计划。"]
      ]
    },
    {
      word: "be committed",
      variants: [
        ["be committed to doing sth", "致力于做某事", "The company is committed to reducing waste.", "公司致力于减少浪费。"],
        ["be committed to sth", "致力于某事", "The company is committed to environmental protection.", "公司致力于环境保护。"]
      ]
    },
    {
      word: "be devoted",
      variants: [
        ["be devoted to doing sth", "致力于做某事", "The team is devoted to improving customer service.", "团队致力于改善客户服务。"],
        ["be devoted to sth", "致力于某事", "The team is devoted to customer service.", "团队致力于客户服务。"]
      ]
    },
    {
      word: "be dedicated",
      variants: [
        ["be dedicated to doing sth", "专注于/致力于做某事", "The department is dedicated to improving safety.", "该部门致力于改善安全。"],
        ["be dedicated to sth", "专用于/致力于某事", "This room is dedicated to staff training.", "这个房间专用于员工培训。"]
      ]
    },
    {
      word: "contribute",
      variants: [
        ["contribute to doing sth", "促成做某事", "The new system contributed to reducing errors.", "新系统促成了错误减少。"],
        ["contribute to sth", "促成/贡献于某事", "The new system contributed to fewer errors.", "新系统促成了更少错误。"]
      ]
    },
    {
      word: "adjust",
      variants: [
        ["adjust to doing sth", "适应做某事", "Employees adjusted to using the new software.", "员工适应了使用新软件。"],
        ["adjust sth to sth", "把某物调整到某状态", "The technician adjusted the screen to a brighter setting.", "技术员把屏幕调到更亮的设置。"]
      ]
    },
    {
      word: "adapt",
      variants: [
        ["adapt to doing sth", "适应做某事", "The staff adapted to working with the new system.", "员工适应了使用新系统工作。"],
        ["adapt sth for sth", "为某用途改编/改造某物", "The company adapted the room for online meetings.", "公司把房间改造成线上会议室。"]
      ]
    },
    {
      word: "be subject",
      variants: [
        ["be subject to doing sth", "可能会被做某事/受做某事影响", "The schedule is subject to changing without notice.", "日程可能会在不通知的情况下更改。"],
        ["be subject to sth", "受某事约束/可能遭受某事", "The offer is subject to manager approval.", "该报价须经经理批准。"]
      ]
    },
    {
      word: "in addition",
      variants: [
        ["in addition to doing sth", "除了做某事之外", "In addition to reviewing invoices, the clerk updates records.", "除了审查发票，职员还更新记录。"],
        ["in addition to sth", "除某事之外", "In addition to the invoice, please send the receipt.", "除了发票，请也发送收据。"]
      ]
    },
    {
      word: "when it comes",
      variants: [
        ["when it comes to doing sth", "说到做某事", "When it comes to handling complaints, speed is important.", "说到处理投诉，速度很重要。"],
        ["when it comes to sth", "说到某事", "When it comes to customer service, speed is important.", "说到客户服务，速度很重要。"]
      ]
    },
    {
      word: "be close",
      variants: [
        ["be close to doing sth", "快要做某事", "The team is close to completing the project.", "团队快要完成项目了。"],
        ["be close to sth", "接近某事/某地", "The hotel is close to the convention center.", "酒店离会议中心很近。"]
      ]
    },
    {
      word: "make",
      variants: [
        ["make sb do sth", "让某人做某事", "The new rule made employees update their passwords.", "新规定让员工更新密码。"],
        ["be made to do sth", "被迫/被要求做某事", "Employees were made to update their passwords.", "员工被要求更新密码。"],
        ["make it possible to do sth", "使做某事成为可能", "The new system makes it possible to track orders online.", "新系统使在线追踪订单成为可能。"]
      ]
    },
    {
      word: "let",
      variants: [
        ["let sb do sth", "让某人做某事", "The manager let employees leave early.", "经理允许员工提前离开。"],
        ["be allowed to do sth", "被允许做某事", "Employees are allowed to leave early on Friday.", "员工周五可以提前离开。"]
      ]
    },
    {
      word: "have",
      variants: [
        ["have sb do sth", "让某人做某事", "The manager had the assistant send the agenda.", "经理让助理发送议程。"],
        ["have sth done", "请人/让人完成某事", "The company had the equipment repaired.", "公司让人修好了设备。"],
        ["have sb doing sth", "让某人一直做某事", "The delay had customers waiting for hours.", "延误让客户等了几个小时。"]
      ]
    },
    {
      word: "get",
      variants: [
        ["get sb to do sth", "让/说服某人做某事", "The supervisor got the team to finish the report.", "主管让团队完成了报告。"],
        ["get sth done", "把某事做完/请人做某事", "The assistant got the forms printed before noon.", "助理在中午前把表格打印好了。"],
        ["get used to doing sth", "逐渐习惯做某事", "New employees got used to using the online portal.", "新员工逐渐习惯使用在线门户。"]
      ]
    },
    {
      word: "feel",
      variants: [
        ["feel sb do sth", "感觉到某人/某物做了某事", "The technician felt the machine shake once.", "技术员感觉机器震了一下。"],
        ["feel sb/sth doing sth", "感觉到某人/某物正在做某事", "The technician felt the machine shaking during the test.", "测试期间技术员感觉机器正在震动。"]
      ]
    },
    {
      word: "observe",
      variants: [
        ["observe sb do sth", "观察到某人做了某事", "The supervisor observed the clerk complete the form.", "主管观察到职员完成了表格。"],
        ["observe sb doing sth", "观察到某人正在做某事", "The supervisor observed the clerk completing the form.", "主管观察到职员正在填写表格。"]
      ]
    },
    {
      word: "find",
      variants: [
        ["find sb doing sth", "发现某人正在做某事", "The manager found the assistant updating the schedule.", "经理发现助理正在更新时间表。"],
        ["find it adj to do sth", "发现做某事很...", "Employees found it easy to use the new software.", "员工发现新软件很容易使用。"],
        ["find sth adj", "发现某事/某物很...", "Employees found the new software easy to use.", "员工发现新软件很容易使用。"]
      ]
    },
    {
      word: "leave",
      variants: [
        ["leave sb doing sth", "让某人继续处于做某事的状态", "The delay left customers waiting in the lobby.", "延误让客户一直在大厅等候。"],
        ["leave sth done", "让某事保持被完成状态", "Please leave the documents signed on the desk.", "请把签好的文件留在桌上。"],
        ["leave sth to sb", "把某事留给某人处理", "The manager left the decision to the finance team.", "经理把决定交给财务团队。"]
      ]
    },
    {
      word: "catch",
      variants: [
        ["catch sb doing sth", "撞见某人正在做某事", "The supervisor caught an employee using the wrong form.", "主管撞见一名员工正在使用错误表格。"],
        ["be caught doing sth", "被撞见正在做某事", "The employee was caught using the wrong form.", "员工被撞见正在使用错误表格。"]
      ]
    },
    {
      word: "be likely",
      variants: [
        ["be likely to do sth", "可能做某事", "The shipment is likely to arrive tomorrow.", "货物可能明天到达。"],
        ["be unlikely to do sth", "不太可能做某事", "The shipment is unlikely to arrive today.", "货物今天不太可能到达。"]
      ]
    },
    {
      word: "be able",
      variants: [
        ["be able to do sth", "能够做某事", "The team was able to finish the report before noon.", "团队能够在中午前完成报告。"],
        ["be capable of doing sth", "有能力做某事", "The system is capable of processing large orders.", "该系统能够处理大订单。"]
      ]
    },
    {
      word: "be ready",
      variants: [
        ["be ready to do sth", "准备好做某事", "The staff are ready to welcome the guests.", "员工准备好迎接客人。"],
        ["be ready for doing sth", "为做某事准备好", "The staff are ready for welcoming the guests.", "员工为迎接客人做好了准备。"]
      ]
    },
    {
      word: "be willing",
      variants: [
        ["be willing to do sth", "愿意做某事", "The supplier is willing to offer a discount.", "供应商愿意提供折扣。"],
        ["be unwilling to do sth", "不愿意做某事", "The supplier is unwilling to change the delivery date.", "供应商不愿更改配送日期。"]
      ]
    },
    {
      word: "be eager",
      variants: [
        ["be eager to do sth", "渴望做某事", "The interns are eager to learn about the project.", "实习生渴望了解这个项目。"],
        ["be eager for sth", "渴望某事", "The interns are eager for more training.", "实习生渴望更多培训。"]
      ]
    },
    {
      word: "be reluctant",
      variants: [
        ["be reluctant to do sth", "不情愿做某事", "The client was reluctant to sign the contract.", "客户不愿签合同。"],
        ["be reluctant about doing sth", "对做某事不情愿", "The client was reluctant about signing the contract.", "客户对签合同不情愿。"]
      ]
    },
    {
      word: "be scheduled",
      variants: [
        ["be scheduled to do sth", "预定做某事", "The CEO is scheduled to speak at noon.", "首席执行官预定中午发言。"],
        ["be scheduled for sth", "被安排在某时间/某活动", "The meeting is scheduled for Monday.", "会议安排在周一。"]
      ]
    },
    {
      word: "be required",
      variants: [
        ["be required to do sth", "被要求做某事", "Visitors are required to wear badges.", "访客被要求佩戴胸牌。"],
        ["require doing sth", "需要被做某事", "The documents require checking before submission.", "文件提交前需要检查。"]
      ]
    },
    {
      word: "be eligible",
      variants: [
        ["be eligible to do sth", "有资格做某事", "Full-time employees are eligible to apply for the program.", "全职员工有资格申请该项目。"],
        ["be eligible for sth", "有资格获得某物/参加某事", "Full-time employees are eligible for health benefits.", "全职员工有资格获得健康福利。"]
      ]
    },
    {
      word: "be responsible",
      variants: [
        ["be responsible for doing sth", "负责做某事", "The assistant is responsible for scheduling interviews.", "助理负责安排面试。"],
        ["be responsible for sth", "负责某事", "The assistant is responsible for interview schedules.", "助理负责面试日程。"]
      ]
    },
    {
      word: "be good",
      variants: [
        ["be good at doing sth", "擅长做某事", "The clerk is good at handling customer requests.", "职员擅长处理客户请求。"],
        ["be good for sth", "对某事有益/有效", "The discount is good for one month.", "折扣有效期为一个月。"]
      ]
    },
    {
      word: "be tired",
      variants: [
        ["be tired of doing sth", "厌倦做某事", "Employees were tired of entering the same data twice.", "员工厌倦了重复输入同样的数据。"],
        ["be tired from doing sth", "因做某事而疲惫", "Employees were tired from preparing the exhibition.", "员工因准备展会而疲惫。"]
      ]
    },
    {
      word: "be known",
      variants: [
        ["be known to do sth", "被认为会做某事", "The supplier is known to deliver orders quickly.", "该供应商以快速交付订单而闻名。"],
        ["be known for doing sth", "因做某事而闻名", "The hotel is known for providing excellent service.", "这家酒店以提供优质服务而闻名。"],
        ["be known as sth", "作为某身份/名称而闻名", "The company is known as a reliable vendor.", "该公司以可靠供应商著称。"]
      ]
    },
    {
      word: "it is important",
      variants: [
        ["it is important for sb to do sth", "某人做某事很重要", "It is important for employees to read the safety rules.", "员工阅读安全规则很重要。"],
        ["it is important that sb do sth", "某人做某事很重要", "It is important that employees read the safety rules.", "员工阅读安全规则很重要。"]
      ]
    },
    {
      word: "it is necessary",
      variants: [
        ["it is necessary for sb to do sth", "某人有必要做某事", "It is necessary for visitors to sign in.", "访客有必要签到。"],
        ["it is necessary that sb do sth", "某人有必要做某事", "It is necessary that visitors sign in.", "访客有必要签到。"]
      ]
    },
    {
      word: "it is advisable",
      variants: [
        ["it is advisable for sb to do sth", "某人最好做某事", "It is advisable for travelers to confirm reservations.", "旅客最好确认预订。"],
        ["it is advisable that sb do sth", "建议某人做某事", "It is advisable that travelers confirm reservations.", "建议旅客确认预订。"]
      ]
    },
    {
      word: "too/enough",
      variants: [
        ["too adj to do sth", "太...而不能做某事", "The file is too large to send by email.", "文件太大，无法通过邮件发送。"],
        ["adj enough to do sth", "足够...可以做某事", "The room is large enough to hold fifty people.", "房间足够大，可以容纳五十人。"],
        ["enough n to do sth", "足够的某物去做某事", "We have enough time to review the contract.", "我们有足够时间审查合同。"]
      ]
    },
    {
      word: "no use/point",
      variants: [
        ["it is no use doing sth", "做某事没有用", "It is no use calling the office after hours.", "下班后给办公室打电话没有用。"],
        ["there is no point in doing sth", "做某事没有意义", "There is no point in printing the old schedule.", "打印旧日程没有意义。"]
      ]
    }
  ]
);

grammarPairGroups.push(
  ...[
    {
      word: "apply",
      variants: [
        ["apply for sth", "申请某物/职位", "Several candidates applied for the marketing position.", "几名候选人申请了市场营销职位。"],
        ["apply to sb/sth", "适用于某人/某事", "The discount applies to online orders only.", "该折扣只适用于线上订单。"],
        ["apply A to B", "把A应用于B", "The team applied the new rule to all refund requests.", "团队把新规定应用于所有退款请求。"]
      ]
    },
    {
      word: "belong",
      variants: [
        ["belong to sb/sth", "属于某人/某物", "The laptop belongs to the accounting department.", "这台笔记本电脑属于会计部门。"],
        ["belong in/on/at a place", "应该放在某处", "The safety manual belongs on the front desk.", "安全手册应该放在前台。"]
      ]
    },
    {
      word: "consist",
      variants: [
        ["consist of sth", "由某物组成", "The training package consists of three online lessons.", "培训包由三节线上课程组成。"],
        ["consist in sth", "在于某事", "The main challenge consists in reducing delivery delays.", "主要挑战在于减少配送延误。"]
      ]
    },
    {
      word: "depend/rely",
      variants: [
        ["depend on sth/sb", "取决于/依靠某事或某人", "The final schedule depends on room availability.", "最终日程取决于房间可用情况。"],
        ["rely on sth/sb", "依靠某事或某人", "The sales team relies on accurate inventory data.", "销售团队依靠准确的库存数据。"],
        ["depend on sb to do sth", "指望某人做某事", "We depend on the courier to deliver the samples today.", "我们指望快递员今天送达样品。"]
      ]
    },
    {
      word: "result",
      variants: [
        ["result from sth", "由某事造成", "The delay resulted from a problem at the warehouse.", "延误是由仓库问题造成的。"],
        ["result in sth/doing sth", "导致某事/导致做某事", "The policy resulted in fewer billing errors.", "该政策导致账单错误减少。"]
      ]
    },
    {
      word: "compare",
      variants: [
        ["compare A with B", "把A和B作比较", "The analyst compared this quarter's sales with last year's figures.", "分析师把本季度销售额和去年的数据作了比较。"],
        ["compare A to B", "把A比作B", "The trainer compared the new system to a digital filing cabinet.", "培训师把新系统比作数字文件柜。"],
        ["compared with/to sth", "与某事相比", "Compared with last month, website traffic increased sharply.", "与上月相比，网站访问量大幅增加。"]
      ]
    },
    {
      word: "contrast",
      variants: [
        ["contrast A with B", "把A和B作对比", "The report contrasts online sales with store sales.", "报告对比了线上销售和门店销售。"],
        ["in contrast to sth", "与某事形成对比", "In contrast to last year, attendance was much higher.", "与去年相比，出席人数高得多。"],
        ["by contrast", "相比之下", "The downtown branch was busy; by contrast, the airport branch was quiet.", "市中心分店很忙；相比之下，机场分店很安静。"]
      ]
    },
    {
      word: "respond/reply",
      variants: [
        ["respond to sth/sb", "回应某事/某人", "The supplier responded to the complaint within an hour.", "供应商在一小时内回复了投诉。"],
        ["reply to sth/sb", "回复某事/某人", "Please reply to the invitation by Wednesday.", "请在周三前回复邀请。"],
        ["response to sth", "对某事的回应", "The response to the new menu was positive.", "对新菜单的反应是积极的。"]
      ]
    },
    {
      word: "refer",
      variants: [
        ["refer to sth", "提到/参考某事", "Please refer to the attached schedule for details.", "详情请参考附件中的日程。"],
        ["refer sb to sb/sth", "把某人转给某人/某处", "The receptionist referred the visitor to the human resources office.", "接待员把访客转到人力资源办公室。"],
        ["reference to sth", "对某事的提及/参考", "The email includes a reference to the revised contract.", "邮件中提到了修订后的合同。"]
      ]
    },
    {
      word: "apologize",
      variants: [
        ["apologize to sb", "向某人道歉", "The airline apologized to passengers for the delay.", "航空公司因延误向乘客道歉。"],
        ["apologize for doing sth", "因做某事而道歉", "The hotel apologized for overcharging several guests.", "酒店因向几位客人多收费而道歉。"],
        ["apology for sth", "因某事的道歉", "The manager issued an apology for the billing error.", "经理为账单错误发布了道歉声明。"]
      ]
    },
    {
      word: "thank",
      variants: [
        ["thank sb for sth", "因某事感谢某人", "The director thanked the staff for their hard work.", "主管感谢员工的辛勤工作。"],
        ["thank sb for doing sth", "感谢某人做某事", "We thanked the client for sending the documents early.", "我们感谢客户提前发送文件。"],
        ["be thankful for sth", "对某事感到感激", "The team was thankful for the extra support.", "团队对额外支持感到感激。"]
      ]
    },
    {
      word: "charge",
      variants: [
        ["charge sb for sth", "向某人收取某项费用", "The hotel charged guests for parking.", "酒店向客人收取停车费。"],
        ["charge sth to an account", "把费用记到账户上", "Please charge the meal to the company account.", "请把餐费记到公司账户上。"],
        ["be in charge of sth", "负责某事", "Ms. Lee is in charge of the training program.", "李女士负责培训项目。"]
      ]
    },
    {
      word: "provide",
      variants: [
        ["provide sb with sth", "向某人提供某物", "The hotel provided guests with shuttle passes.", "酒店向客人提供接驳车票。"],
        ["provide sth for sb", "为某人提供某物", "The company provided laptops for remote employees.", "公司为远程员工提供笔记本电脑。"],
        ["provide that S V", "规定/如果", "The contract provides that payment is due within thirty days.", "合同规定付款应在三十天内完成。"]
      ]
    },
    {
      word: "supply",
      variants: [
        ["supply sb with sth", "向某人供应某物", "The vendor supplied the office with new chairs.", "供应商向办公室供应了新椅子。"],
        ["supply sth to sb", "把某物供应给某人", "The warehouse supplies parts to several branches.", "仓库向几家分店供应零件。"],
        ["supply of sth", "某物的供应量", "The supply of printer paper is running low.", "打印纸供应量快不足了。"]
      ]
    },
    {
      word: "present",
      variants: [
        ["present sth to sb", "向某人展示/提交某物", "The consultant presented the findings to the board.", "顾问向董事会展示了调查结果。"],
        ["present sb with sth", "向某人提供/颁发某物", "The organizer presented each speaker with a certificate.", "组织者向每位演讲者颁发了一张证书。"],
        ["be present at sth", "出席某活动", "All supervisors must be present at the safety briefing.", "所有主管必须出席安全说明会。"]
      ]
    },
    {
      word: "inform/notify",
      variants: [
        ["inform sb of sth", "通知某人某事", "The airline informed passengers of the gate change.", "航空公司通知乘客登机口变更。"],
        ["inform sb that S V", "通知某人某事", "The manager informed us that the deadline had changed.", "经理通知我们截止日期已变更。"],
        ["notify sb of sth", "通知某人某事", "Please notify customers of the new pickup time.", "请通知客户新的取货时间。"]
      ]
    },
    {
      word: "assure",
      variants: [
        ["assure sb that S V", "向某人保证某事", "The supplier assured us that the shipment would arrive today.", "供应商向我们保证货物今天会到。"],
        ["assure sb of sth", "使某人确信某事", "The inspection assured the manager of the product's quality.", "检查让经理确信产品质量。"],
        ["be assured of sth", "确信能得到某事", "Members are assured of prompt service.", "会员确信能得到迅速服务。"]
      ]
    },
    {
      word: "blame/accuse",
      variants: [
        ["blame sb for sth", "因某事责备某人", "The client blamed the courier for the delay.", "客户因延误责备快递员。"],
        ["blame sth on sb/sth", "把某事归咎于某人/某物", "The company blamed the outage on a software error.", "公司把停机归咎于软件错误。"],
        ["accuse sb of doing sth", "指责某人做了某事", "The customer accused the store of charging twice.", "客户指责商店重复收费。"]
      ]
    },
    {
      word: "replace/substitute",
      variants: [
        ["replace A with B", "用B替换A", "The technician replaced the old battery with a new one.", "技术员用新电池替换了旧电池。"],
        ["substitute A for B", "用A代替B", "The chef substituted olive oil for butter.", "厨师用橄榄油代替黄油。"],
        ["be substituted for sth", "被用来替代某物", "A digital pass was substituted for the paper ticket.", "电子通行证被用来替代纸质票。"]
      ]
    },
    {
      word: "exchange",
      variants: [
        ["exchange A for B", "把A换成B", "The customer exchanged the shirt for a larger size.", "客户把衬衫换成了更大尺码。"],
        ["exchange sth with sb", "与某人交换某物", "The two departments exchanged data with each other.", "两个部门互相交换了数据。"],
        ["in exchange for sth", "作为交换", "The store gave a coupon in exchange for feedback.", "商店用优惠券换取反馈。"]
      ]
    },
    {
      word: "distinguish",
      variants: [
        ["distinguish A from B", "把A和B区分开", "The label helps customers distinguish original products from copies.", "标签帮助客户区分正品和仿品。"],
        ["distinguish between A and B", "区分A和B", "The software distinguishes between paid and unpaid invoices.", "软件区分已付款和未付款发票。"],
        ["be distinguished for sth", "因某事而著名", "The restaurant is distinguished for its service.", "这家餐厅因服务而著名。"]
      ]
    },
    {
      word: "congratulate",
      variants: [
        ["congratulate sb on sth", "因某事祝贺某人", "The CEO congratulated the team on its success.", "首席执行官祝贺团队取得成功。"],
        ["congratulate sb on doing sth", "祝贺某人做成某事", "We congratulated her on receiving the award.", "我们祝贺她获奖。"]
      ]
    },
    {
      word: "participate",
      variants: [
        ["participate in sth", "参加某事", "Employees are encouraged to participate in the workshop.", "公司鼓励员工参加研讨会。"],
        ["participate in doing sth", "参与做某事", "Several branches participated in testing the new system.", "几家分店参与测试新系统。"]
      ]
    },
    {
      word: "succeed",
      variants: [
        ["succeed in doing sth", "成功做成某事", "The team succeeded in reducing delivery errors.", "团队成功减少了配送错误。"],
        ["succeed sb as sth", "接替某人成为某职位", "Ms. Kim succeeded Mr. Jones as branch manager.", "Kim 女士接替 Jones 先生成为分店经理。"]
      ]
    },
    {
      word: "specialize",
      variants: [
        ["specialize in sth/doing sth", "专门从事某事", "The agency specializes in arranging business travel.", "这家代理机构专门安排商务旅行。"],
        ["be specialized in sth", "专门研究/从事某事", "The technician is specialized in network security.", "这名技术员专精网络安全。"]
      ]
    },
    {
      word: "access",
      variants: [
        ["access to sth", "使用/进入某物的权限", "Employees need access to the shared database.", "员工需要共享数据库的访问权限。"],
        ["have access to sth", "可以使用/进入某物", "Guests have access to the fitness center.", "客人可以使用健身中心。"],
        ["accessible to sb", "某人可使用/可进入", "The online form is accessible to all applicants.", "所有申请人都可以使用在线表格。"]
      ]
    },
    {
      word: "approach",
      variants: [
        ["approach to sth/doing sth", "处理某事的方法", "The manager explained a new approach to scheduling shifts.", "经理解释了一种新的排班方法。"],
        ["approach sb about sth", "就某事找某人商量", "The assistant approached the supervisor about the delay.", "助理就延误问题找主管商量。"]
      ]
    },
    {
      word: "attention",
      variants: [
        ["pay attention to sth", "注意某事", "Please pay attention to the revised deadline.", "请注意修订后的截止日期。"],
        ["draw attention to sth", "使人注意某事", "The memo drew attention to the new safety rule.", "备忘录让大家注意新的安全规定。"],
        ["attention to detail", "对细节的关注", "The position requires strong attention to detail.", "该职位要求高度关注细节。"]
      ]
    },
    {
      word: "attitude",
      variants: [
        ["attitude toward sth", "对某事的态度", "The survey measured customer attitudes toward the new service.", "调查衡量了客户对新服务的态度。"],
        ["attitude to sth", "对某事的态度", "Her attitude to workplace training is positive.", "她对职场培训的态度很积极。"]
      ]
    },
    {
      word: "reason",
      variants: [
        ["reason for sth", "某事的原因", "The reason for the delay was a missing document.", "延误的原因是一份文件缺失。"],
        ["reason to do sth", "做某事的理由", "Customers have a good reason to keep their receipts.", "客户有充分理由保留收据。"],
        ["reasonable for sb to do sth", "某人做某事是合理的", "It is reasonable for guests to request a refund.", "客人要求退款是合理的。"]
      ]
    },
    {
      word: "solution/key",
      variants: [
        ["solution to sth", "某事的解决办法", "The technician found a solution to the network problem.", "技术员找到了网络问题的解决办法。"],
        ["key to sth/doing sth", "某事/做某事的关键", "Clear communication is the key to avoiding delays.", "清晰沟通是避免延误的关键。"],
        ["answer to sth", "某事的答案", "The answer to the customer's question is in the brochure.", "客户问题的答案在宣传册里。"]
      ]
    },
    {
      word: "increase/decrease",
      variants: [
        ["increase in sth", "某事的增长", "There was an increase in online reservations.", "线上预订量有所增长。"],
        ["decrease in sth", "某事的减少", "The store reported a decrease in returns.", "商店报告退货量有所减少。"],
        ["increase by/to", "增加了/增加到", "Sales increased by ten percent to a record high.", "销售额增长了百分之十，达到历史新高。"]
      ]
    },
    {
      word: "preference",
      variants: [
        ["preference for sth", "对某事的偏好", "Many customers showed a preference for digital receipts.", "许多客户表现出对电子收据的偏好。"],
        ["prefer A to B", "比起B更喜欢A", "The client prefers email to phone calls.", "比起电话，客户更喜欢邮件。"],
        ["prefer doing A to doing B", "比起做B更喜欢做A", "The team prefers meeting online to traveling for updates.", "团队比起为更新事项出差，更喜欢线上开会。"]
      ]
    },
    {
      word: "exception",
      variants: [
        ["exception to sth", "某事的例外", "There is one exception to the refund policy.", "退款政策有一个例外。"],
        ["except for sth", "除了某事之外", "Except for one missing receipt, the report is complete.", "除了一张缺失的收据外，报告已经完整。"],
        ["with the exception of sth", "除了某事之外", "All offices are open with the exception of the downtown branch.", "除市中心分店外，所有办公室都开放。"]
      ]
    },
    {
      word: "advantage",
      variants: [
        ["advantage of sth", "某事的优势", "One advantage of the new system is faster reporting.", "新系统的一个优势是报告速度更快。"],
        ["take advantage of sth", "利用某事", "Members can take advantage of the discount this week.", "会员本周可以利用该折扣。"],
        ["advantage over sth", "相对于某物的优势", "The new model has an advantage over older machines.", "新型号相对于旧机器有优势。"]
      ]
    },
    {
      word: "shortage/lack",
      variants: [
        ["shortage of sth", "某物短缺", "A shortage of drivers delayed deliveries.", "司机短缺导致配送延误。"],
        ["lack of sth", "缺乏某物", "A lack of clear instructions caused confusion.", "缺乏清晰说明造成了混乱。"],
        ["be short of sth", "缺少某物", "The office is short of printer paper.", "办公室缺少打印纸。"]
      ]
    },
    {
      word: "opportunity/ability",
      variants: [
        ["opportunity to do sth", "做某事的机会", "Employees had an opportunity to ask questions.", "员工有机会提问。"],
        ["opportunity for sth", "某事的机会", "The event created opportunities for networking.", "这场活动创造了交流机会。"],
        ["ability to do sth", "做某事的能力", "The device has the ability to scan receipts quickly.", "该设备具备快速扫描收据的能力。"]
      ]
    },
    {
      word: "aware/familiar",
      variants: [
        ["be aware of sth", "意识到某事", "Managers should be aware of the new deadline.", "经理们应该意识到新的截止日期。"],
        ["be familiar with sth", "熟悉某事", "New employees are familiar with the online portal.", "新员工熟悉在线门户。"],
        ["be unfamiliar with sth", "不熟悉某事", "Some guests were unfamiliar with the check-in system.", "一些客人不熟悉入住系统。"]
      ]
    },
    {
      word: "similar/different",
      variants: [
        ["be similar to sth", "与某物相似", "The new form is similar to the previous version.", "新表格与上一版相似。"],
        ["be different from sth", "与某物不同", "The online price is different from the store price.", "线上价格与门店价格不同。"],
        ["differ from sth", "与某物不同", "The final invoice differs from the estimate.", "最终发票与估价单不同。"]
      ]
    },
    {
      word: "suitable/appropriate",
      variants: [
        ["be suitable for sth", "适合某事/某物", "The room is suitable for small meetings.", "这个房间适合小型会议。"],
        ["be appropriate for sth", "适合某事/某物", "Business attire is appropriate for the dinner.", "商务着装适合这次晚宴。"],
        ["be appropriate to do sth", "做某事是合适的", "It is appropriate to confirm the price in writing.", "以书面形式确认价格是合适的。"]
      ]
    },
    {
      word: "available",
      variants: [
        ["be available to do sth", "有空/可用于做某事", "A technician is available to inspect the copier.", "有技术员可以检查复印机。"],
        ["be available for sth", "可用于/有空参加某事", "The conference room is available for interviews.", "会议室可用于面试。"],
        ["be available to sb", "某人可获得/可使用", "The report is available to all managers.", "所有经理都可以查看这份报告。"]
      ]
    },
    {
      word: "satisfied/pleased",
      variants: [
        ["be satisfied with sth", "对某事满意", "Customers were satisfied with the quick service.", "客户对快速服务感到满意。"],
        ["be pleased with sth", "对某事满意", "The director was pleased with the final design.", "主管对最终设计感到满意。"],
        ["be pleased to do sth", "很高兴做某事", "We are pleased to announce the new opening date.", "我们很高兴宣布新的开业日期。"]
      ]
    },
    {
      word: "concerned",
      variants: [
        ["be concerned about sth", "担心某事", "The manager is concerned about rising costs.", "经理担心成本上升。"],
        ["be concerned with sth", "与某事有关/关注某事", "The report is concerned with employee safety.", "这份报告关注员工安全。"],
        ["concerning sth", "关于某事", "The email concerning the schedule was sent yesterday.", "关于日程的邮件昨天已发送。"]
      ]
    },
    {
      word: "related/relevant",
      variants: [
        ["be related to sth", "与某事有关", "The delay was related to a customs inspection.", "延误与海关检查有关。"],
        ["be relevant to sth", "与某事相关", "Only information relevant to the claim is required.", "只需要与索赔相关的信息。"],
        ["in relation to sth", "关于/涉及某事", "The question was asked in relation to the new policy.", "这个问题是关于新政策提出的。"]
      ]
    },
    {
      word: "absent/present",
      variants: [
        ["be absent from sth", "缺席某事", "Several employees were absent from the training session.", "几名员工缺席了培训课。"],
        ["be present at sth", "出席某事", "All team leaders were present at the briefing.", "所有组长都出席了说明会。"],
        ["absence from sth", "缺席某事", "Her absence from the meeting was unexpected.", "她缺席会议出乎意料。"]
      ]
    },
    {
      word: "full/filled",
      variants: [
        ["be full of sth", "充满某物", "The storage room is full of unused boxes.", "储藏室里满是未使用的箱子。"],
        ["be filled with sth", "装满某物/充满某物", "The folder was filled with receipts.", "文件夹里装满了收据。"],
        ["fill out a form", "填写表格", "Applicants must fill out the form online.", "申请人必须在线填写表格。"]
      ]
    },
    {
      word: "not only",
      variants: [
        ["not only A but also B", "不仅A而且B", "The update is not only faster but also easier to use.", "这次更新不仅更快，而且更容易使用。"],
        ["not only do/does/did S V, but S also V", "倒装形式：不仅...而且...", "Not only did sales increase, but customer ratings also improved.", "不仅销售额增加了，客户评分也提高了。"]
      ]
    },
    {
      word: "either/neither",
      variants: [
        ["either A or B", "要么A要么B", "Guests may choose either a refund or a credit.", "客人可以选择退款或抵用金。"],
        ["neither A nor B", "既不A也不B", "Neither the invoice nor the receipt was attached.", "发票和收据都没有附上。"],
        ["both A and B", "A和B两者都", "Both the manager and the assistant attended the call.", "经理和助理都参加了电话会议。"]
      ]
    },
    {
      word: "whether",
      variants: [
        ["whether A or B", "无论A还是B/是否A或B", "The policy applies whether the order is online or in-store.", "无论订单是线上还是店内下单，该政策都适用。"],
        ["whether to do sth", "是否做某事", "The team discussed whether to postpone the launch.", "团队讨论是否推迟发布。"],
        ["whether or not", "是否/不管是否", "Please confirm whether or not you can attend.", "请确认你是否能参加。"]
      ]
    },
    {
      word: "between/from",
      variants: [
        ["between A and B", "在A和B之间", "The interview is scheduled between two and three.", "面试安排在两点到三点之间。"],
        ["from A to B", "从A到B", "The shuttle runs from the hotel to the airport.", "接驳车从酒店开往机场。"],
        ["range from A to B", "范围从A到B", "Prices range from twenty to fifty dollars.", "价格从二十美元到五十美元不等。"]
      ]
    },
    {
      word: "rather/instead",
      variants: [
        ["rather than do/doing sth", "而不是做某事", "The team sent an email rather than calling each client.", "团队发送了邮件，而不是逐个给客户打电话。"],
        ["instead of doing sth", "代替做某事/而不是做某事", "The company held an online meeting instead of renting a hall.", "公司举行线上会议，而不是租大厅。"],
        ["would rather do A than do B", "宁愿做A也不做B", "The client would rather wait than accept a damaged item.", "客户宁愿等待，也不愿接受损坏的商品。"]
      ]
    },
    {
      word: "because/due",
      variants: [
        ["because of sth", "因为某事", "The flight was delayed because of heavy rain.", "航班因大雨延误。"],
        ["due to sth", "由于某事", "The cancellation was due to low attendance.", "取消是由于出席人数少。"],
        ["owing to sth", "由于某事", "Owing to maintenance, the elevator is unavailable.", "由于维护，电梯无法使用。"]
      ]
    },
    {
      word: "despite",
      variants: [
        ["despite sth/doing sth", "尽管某事/尽管做某事", "Despite receiving many orders, the team shipped everything on time.", "尽管收到许多订单，团队仍按时发出了所有货物。"],
        ["in spite of sth/doing sth", "尽管某事/尽管做某事", "In spite of the delay, the meeting began on time.", "尽管有延误，会议仍准时开始。"],
        ["although S V", "尽管某事发生", "Although the store was busy, service was quick.", "尽管商店很忙，服务仍然很快。"]
      ]
    },
    {
      word: "so/such",
      variants: [
        ["so adj that S V", "如此...以至于...", "The room was so crowded that some guests stood outside.", "房间太挤了，以至于一些客人站在外面。"],
        ["such a/an adj n that S V", "如此...的一个...以至于...", "It was such a popular event that tickets sold out quickly.", "这场活动如此受欢迎，以至于票很快售罄。"],
        ["so that S can/could V", "以便/为了", "The notice was posted early so that everyone could read it.", "通知早早张贴出来，以便每个人都能看到。"]
      ]
    },
    {
      word: "condition",
      variants: [
        ["provided that S V", "只要/条件是", "The refund is available provided that the receipt is shown.", "只要出示收据，就可以退款。"],
        ["as long as S V", "只要", "You may use the room as long as you reserve it first.", "只要先预订，你就可以使用这个房间。"],
        ["unless S V", "除非", "The order will ship tomorrow unless the address is incorrect.", "除非地址不正确，否则订单明天发出。"]
      ]
    },
    {
      word: "given/considering",
      variants: [
        ["given that S V", "鉴于/考虑到", "Given that demand is high, the store ordered more stock.", "鉴于需求很高，商店订购了更多库存。"],
        ["considering that S V", "考虑到", "Considering that the deadline is near, the team worked late.", "考虑到截止日期临近，团队加班了。"],
        ["given sth", "考虑到某事", "Given the weather, the outdoor event was moved inside.", "考虑到天气，户外活动移到了室内。"]
      ]
    },
    {
      word: "whereas/while",
      variants: [
        ["whereas S V", "而/然而", "The old printer is slow, whereas the new one is much faster.", "旧打印机很慢，而新打印机快得多。"],
        ["while S V", "虽然/而", "While the price is high, the quality is excellent.", "虽然价格高，但质量很好。"],
        ["while doing sth", "做某事期间", "While reviewing the report, she noticed an error.", "审查报告时，她注意到一个错误。"]
      ]
    },
    {
      word: "as soon as",
      variants: [
        ["as soon as S V", "一...就...", "Please call me as soon as the package arrives.", "包裹一到，请马上给我打电话。"],
        ["once S V", "一旦", "Once the payment is confirmed, the order will ship.", "一旦付款确认，订单就会发出。"],
        ["until S V", "直到", "The office will stay open until the last guest leaves.", "办公室会一直开放到最后一位客人离开。"]
      ]
    },
    {
      word: "as...as",
      variants: [
        ["as adj/adv as", "和...一样...", "The new copier is as fast as the old one.", "新复印机和旧复印机一样快。"],
        ["not as adj/adv as", "不如...那么...", "The second proposal is not as detailed as the first.", "第二份提案不如第一份详细。"],
        ["as much/many as", "多达", "The hall can seat as many as three hundred guests.", "大厅最多可容纳三百名客人。"]
      ]
    },
    {
      word: "comparative",
      variants: [
        ["more/less adj than", "比...更/更不...", "The new process is more efficient than the old one.", "新流程比旧流程更高效。"],
        ["the more S V, the more S V", "越...越...", "The more feedback we collect, the better the service becomes.", "我们收集的反馈越多，服务就越好。"],
        ["one of the most adj n", "最...的...之一", "This is one of the most popular products in the catalog.", "这是目录中最受欢迎的产品之一。"]
      ]
    },
    {
      word: "regardless/according",
      variants: [
        ["regardless of sth", "不管某事", "The policy applies regardless of membership level.", "无论会员等级如何，该政策都适用。"],
        ["according to sth", "根据某事", "According to the schedule, the tour begins at nine.", "根据日程，参观九点开始。"],
        ["in accordance with sth", "按照某事", "The refund was processed in accordance with company policy.", "退款按照公司政策处理。"]
      ]
    }
  ]
);

const grammarPairEntries = grammarPairGroups.flatMap((group) => group.variants.map(([phrase, meaning, example, translation]) => ({
  word: phrase,
  meaning: `${meaning}（${phrase.replace(" sth", "")}）`,
  phrase,
  example,
  translation,
  note: `TOEIC Reading Part 5 易混搭配：${group.word} 的不同接法。`,
  tag: "Part 5 对比",
  category: "grammar",
  kind: "phrase",
  pos: "动词短语/固定搭配",
  groupWord: group.word
})));

const grammarPairEntryKeys = new Set(grammarPairEntries.map((item) => `${item.kind}:${item.word}`.toLowerCase()));

const grammarPairCards = grammarPairGroups.map((group) => ({
  word: group.word,
  variants: group.variants.map(([phrase, meaning, example, translation]) => ({ phrase, meaning, example, translation })),
  meaning: group.variants.map(([phrase, meaning]) => `${phrase}：${meaning}`).join("\n"),
  phrase: group.word,
  example: group.variants.map(([phrase, , example]) => `${phrase}: ${example}`).join("\n"),
  translation: group.variants.map(([phrase, , , translation]) => `${phrase}: ${translation}`).join("\n"),
  note: "同一个词或结构的不同接法会改变意思；TOEIC Part 5 常考这种差别。",
  tag: "Part 5 对比",
  category: "grammar",
  kind: "phrase",
  pos: "固定搭配对比",
  isGrammarPairCard: true
}));

const photoIndexRaw = `
a bit of
a couple of
a great deal of
a number of
a round of applause
abandon
abandoned
ability
able
above all
abridged version
absolute
absolutely
abstract
abstract painting
abundant
accept
acceptable
acceptance
access
accessible
accessory
acclaim
acclaimed
accommodate
accommodating
accommodation(s)
accompany
accomplish
accomplished
accomplishment
according to
accordingly
account
account balance
accountable
accountant
accounting
accounting department
accounts payable
accumulate
accuracy
accurate
accurately
achieve
achievement
acknowledge
acknowledgement
acquaint
acquaintance
acquainted
acquire
acquisition
activate
active
adapt
adaptation
add
addition
additional
additionally
additive
address
adequate
adequately
adhere
adhesive
adjacent
adjoining
adjust
adjustable
adjustment
administer
administration
administrative
administrative department
administrator
admission
admit
adopt
advance
advance notice
advanced
advanced degree
advancement
adverse weather conditions
advertise
advertisement
advertiser
advertising
advertising agency
advertising department
advice
advisable
advise
advocate
affect
affected
affiliated
affix
afford
affordable
after
after all
afterward(s)
agency
agenda
agent
aging
agree
agreeable
agreement
agricultural
agriculture
ahead of schedule
AI
aim
air
air conditioner
air purifier
aircraft
airfare
aisle
alert
alike
All sales are final.
alleviate
allocate
allocation
allow
allowance
along with
alter
alteration
alternate
alternative
alternatively
although
altitude
alumni
ambitious
amend
amenity
among other things
ample
an array of
analysis
analyst
analytical
analytics
analyze
ancient
anecdote
anniversary
annual
annually
anonymous
anonymously
anticipate
anticipated
anticipation
anyway
apartment
apartment complex
apologize
apology
app
apparel
apparent
apparently
appeal
appealing
appear
appearance
appetizer
appliance
appliance store
applicable
applicant
application
apply
appoint
appointment
appraisal
appreciate
appreciation
appreciative
apprentice
apprenticeship
approach
appropriate
appropriately
approval
approve
approximate
approximately
arborist
archeologist
archeology
architect
architectural
architecture
archive
area
arise
arrange
arrangement
arrival
arrive
article
artifact
artificial
artificial intelligence
artisan
artwork
as
as a result
as a token of appreciation
as early as
as long as
as of
as soon as
asking price
aspect
aspiration
aspire
aspiring
assemble
assembly
assembly line
assess
assessment
asset
assign
assignment
assist
assistance
associate
association
assorted
assortment
assume
assuming (that)
assumption
assurance
assure
astronomy
at all times
at least
at most
at the latest
at the moment
at your earliest convenience
athletic
atmosphere
atrium
attach
attachment
attain
attempt
attend
attendance
attendant
attendee
attest
attire
attitude
attorney
attract
attraction
attractive
attribute
audience
audit
auditor
auditorium
authentic
author
authority
authorization
authorize
authorized
auto
autobiography
autograph
automated
automatic
automatically
automobile
automotive
autonomous
availability
available
aviation
avid
avoid
award
award-winning
aware
awareness
awning
background
backpack
baggage
baggage claim (area)
baked goods
balance
ballroom
banker
banquet
banquet hall
bargain
base
based on
basis
batch
be accustomed to
be based in
be headquartered in
because
because of
bedding
beekeeper
before
beforehand
begin
beginner
behind schedule
belong
belongings
bend
beneficial
benefit
benefits package
best belong
best of all
beverage
biannual
bibliography
bid
bill
billing
bin
binoculars
biodegradable
biography
biologist
biology
bistro
blanket
blender
blind
blue tarp
blueprint
board
board of directors
board of trustees
boast
bolster
book
book signing
bookcase
booking
bookkeeping
booklet
bookshelf
boost
booster
botanical
botanist
botany
bother
bounty
boutique
box office
brainstorm
branch
brand-new
bread
break
break room
breakable
breakdown
breathtaking
brew
brick
brick-and-mortar store
brief
briefcase
briefing
broadcast
brochure
broom
browse
bucket
budget
budgeting
buffet
(light) bulb
bulk
bulk order
bulky
bulletin board
bush
business hours
bustling
busy
button
bypass
cabin
cafe
cafeteria
calculate
calculated
calculation
calculator
campus
Can/Could you do me a favor?
candidate
canopy
capability
capable
capacity
capital
capture
car
car rental agency
cardboard
cardboard box
career fair
cargo
carpenter
carpool
carry
carving
cash register
cashier
cast
casual
cater
caterer
catering
cause
caution
cautious
cautiously
ceiling
celebrate
celebrated
celebration
celebratory
celebrity
cell phone
centerpiece
century
CEO (chief executive officer)
ceramics
certain
certificate
certification
certified
certify
chair
chairperson
challenge
challenging
chance
change
chapter
characteristic
charge
checking account
checkout
(medical) checkup
cheerful
chemist
chemistry
chore
choreographer
chronicle
chronological
circulation
circulation clerk
circulation desk
circumstance
cite
citizen
city official
civic
civil engineer
civil engineering
claim
clarify
clarity
clay
cleaning supplies
clearance sale
clearly
clerical
clerk
client
clientele
clogged
close
closed
closely
closure
cloth
clothes
(clothes) dryer
clothing
clothing shop
clothing store
coauthor
coincide
coincidence
collaborate
collaboration
collaborative
collapse
colleague
collect
color scheme
column
combination
combine
combined
come across
comfort
comfortable
comfortably
commemorate
commemorative
commence
commend
commensurate
commerce
commercial
commission
commit
commitment
committed
committee
commonly
community service
commute
commuter
compact
company retreat
company-wide
comparable
comparatively
compare
comparison
compartment
compatibility
compatible
compel
compelling
compensate
compensation
compete
competent
competition
competitive
competitor
compilation
compile
complain
complaint
complement
complete
completely
completion
complex
complexity
compliance
compliant
complicated
compliment
complimentary
comply
comply with
component
composer
compost
comprehensive
comprise
compromise
concentrate
concentrated
concentration
concern
concerned
concerning
concession stand
concierge
conclude
conclusion
conclusive
condition
condominium
conduct
conductor
conference
conference call
confidence
confident
confidential
confidently
confirm
confirmation
conflict
conform to
confuse
confused
confusing
confusion
congested
congestion
connect
connection
connectivity
consecutive
consent
consequence
consequently
conservancy
conservation
conserve
consider
considerable
considerably
considerate
consideration
consist
consistency
consistent
consistently
construct
construction
construction site
constructive
consult
consultation
consume
consumer
consumption
contact
contain
container
contemporary
content
contract
contractor
contrary to
contribute
contribution
contributor
controversial
controversy
convenience
convenient
conveniently
convention
conventional
conversely
convert
convey
convince
convinced
cook
cookie
cookware
cooperate
cooperation
cooperative
coordinate
coordination
coordinator
copy
copy machine
copyright
cordially invite
corporate
corporation
correct
correction
correctly
correspond
correspondence
correspondent
corrupt
cosmetics
cost
costly
couch
could use
council
counterpart
countless
country
county
coupon
courier
courteous
courtesy
courthouse
courtyard
cover
coverage
coworker
cozy
craft
craftsmanship
craftspeople
cramped
crate
create
creation
creative
creatively
creativity
creature
credentials
credit
crew
criteria
criterion
critic
critical
critically acclaimed
criticism
criticize
critique
crop
crosswalk
crouch
crowded
crucial
cube
cubicle
cuisine
culinary
cupboard
curator
curb
curbside pickup
currency
currency exchange
current
currently
curtain
custodian
custom
custom made
customary
customer
customer satisfaction
customer service department
customizable
customize
customs
cut back on
cut down on
cutlery
cutting board
cutting-edge
CV
daily
dairy
data breach
deadline
deal
dealer
dealership
dean
debit card
debris
debut
decade
deck
decline
decrease
dedicate
dedicated
dedication
defect
defective
define
definite
definitely
definition
definitive
degree
dehumidifier
(food) dehydrator
delay
delegate
delegation
delete
delicate
delight
delighted
delightful
deliver
delivery
demand
demanding
demographic
demolish
demolition
demonstrate
demonstration
dentist
deny
depart
department
department store
departmental
departure
depend on
dependable
dependence
dependent
depict
deposit
depth
descend
describe
description
deserve
designate
designated
despite
destination
detach
detail
detailed
detect
(laundry) detergent
determination
determine
determined
detour
develop
developer
development
device
devise
devote
devoted
diameter
diary
diet
dietary
differ
difference
different
differently
differing
dig
dimension
dine
diner
dining area
diploma
direct
direct deposit
direction
directly
directory
dirt
disappoint
disappointed
disappointing
disappointment
discard
disclaimer
disclose
discontinue
discourage
discrepancy
dishwasher
disinfect
dispatch
display
disposable
disposal
dispose
dispose of
dispute
disregard
disrupt
disruption
disruptive
dissatisfied
distinguished
distract
distracting
distraction
distribute
distribution
distributor
district
disturb
disturbance
diverse
diversify
diversity
divide
division
dock
document
documentary
documentation
domestic
dominant
dominate
donate
donation
donor
donut
doorway
down payment
downtown
dozen
draft
drain
drainage
drape
draw
drawer
drawing
dress code
drill
driveway
drug
dry cleaner
due
due date
due to
duplicate
durability
durable
duration
during
dust
dustpan
duty
eager
eagerly
earbud
earn
earnings
earth
ease
easily
easy
eatery
economic
economical
economics
economist
economy
edit
edition
editor
editorial
educate
education
educational
educator
effect
effective
effectively
effectiveness
efficiency
efficient
efficiently
effortlessly
elaborate
elect
election
electric
electrical
electrician
electricity
electronic
electronic device
electronically
electronics
electronics store
element
eligibility
eligible
eliminate
elimination
embark
embrace
emerge
emergency
emerging
emphasis
emphasize
employ
employee
employer
employment
employment agency
empty
enable
enclose
enclosure
encounter
encourage
encouraging
endangered
endeavor
endorse
endorsement
energy-efficient
enforce
engage
engagement
engaging
engineering
enhance
enhanced
enhancement
enjoy
enlarge
enormous
enroll
enrollment
ensure
entail
enter
enthusiasm
enthusiast
enthusiastic
enthusiastically
entire
entirely
entity
entrance
entrepreneur
entrepreneurship
entry
envelope
environment
environmental
environmentally
envision
episode
equip
equipment
equivalent
erase
ergonomic
errand
essential
essentially
establish
established
establishment
estimate
evaluate
evaluation
even
even if
even though
evenly
event
eventual
eventually
evidence
exact
exactly
examine
excavate
excavation
exceed
excellence
excellent
except
except for
exception
exceptional
exceptionally
excerpt
excess
excessive
excited
exclude
excluding
exclusive
exclusively
excursion
execute
executive
exemplary
exhibit
exhibition
exhibitor
exist
existence
existing
exit
expand
expansion
expect
expectation
expedite
expenditure
expense
expensive
experienced
experiment
experimental
expert
expertise
expertly
expiration
expiration date
expire
explain
explore
expo
exponentially
export
exporter
expose
exposition
exposure
express
express mail
extend
extension
extensive
extensively
exterior
external
extra
extraordinary
extreme
extremely
eye doctor
fabric
fabric dye
fabulous
face
facet
facilitate
facilitation
facilitator
facility
factor
faculty
fairly
faithful
fame
familiar
familiarity
familiarize
famous
fare
farm
farmer
farming
fascinate
fascinating
fashion
faucet
faulty
favor
favorable
favorably
feasibility
feasible
feature
fee
feed
feedback
fellow
fertilizer
festivity
fiber
field
figure
file
film
filming
final
finalize
finally
finance
finance department
financial
financially
finding(s)
fine
fire extinguisher
fire pit
fireplace
firm
firmly
firsthand
first-rate
fiscal year
fitness tracker
fix
flagship store
flat
flavor
flaw
flawed
flawless
fleet
flexibility
flexible
flight attendant
flooring
floral
florist
flower shop
flyer
foam
focus
focus group
fold
folding chair
follow
following
follow-up
food item
footage
for a while
for immediate release
for instance
forecast
foremost
formal
formally
former
formerly
forthcoming
fortunate
fortunately
forum
forward
fossil
foster
found
foundation
founder
fountain
foyer
fraction
fracture
fragile
fragrance
frame
free
freelance
freezer
freight
frequency
frequent
frequently
fridge
front desk
fruit
frustrated
frustrating
fuel
fuel-efficient
fulfill
fulfillment center
full refund
full-time
function
functional
functionality
fund
funding
fund-raiser
fund-raising
furnished
furnishings
furniture
further
furthermore
gain
gala
garbage
garment
gear
general
general affairs department
general contractor
generally
generally speaking
generate
generation
generator
generosity
generous
generously
geologist
geology
get in touch with
get rid of
get to work
gift certificate
given
given that
glance
glitch
glove
glue
go out of business
goal
goggles
good
gourmet
government agency
government official
governor
graciously
graduate
graduation
grain
grand opening
grant
grateful
gratitude
gravel
greatly
greenhouse
greet
grocery
grocery store
groundbreaking
guarantee
guest
guideline
guitar
gymnasium
habitat
hallway
halt
hammer
hand
hand in
handcrafted
handle
handling
handout
hands-on
hang
happen
hard hat
hardly
hardware
hardware store
harsh
harvest
has/have yet to do
head
head office
headquarters
health
health inspector
hear from
heater
heavily
heavy rain
heavy-duty
height
helmet
heritage
hesitant
hesitate
highlight
highlighter
highly
high-profile
hire
historian
historic
historical
hold
hold onto
hone
honor
hope
hopeful
hopefully
horticulture
hose
hospitality industry
host
house
household
housekeeping
housewares
however
huge
human resources department
humidifier
humidity
hurry
ID
ideal
ideally
identical
identification
identify
identity
if
illustrate
illustrated
illustration
immediate
immediately
immensely
impact
impeccable
imperative
implement
implementation
imply
import
importer
impress
impression
impressive
improve
improved
improvement
in a rush
in a timely manner
in accordance with
in addition
in addition to
in advance
in an effort to do
in bulk
in case
in charge of
in common
in contrast
in detail
in fact
in favor of
in general
in light of
in order
in particular
in person
in place of
in progress
in return
in short
in spite of
in stock
in the distance
in the event of
in the event that
in the long run
in the meantime
in the process of
in time for
in transit
in writing
inaccurate
inaugural
inaugurate
Inc.
incentive
incident
inclement
inclement weather
include
including
income
incoming
inconvenience
inconvenient
incorporate
incorrect
increase
increasingly
incur
indefinitely
independent
independently
in-depth
indicate
individual
individually
industrial
industry
inexpensive
inexperienced
infer
influence
influencer
influential
inform
informal
informally
information packet
informational
informative
informed
infrastructure
ingredient
in-house
initial
initially
initiate
initiative
inn
innovation
innovative
in-person
input
inquire
inquiry
insight
insightful
inspect
inspection
inspector
inspire
inspiring
install
installation
installment
instead
instead of
institute
institution
in-store
instruct
instruction
instructional
instrument
instrumental
insufficient
insulate
insulation
insurance
insure
intact
intake
intake form
integral
intend
intense
intensify
intensity
intensive
intention
intentional
intentionally
interact
interaction
interactive
interest rate
interim
interior
intermediate
intermission
intermittent
intern
internal
internship
interoffice
interrupt
interruption
intersection
intricate
intriguing
introduce
introduction
introductory
intuitive
invalid
invaluable
invent
invention
inventory
invest
investigate
investigation
investigative reporting
investment
investor
invitation
invite
inviting
invoice
involve
iron
ironing board
irrigation
issue
IT department
item
itemize
itinerary
janitor
jar
jet lag
jewelry
job fair
job opening
job posting
job search
job seeker
journal
journalist
journey
just in case
just so you know
justify
keepsake
kettle
keynote
kindly
kiosk
kitchenware
kneel
knowledge
knowledgeable
lab
labor
laboratory
laboratory equipment
lack
ladder
lake
lamppost
land
landfill
landlord
landmark
landscape
landscape painting
landscaper
landscaping
lanyard
lap
lapse
laptop (computer)
largely
last
last-minute
lately
later
latest
launch
laundry
laundry basket
(laundry) detergent
laundry equipment
law firm
lawn
lawn mower
lawyer
lay out
lead to
leading
leaflet
leak
lean
lease
leave
leftover
legal
legal department
legendary
length
lengthen
lengthy
level
librarian
lid
light fixture
lightbulb
likelihood
likely
likewise
limit
limited
line
linguistics
liquid
literature
lively
load
loan
lobby
local
locally
locate
located
location
locksmith
lodge
lodging
logistical
logistics
long-lasting
long-term
lost and found
lot
lower
loyal
loyalty
loyalty program
Ltd.
luck
lucrative
luggage
lumber
luncheon
luxurious
luxury
machine
machinery
magazine
magnificent
mail
main office
mainly
maintain
maintenance
make sure
make use of
makeup
malfunction
manage
management
manager
managerial
mandatory
manner
manufacture
manufacturer
manufacturing
manuscript
margin
marginally
mark
market
marketing department
mason
material
matinee
maximize
maximum
mayor
mayoral
meanwhile
measure
measurement
mechanic
mechanical
mechanical engineer
mechanism
medical
medication
medicine
meet
membership
memento
memo
memoir
memorabilia
memorable
memorandum
memorize
memory
mentee
mention
mentor
mentoring program
merchandise
merchant
merge
merger
meteorologist
method
meticulously
metropolitan
microscope
microwave (oven)
migration
milestone
mindful
mine
minimal
minimize
minimum
minister
minute
misleading
misplace
mission
misunderstanding
mobile device
mobile phone
moderate
moderately
moderator
modern
modernize
modest
modification
modify
moisture
money-back guarantee
monitor
morale
moreover
mortgage
most likely
mostly
motivate
motivated
motivation
motivational
motorcycle
mount
move
mover
moving company
multiple
municipal
municipality
mural
(musical) instrument
namely
national
nationwide
native
nearby
nearly
negotiable
negotiate
negotiation
neighbor
neighborhood
neighboring
networking
nevertheless
next to
no later than
no longer
nominate
nomination
nonprofit
normal
normally
not only X but (also) Y
notable
note
noted
noteworthy
noticeable
notification
notify
notwithstanding
novelist
novice
now that
number
numerical
numerous
nurse
nursery
nutrition
nutritional
nutritionist
nutritious
objective
obligation
observance
observation
observe
obsolete
obstruct
obstruction
obtain
occasion
occasional
occasionally
occupancy
occupation
occupied
occupy
occur
occurrence
odor
offer
offering
office equipment
office supplies
office supply store
offset
oil painting
old-fashioned
on a budget
on back order
on behalf of
on board
on duty
on hand
on one's way to
on such short notice
on the contrary
on the other hand
on the premises
on time
onboarding
once
one-way
ongoing
only
on-site
open to the public
opening
operate
operation
operational
operator
opportunity
opt
optician
optimal
optimism
optimistic
option
optional
order
ordinance
ordinarily
organic
organization
organizational
organize
organizer
orientation
origin
original
originally
ornithologist
ornithology
otherwise
out of order
out of paper
out of stock
out of town
outage
outcome
outdated
outgoing
outing
outlet
outline
outlook
out-of-date
output
outreach
outstanding
oval
overall
overbook
overcome
overdue
overhaul
overhead bin
overlook
overnight
oversee
oversight
overtime
overview
overwhelm
overwhelming
overwhelmingly
overwork
owe
owing to
own
owner
ownership
package
packaging
packet
packing slip
padding
paddle
page through
paid vacation
painting
paleontologist
paleontology
pamphlet
panel
paper
paperless
paperwork
paralegal
parcel
park ranger
parking lot
partial
partially
participant
participate
participation
particular
particularly
partition
partner
partnership
part-time
part-time worker
party
pastry
patch
patent
path
patience
patient
patiently
patio
patron
patronage
patronize
pave
pavement
paving
pay
pay off
paycheck
payroll
payroll department
pedestrian
pediatrician
peer
perennial
performance evaluation
performance review
perfume
period
periodic
periodical
periodically
perishable
perk
permanent
permanent exhibit
permission
permit
persistence
person
personal
personalized
personnel
personnel department
perspective
persuade
persuasive
pertinent
pharmaceutical
pharmacist
pharmacy
phase
photo shoot
photocopier
photograph
photographer
photographic
photography
physical
physical therapist
physician
piano
pickup
picturesque
pier
pile
pillow
pit
place
placement
plant
plague
plastic bag
platform
platter
play
playground
plaza
pleasant
pleased
pleasure
plentiful
plenty of
plumber
plumbing
podcast
podium
point
policy
policyholder
polish
poll
pond
popular
popularity
popularly
porcelain
porch
portfolio
portion
portrait
portray
pose
position
possess
post
postage
postal
postpone
pot
potential
pothole
pots and pans
potted plant
potter
pottery
pour
power
power failure
power interruption
power outage
power outlet
practical
practice
praise
precaution
precise
precisely
predict
predictable
prediction
prefer
preferably
preference
preferred
preliminary
premier
premiere
premise
premises
premium
preparation
prepare
prerequisite
prescribe
prescription
presence
present
preservation
preserve
president
press conference
press release
prestige
prestigious
pretty
prevent
prevention
preventive
preview
previous
previously
primarily
primary
prime
principal
principally
principle
printer
prior
prioritize
priority
privilege
privileged
probably
probationary
procedure
proceed
proceedings
proceeds
process
processing
produce
producer
production
productive
productivity
profession
professional
professional development
professionalism
professionally
professor
proficiency
proficient
profile
profit
profitability
profitable
progress
progressive
prohibit
prohibitive
project
projection
projector
prolific
prominent
prominently
promise
promising
promote
promotion
promotional
prompt
promptly
proof
proofread
proofreader
prop
proper
properly
property
proposal
propose
proprietary
proprietor
prospect
prospective
protect
protection
protective
protective gear
protocol
prototype
prove
provide
provided that
provider
province
provision
proximity
prune
public
public relations
public relations department
publication
publicist
publicity
publicize
publish
publisher
publishing
purchase
purchasing department
purpose
purse
pursue
purveyor
put in
qualification
qualified
qualify
quality
quantity
quarter
quarterly
query
question
questionnaire
quite a bit
quite a few
quota
quote
radius
raffle
rafting
railing
rain date
raise
rake
ramp
range
rapid
rapidly
rare
rarely
rate
rather
rating
rave
raw materials
reach
reach out
reach out to
readership
readily
reading material
real estate
real estate agency
realize
realty
reasonable
reasonably
reassure
rebate
recall
receipt
receive
recent
recently
reception
receptionist
recharge
rechargeable
rechargeable battery
recipe
recipient
recognition
recognize
recommend
recommendation
reconstruction
recount
recruit
recruiter
recruitment
rectangular
recur
recyclable
recyclables
recycle
recycling
redeem
redeemable
reduce
reduction
refer
reference
referral
refill
reflect
reflection
reform
refrain
refreshments
refrigerate
refrigerator
refuel
refund
refundable
refurbish
refuse
regard
regarding
regardless of
region
regional
register
registrant
registration
regret
regular
regular mail
regularly
regulate
regulation
rehearsal
rehearse
reimburse
reimbursement
reinforce
reinvent
reject
related
relationship
relative
relatively
release
relevant
reliability
reliable
reliably
relief
relieve
relieved
relocate
relocation
reluctant
rely
remain
remainder
remaining
remark
remarkable
remarkably
remedy
remind
reminder
remodel
remote
remotely
removal
remove
remuneration
rendering
renew
renewable
renewal
renovate
renovation
renowned
rent
rental
renter
reopen
reorganization
reorganize
repair
repave
repeatedly
replace
replacement
replenish
reply
report to work
reporter
represent
representative
reproduce
reproduction
repurpose
reputable
reputation
require
requirement
reschedule
research
reservation
reserve
reservoir
reside
residence
resident
residential
resign
resignation
resilience
resilient
resist
resistance
resistant
resolution
resolve
resource
respect
respected
respectful
respective
respectively
respond
respondent
response
responsibility
responsible
rest
restart
restaurant
restock
restoration
restore
restrict
restricted
restriction
restructure
result
resume
résumé
resurface
retail
retailer
retain
retention
retire
retirement
retreat
retrieve
retriever
retrospective
reunion
reuse
reveal
revenue
review
reviewer
revise
revision
revitalize
revolutionary
revolutionize
revolving door
reward
rewarding
rewards program
right away
ride-sharing
rigorous
river
robotics
robust
room
roughly
round
roundabout
round-trip
routine
routinely
row
RSVP
rug
run
run into
runway
rural
rush
rust
sabbatical
safety equipment
safety goggles
safety inspector
safety protocols
safety shoes
safety vest
salary
sales department
sales pitch
sample
sanitation
sanitize
satisfaction
satisfactory
satisfied
satisfy
savings account
scale
scan
scarf
scattered
scavenger hunt
scenery
scenic
scent
scheduling conflict
scheme
scholarship
scissors
scope
scratch
screen
screening
screenplay
screwdriver
script
sculptor
sculpture
SDGs
sea
search
seasonal
seasoned
sector
secure
securely
security department
security guard
seed
seek
segment
seldom
select
selection
selective
semiannual
separate
separately
sequel
sequence
series
serve
server
service
session
setting
settle
severe
sew
sewing machine
shade
share
shareholder
sharpen
shed
shelf
shelving unit
ship
shipment
shipping
shoreline
shortage
shortcoming
shortly
short-staffed
short-term
Should you have any questions
shovel
showcase
shuttle
sibling
side by side
sightseeing
sign
sign up for
signature
significance
significant
significantly
silverware
similarly
simple
simplify
simply
since
sink
site
situated
situation
sizable
skilled
skillful
skyrocket
skyscraper
slate
sleeved
slight
slightly
slot
smartphone
smoothly
snack
snowstorm
so far
so that
soar
social media
sofa
soil
sole
solicit
solid
solution
solve
somewhat
soon
sophisticated
sort
sought-after
soundproof
source
souvenir
souvenir shop
space
spacious
spare
specialization
specialize
specialized
specialty
specific
specifically
specification
specifics
specify
specimen
spectacular
spectator
spill
spoil
spokesperson
sponsor
sponsorship
spot
spread out
square
stable
stack
stage
stain
stain-resistant
staircase
stakeholder
stall
stand out
standard
stapler
star
start
start-up
state
statement
state-of-the-art
station
stationery
stationery store
statistical
statistically
statistics
statue
status
Stay tuned.
steadily
steady
steep
stellar
step
stimulate
stipend
stir
stock
stockholder
stool
storage
store
store credit
storm
stormy
story
stove
straightforward
strategic
strategically
strategy
stream
streaming
streamline
street stalls
strengthen
stress
stressful
strict
striking
stringent
strive
stroll
stroller
structural
structure
struggle
stuck in traffic
study
stun
stunning
sturdy
subject
submission
submit
subscribe
subscriber
subscription
subsequent
subsequently
subsidiary
substance
substantial
substantially
substitute
suburb
suburban
succeed
success
successful
successfully
successor
sufficient
suggest
suggestion
suit
suitable
suite
suited
summarize
summary
sunscreen
superb
superior
supermarket
supervise
supervision
supervisor
supervisory
supplement
supplemental
supplier
supply
supporter
suppose
surcharge
surface
surge
surgeon
surpass
surplus
surprise
surprised
surprising
surprisingly
surround
surrounding
surroundings
survey
surveyor
suspend
suspenders
sustain
sustainable
SUV
sweep
symposium
synthetic
table
table of contents
tablet computer
tactics
tailor
take advantage of
take effect
take notes
take on
take part in
take place
take turns
talent
talented
tap
tap water
task
tax
tear down
technician
technology department
teleconference
temporarily
temporary
tenant
tentative
tentatively
tenure
term
terminal
terms and conditions
terrain
test tube
testify to
testimonial
text
textile
texture
thankful
that means
theme
thereby
therefore
thermometer
thorough
thoroughly
though
thrilled
thrive
thriving
throw away
thunderstorm
thus
tight
timber
time sheet
time slot
time-consuming
timeline
timely
timetable
tip
to this end
To Whom It May Concern
toll
tool
top-notch
totally
tour guide
tourism
tourist
tourist attraction
tow
town official
track
trade magazine
trade show
trademark
tradition
traditional
traditionally
trail
transaction
transcript
transfer
transform
transit
transition
translator
transparent
transport
transportation
trash
travel agency
treadmill
treasurer
treat
treatment
tremble
tremendous
trigger
trim
trousers
truck
trust
trusted
trustee
try
tuition
tune
tuning
turn down
turn in
turn X into Y
turnaround time
turnout
turnover
tutorial
typical
typically
ultimately
unable
unavailable
unclaimed
uncomfortable
under construction
undergo
understaffed
undertake
undertaking
underway
unexpected
unfamiliar
unfortunate
unfortunately
unit
unless
unlikely
unlimited
unload
unoccupied
until
unveil
up and running
up to
upcoming
update
upgrade
upholstery
up-to-date
urban
urge
urgency
urgent
urgently
usage
used to do
usually
utensil
utility
utilize
vacancy
vacant
vacate
vacation
vacuum (cleaner)
valance
valid
validate
valuable
value
valued
varied
variety
various
vary
vase
vast
vegetable
vehicle
vending machine
vendor
vent
ventilation
venture
venue
verification
verify
versatile
version
vessel
vet
veterinarian
via
viable
vibrant
vicinity
videoconference
virtual
visibility
visible
visitor
vital
vitality
vitamin
voice
voice mail
void
volume
voluntary
volunteer
vote
voucher
voyage
vulnerable
wage
waitstaff
waive
waiver
walkway
wallet
warehouse
warn
warranty
washing machine
water
water dispenser
watercolor painting
watering can
waterproof
wear
weather forecaster
weaving machine
webinar
weed
weekday
weekend
weigh
Welcome aboard!
welder
well-deserved
well-known
wheelbarrow
when
when it comes to
whenever
whereas
whether
while
whole
wholesale
wholesaler
width
wildlife
willing
willingness
wind turbine
window shade
windowpane
windowsill
wing
wipe
withdraw
within walking distance
withstand
work
work ethic
workforce
workload
workplace
workshop
workstation
worldwide
worth
worthwhile
worthy
wrinkle
writer
X-ray
yard
yarn
yearly
yield
`;

const photoMeaningMap = {
  abandon: "放弃；抛弃", abandoned: "被遗弃的；废弃的", ability: "能力", able: "能够的", absolute: "绝对的", absolutely: "绝对地；完全地",
  abstract: "摘要；抽象的", abundant: "丰富的；充足的", accept: "接受", acceptable: "可接受的", acceptance: "接受；认可",
  access: "进入；使用权", accessible: "可进入的；易接近的", accessory: "配件；附件", acclaim: "称赞", acclaimed: "备受赞誉的",
  accommodate: "容纳；提供住宿；适应", accommodating: "乐于助人的；通融的", accompany: "陪同；伴随", accomplish: "完成",
  accomplished: "熟练的；有成就的", accomplishment: "成就；完成", account: "账户；说明；客户", accountable: "负有责任的",
  accountant: "会计", accounting: "会计；财务", accumulate: "积累", accuracy: "准确性", accurate: "准确的", accurately: "准确地",
  achieve: "实现；达成", achievement: "成就", acknowledge: "承认；确认收到", acknowledgement: "确认；致谢", acquaint: "使熟悉",
  acquaintance: "熟人；了解", acquainted: "熟悉的", acquire: "获得；收购", acquisition: "获得；收购", activate: "启动；激活",
  active: "活跃的；有效的", adapt: "适应；改编", adaptation: "适应；改编", add: "增加；添加", addition: "增加；附加",
  additional: "额外的", additionally: "此外", additive: "添加剂", address: "地址；处理；致辞", adequate: "足够的；适当的",
  adequately: "充分地", adhere: "遵守；坚持；粘附", adhesive: "粘合剂；有粘性的", adjacent: "相邻的", adjoining: "相邻的",
  adjust: "调整", adjustable: "可调节的", adjustment: "调整", administer: "管理；执行", administration: "管理；行政部门",
  administrative: "行政的", administrator: "管理员；行政人员", admission: "准入；入场费", admit: "承认；准许进入", adopt: "采用；收养",
  advance: "进展；提前；预先的", advanced: "高级的；先进的", advancement: "进步；晋升", adverse: "不利的", advertise: "做广告",
  advertisement: "广告", advertiser: "广告商", advertising: "广告；广告业", advice: "建议", advisable: "明智的；可取的", advise: "建议；通知",
  advocate: "提倡；支持者", affect: "影响", affected: "受影响的", affiliated: "附属的；有关联的", affix: "粘贴；附加",
  afford: "负担得起；提供", affordable: "负担得起的", agency: "代理机构；机构", agenda: "议程", agent: "代理人；经纪人",
  aging: "老化；变旧", agree: "同意", agreeable: "令人愉快的；同意的", agreement: "协议；同意", agricultural: "农业的",
  agriculture: "农业", aim: "目标；旨在", air: "空气；航班", aircraft: "飞机", airfare: "机票价格", aisle: "过道",
  alert: "警惕的；提醒", alike: "相似的", alleviate: "缓解", allocate: "分配", allocation: "分配", allow: "允许",
  allowance: "津贴；限额", alter: "改变；修改", alteration: "修改；改动", alternate: "轮流的；替代的", alternative: "替代方案；可替代的",
  alternatively: "或者；作为替代", although: "虽然", altitude: "高度；海拔", alumni: "校友", ambitious: "有抱负的",
  amend: "修正；修改", amenity: "便利设施", ample: "充足的", analysis: "分析", analyst: "分析师", analytical: "分析的",
  analytics: "数据分析", analyze: "分析", ancient: "古代的", anecdote: "轶事", anniversary: "周年纪念", annual: "年度的",
  annually: "每年", anonymous: "匿名的", anonymously: "匿名地", anticipate: "预期；期待", anticipated: "预期的",
  anticipation: "期待；预期", anyway: "无论如何", apartment: "公寓", apologize: "道歉", apology: "道歉", app: "应用程序",
  apparel: "服装", apparent: "明显的", apparently: "显然；看来", appeal: "吸引力；呼吁；上诉", appealing: "吸引人的",
  appear: "出现；显得", appearance: "外观；出现", appetizer: "开胃菜", appliance: "电器", applicable: "适用的",
  applicant: "申请人", application: "申请；应用程序", apply: "申请；应用", appoint: "任命；安排", appointment: "预约；任命",
  appraisal: "评估", appreciate: "感激；欣赏", appreciation: "感激；欣赏；增值", appreciative: "感激的", apprentice: "学徒",
  apprenticeship: "学徒期", approach: "方法；接近", appropriate: "适当的", appropriately: "适当地", approval: "批准",
  approve: "批准", approximate: "大约的；近似", approximately: "大约", arborist: "树艺师", archeologist: "考古学家",
  archeology: "考古学", architect: "建筑师", architectural: "建筑的", architecture: "建筑；建筑学", archive: "档案；存档",
  area: "区域；面积", arise: "发生；出现", arrange: "安排", arrangement: "安排；布置", arrival: "到达", arrive: "到达",
  article: "文章；物品", artifact: "手工艺品；文物", artificial: "人工的", artisan: "工匠", artwork: "艺术作品",
  aspect: "方面", aspiration: "抱负；志向", aspire: "渴望；追求", aspiring: "有抱负的", assemble: "组装；集合",
  assembly: "装配；集会", assess: "评估", assessment: "评估", asset: "资产；有价值的人或物", assign: "分配；指定",
  assignment: "任务；作业", assist: "协助", assistance: "帮助", associate: "同事；关联；联合", association: "协会；关联",
  assorted: "各种各样的", assortment: "分类；组合", assume: "假定；承担", assumption: "假设", assurance: "保证；把握",
  assure: "保证；使确信", astronomy: "天文学", athletic: "运动的", atmosphere: "气氛；大气", atrium: "中庭",
  attach: "附上；连接", attachment: "附件；附着", attain: "达到；获得", attempt: "尝试", attend: "参加；照料",
  attendance: "出席；出勤", attendant: "服务员；随从", attendee: "出席者", attest: "证明", attire: "服装",
  attitude: "态度", attorney: "律师", attract: "吸引", attraction: "吸引力；景点", attractive: "有吸引力的",
  attribute: "属性；归因于", audience: "观众；听众", audit: "审计", auditor: "审计员", auditorium: "礼堂",
  authentic: "真实的；正宗的", author: "作者", authority: "权力；当局", authorization: "授权", authorize: "授权",
  authorized: "经授权的", auto: "汽车；自动", autobiography: "自传", autograph: "亲笔签名", automated: "自动化的",
  automatic: "自动的", automatically: "自动地", automobile: "汽车", automotive: "汽车的", autonomous: "自主的；自动的",
  availability: "可用性；供应情况", available: "可用的；有空的", aviation: "航空", avid: "热衷的", avoid: "避免",
  award: "奖；授予", awareness: "意识", awning: "遮阳篷", background: "背景", backpack: "背包", baggage: "行李",
  balance: "余额；平衡", ballroom: "宴会厅；舞厅", banker: "银行家", banquet: "宴会", bargain: "特价品；讨价还价",
  base: "基础；基地", basis: "基础；根据", batch: "一批", bedding: "寝具", beekeeper: "养蜂人", before: "在...之前",
  beforehand: "事先", begin: "开始", beginner: "初学者", belong: "属于", belongings: "个人物品", bend: "弯曲",
  beneficial: "有益的", benefit: "福利；好处", beverage: "饮料", biannual: "一年两次的", bibliography: "参考书目",
  bid: "投标；出价", bill: "账单；议案", billing: "开票；账单处理", bin: "箱；垃圾桶", binoculars: "双筒望远镜",
  biodegradable: "可生物降解的", biography: "传记", biologist: "生物学家", biology: "生物学", bistro: "小餐馆",
  blanket: "毯子", blender: "搅拌机", blind: "盲的；百叶窗", blueprint: "蓝图", board: "董事会；板",
  boast: "夸耀；拥有", bolster: "加强；支持", book: "书；预订", bookcase: "书柜", booking: "预订",
  bookkeeping: "簿记", booklet: "小册子", bookshelf: "书架", boost: "提高；促进", booster: "助推器；支持者",
  botanical: "植物的", botanist: "植物学家", botany: "植物学", bother: "打扰；麻烦", bounty: "赏金；丰收",
  boutique: "精品店", brainstorm: "头脑风暴", branch: "分支；分公司", bread: "面包", break: "休息；打破",
  breakable: "易碎的", breakdown: "故障；细目", breathtaking: "令人惊叹的", brew: "冲泡；酿造", brick: "砖",
  brief: "简短的；简报", briefcase: "公文包", briefing: "简报会", broadcast: "广播；播出", brochure: "宣传册",
  broom: "扫帚", browse: "浏览", bucket: "桶", budget: "预算", budgeting: "预算编制", buffet: "自助餐",
  bulb: "灯泡；球茎", bulk: "大量；大批", bulky: "笨重的", bush: "灌木", bustling: "繁忙的", busy: "忙碌的",
  button: "按钮；纽扣", bypass: "绕过", cabin: "小屋；客舱", cafeteria: "自助餐厅", calculate: "计算",
  calculated: "计算出的；蓄意的", calculation: "计算", calculator: "计算器", campus: "校园", candidate: "候选人",
  canopy: "顶篷", capability: "能力", capable: "有能力的", capacity: "容量；能力", capital: "资本；首都；大写字母",
  capture: "捕捉；获得", cardboard: "硬纸板", career: "职业", cargo: "货物", carpenter: "木匠", carpool: "拼车",
  carry: "携带；经营", carving: "雕刻", cashier: "收银员", cast: "演员阵容；投射", casual: "休闲的；随意的",
  cater: "承办餐饮；迎合", caterer: "餐饮承办人", catering: "餐饮服务", cause: "原因；导致", caution: "谨慎；警告",
  cautious: "谨慎的", cautiously: "谨慎地", ceiling: "天花板", celebrate: "庆祝", celebrated: "著名的",
  celebration: "庆祝活动", celebratory: "庆祝的", celebrity: "名人", centerpiece: "中心装饰品；核心",
  century: "世纪", ceramics: "陶瓷", certain: "确定的；某个", certificate: "证书", certification: "认证",
  certified: "经认证的", certify: "证明；认证", chair: "椅子；主持", chairperson: "主席；负责人", challenge: "挑战",
  challenging: "有挑战性的", chance: "机会；可能性", change: "改变；零钱", chapter: "章节", characteristic: "特征",
  charge: "收费；负责；充电", checkout: "结账；退房", cheerful: "愉快的", chemist: "化学家；药剂师", chemistry: "化学",
  chore: "杂务", choreographer: "编舞者", chronicle: "记录；编年史", chronological: "按时间顺序的", circulation: "流通；发行量",
  circumstance: "情况；环境", cite: "引用", citizen: "公民", civic: "市民的；城市的", claim: "声称；索赔",
  clarify: "澄清", clarity: "清晰；明确", clay: "黏土", clearance: "清仓；许可", clearly: "清楚地",
  clerical: "文书的", clerk: "职员；店员", client: "客户", clientele: "客户群", clogged: "堵塞的",
  close: "关闭；接近的", closed: "关闭的", closely: "密切地", closure: "关闭；结束", cloth: "布",
  clothing: "服装", coauthor: "合著者", coincide: "同时发生；一致", coincidence: "巧合", collaborate: "合作",
  collaboration: "合作", collaborative: "合作的", collapse: "倒塌；失败", colleague: "同事", collect: "收集；领取",
  column: "栏目；柱", combination: "组合", combine: "结合", combined: "结合的", comfort: "舒适；安慰",
  comfortable: "舒适的", comfortably: "舒适地", commemorate: "纪念", commemorative: "纪念的", commence: "开始",
  commend: "表扬", commensurate: "相称的", commerce: "商业", commercial: "商业的；广告", commission: "委员会；佣金",
  commit: "承诺；提交", commitment: "承诺；投入", committed: "尽心尽力的；承诺的", committee: "委员会", commonly: "通常",
  commute: "通勤", commuter: "通勤者", compact: "紧凑的", comparable: "可比较的", comparatively: "相对地",
  compare: "比较", comparison: "比较", compartment: "隔间", compatibility: "兼容性", compatible: "兼容的；合适的",
  compel: "迫使", compelling: "引人注目的；令人信服的", compensate: "补偿", compensation: "补偿；薪酬",
  compete: "竞争", competent: "能胜任的", competition: "竞争；比赛", competitive: "有竞争力的", competitor: "竞争者",
  compilation: "汇编", compile: "汇编；编制", complain: "抱怨", complaint: "投诉", complement: "补充；补足",
  complete: "完成；完整的", completely: "完全地", completion: "完成", complex: "复杂的；综合设施", complexity: "复杂性",
  compliance: "合规", compliant: "合规的", complicated: "复杂的", compliment: "赞美", complimentary: "免费的；赞美的",
  comply: "遵守", component: "组成部分；零件", composer: "作曲家", compost: "堆肥", comprehensive: "全面的",
  comprise: "包含；由...组成", compromise: "妥协", concentrate: "集中；浓缩", concentrated: "集中的；浓缩的",
  concentration: "集中；浓度", concern: "担忧；涉及", concerned: "担心的；有关的", concerning: "关于",
  concierge: "礼宾员", conclude: "结束；得出结论", conclusion: "结论；结束", conclusive: "决定性的", condition: "条件；状况",
  condominium: "公寓产权房", conduct: "进行；行为", conductor: "指挥；售票员", conference: "会议", confidence: "信心",
  confident: "自信的", confidential: "机密的", confidently: "自信地", confirm: "确认", confirmation: "确认",
  conflict: "冲突；日程冲突", conform: "遵守；符合", confuse: "使困惑", confused: "困惑的", confusing: "令人困惑的",
  confusion: "困惑；混乱", congested: "拥挤的", congestion: "拥堵", connect: "连接", connection: "连接；关系",
  connectivity: "连接性", consecutive: "连续的", consent: "同意", consequence: "结果；后果", consequently: "因此",
  conservation: "保护；保存", conserve: "保护；节约", consider: "考虑", considerable: "相当大的", considerably: "相当地",
  considerate: "体贴的", consideration: "考虑；体谅", consist: "由...组成", consistency: "一致性", consistent: "一致的",
  consistently: "一贯地", construct: "建造", construction: "建设；建筑", constructive: "建设性的", consult: "咨询",
  consultation: "咨询", consume: "消费；消耗", consumer: "消费者", consumption: "消费；消耗", contact: "联系；联系人",
  contain: "包含；容纳", container: "容器；集装箱", contemporary: "当代的", content: "内容；满意的", contract: "合同",
  contractor: "承包商", contribute: "贡献；捐助", contribution: "贡献；捐款", contributor: "贡献者", controversial: "有争议的",
  controversy: "争议", convenience: "便利", convenient: "方便的", conveniently: "方便地", convention: "大会；惯例",
  conventional: "传统的；常规的", conversely: "相反地", convert: "转换", convey: "传达；运输", convince: "说服",
  convinced: "确信的", cookware: "炊具", cooperative: "合作的", coordinate: "协调", coordination: "协调",
  coordinator: "协调员", copy: "副本；复制", copyright: "版权", corporate: "公司的", corporation: "公司；法人",
  correct: "正确的；改正", correction: "更正", correctly: "正确地", correspond: "通信；符合", correspondence: "通信；对应",
  correspondent: "通讯员", corrupt: "腐败的；损坏的", cosmetics: "化妆品", cost: "成本；花费", costly: "昂贵的",
  couch: "沙发", council: "委员会；议会", counterpart: "对应的人或物", countless: "无数的", country: "国家；乡村",
  county: "县；郡", coupon: "优惠券", courier: "快递员；快递服务", courteous: "有礼貌的", courtesy: "礼貌；免费服务",
  courthouse: "法院大楼", courtyard: "庭院", cover: "覆盖；封面；涵盖", coverage: "覆盖范围；报道", coworker: "同事",
  cozy: "舒适的", craft: "工艺；制作", craftsmanship: "工艺；手艺", cramped: "狭窄的", crate: "板条箱",
  create: "创造；创建", creation: "创造；作品", creative: "有创意的", creatively: "有创意地", creativity: "创造力",
  credentials: "资历；证件", credit: "信用；贷方；学分", crew: "工作人员；机组人员", criteria: "标准", criterion: "标准",
  critic: "评论家", critical: "关键的；批评的", criticism: "批评", criticize: "批评", critique: "评论；评估",
  crop: "农作物；裁剪", crosswalk: "人行横道", crouch: "蹲下", crowded: "拥挤的", crucial: "至关重要的",
  cubicle: "小隔间", cuisine: "菜肴；烹饪", culinary: "烹饪的", cupboard: "橱柜", curator: "策展人",
  curb: "路缘；限制", currency: "货币", current: "当前的；水流", currently: "目前", curtain: "窗帘",
  custodian: "看管人；保管人", custom: "习俗；定制的", customary: "惯常的", customer: "客户", customizable: "可定制的",
  customize: "定制", customs: "海关；习俗", cutlery: "餐具", daily: "每日的；日报", dairy: "乳制品；乳品店",
  data: "数据", deadline: "截止日期", deal: "交易；处理", dealer: "经销商", dealership: "经销店", dean: "院长",
  debris: "碎片；残骸", debut: "首次亮相", decade: "十年", deck: "甲板；平台", decline: "下降；拒绝",
  decrease: "减少；下降", dedicate: "奉献；专用于", dedicated: "专用的；投入的", dedication: "奉献；题词",
  defect: "缺陷", defective: "有缺陷的", define: "定义", definite: "明确的", definitely: "肯定地",
  definition: "定义", definitive: "最终的；权威的", degree: "学位；程度", delay: "延误；推迟", delegate: "代表；委派",
  delegation: "代表团；委派", delete: "删除", delicate: "精致的；脆弱的", delight: "高兴；使高兴", delighted: "高兴的",
  delightful: "令人愉快的", deliver: "递送；发表", delivery: "递送；交付", demand: "需求；要求", demanding: "要求高的",
  demographic: "人口统计的", demolish: "拆除", demolition: "拆除", demonstrate: "展示；证明", demonstration: "示范；证明",
  dentist: "牙医", deny: "否认；拒绝", depart: "离开；出发", department: "部门；百货部门", departmental: "部门的",
  departure: "出发；离开", dependable: "可靠的", dependence: "依赖", dependent: "依赖的；受扶养者", depict: "描绘",
  deposit: "押金；存款", depth: "深度", descend: "下降", describe: "描述", description: "描述", deserve: "应得",
  designate: "指定", designated: "指定的", despite: "尽管", destination: "目的地", detach: "拆下；分离",
  detail: "细节", detailed: "详细的", detect: "发现；检测", detergent: "洗涤剂", determination: "决心；确定",
  determine: "决定；确定", determined: "坚定的；已确定的", detour: "绕行路线", develop: "开发；发展", developer: "开发商；开发者",
  development: "发展；开发", device: "设备", devise: "设计；想出", devote: "投入；奉献", devoted: "投入的；忠诚的",
  diameter: "直径", diary: "日记；日程簿", diet: "饮食", dietary: "饮食的", differ: "不同", difference: "差异",
  different: "不同的", differently: "不同地", differing: "不同的", dig: "挖", dimension: "尺寸；方面", dine: "用餐",
  diner: "用餐者；小餐馆", diploma: "文凭", direct: "直接的；指导", direction: "方向；指示", directly: "直接地",
  directory: "目录", dirt: "污垢；泥土", disappoint: "使失望", disappointed: "失望的", disappointing: "令人失望的",
  disappointment: "失望", discard: "丢弃", disclaimer: "免责声明", disclose: "透露；公开", discontinue: "停止；中止",
  discourage: "阻止；使气馁", discrepancy: "差异；不一致", dishwasher: "洗碗机", disinfect: "消毒", dispatch: "派遣；发送",
  display: "展示；显示", disposable: "一次性的", disposal: "处理；处置", dispose: "处理；处置", dispute: "争议；争论",
  disregard: "忽视", disrupt: "扰乱；中断", disruption: "中断；扰乱", disruptive: "造成混乱的", dissatisfied: "不满意的",
  distinguished: "杰出的", distract: "使分心", distracting: "令人分心的", distraction: "分心；干扰", distribute: "分发；分配",
  distribution: "分发；分销", distributor: "分销商", district: "地区；区", disturb: "打扰；扰乱", disturbance: "打扰；骚乱",
  diverse: "多样的", diversify: "使多样化", diversity: "多样性", divide: "分开；划分", division: "部门；划分",
  dock: "码头；停靠", document: "文件", documentary: "纪录片；文件的", documentation: "文件资料", domestic: "国内的；家用的",
  dominant: "占主导的", dominate: "支配；占优势", donate: "捐赠", donation: "捐赠", donor: "捐赠者",
  donut: "甜甜圈", doorway: "门口", downtown: "市中心", dozen: "一打；十二个", draft: "草稿；起草",
  drain: "排水；下水道", drainage: "排水系统", drape: "窗帘；悬挂", draw: "画；抽取", drawer: "抽屉",
  drawing: "图纸；绘画", drill: "钻；训练", driveway: "车道", drug: "药物", due: "到期的；应付的",
  duplicate: "复制；副本", durability: "耐用性", durable: "耐用的", duration: "持续时间", dust: "灰尘",
  dustpan: "簸箕", duty: "职责；关税", eager: "渴望的", eagerly: "热切地", earbud: "耳塞式耳机",
  earn: "赚得；获得", earnings: "收入；收益", earth: "地球；泥土", ease: "缓解；轻松", easily: "容易地",
  easy: "容易的", eatery: "餐馆", economic: "经济的", economical: "经济实惠的；节约的", economics: "经济学",
  economist: "经济学家", economy: "经济", edit: "编辑", edition: "版本；期", editor: "编辑",
  editorial: "社论；编辑的", educate: "教育", education: "教育", educational: "教育的", educator: "教育工作者",
  effect: "影响；效果", effective: "有效的", effectively: "有效地", effectiveness: "有效性", efficiency: "效率",
  efficient: "高效的", efficiently: "高效地", effortlessly: "轻松地", elaborate: "详细说明；精心制作的", elect: "选举",
  election: "选举", electric: "电动的；电的", electrical: "电气的", electrician: "电工", electricity: "电",
  electronic: "电子的", electronically: "以电子方式", electronics: "电子产品", element: "元素；要素", eligibility: "资格",
  eligible: "有资格的", eliminate: "消除；淘汰", elimination: "消除；淘汰", embark: "开始；登船", embrace: "接受；拥抱",
  emerge: "出现", emergency: "紧急情况", emerging: "新兴的", emphasis: "强调；重点", emphasize: "强调",
  employ: "雇用；使用", employee: "员工", employer: "雇主", employment: "雇用；就业", empty: "空的",
  enable: "使能够", enclose: "随函附上；围住", enclosure: "附件；围栏", encounter: "遇到", encourage: "鼓励",
  encouraging: "令人鼓舞的", endangered: "濒危的", endeavor: "努力；尝试", endorse: "认可；背书", endorsement: "认可；背书",
  enforce: "执行；强制实施", engage: "参与；雇用", engagement: "参与；约定", engaging: "吸引人的", engineering: "工程",
  enhance: "提高；增强", enhanced: "增强的", enhancement: "增强；改进", enjoy: "享受", enlarge: "扩大",
  enormous: "巨大的", enroll: "注册；入学", enrollment: "注册；入学人数", ensure: "确保", entail: "需要；牵涉",
  enter: "进入；输入", enthusiasm: "热情", enthusiast: "爱好者", enthusiastic: "热情的", enthusiastically: "热情地",
  entire: "整个的", entirely: "完全地", entity: "实体", entrance: "入口", entrepreneur: "企业家", entrepreneurship: "创业",
  entry: "入口；条目", envelope: "信封", environment: "环境", environmental: "环境的", environmentally: "环保地",
  envision: "设想", episode: "一集；事件", equip: "装备；配备", equipment: "设备", equivalent: "等同物；相等的",
  erase: "擦除", ergonomic: "符合人体工学的", errand: "差事", essential: "必要的；本质的", essentially: "本质上",
  establish: "建立", established: "已建立的；知名的", establishment: "机构；建立", estimate: "估计；报价",
  evaluate: "评估", evaluation: "评估", even: "甚至；平坦的", evenly: "均匀地", event: "事件；活动",
  eventual: "最终的", eventually: "最终", evidence: "证据", exact: "准确的", exactly: "准确地；正是",
  examine: "检查；审查", excavate: "挖掘", excavation: "挖掘", exceed: "超过", excellence: "卓越",
  excellent: "优秀的", except: "除了", exception: "例外", exceptional: "杰出的；例外的", exceptionally: "异常地；格外地",
  excerpt: "摘录", excess: "过量；多余", excessive: "过度的", excited: "兴奋的", exclude: "排除",
  excluding: "不包括", exclusive: "独家的；专用的", exclusively: "专门地", excursion: "短途旅行", execute: "执行",
  executive: "高管；行政的", exemplary: "模范的", exhibit: "展出；展品", exhibition: "展览", exhibitor: "参展商",
  exist: "存在", existence: "存在", existing: "现有的", exit: "出口；离开", expand: "扩大", expansion: "扩张",
  expect: "预期；期待", expectation: "期望", expedite: "加快处理", expenditure: "支出", expense: "费用",
  expensive: "昂贵的", experienced: "有经验的", experiment: "实验", experimental: "实验性的", expert: "专家；熟练的",
  expertise: "专业知识", expertly: "熟练地", expiration: "到期", expire: "到期", explain: "解释", explore: "探索",
  expo: "博览会", exponentially: "快速增长地；指数地", export: "出口；导出", exporter: "出口商", expose: "暴露；揭露",
  exposition: "博览会；说明", exposure: "暴露；曝光", express: "表达；快递的", extend: "延长；扩展", extension: "延长；分机",
  extensive: "广泛的", extensively: "广泛地", exterior: "外部；外部的", external: "外部的", extra: "额外的",
  extraordinary: "非凡的", extreme: "极端的", extremely: "极其", fabric: "布料；织物", fabulous: "极好的",
  face: "面对；脸", facet: "方面；刻面", facilitate: "促进；使便利", facilitation: "促进", facilitator: "协调人；主持人",
  facility: "设施", factor: "因素", faculty: "全体教师；院系", fairly: "相当地；公平地", faithful: "忠诚的",
  fame: "名声", familiar: "熟悉的", familiarity: "熟悉", familiarize: "使熟悉", famous: "著名的", fare: "票价",
  farm: "农场", farmer: "农民", farming: "农业；耕作", fascinate: "使着迷", fascinating: "迷人的",
  fashion: "时尚；方式", faucet: "水龙头", faulty: "有故障的", favor: "支持；帮助", favorable: "有利的",
  favorably: "有利地", feasibility: "可行性", feasible: "可行的", feature: "特点；以...为特色", fee: "费用",
  feed: "喂养；供给", feedback: "反馈", fellow: "同事；同伴", fertilizer: "肥料", festivity: "庆祝活动",
  fiber: "纤维", field: "领域；田地", figure: "数字；人物；图形", file: "文件；归档", film: "电影；拍摄",
  filming: "拍摄", final: "最终的", finalize: "最终确定", finally: "最终", finance: "财务；金融",
  financial: "财务的；金融的", financially: "财务上", finding: "发现；调查结果", fine: "罚款；好的", firm: "公司；坚定的",
  firmly: "坚定地", firsthand: "第一手的", fiscal: "财政的", fix: "修理；解决", flat: "平坦的；公寓",
  flavor: "风味", flaw: "缺陷", flawed: "有缺陷的", flawless: "完美无瑕的", fleet: "车队；船队",
  flexibility: "灵活性", flexible: "灵活的", flooring: "地板材料", floral: "花的", florist: "花商",
  flyer: "传单", foam: "泡沫", focus: "重点；集中", fold: "折叠", follow: "跟随；遵循",
  following: "接下来的；以下的", footage: "录像片段", forecast: "预测；预报", foremost: "最重要的",
  formal: "正式的", formally: "正式地", former: "以前的", formerly: "以前", forthcoming: "即将到来的",
  fortunate: "幸运的", fortunately: "幸运地", forum: "论坛", forward: "转发；向前的", fossil: "化石",
  foster: "促进；培养", found: "创立；发现的过去式", foundation: "基础；基金会", founder: "创始人", fountain: "喷泉",
  foyer: "门厅", fraction: "一小部分；分数", fracture: "裂缝；骨折", fragile: "易碎的", fragrance: "香味",
  frame: "框架；框", free: "免费的；空闲的", freelance: "自由职业的", freezer: "冰柜", freight: "货运",
  frequency: "频率", frequent: "频繁的", frequently: "频繁地", fridge: "冰箱", fruit: "水果", frustrated: "沮丧的",
  frustrating: "令人沮丧的", fuel: "燃料", fulfill: "履行；满足", full: "满的；完整的", function: "功能；运作",
  functional: "实用的；功能性的", functionality: "功能", fund: "资金；基金", funding: "资金", furnished: "配备家具的",
  furnishings: "家具用品", furniture: "家具", further: "进一步的；促进", furthermore: "此外", gain: "获得；增加",
  gala: "庆典；盛会", garbage: "垃圾", garment: "衣服", gear: "设备；装备", general: "一般的；总的",
  contractor: "承包商", generally: "通常；一般地", generate: "生成；产生", generation: "一代；产生", generator: "发电机",
  generosity: "慷慨", generous: "慷慨的", generously: "慷慨地", geologist: "地质学家", geology: "地质学",
  glance: "一瞥；扫视", glitch: "小故障", glove: "手套", glue: "胶水；粘贴", goal: "目标",
  goggles: "护目镜", gourmet: "美食家；高级美食的", governor: "州长；主管", graciously: "亲切地；优雅地",
  graduate: "毕业；毕业生", graduation: "毕业", grain: "谷物；颗粒", grant: "授予；补助金", grateful: "感激的",
  gratitude: "感激", gravel: "碎石", greatly: "大大地", greenhouse: "温室", greet: "问候", grocery: "食品杂货",
  groundbreaking: "开创性的；破土动工", guarantee: "保证", guest: "客人", guideline: "指南；准则", guitar: "吉他",
  gymnasium: "体育馆", habitat: "栖息地", hallway: "走廊", halt: "停止", hammer: "锤子", hand: "手；递交",
  handcrafted: "手工制作的", handle: "处理；把手", handling: "处理", handout: "讲义；传单", hang: "悬挂",
  happen: "发生", hardly: "几乎不", hardware: "五金；硬件", harsh: "严厉的；恶劣的", harvest: "收获",
  head: "负责人；前往；头", headquarters: "总部", health: "健康", heater: "加热器", heavily: "大量地；沉重地",
  height: "高度", helmet: "头盔", heritage: "遗产", hesitant: "犹豫的", hesitate: "犹豫", highlight: "强调；亮点",
  highlighter: "荧光笔", highly: "高度地；非常", hire: "雇用", historian: "历史学家", historic: "历史上重要的",
  historical: "历史的", hold: "持有；举行", hone: "磨练", honor: "荣誉；尊重", hope: "希望",
  hopeful: "有希望的", hopefully: "有希望地", horticulture: "园艺", hose: "软管", host: "主办；主持人",
  household: "家庭；家用的", housekeeping: "客房清洁；家务", housewares: "家庭用品", however: "然而", huge: "巨大的",
  humidifier: "加湿器", humidity: "湿度", hurry: "匆忙", ideal: "理想的", ideally: "理想地", identical: "相同的",
  identification: "身份证明；识别", identify: "识别；确认", identity: "身份", illustrate: "说明；图解", illustrated: "有插图的",
  illustration: "插图；说明", immediate: "立即的", immediately: "立即", immensely: "非常", impact: "影响；冲击",
  impeccable: "无可挑剔的", imperative: "必要的；命令式", implement: "实施；工具", implementation: "实施",
  imply: "暗示", import: "进口；导入", importer: "进口商", impress: "给...留下印象", impression: "印象",
  impressive: "令人印象深刻的", improve: "改进", improved: "改进的", improvement: "改进", inaccurate: "不准确的",
  inaugural: "就职的；首次的", inaugurate: "为...举行开幕式", incentive: "激励；奖励", incident: "事件",
  inclement: "恶劣的", include: "包括", including: "包括", income: "收入", incoming: "即将到来的；传入的",
  inconvenience: "不便", inconvenient: "不方便的", incorporate: "合并；纳入", incorrect: "不正确的", increase: "增加",
  increasingly: "越来越", incur: "招致；产生费用", indefinitely: "无限期地", independent: "独立的", independently: "独立地",
  indicate: "表明；指出", individual: "个人；单独的", individually: "单独地", industrial: "工业的", industry: "行业",
  inexpensive: "便宜的", inexperienced: "缺乏经验的", infer: "推断", influence: "影响", influencer: "有影响力的人",
  influential: "有影响力的", inform: "通知", informal: "非正式的", informally: "非正式地", informational: "信息性的",
  informative: "提供信息的", informed: "知情的", infrastructure: "基础设施", ingredient: "成分；原料", initial: "最初的",
  initially: "最初", initiate: "发起；开始", initiative: "倡议；主动性", inn: "小旅馆", innovation: "创新",
  innovative: "创新的", input: "输入；意见", inquire: "询问", inquiry: "询问；调查", insight: "见解",
  insightful: "有见地的", inspect: "检查", inspection: "检查", inspector: "检查员", inspire: "激励；启发",
  inspiring: "鼓舞人心的", install: "安装", installation: "安装", installment: "分期付款；一期", instead: "代替；反而",
  institute: "机构；设立", institution: "机构", instruct: "指导；指示", instruction: "指示；说明", instructional: "教学的",
  instrument: "仪器；乐器", instrumental: "有帮助的；工具性的", insufficient: "不足的", insulate: "隔热；绝缘",
  insulation: "隔热；绝缘材料", insurance: "保险", insure: "投保；确保", intact: "完好无损的", intake: "摄入；接收",
  integral: "不可或缺的", intend: "打算", intense: "强烈的", intensify: "加强", intensity: "强度",
  intensive: "密集的；强化的", intention: "意图", intentional: "故意的", intentionally: "故意地", interact: "互动",
  interaction: "互动", interactive: "互动的", interim: "临时的；中期", interior: "内部；室内的", intermediate: "中级的",
  intermission: "中场休息", intermittent: "间歇的", intern: "实习生", internal: "内部的", internship: "实习",
  interrupt: "打断；中断", interruption: "中断", intersection: "十字路口；交叉点", intricate: "复杂精细的", intriguing: "有趣的",
  introduce: "介绍；引入", introduction: "介绍；引入", introductory: "介绍性的；初级的", intuitive: "直观的", invalid: "无效的",
  invaluable: "非常宝贵的", invent: "发明", invention: "发明", inventory: "库存", invest: "投资",
  investigate: "调查", investigation: "调查", investment: "投资", investor: "投资者", invitation: "邀请",
  invite: "邀请", inviting: "吸引人的", invoice: "发票", involve: "涉及；包含", iron: "熨斗；铁",
  irrigation: "灌溉", issue: "问题；发行", item: "物品；项目", itemize: "逐项列出", itinerary: "行程表",
  janitor: "清洁工；管理员", jar: "罐子", jewelry: "珠宝", journal: "期刊；日志", journalist: "记者",
  journey: "旅程", justify: "证明...合理", keepsake: "纪念品", kettle: "水壶", keynote: "主题演讲",
  kindly: "亲切地；请", kiosk: "小亭；自助终端", kitchenware: "厨房用具", kneel: "跪下", knowledge: "知识",
  knowledgeable: "知识渊博的", lab: "实验室", labor: "劳动；劳动力", laboratory: "实验室", lack: "缺乏",
  ladder: "梯子", lake: "湖", lamppost: "路灯柱", land: "土地；着陆", landfill: "垃圾填埋场",
  landlord: "房东", landmark: "地标", landscape: "景观；风景", landscaper: "园艺设计师", landscaping: "景观美化",
  lanyard: "挂绳", lap: "膝上；一圈", lapse: "失误；失效", largely: "主要地；大体上", last: "最后的；持续",
  lately: "最近", later: "之后", latest: "最新的", launch: "发布；启动", laundry: "洗衣；洗衣店",
  lawyer: "律师", lean: "精益的；倾斜", lease: "租约；租赁", leave: "离开；休假", leftover: "剩余物",
  legal: "法律的；合法的", legendary: "传奇的", length: "长度", lengthen: "延长", lengthy: "冗长的",
  level: "水平；级别；平的", librarian: "图书管理员", lid: "盖子", likelihood: "可能性", likely: "可能的",
  likewise: "同样地", limit: "限制；限度", limited: "有限的", line: "线；队伍；产品线", linguistics: "语言学",
  liquid: "液体；液态的", literature: "文学；资料", lively: "活泼的", load: "装载；负荷", loan: "贷款",
  lobby: "大厅；游说", local: "当地的", locally: "在当地", locate: "定位；位于", located: "位于",
  location: "地点", locksmith: "锁匠", lodge: "小屋；住宿", lodging: "住宿", logistical: "后勤的；物流的",
  logistics: "物流；后勤", lot: "地块；大量", lower: "降低；较低的", loyal: "忠诚的", loyalty: "忠诚",
  luck: "运气", lucrative: "有利可图的", luggage: "行李", lumber: "木材", luncheon: "午餐会",
  luxurious: "豪华的", luxury: "奢华；奢侈品", machine: "机器", machinery: "机械设备", magazine: "杂志",
  magnificent: "壮丽的", mail: "邮件；邮寄", mainly: "主要地", maintain: "维护；保持", maintenance: "维护",
  makeup: "化妆品；组成", malfunction: "故障", manage: "管理；设法做到", management: "管理层；管理", manager: "经理",
  managerial: "管理的", mandatory: "强制性的", manner: "方式；礼貌", manufacture: "制造", manufacturer: "制造商",
  manufacturing: "制造业", manuscript: "手稿", margin: "边距；利润率", marginally: "稍微地", mark: "标记；分数",
  market: "市场；销售", mason: "泥瓦匠", material: "材料；资料", matinee: "日场演出", maximize: "最大化",
  maximum: "最大值；最大的", mayor: "市长", mayoral: "市长的", meanwhile: "与此同时", measure: "衡量；措施",
  measurement: "测量；尺寸", mechanic: "机械师", mechanical: "机械的", mechanism: "机制；机械装置", medical: "医疗的",
  medication: "药物", medicine: "药；医学", meet: "会见；满足", membership: "会员资格", memento: "纪念品",
  memo: "备忘录", memoir: "回忆录", memorabilia: "纪念品", memorable: "难忘的", memorandum: "备忘录",
  memorize: "记住", memory: "记忆；内存", mentee: "被指导者", mention: "提到", mentor: "导师",
  merchandise: "商品", merchant: "商人；商家", merge: "合并", merger: "合并", meteorologist: "气象学家",
  method: "方法", meticulously: "一丝不苟地", metropolitan: "大都市的", microscope: "显微镜", migration: "迁移",
  milestone: "里程碑", mindful: "留心的", mine: "矿；我的", minimal: "最小的", minimize: "最小化",
  minimum: "最低限度；最小的", minister: "部长；牧师", minute: "分钟；会议记录", misleading: "误导性的",
  misplace: "放错地方", mission: "任务；使命", misunderstanding: "误解", moderate: "适度的；主持", moderately: "适度地",
  moderator: "主持人", modern: "现代的", modernize: "现代化", modest: "适度的；谦虚的", modification: "修改",
  modify: "修改", moisture: "水分；湿气", monitor: "监控；显示器", morale: "士气", moreover: "此外",
  mortgage: "抵押贷款", mostly: "主要地", motivate: "激励", motivated: "有动力的", motivation: "动力",
  motivational: "激励的", motorcycle: "摩托车", mount: "安装；攀登", move: "搬家；移动", mover: "搬家公司人员",
  multiple: "多个的", municipal: "市政的", municipality: "市政当局", mural: "壁画", namely: "即；也就是",
  national: "全国的；国家的", nationwide: "全国范围的", native: "本地的；本国的", nearby: "附近的", nearly: "几乎",
  negotiable: "可协商的", negotiate: "谈判；协商", negotiation: "谈判", neighbor: "邻居", neighborhood: "社区",
  neighboring: "邻近的", networking: "人脉建立；联网", nevertheless: "然而", nominate: "提名", nomination: "提名",
  nonprofit: "非营利组织；非营利的", normal: "正常的", normally: "通常", notable: "值得注意的", note: "笔记；注意到",
  noted: "著名的；被注意到的", noteworthy: "值得注意的", noticeable: "明显的", notification: "通知", notify: "通知",
  notwithstanding: "尽管", novelist: "小说家", novice: "新手", number: "数字；数量", numerical: "数字的",
  numerous: "许多的", nurse: "护士", nursery: "托儿所；苗圃", nutrition: "营养", nutritional: "营养的",
  nutritionist: "营养师", nutritious: "有营养的", objective: "目标；客观的", obligation: "义务", observance: "遵守；纪念",
  observation: "观察", observe: "观察；遵守", obsolete: "过时的", obstruct: "阻碍", obstruction: "障碍",
  obtain: "获得", occasion: "场合；时机", occasional: "偶尔的", occasionally: "偶尔", occupancy: "占用；入住率",
  occupation: "职业；占用", occupied: "被占用的；忙的", occupy: "占用；占据", occur: "发生", occurrence: "发生；事件",
  odor: "气味", offer: "提供；报价", offering: "提供的东西；产品", offset: "抵消", old: "旧的",
  onboarding: "入职培训", once: "一次；一旦", one: "一个", ongoing: "持续的", only: "仅仅；唯一的",
  opening: "空缺；开业；开口", operate: "操作；经营", operation: "运营；操作", operational: "运营的", operator: "操作员",
  opportunity: "机会", opt: "选择", optician: "眼镜师", optimal: "最佳的", optimism: "乐观",
  optimistic: "乐观的", option: "选择", optional: "可选择的", order: "订单；命令", ordinance: "条例",
  ordinarily: "通常", organic: "有机的", organization: "组织", organizational: "组织的", organize: "组织；整理",
  organizer: "组织者；收纳用品", orientation: "入职培训；方向", origin: "起源", original: "原始的；原创的",
  originally: "最初", ornithologist: "鸟类学家", ornithology: "鸟类学", otherwise: "否则；另外", outage: "停电；中断",
  outcome: "结果", outdated: "过时的", outgoing: "外向的；离任的", outing: "郊游", outlet: "插座；门店",
  outline: "大纲；概述", outlook: "前景；观点", output: "产出；输出", outreach: "外展；推广", outstanding: "杰出的；未付的",
  oval: "椭圆形", overall: "总体的；全部", overbook: "超额预订", overcome: "克服", overdue: "逾期的",
  overhaul: "大修；彻底改革", overlook: "忽视；俯瞰", overnight: "过夜；一夜之间", oversee: "监督", oversight: "监督；疏忽",
  overtime: "加班", overview: "概述", overwhelm: "压倒；使不知所措", overwhelming: "压倒性的", overwhelmingly: "压倒性地",
  overwork: "过度工作", owe: "欠；归功于", own: "拥有；自己的", owner: "所有者", ownership: "所有权",
  package: "包裹；套餐", packaging: "包装", packet: "小包；资料包", padding: "填充物", paddle: "桨",
  painting: "绘画", paleontologist: "古生物学家", paleontology: "古生物学", pamphlet: "小册子", panel: "面板；小组",
  paper: "纸；论文", paperless: "无纸化的", paperwork: "文书工作", paralegal: "律师助理", parcel: "包裹",
  partial: "部分的", partially: "部分地", participant: "参与者", participate: "参与", participation: "参与",
  particular: "特定的", particularly: "尤其", partition: "隔板；分隔", partner: "伙伴；合伙人", partnership: "合作关系",
  party: "聚会；一方", pastry: "糕点", patch: "补丁；小块", patent: "专利", path: "路径",
  patience: "耐心", patient: "病人；有耐心的", patiently: "耐心地", patio: "露台", patron: "顾客；赞助人",
  patronage: "惠顾；赞助", patronize: "光顾；赞助", pave: "铺设", pavement: "人行道；路面", paving: "铺路",
  pay: "支付；薪水", paycheck: "工资支票", payroll: "工资单；薪资发放", pedestrian: "行人", pediatrician: "儿科医生",
  peer: "同辈；同行", perennial: "多年生的；长期的", perfume: "香水", period: "期间；句号", periodic: "定期的",
  periodical: "期刊", periodically: "定期地", perishable: "易腐坏的", perk: "额外福利", permanent: "永久的",
  permission: "许可", permit: "许可证；允许", persistence: "坚持", person: "人", personal: "个人的",
  personalized: "个性化的", personnel: "人员；人事", perspective: "观点；视角", persuade: "说服", persuasive: "有说服力的",
  pertinent: "相关的", pharmaceutical: "制药的", pharmacist: "药剂师", pharmacy: "药房", phase: "阶段",
  photocopier: "复印机", photograph: "照片；拍照", photographer: "摄影师", photographic: "摄影的", photography: "摄影",
  physical: "身体的；物理的", physician: "医生", piano: "钢琴", pickup: "取货；接送", picturesque: "风景如画的",
  pier: "码头", pile: "一堆", pillow: "枕头", pit: "坑", place: "地点；放置",
  placement: "安置；职位安排", plant: "植物；工厂；种植", plague: "困扰；瘟疫", platform: "平台", platter: "大盘子",
  play: "播放；戏剧；玩", playground: "操场", plaza: "广场", pleasant: "令人愉快的", pleased: "高兴的",
  pleasure: "愉快；荣幸", plentiful: "丰富的", plumber: "水管工", plumbing: "管道系统", podcast: "播客",
  podium: "讲台", point: "要点；指向", policy: "政策；保单", policyholder: "保单持有人", polish: "擦亮；润色",
  poll: "民意调查", pond: "池塘", popular: "受欢迎的", popularity: "受欢迎程度", popularly: "普遍地",
  porcelain: "瓷器", porch: "门廊", portfolio: "作品集；投资组合", portion: "部分；一份", portrait: "肖像",
  portray: "描绘", pose: "姿势；提出", position: "职位；位置", possess: "拥有", post: "职位；张贴；邮寄",
  postage: "邮资", postal: "邮政的", postpone: "推迟", pot: "锅；罐", potential: "潜在的；潜力",
  pothole: "路面坑洞", potter: "陶工", pottery: "陶器", pour: "倒；倾注", power: "电力；权力",
  practical: "实际的；实用的", practice: "练习；惯例", praise: "表扬", precaution: "预防措施", precise: "精确的",
  precisely: "精确地", predict: "预测", predictable: "可预测的", prediction: "预测", prefer: "更喜欢",
  preferably: "最好", preference: "偏好", preferred: "首选的", preliminary: "初步的", premier: "首要的；总理",
  premiere: "首映", premise: "前提", premises: "场所；经营场地", premium: "保险费；高级的", preparation: "准备",
  prepare: "准备", prerequisite: "先决条件", prescribe: "开处方；规定", prescription: "处方", presence: "出席；存在",
  present: "出席的；当前的；礼物；呈现", preservation: "保存；保护", preserve: "保存；保护", president: "总裁；总统",
  prestige: "声望", prestigious: "有声望的", pretty: "相当；漂亮的", prevent: "防止", prevention: "预防",
  preventive: "预防性的", preview: "预览", previous: "先前的", previously: "以前", primarily: "主要地",
  primary: "主要的；初级的", prime: "主要的；最好的", principal: "负责人；主要的", principally: "主要地",
  principle: "原则", printer: "打印机", prior: "先前的", prioritize: "优先处理", priority: "优先事项",
  privilege: "特权", privileged: "享有特权的", probably: "可能", probationary: "试用期的", procedure: "程序；流程",
  proceed: "继续；进行", proceedings: "会议记录；诉讼程序", proceeds: "收益", process: "流程；处理", processing: "处理",
  produce: "生产；农产品", producer: "生产商", production: "生产", productive: "高效的", productivity: "生产力",
  profession: "职业", professional: "专业的；专业人士", professionalism: "专业精神", professionally: "专业地",
  professor: "教授", proficiency: "熟练程度", proficient: "熟练的", profile: "简介；概况", profit: "利润",
  profitability: "盈利能力", profitable: "有利可图的", progress: "进展", progressive: "逐步的；进步的", prohibit: "禁止",
  prohibitive: "高得令人却步的；禁止性的", project: "项目；投射", projection: "预测；投影", projector: "投影仪",
  prolific: "多产的", prominent: "著名的；突出的", prominently: "显著地", promise: "承诺；前景", promising: "有前途的",
  promote: "促进；晋升", promotion: "促销；晋升", promotional: "促销的", prompt: "迅速的；提示", promptly: "迅速地",
  proof: "证据；校样", proofread: "校对", proofreader: "校对员", proper: "适当的；正确的", properly: "正确地",
  property: "房产；财产", proposal: "提案", propose: "提议", proprietary: "专有的", proprietor: "业主；经营者",
  prospect: "前景；潜在客户", prospective: "未来的；潜在的", protect: "保护", protection: "保护", protective: "保护性的",
  protocol: "规程；礼仪", prototype: "原型", prove: "证明", provide: "提供", provider: "供应商；提供者",
  province: "省", provision: "供应；条款", proximity: "接近；邻近", prune: "修剪", public: "公众的；公开的",
  publication: "出版物", publicist: "宣传人员", publicity: "宣传；公开关注", publicize: "宣传", publish: "出版；发布",
  publisher: "出版商", publishing: "出版业", purchase: "购买", purpose: "目的", purse: "钱包", pursue: "追求；从事",
  purveyor: "供应商", qualification: "资格", qualified: "合格的", qualify: "使合格；有资格", quality: "质量",
  quantity: "数量", quarter: "季度；四分之一", quarterly: "季度的；每季度", query: "询问；疑问", question: "问题",
  questionnaire: "问卷", quota: "配额", quote: "报价；引用", radius: "半径", raffle: "抽奖", rafting: "漂流",
  railing: "栏杆", raise: "提高；筹集；提出", rake: "耙子；耙", ramp: "坡道", range: "范围；系列",
  rapid: "迅速的", rapidly: "迅速地", rare: "罕见的", rarely: "很少", rate: "费率；评价",
  rather: "相当；而是", rating: "评级", rave: "热烈赞扬", reach: "到达；联系", readership: "读者群",
  readily: "乐意地；容易地", realize: "意识到；实现", realty: "房地产", reasonable: "合理的", reasonably: "合理地",
  reassure: "使安心", rebate: "返利；折扣", recall: "回忆；召回", receipt: "收据", receive: "收到",
  recent: "最近的", recently: "最近", reception: "接待处；招待会", receptionist: "接待员", recharge: "充电",
  rechargeable: "可充电的", recipe: "食谱", recipient: "接收者", recognition: "认可；识别", recognize: "认出；认可",
  recommend: "推荐；建议", recommendation: "推荐；建议", reconstruction: "重建", recount: "叙述；重新清点", recruit: "招聘",
  recruiter: "招聘人员", recruitment: "招聘", rectangular: "长方形的", recur: "再次发生", recyclable: "可回收的",
  recyclables: "可回收物", recycle: "回收利用", recycling: "回收利用", redeem: "兑换；补救", redeemable: "可兑换的",
  reduce: "减少", reduction: "减少", refer: "提及；参考；转介", reference: "参考；推荐人", referral: "推荐；转介",
  refill: "补充；续杯", reflect: "反映；反射", reflection: "反映；倒影", reform: "改革", refrain: "避免；克制",
  refreshments: "茶点", refrigerate: "冷藏", refrigerator: "冰箱", refuel: "加油；补充燃料", refund: "退款",
  refundable: "可退款的", refurbish: "翻新", refuse: "拒绝；垃圾", regard: "看待；关于", regarding: "关于",
  region: "地区", regional: "地区的", register: "登记；收银机", registrant: "登记人", registration: "登记；注册",
  regret: "遗憾；后悔", regular: "定期的；常规的", regularly: "定期地", regulate: "管理；调节", regulation: "规定",
  rehearsal: "排练", rehearse: "排练", reimburse: "报销", reimbursement: "报销", reinforce: "加强",
  reinvent: "彻底改造", reject: "拒绝", related: "相关的", relationship: "关系", relative: "相对的；亲戚",
  relatively: "相对地", release: "发布；释放", relevant: "相关的", reliability: "可靠性", reliable: "可靠的",
  reliably: "可靠地", relief: "缓解；救济", relieve: "缓解", relieved: "放心的", relocate: "搬迁",
  relocation: "搬迁", reluctant: "不情愿的", rely: "依赖", remain: "保持；剩余", remainder: "剩余部分",
  remaining: "剩余的", remark: "评论；备注", remarkable: "显著的", remarkably: "显著地", remedy: "补救措施",
  remind: "提醒", reminder: "提醒", remodel: "改造；翻修", remote: "远程的；偏远的", remotely: "远程地",
  removal: "移除", remove: "移除", remuneration: "报酬", rendering: "效果图；呈现", renew: "续订；更新",
  renewable: "可再生的；可续订的", renewal: "续订；更新", renovate: "翻新", renovation: "翻新", renowned: "著名的",
  rent: "租金；租用", rental: "租赁的；租金", renter: "租户", reopen: "重新开放", reorganization: "重组",
  reorganize: "重组", repair: "修理", repave: "重新铺设", repeatedly: "反复地", replace: "替换",
  replacement: "替换品；更换", replenish: "补充", reply: "回复", reporter: "记者", represent: "代表",
  representative: "代表；销售代表", reproduce: "复制；再生产", reproduction: "复制；繁殖", repurpose: "改作他用",
  reputable: "声誉好的", reputation: "声誉", require: "要求；需要", requirement: "要求；条件", reschedule: "重新安排",
  research: "研究；调查", reservation: "预订；保留意见", reserve: "预订；保留", reservoir: "水库", reside: "居住",
  residence: "住所", resident: "居民", residential: "住宅的", resign: "辞职", resignation: "辞职", resilience: "韧性",
  resilient: "有韧性的", resist: "抵抗；抵制", resistance: "抵抗；阻力", resistant: "抵抗的；耐...的", resolution: "决议；解决",
  resolve: "解决；决心", resource: "资源", respect: "尊重；方面", respected: "受尊敬的", respectful: "尊重的",
  respective: "各自的", respectively: "分别地", respond: "回应", respondent: "受访者", response: "回应",
  responsibility: "责任", responsible: "负责的", rest: "休息；剩余部分", restart: "重新启动", restaurant: "餐馆",
  restock: "补货", restoration: "修复", restore: "恢复；修复", restrict: "限制", restricted: "受限制的",
  restriction: "限制", restructure: "重组", result: "结果", resume: "继续；简历", résumé: "简历", resurface: "重新出现",
  retail: "零售", retailer: "零售商", retain: "保留", retention: "保留；留存", retire: "退休", retirement: "退休",
  retreat: "静修；撤退", retrieve: "取回", retriever: "寻回犬", retrospective: "回顾的", reunion: "团聚",
  reuse: "再利用", reveal: "揭示", revenue: "收入", review: "审查；复习", reviewer: "审查者；评论者",
  revise: "修改；复习", revision: "修改；修订", revitalize: "使恢复活力", revolutionary: "革命性的", revolutionize: "彻底改变",
  reward: "奖励", rewarding: "有回报的", rigorous: "严格的", river: "河流", robotics: "机器人技术",
  robust: "强健的；强大的", room: "房间；空间", roughly: "大约；粗略地", round: "圆形的；一轮",
  roundabout: "环形交叉路口；迂回的", routine: "常规；例行的", routinely: "例行地", row: "一排；划船；争吵",
  rug: "小地毯", run: "经营；运行；跑", runway: "跑道；T台", rural: "农村的", rush: "匆忙",
  rust: "生锈", sabbatical: "休假年", salary: "薪水", sample: "样品；样本", sanitation: "卫生设施；卫生",
  sanitize: "消毒", satisfaction: "满意", satisfactory: "令人满意的", satisfied: "满意的", satisfy: "满足",
  scale: "规模；比例；秤", scan: "扫描", scarf: "围巾", scattered: "分散的", scenery: "风景",
  scenic: "风景优美的", scent: "气味；香味", scheme: "方案；计划", scholarship: "奖学金", scissors: "剪刀",
  scope: "范围", scratch: "划痕；抓挠", screen: "屏幕；筛选", screening: "筛选；放映", screenplay: "剧本",
  screwdriver: "螺丝刀", script: "脚本；剧本", sculptor: "雕塑家", sculpture: "雕塑", sea: "海",
  search: "搜索；寻找", seasonal: "季节性的", seasoned: "经验丰富的；调味的", sector: "部门；行业", secure: "安全的；确保",
  securely: "安全地", seed: "种子", seek: "寻找；寻求", segment: "部分；细分", seldom: "很少",
  select: "选择", selection: "选择；精选", selective: "选择性的", semiannual: "半年一次的", separate: "分开的；分离",
  separately: "分别地", sequel: "续集", sequence: "顺序；序列", series: "系列", serve: "服务；供应",
  server: "服务器；服务员", service: "服务", session: "会议；课程", setting: "环境；设置", settle: "解决；定居",
  severe: "严重的", sew: "缝制", shade: "阴影；遮光物", share: "分享；股份", shareholder: "股东",
  sharpen: "削尖；提高", shed: "棚屋；摆脱", shelf: "架子", ship: "船；运输", shipment: "货运；装运",
  shipping: "运输；发货", shoreline: "海岸线", shortage: "短缺", shortcoming: "缺点", shortly: "不久；简短地",
  shovel: "铲子", showcase: "展示；陈列柜", shuttle: "班车；穿梭", sibling: "兄弟姐妹", sightseeing: "观光",
  sign: "标志；签署", signature: "签名", significance: "重要性", significant: "重要的", significantly: "显著地",
  silverware: "银器；餐具", similarly: "类似地", simple: "简单的", simplify: "简化", simply: "仅仅；简单地",
  sink: "水槽；下沉", site: "地点；网站", situated: "位于", situation: "情况", sizable: "相当大的",
  skilled: "熟练的", skillful: "熟练的", skyrocket: "飞涨", skyscraper: "摩天大楼", slate: "石板；安排",
  sleeved: "有袖的", slight: "轻微的", slightly: "稍微", slot: "时段；插槽", smartphone: "智能手机",
  smoothly: "顺利地", snack: "零食", snowstorm: "暴风雪", soar: "猛增；高飞", soil: "土壤",
  sole: "唯一的；鞋底", solicit: "征求；请求", solid: "坚固的；可靠的", solution: "解决方案", solve: "解决",
  somewhat: "有点", sophisticated: "复杂精密的；老练的", sort: "种类；分类", sought: "受欢迎的；被寻求的",
  soundproof: "隔音的", source: "来源", souvenir: "纪念品", space: "空间", spacious: "宽敞的",
  spare: "备用的；抽出", specialization: "专业化", specialize: "专门从事", specialized: "专业的", specialty: "专业；特色",
  specific: "具体的", specifically: "具体地", specification: "规格", specifics: "细节", specify: "指定",
  specimen: "样本", spectacular: "壮观的", spectator: "观众", spill: "溢出", spoil: "破坏；宠坏",
  spokesperson: "发言人", sponsor: "赞助商；赞助", sponsorship: "赞助", spot: "地点；发现", square: "广场；正方形",
  stable: "稳定的", stack: "一叠；堆放", stage: "阶段；舞台", stain: "污渍；弄脏", staircase: "楼梯",
  stakeholder: "利益相关者", stall: "摊位；拖延", standard: "标准；标准的", stapler: "订书机", star: "明星；星",
  start: "开始", state: "状态；州；说明", statement: "声明；报表", station: "车站；岗位", stationery: "文具",
  statistical: "统计的", statistically: "统计上", statistics: "统计数据", statue: "雕像", status: "状态；地位",
  steadily: "稳定地", steady: "稳定的", steep: "陡峭的；高昂的", stellar: "极好的；星的", step: "步骤；台阶",
  stimulate: "刺激；促进", stipend: "津贴", stir: "搅拌；引起", stock: "库存；股票", stockholder: "股东",
  stool: "凳子", storage: "储存", store: "商店；储存", storm: "暴风雨", stormy: "暴风雨的",
  story: "故事；楼层", stove: "炉子", straightforward: "直接的；简单明了的", strategic: "战略的", strategically: "战略性地",
  strategy: "策略", stream: "溪流；流媒体", streaming: "流媒体播放", streamline: "简化；使高效", strengthen: "加强",
  stress: "压力；强调", stressful: "有压力的", strict: "严格的", striking: "显著的；引人注目的", stringent: "严格的",
  strive: "努力", stroll: "散步", stroller: "婴儿车", structural: "结构的", structure: "结构",
  struggle: "努力；挣扎", study: "学习；研究", stun: "使震惊", stunning: "极好的；令人惊叹的", sturdy: "结实的",
  subject: "主题；科目；使遭受", submission: "提交", submit: "提交", subscribe: "订阅", subscriber: "订阅者",
  subscription: "订阅", subsequent: "随后的", subsequently: "随后", subsidiary: "子公司；辅助的", substance: "物质",
  substantial: "大量的；实质的", substantially: "大幅地；实质上", substitute: "替代品；替代", suburb: "郊区",
  suburban: "郊区的", succeed: "成功；接替", success: "成功", successful: "成功的", successfully: "成功地",
  successor: "继任者", sufficient: "足够的", suggest: "建议；表明", suggestion: "建议", suit: "套装；适合",
  suitable: "合适的", suite: "套房；套件", suited: "适合的", summarize: "总结", summary: "摘要",
  sunscreen: "防晒霜", superb: "极好的", superior: "优越的；上级", supermarket: "超市", supervise: "监督",
  supervision: "监督", supervisor: "主管", supervisory: "监督的", supplement: "补充；补充品", supplemental: "补充的",
  supplier: "供应商", supply: "供应；用品", supporter: "支持者", suppose: "假设；认为", surcharge: "附加费",
  surface: "表面；浮现", surge: "激增", surgeon: "外科医生", surpass: "超过", surplus: "过剩；盈余",
  surprise: "惊喜；使惊讶", surprised: "惊讶的", surprising: "令人惊讶的", surprisingly: "令人惊讶地",
  surround: "围绕", surrounding: "周围的", surroundings: "周围环境", survey: "调查", surveyor: "测量员",
  suspend: "暂停；悬挂", suspenders: "吊带", sustain: "维持；承受", sustainable: "可持续的", sweep: "打扫；席卷",
  symposium: "研讨会", synthetic: "合成的", table: "桌子；表格", tactics: "策略；战术", tailor: "裁缝；定制",
  talent: "人才；天赋", talented: "有才能的", tap: "水龙头；轻拍", task: "任务", tax: "税",
  technician: "技术员", teleconference: "电话会议", temporarily: "暂时地", temporary: "临时的", tenant: "租户",
  tentative: "暂定的", tentatively: "暂定地", tenure: "任期；任职期", term: "条款；期限；术语", terminal: "终端；航站楼",
  terrain: "地形", testimonial: "推荐信；证明书", text: "文本；短信", textile: "纺织品", texture: "质地",
  thankful: "感激的", theme: "主题", thereby: "因此；由此", therefore: "因此", thermometer: "温度计",
  thorough: "彻底的", thoroughly: "彻底地", though: "虽然；不过", thrilled: "非常兴奋的", thrive: "兴旺；繁荣",
  thriving: "兴旺的", thunderstorm: "雷暴", thus: "因此", tight: "紧的；紧张的", timber: "木材",
  timeline: "时间线", timely: "及时的", timetable: "时间表", tip: "小费；建议", toll: "通行费；损失",
  tool: "工具", totally: "完全地", tourism: "旅游业", tourist: "游客", tow: "拖车；拖曳",
  track: "追踪；轨道", trademark: "商标", tradition: "传统", traditional: "传统的", traditionally: "传统上",
  trail: "小路；踪迹", transaction: "交易", transcript: "成绩单；文字记录", transfer: "转移；调动", transform: "转变",
  transit: "运输；过境", transition: "过渡", translator: "译者", transparent: "透明的", transport: "运输",
  transportation: "交通；运输", trash: "垃圾", treadmill: "跑步机", treasurer: "财务主管", treat: "对待；治疗",
  treatment: "治疗；处理", tremble: "颤抖", tremendous: "巨大的", trigger: "触发；引发", trim: "修剪；整齐的",
  trousers: "裤子", truck: "卡车", trust: "信任", trusted: "可信的", trustee: "受托人；理事",
  try: "尝试", tuition: "学费", tune: "曲调；调整", tuning: "调音；调整", turnout: "出席人数",
  turnover: "人员流动率；营业额", tutorial: "教程", typical: "典型的", typically: "通常", ultimately: "最终",
  unable: "不能的", unavailable: "不可用的；没空的", unclaimed: "无人认领的", uncomfortable: "不舒服的", undergo: "经历；接受",
  understaffed: "人手不足的", undertake: "承担；着手做", undertaking: "任务；事业", underway: "进行中的", unexpected: "意外的",
  unfamiliar: "不熟悉的", unfortunate: "不幸的", unfortunately: "不幸地", unit: "单位；单元", unless: "除非",
  unlikely: "不太可能的", unlimited: "无限的", unload: "卸货", unoccupied: "未被占用的", until: "直到",
  unveil: "公布；揭幕", upcoming: "即将到来的", update: "更新", upgrade: "升级", upholstery: "室内装饰材料",
  urban: "城市的", urge: "敦促；强烈要求", urgency: "紧急", urgent: "紧急的", urgently: "紧急地",
  usage: "使用；用法", usually: "通常", utensil: "器具；餐具", utility: "公用事业；实用性", utilize: "利用",
  vacancy: "空缺", vacant: "空的；空缺的", vacate: "腾出；离开", vacation: "假期", vacuum: "吸尘器；真空",
  valance: "帷幔", valid: "有效的", validate: "验证；确认", valuable: "有价值的", value: "价值；重视",
  valued: "受重视的", varied: "各种各样的", variety: "种类；多样性", various: "各种各样的", vary: "变化",
  vase: "花瓶", vast: "广阔的；大量的", vegetable: "蔬菜", vehicle: "车辆", vendor: "供应商；摊贩",
  vent: "通风口", ventilation: "通风", venture: "风险项目；创业", venue: "场地", verification: "核实",
  verify: "核实", versatile: "多用途的", version: "版本", vessel: "船只；容器", vet: "兽医；审查",
  veterinarian: "兽医", viable: "可行的", vibrant: "充满活力的", vicinity: "附近", videoconference: "视频会议",
  virtual: "虚拟的", visibility: "能见度；可见性", visible: "可见的", visitor: "访客", vital: "至关重要的",
  vitality: "活力", vitamin: "维生素", voice: "声音；表达", void: "无效的；空白", volume: "数量；音量；卷",
  voluntary: "自愿的", volunteer: "志愿者；自愿", vote: "投票", voucher: "凭证；代金券", voyage: "航行",
  vulnerable: "脆弱的", wage: "工资", waitstaff: "服务员团队", waive: "放弃；免除", waiver: "弃权书；豁免",
  walkway: "人行道", wallet: "钱包", warehouse: "仓库", warn: "警告", warranty: "保修；保证",
  water: "水", waterproof: "防水的", wear: "穿戴；磨损", webinar: "网络研讨会", weed: "杂草",
  weekday: "工作日", weekend: "周末", weigh: "称重；权衡", welder: "焊工", wheelbarrow: "手推车",
  whereas: "然而；鉴于", whether: "是否", while: "当...时；虽然", whole: "整个的", wholesale: "批发",
  wholesaler: "批发商", width: "宽度", wildlife: "野生动物", willing: "愿意的", willingness: "意愿",
  wing: "翅膀；侧楼", wipe: "擦拭", withdraw: "撤回；取款", withstand: "承受；经受", work: "工作",
  workforce: "劳动力", workload: "工作量", workplace: "工作场所", workshop: "工作坊；车间", workstation: "工作站",
  worldwide: "全世界的；全球地", worth: "价值；值得的", worthwhile: "值得的", worthy: "值得的", wrinkle: "皱纹",
  writer: "作者", yard: "院子；码", yarn: "纱线", yearly: "每年的", yield: "产量；产生；让步"
};

const phraseMeaningMap = {
  "a bit of": "一点；少量", "a couple of": "几个；两三个", "a great deal of": "大量的", "a number of": "许多",
  "a round of applause": "一阵掌声", "above all": "最重要的是", "abstract painting": "抽象画", "according to": "根据",
  "account balance": "账户余额", "accounting department": "会计部门", "accounts payable": "应付账款", "administrative department": "行政部门",
  "advance notice": "预先通知", "advanced degree": "高等学位", "adverse weather conditions": "恶劣天气状况",
  "advertising agency": "广告代理公司", "advertising department": "广告部门", "ahead of schedule": "提前于计划",
  "air conditioner": "空调", "air purifier": "空气净化器", "all sales are final.": "商品售出概不退换",
  "along with": "连同；与...一起", "among other things": "除其他事项外", "an array of": "一系列；大量",
  "apartment complex": "公寓楼群", "appliance store": "电器店", "artificial intelligence": "人工智能",
  "as a result": "因此", "as a token of appreciation": "作为感谢的表示", "as early as": "早在；最早",
  "as long as": "只要；长达", "as of": "截至；自...起", "as soon as": "一...就", "at all times": "始终",
  "at least": "至少", "at most": "至多", "at the latest": "最迟", "at the moment": "目前；此刻",
  "at your earliest convenience": "请在方便时尽早", "award-winning": "获奖的", "baggage claim (area)": "行李提取处",
  "baked goods": "烘焙食品", "banquet hall": "宴会厅", "based on": "基于", "be accustomed to": "习惯于",
  "be based in": "总部设在；位于", "be headquartered in": "总部设在", "because of": "由于", "behind schedule": "落后于计划",
  "benefits package": "福利方案", "best of all": "最重要的是；最好的是", "blue tarp": "蓝色防水布",
  "board of directors": "董事会", "board of trustees": "理事会", "book signing": "签售会", "box office": "售票处；票房",
  "brand-new": "全新的", "break room": "休息室", "brick-and-mortar store": "实体店", "bulk order": "大宗订单",
  "bulletin board": "公告板", "business hours": "营业时间", "cafe": "咖啡馆", "can/could you do me a favor?": "你能帮我一个忙吗？",
  "car rental agency": "汽车租赁公司", "cardboard box": "纸箱", "career fair": "招聘会", "cash register": "收银机",
  "cell phone": "手机", "ceo (chief executive officer)": "首席执行官", "checking account": "支票账户", "chief executive officer": "首席执行官",
  "civil engineer": "土木工程师", "civil engineering": "土木工程", "city official": "市政官员", "cleaning supplies": "清洁用品",
  "clearance sale": "清仓销售", "clothes dryer": "烘干机", "(clothes) dryer": "烘干机", "clothing shop": "服装店",
  "clothing store": "服装店", "color scheme": "配色方案", "come across": "偶然遇到；偶然发现", "community service": "社区服务",
  "company retreat": "公司团建；公司静修活动", "company-wide": "全公司的", "comply with": "遵守", "concession stand": "小卖部",
  "conference call": "电话会议", "conform to": "符合；遵守", "construction site": "建筑工地", "contrary to": "与...相反",
  "copy machine": "复印机", "cordially invite": "诚挚邀请", "could use": "需要；用得上", "craftspeople": "手工艺人",
  "critically acclaimed": "广受好评的", "curbside pickup": "路边取货", "currency exchange": "货币兑换",
  "customer satisfaction": "客户满意度", "customer service department": "客服部门", "custom made": "定制的", "cut back on": "削减",
  "cut down on": "减少", "cutting board": "砧板", "cutting-edge": "尖端的", "data breach": "数据泄露",
  "debit card": "借记卡", "department store": "百货商店", "depend on": "依赖；取决于", "dining area": "用餐区",
  "direct deposit": "直接转账入账", "dispose of": "处理；处置", "down payment": "首付款", "dress code": "着装规定",
  "dry cleaner": "干洗店", "due date": "截止日期；到期日", "due to": "由于", "dustpan": "簸箕",
  "electronic device": "电子设备", "electronics store": "电子产品商店", "employment agency": "职业介绍所",
  "energy-efficient": "节能的", "even if": "即使", "even though": "即使；虽然", "except for": "除了",
  "expiration date": "截止日期；有效期", "express mail": "快递邮件", "eye doctor": "眼科医生", "fabric dye": "布料染料",
  "fire extinguisher": "灭火器", "fire pit": "火坑；户外火炉", "fiscal year": "财年", "fitness tracker": "健身追踪器",
  "flagship store": "旗舰店", "flight attendant": "空乘人员", "flower shop": "花店", "focus group": "焦点小组",
  "folding chair": "折叠椅", "follow-up": "后续跟进", "food item": "食品", "(food) dehydrator": "食品脱水机",
  "for a while": "一会儿；一段时间", "for immediate release": "立即发布", "for instance": "例如", "front desk": "前台",
  "fuel-efficient": "省油的；节能的", "fulfillment center": "配送中心", "full refund": "全额退款", "full-time": "全职的",
  "fund-raiser": "募捐者；筹款活动", "fund-raising": "筹款", "general affairs department": "总务部",
  "general contractor": "总承包商", "generally speaking": "一般来说", "get in touch with": "与...取得联系",
  "get rid of": "摆脱；处理掉", "get to work": "开始工作；去上班", "gift certificate": "礼券",
  "given that": "鉴于；考虑到", "go out of business": "停业；倒闭", "government agency": "政府机构",
  "government official": "政府官员", "grand opening": "盛大开业", "grocery store": "杂货店；食品店",
  "hand in": "提交；交上", "hands-on": "亲身实践的", "hard hat": "安全帽", "hardware store": "五金店",
  "has/have yet to do": "尚未做某事", "head office": "总公司；总部", "health inspector": "卫生检查员",
  "hear from": "收到...的来信；得到...消息", "heavy rain": "大雨", "heavy-duty": "重型的；耐用的",
  "high-profile": "高调的；备受关注的", "hold onto": "保留；抓住", "hospitality industry": "酒店餐饮业",
  "human resources department": "人力资源部", "in a rush": "匆忙地", "in a timely manner": "及时地",
  "in accordance with": "按照；依据", "in addition": "此外", "in addition to": "除...之外", "in advance": "提前",
  "in an effort to do": "为了做某事", "in bulk": "大批量地", "in case": "以防；万一", "in charge of": "负责",
  "in common": "共同的", "in contrast": "相比之下", "in detail": "详细地", "in fact": "事实上",
  "in favor of": "支持；有利于", "in general": "一般来说", "in light of": "鉴于；考虑到", "in order": "按顺序；妥当",
  "in particular": "尤其", "in person": "亲自", "in place of": "代替", "in progress": "进行中",
  "in return": "作为回报", "in short": "简而言之", "in spite of": "尽管", "in stock": "有库存",
  "in the distance": "在远处", "in the event of": "如果发生", "in the event that": "如果", "in the long run": "从长远来看",
  "in the meantime": "与此同时", "in the process of": "在...过程中", "in time for": "及时赶上", "in transit": "运输中",
  "in writing": "以书面形式", "inclement weather": "恶劣天气", "information packet": "资料包", "in-house": "内部的；公司内的",
  "in-person": "现场的；面对面的", "instead of": "而不是", "intake form": "登记表；接收表", "interest rate": "利率",
  "investigative reporting": "调查性报道", "ironing board": "熨衣板", "IT department": "IT 部门", "jet lag": "时差反应",
  "job fair": "招聘会", "job opening": "职位空缺", "job posting": "招聘启事", "job search": "求职",
  "job seeker": "求职者", "just in case": "以防万一", "just so you know": "提醒你一下", "laboratory equipment": "实验室设备",
  "landscape painting": "风景画", "laptop (computer)": "笔记本电脑", "last-minute": "最后一刻的", "laundry basket": "洗衣篮",
  "(laundry) detergent": "洗衣液；洗涤剂", "laundry equipment": "洗衣设备", "law firm": "律师事务所", "lawn mower": "割草机",
  "lay out": "布置；规划", "lead to": "导致；通向", "legal department": "法务部", "light fixture": "灯具",
  "long-lasting": "持久的", "long-term": "长期的", "lost and found": "失物招领处", "loyalty program": "会员忠诚计划",
  "machine": "机器", "main office": "总办公室", "make sure": "确保", "make use of": "利用",
  "marketing department": "市场部", "mechanical engineer": "机械工程师", "(medical) checkup": "体检", "mentoring program": "导师项目",
  "microwave (oven)": "微波炉", "mobile device": "移动设备", "mobile phone": "手机", "money-back guarantee": "退款保证",
  "most likely": "很可能", "moving company": "搬家公司", "(musical) instrument": "乐器", "no later than": "不迟于",
  "no longer": "不再", "not only x but (also) y": "不仅 X 而且 Y", "now that": "既然", "office equipment": "办公设备",
  "office supplies": "办公用品", "office supply store": "办公用品店", "oil painting": "油画", "on a budget": "预算有限地",
  "on back order": "延期交货中", "on behalf of": "代表", "on board": "在船上；加入", "on duty": "值班",
  "on hand": "现有；在手边", "on one's way to": "在去...的路上", "on such short notice": "临时通知；如此短时间通知",
  "on the contrary": "相反", "on the other hand": "另一方面", "on the premises": "在场所内", "on time": "准时",
  "on-site": "现场的", "open to the public": "向公众开放", "out of order": "故障中", "out of paper": "没纸了",
  "out of stock": "缺货", "out of town": "出城；不在城里", "out-of-date": "过时的", "overhead bin": "头顶行李舱",
  "packing slip": "装箱单", "page through": "翻阅", "paid vacation": "带薪休假", "park ranger": "公园管理员",
  "parking lot": "停车场", "part-time": "兼职的", "part-time worker": "兼职员工", "performance evaluation": "绩效评估",
  "performance review": "绩效考核", "permanent exhibit": "常设展览", "personnel department": "人事部",
  "photo shoot": "拍摄活动", "physical therapist": "物理治疗师", "plastic bag": "塑料袋", "plenty of": "大量；许多",
  "pots and pans": "锅碗瓢盆", "potted plant": "盆栽", "power failure": "停电", "power interruption": "电力中断",
  "power outage": "停电", "power outlet": "电源插座", "press conference": "新闻发布会", "press release": "新闻稿",
  "professional development": "职业发展", "protective gear": "防护装备", "provided that": "如果；只要", "public relations": "公共关系",
  "public relations department": "公关部", "purchasing department": "采购部", "put in": "投入；提交", "quite a bit": "相当多",
  "quite a few": "相当多", "rain date": "雨天备用日期", "raw materials": "原材料", "reach out": "联系；伸出援手",
  "reach out to": "联系", "reading material": "阅读材料", "real estate": "房地产", "real estate agency": "房地产中介",
  "rechargeable battery": "充电电池", "regardless of": "不管；无论", "regular mail": "普通邮件",
  "report to work": "去上班；报到上班", "revolving door": "旋转门", "rewards program": "奖励计划", "right away": "马上",
  "ride-sharing": "拼车服务", "round-trip": "往返的", "run into": "偶然遇到；撞上", "safety equipment": "安全设备",
  "safety goggles": "护目镜", "safety inspector": "安全检查员", "safety protocols": "安全规程", "safety shoes": "安全鞋",
  "safety vest": "安全背心", "sales department": "销售部", "sales pitch": "推销话术", "savings account": "储蓄账户",
  "scavenger hunt": "寻宝游戏", "scheduling conflict": "日程冲突", "security department": "安保部门", "security guard": "保安",
  "sewing machine": "缝纫机", "shelving unit": "置物架", "short-staffed": "人手不足的", "short-term": "短期的",
  "should you have any questions": "如果您有任何问题", "side by side": "并排；一起", "sign up for": "报名参加",
  "so far": "到目前为止", "so that": "以便；所以", "social media": "社交媒体", "souvenir shop": "纪念品商店",
  "spread out": "展开；分散", "stain-resistant": "防污的", "stand out": "突出；显眼", "start-up": "创业公司；初创的",
  "state-of-the-art": "最先进的", "stationery store": "文具店", "stay tuned.": "敬请关注", "store credit": "商店积分；店内抵用金",
  "street stalls": "街边摊", "stuck in traffic": "堵在路上", "tab": "标签页；小标签", "table of contents": "目录",
  "tablet computer": "平板电脑", "take advantage of": "利用", "take effect": "生效", "take notes": "记笔记",
  "take on": "承担；呈现", "take part in": "参加", "take place": "发生；举行", "take turns": "轮流",
  "tap water": "自来水", "tear down": "拆除", "technology department": "技术部", "terms and conditions": "条款和条件",
  "test tube": "试管", "testify to": "证明", "that means": "那意味着", "throw away": "扔掉",
  "time sheet": "工时表", "time slot": "时间段", "time-consuming": "耗时的", "to this end": "为此",
  "to whom it may concern": "敬启者", "top-notch": "一流的", "tour guide": "导游", "tourist attraction": "旅游景点",
  "town official": "市政官员", "trade magazine": "行业杂志", "trade show": "贸易展", "travel agency": "旅行社",
  "turn down": "拒绝；调低", "turn in": "提交；上交", "turn x into y": "把 X 变成 Y", "turnaround time": "周转时间",
  "under construction": "施工中", "up and running": "正常运行", "up to": "最多；由...决定", "up-to-date": "最新的",
  "used to do": "过去常常做", "vacuum (cleaner)": "吸尘器", "vending machine": "自动售货机",
  "voice mail": "语音邮件", "washing machine": "洗衣机", "water dispenser": "饮水机", "watercolor painting": "水彩画",
  "watering can": "洒水壶", "weather forecaster": "天气预报员", "weaving machine": "织布机", "welcome aboard!": "欢迎加入！",
  "well-deserved": "当之无愧的", "well-known": "著名的", "when it comes to": "谈到；当涉及", "whenever": "无论何时",
  "wind turbine": "风力涡轮机", "window shade": "窗帘；遮光帘", "within walking distance": "步行距离内",
  "work ethic": "职业道德", "x-ray": "X 光；X 光片"
};

const photoSupplementalMeaningMap = {
  "abridged version": "删节版；简缩版",
  "accommodation(s)": "住宿；便利设施",
  "accordingly": "因此；相应地",
  "after": "在...之后",
  "after all": "毕竟；终究",
  "afterward(s)": "之后；随后",
  "ai": "人工智能",
  "all sales are final": "商品售出概不退换",
  "as": "作为；当...时；由于；像...一样",
  "asking price": "要价；售价",
  "assuming (that)": "假定；如果",
  "aware": "意识到的；知道的",
  "because": "因为",
  "best belong": "最适合；最相称",
  "(light) bulb": "灯泡",
  "light bulb": "灯泡",
  "can/could you do me a favor": "你能帮我一个忙吗？",
  "car": "汽车",
  "ceo (chief executive officer)": "首席执行官",
  "(medical) checkup": "体检",
  "medical checkup": "体检",
  "circulation desk": "借还书服务台；流通服务台",
  "clothes": "衣服",
  "(clothes) dryer": "烘干机",
  "clothes dryer": "烘干机",
  "conservancy": "保护协会；保护管理",
  "cook": "厨师；烹饪",
  "cookie": "饼干",
  "cooperate": "合作",
  "cooperation": "合作",
  "creature": "生物",
  "cube": "立方体；小隔间",
  "cv": "简历",
  "dehumidifier": "除湿机",
  "(food) dehydrator": "食品脱水机",
  "food dehydrator": "食品脱水机",
  "during": "在...期间",
  "finding(s)": "调查结果；发现",
  "findings": "调查结果；发现",
  "fireplace": "壁炉",
  "first-rate": "一流的",
  "given": "鉴于；特定的；给定的",
  "good": "好的；优质的",
  "house": "房子；公司；容纳",
  "id": "身份证件；识别",
  "if": "如果；是否",
  "inc.": "股份有限公司",
  "inc": "股份有限公司",
  "in-depth": "深入的；详细的",
  "in-store": "店内的；在店内",
  "interoffice": "办公室之间的；部门间的",
  "it department": "IT 部门；信息技术部门",
  "laptop (computer)": "笔记本电脑",
  "laptop computer": "笔记本电脑",
  "lawn": "草坪",
  "leading": "主要的；领先的",
  "leaflet": "传单；小册子",
  "leak": "泄漏；泄露",
  "lightbulb": "灯泡",
  "ltd.": "有限公司",
  "ltd": "有限公司",
  "microwave (oven)": "微波炉",
  "microwave oven": "微波炉",
  "(musical) instrument": "乐器",
  "musical instrument": "乐器",
  "next to": "在...旁边；紧挨着",
  "old-fashioned": "老式的；过时的",
  "one-way": "单程的；单向的",
  "owing to": "由于",
  "pay off": "还清；取得成效",
  "prop": "道具；支撑物",
  "rsvp": "请回复；敬请赐复",
  "sdgs": "可持续发展目标",
  "since": "自从；因为",
  "sofa": "沙发",
  "soon": "很快；不久",
  "sought-after": "受欢迎的；抢手的",
  "stay tuned": "敬请关注",
  "suv": "运动型多用途车",
  "vacuum (cleaner)": "吸尘器",
  "vacuum cleaner": "吸尘器",
  "via": "通过；经由",
  "welcome aboard": "欢迎加入",
  "when": "当...时；何时",
  "windowpane": "窗玻璃",
  "windowsill": "窗台"
};

const photoSuffixRules = [
  [/ability$/, "能力；性质"], [/ibility$/, "能力；性质"], [/tion$/, "；行为/状态"], [/sion$/, "；行为/状态"],
  [/ment$/, "；结果/过程"], [/ness$/, "；性质/状态"], [/ity$/, "；性质/状态"], [/ance$/, "；状态/行为"],
  [/ence$/, "；状态/行为"], [/er$/, "者；工具"], [/or$/, "者；机构"], [/ist$/, "专家；从业者"],
  [/ive$/, "的；有...性质的"], [/al$/, "的；相关的"], [/ous$/, "的；充满...的"], [/able$/, "可...的"],
  [/ible$/, "可...的"], [/less$/, "无...的"], [/ful$/, "充满...的"], [/ly$/, "地；以...方式"]
];

function cleanPhotoWord(word) {
  return String(word || "").trim().replace(/^[(]+|[)]+$/g, "").replace(/[.!?]+$/g, "").toLowerCase();
}

function photoLookupKeys(word) {
  const raw = String(word || "").trim().toLowerCase();
  const noEndingPunctuation = raw.replace(/[.!?]+$/g, "");
  const noParentheses = noEndingPunctuation.replace(/[()]/g, "").replace(/\s+/g, " ").trim();
  return [...new Set([raw, noEndingPunctuation, cleanPhotoWord(word), noParentheses].filter(Boolean))];
}

function lookupPhotoMeaning(word) {
  for (const key of photoLookupKeys(word)) {
    const meaning = photoSupplementalMeaningMap[key] || phraseMeaningMap[key] || photoMeaningMap[key];
    if (meaning) return meaning;
  }
  return "";
}

function titleCaseForExample(word) {
  return String(word || "").replace(/\b[a-z]/g, (char) => char.toUpperCase());
}

function phraseFromParts(word) {
  const parts = cleanPhotoWord(word).replace(/[()]/g, "").split(/[\s-]+/).filter(Boolean);
  const translated = parts.map((part) => lookupPhotoMeaning(part)).filter(Boolean);
  if (translated.length >= Math.min(parts.length, 2)) return translated.join(" + ");
  return "";
}

function photoMeaningOf(word, kind) {
  const key = cleanPhotoWord(word);
  const directMeaning = lookupPhotoMeaning(word);
  if (directMeaning) return directMeaning;
  if (kind === "phrase") {
    const fromParts = phraseFromParts(word);
    if (fromParts) return fromParts;
  }
  for (const [pattern, label] of photoSuffixRules) {
    if (pattern.test(key)) {
      const stem = key.replace(pattern, "");
      const stemMeaning = lookupPhotoMeaning(stem) || lookupPhotoMeaning(`${stem}e`) || lookupPhotoMeaning(`${stem}y`);
      if (stemMeaning) return `${stemMeaning}${label}`;
    }
  }
  return `TOEIC 高频词：${word}`;
}

function firstMeaning(meaning) {
  return String(meaning || "").split(/[；（(]/)[0].replace(/^TOEIC 高频词：/, "").trim();
}

const photoVerbWords = new Set(`
abandon accept accommodate accompany accomplish acknowledge acquire activate adapt add address adhere adjust administer admit adopt advertise advise advocate affect affix afford agree aim alleviate allocate allow alter amend analyze anticipate apologize appeal appear apply appoint appreciate approach approve arise arrange arrive assemble assess assign assist assume assure attach attain attempt attend attest attract audit authorize avoid award bargain begin belong bend bill blend boast bolster book boost bother brainstorm break brew browse budget calculate carry cater cause caution celebrate certify challenge change charge cite claim clarify close coincide collaborate collect combine commence commend commit communicate compare compel compensate compete compile complain complete comply concentrate conclude conduct confirm connect conserve consider consist construct consult consume contact contain contribute convert convey convince cooperate coordinate copy correct correspond cover create criticize customize decrease dedicate define delegate delete deliver demand demonstrate deny depart depend depict describe designate detach detect determine develop devise devote differ dine direct discontinue discourage dispatch display dispose distribute disturb diversify divide donate draft drain draw drill earn edit educate elect eliminate embark embrace emerge emphasize employ enable enclose encounter encourage endorse enforce engage enhance enjoy enlarge enroll ensure enter equip erase establish estimate evaluate examine exceed exclude execute exhibit expand expect expedite explain explore export expose express extend facilitate favor feed finalize finance finish fix fold follow forecast foster found freeze fulfill gain generate greet guarantee handle happen harvest hesitate highlight hire hold hone honor identify illustrate implement imply import impress improve include incorporate increase incur indicate infer influence inform initiate innovate inquire inspect inspire install instruct insure intend intensify interact interrupt introduce invent invest investigate invite involve itemize justify kneel lack launch lead lean lease leave lengthen limit load locate maintain make manage manufacture mark maximize measure meet memorize mention merge minimize misplace modernize modify motivate move negotiate nominate notify obtain offer operate organize overcome overlook oversee overwhelm own package page participate patronize pave pay polish portray pose possess post postpone pour practice praise predict prefer prepare prescribe present preserve prevent prioritize prohibit project promise promote proofread propose protect prove provide prune publicize publish purchase pursue qualify quote raise reach reassure recall receive recognize recommend reconstruct recount recruit recycle redeem reduce refer refill reflect reform refrain refrigerate refuel refund refurbish refuse regard register regulate rehearse reimburse reinforce reinvent reject release relieve relocate rely remain remark remind remodel remove renew renovate rent reopen reorganize repair repave replace replenish reply report represent reproduce repurpose require reschedule reserve reside resign resist resolve respect respond restart restock restore restrict restructure result resume resurface retain retire retrieve reuse reveal review revise revitalize revolutionize reward run sanitize satisfy scan scratch screen search secure seek select serve settle sew share sharpen shed ship showcase shuttle sign simplify sink skyrocket solicit solve specialize specify spill spoil sponsor spread stand start state stimulate stir stock store streamline strengthen stress strive structure struggle study submit subscribe substitute succeed suggest suit summarize supervise supplement supply suppose surcharge surpass surprise surround survey suspend sustain sweep tailor tap tear testify thrive throw tighten tow track transfer transform transport treat trigger trim trust try tune turn undertake unload unveil update upgrade urge utilize validate value vary verify voice volunteer vote waive warn water wear weigh wipe withdraw withstand work yield
`.trim().split(/\s+/));

const photoAdjectiveWords = new Set(`
able absolute acceptable accurate active additional adequate adjacent advanced adverse agreeable agricultural alike ambitious ample apparent appropriate artificial athletic authentic automated automatic automotive autonomous available avid beneficial breakable breathtaking bulky busy capable casual celebrated certain challenging cheerful civic comfortable compact compatible competent competitive comprehensive confident confidential convenient conventional correct costly cozy creative critical crowded crucial current customary daily dedicated defective definite demanding dependable dependent detailed different difficult diverse domestic due eager economic economical educational effective efficient eligible empty encouraging endangered enthusiastic entire environmental equivalent essential exact excellent exceptional excessive exclusive experienced experimental external extra extraordinary fabulous familiar famous fascinating faulty favorable feasible final financial fiscal flexible floral formal former forthcoming fortunate fragile free frequent frustrated frustrating functional furnished general generous groundbreaking harsh heavy historic historical hopeful huge identical immediate imperative impressive inaccurate inaugural inclement inexpensive inexperienced influential informal informative initial innovative intact integral intense intensive internal intuitive invalid invaluable inviting legal legendary likely limited lively local long-lasting long-term loyal lucrative luxurious mandatory managerial marginal magnificent medical metropolitan minimal misleading mobile modern modest motivated municipal national native nearby negotiable normal notable noteworthy noticeable numerous objective occasional occupied old-fashioned ongoing optional ordinary organic original outstanding overall overdue overwhelming partial particular permanent personal personalized persuasive pertinent pharmaceutical physical picturesque pleasant pleased plentiful popular postal potential practical precise predictable preliminary premier prestigious pretty previous primary prime principal prior privileged productive professional profitable progressive prohibitive prolific prominent promising promotional prompt proper proprietary prospective protective public qualified rapid rare reasonable recent rechargeable rectangular recyclable refundable regional regular related relative reluctant remarkable remote renewable renowned reputable residential resilient resistant respected respectful respective responsible restricted revolutionary rewarding rigorous robust rural satisfactory satisfied scattered scenic seasonal seasoned secure selective semiannual separate severe short-staffed short-term significant simple sizable skilled skillful sleeved slight smooth social solid sophisticated sought-after soundproof spacious spare specialized specific spectacular stable standard statistical steady steep stellar strategic straightforward strict striking stringent structural stunning sturdy substantial subsequent successful sufficient suitable superb superior supervisory supplemental synthetic talented tentative temporary thorough tight timely top-notch traditional transparent trusted typical unable unavailable uncomfortable unexpected unfamiliar unfortunate unlimited unoccupied upcoming up-to-date urban urgent valid valuable varied various vast viable vibrant virtual visible vital voluntary vulnerable willing worldwide worthy
`.trim().split(/\s+/));

const photoNounPhraseEndings = /(account|agency|area|balance|board|box|card|center|certificate|condition|department|device|equipment|fair|form|goods|industry|machine|materials|office|package|program|room|shop|store|supplies|system|tracker)$/;

const photoSpecialExamples = {
  "a bit of": ["The report needs a bit of revision before we send it.", "报告在发送前还需要一点修改。"],
  "a couple of": ["A couple of employees stayed late to finish the inventory.", "几名员工加班完成库存盘点。"],
  "a great deal of": ["The project required a great deal of time and careful planning.", "这个项目需要大量时间和仔细规划。"],
  "a number of": ["A number of clients asked for an updated price list.", "许多客户要求获得更新后的价格表。"],
  "a round of applause": ["The audience gave the speaker a round of applause after the presentation.", "演讲结束后，观众给了演讲者一阵掌声。"],
  "above all": ["Above all, the manager wants the report to be accurate.", "最重要的是，经理希望报告准确。"],
  "according to": ["According to the schedule, the shipment will arrive on Friday.", "根据日程安排，货物将在周五到达。"],
  "ahead of schedule": ["The construction team finished the lobby ahead of schedule.", "施工团队提前完成了大厅工程。"],
  "all sales are final": ["All sales are final, so customers cannot return discounted items.", "商品售出概不退换，所以顾客不能退回折扣商品。"],
  "along with": ["The invoice was sent along with the delivery receipt.", "发票和送货收据一起寄出了。"],
  "among other things": ["The orientation covers safety rules, among other things.", "入职培训涵盖安全规则等内容。"],
  "as a result": ["The flight was canceled, and as a result, the meeting was postponed.", "航班被取消，因此会议被推迟了。"],
  "as early as": ["Registration may begin as early as next Monday.", "报名最早可能在下周一开始。"],
  "as long as": ["You can use the conference room as long as you reserve it first.", "只要先预订，你就可以使用会议室。"],
  "as of": ["As of June 1, the new policy will apply to all employees.", "自 6 月 1 日起，新政策适用于所有员工。"],
  "as soon as": ["Please contact me as soon as the package arrives.", "包裹一到，请马上联系我。"],
  "at all times": ["Visitors must wear ID badges at all times.", "访客必须始终佩戴证件。"],
  "at least": ["Please arrive at least ten minutes before the interview.", "请至少在面试前十分钟到达。"],
  "at most": ["The repair should take at most two hours.", "维修最多需要两个小时。"],
  "at the latest": ["The proposal must be submitted by Friday at the latest.", "提案最迟必须在周五前提交。"],
  "at the moment": ["The manager is not available at the moment.", "经理此刻没有空。"],
  "at your earliest convenience": ["Please reply at your earliest convenience.", "请在方便时尽早回复。"],
  "because of": ["The store closed early because of the snowstorm.", "由于暴风雪，商店提前关门了。"],
  "behind schedule": ["The renovation is behind schedule because several materials arrived late.", "由于几种材料到货晚，翻修工程落后于计划。"],
  "can/could you do me a favor": ["Could you do me a favor and print these documents?", "你能帮我一个忙，把这些文件打印出来吗？"],
  "come across": ["I came across an error while reviewing the report.", "我在审查报告时偶然发现了一个错误。"],
  "comply with": ["All contractors must comply with the safety rules.", "所有承包商都必须遵守安全规定。"],
  "due to": ["The delivery was delayed due to heavy rain.", "由于大雨，配送延误了。"],
  "even if": ["The office will remain open even if the weather gets worse.", "即使天气变差，办公室也会继续开放。"],
  "even though": ["Even though the deadline was tight, the team finished the project.", "尽管截止日期很紧，团队还是完成了项目。"],
  "except for": ["The store is open every day except for Monday.", "这家店除了周一以外每天营业。"],
  "for instance": ["Several items are discounted, for instance, printers and office chairs.", "有几种商品打折，例如打印机和办公椅。"],
  "get in touch with": ["Please get in touch with the supplier before noon.", "请在中午前联系供应商。"],
  "get rid of": ["The office decided to get rid of outdated equipment.", "办公室决定处理掉过时设备。"],
  "given that": ["Given that sales increased, the company will hire more staff.", "鉴于销售额增加，公司将招聘更多员工。"],
  "go out of business": ["The small shop may go out of business if rent keeps rising.", "如果租金继续上涨，这家小店可能会停业。"],
  "in accordance with": ["The refund was issued in accordance with company policy.", "退款是按照公司政策发放的。"],
  "in addition": ["The hotel offers free breakfast; in addition, guests can use the gym.", "酒店提供免费早餐，此外客人还可以使用健身房。"],
  "in addition to": ["In addition to the invoice, please attach the receipt.", "除发票外，请附上收据。"],
  "in advance": ["Please reserve the meeting room in advance.", "请提前预订会议室。"],
  "in an effort to do": ["The company lowered prices in an effort to attract new customers.", "公司降低价格以吸引新客户。"],
  "in bulk": ["The restaurant buys paper cups in bulk.", "这家餐厅批量购买纸杯。"],
  "in case": ["Take an umbrella in case it rains.", "带把伞，以防下雨。"],
  "in charge of": ["Ms. Lee is in charge of the marketing budget.", "李女士负责市场预算。"],
  "in contrast": ["The first proposal is expensive; in contrast, the second one is affordable.", "第一份提案很贵，相比之下第二份比较实惠。"],
  "in detail": ["The supervisor explained the new procedure in detail.", "主管详细解释了新流程。"],
  "in fact": ["The hotel is not far from the station; in fact, it is only a five-minute walk.", "酒店离车站不远，事实上步行只要五分钟。"],
  "in favor of": ["Most employees were in favor of the new schedule.", "大多数员工支持新的日程安排。"],
  "in general": ["In general, online orders are processed within two days.", "一般来说，在线订单会在两天内处理。"],
  "in light of": ["In light of the delay, the deadline was extended.", "鉴于延误，截止日期被延长了。"],
  "in order": ["Please keep the files in order.", "请把文件按顺序放好。"],
  "in particular": ["The manager praised the sales team in particular.", "经理特别表扬了销售团队。"],
  "in person": ["Applicants must attend the interview in person.", "申请人必须亲自参加面试。"],
  "in place of": ["We used a video call in place of an in-person meeting.", "我们用视频会议代替了现场会议。"],
  "in progress": ["The website update is still in progress.", "网站更新仍在进行中。"],
  "in return": ["The client gave feedback, and in return, we offered a discount.", "客户提供了反馈，作为回报，我们给了折扣。"],
  "in short": ["In short, the project was completed successfully.", "简而言之，项目顺利完成了。"],
  "in spite of": ["In spite of the rain, many guests attended the event.", "尽管下雨，仍有许多客人参加了活动。"],
  "in stock": ["The printer is in stock and can be shipped today.", "打印机有库存，今天可以发货。"],
  "in the event of": ["In the event of a power outage, use the emergency exit.", "如果停电，请使用紧急出口。"],
  "in the event that": ["In the event that your flight is delayed, call the hotel.", "如果航班延误，请致电酒店。"],
  "in the long run": ["Training new staff saves time in the long run.", "从长远来看，培训新员工会节省时间。"],
  "in the meantime": ["The repair will take an hour; in the meantime, please use another printer.", "维修需要一小时；与此同时，请使用另一台打印机。"],
  "in the process of": ["The company is in the process of updating its website.", "公司正在更新网站。"],
  "in time for": ["The brochures arrived in time for the trade show.", "宣传册及时赶上了贸易展。"],
  "in transit": ["The package is in transit and should arrive tomorrow.", "包裹正在运输中，应该明天到达。"],
  "in writing": ["Please submit your request in writing.", "请以书面形式提交请求。"],
  "instead of": ["We sent an email instead of making a phone call.", "我们发了邮件，而不是打电话。"],
  "just in case": ["Bring an extra copy of the report just in case.", "带一份额外的报告，以防万一。"],
  "no later than": ["Please arrive no later than 8:30.", "请不迟于 8 点 30 分到达。"],
  "no longer": ["The old coupon is no longer valid.", "旧优惠券不再有效。"],
  "not only x but (also) y": ["The seminar covers not only marketing but also customer service.", "研讨会不仅涵盖市场营销，也涵盖客户服务。"],
  "on a budget": ["The team planned the event on a budget.", "团队在预算有限的情况下策划了活动。"],
  "on back order": ["The replacement parts are on back order.", "替换零件正在延期交货中。"],
  "on behalf of": ["I am calling on behalf of Mr. Brown.", "我代表 Brown 先生打电话。"],
  "on board": ["A new engineer will come on board next week.", "一名新工程师下周将加入团队。"],
  "on duty": ["A security guard is on duty at the front entrance.", "前门有一名保安值班。"],
  "on hand": ["We have extra chairs on hand for visitors.", "我们有额外椅子供访客使用。"],
  "on the contrary": ["The product is not outdated; on the contrary, it is very popular.", "这个产品并不过时；相反，它很受欢迎。"],
  "on the other hand": ["The train is cheaper; on the other hand, the flight is faster.", "火车更便宜；另一方面，飞机更快。"],
  "on the premises": ["Smoking is not allowed on the premises.", "场所内禁止吸烟。"],
  "on time": ["The shipment arrived on time.", "货物准时到达。"],
  "out of order": ["The elevator is out of order today.", "电梯今天故障了。"],
  "out of paper": ["The printer is out of paper.", "打印机没纸了。"],
  "out of stock": ["The blue jacket is out of stock.", "蓝色夹克缺货了。"],
  "out of town": ["The director is out of town this week.", "主管本周不在城里。"],
  "provided that": ["You may enter the building provided that you show your ID.", "只要出示证件，你就可以进入大楼。"],
  "reach out to": ["The recruiter will reach out to qualified applicants.", "招聘人员会联系合格的申请人。"],
  "regardless of": ["The store offers free delivery regardless of order size.", "无论订单大小，这家店都提供免费配送。"],
  "right away": ["Please send the revised file right away.", "请马上发送修改后的文件。"],
  "run into": ["We may run into delays during the renovation.", "翻修期间我们可能会遇到延误。"],
  "should you have any questions": ["Should you have any questions, please contact customer service.", "如果您有任何问题，请联系客户服务。"],
  "side by side": ["The two products were displayed side by side.", "这两件产品并排展示。"],
  "sign up for": ["Employees can sign up for the training online.", "员工可以在线报名参加培训。"],
  "so far": ["So far, the new system has worked well.", "到目前为止，新系统运行良好。"],
  "so that": ["We left early so that we could arrive on time.", "我们早早出发，以便准时到达。"],
  "spread out": ["The brochures were spread out on the table.", "宣传册摊放在桌子上。"],
  "stand out": ["Her clear presentation helped her stand out.", "她清晰的演示让她脱颖而出。"],
  "stay tuned": ["Stay tuned for more details about the product launch.", "请继续关注产品发布的更多细节。"],
  "take advantage of": ["Guests should take advantage of the free shuttle service.", "客人应该利用免费的班车服务。"],
  "take effect": ["The new policy will take effect next month.", "新政策将于下个月生效。"],
  "take notes": ["Please take notes during the safety briefing.", "请在安全说明会上记笔记。"],
  "take on": ["The firm will take on three new interns this summer.", "这家公司今年夏天将接收三名新实习生。"],
  "take part in": ["All staff members are encouraged to take part in the survey.", "鼓励所有员工参加调查。"],
  "take place": ["The conference will take place in July.", "会议将在七月举行。"],
  "take turns": ["Employees take turns answering calls at the front desk.", "员工轮流在前台接电话。"],
  "that means": ["The road is closed; that means we need another route.", "道路封闭了；这意味着我们需要换一条路线。"],
  "therefore": ["The order was damaged; therefore, we requested a refund.", "订单受损了，因此我们要求退款。"],
  "to this end": ["The company improved its website; to this end, it hired a new designer.", "公司改进网站；为此，它聘请了一名新设计师。"],
  "turn down": ["The client decided to turn down the offer.", "客户决定拒绝这个报价。"],
  "turn in": ["Please turn in your expense report by Friday.", "请在周五前提交费用报告。"],
  "turn x into y": ["The new software can turn raw data into clear charts.", "新软件可以把原始数据变成清晰图表。"],
  "up and running": ["The new printer is up and running now.", "新打印机现在已经正常运行。"],
  "up to": ["The meeting room can hold up to twenty people.", "这间会议室最多可容纳二十人。"],
  "used to do": ["The office used to close at six.", "这间办公室过去六点关门。"],
  "welcome aboard": ["Welcome aboard; we are glad to have you on the team.", "欢迎加入；我们很高兴你加入团队。"],
  "when it comes to": ["When it comes to customer service, quick replies are important.", "谈到客户服务，快速回复很重要。"],
  "within walking distance": ["The hotel is within walking distance of the station.", "酒店离车站在步行距离内。"]
};

const photoSpecialWordExamples = {
  abandon: ["The company decided to abandon the project after costs increased.", "成本增加后，公司决定放弃这个项目。"],
  able: ["The team was able to finish the report before noon.", "团队能够在中午前完成报告。"],
  available: ["The meeting room is available after 3 p.m.", "会议室下午三点后可用。"],
  deadline: ["The team worked late to meet the deadline.", "团队加班以赶上截止日期。"],
  eligible: ["Full-time employees are eligible for the training program.", "全职员工有资格参加培训项目。"],
  invoice: ["Please send the invoice to the accounting department.", "请把发票发送给会计部门。"],
  receipt: ["The customer kept the receipt for reimbursement.", "客户保留了收据以便报销。"],
  budget: ["The manager reviewed the budget before approving the purchase.", "经理在批准采购前审查了预算。"],
  schedule: ["The assistant updated the schedule after the meeting.", "助理在会议后更新了日程。"],
  proposal: ["The client accepted the proposal after a short discussion.", "客户经过简短讨论后接受了提案。"],
  reservation: ["The hotel confirmed the reservation by email.", "酒店通过电子邮件确认了预订。"],
  shipment: ["The shipment arrived at the warehouse this morning.", "货物今天上午到达仓库。"],
  equipment: ["The technician inspected the equipment before the demonstration.", "技术员在演示前检查了设备。"]
};

function photoPhraseExampleOf(word, meaning, index) {
  const key = cleanPhotoWord(word);
  if (photoSpecialExamples[key]) {
    const [example, translation] = photoSpecialExamples[key];
    return { example, translation, phrase: word };
  }
  const cn = firstMeaning(meaning);
  if (key.includes("department")) return { example: `The ${word} reviewed the invoice this morning.`, translation: `${cn}今天上午审查了发票。`, phrase: word };
  if (key.includes("store") || key.includes("agency") || key.includes("office") || key.includes("center") || key.includes("room")) {
    return { example: `The client visited the ${word} before noon.`, translation: `客户在中午前去了${cn}。`, phrase: word };
  }
  if (key.includes("equipment") || key.includes("supplies") || key.includes("materials") || key.includes("goods")) {
    return { example: `The warehouse ordered new ${word} for the staff.`, translation: `仓库为员工订购了新的${cn}。`, phrase: word };
  }
  if (/^(a|an) .+ of$/.test(key)) return { example: `The project required ${word} careful planning.`, translation: `这个项目需要${cn}仔细规划。`, phrase: word };
  if (key.startsWith("in ") || key.startsWith("on ") || key.startsWith("at ") || key.startsWith("for ")) {
    return { example: `The team completed the request ${word}.`, translation: `团队${cn}完成了请求。`, phrase: word };
  }
  const templates = [
    [`The manager checked the ${word} before approving the order.`, `经理在批准订单前检查了${cn}。`],
    [`The company updated its ${word} after the quarterly review.`, `公司在季度审查后更新了${cn}。`],
    [`The assistant prepared the ${word} for the afternoon meeting.`, `助理为下午的会议准备了${cn}。`],
    [`Several employees asked about the ${word} during orientation.`, `几名员工在入职培训期间询问了${cn}。`],
    [`The report included the ${word} in the final section.`, `报告在最后一部分包含了${cn}。`],
    [`The supervisor discussed the ${word} with the new staff.`, `主管和新员工讨论了${cn}。`],
    [`The vendor delivered the ${word} earlier than expected.`, `供应商比预期更早交付了${cn}。`],
    [`The customer requested more information about the ${word}.`, `客户要求了解更多关于${cn}的信息。`]
  ];
  const [example, translation] = templates[index % templates.length];
  return { example, translation, phrase: word };
}

function photoWordRole(word, meaning) {
  const key = cleanPhotoWord(word);
  if (photoFunctionWordPosMap[key]) return photoFunctionWordPosMap[key];
  if (key.endsWith("ly") && !["assembly", "delivery", "family", "faculty", "facility", "jewelry", "supply"].includes(key)) return "adverb";
  if (photoAdjectiveWords.has(key) || /(able|ible|al|ant|ary|ed|ent|ful|ic|ical|ive|less|ous|y)$/.test(key)) return "adjective";
  if (photoVerbWords.has(key)) return "verb";
  return "noun";
}

const photoFunctionWordPosMap = {
  a: "determiner", an: "determiner", the: "determiner", all: "determiner", another: "determiner", any: "determiner",
  each: "determiner", every: "determiner", few: "determiner", many: "determiner", most: "determiner", much: "determiner",
  no: "determiner", several: "determiner", some: "determiner", this: "determiner", that: "determiner",
  he: "pronoun", her: "pronoun", i: "pronoun", it: "pronoun", me: "pronoun", she: "pronoun", them: "pronoun",
  they: "pronoun", us: "pronoun", we: "pronoun", you: "pronoun",
  above: "preposition", across: "preposition", after: "preposition", against: "preposition", along: "preposition",
  among: "preposition", at: "preposition", before: "preposition", behind: "preposition", between: "preposition",
  by: "preposition", during: "preposition", for: "preposition", from: "preposition", in: "preposition",
  into: "preposition", near: "preposition", of: "preposition", on: "preposition", over: "preposition",
  through: "preposition", to: "preposition", toward: "preposition", under: "preposition", via: "preposition",
  within: "preposition", without: "preposition",
  although: "conjunction", and: "conjunction", as: "conjunction", because: "conjunction", but: "conjunction",
  if: "conjunction", nor: "conjunction", once: "conjunction", or: "conjunction", since: "conjunction",
  than: "conjunction", though: "conjunction", unless: "conjunction", until: "conjunction", when: "conjunction",
  whenever: "conjunction", whereas: "conjunction", whether: "conjunction", while: "conjunction",
  am: "beVerb", are: "beVerb", be: "beVerb", been: "beVerb", being: "beVerb", is: "beVerb", was: "beVerb", were: "beVerb",
  did: "auxiliary", do: "auxiliary", does: "auxiliary", done: "auxiliary", had: "auxiliary", has: "auxiliary", have: "auxiliary",
  please: "interjection",
  again: "adverb", almost: "adverb", also: "adverb", always: "adverb", away: "adverb", down: "adverb",
  either: "adverb", enough: "adverb", even: "adverb", here: "adverb", however: "adverb", just: "adverb",
  never: "adverb", not: "adverb", now: "adverb", only: "adverb", out: "adverb", rather: "adverb",
  so: "adverb", soon: "adverb", still: "adverb", then: "adverb", there: "adverb", too: "adverb",
  can: "modal", could: "modal", may: "modal", might: "modal", must: "modal", should: "modal", will: "modal", would: "modal"
};

const photoRoleLabels = {
  noun: "名词",
  verb: "动词",
  adjective: "形容词",
  adverb: "副词",
  preposition: "介词",
  conjunction: "连词",
  determiner: "限定词",
  pronoun: "代词",
  modal: "情态动词",
  auxiliary: "助动词",
  beVerb: "be 动词",
  interjection: "感叹词/礼貌用语"
};

function phrasePartOfSpeech(word) {
  const key = cleanPhotoWord(word);
  if (/^(a|an|the)\s+/.test(key) || photoNounPhraseEndings.test(key)) return "名词短语";
  if (/^(be|can|could|have|has|make|take|used|need|report|sign|turn|give|get|go|run|reach)\b/.test(key)) return "动词短语";
  if (/^(above|according|along|as|at|because|before|by|due|for|in|instead|on|out|owing|regardless|within)\b/.test(key)) return "介词/连接短语";
  return "短语/固定搭配";
}

function partOfSpeechOf(item) {
  if (!item) return "";
  if (item.pos) return item.pos;
  if (item.isGrammarPairCard) return "固定搭配对比";
  const word = item.phrase || item.word || "";
  if (item.kind === "phrase" || /\s|[/.!?]/.test(word)) return phrasePartOfSpeech(word);
  const role = photoWordRole(word, item.meaning);
  return photoRoleLabels[role] || "名词";
}

function photoWordExampleOf(word, meaning, index) {
  const key = cleanPhotoWord(word);
  if (photoSpecialWordExamples[key]) {
    const [example, translation] = photoSpecialWordExamples[key];
    return { example, translation, phrase: word };
  }
  const cn = firstMeaning(meaning);
  const role = photoWordRole(word, meaning);
  if (role === "adverb") {
    const templates = [
      [`The team responded ${word} to the client's request.`, `团队${cn}回复了客户请求。`],
      [`The assistant checked the figures ${word} before sending the report.`, `助理在发送报告前${cn}核对了数字。`],
      [`The package was delivered ${word} despite the bad weather.`, `尽管天气不好，包裹还是${cn}送达了。`],
      [`The manager explained the policy ${word} during orientation.`, `经理在入职培训中${cn}解释了政策。`]
    ];
    const [example, translation] = templates[index % templates.length];
    return { example, translation, phrase: word };
  }
  if (role === "adjective") {
    const article = /^[aeiou]/i.test(word) ? "an" : "a";
    const templates = [
      [`The company introduced ${article} ${word} policy for new employees.`, `公司为新员工推出了一项${cn}政策。`],
      [`The client asked for ${article} ${word} solution to the delivery problem.`, `客户要求一个${cn}配送问题的解决方案。`],
      [`The manager chose ${article} ${word} location for the workshop.`, `经理为工作坊选择了一个${cn}地点。`],
      [`The report describes ${article} ${word} change in customer demand.`, `报告描述了客户需求中的一个${cn}变化。`]
    ];
    const [example, translation] = templates[index % templates.length];
    return { example, translation, phrase: word };
  }
  if (role === "verb") {
    const templates = [
      [`The manager decided to ${word} the plan before Friday.`, `经理决定在周五前${cn}这个计划。`],
      [`The team will ${word} the request after reviewing the budget.`, `团队会在审查预算后${cn}这个请求。`],
      [`The supervisor asked us to ${word} the document carefully.`, `主管要求我们仔细${cn}这份文件。`],
      [`The company hopes to ${word} the service next month.`, `公司希望下个月${cn}这项服务。`]
    ];
    const [example, translation] = templates[index % templates.length];
    return { example, translation, phrase: word };
  }
  const templates = [
    [`The manager asked about the ${word} during the meeting.`, `经理在会议期间询问了${cn}。`],
    [`The report included details about the ${word}.`, `报告包含了关于${cn}的细节。`],
    [`The team checked the ${word} before making a decision.`, `团队在做决定前检查了${cn}。`],
    [`The client requested more information about the ${word}.`, `客户要求了解更多关于${cn}的信息。`],
    [`The assistant added a note about the ${word} to the file.`, `助理在文件中添加了一条关于${cn}的备注。`],
    [`The supervisor asked about the ${word} during the inspection.`, `主管在检查期间询问了${cn}。`]
  ];
  const [example, translation] = templates[index % templates.length];
  return { example, translation, phrase: word };
}

function photoExampleOf(word, kind, meaning, index) {
  return kind === "phrase" ? photoPhraseExampleOf(word, meaning, index) : photoWordExampleOf(word, meaning, index);
}

const photoIndexWords = photoIndexRaw.trim().split(/\n+/).map((raw) => raw.trim()).filter(Boolean).map((word, index) => {
  const kind = /\s|[()/.!?]/.test(word) ? "phrase" : "word";
  const meaning = photoMeaningOf(word, kind);
  const example = photoExampleOf(word, kind, meaning, index);
  return {
    word,
    meaning,
    phrase: example.phrase,
    example: example.example,
    translation: example.translation,
    note: `来自你发的单词书索引照片。TOEIC 高频${kind === "phrase" ? "短语" : "单词"}：${word}。`,
    tag: "照片词库",
    category: "photo",
    kind,
    pos: kind === "phrase" ? phrasePartOfSpeech(word) : (photoRoleLabels[photoWordRole(word, meaning)] || "名词"),
    sourceOrder: index
  };
});

const questions = {
  listening: [{ q: "Where will the meeting be held?", options: ["In Conference Room B.", "At three o'clock.", "Because the manager is away."], answer: 0, explain: "Where 询问地点，答案应是地点。" }],
  grammar: [{ q: "All employees are required ___ their ID badges.", options: ["wear", "wearing", "to wear", "worn"], answer: 2, explain: "be required to do 是固定搭配。" }],
  reading: [{ q: "What is the purpose of the notice?", passage: "Notice: The cafeteria will be closed for maintenance from June 18 to June 20.", options: ["To announce a temporary closure.", "To invite employees to a dinner.", "To introduce a new menu."], answer: 0, explain: "notice 说明餐厅临时关闭。" }]
};

function readJsonStorage(key, fallback = {}) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function normalizeState(data) {
  const next = data && typeof data === "object" ? data : {};
  next.tasks = next.tasks && typeof next.tasks === "object" ? next.tasks : {};
  next.known = Array.isArray(next.known) ? next.known : [];
  next.unknown = Array.isArray(next.unknown) ? next.unknown : [];
  next.wordMistakes = Array.isArray(next.wordMistakes) ? next.wordMistakes : [];
  next.seenWords = Array.isArray(next.seenWords) ? next.seenWords : [];
  next.customVocab = Array.isArray(next.customVocab) ? next.customVocab : [];
  next.mistakes = Array.isArray(next.mistakes) ? next.mistakes.filter((m) => m.type !== "vocab") : [];
  next.scores = Array.isArray(next.scores) ? next.scores : [];
  next.studyDays = Array.isArray(next.studyDays) ? next.studyDays : [];
  next.wordbookIndex = Number.isFinite(Number(next.wordbookIndex)) ? Number(next.wordbookIndex) : 0;
  next.wordbookFilter = next.wordbookFilter || "all";
  next.wordbookLastKey = next.wordbookLastKey || "";
  next.wordbookLastByFilter = next.wordbookLastByFilter && typeof next.wordbookLastByFilter === "object" ? next.wordbookLastByFilter : {};
  if (next.wordbookLastKey && !next.wordbookLastByFilter[next.wordbookFilter]) next.wordbookLastByFilter[next.wordbookFilter] = next.wordbookLastKey;
  return next;
}

let state = normalizeState(readJsonStorage(storeKey, {}));
let cloudSync = readJsonStorage(cloudSyncKey, {});
cloudSync.auto ??= true;

let vocabIndex = 0;
let vocabFilter = "all";
let wordbookFilter = state.wordbookFilter;
let wordbookIndex = state.wordbookIndex;
let wordbookSearch = "";
let skipRememberWordbookItem = false;
let wordTrainingMode = "enToCn";
let wordTrainingKind = "word";
let currentWordQuestion = null;
let currentType = "listening";
let questionIndex = 0;
let timerId = null;
let remainingSeconds = 120 * 60;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const today = () => new Date().toISOString().slice(0, 10);
const shuffle = (items) => items.slice().sort(() => Math.random() - 0.5);
const wordKey = (item) => `${item.kind || "word"}:${item.word}`;
const grammarPairGroupKey = (groupWord) => `phrase:${groupWord}`;

function persistState() {
  localStorage.setItem(storeKey, JSON.stringify(state));
}

function save() {
  persistState();
  renderStats();
  queueCloudUpload();
}

let cloudUploadTimer = null;
let isCloudSyncing = false;

function persistCloudSync() {
  localStorage.setItem(cloudSyncKey, JSON.stringify(cloudSync));
}

function hasCloudConfig() {
  return Boolean((cloudSync.token || "").trim() && (cloudSync.gistId || "").trim());
}

function setCloudStatus(message, tone = "") {
  const status = $("#cloud-status");
  if (!status) return;
  status.textContent = message;
  status.className = `cloud-status ${tone}`.trim();
}

function updateCloudInputs() {
  if (!$("#cloud-token")) return;
  $("#cloud-token").value = cloudSync.token || "";
  $("#cloud-gist-id").value = cloudSync.gistId || "";
  $("#cloud-auto").checked = cloudSync.auto !== false;
  const gist = cloudSync.gistId ? `Gist: ${cloudSync.gistId}` : "未创建云端档案";
  const saved = cloudSync.lastSavedAt ? `，上次上传：${cloudSync.lastSavedAt}` : "";
  setCloudStatus(`${gist}${saved}`, cloudSync.gistId ? "ok" : "");
}

function saveCloudSettingsFromInputs() {
  cloudSync.token = ($("#cloud-token")?.value || "").trim();
  cloudSync.gistId = ($("#cloud-gist-id")?.value || "").trim();
  cloudSync.auto = Boolean($("#cloud-auto")?.checked);
  persistCloudSync();
  updateCloudInputs();
}

function cloudPayload() {
  return {
    app: "toeic-700-training",
    version: 1,
    updatedAt: new Date().toISOString(),
    state
  };
}

function hasStudyProgress() {
  return Boolean(
    Object.keys(state.tasks || {}).length
    || state.known.length
    || state.wordMistakes.length
    || state.seenWords.length
    || state.customVocab.length
    || state.mistakes.length
    || state.scores.length
    || state.studyDays.length
  );
}

async function githubGistRequest(path, options = {}) {
  const token = (cloudSync.token || "").trim();
  if (!token) throw new Error("请先填写 GitHub Token。");
  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers || {})
    }
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `GitHub 请求失败：${response.status}`);
  }
  return response.status === 204 ? null : response.json();
}

async function findCloudSave() {
  const gists = await githubGistRequest("/gists?per_page=100");
  return (Array.isArray(gists) ? gists : []).find((gist) => gist.files && gist.files[cloudFileName]);
}

async function createCloudSave() {
  saveCloudSettingsFromInputs();
  setCloudStatus("正在创建云端档案...");
  try {
    const gist = await githubGistRequest("/gists", {
      method: "POST",
      body: JSON.stringify({
        description: "TOEIC 700 learning progress",
        public: false,
        files: {
          [cloudFileName]: {
            content: JSON.stringify(cloudPayload(), null, 2)
          }
        }
      })
    });
    cloudSync.gistId = gist.id;
    cloudSync.lastSavedAt = new Date().toLocaleString();
    persistCloudSync();
    updateCloudInputs();
    setCloudStatus("云端档案已创建，并已上传当前进度。", "ok");
  } catch (error) {
    setCloudStatus(error.message || "创建失败。", "error");
  }
}

async function connectCloudSave() {
  saveCloudSettingsFromInputs();
  if (!(cloudSync.token || "").trim()) {
    setCloudStatus("请先填写 GitHub Token。", "error");
    return;
  }
  setCloudStatus("正在连接云端...");
  try {
    if (!cloudSync.gistId) {
      const existing = await findCloudSave();
      if (existing?.id) {
        cloudSync.gistId = existing.id;
        persistCloudSync();
        updateCloudInputs();
        if (!hasStudyProgress()) {
          await downloadCloudSave(false);
          return;
        }
        setCloudStatus("已找到云端档案。需要时点“恢复进度”或“上传进度”。", "ok");
        return;
      }
      await createCloudSave();
      return;
    }
    await githubGistRequest(`/gists/${encodeURIComponent(cloudSync.gistId)}`);
    setCloudStatus("云端已连接。", "ok");
  } catch (error) {
    setCloudStatus(error.message || "连接失败。", "error");
  }
}

async function uploadCloudSave(manual = true) {
  if (!hasCloudConfig() || isCloudSyncing) {
    if (manual && !hasCloudConfig()) setCloudStatus("请先填写 Token，或点击连接云端。", "error");
    return;
  }
  isCloudSyncing = true;
  if (manual) setCloudStatus("正在上传进度...");
  try {
    await githubGistRequest(`/gists/${encodeURIComponent(cloudSync.gistId)}`, {
      method: "PATCH",
      body: JSON.stringify({
        files: {
          [cloudFileName]: {
            content: JSON.stringify(cloudPayload(), null, 2)
          }
        }
      })
    });
    cloudSync.lastSavedAt = new Date().toLocaleString();
    persistCloudSync();
    setCloudStatus(`进度已上传：${cloudSync.lastSavedAt}`, "ok");
  } catch (error) {
    if (manual) setCloudStatus(error.message || "上传失败。", "error");
  } finally {
    isCloudSyncing = false;
  }
}

async function downloadCloudSave(confirmFirst = true) {
  saveCloudSettingsFromInputs();
  if (!hasCloudConfig()) {
    setCloudStatus("请先填写 Token 和 Gist ID。", "error");
    return;
  }
  if (confirmFirst && !confirm("恢复云端进度会覆盖当前浏览器里的进度，确定继续吗？")) return;
  setCloudStatus("正在恢复云端进度...");
  try {
    const gist = await githubGistRequest(`/gists/${encodeURIComponent(cloudSync.gistId)}`);
    const file = gist.files?.[cloudFileName] || Object.values(gist.files || {}).find((item) => item.filename === cloudFileName);
    if (!file?.content) throw new Error("云端档案里没有找到进度文件。");
    const payload = JSON.parse(file.content);
    state = normalizeState(payload.state || payload);
    persistState();
    wordbookFilter = state.wordbookFilter;
    wordbookIndex = state.wordbookIndex;
    $("#wordbook-filter").value = wordbookFilter;
    renderWordbook();
    renderVocab();
    renderStats();
    setCloudStatus("云端进度已恢复。", "ok");
  } catch (error) {
    setCloudStatus(error.message || "恢复失败。", "error");
  }
}

function queueCloudUpload() {
  if (!hasCloudConfig() || cloudSync.auto === false) return;
  clearTimeout(cloudUploadTimer);
  cloudUploadTimer = setTimeout(() => {
    uploadCloudSave(false);
  }, 2500);
}

function speakEnglish(text) {
  if (!("speechSynthesis" in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.9;
  const voices = speechSynthesis.getVoices ? speechSynthesis.getVoices() : [];
  const americanVoice = voices.find((voice) => voice.lang === "en-US")
    || voices.find((voice) => /^en-US\b/i.test(voice.lang))
    || voices.find((voice) => /United States|US|American/i.test(`${voice.name} ${voice.lang}`));
  if (americanVoice) utterance.voice = americanVoice;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

function saveWordbookPosition() {
  state.wordbookIndex = wordbookIndex;
  state.wordbookFilter = wordbookFilter;
  persistState();
  queueCloudUpload();
}

function rememberWordbookItem(item) {
  if (!item) return;
  const key = wordKey(item).toLowerCase();
  const scope = wordbookScopeKey();
  state.wordbookLastByFilter = state.wordbookLastByFilter || {};
  if (state.wordbookLastByFilter[scope] === key) return;
  state.wordbookLastByFilter[scope] = key;
  state.wordbookLastKey = key;
  persistState();
  queueCloudUpload();
}

function wordbookScopeKey() {
  return wordbookFilter || "all";
}

function wordbookScopeLabel() {
  return $("#wordbook-filter")?.selectedOptions?.[0]?.textContent || "当前分类";
}

function findWordbookIndexByKey(list, key) {
  const normalizedKey = String(key || "").toLowerCase();
  if (!normalizedKey) return -1;
  return list.findIndex((item) => wordKey(item).toLowerCase() === normalizedKey);
}

function normalizeEntry(item) {
  const kind = item.kind || (String(item.word).includes(" ") ? "phrase" : "word");
  return { kind, ...item };
}

function dedupeVocab(entries) {
  const seen = new Set();
  return entries.map(normalizeEntry).filter((item) => {
    const key = wordKey(item).toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function allVocab() {
  return dedupeVocab([...state.customVocab, ...generatedWords, ...generatedPhrases, ...grammarPhrases, ...grammarPairEntries, ...photoIndexWords]);
}

function hasPendingMeaning(item) {
  return item.meaning === "待补充释义";
}

function isSeenForTraining(item, seen) {
  if (seen.has(wordKey(item))) return true;
  if (item.category === "grammar" && item.groupWord) {
    return seen.has(grammarPairGroupKey(item.groupWord));
  }
  return false;
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

function renderClickableExample(example) {
  return String(example || "").split(/(\s+)/).map((part) => {
    if (/^\s+$/.test(part)) return part;
    const clean = part.replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, "");
    if (!clean) return escapeHtml(part);
    return `<button class="example-token" data-example-word="${escapeHtml(clean.toLowerCase())}">${escapeHtml(part)}</button>`;
  }).join("");
}

const exampleWordTranslations = {
  above: "在...上方；超过；高于", across: "穿过；遍及", again: "再次", another: "另一个", at: "在；于",
  but: "但是", can: "能够；可以", could: "能够；可以；可能", each: "每个", every: "每个；所有的",
  few: "少数；几个", first: "第一；首先", has: "有；已经", have: "有；已经", he: "他", her: "她的；她",
  i: "我", it: "它", many: "许多", may: "可以；可能", not: "不", of: "...的；属于", our: "我们的",
  over: "超过；在...上方", p: "下午（p.m. 的一部分）", m: "分钟/上午下午标记的一部分", please: "请",
  she: "她", that: "那个；那；引导从句", their: "他们的", them: "他们；它们", they: "他们；它们",
  this: "这个", us: "我们", we: "我们", will: "将要；会", would: "将会；愿意", you: "你；你们",
  want: "想要；希望", wants: "想要；希望",
  about: "关于", access: "使用权；访问", accounting: "会计；财务", accurately: "准确地", added: "添加了", affected: "影响了",
  after: "在...之后", airport: "机场", all: "所有", allows: "允许", an: "一个", and: "和", answer: "回答", answering: "回答",
  appeared: "出现了", application: "申请；申请表", applied: "申请了", approval: "批准", approving: "批准", asked: "询问；要求",
  assistant: "助理", attach: "附上", attached: "附上的", attending: "参加", audit: "审计", available: "可用的；有空的",
  bad: "坏的；恶劣的", badges: "胸牌；门禁牌", be: "是；成为", because: "因为", before: "在...之前", began: "开始了",
  begin: "开始", briefing: "简报；说明会", by: "在...之前；通过", call: "电话；通话", carefully: "仔细地", carter: "Carter（人名）",
  changed: "改变了", check: "检查", checked: "检查了", checking: "检查", chose: "选择了", clerk: "职员；文员", client: "客户",
  clients: "客户", closing: "关闭", compared: "比较了", company: "公司", complete: "完成", completed: "完成了", confusion: "混乱",
  contact: "联系", contacting: "联系", coordinator: "协调员", copy: "副本", customers: "客户", date: "日期", decided: "决定了",
  delay: "延误", delayed: "延误了", deliver: "递送", delivery: "配送；交付", demonstration: "演示", details: "详细信息",
  digital: "数字的；电子的", director: "主管；董事", discussed: "讨论了", do: "做", during: "在...期间", easier: "更容易的",
  early: "早地；提前", efficiently: "高效地", email: "电子邮件", employees: "员工", enables: "使能够", end: "结束；末尾",
  entrance: "入口", explained: "解释了", explaining: "解释", export: "导出", form: "表格", found: "找到了", folder: "文件夹",
  for: "为了；给", from: "从；来自", future: "未来的", going: "去", guests: "客人", had: "有；遇到", helped: "帮助了",
  hire: "招聘", hiring: "招聘", hotel: "酒店", how: "如何", if: "是否", in: "在...里；在...期间", includes: "包括",
  information: "信息", inspection: "检查", installing: "安装", international: "国际的", into: "进入；放入", invoice: "发票",
  is: "是", it: "它", july: "七月", kept: "保留了", label: "标签", labeled: "贴标签了", last: "上一个；最后的",
  late: "晚；迟", launch: "发布", learned: "学会了", lee: "Lee（人名）", lobby: "大厅", manager: "经理", managing: "管理",
  matched: "匹配了", meeting: "会议", mentioned: "提到了", message: "消息", monthly: "每月的", more: "更多", morning: "上午",
  ms: "女士", needed: "需要", new: "新的", noon: "中午", note: "说明；备注", notes: "笔记；说明", now: "现在",
  objected: "反对了", office: "办公室", online: "在线的", opening: "开业；打开", order: "订单", organizer: "组织者",
  participants: "参与者", placed: "放置了", portal: "门户网站", postpone: "推迟", preparing: "准备", price: "价格",
  printed: "打印了", prior: "之前的", problem: "问题", process: "处理", product: "产品", project: "项目", proposal: "提案",
  questions: "问题", quarterly: "季度的", received: "收到了", receiving: "收到", records: "记录", reduce: "减少；降低",
  reducing: "减少", reference: "参考", refund: "退款", refunds: "退款", register: "报名；注册", residents: "住户",
  reserve: "预留；预订", reviewing: "审阅", room: "房间", sales: "销售", saved: "保存了", schedule: "日程；安排",
  scheduling: "安排日程", send: "发送", sent: "发送了", service: "服务", session: "课程；会议", several: "几个",
  she: "她", shipping: "发货", shortly: "不久", should: "应该", sign: "签署", software: "软件", some: "一些",
  soon: "很快", staff: "员工", stayed: "停留；留下", still: "仍然", store: "商店", submit: "提交", supplier: "供应商",
  team: "团队", technician: "技术员", the: "定冠词：这个/那个", their: "他们的", they: "他们", this: "这个", time: "时间",
  to: "介词/不定式标记", track: "追踪", trainees: "培训生", training: "培训", travel: "旅行；出差", traveler: "旅客",
  users: "用户", using: "使用", vendor: "供应商", verified: "核实了", video: "视频", visitor: "访客", visitors: "访客",
  waste: "浪费", weather: "天气", website: "网站", when: "何时", whether: "是否", while: "当...时", with: "和；带有",
  without: "没有", work: "工作", working: "工作；合作", workshop: "工作坊", would: "会；将"
};

Object.assign(exampleWordTranslations, {
  absence: "缺席", absent: "缺席的", accordance: "一致；按照", according: "根据", accustomed: "习惯的",
  accuse: "指责", accused: "指责了", advantage: "优势；好处", afternoon: "下午", airline: "航空公司",
  also: "也", announce: "宣布", ask: "询问；要求", attention: "注意力；关注", battery: "电池",
  bear: "忍受；承担", becomes: "变成", been: "be 的过去分词", better: "更好的", between: "在...之间",
  blame: "责备", blamed: "责备了", box: "盒子", boxes: "盒子", brighter: "更亮的", business: "商务；商业",
  butter: "黄油", cabinet: "柜子；内阁", cancel: "取消", canceled: "取消了", cancellation: "取消",
  cannot: "不能", caught: "抓住；撞见了", cease: "停止", ceased: "停止了", center: "中心", ceo: "首席执行官",
  ceremony: "仪式", chef: "厨师", choose: "选择", clean: "清洁", cleaning: "清洁", clear: "清晰的；清除",
  come: "来；发生", comes: "来；涉及", communication: "沟通", congratulate: "祝贺", congratulated: "祝贺了",
  consultant: "顾问", continue: "继续", continued: "继续了", contrast: "对比；形成对比", contrasts: "对比；形成对比",
  copier: "复印机", could: "能够；可以；可能", damage: "损坏", damaged: "损坏的", database: "数据库",
  days: "天", decision: "决定", depend: "依赖；取决于", depends: "依赖；取决于", did: "做了",
  difficulty: "困难", dinner: "晚餐", distinguish: "区分", distinguishes: "区分", dollars: "美元", dollar: "美元",
  down: "向下；降低", drew: "吸引；画了", driver: "司机", drivers: "司机", either: "两者之一",
  elevator: "电梯", enough: "足够的", error: "错误", errors: "错误", every: "每个；所有的", everything: "所有事情",
  exchange: "交换；兑换", exchanged: "交换了；兑换了", factory: "工厂", fail: "失败；未能", failed: "失败了；未能",
  fast: "快的", faster: "更快的", felt: "感觉到", fewer: "更少的", fifty: "五十", fill: "填写；装满",
  filled: "装满的；填写了", finish: "完成", finished: "完成了", forced: "被迫的；迫使了", force: "迫使",
  forbid: "禁止", forbids: "禁止", forget: "忘记", forgot: "忘记了", friday: "星期五", front: "前面的；前台",
  gave: "给了", gate: "登机口；大门", got: "得到；使得", guard: "保安；守卫", hall: "大厅",
  hard: "努力的；困难的", hate: "讨厌", hates: "讨厌", heard: "听见了", heavy: "重的；大量的",
  help: "帮助", helps: "帮助", held: "举行了；持有", high: "高的；高点", higher: "更高的", home: "家；在家",
  hour: "小时", hours: "小时", human: "人的；人类", idea: "想法", ideas: "想法", inside: "里面",
  interested: "感兴趣的", key: "关键；钥匙", kim: "Kim（人名）", known: "已知的；著名的", laptop: "笔记本电脑",
  laptops: "笔记本电脑", large: "大的", lead: "导致；引导", leader: "领导者", leaders: "领导者",
  learn: "学习；得知", lesson: "课程", lessons: "课程", let: "让；允许", like: "喜欢；像", long: "长的；长时间",
  look: "看；期待", looking: "寻找；看", love: "喜欢；热爱", low: "低的", lunch: "午餐", made: "制作了；使得",
  main: "主要的", make: "制作；使得", makes: "使得；制作", making: "制作；使得", manual: "手册",
  march: "三月；行进", meal: "餐；一顿饭", mean: "意思是；打算", means: "意味着；方法", meant: "意思是；本打算",
  me: "我", member: "成员", members: "成员", menu: "菜单", mind: "介意；头脑", missing: "缺失的",
  mistake: "错误", model: "型号；模型", monday: "星期一", money: "钱", month: "月", most: "最多；最",
  mr: "先生", much: "很多；非常", must: "必须", name: "名字；命名", near: "靠近", necessary: "必要的",
  need: "需要", needs: "需要", neither: "两者都不", network: "网络", next: "下一个；接下来",
  nine: "九", no: "没有；不", noise: "噪音", nor: "也不", oil: "油", older: "更旧的；年龄更大的",
  olive: "橄榄", open: "打开；开放", opposed: "反对的", out: "外面；完全", outdoor: "户外的", outside: "外面",
  overseas: "海外的；海外地", overcharge: "多收费", overcharging: "多收费", owing: "由于；欠着",
  parking: "停车", part: "部分；零件", parts: "零件；部分", pass: "通行证；通过", passes: "通行证；通过",
  passenger: "乘客", passengers: "乘客", paid: "已付款的；支付了", people: "人们", percent: "百分比",
  phone: "电话", plan: "计划", plans: "计划", possible: "可能的", positive: "积极的", printing: "打印",
  program: "项目；程序", quick: "快的", quickly: "快速地", quiet: "安静的", rain: "雨", read: "阅读",
  ready: "准备好的", real: "真实的", reason: "原因；理由", record: "记录；纪录", regard: "关于；看待",
  regardless: "不管；无论", relation: "关系；关联", remember: "记得；记住", requests: "请求；要求",
  request: "请求；要求", rule: "规则", rules: "规则", safety: "安全", same: "相同的", saw: "看见了",
  second: "第二；秒", security: "安全；安保", seen: "被看见；看过", september: "九月", shake: "震动；摇动",
  shaking: "震动", sharply: "急剧地", shirt: "衬衫", shift: "班次；转变", shifts: "班次；转变",
  short: "短的；简短的", showed: "显示了；表现出", shown: "展示了；被显示", similar: "相似的",
  size: "尺寸", slow: "慢的；减速", so: "所以；如此", sold: "售出", speak: "说话；发言",
  speed: "速度", spite: "尽管；恶意", spent: "花费了", spend: "花费", stay: "停留；保持",
  stood: "站立了", stop: "停止", stopped: "停止了", strange: "奇怪的", strong: "强的", submitting: "提交",
  such: "这样的；如此", support: "支持；客服", system: "系统", tags: "标签", take: "拿；花费；利用",
  taught: "教了", teach: "教", ten: "十", test: "测试", testing: "测试", thank: "感谢", thanked: "感谢了",
  than: "比", there: "那里；有", thirty: "三十", three: "三", ticket: "票", tickets: "票",
  today: "今天", tomorrow: "明天", too: "太；也", tour: "参观；旅行", traffic: "交通；访问量",
  trainee: "实习生；受训者", train: "培训", trained: "培训了；训练有素的", trainer: "培训师",
  trouble: "麻烦；困难", twice: "两次", twenty: "二十", two: "二；两个", under: "在...下面；处于",
  unpaid: "未付款的", unused: "未使用的", unwilling: "不愿意的", use: "使用", visit: "拜访；参观",
  visiting: "拜访；参观", wait: "等待", waiting: "等待", watch: "观看", watched: "观看了", week: "周；星期",
  welcoming: "欢迎；迎接", went: "去；继续", within: "在...之内", wednesday: "星期三", writing: "书写；书面",
  word: "单词；词语", careful: "小心的；仔细的", wrong: "错误的", year: "年", yesterday: "昨天", your: "你的；你们的"
});

function exampleWordCandidates(rawWord) {
  const word = String(rawWord || "").toLowerCase().replace(/['’]s$/g, "").replace(/^[^a-z]+|[^a-z]+$/g, "");
  const candidates = [word];
  if (word.endsWith("ies") && word.length > 4) candidates.push(`${word.slice(0, -3)}y`);
  if (word.endsWith("es") && word.length > 3) candidates.push(word.slice(0, -2));
  if (word.endsWith("s") && word.length > 3) candidates.push(word.slice(0, -1));
  if (word.endsWith("ied") && word.length > 4) candidates.push(`${word.slice(0, -3)}y`);
  if (word.endsWith("ed") && word.length > 3) {
    const stem = word.slice(0, -2);
    candidates.push(stem);
    candidates.push(word.slice(0, -1));
    candidates.push(`${stem}e`);
    if (/([a-z])\1$/.test(stem)) candidates.push(stem.slice(0, -1));
  }
  if (word.endsWith("ing") && word.length > 5) {
    const stem = word.slice(0, -3);
    candidates.push(stem);
    candidates.push(`${stem}e`);
    if (/([a-z])\1$/.test(stem)) candidates.push(stem.slice(0, -1));
  }
  return [...new Set(candidates.filter(Boolean))];
}

const exampleCommonTranslations = {
  the: "定冠词：这个/那个",
  a: "不定冠词：一个",
  an: "不定冠词：一个",
  to: "介词/不定式标记",
  by: "介词：在...之前/通过",
  for: "介词：为了/给",
  with: "介词：和/带有",
  before: "在...之前",
  after: "在...之后",
  during: "在...期间",
  about: "关于",
  from: "来自/从",
  in: "在...里面/在...期间",
  on: "在...上/关于",
  and: "和",
  or: "或者",
  was: "be 动词过去式",
  were: "be 动词过去式",
  is: "是",
  are: "是",
  be: "是/成为"
};

function exampleWordPartOfSpeech(word, matchedItem, meaning, candidates = []) {
  if (matchedItem) return partOfSpeechOf(matchedItem);
  for (const candidate of candidates) {
    if (candidate !== word && photoVerbWords.has(cleanPhotoWord(candidate))) return "动词";
  }
  const role = photoWordRole(word, meaning || lookupPhotoMeaning(word));
  return photoRoleLabels[role] || "名词";
}

function lookupExampleWordInfo(rawWord) {
  const candidates = exampleWordCandidates(rawWord);
  const vocabWords = allVocab().filter((item) => item.kind === "word" && !hasPendingMeaning(item));
  for (const word of candidates) {
    const match = vocabWords.find((item) => item.word.toLowerCase() === word);
    const knownMeaning = exampleWordTranslations[word] || exampleCommonTranslations[word];
    if (knownMeaning) return { word, meaning: knownMeaning, pos: exampleWordPartOfSpeech(word, match, knownMeaning, candidates) };
    const photoMeaning = lookupPhotoMeaning(word);
    if (photoMeaning) return { word, meaning: photoMeaning, pos: exampleWordPartOfSpeech(word, match, photoMeaning, candidates) };
    if (match) return { word, meaning: match.meaning, pos: partOfSpeechOf(match) };
  }
  return { word: candidates[0] || String(rawWord || "").toLowerCase(), meaning: "暂无该词翻译", pos: "未知词性" };
}

function lookupExampleWord(rawWord) {
  return lookupExampleWordInfo(rawWord).meaning;
}

function filteredWordbook() {
  let list = dedupeVocab([
    ...allVocab().filter((item) => !grammarPairEntryKeys.has(wordKey(item).toLowerCase())),
    ...grammarPairCards
  ]);
  if (wordbookFilter === "word" || wordbookFilter === "phrase") list = list.filter((item) => item.kind === wordbookFilter);
  if (wordbookFilter !== "all" && wordbookFilter !== "word" && wordbookFilter !== "phrase") list = list.filter((item) => item.category === wordbookFilter);
  return list.filter(matchesWordbookSearch);
}

function wordbookSearchText(item) {
  const variants = (item.variants || []).flatMap((variant) => [
    variant.pattern,
    variant.meaning,
    variant.example,
    variant.translation
  ]);
  return [
    item.word,
    item.phrase,
    item.meaning,
    item.example,
    item.translation,
    item.note,
    item.tag,
    item.category,
    item.kind,
    partOfSpeechOf(item),
    ...variants
  ].filter(Boolean).join(" ").toLowerCase();
}

function matchesWordbookSearch(item) {
  const query = wordbookSearch.trim().toLowerCase();
  if (!query) return true;
  const text = wordbookSearchText(item);
  return text.includes(query) || query.split(/\s+/).filter(Boolean).every((part) => text.includes(part));
}

function filteredVocab() {
  const seen = new Set(state.seenWords);
  const source = allVocab().filter((item) => !hasPendingMeaning(item));
  if (vocabFilter === "wordMistakes") return state.wordMistakes.map((m) => normalizeEntry(m.item || { word: m.question, meaning: m.answer, phrase: m.question, example: m.explain, translation: "", category: "wordMistakes" }));
  const seenItems = source.filter((item) => isSeenForTraining(item, seen));
  if (wordTrainingKind === "grammar" || vocabFilter === "grammar") return seenItems.filter((item) => item.category === "grammar");
  let list = seenItems;
  if (vocabFilter === "all") return list;
  if (vocabFilter === "highfreq") return list;
  return list.filter((item) => item.category === vocabFilter);
}

function trainingKindTitle() {
  if (wordTrainingKind === "allKinds") return "全部训练";
  if (wordTrainingKind === "grammar") return "固定搭配训练";
  return wordTrainingKind === "phrase" ? "短语训练" : "单词训练";
}

function matchesTrainingKind(item) {
  if (wordTrainingKind === "allKinds") return item.kind === "word" || item.kind === "phrase";
  if (wordTrainingKind === "word") return item.kind === "word";
  if (wordTrainingKind === "grammar") return item.kind === "phrase" && item.category === "grammar";
  return item.kind === "phrase" && item.category !== "grammar";
}

function sameOptionGroup(a, b) {
  if (a.category === "grammar" || b.category === "grammar") return a.category === "grammar" && b.category === "grammar";
  return a.kind === b.kind;
}

function trainingMeaning(item) {
  const meaning = String(item.meaning || "");
  return item.category === "grammar" ? meaning.replace(/（[^）]*）/g, "").replace(/\([^)]*\)/g, "").trim() : meaning;
}

function renderStats() {
  $("#seen-count").textContent = state.seenWords.length;
  $("#known-count").textContent = state.known.length;
  $("#word-mistake-dashboard-count").textContent = state.wordMistakes.length;
  $("#word-known-count").textContent = state.known.length;
  $("#word-unknown-count").textContent = state.wordMistakes.length;
  renderWordMistakes();
}
function renderTimeline() {
  $("#timeline").innerHTML = phases.map((p) => `<article class="phase"><span>${p[0]}</span><div><strong>${p[1]}</strong><p>${p[2]}</p></div><button data-jump="wordbook">去背词</button></article>`).join("");
}
function renderDaily() {
  const day = today();
  $("#daily-tasks").innerHTML = dailyTasks.map((task, index) => {
    const id = `${day}-${index}`;
    return `<label class="task"><div><strong>${task[0]}</strong><p>${task[1]}</p></div><input type="checkbox" data-task="${id}" ${state.tasks[id] ? "checked" : ""} /></label>`;
  }).join("");
}

function markSeen(item) {
  const key = wordKey(item);
  if (!state.seenWords.includes(key)) {
    state.seenWords.push(key);
    save();
  }
}

function renderGrammarPairMeaning(item) {
  const rows = (item.variants || []).map((variant, index) => (
    `<span class="grammar-pair-row"><strong>${index + 1}. ${escapeHtml(variant.phrase)}</strong><span class="grammar-pair-meaning">${escapeHtml(variant.meaning)}</span></span>`
  )).join("");
  return `<span class="grammar-pair-section-title">搭配对比</span>${rows}`;
}

function renderGrammarPairExamples(item) {
  const examples = (item.variants || []).map((variant) => (
    `<span class="grammar-pair-example">${renderClickableExample(variant.example)}</span>`
  )).join("");
  return `<span class="grammar-pair-section-title">例句</span>${examples}`;
}

function renderGrammarPairTranslations(item) {
  const translations = (item.variants || []).map((variant) => (
    `<span class="grammar-pair-translation">${escapeHtml(variant.translation)}</span>`
  )).join("");
  return `<span class="grammar-pair-section-title">例句翻译</span>${translations}`;
}

function renderWordbook() {
  const list = filteredWordbook();
  $("#wordbook-count").textContent = list.length;
  if (!list.length) {
    skipRememberWordbookItem = false;
    $("#wordbook-tag").textContent = "检索";
    $("#wordbook-kind").textContent = wordbookSearch ? "没有匹配结果" : "单词本";
    $("#wordbook-word").textContent = wordbookSearch ? "没有找到" : "暂无词条";
    $("#wordbook-pos").textContent = "";
    $("#wordbook-meaning").textContent = wordbookSearch ? `换一个关键词试试：${wordbookSearch}` : "";
    $("#wordbook-example").textContent = "";
    $("#wordbook-token-translation").textContent = "";
    $("#wordbook-translation").textContent = "";
    $("#wordbook-phrase").textContent = "";
    $("#wordbook-note").textContent = "";
    return;
  }
  wordbookIndex = ((wordbookIndex % list.length) + list.length) % list.length;
  const item = list[wordbookIndex % list.length];
  markSeen(item);
  if (!skipRememberWordbookItem) rememberWordbookItem(item);
  skipRememberWordbookItem = false;
  $("#wordbook-tag").textContent = item.tag || "TOEIC";
  if (item.isGrammarPairCard) {
    $("#wordbook-kind").textContent = "固定搭配对比";
    $("#wordbook-word").textContent = item.word;
    $("#wordbook-pos").textContent = `词性：${partOfSpeechOf(item)}`;
    $("#wordbook-meaning").innerHTML = renderGrammarPairMeaning(item);
    $("#wordbook-example").innerHTML = renderGrammarPairExamples(item);
    $("#wordbook-token-translation").textContent = "点击例句中的单词查看翻译和词性";
    $("#wordbook-translation").innerHTML = renderGrammarPairTranslations(item);
    $("#wordbook-phrase").textContent = item.word;
    $("#wordbook-note").textContent = item.note || "TOEIC Part 5 固定搭配对比。";
    return;
  }
  $("#wordbook-kind").textContent = item.kind === "phrase" ? "短语/固定搭配" : "单词";
  $("#wordbook-word").textContent = item.kind === "phrase" ? item.phrase || item.word : item.word;
  $("#wordbook-pos").textContent = `词性：${partOfSpeechOf(item)}`;
  $("#wordbook-meaning").textContent = item.meaning;
  $("#wordbook-example").innerHTML = renderClickableExample(item.example || "");
  $("#wordbook-token-translation").textContent = "点击例句中的单词查看翻译和词性";
  $("#wordbook-translation").textContent = item.translation || "";
  $("#wordbook-phrase").textContent = item.phrase || item.word;
  $("#wordbook-note").textContent = item.note || "TOEIC 常见搭配。";
}

function renderVocab() {
  const list = filteredVocab().filter(matchesTrainingKind);
  $("#current-word-count").textContent = list.length;
  $("#word-known-count").textContent = state.known.length;
  $("#word-unknown-count").textContent = state.wordMistakes.length;
  if (!list.length) {
    $("#vocab-tag").textContent = "训练词库";
    $("#word-question-type").textContent = trainingKindTitle();
    $("#vocab-word").textContent = "还没有训练词";
    $("#vocab-meaning").textContent = wordTrainingKind === "phrase" ? "请先到单词本看过一些短语，再回来训练" : "请先到单词本看过一些词，再回来训练";
    $("#word-options").innerHTML = "";
    $("#word-feedback").textContent = "";
    return;
  }
  currentWordQuestion = buildWordQuestion(list[vocabIndex % list.length], list);
  $("#vocab-tag").textContent = currentWordQuestion.item.tag;
  $("#word-question-type").textContent = currentWordQuestion.label;
  $("#vocab-word").textContent = currentWordQuestion.prompt;
  $("#vocab-meaning").textContent = currentWordQuestion.hint;
  $("#word-feedback").textContent = "";
  $("#word-options").innerHTML = currentWordQuestion.options.map((option, index) => `<button class="word-option" data-word-option="${index}">${String.fromCharCode(65 + index)}. ${option}</button>`).join("");
}

function buildWordQuestion(item, list) {
  const englishText = item.kind === "phrase" ? item.phrase || item.word : item.word;
  const chineseText = trainingMeaning(item);
  const toChinese = wordTrainingMode === "enToCn";
  const answer = toChinese ? chineseText : englishText;
  const optionOf = (entry) => toChinese ? trainingMeaning(entry) : (entry.kind === "phrase" ? entry.phrase || entry.word : entry.word);
  const optionCount = Math.floor(Math.random() * 6) + 5;
  const optionPool = wordTrainingKind === "allKinds" ? list.filter((entry) => sameOptionGroup(item, entry)) : list;
  const distractors = shuffle(optionPool).filter((entry) => entry.word !== item.word).map(optionOf).filter((option) => option && option !== answer);
  const options = shuffle([...new Set([answer, ...distractors])].slice(0, Math.min(optionCount, optionPool.length || list.length)));
  return {
    item,
    label: item.kind === "phrase" ? (toChinese ? "短语选翻译" : "翻译选短语") : (toChinese ? "英文选中文" : "中文选英文"),
    prompt: toChinese ? englishText : chineseText,
    hint: toChinese ? "选择正确的中文意思/翻译" : "选择正确的英文单词/短语",
    answer,
    options
  };
}

function addWordMistake(item) {
  if (!state.wordMistakes.some((m) => m.question === item.word)) {
    state.wordMistakes.push({ time: new Date().toLocaleString(), type: "vocab", question: item.word, answer: `${item.meaning}；${item.phrase || item.word}`, explain: `${item.example || ""} / ${item.translation || ""}`, item });
  }
}

function answerWordQuestion(index, button) {
  if (!currentWordQuestion) return;
  const selected = currentWordQuestion.options[index];
  const isCorrect = selected === currentWordQuestion.answer;
  $$(".word-option").forEach((option) => option.disabled = true);
  button.classList.add(isCorrect ? "correct" : "wrong");
  const correctIndex = currentWordQuestion.options.indexOf(currentWordQuestion.answer);
  if (correctIndex >= 0) $$(".word-option")[correctIndex].classList.add("correct");
  if (isCorrect) {
    if (!state.known.includes(currentWordQuestion.item.word)) state.known.push(currentWordQuestion.item.word);
    $("#word-feedback").textContent = "正确。这个词以后仍会重复出现。";
  } else {
    addWordMistake(currentWordQuestion.item);
    $("#word-feedback").textContent = `错了，已加入单词错题本。正确答案：${currentWordQuestion.answer}`;
  }
  save();
}

function renderQuestion() {
  const list = questions[currentType];
  const item = list[questionIndex % list.length];
  $("#question-index").textContent = `${questionIndex + 1} / ${list.length}`;
  $("#question-text").textContent = item.q;
  $("#question-passage").textContent = item.passage || "";
  $("#feedback").textContent = "";
  $("#options").innerHTML = item.options.map((option, index) => `<button class="option" data-answer="${index}">${String.fromCharCode(65 + index)}. ${option}</button>`).join("");
}

function answerQuestion(index, button) {
  const item = questions[currentType][questionIndex % questions[currentType].length];
  const isCorrect = index === item.answer;
  $$(".option").forEach((option) => option.disabled = true);
  button.classList.add(isCorrect ? "correct" : "wrong");
  $$(".option")[item.answer].classList.add("correct");
  $("#feedback").textContent = isCorrect ? `正确。${item.explain}` : `错题已收录。${item.explain}`;
  if (!isCorrect) state.mistakes.push({ time: new Date().toLocaleString(), type: currentType, question: item.q, answer: item.options[item.answer], explain: item.explain });
  save();
}

function renderHistory() {
  $("#score-history").innerHTML = state.scores.length ? state.scores.slice().reverse().map((s) => `<div class="history-row"><strong>${s.total} 分</strong><span>${s.time}，听力 ${s.listen}，阅读 ${s.read}</span></div>`).join("") : '<p class="empty">还没有模拟成绩。</p>';
}

function renderMistakes() {
  $("#mistake-list").innerHTML = state.mistakes.length ? state.mistakes.slice().reverse().map((m) => `<div class="mistake-row"><strong>${m.question}</strong><span>正确答案：${m.answer}</span><span>${m.explain}</span><small>${m.time}</small></div>`).join("") : '<p class="empty">目前没有专项练习错题。</p>';
}

function renderWordMistakes() {
  $("#word-mistake-list").innerHTML = state.wordMistakes.length ? state.wordMistakes.slice().reverse().map((m, i) => `<div class="mistake-row"><strong>${m.question}</strong><span>意思/搭配：${m.answer}</span><span>${m.explain}</span><small>${m.time}</small><button data-remove-word-mistake="${state.wordMistakes.length - 1 - i}">已会，移出错题</button></div>`).join("") : '<p class="empty">目前没有单词错题。训练选错后会自动收录。</p>';
}

function switchTab(id) {
  $$(".tab").forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === id));
  $$(".panel").forEach((panel) => panel.classList.toggle("active", panel.id === id));
  if (id === "wordbook") renderWordbook();
  if (id === "vocab") renderVocab();
}

function tick() {
  remainingSeconds = Math.max(0, remainingSeconds - 1);
  $("#timer").textContent = `${String(Math.floor(remainingSeconds / 60)).padStart(2, "0")}:${String(remainingSeconds % 60).padStart(2, "0")}`;
  if (remainingSeconds === 0) clearInterval(timerId);
}

document.addEventListener("click", (event) => {
  const exampleWord = event.target.closest("[data-example-word]");
  if (exampleWord) {
    event.stopPropagation();
    const word = exampleWord.dataset.exampleWord;
    const info = lookupExampleWordInfo(word);
    $("#wordbook-token-translation").textContent = `${word}（词性：${info.pos}）：${info.meaning}`;
    speakEnglish(word);
    return;
  }

  const tab = event.target.closest(".tab");
  if (tab) switchTab(tab.dataset.tab);
  const jump = event.target.closest("[data-jump]");
  if (jump) switchTab(jump.dataset.jump);
  const option = event.target.closest(".option");
  if (option) answerQuestion(Number(option.dataset.answer), option);
  const wordOption = event.target.closest("[data-word-option]");
  if (wordOption) answerWordQuestion(Number(wordOption.dataset.wordOption), wordOption);
  const removeWordMistake = event.target.closest("[data-remove-word-mistake]");
  if (removeWordMistake) { state.wordMistakes.splice(Number(removeWordMistake.dataset.removeWordMistake), 1); save(); }
  const trainingNextZone = event.target.closest("#training-next-zone");
  if (trainingNextZone) {
    const list = filteredVocab().filter(matchesTrainingKind);
    if (list.length) {
      vocabIndex = (vocabIndex + 1) % list.length;
      renderVocab();
    }
  }
  const wordbookCard = event.target.closest("#wordbook-card");
  if (wordbookCard) {
    const rect = wordbookCard.getBoundingClientRect();
    const clickedRightHalf = event.clientX >= rect.left + rect.width / 2;
    if (clickedRightHalf) {
      const list = filteredWordbook();
      if (list.length) {
        wordbookIndex = (wordbookIndex + 1) % list.length;
        saveWordbookPosition();
      }
      renderWordbook();
    }
  }
});

document.addEventListener("change", (event) => {
  if (event.target.id === "word-training-mode") { wordTrainingMode = event.target.value; renderVocab(); }
  if (event.target.id === "word-training-kind") {
    wordTrainingKind = event.target.value;
    if (wordTrainingKind === "grammar") {
      vocabFilter = "grammar";
      $("#vocab-filter").value = "grammar";
    } else if (wordTrainingKind === "allKinds" || vocabFilter === "grammar") {
      vocabFilter = "all";
      $("#vocab-filter").value = "all";
    }
    vocabIndex = 0;
    renderVocab();
  }
  if (event.target.id === "wordbook-filter") { wordbookFilter = event.target.value; wordbookIndex = 0; skipRememberWordbookItem = true; saveWordbookPosition(); renderWordbook(); }
});

$("#wordbook-search").addEventListener("input", (event) => {
  wordbookSearch = event.target.value;
  wordbookIndex = 0;
  skipRememberWordbookItem = true;
  renderWordbook();
});

$("#refresh-wordbook").addEventListener("click", () => { const list = filteredWordbook(); if (list.length) { wordbookIndex = (wordbookIndex + 1) % list.length; saveWordbookPosition(); } renderWordbook(); });
$("#prev-wordbook").addEventListener("click", () => { const list = filteredWordbook(); if (list.length) { wordbookIndex = (wordbookIndex - 1 + list.length) % list.length; saveWordbookPosition(); } renderWordbook(); });
$("#speak-wordbook").addEventListener("click", () => { const list = filteredWordbook(); if (!list.length) return; const item = list[wordbookIndex % list.length]; speakEnglish(`${item.phrase || item.word}. ${item.example || ""}`); });
$("#return-wordbook-last").addEventListener("click", () => {
  const scope = wordbookScopeKey();
  const label = wordbookScopeLabel();
  const key = state.wordbookLastByFilter?.[scope] || "";
  if (!key) {
    $("#wordbook-token-translation").textContent = `${label} 还没有记录上次看的单词。`;
    return;
  }
  let list = filteredWordbook();
  let index = findWordbookIndexByKey(list, key);
  if (index < 0 && wordbookSearch.trim()) {
    wordbookSearch = "";
    $("#wordbook-search").value = "";
    list = filteredWordbook();
    index = findWordbookIndexByKey(list, key);
  }
  if (index < 0) {
    $("#wordbook-token-translation").textContent = `${label} 上次看的词不在当前词库里。`;
    return;
  }
  wordbookIndex = index;
  saveWordbookPosition();
  renderWordbook();
});
$("#vocab-filter").addEventListener("change", (event) => {
  vocabFilter = event.target.value;
  if (vocabFilter === "grammar") {
    wordTrainingKind = "grammar";
    $("#word-training-kind").value = "grammar";
  } else if (wordTrainingKind === "grammar") {
    wordTrainingKind = "allKinds";
    $("#word-training-kind").value = "allKinds";
  }
  vocabIndex = 0;
  renderVocab();
});
$("#speak-vocab").addEventListener("click", () => { if (!currentWordQuestion) return; speakEnglish(currentWordQuestion.prompt); });
$("#practice-word-mistakes").addEventListener("click", () => { if (!state.wordMistakes.length) return; $("#vocab-filter").value = "wordMistakes"; vocabFilter = "wordMistakes"; vocabIndex = 0; renderVocab(); switchTab("vocab"); });
$("#clear-word-mistakes").addEventListener("click", () => { state.wordMistakes = []; state.unknown = []; save(); });
$("#save-cloud-sync").addEventListener("click", () => { saveCloudSettingsFromInputs(); setCloudStatus("同步设置已保存。", "ok"); });
$("#create-cloud-save").addEventListener("click", connectCloudSave);
$("#upload-cloud-save").addEventListener("click", () => { saveCloudSettingsFromInputs(); uploadCloudSave(true); });
$("#download-cloud-save").addEventListener("click", downloadCloudSave);
$("#cloud-auto").addEventListener("change", () => { saveCloudSettingsFromInputs(); if (cloudSync.auto) queueCloudUpload(); });

renderTimeline();
updateCloudInputs();
$("#wordbook-search").value = wordbookSearch;
$("#wordbook-filter").value = wordbookFilter;
$("#vocab-filter").value = vocabFilter;
$("#word-training-kind").value = wordTrainingKind;
$("#word-training-mode").value = wordTrainingMode;
renderVocab();
renderStats();
