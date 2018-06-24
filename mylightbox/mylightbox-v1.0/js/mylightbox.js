(function($){
	var LightBox = function(lightbox) {
		
		var _this_ = this;
		// 保存单个lightbox组件
		this.lightbox = lightbox;
		// 默认配置参数
		this.config = {
			// 弹框的默认高度
			"boxHeight" : 600,
			// 弹框的默认宽度
			"boxWidth" : 800,
			// 页面显示的缩略图默认高度
			"thumbnailWidth" : 80,
			// 页面显示的缩略图默认宽度
			"thumbnailHeight" : 80
		};
		
		var userConfig = lightbox.config;
		if (userConfig) { // 如果传入了用户设置，则使用用户设置；否则使用默认配置
			$.extend(this.config, userConfig);
		}
		
		var imgObj = lightbox.imgObj; // 需要有图片预览功能的img对象（jquery对象）
		imgObj.width(this.config.thumbnailWidth).height(this.config.thumbnailHeight); // 设置缩略图大小
		// 设置图片点击后显示预览图
		imgObj.click(function() {
			_this_.invoke($(this), _this_.config);
		});
	};
	
	LightBox.prototype = {		
		// 事件驱动方法
		invoke : function(imgObj, config) {
			var _this_ = this;
			// 存放图片信息的对象	
			this.imgInfo = this.getImgInfo(imgObj[0].src, config);
			var promptHtml = '<div><div id="light" class="white_content">'
				+ '<div class="close"><a class="removePrompt" href="javascript:void(0)">关闭</a>&nbsp;<a class="resetPosition" href="javascript:void(0)">重置</a>'
				+ '&nbsp;<a class="downloadImg" href="javascript:void(0)">下载</a></div>'
				+ '<div class="con"></div></div>'
				+ '<div id="fade" class="black_overlay"></div></div>';
			
			var imgHtml = '<img id="lightImg" class="ui-content" src="' + this.imgInfo.imgPath + '"/>';
			var $imgHtml = $(imgHtml).width(this.imgInfo.imgActualWidth).height(this.imgInfo.imgActualHeight);
			var $promptHtml = $(promptHtml);
			
			var $whiteContent = $promptHtml.find(".white_content");
			var $con = $promptHtml.find(".con");
			// 设置自定义的弹框高宽
			$whiteContent.width(config.boxWidth).height(config.boxHeight);
			$con.width(config.boxWidth).height(config.boxHeight);
			$imgHtml.appendTo($con);
			
			var $body = $("body");
			$promptHtml.appendTo($body);
			
			// 设置提示框的样式
			var returnData = this.promptPosition($promptHtml);
			this.imgInfo.imgOriginTop = returnData.imgOriginTop;
			this.imgInfo.imgOriginLeft = returnData.imgOriginLeft;
			
			// 绑定事件
			$promptHtml.find(".resetPosition").off("click").on("click", function() { // 重置按钮
				_this_.revertImg($promptHtml, _this_.imgInfo);
			});
			$promptHtml.find(".removePrompt").off("click").on("click", function() { // 关闭按钮
				$promptHtml.remove();
			});
			$promptHtml.find(".downloadImg").off("click").on("click", function() { // 下载按钮
				_this_.downloadImg(_this_.imgInfo.imgPath);
			});
			
			this.showPrompt($promptHtml);
		},
		
		// 显示提示框
		showPrompt : function(promptObject) {
			var $whiteContent = promptObject.find(".white_content");
			var $blackOverlay = promptObject.find(".black_overlay");
			$whiteContent.show();
			$blackOverlay.show();
		},
		
		// 对需要显示的提示框的样式进行初始化操作
		promptPosition : function(promptObject, imgActualHeight, imgActualWidth) {
			
			var _this_ = this;

			// 设置提示框水平垂直居中
			var $whiteContent = promptObject.find(".white_content");
			var $con = $whiteContent.find(".con"); // 存放图片内容区
			var $close = $whiteContent.find(".close"); // 存放“关闭，重置”按钮区
			
			var leftDistance = ($(window).width() - $whiteContent.outerWidth(false)) / 2;
			var topDistance = ($(window).height() - $whiteContent.outerHeight(false)) / 2;
			$whiteContent.css({"left":leftDistance,"top":topDistance});
			
			// 添加在div范围内的鼠标滚轮事件 窗口滚动 http://www.xwcms.net/js/tpdm/57423.html
			// 鼠标滚动 https://blog.csdn.net/u011627980/article/details/51354895
			var $lightImg = $whiteContent.find(".ui-content");
			$whiteContent.on("mousewheel", function(event, delta){
				var imgWidth = $lightImg.width() * (1 + 0.1 * delta);
				var imgHeight = $lightImg.height() * (1 + 0.1 * delta);
				$lightImg.width(imgWidth).height(imgHeight);
				_this_.setImgCenterPosition($lightImg, $close, $con);
			});
			
			// 设置待显示图片在提示框居中
			var data = this.setImgCenterPosition($lightImg, $close, $con);
			
			// 设置图片可以拖拽
			$lightImg.draggable({scroll: true});
			
			// 记录图片的初始位置
			var returnObj = new Object();
			returnObj.imgOriginTop = data.top;
			returnObj.imgOriginLeft = data.left;
			return returnObj;
		},
		
		// 设置图片在父容器中水平垂直居中显示
		setImgCenterPosition : function(imgObj, closeObj, parentObj) {
			var imgOriginTop = (parentObj.outerHeight() - closeObj.outerHeight() - imgObj.outerHeight())/2;
			var imgOriginLeft = (parentObj.outerWidth() - imgObj.outerWidth())/2;
			var data = {"top" : imgOriginTop, "left" : imgOriginLeft};
			imgObj.css(data);
			return data;
		},
		
		// 下载图片 这个只能在chrome上用，firefox，IE都不行（https://blog.csdn.net/universsky2015/article/details/77965818）
		downloadImg : function(imgPath) {
			var imgFileName = imgPath.substring(imgPath.lastIndexOf("/")+1); // 获取图片文件名
			var $a = $("<a></a>").attr("href", imgPath).attr("download", imgFileName);
			$a[0].click();
		},
		
		// 将图片恢复至初始大小，和原始位置
		revertImg : function(promptObject, imgInfo) {
			var $lightImg = promptObject.find(".ui-content");
			if ($lightImg.height() != imgInfo.imgActualHeight
				|| $lightImg.width() != imgInfo.imgActualWidth
				|| parseInt($lightImg.css("top")) != imgInfo.imgOriginTop
				|| parseInt($lightImg.css("left")) != imgInfo.imgOriginLeft) {
					$lightImg.animate({
					"height" : imgInfo.imgActualHeight,
					"width" : imgInfo.imgActualWidth,
			        "top": imgInfo.imgOriginTop,
			        "left": imgInfo.imgOriginLeft
			   });
			}
		},
		
		// 获取图片信息
		getImgInfo : function(imgPath, config) {
			// 获取显示弹框的宽高
			var boxHeight = config.boxHeight;
			var boxWidth = config.boxWidth;
			
			var imgObj = $("<img/>", {"src" : imgPath})[0];
			
			// 获取图片的真实宽高
			var imgRealHeight = imgObj.height;
			var imgRealWidth = imgObj.width;
			
			// 计算图片适应提示框大小后呈现的宽高
			var imgActualHeight;
			var imgActualWidth;
		    if (imgRealHeight / imgRealWidth >= boxHeight / boxWidth) {
		    	imgActualHeight = imgRealHeight > boxHeight ? boxHeight : imgRealHeight;
		    	imgActualWidth = imgActualHeight / imgRealHeight * imgRealWidth;
		    } else {
		    	imgActualWidth = imgRealWidth > boxWidth ? boxWidth : imgRealWidth;
		    	imgActualHeight = imgActualWidth / imgRealWidth * imgRealHeight;
		    }
			
			var returnObj = new Object();
			returnObj.imgPath = imgPath;
			returnObj.imgRealHeight = imgRealHeight;
			returnObj.imgRealWidth = imgRealWidth;
			returnObj.imgActualHeight = imgActualHeight;
			returnObj.imgActualWidth = imgActualWidth;
			
			return returnObj;
		},
	};
	
	// 插件供外部调用的两种写法
	// 方法一：
	LightBox.init = function(lightboxes) {
		
		var _this_ = this;
		var imgObjs = lightboxes.imgObj;
		var config = lightboxes.config;
		
		imgObjs.each(function() {
			new _this_({
				imgObj : $(this),
				config : config
			});
		});
		
	};
	window.LightBox = LightBox;
	
	// 方法二：注册成jq方法
	$.fn.extend({
		lightbox : function(config){
			this.each(function(){
				new LightBox({
					imgObj : $(this),
					config : config
				});
			});
			return this;
		}
	});
}(jQuery));