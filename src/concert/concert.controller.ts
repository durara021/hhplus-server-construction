import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { ConcertService } from './concert.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';

@Controller('concerts')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  @Get('/:concertId/dates')
  async concertDates(
    @Param('concertId') concertId: string,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: '',
      data: {
        "availableDates": [2024/10/7, 2024/10/14, 2024/10/19]
      },
    };
  }

  @Post('/:concertId/dates/:date/seats')
  async concertSeats(
    @Param('concertId') concertId: string,
    @Param('concertDate') concertDate: string,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: '',
      data: {
        "availableSeats": [
          { "seatId": 1, "seatNum": 1 },
          { "seatId": 2, "seatNum": 2 },
          { "seatId": 3, "seatNum": 3 }
        ]
      },
    };
  }

  @Post('/:concertId/schedules/:scheduleId/seats/:seatId/ticket')
  async ticketing(
    @Param('ticketId') ticketId: string,
    @Param('userId') userId: string,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: '',
      data: {
        "ticketId": "ticketId1",
        "userId": "userId1",
        "concertDate": "concertDate1",
        "concertSeat": "concertSeat1",
        "seatStatus": "temp"
      },
    };
  }

}
