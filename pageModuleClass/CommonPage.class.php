<?php

class CommonPage
{
	
	//定义页面内容————————————————————————————————————————————————————————————————————————————————————————————
	//protected $commonPageData;
	protected $title = "風の通り道";
	protected $keywords = "日本文化, 日本民俗, 日本自然";
	protected $description = "日本自然民俗文化资料库データベース";
	protected $aNavLinkFileName = array("index", "basic", "shinto", "zen", "legend", "custom", "festival", "nature", "tour", "bbs");
	protected $aNavLinkName = array("首页|トップ", "基礎知識","神道", "禅", "传说|伝説", "風物", "祭", "自然", "旅行", "BBS");


    //通用函数、构造函数等———————————————————————————————————————————————————————————————————————————————————————
	public function __set($name, $value)
	{
		$this->name = $value;
	}

	public function isCurrentPage($ur)
	{
		if( strpos( $_SERVER['PHP_SELF'], $url ) == false )
		{
			return false;
		}
		else
		{
			return true;
		}
	}

	

	//页面显示——————————————————————————————————————————————————————————————————————————————————————————————

    //通用的头部----------------------------------------------------------------------------------------------------------------------------

	//显示头部菜单。该函数在displayHead中被调用
	protected  function displayHeadNavList()
	{
		$len = sizeof($this->aNavLinkFileName);
		$sLists = "";
		$currentUrl = $_SERVER['PHP_SELF'];
		$active = "";
		for($i=0; $i<$len; $i++)
		{
		    // 循环所有菜单项连接的文件名对比当前页地址，确定当前页头部哪个菜单项应该高亮显示
			if( strpos($currentUrl, $this->aNavLinkFileName[$i]) === (strrpos($currentUrl, "/")+1) )
			{
				$active = ' active';
			}
			$sLists .= '<li class="nav-item">
					<a class="nav-link' . $active . '" href="http://127.0.0.1/lining/Kaze-no-Toorimichi/' . $this->aNavLinkFileName[$i] . '.php">' . $this->aNavLinkName[$i] . '</a>
			</li>';
			$active = '';
		}
		return $sLists;
	}

    //显示头部。在这个函数中调用displayHeadNavList()
    //第一个可选参数为整个页面提供命名空间，如果一组同级页面使用同一个样式表，则需要该参数
    //第二个可选参数可以传入一个或多个样式表标签字符串
	public function displayHead($namespace="", $sStylesheet="")
	{
		$header = '<html>
					<head>
						<meta charset="utf-8">
						<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
						<meta name="keywords" content="' . $this->keywords . '">
						<meta name="description" content="' . $this->description . '">
						<title>' . $this->title . '</title>
						<link href="http://127.0.0.1/lining/Kaze-no-Toorimichi/bootstrap-4.0.0-alpha.2/css/bootstrap.css" type="text/css" rel="stylesheet" />
						<link href="http://127.0.0.1/lining/Kaze-no-Toorimichi/css/common.css" type="text/css" rel="stylesheet" />
						' . $sStylesheet . '
						</head>
						<body>
							<section class="container namespace-' . $namespace . '">
								<nav class="navbar bg-faded">
                                    <button class="navbar-toggler hidden-sm-up pull-xs-right" type="button" data-toggle="collapse" data-target="#navbar-header" aria-controls="navbar-header">
                                      ☰
                                    </button>
                                    <div class="collapse navbar-toggleable-xs" id="navbar-header">
                                        <ul class="nav navbar-nav  nav-pills">' . $this->displayHeadNavList() .
                                        '</ul>
                                    </div>
                                  </nav>
								<main>
								';
		echo $header;
	}



    //通用的底部----------------------------------------------------------------------------------------------------------------------------

	//显示底部
	public function displayFoot()
	{
		$footer = '	</main>
					<footer>底部底部底部底部底部底部底部底部底部底部底部底底部底部底部底部底部底部底部部底部底部底部底部底部底部底部底部底部底部底部底部底部底部底部底部</footer>
				</section>
				</body>
				<script src="http://127.0.0.1/lining/Kaze-no-Toorimichi/bootstrap-4.0.0-alpha.2/dependencies/jquery-2.2.4.min.js"></script>
                <script src="http://127.0.0.1/lining/Kaze-no-Toorimichi/bootstrap-4.0.0-alpha.2/dependencies/tether.min.js"></script>
  				<script data-main="js/main" src="js/require.js"></script>
  				<script src="http://127.0.0.1/lining/Kaze-no-Toorimichi/bootstrap-4.0.0-alpha.2/js/bootstrap.js"></script>
				</html>';
		echo $footer;
	}
}
?>