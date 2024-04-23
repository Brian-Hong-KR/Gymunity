package com.gymunity.board.dto;

import java.sql.Date;

import org.springframework.stereotype.Component;

@Component
public class PointDTO {
	private int point_subtract_id, points_subtracted, user_id;
	private String reason;
	private Date subtracted_at;
	
	public PointDTO() {
		
	}
	
	
	public int getPoint_subtract_id() {
		return point_subtract_id;
	}
	public void setPoint_subtract_id(int point_subtract_id) {
		this.point_subtract_id = point_subtract_id;
	}
	public int getPoints_subtracted() {
		return points_subtracted;
	}
	public void setPoints_subtracted(int points_subtracted) {
		this.points_subtracted = points_subtracted;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public Date getSubtracted_at() {
		return subtracted_at;
	}
	public void setSubtracted_at(Date subtracted_at) {
		this.subtracted_at = subtracted_at;
	}
	
	
}
