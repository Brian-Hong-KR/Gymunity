package com.gymunity.common.file;

import java.util.Random;

public class RandomStringGenerator {
	public String generateRandomString(int length) {
		String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder result = new StringBuilder();
        
        Random random = new Random();
        for(int i = 0; i < length; i++) {
        	result.append(characters.charAt(random.nextInt(characters.length())));
        }
        return result.toString();
	}// end generateRandomString()

}//end class
