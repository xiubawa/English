// Original workplace examples. Technical terminology cross-checked against Coats and AATCC.
// https://www.coats.com/en-us/industries/apparel/applications/sports-and-activewear/swimwear/
// https://www.aatcc.org/learn/online-test-method-training/colorfastness-module
(() => {
  const rows = `
产品与部位|swimwear|泳装（总称）|swimwear collection|We are developing a new swimwear collection.|我们正在开发一个新的泳装系列。
产品与部位|swimsuit|泳衣|a lined swimsuit|This swimsuit needs a full lining.|这款泳衣需要全里布。
产品与部位|one-piece swimsuit|连体泳衣|a one-piece swimsuit|Please adjust the body length of the one-piece swimsuit.|请调整这款连体泳衣的身长。
产品与部位|bikini|比基尼；分体式泳衣|bikini top and bottom|The bikini top and bottom are sold separately.|比基尼上衣和泳裤分开销售。
产品与部位|tankini|背心式分体泳衣|a tankini top|The buyer wants a longer tankini top.|买家希望背心式泳衣的上衣长一些。
产品与部位|rash guard|防摩擦泳衣；水上运动防护上衣|a long-sleeve rash guard|Make the rash guard close-fitting without restricting movement.|防护上衣要贴身，但不能限制活动。
产品与部位|board shorts|冲浪短裤|quick-drying board shorts|Use quick-drying fabric for these board shorts.|这款冲浪短裤使用速干面料。
产品与部位|swim trunks|男式泳裤|men's swim trunks|Add a drawcord to the swim trunks.|给这款男式泳裤加上抽绳。
产品与部位|strap|肩带；带子|adjustable straps|Check that both straps are the same length.|检查两条肩带的长度是否一致。
产品与部位|underwire|胸托钢圈|an underwire channel|The underwire must not poke through the channel.|钢圈不能刺穿钢圈套。
产品与部位|cup|罩杯|molded cups|The molded cups must keep their shape after washing.|模压罩杯水洗后必须保持形状。
产品与部位|gusset|裆片；为增加活动空间而加的嵌片|a gusset lining|Use a soft lining for the gusset.|裆片使用柔软的里布。
产品与部位|neckline|领口；领口线|a high neckline|Raise the neckline by one centimeter.|将领口提高一厘米。
产品与部位|leg opening|裤腿口；泳裤腿围开口|elastic at the leg opening|The elastic at the leg opening feels too tight.|腿口的松紧带感觉太紧。
面辅料|fabric|面料；布料|fabric composition|Please confirm the fabric composition before sampling.|打样前请确认面料成分。
面辅料|nylon|尼龙；锦纶|nylon fabric|This nylon fabric has a smooth hand feel.|这款锦纶面料手感顺滑。
面辅料|polyester|聚酯纤维；涤纶|recycled polyester|The customer requested recycled polyester.|客户要求使用再生涤纶。
面辅料|elastane|氨纶；弹性纤维|nylon and elastane|The label must show the percentage of elastane.|标签必须标明氨纶的含量。
面辅料|spandex|氨纶（美式常用名称）|spandex content|Check the spandex content on the test report.|核对检测报告中的氨纶含量。
面辅料|lining|里布；内衬|full lining|The white swimsuit needs an opaque lining.|白色泳衣需要不透的里布。
面辅料|mesh|网布|stretch mesh|Use stretch mesh for this panel.|这个裁片使用弹力网布。
面辅料|power mesh|强力弹性网布；塑形网布|power mesh lining|Add power mesh to the front lining for support.|在前片里布处加上强力网布以提供支撑。
面辅料|elastic|松紧带；橡筋|elastic width|Please use elastic that is eight millimeters wide.|请使用八毫米宽的松紧带。
面辅料|thread|缝纫线|sewing thread|Match the thread color to the fabric.|缝纫线的颜色要与面料匹配。
面辅料|trim|服装辅料；装饰配件|trim approval|Do not order bulk trims before approval.|辅料获批前不要订购大货用量。
面辅料|buckle|扣具；带扣|a plastic buckle|Check the strength of the plastic buckle.|检查塑料扣具的强度。
面辅料|slider|调节扣|a strap slider|The strap slider should move smoothly.|肩带调节扣应能顺畅移动。
面辅料|drawcord|抽绳|a waist drawcord|Secure the waist drawcord at the center back.|在后中位置固定腰部抽绳。
面辅料|binding|包边条；包边处理|elastic binding|Keep the binding width consistent.|保持包边宽度一致。
面辅料|fabric weight|面料克重|fabric weight in GSM|The target fabric weight is 200 GSM.|目标面料克重为每平方米二百克。
面辅料|GSM|克每平方米；面料克重单位|grams per square meter|Please state the GSM in the fabric specification.|请在面料规格中注明克重。
面辅料|four-way stretch|四向弹力|four-way stretch fabric|This design requires four-way stretch fabric.|这款设计需要四向弹力面料。
面辅料|stretch recovery|拉伸回复性；弹性回复性能|good stretch recovery|Check stretch recovery after repeated extension.|反复拉伸后检查弹性回复性能。
面辅料|hand feel|手感|a soft hand feel|The bulk fabric has a rougher hand feel than the sample.|大货面料的手感比样布粗糙。
面辅料|chlorine resistance|耐氯性能|test chlorine resistance|Ask the mill to provide chlorine resistance test results.|请面料厂提供耐氯测试结果。
面辅料|opacity|不透明性；遮透性|wet opacity|Check the fabric's opacity when wet and stretched.|检查面料在湿润并拉伸时的遮透性。
面辅料|UPF|紫外线防护系数|a UPF test report|We need a valid UPF test report before making this claim.|标注此防晒性能前，我们需要有效的 UPF 检测报告。
设计与打样|tech pack|产品技术资料包|an updated tech pack|Please send the updated tech pack to the factory.|请把更新后的技术资料包发给工厂。
设计与打样|specification|规格；技术要求|measurement specification|Follow the latest measurement specification.|按最新的尺寸规格执行。
设计与打样|pattern|纸样；版型样板|revise the pattern|Revise the pattern before making another sample.|制作下一件样衣前先修改纸样。
设计与打样|pattern maker|制版师；打版师|consult the pattern maker|Ask the pattern maker to check the armhole.|请制版师检查袖窿。
设计与打样|grading|放码；推档|pattern grading|Check the grading between sizes M and L.|检查 M 码和 L 码之间的放码。
设计与打样|size chart|尺码表|an approved size chart|Use the approved size chart for bulk production.|大货生产使用已确认的尺码表。
设计与打样|tolerance|公差；允许偏差|measurement tolerance|This measurement is outside the allowed tolerance.|这个尺寸超出了允许公差。
设计与打样|seam allowance|缝份|a six-millimeter seam allowance|Keep a six-millimeter seam allowance on this edge.|这条边保留六毫米缝份。
设计与打样|grainline|布纹方向线；纱向线|follow the grainline|Lay the pattern pieces along the marked grainline.|按标注的布纹方向摆放纸样。
设计与打样|notch|对位剪口；刀眼|match the notches|Match the notches before sewing the panels together.|拼缝裁片前先对齐剪口。
设计与打样|fit sample|试身样；试穿样|fit sample comments|Please review the fit sample comments.|请查看试身样的修改意见。
设计与打样|size set|齐码样；全码样|a size set sample|Send a size set before bulk cutting.|大货裁剪前寄送齐码样。
设计与打样|pre-production sample|产前样|approve the pre-production sample|Bulk production can start after the pre-production sample is approved.|产前样获批后才能开始大货生产。
设计与打样|counter sample|复样；按参考样制作的对照样|make a counter sample|Make a counter sample using the confirmed fabric.|用已确认的面料制作复样。
设计与打样|fit|合身程度；版型效果|check the fit|Check the fit on the correct size model.|在对应尺码的模特身上检查合身效果。
设计与打样|coverage|遮盖范围；包覆程度|back coverage|The buyer requested more back coverage.|买家要求增加后部的包覆范围。
设计与打样|armhole|袖窿；手臂开口|armhole depth|Reduce the armhole depth slightly.|将袖窿深度稍微减小。
设计与打样|rise|裤裆深；腰口至裆部的长度|front rise|Increase the front rise by half a centimeter.|前裆长度增加半厘米。
裁剪与缝制|cutting|裁剪|bulk cutting|Confirm the fabric inspection results before bulk cutting.|大货裁剪前确认面料检验结果。
裁剪与缝制|marker|排料图；唛架|marker efficiency|Improve marker efficiency to reduce fabric waste.|提高排料利用率以减少面料浪费。
裁剪与缝制|lay|铺好的布层；布床|cutting lay|Check the number of plies in each lay.|检查每床布的层数。
裁剪与缝制|bundle|扎；捆；一组裁片|a cutting bundle|Keep all pieces of the same size in one bundle.|将同一尺码的裁片放在同一扎中。
裁剪与缝制|panel|裁片；拼接片|a side panel|The side panel is cut from contrast fabric.|侧片使用撞色面料裁剪。
裁剪与缝制|seam|接缝；缝口|a side seam|The side seam must lie flat.|侧缝必须平服。
裁剪与缝制|stitch|针迹；线迹|stitch formation|Check the stitch formation on the sample.|检查样衣的线迹形成情况。
裁剪与缝制|overlock|包缝；拷边|an overlock seam|Use the specified overlock seam for joining these panels.|使用规定的包缝工艺拼接这些裁片。
裁剪与缝制|coverstitch|绷缝；绷缝线迹|coverstitch hemming|Check the stretch of the coverstitch hem.|检查绷缝下摆的伸展性。
裁剪与缝制|flatlock|平锁缝；平接缝线迹|a flatlock seam|The flatlock seam should feel smooth against the skin.|平锁缝贴肤时应感觉平滑。
裁剪与缝制|lockstitch|锁式线迹；平缝线迹|a lockstitch machine|Use the lockstitch machine for the specified operation.|该工序使用指定的平缝机。
裁剪与缝制|bartack|套结；打枣加固|bartack reinforcement|Add bartack reinforcement at the strap attachment.|在肩带连接处打枣加固。
裁剪与缝制|topstitching|明线；面线缝制|even topstitching|Keep the topstitching parallel to the edge.|明线要与边缘保持平行。
裁剪与缝制|hem|下摆；折边|a narrow hem|The hem is uneven on the left side.|左侧的下摆不平整。
裁剪与缝制|thread tension|线张力|adjust thread tension|Adjust the thread tension to prevent puckering.|调整线张力以防止起皱。
裁剪与缝制|stitch density|针迹密度；针距密度|check stitch density|Check stitch density against the sewing specification.|按缝制要求检查针迹密度。
裁剪与缝制|skipped stitch|跳针|a skipped stitch defect|There are skipped stitches near the leg opening.|腿口附近有跳针。
裁剪与缝制|puckering|缝口起皱；起拱|seam puckering|Reduce seam puckering without losing seam stretch.|在不损失接缝伸展性的情况下减少缝口起皱。
裁剪与缝制|needle damage|针损；针孔损伤|inspect for needle damage|Inspect the stretch fabric for needle damage.|检查弹力面料是否有针损。
裁剪与缝制|seam strength|接缝强力|a seam strength test|The seam strength test failed at the strap joint.|肩带接头处的接缝强力测试未通过。
品质与测试|quality control|质量控制；品控|quality control checks|Record the quality control checks for every lot.|记录每一批次的品控检查结果。
品质与测试|inspection|检验；验货|final inspection|Arrange the final inspection before shipment.|出货前安排尾期验货。
品质与测试|defect|疵点；缺陷|a major defect|Classify this broken seam as a major defect.|将这处断开的接缝判为主要缺陷。
品质与测试|AQL|接收质量限；抽样验收中使用的参数|an agreed AQL sampling plan|Use the buyer's agreed AQL sampling plan for inspection.|按买家认可的 AQL 抽样方案验货。
品质与测试|colorfastness|色牢度|colorfastness to chlorinated water|The buyer requires a colorfastness test to chlorinated water.|买家要求进行耐氯水色牢度测试。
品质与测试|crocking|摩擦掉色；摩擦沾色|wet crocking|Check wet crocking on the dark printed fabric.|检查深色印花面料的湿摩擦沾色情况。
品质与测试|shrinkage|缩水率；收缩|wash shrinkage|Measure wash shrinkage before approving the fabric.|确认面料前测量水洗缩水率。
品质与测试|pilling|起球|pilling resistance|The fabric needs better pilling resistance.|这款面料需要更好的抗起球性能。
品质与测试|snagging|勾丝|snagging resistance|Test snagging resistance on the textured fabric.|测试肌理面料的抗勾丝性能。
品质与测试|shade variation|色差；色光差异|shade variation between lots|There is visible shade variation between the two lots.|两批货之间有明显色差。
品质与测试|dye lot|染色批次；缸号|the same dye lot|Use fabric from the same dye lot for one garment.|同一件衣服使用同一缸号的面料。
品质与测试|lab dip|色样；实验室打色样|approve the lab dip|Please approve the lab dip before bulk dyeing.|大货染色前请确认色样。
品质与测试|strike-off|印花试样；印花打样|a print strike-off|Send a print strike-off for color approval.|寄送印花试样以确认颜色。
品质与测试|rework|返工|rework the defective pieces|Please rework the defective pieces before inspection.|验货前请返工处理不良品。
品质与测试|needle detection|检针；金属针检测|a needle detection record|Keep the needle detection record with the shipment documents.|将检针记录与出货文件一同留存。
品质与测试|test report|检测报告|a valid test report|The test report must match this fabric and color.|检测报告必须对应这款面料和颜色。
采购与跟单|supplier|供应商|an approved supplier|Order the elastic from an approved supplier.|向认可的供应商订购松紧带。
采购与跟单|mill|纺织厂；面料厂|a fabric mill|Ask the mill to confirm the delivery date.|请面料厂确认交货日期。
采购与跟单|merchandiser|服装跟单员；业务跟单|a garment merchandiser|The merchandiser will follow up on sample approval.|跟单员会跟进样品确认。
采购与跟单|quotation|报价；报价单|a revised quotation|Please send a revised quotation with the new fabric cost.|请按新的面料成本重新报价。
采购与跟单|MOQ|最小起订量|minimum order quantity|What is the MOQ for each color?|每个颜色的最小起订量是多少？
采购与跟单|lead time|交付周期；生产准备至交付所需时间|production lead time|The production lead time starts after sample approval.|生产交付周期从样品确认后开始计算。
采购与跟单|purchase order|采购订单|confirm a purchase order|Confirm the size breakdown on the purchase order.|确认采购订单上的尺码分配。
采购与跟单|bill of materials|物料清单|an updated bill of materials|Update the bill of materials after changing the buckle.|更换扣具后更新物料清单。
采购与跟单|consumption|耗用量；单耗|fabric consumption per piece|Calculate fabric consumption per piece before quoting.|报价前计算每件产品的面料单耗。
采购与跟单|costing|成本核算|garment costing|Include packaging and testing in the garment costing.|服装成本核算中要包含包装和检测费用。
采购与跟单|bulk production|大货生产；批量生产|start bulk production|Do not start bulk production with an unapproved pattern.|不要使用未经确认的纸样开始大货生产。
采购与跟单|capacity|产能|weekly production capacity|Please confirm your weekly production capacity.|请确认你们的周产能。
采购与跟单|delivery date|交货日期|meet the delivery date|We need an action plan to meet the delivery date.|我们需要一个确保按期交货的行动计划。
采购与跟单|approval|批准；确认通过|written approval|Get written approval before changing the material.|更换材料前取得书面确认。
包装与出货|care label|洗护标签；洗水唛|care label instructions|Check the care label instructions against the approved artwork.|按已确认的稿件核对洗护标签内容。
包装与出货|hangtag|吊牌|attach the hangtag|Attach the hangtag to the approved position.|将吊牌挂在已确认的位置。
包装与出货|hygiene liner|泳装卫生贴；试穿防护贴|apply the hygiene liner|Apply the hygiene liner neatly inside the swimsuit.|将卫生贴平整地贴在泳衣内侧。
包装与出货|polybag|塑料包装袋|an individual polybag|Pack each garment in an individual polybag.|每件衣服单独装入一个塑料袋。
包装与出货|carton|纸箱；外箱|carton dimensions|Confirm the carton dimensions before packing.|装箱前确认外箱尺寸。
包装与出货|packing list|装箱单|check the packing list|Check the packing list against the actual carton count.|按实际箱数核对装箱单。
包装与出货|size ratio|尺码配比|pack by size ratio|Pack the goods according to the buyer's size ratio.|按买家的尺码配比装箱。
包装与出货|barcode|条形码|scan the barcode|Scan the barcode to verify the style and size.|扫描条码以核对款号和尺码。
包装与出货|shipment|装运；出货批次|release the shipment|Release the shipment only after final approval.|获得最终批准后才能放行出货。
包装与出货|carton marking|外箱唛头；箱唛|approved carton markings|Use the approved carton markings on all boxes.|所有外箱都使用已确认的箱唛。
工作沟通|revise the sample|修改样衣|revise the sample according to the comments|Please revise the sample according to the fit comments.|请按试身意见修改样衣。
工作沟通|submit for approval|提交确认；送审|submit the lab dip for approval|Submit the lab dip for approval by Friday.|请在周五前提交色样确认。
工作沟通|within tolerance|在允许公差范围内|measurements within tolerance|All measurements must be within tolerance.|所有尺寸都必须在允许公差范围内。
工作沟通|out of tolerance|超出允许公差|a measurement out of tolerance|The waist measurement is out of tolerance.|腰围尺寸超出允许公差。
工作沟通|match the approved sample|与已确认的样品一致|match the approved sample exactly|The bulk color must match the approved sample.|大货颜色必须与已确认的样品一致。
工作沟通|on hold|暂停；暂缓处理|put production on hold|Put production on hold until the fabric is approved.|面料获批前暂停生产。
工作沟通|follow up on|跟进；追踪进展|follow up on sample comments|I will follow up on the sample comments tomorrow.|我明天会跟进样品意见。
工作沟通|meet the deadline|按期完成；赶上截止日期|meet the shipping deadline|Can we meet the shipping deadline after this change?|做出这项修改后，我们还能按时出货吗？
工作沟通|short shipment|短装；实际出货少于约定数量|report a short shipment|Please report the short shipment by size and color.|请按尺码和颜色报告短装数量。
工作沟通|corrective action|纠正措施|a corrective action plan|Send a corrective action plan for the seam defects.|请针对接缝缺陷提交纠正措施计划。
`;
  const entries = rows.trim().split('\n').map((line, sourceOrder) => {
    const [topic, word, meaning, phrase, example, translation] = line.split('|');
    return { word, meaning, phrase, example, translation, category: 'apparel', tag: `服装·泳衣制造 / ${topic}`,
      kind: /\s/.test(word) ? 'phrase' : 'word', pos: topic === '工作沟通' ? '实用表达' : '行业名词',
      note: `工作场景：${topic}。${word === 'AQL' ? 'AQL 是抽样验收参数，不等于允许所有产品存在同等比例的缺陷。' : word === 'UPF' ? '性能标注应以对应产品的有效检测结果为准。' : '结合例句练习工厂、客户和供应商之间的沟通。'}`, sourceOrder };
  });
  if (typeof module === 'object' && module.exports) module.exports = entries;
  else window.apparelVocab = entries;
})();
