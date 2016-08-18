<?php

//页面信息设置----------------------------------------------------------------------------------------------------------

    $jumbotronImgUrl = 'http://127.0.0.1/lining/Kaze-no-Toorimichi/image/jumbotron_nature.jpg'; // 横幅图片地址
    $jumbotronImgAlt = '風物'; // 横幅图片alt
	$summaryCHN = '風物'; // 该主题中文简介
	$summaryJPN = '風物'; // 该主题日文简介

    $aListGroupTitle = array("村落", "建筑|建物", "料理", "庭園", "土産", "姓氏|名字");
	$aListGroupUrl = array("url0", "url1", "url2", "url3", "url4");
    $aListGroupDesCHN = array("村落简介", "建筑简介", "料理简介", "庭園简介", "土産简介", "姓氏简介");
    $aListGroupDesJPN = array("村落简介日语", "建物简介日语", "料理简介日语", "庭園简介日语", "土産简介日语", "名字简介");

    $sStylesheet = ''; // 该页可选样式表

    $namespace = 'custom'; // 该页命名空间


//显示页面内容----------------------------------------------------------------------------------------------------------
    require_once('pageModuleClass/SubjectPage.class.php');
	$subjectPage = new SubjectPage();

	$subjectPage->displayHead($namespace, $sStylesheet);
	$subjectPage->displayJumbotron($jumbotronImgUrl, $jumbotronImgAlt, $summaryCHN, $summaryJPN);
	$subjectPage->displayListGroup( $aListGroupTitle, $aListGroupUrl, $aListGroupDesCHN, $aListGroupDesJPN );
	$subjectPage->displayFoot();

?>