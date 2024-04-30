package com.gymunity.point.service;

public interface PointService {

	public void addOrUpdatePointsAggr(int userId);
	
	public void subtractOrUpdatePointsAggr(int userId);
	
	public void adjustPointsAggr(int userId);

}// end class
