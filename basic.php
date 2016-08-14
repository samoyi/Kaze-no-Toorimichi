<?php

//页面信息设置----------------------------------------------------------------------------------------------------------

    $jumbotronImgUrl = 'http://127.0.0.1/lining/nippon/image/jumbotron_nature.jpg'; // 横幅图片地址
    $jumbotronImgAlt = '日本知识'; // 横幅图片alt
	$summaryCHN = '日本位于东亚，由日本列岛（北海道、本州、四国、九州及其附属岛）、西南诸岛及小笠原诸岛组成的岛国。<br /><br />日本列岛有人类居住的历史，可以追溯到大约3万到10万年前。'; // 该主题中文简介
	$summaryJPN = '日本国（にっぽんこく、にほんこく）、または日本（にっぽん、にほん）は、東アジアに位置する日本列島（北海道・本州・四国・九州の主要四島およびそれに付随する島々）及び、南西諸島・小笠原諸島などの諸島嶼から成る島国である。<br /><br />日本列島における人類の歴史は、次第に人が住み始めた約10万年前以前ないし約3万年前に始まったとされる。'; // 该主题日文简介

    $aListGroupTitle = array("山", "森", "川", "湖", "海", "岛", "编年史", "地域史", "名城史", "汉字史");
    $aListGroupDesCHN = array("山简介", "森简介", "川简介", "湖简介", "海简介", "岛简介", "编年史简介", "地域史简介", "名城史简介", "汉字史简介");
    $aListGroupDesJPN = array("山简介日语", "森简介日语", "川简介日语", "湖简介日语", "海简介日语", "岛简介日语", "编年史简介日语", "地域史简介日语", "名城史简介日语", "汉字史简介日语");

    $sStylesheet = '<link href="http://127.0.0.1/lining/nippon/css/subject.css" type="text/css" rel="stylesheet" />'; // 该页可选样式表

    $namespace = 'basic'; // 该页命名空间


//显示页面内容----------------------------------------------------------------------------------------------------------
    require_once('pageModuleClass/SubjectPage.class.php');
	$subjectPage = new SubjectPage();

	$subjectPage->displayHead($namespace, $sStylesheet);
	$subjectPage->displayJumbotron($jumbotronImgUrl, $jumbotronImgAlt, $summaryCHN, $summaryJPN);
	$subjectPage->displayListGroup( $aListGroupTitle, $aListGroupDesCHN, $aListGroupDesJPN );
	$subjectPage->displayFoot();

?>