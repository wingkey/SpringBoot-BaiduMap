var $table;
        // 初始化bootstrap-table的内容

var pageSize=10;// 初始化一页记录数
var pageNum=1;// 第几页

var m_obj=null; //后面的地图对象

var m_point=null;//后面的标注点对象



		window.onload=function(){
			InitMainTable ();
			modelvalidator();
			addbtn();
		};
		
		
		
		
        function InitMainTable () {
        	
            // 记录页面bootstrap-table全局变量$table，方便应用
            var queryUrl = '../baidumapUser/selectByPage'
            $table = $('#grid').bootstrapTable({
                url: queryUrl,                      // 请求后台的URL（*）
                method: 'POST',                      // 请求方式（*）
                contentType: "application/x-www-form-urlencoded", // 请求为post请求时，必须设置，不然传递的参数会在
																	// 请求payload中
                // toolbar: '#toolbar', //工具按钮用哪个容器
                // 数据类型
                dataType: "json",
                // table高度：如果没有设置，表格自动根据记录条数觉得表格高度
                // height: '582',
                striped: true,                      // 是否显示行间隔色
                cache: false,                       // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true,                   // 是否显示分页（*）
                sortable: true,                     // 是否启用排序
                sortOrder: "asc",                   // 排序方式
                sidePagination: "server",           // 分页方式：client客户端分页，server服务端分页（*）
                pageNumber: pageNum,                      // 初始化加载第一页，默认第一页,并记录
                pageSize: pageSize,                     // 每页的记录行数（*）
                pageList: [10, 20, 30, 100],        // 可供选择的每页的行数（*）
                pageList: "[10, 20, 50, 80, 100]",
                paginationFirstText: "首页",
                paginationPreText: "上一页",
                paginationNextText: "下一页",
                paginationLastText: "末页",
                search: false,                      // 是否显示表格搜索
                strictSearch: true,
                showColumns: true,                  // 是否显示所有的列（选择显示的列）
                showRefresh: true,                  // 是否显示刷新按钮
                minimumCountColumns: 2,             // 最少允许的列数
                clickToSelect: true,                // 是否启用点击选中行
                uniqueId: "id",                     // 每一行的唯一标识，一般为主键列
                showToggle: true,                   // 是否显示详细视图和列表视图的切换按钮
                cardView: false,                    // 是否显示详细视图
                detailView: false,                  // 是否显示父子表
                // 得到查询的参数
                queryParams : function (params) {
                    // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                    var temp = {   
                        rows: params.limit,                         // 页面大小
                        page: (params.offset / params.limit) + 1,   // 页码
                        sort: params.sort,      // 排序列名
                        sortOrder: params.order // 排位命令（desc，asc）
                    };
                    return temp;
                },
                columns: [{
                    checkbox: true,  
                    visible: true                  // 是否显示复选框
                }, {
                    field: 'id',
                    title: 'id',
                    sortable: true,
                    align: 'center',
                    valign: 'middle',
                }, {
                    field: 'name',
                    title: '姓名',
                    sortable: true,
                    align: 'center',
                    valign: 'middle',
                }, {
                    field: 'phone',
                    title: '联系电话',
                    sortable: true,
                    align: 'center',
                    valign: 'middle',
                    
                }, {
                    field: 'address',
                    title: '地址',
                    align: 'center',
                    valign: 'middle',
                    
                },{
                    field: 'rank',
                    title: '信用等级',
                    align: 'center',
                    valign: 'middle',
                    
                }, {
                    field: 'others',
                    title: '备注',
                    align: 'center',
                    valign: 'middle',
                    
                }, {
                    field:'ids',
                    title: '操作',
                    width: 300,
                    align: 'center',
                    valign: 'middle',
                    events: window.operateEvents,
                    formatter: orderOpt,
                }, ],
                onLoadSuccess: function () {
                },
                onLoadError: function () {
                    showTips("数据加载失败！");
                },
               /*
				 * onDblClickRow: function (row, $element) { var id = row.ID;
				 * //EditViewById(id, 'view'); },
				 */
            });
        };
        
        
        
   // 安装按钮
   function orderOpt(){
	   /**
		 * 自定义列内容
		 */ 
	    return [
	        '<a class="btn trbtn-edit btn-info" href="javascript:void(0)" >编辑</a>',
	        '&nbsp;&nbsp;&nbsp;',
	        '<a class="btn trbtn-remove btn-warning" href="javascript:void(0)" >删除</a>',
	        '&nbsp;&nbsp;&nbsp;',
	        '<a class="btn trbtn-detail btn btn-primary" href="javascript:void(0)"  data-target="#myModal"  >定位</a>'
	    ].join('');
   }
   
   // 安装按钮事件
   window.operateEvents = {
       /**
		 * 注册操作按钮事件
		 */
       'click .trbtn-edit': function (e, value, row, index) {
           editData(row);
       },
       'click .trbtn-remove': function (e, value, row, index) {
    
           delData(row.id);
       },
       
       'click .trbtn-detail':function (e, value, row, index) {
    	   //奇怪的bug,这个定位会定位到左上角，原因是加载的时候div是（0,0）所以会这样，这里用了延时加载，但这个延时是有问题的，只有在上个加载完成后撑开div才能居中
    	   //目前比较简单的解决方法是直接先给原来的div定好大小再加载，这样就不是（0,0）没测试，后面再试
    	   opMap(row.address);
       }
        
   };
   
   //开地图模态框
   function opMap(address){
	   
	   dinW();
	   dingwei(address);
	   
   }
   
   
   // 新增
   function insertData(){
	   $('#insertUserModel').on('show.bs.modal', 	// 给模态框赋值
			function (event) { 	
				   var button = $(event.relatedTarget) // 触发事件的按钮
				   var main_name = button.parent().prev().prev(); 
				   var main_id = button.next().next(); 
				
				   $('#modal-name1').val("");
				   $('#modal-code1').val("");
				   $('#modal-age1').val("");
		   	}
	   	);
	   
	   $('#insertUserModel').modal('show').css({// 真正触发展示模态框的方法，css里是为了使其居中
		   width:'auto',
		   'margin-left':function(){
		   return Math.max(0, ($(window).width() -$('#insertUserModel').width()) / 2);
		   }
	   });
	   
	   
   }
   // 调用新增
   function insertUser(){
	  
	   var name=$('#modal-name1').val();
	   var code=$('#modal-code1').val();
	   var age=$('#modal-age1').val();
	   
	   var bv1 =  $('#insertform').data('bootstrapValidator');
	   bv1.validate();

	   
	   if (bv1.isValid()) {
		   $.ajax({ 
			   type: 'POST',
			   url:'../freemarker/insertUser.action', 
			   data:{name:name,code:code,age:age}, 
			   cache:false,// false是不缓存，true为缓存
			   async:true,// true为异步，false为同步
			   dataType:"json",
			   beforeSend:function(){ // 请求前
				   
			   }, 
			   success:function(result){ // 请求成功时
				   //console.dir(result);
				   // var jsonval=JSON.parse(result);
				   if (result.success==1) {// 更新失败
					alert(result.msg);
				   }
				   if(result.success==0){
					   alert(result.msg);
					   $('#insertUserModel').modal('hide');
				
					   window.location.reload(true);
				   }
				   
			   }, 
			   complete:function(){ // 请求结束时
				   
			   }, 
			   error:function(){ // 请求失败时
				   alert("请求失败，请检查传入参数!");
				   window.location.reload(true);
			   } })
	   }
	   
	  
   }
   
   
   
   //在指定位置加按钮
   function addbtn(){
	   $('.fixed-table-toolbar').append("<div class='columns columns-left btn-group pull-left'><a  onClick=\"bathDeleteUser()\" href=\"javascript:;\" class='btn btn-warning btn-sm' title=\"批量删除用户\">批量删除用户</a><a  onClick=\"insertData()\" href=\"javascript:;\" class='btn btn-info btn-sm' title=\"新增用户\">新增用户</a></div>");
   }
   
   
   function dinW(){
	   $('#myModal').modal('show').css({// 真正触发展示模态框的方法，css里是为了使其居中
		   width:'auto',
		   'margin-left':function(){
		   return Math.max(0, ($(window).width() -$('#myModal').width()) / 2);
		   }
	   });
	   
	   
   }
   
   
   // 编辑
   function editData(row){
	   $('#editvue').on('show.bs.modal', 	// 给模态框赋值
			function (event) { 	
				   var button = $(event.relatedTarget) // 触发事件的按钮
				   var main_name = button.parent().prev().prev(); 
				   var main_id = button.next().next(); 
				   $('#modal-id').val(row.id); 
				   $('#modal-name').val(row.name);
				   $('#modal-code').val(row.code);
				   $('#modal-age').val(row.age);
		   	}
	   	);
	   
	   $('#editvue').modal('show').css({// 真正触发展示模态框的方法，css里是为了使其居中
		   width:'auto',
		   'margin-left':function(){
		   return Math.max(0, ($(window).width() -$('#editvue').width()) / 2);
		   }
	   });
	   
	   
   }
   
   // 保存编辑
   function editUser(){
	   
	   var id=$('#modal-id').val();
	   var name=$('#modal-name').val();
	   var code=$('#modal-code').val();
	   var age=$('#modal-age').val();
	   
	   var bv =  $('#editform').data('bootstrapValidator');
	   bv.validate();

	  
	   
	   if (bv.isValid()) {
		   
		   $.ajax({ 
			   type: 'POST',
			   url:'../freemarker/editUser.action', 
			   data:{id:id,name:name,code:code,age:age}, 
			   cache:false,// false是不缓存，true为缓存
			   async:true,// true为异步，false为同步
			   dataType:"json",
			   beforeSend:function(){ // 请求前
				   
			   }, 
			   success:function(result){ // 请求成功时
				   //console.dir(result);
				   // var jsonval=JSON.parse(result);
				   if (result.success==1) {// 更新失败
					alert(result.msg);
				   }
				   if(result.success==0){
					   alert(result.msg);
					   console.dir(result.msg);
					   $('#editvue').modal('hide');
					   window.location.reload(true);
				   }
				   
			   }, 
			   complete:function(){ // 请求结束时
				   
			   }, 
			   error:function(){ // 请求失败时
				   alert("请求失败，请检查传入参数!");
				   window.location.reload(true);
			   } })
	   }
	   
	  
   }
	 
   // 模态框值验证
   function modelvalidator(){
	  

	   //修改的模块框验证
	   $('#editform').bootstrapValidator({
	        message: 'test to validator',
	        
	        feedbackIcons: {
	            valid: 'glyphicon glyphicon-ok',
	            invalid: 'glyphicon glyphicon-remove',
	            validating: 'glyphicon glyphicon-refresh'
	        },
	        fields: {
	        	modalid: {
	                message: 'id不能为空',
	                validators: {
	                    notEmpty: {
	                        message: 'id不能为空'
	                    },
	                    stringLength: {
	                        min: 1,
	                        max: 18,
	                        message: 'id长度必须在1到18位之间'
	                    },
	                    regexp: {// 正则表达式
	                        regexp: /^[0-9_]+$/,
	                        message: 'id只能数字'
	                    }
	                    
	                }
	            },
	            modalname: {
	                message: '姓名验证失败',
	                validators: {
	                    notEmpty: {
	                        message: '姓名不能为空'
	                    },
	                    stringLength: {
	                        min: 2,
	                        max: 18,
	                        message: '姓名长度必须在2到18位之间'
	                    },
	                    regexp: {// 正则表达式
	                        regexp: /^[a-zA-Z\u4e00-\u9fa5]+$/,
	                        message: '姓名只能是中文或英文'
	                    }
	                    /*
						 * remote: { // ajax验证账号是否重复，注意，此处返回值的格式是: //
						 * {"valid":true||false} url:
						 * '../freemarker/validateName', message: '姓名重复，请更换',
						 * delay : 2000, type: 'POST', data: { name:
						 * $("#name").val() // 这个是传值方法 } }
						 */
	                }
	            },
	            modalcode: {
	                message: '代号验证失败',
	                validators: {
	                    notEmpty: {
	                        message: '代号不能为空'
	                    },
	                    stringLength: {
	                        min: 2,
	                        max: 18,
	                        message: '代号长度必须在2到18位之间'
	                    },
	                    regexp: {// 正则表达式
	                        regexp: /^[a-zA-Z0-9_]+$/,
	                        message: '代号只能是数字或英文'
	                    },
	                    remote: { // ajax验证账号是否重复，注意，此处返回值的格式是:
		                      		// {"valid":true||false}
		                  	  url: '../freemarker/validateName.action',
		                      message: '代号重复，请更换',
		                      delay :  2000,
		                      type: 'POST',
		                      data: {
		                      	code: function(){return $('#modal-code').val()},  // 这个是传值方法
		                      	id  : function(){return $('#modal-id').val()}
		                      }
		                  }
	                }
	            },
	            modalage:{
	            	 message: '年龄验证失败',
	            	 validators: {
		                    notEmpty: {
		                        message: '年龄不能为空'
		                    },
		                    stringLength: {
		                        min: 1,
		                        max: 3,
		                        message: '代号长度必须在1到3位之间'
		                    },
		                    regexp: {// 正则表达式
		                        regexp: /^[0-9_]+$/,
		                        message: '年龄只能是数字或英文'
		                    }
	            	 }
	            	
	            }
	          
	            
	           /*
				 * modal-name:{ message: '两次密码必须一致', validators:{ notEmpty:{
				 * message: '确认密码密码不能为空' }, identical: { field: 'password2',
				 * message: '两次输入的密码不相符' } } }, modal-code:{ message:'两次密码必须一致',
				 * validators:{ notEmpty:{ message: '确认密码密码不能为空' }, identical: {
				 * field: 'password', message: '两次输入的密码不相符' } } },
				 */
				 
	            
	        }
	    });
	   
	   
	   //新增的模块框验证
	   $('#insertform').bootstrapValidator({
	        message: 'test to validator',
	        
	        feedbackIcons: {
	            valid: 'glyphicon glyphicon-ok',
	            invalid: 'glyphicon glyphicon-remove',
	            validating: 'glyphicon glyphicon-refresh'
	        },
	        fields: {
	            modalname: {
	                message: '姓名验证失败',
	                validators: {
	                    notEmpty: {
	                        message: '姓名不能为空'
	                    },
	                    stringLength: {
	                        min: 2,
	                        max: 18,
	                        message: '姓名长度必须在2到18位之间'
	                    },
	                    regexp: {// 正则表达式
	                        regexp: /^[a-zA-Z\u4e00-\u9fa5]+$/,
	                        message: '姓名只能是中文或英文'
	                    }
	                    /*
						 * remote: { // ajax验证账号是否重复，注意，此处返回值的格式是: //
						 * {"valid":true||false} url:
						 * '../freemarker/validateName', message: '姓名重复，请更换',
						 * delay : 2000, type: 'POST', data: { name:
						 * $("#name").val() // 这个是传值方法 } }
						 */
	                }
	            },
	            modalcode: {
	                message: '代号验证失败',
	                validators: {
	                    notEmpty: {
	                        message: '代号不能为空'
	                    },
	                    stringLength: {
	                        min: 2,
	                        max: 18,
	                        message: '代号长度必须在2到18位之间'
	                    },
	                    regexp: {// 正则表达式
	                        regexp: /^[a-zA-Z0-9_]+$/,
	                        message: '代号只能是数字或英文'
	                    },
	                    remote: { // ajax验证账号是否重复，注意，此处返回值的格式是:
		                      		// {"valid":true||false}
		                  	  url: '../freemarker/validateName.action',
		                      message: '代号重复，请更换',
		                      delay :  2000,
		                      type: 'POST',
		                      data: {
		                      	code: function(){return $('#modal-code1').val()}  // 这个是传值方法
		                      }
		                  }
	                }
	            },
	            modalage:{
	            	 message: '年龄验证失败',
	            	 validators: {
		                    notEmpty: {
		                        message: '年龄不能为空'
		                    },
		                    stringLength: {
		                        min: 1,
		                        max: 3,
		                        message: '代号长度必须在1到3位之间'
		                    },
		                    regexp: {// 正则表达式
		                        regexp: /^[0-9_]+$/,
		                        message: '年龄只能是数字或英文'
		                    }
	            	 }
	            	
	            }
	          
	            
	           /*
				 * modal-name:{ message: '两次密码必须一致', validators:{ notEmpty:{
				 * message: '确认密码密码不能为空' }, identical: { field: 'password2',
				 * message: '两次输入的密码不相符' } } }, modal-code:{ message:'两次密码必须一致',
				 * validators:{ notEmpty:{ message: '确认密码密码不能为空' }, identical: {
				 * field: 'password', message: '两次输入的密码不相符' } } },
				 */
				 
	            
	        }
	    });

   }
   
   
   
   
   // 删除
   function delData(custNo){
	   Ewin.confirm({ message: "确认要删除选择的数据吗？" }).on(function (e) {
	           if (!e) {
	        	   return;
                }
	           $.ajax({ 
	        	   type: 'POST',
				   url:'../baidumapUser/deleteById', 
				   data:{id:custNo}, 
				   cache:false,// false是不缓存，true为缓存
				   async:true,// true为异步，false为同步
				   dataType:"json",
				   beforeSend:function(){ // 请求前
					   
				   }, 
				   success:function(result){ // 请求成功时
					   //console.dir(result);
					   // var jsonval=JSON.parse(result);
					   if (result.success==1) {// 更新失败
						alert(result.msg);
					   }
					   if(result.success==0){
						   alert("成功删除"+result.msg+"条数据");
						   $('#editvue').modal('hide');
						   window.location.reload(true);
					   }
					   
				   }, 
				   complete:function(){ // 请求结束时
					   
				   }, 
				   error:function(){ // 请求失败时
					   alert("请求失败，请检查传入参数!");
					   window.location.reload(true);
				   } })
	     });
	   
	}
   
   //批量删除
   
   function bathDeleteUser(){
	   var rows=$('#grid').bootstrapTable('getSelections');
	   if (rows.length==0) {
		 alert("请选择要删除的数据！");
		 return;
	   }
	    var ids = '';
	    for (var i = 0; i < rows.length; i++) {
	        ids += rows[i]['id'] + ",";
	    }
	    
	    Ewin.confirm({ message: "确认要删除选择的数据吗？" }).on(function (e) {
	         if (!e) {
	        	   return;
             }
	         $.ajax({ 
	        	   type: 'POST',
				   url:'../baidumapUser/bathDeleteByIds', 
				   data:{ids:ids}, 
				   cache:false,// false是不缓存，true为缓存
				   async:true,// true为异步，false为同步
				   dataType:"json",
				   beforeSend:function(){ // 请求前
					   
				   }, 
				   success:function(result){ // 请求成功时
					   //console.dir(result);
					   // var jsonval=JSON.parse(result);
					   if (result.success==1) {// 更新失败
						alert("删除失败，e:"+result.msg);
					   }
					   if(result.success==0){
						   alert("成功删除"+result.msg+"条数据");
						   $('#editvue').modal('hide');
						   window.location.reload(true);
					   }
					   
				   }, 
				   complete:function(){ // 请求结束时
					   
				   }, 
				   error:function(){ // 请求失败时
					   alert("请求失败，请检查传入参数!");
					   window.location.reload(true);
				   } })
	    })
	    
   }
	   
   
   
   function dingwei(address) { //接受数据
	   alert("加载地图完成!");
	   if (address==null||address==""||address=="undefined") {
		address="南京市";
	   }
	  
	// 百度地图API功能
	var map = new BMap.Map("allmap");    // 创建Map实例
	
	m_obj=map;
	
	
	
	// 创建地址解析器实例     
	var myGeo = new BMap.Geocoder(); 
	   
	map.centerAndZoom(new BMap.Point(118.801,32.036), 20);
	
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	
	var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
			{"input" : "suggestId"
			,"location" : map
		});
	
	ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
		var _value=e.item.value;
		
		var _address=_value.province+_value.city+_value.district+_value.street+_value.streetNumber+_value.business;
	
		geocode(myGeo,_address,map);
	});
	
	map.addEventListener("rightclick", function(e){        
	    var point = e.point;
	    
	    m_point=point;
        map.centerAndZoom(point, 20);      
        map.clearOverlays();
        map.addOverlay(new BMap.Marker(point));
        map.panTo(point);
	    
	    /*myGeo.getLocation(point, function(rs){
	        var addComp = rs.addressComponents;
	        	 alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
	        	 
	    });    */    
	});
	
	
	geocode(myGeo,address,map);//初次加载地图
	  
	m_obj=map;
	
   }
   
   
   
   //标注地址并调整中间位置
   function geocode(myGeo,address,map){
	   	     
		// 将地址解析结果显示在地图上，并调整地图视野    
		myGeo.getPoint(address, function(point){      
		    if (point) {
		    	
		    	m_point=point;
		        map.centerAndZoom(point, 20);      
		        map.addOverlay(new BMap.Marker(point));
		        map.panTo(point);
		    }else{
		    	alert("未查询到指定地址");
		    }      
		 }, 
		"南京市");
		
		
		
		
   }
   
   
   //获取标记点地址
   function _getAddress(){
	   
	   var myGeo = new BMap.Geocoder();
	   myGeo.getLocation(m_point, function(rs){
			var _value = rs.addressComponents;
			var _address=_value.province+_value.city+_value.district+_value.street+_value.streetNumber;
			$('#modal-address').val(_address); 
			$('#modal-others').val(m_point.lng+","+m_point.lat);
		});
   }
   
   
   //搜索按钮
   function searchPlace(){
	   var _in=$('#suggestId')[0].value;
		geocode(_in,m_obj);//初次加载地图
   }
 
   