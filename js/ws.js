var socket = io.connect('http://192.168.188.90:3000/')
let msgbox = [];

$('#button').on('click', function () {
	sendMsg()
})
$(document).keyup(function(event){
	if(event.keyCode ==13){
		sendMsg()
	}
})


var sendMsg = () => {
	let inputValue = $('#inputValue').val()
	if (inputValue == '') {
		alert('请输入内容')
		return
	}
	socket.emit('chat', inputValue);
	$('#inputValue').val('')
}


socket.on('message', data => {
	console.log(data);
});

socket.on('chat', function (msg) {
	var el = createScreenbullet(msg)
	addInterval(el)
});

/*
* 弹幕
* */
var createScreenbullet = msg => {
	var dom = $(`<span>${msg}</span>`)
	var color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`
	var fontsize = `${Math.floor(Math.random() + 1) * 50}px`
	var top = `${Math.floor(Math.random() * 500)}px`
	var left = $(".message_container").width() + "px";
	dom.css({
		'position': 'absolute',
		top,
		left,
		color,
		'font-size': fontsize
	})
	$('#message_container').append(dom);
	return dom
}

//定时器
var addInterval = (dom) => {
	var left = dom.offset().left - $(".message_container").offset().left;
	var timer = setInterval(function () {
		left--;
		dom.css("left", left + "px");
		if (dom.offset().left + dom.width() < $(".message_container").offset().left) {
			dom.remove();
			clearInterval(timer);
		}
	}, 5);
	msgbox.push(timer);
}























