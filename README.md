# 🎟️ 시퀀스 다이어그램
### 대기열 입장
```mermaid
sequenceDiagram
    participant User
    participant Book
    participant Queue
    participant Database
    participant Scheduler

    User ->> Book: 티켓 페이지 진입 전 대기열 진입 요청
    Book ->> Queue: 대기열 순서 등록 요청
    Queue ->> Database: 대기열 순서/상태(wait) 등록
    Database -->> Queue: 대기열 순서/상태 반환
    Queue -->> Book: 대기열 순서 반환
    Book -->> User: 대기열 순서 반환

    loop 대기열 순서 조회 (반복)
        Book ->> Queue: 일정 주기마다 유저의 상태 및 대기열 상태 확인 요청
        Queue ->> Database: 유저의 상태 및 대기열 상태 확인
        Database -->> Queue: 유저의 상태 및 대기열 상태 반환
        Queue -->> Book: 유저의 상태 및 대기열 상태 반환
    end

    alt 대기 상태에서 서비스 상태로 변경
        Scheduler ->> Database: 대기 시간 만료 후 유저 대기 상태 변경 (wait -> service)
        Database -->> Queue: 유저의 상태 변경
    end

    alt 유저 상태가 서비스로 변경된 경우
        Queue -->> Book: 유저 상태가 서비스로 변경됨
        Book -->> User: 서비스 페이지 반환
    end

    alt 대기 상태 분류 후 일정 시간 경과 시 상태 변경
        Scheduler ->> Database: 유저 상태 변경 (service -> complete)
        Database -->> Queue: 유저의 상태 변경 결과 반환
        Queue -->> User: 시간 만료 알림
    end
```
---
### 콘서트 일정 조회
```mermaid
sequenceDiagram
    participant User
    participant Concert
    participant Queue
    participant Database

    User ->> Concert: 콘서트 리스트 조회 요청
    Concert ->> Queue: 유저토큰 상태 조회 요청
    Queue ->> Database: 유저토큰 상태 조회
    Database ->> Queue: 유저토큰 상태 반환
    Queue ->> Concert: 유저토큰 상태 반환

    alt 유저토큰 상태가 service일 경우
    Concert ->> Database: 콘서트 리스트 및 예약 가능 여부 조회
    Database ->> Concert: 콘서트 리스트 및 예약 가능 여부 반환
    Concert ->> User: 콘서트 리스트 및 예약 가능 여부 노출
    end

    alt 대기열 상태가 complete일 경우
    Concert ->> User: 사용시간 만료 알림
    end  
```
---
### 콘서트 좌석 조회
```mermaid
sequenceDiagram
    participant User
    participant Concert
    participant Database

    User ->> Concert: 콘서트 리스트 조회 요청
    Concert ->> Queue: 유저토큰 상태 조회 요청
    Queue ->> Database: 유저토큰 상태 조회
    Database ->> Queue: 유저토큰 상태 반환
    Queue ->> Concert: 유저토큰 상태 반환


    alt 유저토큰의 상태가 service일 경우
    User ->> Concert: 예약 가능한 좌석 요청
    Concert ->> Database: 예약 가능한 좌석 검색
    Database ->> Concert: 예약 가능한 좌석 반환
    Book ->> User: 예약 가능한 좌석 반환
    end
    
    alt 유저토큰의 상태가 complete일 경우
    Concert ->> User: 사용시간 만료 알림
    end
```
---
### 결재 요청
```mermaid
sequenceDiagram
    participant User
    participant Payment
    participant Database

    User ->> Payment: 결재요청
    Payment ->> Database: 잔액 조회
    Database ->> Payment: 잔액 반환

    alt 잔액이 금액보다 클 경우
    Payment ->> Database: 금액/상태 이력추가
    Database ->> Payment: 금액/상태 이력추가 결과 반환
    Payment ->> Database: 잔액 변경
    Database ->> Payment: 잔액 변경 결과 반환
    Payment ->> Database: 대기열 상태 변경(service -> complete)
    Database ->> Payment: 상태변경 결과 반환
    Payment ->> User: 결재 결과 반환
    end
    
    alt 금액이 부족할 경우
        Payment ->>  User: 잔액 충전 알림
    end
```
---
### 금액 충전
```mermaid
sequenceDiagram
    participant User
    participant Account
    participant Database

    User ->> Account: 금액 충전 요청
    Account ->> Database: 금액 충전(현재 잔고 + 충전 금액)
    Database ->> Account: 금액 충전 결과 반환
    Account ->> Database: 금액 충전 이력 추가
    Database ->> Account: 금액 충전 이력 추가 결과 반환
    Account ->> User: 금액 충전 완료 알림


```
---
### 잔액 조회
```mermaid
sequenceDiagram
    participant User
    participant Account
    participant Database

    User ->> Account: 잔액 조회 요청
    Account ->> Database: 잔액 및 계좌 이력 조회
    Database ->> Account: 잔액 및 계좌 이력 반환
    Account ->> User: 잔액 및 계좌 이력 반환


```
---
<br><br>
# 🎟️ 콘서트 티켓팅 프로젝트 API 명세서
---
### 1. 대기열 진입 (Queue Entry)
- **URL**: `/queues`
- **Method**: `POST`
- **Description**: 대기열에 진입하면서 대기 상태의 유저 토큰을 생성하고 반환
- **Response:**
  - **성공 (200)**:
    ```json
    {
      "userToken": "qlekjr2...",
      "tokenStatus": "wait"
      "message": "현재 대기열은 n명입니다."
    }
    ```
  - **실패 (400 Bad Request)**:
    ```json
    {
      "error": "대기열에 진입할 수 없습니다."
    }
    ```
