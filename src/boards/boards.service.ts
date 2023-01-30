import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.mode';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create_board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const { title } = createBoardDto; //이렇게 해서 아래 title 불러와도되고
    const board: Board = {
      id: uuid(),
      title: title,
      description: createBoardDto.description, //이렇게해도된다.
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }

  getBoardById(id: string): Board {
    //ID 하나 찾아올거니까 []안씀
    return this.boards.find((board) => board.id === id);
  }

  deleteBoard(id: string): void {
    this.boards = this.boards.filter((board) => board.id !== id);
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
