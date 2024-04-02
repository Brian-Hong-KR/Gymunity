package com.company.shop.members.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.company.shop.members.entity.MembersEntity;

/* [오류발생]
 * jakarta.persistence.TransactionRequiredException: Executing an update/delete query
 * 
 * [해결]
 * ServiceImp 클래스에 @Transactional 어노테이션을 추가해야 한다.
 */


public interface MembersRepository extends JpaRepository<MembersEntity, String>{
	//회원가입
	@Query(value="INSERT INTO members2(member_email, member_pass, member_name,"
			+ " member_phone, member_type)"
			+ " VALUES(:#{#entity.memberEmail}, :#{#entity.memberPass}, :#{#entity.memberName},"
			+ " :#{#entity.memberPhone}, :#{#entity.memberType})", nativeQuery = true)
	@Modifying
	public int insertMember(@Param("entity") MembersEntity entity);
	
	//회원정보 가져오기
	@Query(value="SELECT * FROM members2"
			    + " WHERE member_email = :memberEmail", nativeQuery = true)
	public MembersEntity selectByEmail(@Param("memberEmail") String memberEmail);
	
	//회원 정보 수정
	@Modifying
    @Query(value="UPDATE members2"
    		+ " SET  member_pass=:#{#entity.memberPass}, member_name=:#{#entity.memberName},"
    		+ " member_phone=:#{#entity.memberPhone}"
    		+ " WHERE member_email=:#{#entity.memberEmail}",nativeQuery = true)
	public void updateMember(@Param("entity") MembersEntity entity);
    
    //@회원탈퇴
	@Modifying
    @Query(value="DELETE FROM members2"
    		   + "	WHERE member_email=:memberEmail",nativeQuery = true)
	public void deleteMember(@Param("memberEmail") String memberEmail);
}
