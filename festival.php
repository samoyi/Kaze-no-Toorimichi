<?php

//页面信息设置----------------------------------------------------------------------------------------------------------

    $jumbotronImgUrl = 'http://127.0.0.1/lining/Kaze-no-Toorimichi/image/jumbotron_nature.jpg'; // 横幅图片地址
    $jumbotronImgAlt = '祭'; // 横幅图片alt
	$summaryCHN = '祭'; // 该主题中文简介
	$summaryJPN = '祭 https://ja.wikipedia.org/wiki/%E6%97%A5%E6%9C%AC%E3%81%AE%E7%A5%AD%E4%B8%80%E8%A6%A7'; // 该主题日文简介

    $aListGroupTitle = array("村落", "建筑|建物", "料理", "庭園", "土産", "姓氏|名字");
	$aListGroupUrl = array("url0", "url1", "url2", "url3", "url4");
    $aListGroupDesCHN = array("北海道地方", "東北地方", "関東地方", "中部地方", "近畿地方", "中国地方", "四国地方", "九州地方");
    $aListGroupDesJPN = array("北海道地方", "東北地方", "関東地方", "中部地方", "近畿地方", "中国地方", "四国地方", "九州地方");

    $sStylesheet = ''; // 该页可选样式表

    $namespace = 'festival'; // 该页命名空间


//显示页面内容----------------------------------------------------------------------------------------------------------
    require_once('pageModuleClass/SubjectPage.class.php');
	$subjectPage = new SubjectPage();

	$subjectPage->displayHead($namespace, $sStylesheet);
	$subjectPage->displayJumbotron($jumbotronImgUrl, $jumbotronImgAlt, $summaryCHN, $summaryJPN);
	$subjectPage->displayListGroup( $aListGroupTitle, $aListGroupUrl, $aListGroupDesCHN, $aListGroupDesJPN );
	$subjectPage->displayFoot();

?>