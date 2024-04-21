package com.gymunity.user.response;

import java.util.List;

import com.gymunity.user.dto.PointDetailDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PointDetailResponse {
	private List<PointDetailDTO> details;

}
