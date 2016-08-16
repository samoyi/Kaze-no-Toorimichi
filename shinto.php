<?php

//页面信息设置----------------------------------------------------------------------------------------------------------

    $jumbotronImgUrl = 'http://127.0.0.1/lining/Kaze-no-Toorimichi/image/jumbotron_nature.jpg'; // 横幅图片地址
    $jumbotronImgAlt = '神道'; // 横幅图片alt
	$summaryCHN = '所谓日本神话的传承，是以《古事记》《日本书纪》和各地《风土记》为主。因此情节主要是围绕着高天原的众神展开，有来源的文献很有限。'; // 该主题中文简介
	$summaryJPN = '日本神話と呼ばれる伝承はほとんどが、『古事記』、『日本書紀』および各『風土記』の記述による。そのため高天原の神々が中心となっているが、出典となる文献は限られる。'; // 该主题日文简介

    $aListGroupTitle = array("神話", "場所", "祭り", "風俗", "職業", "特産品");
    $aListGroupDesCHN = array("所谓日本神话的传承，是以《古事记》《日本书纪》和各地《风土记》为主。因此情节主要是围绕着高天原的众神展开，有来源的文献很有限。", "场所简介", "祭简介", "民俗简介", "职业简介", "特产简介");
    $aListGroupDesJPN = array("日本神話と呼ばれる伝承はほとんどが、『古事記』、『日本書紀』および各『風土記』の記述による。そのため高天原の神々が中心となっているが、出典となる文献は限られる。", "场所简介", "祭简介", "民俗简介", "职业简介", "特产简介");

    $sStylesheet = ''; // 该页可选样式表

    $namespace = 'shinto'; // 该页命名空间


//显示页面内容----------------------------------------------------------------------------------------------------------
    require_once('pageModuleClass/SubjectPage.class.php');
	$subjectPage = new SubjectPage();

	$subjectPage->displayHead($namespace, $sStylesheet);
	$subjectPage->displayJumbotron($jumbotronImgUrl, $jumbotronImgAlt, $summaryCHN, $summaryJPN);
	$subjectPage->displayListGroup( $aListGroupTitle, $aListGroupDesCHN, $aListGroupDesJPN );
	$subjectPage->displayFoot();

?>