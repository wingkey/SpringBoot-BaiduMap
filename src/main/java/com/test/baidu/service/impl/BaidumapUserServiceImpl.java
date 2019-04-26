package com.test.baidu.service.impl;

import com.test.baidu.vo.BaidumapUser;
import com.test.baidu.dao.BaidumapUserMapper;
import com.test.baidu.service.IBaidumapUserService;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author fyc
 * @since 2019-04-25
 */
@Service("baidumapUserService")
public class BaidumapUserServiceImpl extends ServiceImpl<BaidumapUserMapper, BaidumapUser> implements IBaidumapUserService {
	
	@Autowired
	private BaidumapUserMapper baidumap;

	@Override
	public Integer save(BaidumapUser user) {
		return baidumap.insert(user);
	}

	@Override
	public Integer deleteById(String id) {
		return baidumap.deleteById(id);
	}
	
	@Override
	public Integer bathDeleteByIds(String ids) {
		EntityWrapper<BaidumapUser> entityWrapper=new EntityWrapper<>();
		entityWrapper.in("id",ids.split(","));
		return baidumap.delete(entityWrapper);
	}

	@Override
	public Integer deteteByUser(BaidumapUser user) {
		EntityWrapper<BaidumapUser> entityWrapper = user2Entity(user);
		return baidumap.delete(entityWrapper);
	}

	@Override
	public Integer update(BaidumapUser user) {
		EntityWrapper<BaidumapUser> entityWrapper = new EntityWrapper<>();
		entityWrapper.eq("id", user.getId());
		return baidumap.update(user, entityWrapper);
	}

	@Override
	public List<BaidumapUser> selectByPage(Integer page, Integer rows, BaidumapUser user) {
		EntityWrapper<BaidumapUser> entityWrapper=user2Entity(user);
		return  baidumap.selectPage(new Page<>(page, rows), entityWrapper);
	}

	@Override
	public Integer selectCount(BaidumapUser user) {
		EntityWrapper<BaidumapUser> entityWrapper=user2Entity(user);
		return baidumap.selectCount(entityWrapper);
	}
	
	
	private EntityWrapper<BaidumapUser> user2Entity(BaidumapUser user){
		EntityWrapper<BaidumapUser> entityWrapper = new EntityWrapper<BaidumapUser>();
		Map<String, Object>map=new HashMap<>();
		if (user.getId()!=null&&!user.getId().isEmpty()) {
			map.put("id", user.getId());
		}
		if (user.getName()!=null&&!user.getName().isEmpty()) {
			map.put("name", user.getName());
		}
		if (user.getAddress()!=null&&!user.getAddress().isEmpty()) {
			map.put("address", user.getAddress());
		}
		if (user.getOthers()!=null&&!user.getOthers().isEmpty()) {
			map.put("others", user.getOthers());
		}
		if (user.getPhone()!=null&&!user.getPhone().isEmpty()) {
			map.put("phone", user.getPhone());
		}
		if (user.getRank()!=null&&!user.getRank().isEmpty()) {
			map.put("rank", user.getRank());
		}
		entityWrapper.allEq(map);
		return entityWrapper;
	}

	
}
