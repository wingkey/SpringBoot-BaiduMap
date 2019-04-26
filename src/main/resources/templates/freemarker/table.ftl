<!DOCTYPE html>
<html lang="zh-CN">

<head>
<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1">


<script src="../js/jquery-3.3.1.min.js"></script>

<link rel="stylesheet" href="../css/bootstrap.css">
<link rel="stylesheet" href="../css/bootstrap-table.css">
<link rel="stylesheet" href="../css/bootstrap.min.css">
<link rel="stylesheet" href="../css/bootstrapValidator.css">


<script src="../js/bootstrap.min.js"></script>

<script src="../js/bootstrap-table.js"></script>
<script src="../js/bootstrapValidator.js"></script>
<script src="../js/bootstrapValidator.min.js"></script>

<script src="../js/bootstrap-table-zh-CN.js"></script>

<script src="../js/define/test.js"></script>

<script src="../js/define/confirm.js"></script>
<script src="../js/define/table.js"></script>
	
	
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=04KGQKNvmy41Ou5i5iAwA6uYjii6fRpx"></script>

<!-- 处理下面显示搜索地址在模态框下面的问题 -->
 <style type="text/css">
     .tangram-suggestion-main {
          z-index: 999999;
      }
 </style>

<title>测试表格插件</title>


</head>
<body>
	<table id="grid">
	
	</table>
	
	
	
	
<div class="modal fade" id="editvue" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="width: 600px">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        	修改:
      </div>
      <div class="modal-body">
        <form id="editform">
          <div class="form-group">
            <label for="modal-id" class="control-label">id:</label>
            <input type="text" class="form-control" id="modal-id" name="modalid" readOnly="true">
          </div>
          <div class="form-group">
            <label for="modal-name" class="control-label">姓名:</label>
            <input type="text" class="form-control" id="modal-name" name="modalname">
          </div>
          <div class="form-group">
            <label for="modal-code" class="control-label">代号:</label>
            <input type="text" class="form-control" id="modal-code" name="modalcode">
          </div>
          <div class="form-group">
            <label for="modal-age" class="control-label">年龄:</label>
            <input type="text" class="form-control" id="modal-age" name="modalage">
          </div>
          
            <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
		        <button type="submit" class="btn btn-primary" onclick="editUser()">保存</button>
		     </div>
        </form>
      </div>
    
      
      
    </div>
  </div>
</div>


<div class="modal fade" id="insertUserModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="width: 600px">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        	新增:
      </div>
      <div class="modal-body">
        <form id="insertform">
          <div class="form-group">
            <label for="modal-name" class="control-label">姓名:</label>
            <input type="text" class="form-control" id="modal-name" name="modalname">
          </div>
          <div class="form-group">
            <label for="modal-phone" class="control-label">联系电话:</label>
            <input type="text" class="form-control" id="modal-phone" name="modalphone">
          </div>
          <div class="form-group">
            <label for="modal-address" class="control-label">地址:</label>
            <input type="text" class="form-control" id="modal-address" name="modaladdress">
            <button type="button" class="btn btn-default" onclick="opMap()">地图选择</button>
          </div>
          <div class="form-group">
            <label for="modal-rank" class="control-label">信用等级:</label>
            <input type="text" class="form-control" id="modal-rank" name="modalage">
          </div>
          <div class="form-group">
            <label for="modal-others" class="control-label">经纬度:</label>
            <input type="text" class="form-control" id="modal-others" name="modalage">
          </div>
          
            <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
		        <button type="submit" class="btn btn-primary" onclick="insertUser()">保存</button>
		     </div>
        </form>
      </div>
    
      
      
    </div>
  </div>
</div>


<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" style="width: 600px">
	<div class="modal-dialog" >
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="myModalLabel">详细地址</h4> 
			</div>
			<div class="model-body">
				<div id="allmap" style="height:600px;width:auto"></div>
				
				<div id="r_result">请输入：
				<input type="text" id="suggestId" size="20" style="width:150px"/>
				<button type="submit" class="btn btn-primary" onclick="searchPlace()">搜索</button>
				</div>
				
				
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
				<button type="button" class="btn btn-primary" onclick="_getAddress()">确定</button>
			</div>
		</div>
	</div>
</div>


</body>
</html>