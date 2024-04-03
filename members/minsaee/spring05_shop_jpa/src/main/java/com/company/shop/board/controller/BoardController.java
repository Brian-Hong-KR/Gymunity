package com.company.shop.board.controller;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.company.shop.board.dto.BoardDTO;
import com.company.shop.board.dto.PageDTO;
import com.company.shop.board.service.BoardService;
import com.company.shop.common.file.FileUpload;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
@Tag(name = "게시판 관련", description = "사용자 관련 API")
@CrossOrigin("*")
@RequiredArgsConstructor
@Slf4j
@RestController
public class BoardController {

	
	private final BoardService boardService;
	
	
	private int currentPage;
	private PageDTO pdto;
	
	@Value("${spring.servlet.multipart.location}")
	private String filePath;

	
	// http://localhost:8090/board/list/1
	
	@Operation(summary="게시판 리스트")	
	@GetMapping("/board/list/{currentPage}")
	public ResponseEntity<Map<String, Object>> listExecute(@PathVariable("currentPage") int currentPage){
	
		Map<String, Object> map = new HashMap<>();
		long totalRecord = boardService.countProcess();
		log.info("totalRecord:{}", totalRecord);
		
		if(totalRecord>=1) {
			this.currentPage = currentPage;
			this.pdto = new PageDTO(this.currentPage, totalRecord);
			
			map.put("boardList", boardService.listProcess(pdto));
			map.put("pv", this.pdto);
		}
		
		log.info("boardList:{}", map.get("boardList"));
		return ResponseEntity.ok(map);
	}//end listExecute()
	
	
	@Operation(summary="게시판 글쓰기")	
	//첨부파일이 있을 때 @RequestBody을 선언하면 안된다.
	//답변글일때 ref, re_step, re_level 담아서 넘겨야 한다.
	@PostMapping(value="/board/write", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> writeProExecute(BoardDTO dto, PageDTO pv, HttpServletRequest req, HttpSession session , @Parameter(description = "첨부파일") @RequestPart(value="filename", required=false) MultipartFile filename) {
		MultipartFile file = dto.getFilename();
		log.info("subject:{}, content:{}", dto.getSubject(), dto.getContent());
		//log.info("file:{}", file.getOriginalFilename());
		
		//파일 첨부가 있으면
		if(file!=null && !file.isEmpty()) {
			UUID random = FileUpload.saveCopyFile(file, filePath);						
			dto.setUpload(random+"_"+ file.getOriginalFilename());
		}		
		
		dto.setIp(req.getRemoteAddr());		
		boardService.insertProcess(dto);		
		return ResponseEntity.ok(String.valueOf(1));
	}
	
	@Operation(summary="게시판 상세페이지")	
	@GetMapping("/board/view/{num}")
	public ResponseEntity<BoardDTO> viewExecute(@PathVariable("num") int num){
		BoardDTO boardDto = boardService.contentProcess(num);
		return ResponseEntity.ok(boardDto);
	}
	
	@Operation(summary="게시판 수정")	
	@PutMapping(value="/board/update", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<Object> updateExecute(BoardDTO dto, HttpServletRequest req, @Parameter(description = "첨부파일") @RequestPart(value="filename", required=false) MultipartFile filename){
		MultipartFile file = dto.getFilename();
		if(file!=null && !file.isEmpty()) {
			UUID random = FileUpload.saveCopyFile(file, filePath);
			dto.setUpload(random +"_"+ file.getOriginalFilename());
		}
		boardService.updateProcess(dto, filePath);
		return ResponseEntity.ok(null);
	}
	
	@Operation(summary="게시판 삭제")
	@DeleteMapping("/board/delete/{num}")
	public ResponseEntity<Object> deleteExecute(@PathVariable("num") int num){
		boardService.deleteProcess(num, filePath);
		return ResponseEntity.ok(null);
	}
	
	@Operation(summary="게시판 다운로드")	
	@GetMapping("/board/contentdownload/{filename}")
	public ResponseEntity<Resource> downloadExecute(@PathVariable("filename") String filename) throws IOException{
		//  69ec1f16-bb45-49a1-a4ba-4160abf0cdba_application.txt
		String fileName = filename.substring(filename.indexOf("_") + 1);
		
		// 파일명이 한글일때 인코딩 작업을 한다.
		String str = URLEncoder.encode(fileName, "UTF-8");
		
		//원본파일명에 공백이 있을 때, "+" 표시가 되므로 공백으로 처리해줌
		str = str.replaceAll("\\+", "%20");
		
		Path path = Paths.get(filePath+"\\"+filename);
		Resource resource = new InputStreamResource(Files.newInputStream(path));
		log.info("resource:{}", resource);
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_TYPE, "application/octet-stream")
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename="+str+";")
				.body(resource);
	}
	
}//end class

