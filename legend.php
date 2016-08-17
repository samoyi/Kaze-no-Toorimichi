<?php

//页面信息设置----------------------------------------------------------------------------------------------------------

    $jumbotronImgUrl = 'http://127.0.0.1/lining/Kaze-no-Toorimichi/image/jumbotron_nature.jpg'; // 横幅图片地址
    $jumbotronImgAlt = '传说|伝説'; // 横幅图片alt
	$summaryCHN = '自然民俗相关的传说'; // 该主题中文简介
	$summaryJPN = '自然民俗にかんれんする伝説'; // 该主题日文简介

    $aListGroupTitle = array("妖怪", "観光地", "料理", "活动|行事", "土産");
    $aListGroupDesCHN = array("妖怪简介", "観光地简介", "料理简介", "活动简介", "土産简介");
    $aListGroupDesJPN = array("妖怪简介日语", "観光地简介日语", "料理简介日语", "活动简介日语", "土産简介日语");

    $sStylesheet = ''; // 该页可选样式表

    $namespace = 'legend'; // 该页命名空间


//显示页面内容----------------------------------------------------------------------------------------------------------
    require_once('pageModuleClass/SubjectPage.class.php');
	$subjectPage = new SubjectPage();

	$subjectPage->displayHead($namespace, $sStylesheet);
	$subjectPage->displayJumbotron($jumbotronImgUrl, $jumbotronImgAlt, $summaryCHN, $summaryJPN);
	$subjectPage->displayListGroup( $aListGroupTitle, $aListGroupDesCHN, $aListGroupDesJPN );
	$subjectPage->displayFoot();

?>