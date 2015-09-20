<?php

require_once("../../templates/config.php");

include(ROOT_PATH . "/The-Suspicious-Lesion/index.php");

?>

<p>Correct! Lymphedema is an accumulation of interstitial fluid in the affected region.</p>
<p class="bold">How would a complete axillary node dissection (CAD) lead to lymphedema?</p>
<textarea class="check-input" data-hintindex="47"></textarea>
<i class="input icon ion-alert-circled"></i>
<div class="hint"><i class="icon ion-ios-close"></i></div>

<div class="row margin clearfix">
	<div class="list-item col-sm-6">
		<p class="margin-top">You alleviate your patient’s unease by explaining that the margins of her positive lymph nodes were free of disease after the SNL biopsy and a CAD is not necessary. As an additional measure, you advise for a bone and liver scan. Luckily no additional metastasis was seen.</p>

		<p class="bold">From the original histology slide, what vessels were infiltrated with tumor cells?</p>
		<div>
			<input type="text" class="check-input" data-ansindex="40" data-hintindex="52">
			<i class="input icon ion-ios-help-empty"></i><i class="input icon ion-ios-checkmark"></i>
			<div class="hint"><i class="icon ion-ios-close"></i></div>
		</div>
		<div class="margin-top">
			<input type="text" class="check-input" data-ansindex="1" data-hintindex="53">
			<i class="input icon ion-ios-help-empty"></i><i class="input icon ion-ios-checkmark"></i>
			<div class="hint"><i class="icon ion-ios-close"></i></div>
		</div>
	</div>
	<figure class="list-item col-sm-6">
		<img src="<?php echo BASE_URL; ?>assets/img/SL-LN-tumor-cells.png" class="img-responsive" alt="">
		<figcaption></figcaption>
	</figure>
</div>

<p class="margin-top-lg">Your eventual diagnosis is infiltrating ductal carcinoma with micrometastasis. Based on the case presented, select your patient’s stage of breast cancer.</p>


<table class="margin-top">
	<thead>
		<tr>
			<th colspan="3">Staging of Breast Cancer</th>
		</tr>
		<tr>
			<th>Stage</th>
			<th>Circumstances</th>
			<th>5-yr Survival</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><a href="<?php echo BASE_URL; ?>The-Suspicious-Lesion/ans/stage0">Stage 0</a></td>
			<td>Duct cell or lobular in situ</td>
			<td>92%</td>
		</tr>
		<tr>
			<td><a href="<?php echo BASE_URL; ?>The-Suspicious-Lesion/ans/stage1">Stage I</a></td>
			<td>Invasive carcinoma, &lt;2 cm <br> No metastasis</td>
			<td>87%</td>
		</tr>
		<tr>
			<td><a href="<?php echo BASE_URL; ?>The-Suspicious-Lesion/ans/stage2">Stage II</a></td>
			<td>Invasive carcinoma, &lt;5 cm <br> Involved axillary nodes <br> No distant metastasis</td>
			<td>75%</td>
		</tr>
		<tr>
			<td><a href="<?php echo BASE_URL; ?>The-Suspicious-Lesion/ans/stage3">Stage III</a></td>
			<td>Invasive cancer >5cm, with nodal involvement <br> Any cancer with ipsilateral internal mammary node involvement <br> Any cancer with chest wall fixation, skin or pectoral involvement, inflammatory carcinoma <br> No distant metastasis</td>
			<td>46%</td>
		</tr>
		<tr>
			<td><a href="<?php echo BASE_URL; ?>The-Suspicious-Lesion/ans/stage4.php">Stage IV</a></td>
			<td>Any cancer with distant metastasis (including ipsilateral supraclavicular lymph nodes)</td>
			<td>13%</td>
		</tr>
	</tbody>
</table>


<?php include(ROOT_PATH . "/templates/footer.php"); ?>