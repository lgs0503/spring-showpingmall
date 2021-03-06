package lgs.com.board.service;

import java.util.List;
import lgs.com.board.vo.BoardVO;
import lgs.com.code.vo.CodeVO;

public interface BoardService {

	public List<BoardVO> boardList(BoardVO boardVO);
	public BoardVO searchBoard(BoardVO boardVO);
	public int boardCnt(BoardVO boardVO);
	public void saveBoard(BoardVO boardVO);
	public void deleteBoard(BoardVO boardVO);
	public List<CodeVO> boardCodeList();

}