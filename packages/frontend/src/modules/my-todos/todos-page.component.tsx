import { useHistory } from "react-router-dom";
import { APP_KEYS } from "../common/consts";
import Pagination from "../pagination/pagination";
import Todo from "./todo/todo";
// import Slider from "../slider/slider";
import styled from "styled-components";
import { ITodo } from "../common/types/todos.type";
import { FC, useEffect } from 'react'
import { Container, CreateButton, TodosTable, SliderContainer, PrevArrow, NextArrow } from "./todos-page.styled";
import Slider from 'react-material-ui-carousel'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import { Navigation } from "swiper";
 
export type TodosPageProps = {
  device: 'mobile' | 'desktop' | 'tablet',
  todos: ITodo[],
  onCompleteTodo: (id: string) => () => void,
  onDeleteTodo: (id: string) => () => void,
  pagesNumber: number,
  currentPage: number,
  setCurrentPage: (number: number) => void
}

const TodosPageComponent: FC<TodosPageProps> = (props) => {
  const { device, todos, onCompleteTodo, onDeleteTodo, pagesNumber, currentPage, setCurrentPage } = props
  const history = useHistory()
  
  return (
    <Container>
      <CreateButton onClick={() => history.push(APP_KEYS.ROUTER_KEYS.CREATE_TODO)}>
        Create todo
      </CreateButton>
      {device === 'desktop' ? (
        <>
          <TodosTable>
            {todos &&
              Array.from({ length: 10 }, (_, i) => (currentPage - 1) * 10 + i)
                .filter(i => i < todos.length)
                .map(i => todos[i])
                .map((todo, index) => (
                  <Todo
                    index={index}
                    key={todo.id}
                    todo={todo}
                    onDelete={onDeleteTodo(todo.id)}
                    onComplete={onCompleteTodo(todo.id)}
                  />
                ))}
          </TodosTable>
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pagesNumber={pagesNumber} />
        </>
      ) : device === 'tablet' ? (
        <SliderContainer>
          {todos && (
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
              pagination={{ clickable: true }}
              modules={[Navigation]}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }}
              style={{
                left: 0
              }}
            >
              {todos.map((todo, index) => (
                <SwiperSlide key={todo.id}>
                  <Todo
                    index={index}
                    todo={todo}
                    onDelete={() => onDeleteTodo(todo.id)}
                    onComplete={() => onCompleteTodo(todo.id)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <PrevArrow/>
          <NextArrow/>
        </SliderContainer>
      ) : (
        <>
          {todos && todos.map((todo, index) => (
            <Todo
              index={index}
              key={todo.id}
              todo={todo}
              onDelete={() => onDeleteTodo(todo.id)}
              onComplete={() => onCompleteTodo(todo.id)}
            />
          ))}
        </>
      )}
      {/* <SwitchButton on={on} onSwitch={onSwitch}/> */}
    </Container>
  )
}

export default TodosPageComponent;

