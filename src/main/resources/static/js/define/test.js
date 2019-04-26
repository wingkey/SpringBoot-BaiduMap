function check111 (){

// 百度地图API功能
var map = new BMap.Map("allmap");    // 创建Map实例
    
map.centerAndZoom(new BMap.Point(116.404, 39.915), 20);      
// 创建地址解析器实例     
var myGeo = new BMap.Geocoder();      
// 将地址解析结果显示在地图上，并调整地图视野    
myGeo.getPoint("江苏省南京市建邺区双闸路101号海峡城第二街区7幢109室", function(point){      
    if (point) {      
        map.centerAndZoom(point, 20);      
        map.addOverlay(new BMap.Marker(point));      
    }      
 }, 
"南京市");
  
  
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
}