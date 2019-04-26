package com.test.baidu.service;

import com.test.baidu.vo.BaidumapUser;

import java.util.List;


import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author fyc
 * @since 2019-04-25
 */
public interface IBaidumapUserService extends IService<BaidumapUser> {
	
	public Integer save(BaidumapUser user);
	
	public Integer deleteById(String id);
	
	public Integer bathDeleteByIds(String ids);
	
	public Integer deteteByUser(BaidumapUser user);
	
	public Integer update(BaidumapUser user);
	
	public List<BaidumapUser> selectByPage(Integer page ,Integer rows,BaidumapUser user);
	
	public Integer  selectCount(BaidumapUser user);
}
