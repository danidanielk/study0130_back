import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board.status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create_board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}
  // private boards: Board[] = [];

  // getAllBoards(): Board[] {
  //   return this.boards;
  // }

  // createBoard(createBoardDto: CreateBoardDto) {
  //   const { title } = createBoardDto; //이렇게 해서 아래 title 불러와도되고
  //   const board: Board = {
  //     id: uuid(),
  //     title: title,
  //     description: createBoardDto.description, //이렇게해도된다.
  //     status: BoardStatus.PUBLIC,
  //   };
  //   this.boards.push(board);
  //   return board;
  // }

  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //   if (!found) {
  //     // throw new NotFoundException(); 이렇게하면 그냥 에러
  //     // 찾는 아이디가 없으면 에러 던져
  //     throw new NotFoundException(`can't find board ${id}`);
  //   }
  //   return found;
  // }

  // deleteBoard(id: string): void {
  //   //아이디가 없으면 없다는 애러 보내주는 메서드 실행
  //   const found = this.getBoardById(id);
  //   //아이디가 있으면
  //   this.boards = this.boards.filter((board) => board.id !== found.id);
  // }

  // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }

  //이 아래 cretaet Board 는 서비스 로직에서 데이터를 다룬다 데이터다루는것은 repository로 넘기자
  // async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
  //   const { title, description } = createBoardDto;
  //   const board = this.boardRepository.create({
  //     title,
  //     description,
  //     status: BoardStatus.PUBLIC,
  //   });
  //   await this.boardRepository.save(board);
  //   return board;
  // }

  //DB작업 관련 로직은 레포지토리로 넘김.
  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Can't find Board with ${id}`);
    }
    return found;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`아이디없음여${id}`);
    }

    console.log('result', result);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }

  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }
}
