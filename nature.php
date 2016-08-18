<?php

//页面信息设置----------------------------------------------------------------------------------------------------------

    $jumbotronImgUrl = 'http://127.0.0.1/lining/Kaze-no-Toorimichi/image/jumbotron_nature.jpg'; // 横幅图片地址
    $jumbotronImgAlt = '自然'; // 横幅图片alt
	$summaryCHN = '自然'; // 该主题中文简介
	$summaryJPN = '自然'; // 该主题日文简介

    $aListGroupTitle = array("村落", "建筑|建物", "料理", "庭園", "土産", "姓氏|名字");
	$aListGroupUrl = array("url0", "url1", "url2", "url3", "url4");
    $aListGroupDesCHN = array("天文学简介", "農業简介", "气候简介");
    $aListGroupDesJPN = array("天文学简介日语", "農業简介日语", "気候简介日语");

    $sStylesheet = ''; // 该页可选样式表

    $namespace = 'nature'; // 该页命名空间


//显示页面内容----------------------------------------------------------------------------------------------------------
    require_once('pageModuleClass/SubjectPage.class.php');
	$subjectPage = new SubjectPage();

	$subjectPage->displayHead($namespace, $sStylesheet);
	$subjectPage->displayJumbotron($jumbotronImgUrl, $jumbotronImgAlt, $summaryCHN, $summaryJPN);
	$subjectPage->displayListGroup( $aListGroupTitle, $aListGroupUrl, $aListGroupDesCHN, $aListGroupDesJPN );
	$subjectPage->displayFoot();

?>