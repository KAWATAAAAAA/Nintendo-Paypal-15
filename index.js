
(async () => {
	function nintendoSayFuck() {
		/* 提前进入页面等待，并拿到按钮类，确保这个按钮是支付按钮 */
		let dom = document.querySelector(".o_c-button01__shape") // 任天堂支付按钮
		
		if(!dom){
			alert('不存在支付节点')
			return 
		}

		let time = new Date()
		let h = time.getHours()
		let m = time.getMinutes() 
		let s = time.getSeconds()
		// 十点开秒
		if(h === 10 && m === 0 && s === 0){
			let next = () => {
				dom.click()
			}
			// 查云闪付接口
			getPaypalCanuse(next)
			return
		}
		window.requestAnimationFrame(nintendoSayFuck)
	}

	window.requestAnimationFrame(nintendoSayFuck)
})()

async function getPaypalCanuse(next){
	/* 抓包自行修改 */
	let params = {
		"couponno": "230207106177",
		"couponType": "07",
		"merchantNo": null,
		"language": "zh",
		"insCode": "299990156",
		"type": "ucsp"
	}
	/* 云闪付接口 */
	const request = () => {
		return fetch("https://marketing.unionpayintl.com/h5Promote/v1/coupon/getCoupon", {
			method: "POST",
		    headers: {
		      'Content-Type': 'application/json',
		    },
			body: JSON.stringify(params)
		})
		.then(response => response.json())
		.then((res) => {
			console.log('活动剩余百分比', res.percent)
			/* 信心指数 ，如果你够猛，可以写成 1%的时候也进行支付 */
			if (res.percent > 30) {
				/* 点支付按钮 */
				next()
			} else {
				request()
			}
		})
	}
	request()
}