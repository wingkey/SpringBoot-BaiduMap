package com.test.baidu.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.test.baidu.service.IBaidumapUserService;
import com.test.baidu.vo.BaidumapUser;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author fyc
 * @since 2019-04-25
 */
@Controller
@RequestMapping("/baidumapUser")
public class BaidumapUserController {

	@Autowired
	private IBaidumapUserService baidumapUserService;

	@RequestMapping("/index")
	public String index() {
		return "freemarker/table";
	}

	@RequestMapping("/test")
	public String test() {
		return "freemarker/test";
	}

	@RequestMapping("/save")
	@ResponseBody
	public String save(String name, String phone, String address, String rank, String others) {
		BaidumapUser user = new BaidumapUser();
		user.setId(UUID.randomUUID().toString().replace("-", "").toUpperCase());
		user.setName(name);
		user.setOthers(others);
		user.setPhone(phone);
		user.setRank(rank);
		user.setAddress(address);

		Map<String, Object> map = new HashMap<>();

		try {
			Integer res = baidumapUserService.save(user);
			map.put("success", 0);
			map.put("msg", res);
		} catch (Exception e) {
			map.put("success", 1);
			map.put("msg", e.getMessage());
		}
		return new JSONObject(map).toString();
	}

	@RequestMapping("/deleteById")
	@ResponseBody
	public String deleteById(String id) {

		Map<String, Object> map = new HashMap<>();
		try {
			Integer count = baidumapUserService.deleteById(id);
			map.put("success", 0);
			map.put("msg", count);
		} catch (Exception e) {
			map.put("success", 1);
			map.put("msg", e.getMessage());
		}
		return new JSONObject(map).toString();
	}

	@RequestMapping("/bathDeleteByIds")
	@ResponseBody
	public String bathDeleteByIds(String ids) {
		Map<String, Object> map = new HashMap<>();
		try {
			Integer count = baidumapUserService.bathDeleteByIds(ids);
			map.put("success", 0);
			map.put("msg", count);
		} catch (Exception e) {
			map.put("success", 1);
			map.put("msg", e.getMessage());
		}
		return new JSONObject(map).toString();
	}

	@RequestMapping("/update")
	@ResponseBody
	public String update(String id, String name, String phone, String address, String rank, String others) {
		Map<String, Object> map = new HashMap<>();
		if (id == null || id.isEmpty()) {
			map.put("success", 1);
			return new JSONObject(map).toString();// 表示参数不全
		}
		BaidumapUser user = new BaidumapUser();
		user.setAddress(address);
		user.setId(id);
		user.setName(name);
		user.setOthers(others);
		user.setPhone(phone);
		user.setRank(rank);

		try {
			Integer res = baidumapUserService.update(user);
			map.put("success", 0);
			map.put("msg", res);
		} catch (Exception e) {
			map.put("success", 1);
			map.put("msg", e.getMessage());
		}
		return new JSONObject(map).toString();
	}

	@RequestMapping("/selectByPage")
	@ResponseBody
	public String selectByPage(String page, String rows, String id, String name, String phone, String address,
			String rank, String others) {
		BaidumapUser user = new BaidumapUser();
		user.setId(id);
		user.setAddress(address);
		user.setName(name);
		user.setOthers(others);
		user.setPhone(phone);
		user.setRank(rank);
		Map<String, Object> map = new HashMap<>();
		map.put("rows", baidumapUserService.selectByPage(new Integer(page), new Integer(rows), user));
		map.put("total", baidumapUserService.selectCount(user));
		JSONObject obj = new JSONObject(map);
		return obj.toString();
	}

	/**
	 * 验证姓名是否重复
	 * 
	 * @return
	 */
	@RequestMapping("/validateName")
	@ResponseBody
	public String validateName(String name,String id) {
		Map<String, Object> map = new HashMap<>();
		BaidumapUser user = new BaidumapUser();
		user.setName(name);
		if (id!=null&&id.length()>10) {
			user.setId(id);
		}
		Integer count = baidumapUserService.selectCount(user);
		if (count > 1) {
			map.put("valid", false);
		}else if (count==1) {//这个判断是新增还是修改（修改必有id且不改名肯定查一条）
			if (id!=null&&id.length()>10) {
				map.put("valid", true);
			}else {
				map.put("valid", false);
			}
		}else {
			map.put("valid", true);
		}
		return new JSONObject(map).toString();
	}

}
