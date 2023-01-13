# React Query를 배우는 repository

- 내용: react-query 학습
- 공부 시간: 퇴근 후 10시 ~ 12시
- 목표: 단기간에 학습 후, 기존에 react query로 작성된 코드를 확인하고 수정하기

---

### Blog-em Ipsum

> "https://jsonplaceholder.typicode.com/" api를 사용한 블로그 (페이지네이션)

### Infinite SWAPI

> "https://swapi.dev/api/people/" api를 사용한 무한 스크롤

---

## 내용

### 230103 - day 1

#### **section 1 내용**

- 설치 및 간단한 사용법을 익힙니다.
  - useQuery, QueryClientProvider, isLoading, isFetching
- "https://jsonplaceholder.typicode.com/"으로부터 더미 데이터를 패칭해 화면에 출력합니다.
- staleTime과 cacheTime을 알아봅니다.
- react-query devtools를 사용해봅니다.

### 230104 - day 2

#### **section 2 내용**

- 이전 내용을 복습합니다.
- pagination을 구현합니다.
- query key를 동적으로 사용하는 법에 대해 알아봅니다.
- prefetching에 대해 알아봅니다.
- isFetching과 isLoading을 확인합니다.

### 230105 - day 3

#### **section 2 내용 - 마무리**

- useMutation을 사용하는 법에 대해 알아봅니다.
- mutation을 사용해서 수정, 삭제 요청을 보냅니다.

#### **section 3 내용**

- 새 react query 프로젝트를 set-up합니다.
- devTools을 추가합니다.

### 230106 - day 4

#### **section 3 내용**

- useInfiniteQuery를 사용하는 법에 대해 알아봅니다.
- react-infinite-scroller와 react query를 함께 사용합니다.

### 230106 - day 5

- **section 3 내용**
- useInfiniteQuery를 사용하는 법에 대해 알아봅니다.
- react-infinite-scroller와 react query를 함께 사용합니다.

### 230109 - day 6

- **section 3 마무리**
- 실습 및 css 조금 수정  
  ![chrome-capture-2023-0-9-min](https://user-images.githubusercontent.com/94776135/211334677-1b0eab3d-0edc-4ef9-bdd4-79642650b563.gif)

### 230110 - day 7

- **section 4 init**
- 새 예제 프로젝트: 소스코드 정리, 패키지 설치 및 예제내용 파악하기

### 230111 - day 8

- **section 4 내용**
- 규모가 큰 예제입니다.

```
TS, React-query, Chakra ui, Axios, Formik, Firebase, DayJS
- Firebase와 axios interceptor 사용
- chakra ui에서 제공하는 ui 사용
- Typescript로 타입 관리
- Formik로 폼 데이터 관리
```

- react-query의 집중화와 커스텀 훅, 에러 핸들링에 관해 알아봅니다.

### 230113 - day 9

- **section 4 내용**
- useQuery 작성 해보기
- 전역 에러 핸들링 : base-lazy-days\client\src\react-query\queryClient.ts
- 전역 로딩 스피너 : base-lazy-days\client\src\components\app\Loading.tsx

---

> 소스코드 출처: Udemy course [React Query: Server State Management in React](https://www.udemy.com/course/learn-react-query/?couponCode=REACT-QUERY-GITHUB)
