<?php

//页面信息设置----------------------------------------------------------------------------------------------------------

    $jumbotronImgUrl = 'http://127.0.0.1/lining/Kaze-no-Toorimichi/image/jumbotron_nature.jpg'; // 横幅图片地址
    $jumbotronImgAlt = '禅与佛 禅と仏'; // 横幅图片alt
	$summaryCHN = '这里说的禅并非是佛教的宗派'; // 该主题中文简介
	$summaryJPN = '这里说的禅并非是佛教的宗派'; // 该主题日文简介

    $aListGroupTitle = array("艺术", "禅院", "茶", "料理", "职人", "特产");
	$aListGroupUrl = array("url0", "url1", "url2", "url3", "url4", "url5");
    $aListGroupDesCHN = array("艺术简介", "禅院简介", "茶简介", "料理简介", "职人简介", "特产简介");
    $aListGroupDesJPN = array("艺术简介日语", "禅院简介日语", "茶简介日语", "料理简介日语", "职人简介日语", "特产简介日语");

    $sStylesheet = ''; // 该页可选样式表

    $namespace = 'zen'; // 该页命名空间


//显示页面内容----------------------------------------------------------------------------------------------------------
    require_once('pageModuleClass/SubjectPage.class.php');
	$subjectPage = new SubjectPage();

	$subjectPage->displayHead($namespace, $sStylesheet);
	$subjectPage->displayJumbotron($jumbotronImgUrl, $jumbotronImgAlt, $summaryCHN, $summaryJPN);
	$subjectPage->displayListGroup( $aListGroupTitle, $aListGroupUrl, $aListGroupDesCHN, $aListGroupDesJPN );
	$subjectPage->displayFoot();

?>