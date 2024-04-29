package com.gymunity.user.response;

import java.util.List;

import com.gymunity.user.dto.Customer;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerDetailResponse {
	private List<Customer> cs;
}
