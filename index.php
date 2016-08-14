<?php

	require_once('pageModuleClass/CommonPage.class.php');

	$searchForm = '<form action="" method="get">
				    	<div class="input-group">
				      		<input type="text" class="form-control" placeholder="关键词 キ—ワ—ド">
				      		<span class="input-group-btn">
				        		<button class="btn btn-secondary" type="button">検索</button>
				      		</span>
				    	</div>
					</form>';

	$commonPage = new CommonPage();

	//$commonPage->displayHead('<link href="css/index.css" type="text/css" rel="stylesheet" />');
	$commonPage->displayHead();
	echo $searchForm;
	$commonPage->displayFoot();

?>


建立——优化——修改 的全过程都要有日志