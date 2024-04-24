package com.gymunity.user.response;

import java.time.LocalDate;
import java.util.List;

import com.gymunity.user.dto.Customer;
import com.gymunity.user.dto.PointDetailDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerDetailResponse {
	private List<Customer> cs;
}
