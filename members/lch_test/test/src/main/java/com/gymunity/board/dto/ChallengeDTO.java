package com.gymunity.board.dto;

import java.sql.Date;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;


@Component
public class ChallengeDTO {
	private int user_id, ch_id, grade_id, category, 
	batting_point, total_participants, vi_id, vi_user_id, vi_ch_id;
	private String title, content, proceed, result;
	private Date regist_date, ch_start_date, ch_end_date;
	
	private String upload1,upload2;
	
	//form페이지에서 파일첨부를 받아 처리해주는 멤버변수
	private MultipartFile filename;
	
	
	public ChallengeDTO() {
		
	}
	
	public int getVi_id() {
		return vi_id;
	}

	public void setVi_id(int vi_id) {
		this.vi_id = vi_id;
	}

	public int getVi_user_id() {
		return vi_user_id;
	}

	public void setVi_user_id(int vi_user_id) {
		this.vi_user_id = vi_user_id;
	}

	public int getVi_ch_id() {
		return vi_ch_id;
	}

	public void setVi_ch_id(int vi_ch_id) {
		this.vi_ch_id = vi_ch_id;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getUpload1() {
		return upload1;
	}

	public void setUpload1(String upload1) {
		this.upload1 = upload1;
	}

	public String getUpload2() {
		return upload2;
	}

	public void setUpload2(String upload2) {
		this.upload2 = upload2;
	}

	public MultipartFile getFilename() {
		return filename;
	}

	public void setFilename(MultipartFile filename) {
		this.filename = filename;
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