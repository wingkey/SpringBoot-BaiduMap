package com.test.baidu.dao;

import com.test.baidu.vo.BaidumapUser;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.baomidou.mybatisplus.mapper.BaseMapper;

/**
 * <p>
  *  Mapper 接口
 * </p>
 *
 * @author fyc
 * @since 2019-04-25
 */

@Mapper
@Repository("baidumap")
public interface BaidumapUserMapper extends BaseMapper<BaidumapUser> {

	
	
}