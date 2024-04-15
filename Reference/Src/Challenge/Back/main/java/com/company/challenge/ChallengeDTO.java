package com.company.challenge;

import java.sql.Date;

import org.springframework.stereotype.Component;


@Component
public class ChallengeDTO {
	private int user_id, ch_id, grade_id, category, batting_point, total_participants;
	private String title, content, proceed;
	private Date regist_date, ch_start_date, ch_end_date;
	//user_id '0'으로 시작하는 데이터를 int로 처리할 경우 오류?
	
	public ChallengeDTO() {
	}

	public int getCh_id() {
		return ch_id;
	}

	public void setCh_id(int ch_id) {
		this.ch_id = ch_id;
	}

	public int getGrade_id() {
		return grade_id;
	}

	public void setGrade_id(int grade_id) {
		this.grade_id = grade_id;
	}

	public int getCategory() {
		return category;
	}

	public void setCategory(int category) {
		this.category = category;
	}

	public int getBatting_point() {
		return batting_point;
	}

	public void setBatting_point(int batting_point) {
		this.batting_point = batting_point;
	}

	public int getTotal_participants() {
		return total_participants;
	}

	public void setTotal_participants(int total_participants) {
		this.total_participants = total_participants;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getProceed() {
		return proceed;
	}

	public void setProceed(String proceed) {
		this.proceed = proceed;
	}

	public Date getRegist_date() {
		return regist_date;
	}

	public void setRegist_date(Date regist_date) {
		this.regist_date = regist_date;
	}

	public Date getCh_start_date() {
		return ch_start_date;
	}

	public void setCh_start_date(Date ch_start_date) {
		this.ch_start_date = ch_start_date;
	}

	public Date getCh_end_date() {
		return ch_end_date;
	}

	public void setCh_end_date(Date ch_end_date) {
		this.ch_end_date = ch_end_date;
	}
	

}
