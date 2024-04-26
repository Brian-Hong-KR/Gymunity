package com.gymunity.test.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TestPageDTO {
    private int page; // 현재 페이지 번호
    private int size; // 페이지 당 보여질 아이템 수
    private int startRow; // 시작 행

    public void setPage(int page) {
        this.page = page;
        updateStartRow();
    }

    public void setSize(int size) {
        this.size = size;
        updateStartRow();
    }

    private void updateStartRow() {
        this.startRow = (page - 1) * size;
    }
}