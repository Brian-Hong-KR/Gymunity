package com.company.shop.board.service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.company.shop.board.dto.BoardDTO;
import com.company.shop.board.dto.PageDTO;
import com.company.shop.board.entity.BoardEntity;
import com.company.shop.board.repository.BoardRepository;

import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Transactional
@Service
public class BoardServiceImp  implements BoardService{
	@Autowired
	private BoardRepository boardRepository;
	
	public BoardServiceImp() {
	
	}

	@Override
	public long countProcess() {
		return boardRepository.count();
	}

	@Override
	public List<BoardDTO> listProcess(PageDTO pv) {	
		List<BoardDTO>  aList = new ArrayList<>();
		List<BoardEntity> result = boardRepository.list(pv);
		result.forEach(board->aList.add(BoardDTO.toDto(board)));
		return aList;
	}

	@Override
	public void insertProcess(BoardDTO dto) {
		log.info("boardDTO:{}", dto);
		//제목글이면
		if(dto.getRef()==0) {
			long refPlus = boardRepository.refPlus();	
			log.info("refPlus:{}", refPlus);
			dto.setRef(refPlus);
		}else {
			//답변글이면
			boardRepository.reStepCount(BoardDTO.toEntity(dto));
			dto.setRe_step(dto.getRe_step() + 1);
			dto.setRe_level(dto.getRe_level() + 1);
		}				
		boardRepository.saveMember(BoardDTO.toEntity(dto), dto.getMemberEmail());
	}

	@Override
	public BoardDTO contentProcess(long num) {
		boardRepository.readCount(num);	
		BoardEntity boardEntity= boardRepository.content(num);
		
		return BoardDTO.toDto(boardRepository.content(num));
	}

	@Override
	public void updateProcess(BoardDTO dto, String urlpath) {
		String 	filename = dto.getUpload();
		//수정할 첨부파일이 있으면
		if(filename != null) {
			String path = boardRepository.getFile(dto.getNum());
			//기존에 저장된 첨부파일이 있으면
			if(path !=null) {
				File file = new File(urlpath, path);
				file.delete();				
			}
		}				
		boardRepository.update(BoardDTO.toEntity(dto));
	}

	@Override
	public void deleteProcess(long num, String urlpath) {
		String path = boardRepository.getFile(num);
		//첨부파일 있으면
		if(path!=null) {
			File file = new  File(urlpath, path);
			file.delete();
		}
	
		boardRepository.deleteMember(num);
	}

}
