<?php

//页面信息设置----------------------------------------------------------------------------------------------------------

    $jumbotronImgUrl = 'http://127.0.0.1/lining/Kaze-no-Toorimichi/image/jumbotron_nature.jpg'; // 横幅图片地址
    $jumbotronImgAlt = '旅行'; // 横幅图片alt
	$summaryCHN = '旅行'; // 该主题中文简介
	$summaryJPN = '旅行'; // 该主题日文简介

    $aListGroupTitle = array("鉄道文化");
	$aListGroupUrl = array("url0");
    $aListGroupDesCHN = array("鉄道文化");
    $aListGroupDesJPN = array("鉄道文化");

    $sStylesheet = ''; // 该页可选样式表

    $namespace = 'tour'; // 该页命名空间


//显示页面内容----------------------------------------------------------------------------------------------------------
    require_once('pageModuleClass/SubjectPage.class.php');
	$subjectPage = new SubjectPage();

	$subjectPage->displayHead($namespace, $sStylesheet);
	$subjectPage->displayJumbotron($jumbotronImgUrl, $jumbotronImgAlt, $summaryCHN, $summaryJPN);
	$subjectPage->displayListGroup( $aListGroupTitle, $aListGroupUrl, $aListGroupDesCHN, $aListGroupDesJPN );
	$subjectPage->displayFoot();

?>