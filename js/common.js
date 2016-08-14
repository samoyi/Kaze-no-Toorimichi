

define(function ()
{
	//ajax发送get请求，回调函数可以设置两个参数
	var AjaxGet = function(sURL, fnCallback)
	{	
		var xhr = new XMLHttpRequest();
		xhr.addEventListener('readystatechange', function()
		{	
			if (xhr.readyState == 4)
		    {	
				if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304)
		        {	
					fnCallback(xhr.responseText, xhr.responseXML);
		        }
				else 
				{
					throw new Error( "AjaxGet函数未能取到数据。错误代码： " + xhr.status);
		        }
		    }
		}, false);
		xhr.open("get", sURL, true);
		xhr.send(null);
	}



　　return { 
		AjaxGet : AjaxGet
	 };
});