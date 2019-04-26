package com.test.baidu.vo;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotations.TableName;

import lombok.Data;

/**
 * <p>
 * 
 * </p>
 *
 * @author fyc
 * @since 2019-04-25
 */
@Data
@TableName("baidumap_user")
public class BaidumapUser implements Serializable {

    private static final long serialVersionUID = 1L;

	private String id;
	private String name;
	private String phone;
	private String address;
	private String rank;
	private String others;


	
	@Override
	public String toString() {
		return "BaidumapUser{" +
			", id=" + id +
			", name=" + name +
			", phone=" + phone +
			", address=" + address +
			", rank=" + rank +
			", others=" + others +
			"}";
	}
}
