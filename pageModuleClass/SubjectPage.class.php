<?php
require_once('CommonPage.class.php');

//主题页面

class SubjectPage extends CommonPage
{

	//页面内容——————————————————————————————————————————————————————————————————————————————————————————————
	protected $title = '風の通り道 二级页面';


    //显示横幅
    //四个参数分别是：横幅中的图片的地址、该图片的alt属性值、该主题中文简介、日文简介
	public function displayJumbotron($imgUrl, $alt, $summaryCHN, $summaryJPN)
	{
	    echo  '<div class="jumbotron jumbotron-fluid">
	                <div class="container">
                        <img class="img-responsive m-b-2 center-block" src="' . $imgUrl . '" alt="' . $alt . '" />
                            <div class="card">
                                <div class="card-block">
                                    <p class="card-text chinese"> ' . $summaryCHN . '</p>
                                    <br />
                                    <p class="card-text japanese"> ' . $summaryJPN . '</p>
                                </div>
                            </div>
                    </div>
                </div>';
    }

	//页面显示——————————————————————————————————————————————————————————————————————————————————————————————

    //显示无序列表
    //第一个参数是所有列表项的标题数组，第二个是对应的描述数组
    public function displayListGroup( $aListGroupTitle, $aListGroupDesCHN, $aListGroupDesJPN )
    {
         echo '<div class="list-group">';
         foreach( $aListGroupTitle as $key=>$value)
         {
             echo '<a href="#" class="list-group-item list-group-item-action"><h5 class="list-group-item-heading">';
             echo $value;
             echo '</h5><p class="list-group-item-text chinese">';
             echo $aListGroupDesCHN[$key];
             echo '</p><br /><p class="list-group-item-text japanese">';
             echo $aListGroupDesJPN[$key];
             echo '</p></a>';
         }
         echo '</div>';
    }
}


?>