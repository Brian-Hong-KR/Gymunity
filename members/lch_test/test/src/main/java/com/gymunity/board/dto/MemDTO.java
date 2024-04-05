package com.gymunity.board.dto;

import org.springframework.stereotype.Component;

@Component
public class MemDTO {
	private int member_id, reward_point, mem_user_id, mem_grade_id, mem_ch_id;
	private float archive_rate;
	
	public MemDTO() {
		
	}


	public int getMem_user_id() {
		return mem_user_id;
	}

	public void setMem_user_id(int mem_user_id) {
		this.mem_user_id = mem_user_id;
	}

	public int getMember_id() {
		return member_id;
	}

	public void setMember_id(int member_id) {
		this.member_id = member_id;
	}

	public int getReward_point() {
		return reward_point;
	}

	public void setReward_point(int reward_point) {
		this.reward_point = reward_point;
	}

	public int getMem_grade_id() {
		return mem_grade_id;
	}

	public void setMem_grade_id(int mem_grade_id) {
		this.mem_grade_id = mem_grade_id;
	}

	public int getMem_ch_id() {
		return mem_ch_id;
	}

	public void setMem_ch_id(int mem_ch_id) {
		this.mem_ch_id = mem_ch_id;
	}

	public float getArchive_rate() {
		return archive_rate;
	}

	public void setArchive_rate(float archive_rate) {
		this.archive_rate = archive_rate;
	}
	
	
}
