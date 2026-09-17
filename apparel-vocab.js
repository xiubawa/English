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
产品与部位|bodice|衣身；上身|a fitted bodice|The bodice needs more room at the bust.|衣身胸部需要增加一些空间。
产品与部位|sleeve|袖子|a short sleeve|Please shorten the sleeve by one centimeter.|请将袖长缩短一厘米。
产品与部位|cuff|袖口|a rib-knit cuff|The cuff must recover after stretching.|袖口拉伸后必须恢复原状。
产品与部位|waistband|腰头；腰带|an elastic waistband|The waistband is too tight on size M.|M 码的腰头太紧。
产品与部位|collar|领子|a rib collar|Keep the collar opening symmetrical.|保持领口对称。
产品与部位|placket|门襟；开襟|a front placket|Add a snap to the front placket.|在前门襟加一颗按扣。
产品与部位|yoke|过肩；育克|a back yoke|The back yoke is cut on the bias.|后过肩按斜纹方向裁剪。
产品与部位|pocket bag|袋布|a pocket bag lining|Use the same lining for the pocket bag.|袋布使用相同的里布。
产品与部位|pocket opening|袋口|pocket opening width|Check the pocket opening width on the sample.|检查样衣的袋口宽度。
产品与部位|silicone gripper|硅胶防滑条|a silicone gripper at the hem|Add a silicone gripper to stop the hem from riding up.|加硅胶防滑条，防止下摆上卷。
面辅料|cotton|棉；棉纤维|organic cotton jersey|The buyer requested organic cotton jersey.|买家要求使用有机棉针织布。
面辅料|polyamide|聚酰胺；锦纶|recycled polyamide|Use recycled polyamide for the next lab dip.|下一次打色样使用再生锦纶。
面辅料|rayon|人造丝；粘胶纤维|rayon blend|The rayon blend has a softer drape.|粘胶混纺面料的垂感更柔软。
面辅料|jersey|针织汗布|stretch jersey|This style is made from stretch jersey.|这款产品使用弹力汗布。
面辅料|rib knit|罗纹针织布|a rib-knit waistband|Use rib knit for the waistband.|腰头使用罗纹针织布。
面辅料|interlock|双面针织布|cotton interlock|Cotton interlock gives the garment a stable shape.|棉双面布能让衣服保持稳定的形状。
面辅料|woven fabric|梭织面料|a lightweight woven fabric|Choose a lightweight woven fabric for the cover-up.|罩衫选择轻薄梭织面料。
面辅料|lace|蕾丝；花边|stretch lace|The stretch lace must not snag easily.|弹力蕾丝不能容易勾丝。
面辅料|zipper|拉链|a concealed zipper|The concealed zipper is hard to pull.|隐形拉链很难拉动。
面辅料|snap|按扣；四合扣|a snap closure|Check that every snap closes securely.|检查每颗按扣是否扣牢。
面辅料|hook and eye|钩扣|a hook-and-eye closure|The hook and eye must be aligned.|钩扣必须对齐。
面辅料|seam tape|接缝带；压胶带|seam tape application|Check the seam tape application around the neckline.|检查领口周围的接缝带贴合情况。
面辅料|fusible interlining|粘合衬|fusible interlining for the waistband|Use fusible interlining to stabilize the waistband.|用粘合衬稳定腰头。
面辅料|foam cup|海绵罩杯|removable foam cups|The style includes removable foam cups.|这款式配有可拆卸海绵罩杯。
设计与打样|technical sketch|技术款式图|an annotated technical sketch|Mark the construction details on the technical sketch.|在技术款式图上标注结构细节。
设计与打样|artwork|印花或图案稿|approved artwork|Use the approved artwork for the print strike-off.|印花试样使用已确认的图案稿。
设计与打样|colorway|配色；颜色方案|three colorways|The buyer selected three colorways.|买家选定了三种配色。
设计与打样|proto sample|初版样衣|a proto sample review|We will review the proto sample tomorrow.|我们明天评审初版样衣。
设计与打样|salesman sample|销售样；展示样|a salesman sample set|Prepare a salesman sample set for the buyer.|为买家准备一套销售样。
设计与打样|wear test|穿着测试|a wear test result|The wear test revealed an uncomfortable seam.|穿着测试发现有一条接缝不舒适。
设计与打样|pattern correction|纸样修正|pattern correction notes|Please apply the pattern correction notes.|请落实纸样修正意见。
设计与打样|drape|垂感；悬垂性|fabric drape|The buyer likes the soft drape of this fabric.|买家喜欢这款面料柔软的垂感。
裁剪与缝制|sewing line|缝制生产线|a balanced sewing line|The factory is balancing the sewing line.|工厂正在平衡缝制生产线。
裁剪与缝制|operation|工序|the next operation|Move the bundle to the next operation.|把这扎裁片移到下一道工序。
裁剪与缝制|stitch per inch|每英寸针数；针距|ten stitches per inch|Set the machine to ten stitches per inch.|将机器设为每英寸十针。
裁剪与缝制|SPI|每英寸针数缩写|the required SPI|Follow the required SPI in the sewing spec.|按缝制规格执行规定的针数。
裁剪与缝制|machine gauge|机器针距|a narrow machine gauge|Use a narrow machine gauge for this seam.|这条缝使用窄针距。
裁剪与缝制|needle size|针号|the correct needle size|Use the correct needle size for stretch fabric.|弹力面料使用正确针号。
裁剪与缝制|presser foot|压脚|a Teflon presser foot|Use a Teflon presser foot on the coated fabric.|涂层面料使用特氟龙压脚。
裁剪与缝制|thread breakage|断线|frequent thread breakage|Frequent thread breakage is slowing the line.|频繁断线正在拖慢生产线。
裁剪与缝制|raw edge|毛边；散口边|finish the raw edge|Finish the raw edge before attaching the binding.|安装包边前先处理毛边。
裁剪与缝制|clean finish|净边处理|a clean finish at the neckline|The neckline needs a cleaner finish.|领口需要更整洁的净边处理。
裁剪与缝制|seam slippage|缝口滑移|a seam slippage test|Run a seam slippage test on the woven fabric.|对梭织面料进行缝口滑移测试。
品质与测试|workmanship|工艺质量；做工|overall workmanship|The overall workmanship is below the approved sample.|整体做工低于已确认样品的水平。
品质与测试|critical defect|严重缺陷|a critical defect|A critical defect requires immediate escalation.|严重缺陷需要立即升级处理。
品质与测试|major defect|主要缺陷|a major defect rate|The major defect rate is above the limit.|主要缺陷率超过限值。
品质与测试|minor defect|次要缺陷|a minor defect|This loose thread is a minor defect.|这根线头属于次要缺陷。
品质与测试|measurement point|测量点|the measurement point diagram|Follow the measurement point diagram.|按测量点示意图执行。
品质与测试|inspection report|检验报告|a final inspection report|Send the final inspection report today.|今天发送尾期检验报告。
品质与测试|wash test|水洗测试|a wash test sample|Keep one garment for the wash test.|留一件衣服做水洗测试。
品质与测试|dimensional stability|尺寸稳定性|dimensional stability after washing|The fabric failed the dimensional stability test.|面料未通过水洗后的尺寸稳定性测试。
品质与测试|spirality|扭斜；斜纹变形|check spirality after washing|Check spirality after washing the jersey.|汗布水洗后检查扭斜。
品质与测试|pH value|酸碱值；pH 值|the required pH value|The test report must show the required pH value.|检测报告必须显示规定的 pH 值。
品质与测试|formaldehyde|甲醛|a formaldehyde test|The formaldehyde test result is acceptable.|甲醛测试结果合格。
品质与测试|azo dyes|偶氮染料|an azo dyes test|The fabric must pass the azo dyes test.|面料必须通过偶氮染料测试。
品质与测试|tensile strength|拉伸强力|a tensile strength test|The webbing needs a higher tensile strength.|织带需要更高的拉伸强力。
品质与测试|tear strength|撕裂强力|tear strength of the fabric|Check the tear strength before bulk cutting.|大货裁剪前检查面料撕裂强力。
采购与跟单|sample room|样衣间；样品室|the sample room schedule|Please check the sample room schedule.|请检查样品室排期。
采购与跟单|production plan|生产计划|an updated production plan|Share the updated production plan with the buyer.|把更新后的生产计划分享给买家。
采购与跟单|cut date|开裁日期|confirm the cut date|Confirm the cut date before booking the inspection.|预订验货前确认开裁日期。
采购与跟单|ex-factory date|出厂日期|the ex-factory date|The ex-factory date has moved forward by two days.|出厂日期提前了两天。
采购与跟单|overage|超额数量；多装数量|a two-percent overage|The supplier shipped a two-percent overage.|供应商多装了百分之二。
采购与跟单|shortage|短缺；少装数量|a carton shortage|Report any carton shortage immediately.|发现箱数短缺要立即报告。
包装与出货|gross weight|毛重|gross weight per carton|Record the gross weight per carton.|记录每箱毛重。
包装与出货|net weight|净重|net weight of the goods|The net weight must match the shipping documents.|净重必须与出货文件一致。
包装与出货|carton assortment|装箱配比|the approved carton assortment|Follow the approved carton assortment.|按已确认的装箱配比执行。
包装与出货|shipping mark|运输唛头|the shipping mark|Print the shipping mark on two sides of the carton.|在纸箱两面印上运输唛头。
包装与出货|ETD|预计离港日|the revised ETD|Please confirm the revised ETD.|请确认更新后的预计离港日。
包装与出货|ETA|预计到港日|the estimated ETA|The estimated ETA is next Monday.|预计到港日是下周一。
工作沟通|please clarify|请澄清|please clarify the comments|Please clarify the comments on the neckline.|请澄清关于领口的意见。
工作沟通|for your confirmation|请确认|send for your confirmation|I am sending the updated artwork for your confirmation.|现发送更新后的图案稿，请确认。
工作沟通|please take note|请注意|please take note of the change|Please take note of the change in fabric composition.|请注意面料成分的变化。
工作沟通|according to the spec|按照规格|work according to the spec|The factory must work according to the spec.|工厂必须按照规格生产。
工作沟通|pending approval|等待确认|pending buyer approval|Production is pending buyer approval.|生产正在等待买家确认。
工作沟通|ready for shipment|可以出货|the goods are ready for shipment|The goods are ready for shipment after inspection.|验货后货物可以出货。
服装通用商务|report|报告|a production report|Please send the production report every Friday.|请每周五发送生产报告。
服装通用商务|schedule|计划；日程|the sample schedule|The sample schedule has changed.|样品计划已经改变。
服装通用商务|deadline|截止日期|the approval deadline|We must meet the approval deadline.|我们必须赶上确认截止日期。
服装通用商务|project|项目|a new apparel project|The team is starting a new apparel project.|团队正在开始一个新的服装项目。
服装通用商务|department|部门|the product development department|Please copy the product development department.|请抄送产品开发部门。
服装通用商务|facility|工厂设施；生产场地|the production facility|The buyer will visit the production facility.|买家将参观生产场地。
服装通用商务|equipment|设备|production equipment|The factory upgraded its production equipment.|工厂升级了生产设备。
服装通用商务|policy|政策；规定|the quality policy|All suppliers must follow the quality policy.|所有供应商都必须遵守质量政策。
服装通用商务|procedure|流程；程序|the inspection procedure|Follow the inspection procedure step by step.|逐步遵循检验流程。
服装通用商务|memo|备忘录|a factory memo|The factory sent a memo about the holiday shutdown.|工厂发送了关于假期停产的备忘录。
服装通用商务|notice|通知|a production notice|We received a notice about the delivery delay.|我们收到了一份交货延误通知。
服装通用商务|announcement|公告|a company announcement|The company issued an announcement about the new factory.|公司发布了关于新工厂的公告。
服装通用商务|agenda|议程|the meeting agenda|The agenda includes fabric approval and capacity.|议程包括面料确认和产能。
服装通用商务|presentation|演示；介绍|a collection presentation|Prepare a presentation for the buyer.|为买家准备一份系列介绍。
服装通用商务|proposal|提案|a sourcing proposal|The supplier submitted a sourcing proposal.|供应商提交了一份采购提案。
服装通用商务|minutes|会议记录|the meeting minutes|Please circulate the meeting minutes today.|请今天传阅会议记录。
服装通用商务|attendee|参会者|a meeting attendee|Each attendee received the updated tech pack.|每位参会者都收到了更新后的技术资料包。
服装通用商务|exhibition|展览会|an apparel exhibition|The brand will show the collection at an apparel exhibition.|品牌将在服装展览会上展示系列产品。
服装通用商务|booth|展位|a trade show booth|The buyer visited our trade show booth.|买家参观了我们的贸易展展位。
服装通用商务|brochure|宣传册|a product brochure|Include the fabric details in the product brochure.|在产品宣传册中加入面料细节。
服装通用商务|feedback|反馈意见|buyer feedback|We need buyer feedback before revising the sample.|修改样衣前需要买家反馈。
服装通用商务|strategy|策略|a sourcing strategy|The team is reviewing the sourcing strategy.|团队正在审查采购策略。
服装通用商务|campaign|推广活动|a seasonal campaign|The new swimwear will support the summer campaign.|新泳装将配合夏季推广活动。
服装通用商务|invoice|发票|a commercial invoice|Check the commercial invoice against the purchase order.|按采购订单核对商业发票。
服装通用商务|budget|预算|the development budget|The development budget includes sample costs.|开发预算包括样品费用。
服装通用商务|expense|费用|a sample expense|Record every sample expense clearly.|清楚记录每一笔样品费用。
服装通用商务|payment|付款|the balance payment|The balance payment is due before shipment.|余款应在出货前支付。
服装通用商务|discount|折扣|a volume discount|The mill offered a volume discount.|面料厂提供了批量折扣。
服装通用商务|contract|合同|a manufacturing contract|The factory signed a manufacturing contract.|工厂签署了制造合同。
服装通用商务|profit|利润|the profit margin|The new fabric may reduce the profit margin.|新面料可能会降低利润率。
服装通用商务|revenue|收入；营业额|annual revenue|The brand's annual revenue increased.|品牌的年收入增加了。
服装通用商务|tax|税|import tax|The quotation excludes import tax.|报价不包含进口税。
服装通用商务|delivery|交付；配送|on-time delivery|On-time delivery is important for the launch.|准时交付对上市很重要。
服装通用商务|warehouse|仓库|the finished-goods warehouse|The finished goods are waiting in the warehouse.|成品正在仓库等待。
服装通用商务|inventory|库存|fabric inventory|Check the fabric inventory before placing an order.|下单前检查面料库存。
服装通用商务|vendor|供应商|an approved vendor|Use an approved vendor for the labels.|标签要使用认可的供应商。
服装通用商务|order|订单|a repeat order|The buyer placed a repeat order.|买家下了返单。
服装通用商务|catalog|产品目录|an online catalog|Add the new swimwear to the online catalog.|把新泳装加入线上产品目录。
服装通用商务|sample|样品|a sales sample|Send one sales sample to the buyer.|给买家寄一件销售样。
服装通用商务|replacement|替换品|a replacement garment|Please send a replacement garment for the damaged one.|请为损坏的衣服寄替换品。
服装通用商务|return|退货；退回|a return request|The retailer submitted a return request.|零售商提交了退货申请。
服装通用商务|supply chain|供应链|the apparel supply chain|Traceability is important in the apparel supply chain.|服装供应链的可追溯性很重要。
服装通用商务|tracking number|追踪号码|the courier tracking number|Share the courier tracking number after dispatch.|发出后分享快递追踪号码。
服装通用商务|shipping fee|运费|the shipping fee|The shipping fee is listed separately.|运费单独列出。
服装通用商务|bulk order|大批量订单|a bulk order|Do not accept a bulk order before capacity is confirmed.|产能确认前不要接受大批量订单。
服装通用商务|customer service|客户服务|the customer service team|Customer service recorded the size complaint.|客户服务团队记录了尺码投诉。
服装通用商务|market research|市场调研|swimwear market research|The brand conducted swimwear market research.|品牌进行了泳装市场调研。
服装通用商务|annual report|年度报告|the supplier's annual report|Review the supplier's annual report before approval.|确认前审查供应商的年度报告。
服装通用商务|product launch|产品上市|a product launch date|The product launch date moved to June.|产品上市日期改到六月。
服装通用商务|trade show|贸易展；展会|an international trade show|We will meet the buyer at the international trade show.|我们将在国际贸易展上见买家。
产品开发|garment|服装；成衣|a finished garment|Inspect every finished garment before packing.|包装前检查每件成衣。
产品开发|apparel|服装；服饰|the apparel business|She has ten years of experience in the apparel business.|她有十年服装行业经验。
产品开发|style|款式；款号|a new style|The buyer selected a new style for the collection.|买家为系列选了一款新款式。
产品开发|silhouette|廓形|a relaxed silhouette|The designer wants a relaxed silhouette.|设计师想要宽松廓形。
产品开发|collection|系列|the resort collection|The resort collection includes swimwear and cover-ups.|度假系列包括泳装和罩衫。
产品开发|season|季节；季度|the spring season|The spring season starts with bright colors.|春季系列以明亮颜色开场。
产品开发|design|设计|a functional design|The design must allow easy movement.|设计必须方便活动。
产品开发|fashion|时装；流行趋势|fashion trends|The team follows current fashion trends.|团队关注当前时装趋势。
产品开发|brand|品牌|the brand identity|The trim should match the brand identity.|辅料应与品牌形象一致。
产品开发|buyer|买家|the overseas buyer|The overseas buyer requested a new color.|海外买家要求增加一种新颜色。
产品开发|retailer|零售商|a major retailer|The retailer needs the goods before the holiday.|零售商需要在节日前收到货物。
产品开发|factory|工厂|the garment factory|The garment factory specializes in swimwear.|这家服装工厂专门生产泳装。
产品开发|workshop|车间；工作室|the sewing workshop|The sewing workshop is preparing the line.|缝制车间正在准备生产线。
产品开发|production floor|生产车间|the production floor|Visitors must wear shoes on the production floor.|访客在生产车间必须穿鞋。
产品开发|showroom|展厅|the showroom sample|The showroom sample must be pressed carefully.|展厅样衣必须仔细整烫。
产品开发|color|颜色|the approved color|The bulk color must match the approved color.|大货颜色必须符合确认颜色。
产品开发|color code|颜色代码|the buyer's color code|Use the buyer's color code on every document.|每份文件都使用买家的颜色代码。
产品开发|size|尺码|the size range|Confirm the size range before grading.|放码前确认尺码范围。
产品开发|measurement|尺寸；测量|a key measurement|Record each key measurement on the chart.|在尺寸表上记录每个关键尺寸。
产品开发|measurement chart|尺寸表|the measurement chart|Update the measurement chart after the fit session.|试身后更新尺寸表。
产品开发|garment length|衣长|the garment length|The garment length is two centimeters short.|衣长短了两厘米。
产品开发|body length|身长|the body length|Please increase the body length slightly.|请稍微增加身长。
产品开发|chest|胸围|the chest measurement|The chest measurement is within tolerance.|胸围尺寸在公差范围内。
产品开发|bust|胸围；胸部尺寸|the bust point|Mark the bust point on the pattern.|在纸样上标出胸点。
产品开发|waist|腰围|the waist measurement|The waist measurement is too loose.|腰围尺寸太松。
产品开发|hip|臀围|the hip measurement|Check the hip measurement on size L.|检查 L 码臀围尺寸。
产品开发|inseam|内长；裤内缝长|the inseam length|The inseam length must match the size chart.|内长必须符合尺码表。
产品开发|outseam|外长；裤外侧长度|the outseam measurement|Measure the outseam from the waistband.|从腰头测量外长。
产品开发|shoulder width|肩宽|the shoulder width|Reduce the shoulder width by half a centimeter.|肩宽减少半厘米。
产品开发|sleeve length|袖长|the sleeve length|The sleeve length differs between the two samples.|两件样衣的袖长不同。
产品开发|back length|后衣长|the back length|The back length should be longer than the front.|后衣长应比前面长。
产品开发|neck drop|领口深度|the front neck drop|Reduce the front neck drop for more coverage.|减少前领深度以增加遮盖。
产品开发|bottom opening|下口；裤脚口|the bottom opening|The bottom opening needs more stretch.|下口需要更大的弹力。
产品开发|leg length|裤腿长|the leg length|Please confirm the leg length on the tech pack.|请确认技术资料上的裤腿长。
产品开发|crotch length|裆长|the crotch length|The crotch length affects comfort.|裆长会影响舒适度。
产品开发|comfort|舒适性|wearing comfort|The new seam improves wearing comfort.|新接缝提高了穿着舒适性。
产品开发|mobility|活动性|freedom of mobility|The rash guard must provide freedom of mobility.|防护上衣必须保证活动自由。
产品开发|support|支撑力|bust support|The lining provides better bust support.|里布提供更好的胸部支撑。
产品开发|adjustability|可调节性|strap adjustability|The buyer requested more strap adjustability.|买家要求肩带有更强的可调节性。
产品开发|wearability|穿着实用性|everyday wearability|The design balances fashion and everyday wearability.|设计兼顾时尚和日常实用性。
面辅料|recycled fiber|再生纤维|recycled fiber content|The label must show the recycled fiber content.|标签必须标明再生纤维含量。
面辅料|natural fiber|天然纤维|a natural fiber blend|The natural fiber blend feels breathable.|天然纤维混纺面料感觉透气。
面辅料|synthetic fiber|合成纤维|a synthetic fiber|This synthetic fiber dries quickly.|这种合成纤维干得很快。
面辅料|blended fabric|混纺面料|a cotton-polyester blended fabric|The blended fabric is easy to care for.|混纺面料容易护理。
面辅料|microfiber|超细纤维|microfiber swimwear fabric|Microfiber gives the fabric a smooth surface.|超细纤维使面料表面顺滑。
面辅料|tricot|经编布；特里科经编布|tricot lining|Use tricot lining inside the swimsuit.|泳衣内侧使用经编里布。
面辅料|fleece|抓绒布|a fleece jacket|The fleece jacket needs anti-pilling treatment.|抓绒夹克需要抗起球处理。
面辅料|terry|毛圈布|terry fabric|Terry fabric absorbs water well.|毛圈布吸水性好。
面辅料|satin|缎面面料|a satin finish|The satin finish looks too shiny for this style.|这种缎面效果对这款式来说太亮。
面辅料|twill|斜纹布|cotton twill|Use cotton twill for the utility shorts.|工装短裤使用棉斜纹布。
面辅料|denim|牛仔布|stretch denim|The stretch denim must recover after washing.|弹力牛仔布水洗后必须恢复。
面辅料|poplin|府绸|cotton poplin|Cotton poplin is suitable for the shirt sample.|棉府绸适合做衬衫样。
面辅料|canvas|帆布|heavy canvas|The tote bag uses heavy canvas.|托特包使用厚帆布。
面辅料|chambray|青年布|a chambray shirt|The chambray shirt is lightweight.|青年布衬衫很轻薄。
面辅料|chiffon|雪纺|a chiffon overlay|The chiffon overlay needs a narrow hem.|雪纺罩层需要窄下摆。
面辅料|neoprene|氯丁橡胶；潜水料|neoprene fabric|Neoprene fabric gives the style structure.|氯丁面料能让款式保持立体感。
面辅料|scuba fabric|潜水布|scuba fabric panels|Use scuba fabric for the structured panels.|结构裁片使用潜水布。
面辅料|coated fabric|涂层面料|a coated fabric|Test the coated fabric for peeling.|测试涂层面料是否脱层。
面辅料|waterproof fabric|防水面料|waterproof fabric performance|The buyer asked for waterproof fabric performance data.|买家要求防水面料性能数据。
面辅料|breathable fabric|透气面料|a breathable fabric|Choose a breathable fabric for activewear.|运动服选择透气面料。
面辅料|moisture-wicking fabric|吸湿排汗面料|moisture-wicking fabric|The running top uses moisture-wicking fabric.|跑步上衣使用吸湿排汗面料。
面辅料|quick-dry fabric|速干面料|quick-dry fabric|The board shorts require quick-dry fabric.|冲浪短裤需要速干面料。
面辅料|UV-protective fabric|防紫外线面料|UV-protective fabric|The UV-protective fabric needs a valid test report.|防紫外线面料需要有效检测报告。
面辅料|anti-bacterial finish|抗菌整理|an anti-bacterial finish|The anti-bacterial finish must be supported by testing.|抗菌整理必须有检测支持。
面辅料|brushed finish|磨毛整理|a brushed finish|The brushed finish makes the fabric softer.|磨毛整理使面料更柔软。
面辅料|peach finish|桃皮绒整理|a peach finish|The peach finish gives a soft touch.|桃皮绒整理带来柔软触感。
面辅料|calendaring|轧光整理|calendaring treatment|Calendaring treatment changes the fabric surface.|轧光整理会改变面料表面。
面辅料|coating|涂层|a polyurethane coating|The polyurethane coating must be even.|聚氨酯涂层必须均匀。
面辅料|lamination|复合；贴膜|fabric lamination|Check fabric lamination for bubbles.|检查面料复合是否有气泡。
面辅料|dyeing|染色|bulk dyeing|Bulk dyeing starts after lab dip approval.|色样确认后开始大货染色。
面辅料|pigment print|涂料印花|a pigment print|The pigment print needs a soft hand feel.|涂料印花需要柔软手感。
面辅料|sublimation print|升华印花|a sublimation print|Sublimation print works well on polyester.|升华印花适合涤纶面料。
面辅料|embroidery|刺绣|an embroidery logo|Check the embroidery logo for loose threads.|检查刺绣标志是否有线头。
面辅料|appliqué|贴布绣；布贴|an appliqué detail|The appliqué detail must be securely attached.|布贴细节必须牢固连接。
面辅料|heat transfer|热转印|a heat transfer logo|The heat transfer logo must not crack after washing.|热转印标志水洗后不能开裂。
面辅料|screen print|丝网印花|a screen print|The screen print is centered on the front panel.|丝网印花位于前片中央。
面辅料|digital print|数码印花|a digital print file|Send the digital print file in high resolution.|发送高分辨率数码印花文件。
面辅料|woven label|织唛|a woven label|Sew the woven label into the side seam.|把织唛缝在侧缝中。
面辅料|printed label|印唛|a printed label|The printed label must show the fiber content.|印唛必须标明纤维成分。
面辅料|size label|尺码唛|a size label|Attach the size label at the center back.|把尺码唛缝在后中位置。
面辅料|care symbol|洗护符号|the correct care symbol|Use the correct care symbol on the label.|标签上使用正确的洗护符号。
面辅料|eyelet|鸡眼；气眼|metal eyelets|Check the metal eyelets for sharp edges.|检查金属气眼是否有锋利边缘。
面辅料|rivet|铆钉|a decorative rivet|The decorative rivet must not damage the fabric.|装饰铆钉不能损伤面料。
裁剪与缝制|CAD pattern|CAD 纸样|a CAD pattern file|Send the CAD pattern file to the factory.|把 CAD 纸样文件发给工厂。
裁剪与缝制|marker making|排料制作|marker making efficiency|Improve marker making efficiency to save fabric.|提高排料制作效率以节省面料。
裁剪与缝制|nesting|排料嵌套|automatic nesting|Automatic nesting reduces fabric waste.|自动排料嵌套可以减少面料浪费。
裁剪与缝制|fabric spreading|铺布|fabric spreading quality|Check fabric spreading quality before cutting.|裁剪前检查铺布质量。
裁剪与缝制|cutting table|裁剪台|the cutting table|Keep the cutting table clean and flat.|保持裁剪台干净平整。
裁剪与缝制|straight knife|直刀裁剪机|a straight knife|Use a straight knife for the bulk lay.|大货布床使用直刀裁剪机。
裁剪与缝制|band knife|带刀裁剪机|a band knife|The band knife needs regular maintenance.|带刀裁剪机需要定期维护。
裁剪与缝制|die cutting|刀模冲裁|die cutting for foam cups|Use die cutting for the foam cups.|海绵罩杯使用刀模冲裁。
裁剪与缝制|rotary cutter|圆刀|a rotary cutter|Use a rotary cutter for small pieces.|小裁片使用圆刀。
裁剪与缝制|drill mark|钻孔定位点|a drill mark|Add a drill mark for the pocket position.|为口袋位置增加钻孔定位点。
裁剪与缝制|cut piece|裁片|a numbered cut piece|Keep every cut piece with its bundle.|每片裁片都要和裁片扎放在一起。
裁剪与缝制|fusing|粘合|fusing temperature|Check the fusing temperature and pressure.|检查粘合温度和压力。
裁剪与缝制|bundling|分扎；捆扎|cutting bundle bundling|Accurate bundling prevents size mixing.|准确分扎可以防止尺码混淆。
裁剪与缝制|sewing machine|缝纫机|a sewing machine|Clean the sewing machine at the end of the shift.|下班时清洁缝纫机。
裁剪与缝制|overlock machine|包缝机|an overlock machine|Adjust the overlock machine before sewing stretch fabric.|缝弹力面料前调整包缝机。
裁剪与缝制|coverstitch machine|绷缝机|a coverstitch machine|The coverstitch machine needs the correct needle.|绷缝机需要使用正确的针。
裁剪与缝制|bartack machine|打枣机|a bartack machine|Use a bartack machine at the strap joint.|肩带接头使用打枣机。
裁剪与缝制|buttonhole machine|锁眼机|a buttonhole machine|The buttonhole machine must be set correctly.|锁眼机必须正确设定。
裁剪与缝制|button attaching machine|钉扣机|a button attaching machine|Check the button attaching machine before production.|生产前检查钉扣机。
裁剪与缝制|flatbed machine|平车|a flatbed machine|Use a flatbed machine for the side seam.|侧缝使用平车。
裁剪与缝制|cylinder-bed machine|筒式机|a cylinder-bed machine|The cylinder-bed machine is useful for narrow openings.|筒式机适合缝制窄小开口。
裁剪与缝制|feed dog|送布牙|the feed dog|Clean the feed dog to prevent uneven feeding.|清洁送布牙，防止送布不均。
裁剪与缝制|bobbin|梭芯；底线梭|a full bobbin|Replace the bobbin before it runs out.|梭芯用完前更换。
裁剪与缝制|needle plate|针板|the needle plate|The needle plate has a scratch.|针板有一道划痕。
裁剪与缝制|seam guide|缝边导向器|a seam guide|Use a seam guide to keep the width even.|使用缝边导向器保持宽度一致。
裁剪与缝制|thread stand|线架|the thread stand|The thread stand must be stable.|线架必须稳定。
裁剪与缝制|machine speed|机器速度|reduce machine speed|Reduce machine speed around the curve.|经过曲线处降低机器速度。
裁剪与缝制|line balancing|生产线平衡|sewing line balancing|Line balancing can reduce waiting time.|生产线平衡可以减少等待时间。
裁剪与缝制|operation bulletin|工序单|the operation bulletin|Follow the operation bulletin at each station.|每个工位都要按工序单操作。
裁剪与缝制|work study|工时研究|a work study|The factory completed a work study for the new style.|工厂完成了新款式的工时研究。
裁剪与缝制|cycle time|单件工时|the cycle time|Record the cycle time for each operation.|记录每道工序的单件工时。
裁剪与缝制|operator|操作工|a sewing operator|The sewing operator checked the seam guide.|缝纫操作工检查了缝边导向器。
裁剪与缝制|helper|辅助工|a line helper|The line helper prepared the bundles.|生产线辅助工准备了裁片扎。
裁剪与缝制|inline sewing|在线缝制|inline sewing inspection|Inline sewing inspection catches defects early.|在线缝制检验能及早发现缺陷。
裁剪与缝制|needle guard|护针装置|a needle guard|The machine must have a working needle guard.|机器必须有正常工作的护针装置。
裁剪与缝制|machine maintenance|机器维护|regular machine maintenance|Regular machine maintenance prevents breakdowns.|定期机器维护可以防止故障。
裁剪与缝制|oil stain|油污|an oil stain|Remove the oil stain before pressing.|整烫前去除油污。
裁剪与缝制|loose thread|线头|loose thread trimming|Loose thread trimming is part of final finishing.|剪线头是后整的一部分。
品质与测试|inline inspection|在线检验|an inline inspection|The inline inspection found a seam issue.|在线检验发现了接缝问题。
品质与测试|end-line inspection|尾道检验|an end-line inspection|Complete the end-line inspection before packing.|包装前完成尾道检验。
品质与测试|final audit|最终审核|a final factory audit|The buyer scheduled a final factory audit.|买家安排了最终工厂审核。
品质与测试|quality standard|质量标准|the buyer's quality standard|The factory follows the buyer's quality standard.|工厂遵循买家的质量标准。
品质与测试|measurement check|尺寸检查|a measurement check|Do a measurement check on every size.|每个尺码都进行尺寸检查。
品质与测试|defect map|疵点分布图|a defect map|Mark every defect on the defect map.|在疵点分布图上标记每个缺陷。
品质与测试|color standard|颜色标准|the approved color standard|The lab dip must match the color standard.|色样必须符合颜色标准。
品质与测试|shade band|色差范围样|a shade band|Keep a shade band for bulk inspection.|保留色差范围样用于大货检验。
品质与测试|lab test|实验室测试|a lab test|The fabric needs a lab test before approval.|面料确认前需要做实验室测试。
品质与测试|physical test|物理性能测试|a physical test|The physical test covers strength and shrinkage.|物理性能测试包括强力和缩水。
品质与测试|chemical test|化学测试|a chemical test|The chemical test checks restricted substances.|化学测试检查限制物质。
品质与测试|restricted substances|限制物质|a restricted substances list|The supplier must follow the restricted substances list.|供应商必须遵循限制物质清单。
品质与测试|RSL|限制物质清单缩写|the brand RSL|The test report must meet the brand RSL.|检测报告必须符合品牌的限制物质清单。
品质与测试|REACH|欧盟化学品法规|REACH compliance|The chemical finish must meet REACH compliance.|化学整理必须符合 REACH 法规。
品质与测试|CPSIA|美国消费品安全法规|CPSIA testing|Children's apparel may require CPSIA testing.|儿童服装可能需要 CPSIA 测试。
品质与测试|OEKO-TEX|OEKO-TEX 纺织品认证|an OEKO-TEX certificate|Please provide an OEKO-TEX certificate for the fabric.|请提供面料的 OEKO-TEX 证书。
品质与测试|BSCI|商业社会责任倡议|a BSCI audit|The factory completed a BSCI audit.|工厂完成了 BSCI 审核。
品质与测试|SMETA|Sedex 会员道德贸易审核|a SMETA audit|The buyer requested a recent SMETA audit.|买家要求近期的 SMETA 审核。
品质与测试|social compliance|社会责任合规|social compliance requirements|The factory must meet social compliance requirements.|工厂必须符合社会责任要求。
品质与测试|factory audit|工厂审核|a factory audit report|Send the factory audit report to the buyer.|把工厂审核报告发给买家。
品质与测试|code of conduct|行为准则|the supplier code of conduct|All vendors must sign the supplier code of conduct.|所有供应商都必须签署供应商行为准则。
品质与测试|traceability|可追溯性|material traceability|Material traceability is required for this order.|这个订单要求材料可追溯。
品质与测试|material certificate|材料证书|a material certificate|The mill sent a material certificate.|面料厂发送了材料证书。
品质与测试|test method|测试方法|the approved test method|Use the approved test method in the report.|报告中使用批准的测试方法。
品质与测试|acceptance criteria|验收标准|the acceptance criteria|Review the acceptance criteria before inspection.|检验前审查验收标准。
品质与测试|inspection level|检验水平|the inspection level|Confirm the inspection level with the buyer.|与买家确认检验水平。
品质与测试|defect point|缺陷分值|the defect point system|The inspector uses the defect point system.|检验员使用缺陷分值系统。
品质与测试|color approval|颜色确认|written color approval|Get written color approval before dyeing.|染色前取得书面颜色确认。
品质与测试|print approval|印花确认|print approval comments|The factory is waiting for print approval comments.|工厂正在等待印花确认意见。
品质与测试|fit approval|版型确认|fit approval|Bulk cutting starts after fit approval.|版型确认后开始大货裁剪。
品质与测试|water resistance|防水性|water resistance testing|The jacket needs water resistance testing.|夹克需要防水性测试。
品质与测试|chlorine test|耐氯测试|a chlorine test|Run a chlorine test on the swimwear fabric.|对泳装面料进行耐氯测试。
品质与测试|lightfastness|耐光色牢度|lightfastness testing|The outdoor style needs lightfastness testing.|户外款需要耐光色牢度测试。
品质与测试|color migration|颜色迁移|color migration after washing|Check color migration after washing.|水洗后检查颜色迁移。
品质与测试|abrasion resistance|耐磨性|abrasion resistance|The seat panel needs better abrasion resistance.|座面裁片需要更好的耐磨性。
品质与测试|stretch test|拉伸测试|a stretch test|The elastic needs a stretch test.|松紧带需要进行拉伸测试。
品质与测试|recovery test|回复性测试|a recovery test|Complete a recovery test after repeated stretching.|反复拉伸后完成回复性测试。
采购与跟单|sourcing|采购寻源|fabric sourcing|Fabric sourcing starts after the design review.|设计评审后开始面料寻源。
采购与跟单|product development|产品开发|product development timeline|The product development timeline is tight.|产品开发时间表很紧。
采购与跟单|target price|目标价格|the target price|The quotation is above the target price.|报价高于目标价格。
采购与跟单|price negotiation|价格谈判|price negotiation with the mill|Price negotiation with the mill is ongoing.|正在与面料厂进行价格谈判。
采购与跟单|payment term|付款条件|the payment term|Confirm the payment term in the contract.|在合同中确认付款条件。
采购与跟单|deposit|定金；预付款|a production deposit|The factory needs a production deposit before booking fabric.|订面料前工厂需要生产定金。
采购与跟单|balance payment|尾款|the balance payment date|Confirm the balance payment date.|确认尾款日期。
采购与跟单|production order|生产订单|a confirmed production order|Do not cut without a confirmed production order.|没有确认的生产订单不要开裁。
采购与跟单|order confirmation|订单确认|the order confirmation|Send the order confirmation by email.|通过邮件发送订单确认。
采购与跟单|material booking|材料预订|material booking status|Please update the material booking status.|请更新材料预订状态。
采购与跟单|fabric booking|面料预订|fabric booking|Fabric booking must follow the approved color.|面料预订必须按照已确认颜色进行。
采购与跟单|trim booking|辅料预订|trim booking|Trim booking starts after the BOM is approved.|物料清单确认后开始辅料预订。
采购与跟单|delivery schedule|交期计划|the delivery schedule|The delivery schedule must be realistic.|交期计划必须切合实际。
采购与跟单|production status|生产状态|the latest production status|Share the latest production status today.|今天分享最新生产状态。
采购与跟单|vessel booking|订舱|vessel booking|Vessel booking must be made before the deadline.|必须在截止日期前订舱。
采购与跟单|freight forwarder|货运代理|the freight forwarder|The freight forwarder confirmed the pickup.|货运代理确认了提货。
采购与跟单|customs clearance|清关|customs clearance documents|Prepare the customs clearance documents.|准备清关文件。
采购与跟单|commercial invoice|商业发票|a commercial invoice|The commercial invoice must show the correct value.|商业发票必须显示正确货值。
采购与跟单|certificate of origin|原产地证|a certificate of origin|The buyer requested a certificate of origin.|买家要求原产地证。
采购与跟单|bill of lading|提单|the bill of lading|Send a copy of the bill of lading after sailing.|开船后发送提单副本。
采购与跟单|airway bill|空运单|the airway bill|Check the consignee on the airway bill.|核对空运单上的收货人。
采购与跟单|container|集装箱|a 40-foot container|The order will fill one 40-foot container.|这个订单可以装满一个 40 英尺集装箱。
采购与跟单|container loading|装柜|container loading plan|Follow the container loading plan.|按照装柜计划执行。
采购与跟单|carton quantity|每箱数量|carton quantity|Confirm the carton quantity by size.|按尺码确认每箱数量。
采购与跟单|cubic meter|立方米|the total cubic meter|Calculate the total cubic meter before booking.|订舱前计算总立方米。
采购与跟单|port|港口|the loading port|Confirm the loading port on the booking.|确认订舱上的装货港。
采购与跟单|booking deadline|订舱截止时间|the booking deadline|We must meet the booking deadline.|我们必须赶上订舱截止时间。
采购与跟单|late shipment|延迟出货|a late shipment|The buyer charged a fee for the late shipment.|买家因延迟出货收取费用。
采购与跟单|partial shipment|分批出货|a partial shipment|The buyer approved a partial shipment.|买家批准分批出货。
采购与跟单|back order|延期订单；欠单|a back order|The missing size will be shipped as a back order.|缺少的尺码将作为欠单出货。
采购与跟单|claim|索赔；投诉|a quality claim|The retailer filed a quality claim.|零售商提出了质量索赔。
采购与跟单|compensation|赔偿|a compensation request|The buyer sent a compensation request.|买家发送了赔偿要求。
采购与跟单|supplier evaluation|供应商评估|an annual supplier evaluation|Complete an annual supplier evaluation.|完成年度供应商评估。
采购与跟单|approved factory|认可工厂|an approved factory list|Use only factories on the approved factory list.|只使用认可工厂名单中的工厂。
采购与跟单|factory profile|工厂资料|an updated factory profile|Please send an updated factory profile.|请发送更新后的工厂资料。
采购与跟单|capacity plan|产能计划|the monthly capacity plan|The monthly capacity plan must include overtime.|月度产能计划必须包括加班安排。
采购与跟单|production calendar|生产日历|the production calendar|Mark holidays on the production calendar.|在生产日历上标出假期。
采购与跟单|launch date|上市日期|the confirmed launch date|The confirmed launch date cannot move.|已确认的上市日期不能变更。
采购与跟单|purchase forecast|采购预测|the seasonal purchase forecast|The mill needs the seasonal purchase forecast.|面料厂需要季节采购预测。
采购与跟单|reorder|补单；再订购|a reorder quantity|Confirm the reorder quantity.|确认补单数量。
采购与跟单|stock level|库存水平|the current stock level|Check the current stock level before production.|生产前检查当前库存水平。
采购与跟单|deadstock|呆料；滞销库存|deadstock fabric|The factory found deadstock fabric in the warehouse.|工厂在仓库发现了呆料面料。
采购与跟单|surplus fabric|剩余面料|surplus fabric|Record the surplus fabric after cutting.|裁剪后记录剩余面料。
采购与跟单|fabric swatch|面料小样|a fabric swatch card|Send a fabric swatch card to the buyer.|给买家寄一张面料小样卡。
采购与跟单|trim card|辅料卡|the trim card|Update the trim card after changing the buckle.|更换扣具后更新辅料卡。
采购与跟单|color card|色卡|the approved color card|Keep the approved color card in the sample room.|在样品室保留已确认色卡。
工作沟通|based on the comments|根据意见|revise based on the comments|Please revise the sample based on the comments.|请根据意见修改样衣。
工作沟通|confirm the revised measurements|确认修改后的尺寸|confirm the revised measurements|Please confirm the revised measurements before cutting.|裁剪前请确认修改后的尺寸。
工作沟通|hold the shipment|暂缓出货|hold the shipment|Please hold the shipment until we approve the report.|报告确认前请暂缓出货。
工作沟通|release the order|放行订单|release the order|We can release the order after approval.|确认后我们可以放行订单。
工作沟通|keep me posted|随时告知我进展|keep me posted|Please keep me posted on the production status.|请随时告知我生产进度。
工作沟通|check with the factory|与工厂确认|check with the factory|Please check with the factory and reply today.|请与工厂确认后今天回复。
工作沟通|share the latest status|分享最新状态|share the latest status|Please share the latest status before the call.|请在电话会议前分享最新状态。
工作沟通|meet the target price|达到目标价|meet the target price|Can the supplier meet the target price?|供应商能达到目标价格吗？
工作沟通|arrange a fit session|安排试身|arrange a fit session|Please arrange a fit session next Tuesday.|请安排下周二试身。
工作沟通|send photos for review|发送照片供审核|send photos for review|Send photos for review before dispatch.|发货前发送照片供审核。
工作沟通|approve the color|确认颜色|approve the color|Please approve the color before bulk dyeing.|大货染色前请确认颜色。
工作沟通|revise the artwork|修改图案稿|revise the artwork|Please revise the artwork according to the comments.|请根据意见修改图案稿。
工作沟通|confirm the fabric booking|确认面料预订|confirm the fabric booking|Please confirm the fabric booking today.|请今天确认面料预订。
工作沟通|follow the packing instructions|按照包装说明|follow the packing instructions|The factory must follow the packing instructions.|工厂必须按照包装说明操作。
工作沟通|report the defects|报告缺陷|report the defects|Report the defects by style and size.|按款式和尺码报告缺陷。
工作沟通|separate the defective pieces|分开不良品|separate the defective pieces|Separate the defective pieces before rework.|返工前分开不良品。
工作沟通|replace the damaged goods|更换损坏货物|replace the damaged goods|Please replace the damaged goods before shipment.|出货前请更换损坏货物。
工作沟通|schedule the inspection|安排检验|schedule the inspection|We need to schedule the inspection this week.|我们需要本周安排检验。
工作沟通|book the vessel|订船；订舱|book the vessel|Please book the vessel before Friday.|请在周五前订舱。
工作沟通|provide test results|提供测试结果|provide test results|Please provide test results for the new fabric.|请提供新面料的测试结果。
工作沟通|arrange corrective action|安排纠正措施|arrange corrective action|The factory must arrange corrective action quickly.|工厂必须快速安排纠正措施。
工作沟通|avoid mixed sizes|避免混尺码|avoid mixed sizes|Please avoid mixed sizes in one carton.|请避免一箱混装不同尺码。
工作沟通|label each bundle|给每扎贴标签|label each bundle|Label each bundle with the style and size.|给每扎贴上款号和尺码标签。
工作沟通|keep the same shade|保持同一色光|keep the same shade|Keep the same shade within one garment.|同一件衣服要保持同一色光。
工作沟通|do not mix dye lots|不要混用染色批次|do not mix dye lots|Do not mix dye lots in the same order.|同一订单内不要混用不同染色批次。
工作沟通|confirm the carton count|确认箱数|confirm the carton count|Please confirm the carton count before pickup.|提货前请确认箱数。
工作沟通|send the shipping documents|发送出货文件|send the shipping documents|Send the shipping documents after dispatch.|发货后发送出货文件。
工作沟通|close the open issues|关闭未解决事项|close the open issues|We need to close the open issues before shipment.|出货前需要解决所有未完成事项。
工作沟通|follow up with the supplier|跟进供应商|follow up with the supplier|I will follow up with the supplier tomorrow.|我明天会跟进供应商。
服装通用商务|manufacturer|制造商；生产商|an apparel manufacturer|The apparel manufacturer opened a new production line.|这家服装制造商开设了一条新生产线。
服装通用商务|package|包裹；包装件|a sample package|The sample package arrived this morning.|样品包裹今天上午到了。
服装通用商务|maintenance|维护；保养|machine maintenance|Regular maintenance keeps the machines running.|定期维护能让机器正常运转。
服装通用商务|repair|维修；修理|a machine repair|The machine repair delayed the sewing line.|机器维修耽误了缝制生产线。
服装通用商务|installation|安装|equipment installation|Equipment installation will finish tomorrow.|设备安装明天完成。
服装通用商务|account|账户；客户账目|the supplier account|The finance team checked the supplier account.|财务团队核对了供应商账目。
服装通用商务|balance|余额；差额|the account balance|Please confirm the account balance.|请确认账户余额。
服装通用商务|statement|账单；结算单|a supplier statement|The supplier statement lists all payments.|供应商结算单列出所有付款。
服装通用商务|refund|退款|a refund request|The retailer requested a refund for the shortage.|零售商因短装要求退款。
服装通用商务|receipt|收据|a payment receipt|Keep the payment receipt with the order file.|把付款收据与订单文件放在一起。
服装通用商务|reimbursement|报销|a travel reimbursement|Submit the travel reimbursement with the receipts.|连同收据提交差旅报销。
服装通用商务|estimate|估价；预估|a cost estimate|The factory sent a cost estimate for the new style.|工厂发送了新款式的成本预估。
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

