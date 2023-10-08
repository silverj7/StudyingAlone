## ToDoList 만들기

[Class 알아가기]

- 구현하려는 기본적인 기능 
  - ListItem 추가 (onAdd)    - 리스트에 추가 
  - ListItem 체크 (onToggle) - 할 일을 마무리 하면 체크로 완료
  - ListItem 삭제 (onRemove) - 리스트에서 삭제 
    
- Class 구현
    -List / Item 관리 따로
    - Todo class에 item
    - TodoManager에 List
    - TodoManager의 addItem함수에 Todo class의 인스턴스를 생성하여 사용함

- Todo 
    -changeItemCheck  : user가 누른 item의 check상태값 바꿔주는 역할
    -getId            : [v]나 [x]버튼이 눌렸을때 눌린 item의 id를 반환하는 역할
    -getTodoItem      : user가 추가한 item을 반환하는 역할

- TodoManager
    - getItems        : user가 추가한 List를 가져오는 역할
    - addItem         : user가 [+] 버튼 입력시 List에 추가하는 역할
    - checkItem       : user가 할 일을 마무리 했을 시 완료된 아이템을 체크해주는 역할
    - removeItem      : List에서 [X] 버튼 눌러진 아이템 삭제하는 역할

- [ToDoListClassImportComponent.tsx]
   - 사용하는 상태값
      - textValue, toDoList, toDoManager
        - textValue   : 유저의 입력 상태값을 위함
        - toDoList    : List의 상태를 Update 시켜주기위해
        - toDoManager : TodoManager class의 인스턴스를 생성하고, 함수들을 호출할 때 마다 class를 새로 만들지 않게하기 위해
  
   - class는 옵저빙이 안되기 때문에 사용하는 component에서 set을 해줘야함
   - [+]버튼 클릭시 addItem -> getItems -> setToDoList 순으로 List의 상태를 Update시켜줌
  