---
### 2. 콘서트 날짜 조회 (Concert Date Lookup)
- **URL**: `/concerts/:concertId/dates`
- **Method**: `GET`
- **Description**: 특정 콘서트의 예약 가능한 날짜 조회
- **Headers:**
```json
  Authorization: {token}
```
- **Path Parameters:**
```json
  concertId: string
```
- **Response:**
  - **성공 (200)**:
  ```json
  {
    "availableDates": [2024/10/7, 2024/10/14, 2024/10/19]
  }
  ```
  - **실패 (401 Unauthorized)**:
  ```json
  {
    "error": "해당 서비스를 이용하실 수 없습니다."
  }
  ```
  - **실패 (404 Not Found)**:
  ```json
  {
    "error": "해당 콘서트 정보를 찾을 수 없습니다."
  }
  ```

---

### 3. 콘서트 좌석 조회 (Concert Seat Lookup)
- **URL**: `/concerts/:concertId/dates/:date/seats`
- **Method**: `GET`
- **Description**: 콘서트 ID와 날짜에 해당하는 예약 가능한 좌석 수를 반환
- **Headers:**
```json
  Authorization: {token}
```
- **Path Parameters:**
```json
    concertId: string,
    date: string
```
- **Response:**
  - **성공 (200)**:
  ```json
  {
    "availableSeats": [
      { "seatId": seatId1, "seatNum": 1 },
      { "seatId": seatId2, "seatNum": 2 },
      { "seatId": seatId3, "seatNum": 3 }
    ]
  }
  ```
  - **실패 (401 Unauthorized)**:
  ```json
  {
    "error": "해당 서비스를 이용하실 수 없습니다."
  }
  ```
  - **실패 (404 Not Found)**:
  ```json
  {
    "error": "해당 콘서트 정보를 찾을 수 없습니다."
  }
  ```

---

### 4. 콘서트 좌석 임시 예약 (Concert Seat Temporary Reservation)
- **URL**: `/concerts/:concertId/schedules/:scheduleId/seats/:seatId/ticket`
- **Method**: `POST`
- **Description**: 특정 ticketId를 userId가 임시로 점유
- **Headers:**
```json
  Authorization: {token}
```
- **Request Body:**
```json
{
  "ticketId": "ticketId1",
  "userId": "1"
}
```
- **Response:**
  - **성공 (200)**:
  ```json
  {
    "ticketId": 1,
    "userId": 1
    "concertDate": 2024-10-11,
    "concertSeat": 1,
    "seatStatus": "temp"
  }
  ```
  - **실패 (401 Unauthorized)**:
  ```json
  {
    "error": "해당 서비스를 이용하실 수 없습니다."
  }
  ```
  - **실패 (404 Not Found)**:
  ```json
  {
    "error": "해당 콘서트 정보를 찾을 수 없습니다."
  }
  ```
---
### 5. 금액 충전 (Balance Charge)
- **URL**: `/payments/charges`
- **Method**: `PATCH`
- **Description**: 특정 userId의 계좌에 amount만큼 충전 및 이력 추가
- **Headers:**
```json
  Authorization: {token}
```

- **Request Body:**
```json
{
  "userId": "userId1",
  "amount": "50000"
}
```
- **Response:**
  - **성공 (200)**:
  ```json
  {
    "userName": "userName1",
    "amount": 50000,
    "point": 100000,
    "accountStat": "충전완료",
    "regDate": Date.now()
  }
  ```
  - **실패 (401 Unauthorized)**:
  ```json
  {
  "error": "해당 유저 정보를 찾을 수 없습니다."
  }
  ```
  - **실패 (404 Not Found)**:
  ```json
  {
  "error": "충전할 수 없는 금액입니다."
  }
  ```
---

### 6. 잔액 조회 요청 (Balance Inquiry)
- **URL**: /payments/:userId/accounts
- **Method**: GET
- **Description**: 특정 userId의 point 반환
- **Headers:**
```json
  Authorization: {token}
```
- **Request Body:**
```json
{
  "userId": "userId1",
  "amount": "40000"
}
```
- **Response:**
  - **성공 (200)**:
  ```json
  {
    "userName": "userName",
    "point": 150000
  }
  ```
  - **실패 (401 Unauthorized)**:
  ```json
  {
    "error": "해당 유저 정보를 찾을 수 없습니다."
  }
  ```
  - **실패 (404 Not Found)**:
  ```json
  {
    "error": "조회할 수 없는 잔액입니다."
  }
  ```
  ---

### 7. 결제 요청 (Payment Request)
- **URL**: /payments/pays
- **Method**: POST
- **Description**: 특정 ticket에 대한 결제 및 이력 추가
- **Headers:**
```json
  Authorization: {token}
```
- **Request Body:**
```json
  {
    "ticketId": "1",
    "userId": "1"
  }
```
- **Response:**
  - **성공 (200)**:
  ```json
  {
    "ticketId": "ticketId",
    "userName": "userName",
    "concertTitle": "concertTitle",
    "concertDate": 2024-10-11,
    "concertSeat": 1,
    "stat": "booked",
    "tokenStat": "expire"
  }
  ```
  - **실패 (401 Unauthorized)**:
  ```json
  {
    "error": "해당 티켓 정보를 찾을 수 없습니다."
  }
  ```
  - **실패 (404 Not Found)**:
  ```json
  {
    "error": "임시 점유 시간이 만료되었습니다."
  }
  ```
