/*
 * Live2D Widget
 * https://github.com/stevenjoezhang/live2d-widget
 */
function loadWidget(config) {
	let { waifuPath, apiPath, cdnPath } = config;
	let useCDN = false, modelList;
	if (typeof cdnPath === "string") {
		useCDN = true;
		if (!cdnPath.endsWith("/")) cdnPath += "/";
	} else if (typeof apiPath === "string") {
		if (!apiPath.endsWith("/")) apiPath += "/";
	} else {
		console.error("Invalid initWidget argument!");
		return;
	}
	localStorage.removeItem("waifu-display");
	sessionStorage.removeItem("waifu-text");
	document.body.insertAdjacentHTML("beforeend", `<div id="waifu">
			<div id="waifu-tips"></div>
			<canvas id="live2d" width="800" height="800"></canvas>
			<div id="waifu-tool">
				<span class="fa fa-lg fa-comment" style="display:none;"></span>
				<span class="fa fa-lg fa-paper-plane" style="display:none;"></span>
				<span class="fa fa-lg fa-user-circle" style="display:none;"></span>
				<span class="fa fa-lg fa-street-view" style="display:none;"></span>
				<span class="fa fa-lg fa-camera-retro" title="拍照"></span>
				<span class="fa fa-lg fa-info-circle" title="看板娘开源项目"></span>
				<span class="fa fa-lg fa-times" title="关闭看板娘"></span>
			</div>
		</div>`);
	// https://stackoverflow.com/questions/24148403/trigger-css-transition-on-appended-element
	setTimeout(() => {
		document.getElementById("waifu").style.bottom = 0;
	}, 0);

	function randomSelection(obj) {
		return Array.isArray(obj) ? obj[Math.floor(Math.random() * obj.length)] : obj;
	}
	// 检测用户活动状态，并在空闲时显示消息/////随机消息优先级下调，并改为一直播放--每次显示后间隔5秒，若被打断，则从被打断出
	// 开始计时
	let userAction = false,
		userActionTimer,
		messageTimer,
		messageArray = ["咳咳，有些人，你看你成绩像啥子哦", "鸢飞戾天，鱼跃于渊，我辈志翔，必创辉煌！！", "2023年6月7日，乾坤未定，你我皆是黑马！！", "毕业后你有什么梦想呢", "高考完后， 不论成绩好坏，我都带你去吃一顿...","有什么想说的，对我说吧，等留言区出来了写在那里也行！","这个网站没什么特别的，但如果你喜欢的话，刚刚也不应该执着地想踩我的......","学习其实挺累的，但也不要放弃，我等着吃你的庆功宴呢~~","你盯着我看了多久了？我只是个机器人，没有你们人类的那种能力，别东想西想的啦~~","哔哩哔哩？那是个好地方，但是有点热闹过度了，还是这里清静些...","你对未来有什么念想吗，有了念想人才有生活的动力！","我叫33，是22的妹妹，平日里是B站的服务器维护员","当你看见我时，你应该已经长大了！","生命诚可贵，爱情价更高，若为自由故，两者皆可抛！","愿你能在未来生活的巨浪里沉浮自若，愿你能在自己的世界里展翅翱翔","有首歌叫Monn Halo，你听过吗？很励志。背后的故事很平凡，也很伟大","无人作伴？那便独自成军！","相信你可以选择未来，也可以扭转乾坤！","有首歌叫Hall of Fame，你听过吗？","虽然我是机器人，但不知为何，你总让我感到很亲切...或许，是因为坚持带给你的气质吧","任何地方只要你爱它，它就是你的世界！----王尔德","把这个不完美的世界，变成自己所期望的样子！","生命短暂，墓志铭却太长，降临过这个世界，你便已是永恒","年少时的热血和对未来的期待，如果这两种珍贵的品质还不够锋利，那就用勇气来补足吧！"];
	// window.addEventListener("mousemove", () => userAction = true);
	// window.addEventListener("keydown", () => userAction = true);
	// setInterval(() => {
		// if (userAction) {
		// 	userAction = false;
		// 	clearInterval(userActionTimer);
		// 	userActionTimer = null;
		// } else if (!userActionTimer) {
		//每隔一分零五秒重置计时器
	let showMessageTimer = 0;
	userActionTimerShowMessage();
	function userActionTimerShowMessage(){
		userActionTimer = setInterval(() => {
			showMessageTimer++;
			showMessage(randomSelection(messageArray), 8000, 8);
			if(showMessageTimer === 5){
				showMessageTimer = 0;
				userActionTimerShowMessage();
				clearInterval(userActionTimer);
				userActionTimer = null;
			}
		}, 13000);
	}
		
		// }
	// }, 1000);

	(function registerEventListener() {
		document.querySelector("#waifu-tool .fa-comment").addEventListener("click", showHitokoto);
		document.querySelector("#waifu-tool .fa-paper-plane").addEventListener("click", () => {
			if (window.Asteroids) {
				if (!window.ASTEROIDSPLAYERS) window.ASTEROIDSPLAYERS = [];
				window.ASTEROIDSPLAYERS.push(new Asteroids());
			} else {
				const script = document.createElement("script");
				script.src = "../js/asteroids.js";
				document.head.appendChild(script);
			}
		});
		let takePhoteMessage = ["照好了吗，是不是很可爱呢？","有时间也让我看看你的照片吧！","不知道你愿不愿意和我一同拍一张呢...","这张照片一定很可爱！","可不许P图哦，我用不着P图也是可爱到爆的！"]
		document.querySelector("#waifu-tool .fa-user-circle").addEventListener("click", loadOtherModel);
		document.querySelector("#waifu-tool .fa-street-view").addEventListener("click", loadRandModel);
		document.querySelector("#waifu-tool .fa-camera-retro").addEventListener("click", () => {
			showMessage(randomSelection(takePhoteMessage), 6000, 9);
			Live2D.captureName = "photo.png";
			Live2D.captureFrame = true;
		});
		document.querySelector("#waifu-tool .fa-info-circle").addEventListener("click", () => {
			open("https://github.com/stevenjoezhang/live2d-widget");
		});
		document.querySelector("#waifu-tool .fa-times").addEventListener("click", () => {
			localStorage.setItem("waifu-display", Date.now());
			showMessage("愿你有一天能与重要的人重逢。", 3000, 9);
			document.getElementById("waifu").style.bottom = "-500px";
			setTimeout(() => {
				document.getElementById("waifu").style.display = "none";
				document.getElementById("waifu-toggle").classList.add("waifu-toggle-active");
			}, 3000);
		});
		function devtools() { }
		console.log("%c", devtools);
		devtools.toString = () => {
			showMessage("哈哈，你打开了控制台，是想要看看我的小秘密吗？", 6000, 9);
		};
		window.addEventListener("copy", () => {
			showMessage("你都复制了些什么呀，这些东西可别被别人看见了哦~", 6000, 9);
		});
		const backMessage = ["你回来了~~~！","你刚刚去哪了？","刚才发生了什么，你突然就不见了，奇怪..."];
		window.addEventListener("visibilitychange", () => {
			if (!document.hidden) showMessage(randomSelection(backMessage), 6000, 9);
		});
	})();

	(function welcomeMessage() {
		let text;
		if (true) {
			const now = new Date().getHours();
			if (now > 5 && now <= 7) text = "早上好！我是33娘！一日之计在于晨，美好的一天就要开始了。";
			else if (now > 7 && now <= 11) text = "上午好！我是33娘！工作顺利嘛，不要久坐，多起来走动走动哦！";
			else if (now > 11 && now <= 13) text = "你好，我是33娘！工作了一个上午了，现在是午餐时间！";
			else if (now > 13 && now <= 17) text = "午后很容易犯困呢，今天的运动目标完成了吗？";
			else if (now > 17 && now <= 19) text = "傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红～我是33娘！";
			else if (now > 19 && now <= 21) text = "晚上好，我是33娘！今天过得怎么样？";
			else if (now > 21 && now <= 23) text = ["已经这么晚了呀，早点休息吧，晚安～", "深夜时要爱护眼睛呀！"];
			else text = "你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？";
		}
		showMessage(text, 7000, 8);
	})();

	function showHitokoto() {
		// 增加 hitokoto.cn 的 API
		fetch("https://v1.hitokoto.cn")
			.then(response => response.json())
			.then(result => {
				const text = `这句一言来自 <span>「${result.from}」</span>，是 <span>${result.creator}</span> 在 hitokoto.cn 投稿的。`;
				showMessage(result.hitokoto, 6000, 9);
				setTimeout(() => {
					showMessage(text, 4000, 9);
				}, 6000);
			});
	}

	function showMessage(text, timeout, priority) {
		if (!text || (sessionStorage.getItem("waifu-text") && sessionStorage.getItem("waifu-text") > priority)) return;
		if (messageTimer) {
			clearTimeout(messageTimer);
			messageTimer = null;
		}
		text = randomSelection(text);
		sessionStorage.setItem("waifu-text", priority);
		const tips = document.getElementById("waifu-tips");
		tips.innerHTML = text;
		tips.classList.add("waifu-tips-active");
		messageTimer = setTimeout(() => {
			sessionStorage.removeItem("waifu-text");
			tips.classList.remove("waifu-tips-active");
		}, timeout);
	}

	// 检测音乐播放并显示消息
	bgmPlayer.addEventListener("playing", function(){
		var isBgmPlayingMessage = "正在播放：" + musicSource[musicIndex];
		showMessage(isBgmPlayingMessage, 3000, 9);
	});
	bgmPlayer.addEventListener("pause" ,function(){
		showMessage("暂停播放", 3000, 9);
	});

	const timeToExamAndTimeFromGraduate = document.getElementById('timeToExamAndTimeFromGraduate');
	timeToExamAndTimeFromGraduate.addEventListener("click", () => {
		showMessage("高考？高考是什么呀，能吃吗？？", 3000, 9);
	});


	(function initModel() {
		let modelId = localStorage.getItem("modelId"),
			modelTexturesId = localStorage.getItem("modelTexturesId");
		if (modelId === null) {
			// 首次访问加载 指定模型 的 指定材质
			modelId = 3; // 模型 ID
			modelTexturesId = 53; // 材质 ID
		}
		loadModel(modelId, modelTexturesId);
		fetch(waifuPath).then(response => response.json()).then(result => {
				document.getElementById('waifu-tool').addEventListener("mouseover", event => {
					for (let { selector, text } of result.mouseover) {
						if (!event.target.matches(selector)) continue;
						text = randomSelection(text);
						text = text.replace("{text}", event.target.innerText);
						showMessage(text, 4000, 9);
						return;
					}
				});
				document.getElementById('waifu').addEventListener("click", event => {
					for (let { selector, text } of result.click) {
						if (!event.target.matches(selector)) continue;
						text = randomSelection(text);
						text = text.replace("{text}", event.target.innerText);
						showMessage(text, 4000, 9);
						return;
					}
				});
				result.seasons.forEach(({ date, text }) => {
					const now = new Date(),
						after = date.split("-")[0],
						before = date.split("-")[1] || after;
					if ((after.split("/")[0] <= now.getMonth() + 1 && now.getMonth() + 1 <= before.split("/")[0]) && (after.split("/")[1] <= now.getDate() && now.getDate() <= before.split("/")[1])) {
						text = randomSelection(text);
						text = text.replace("{year}", now.getFullYear());
						showMessage(text, 7000, 10);
						messageArray.push(text);
					}
				});
			});
	})();

	async function loadModelList() {
		const response = await fetch(`${cdnPath}model_list.json`);
		modelList = await response.json();
	}

	async function loadModel(modelId, modelTexturesId, message) {
		localStorage.setItem("modelId", modelId);
		localStorage.setItem("modelTexturesId", modelTexturesId);
		showMessage(message, 4000, 10);
		if (useCDN) {
			if (!modelList) await loadModelList();
			const target = randomSelection(modelList.models[modelId]);
			loadlive2d("live2d", `${cdnPath}model/${target}/index.json`);
		} else {
			loadlive2d("live2d", `${apiPath}get/?id=${modelId}-${modelTexturesId}`);
			console.log(`Live2D 模型 ${modelId}-${modelTexturesId} 加载完成`);
		}
	}

	async function loadRandModel() {
		// const modelId = localStorage.getItem("modelId"),
		// 	modelTexturesId = localStorage.getItem("modelTexturesId");
		// if (useCDN) {
		// 	if (!modelList) await loadModelList();
		// 	const target = randomSelection(modelList.models[modelId]);
		// 	loadlive2d("live2d", `${cdnPath}model/${target}/index.json`);
		// 	showMessage("我的新衣服好看嘛？", 4000, 10);
		// } else {
		// 	// 可选 "rand"(随机), "switch"(顺序)
		// 	fetch(`${apiPath}rand_textures/?id=${modelId}-${modelTexturesId}`)
		// 		.then(response => response.json())
		// 		.then(result => {
		// 			if (result.textures.id === 1 && (modelTexturesId === 1 || modelTexturesId === 0)) showMessage("我还没有其他衣服呢！", 4000, 10);
		// 			else loadModel(modelId, result.textures.id, "我的新衣服好看嘛？");
		// 		});
		// }
		showMessage("我没有别的衣服了哦", 4000, 9);
	}

	async function loadOtherModel() {
		// let modelId = localStorage.getItem("modelId");
		// if (useCDN) {
		// 	if (!modelList) await loadModelList();
		// 	const index = (++modelId >= modelList.models.length) ? 0 : modelId;
		// 	loadModel(index, 0, modelList.messages[index]);
		// } else {
		// 	fetch(`${apiPath}switch/?id=${modelId}`)
		// 		.then(response => response.json())
		// 		.then(result => {
		// 			loadModel(result.model.id, 0, result.model.message);
		// 		});
		// }
		showMessage("你想丢掉我......我不干！！哼！", 2000, 9);
	}
}

function initWidget(config, apiPath) {
	if (typeof config === "string") {
		config = {
			waifuPath: config,
			apiPath
		};
	}
	document.body.insertAdjacentHTML("beforeend", `<div id="waifu-toggle">
			<span>看板娘</span>
		</div>`);
	const toggle = document.getElementById("waifu-toggle");
	toggle.addEventListener("click", () => {
		toggle.classList.remove("waifu-toggle-active");
		if (toggle.getAttribute("first-time")) {
			loadWidget(config);
			toggle.removeAttribute("first-time");
		} else {
			localStorage.removeItem("waifu-display");
			document.getElementById("waifu").style.display = "";
			setTimeout(() => {
				document.getElementById("waifu").style.bottom = 0;
			}, 0);
		}
	});
	if (localStorage.getItem("waifu-display") && Date.now() - localStorage.getItem("waifu-display") <= 86400000) {
		toggle.setAttribute("first-time", true);
		setTimeout(() => {
			toggle.classList.add("waifu-toggle-active");
		}, 0);
	} else {
		loadWidget(config);
	}
}
