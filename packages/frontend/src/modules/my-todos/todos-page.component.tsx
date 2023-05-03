import { useHistory } from "react-router-dom";
import { APP_KEYS } from "../common/consts";
// import Pagination from "../pagination/pagination";
import Todo from "./todo/todo";
import styled from "styled-components";
import { ITodo } from "../common/types/todos.type";
import { FC, useEffect, useState } from 'react'
import { Container, CreateButton, TodosTable, SliderContainer, PrevArrow, NextArrow, FiltersContainer, FilterButton, SearchInput } from "./todos-page.styled";
import Slider from 'react-material-ui-carousel'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import { Navigation } from "swiper";
import {DeviceResolution} from '../common/types/devices.types'
import Pagination from '@mui/material/Pagination'
import pagination from '../pagination/pagination'

export type TodosPageProps = {
    device: DeviceResolution,
    todos: ITodo[],
    onCompleteTodo: (todo: ITodo) => () => void,
    onDeleteTodo: (id: string) => () => void,
    pagesNumber: number,
    currentPage: number,
    setCurrentPage: (_: any, number: number) => void,
    onSearchChange: (e: InputEvent) => void,
    onFilterClick: (filter: string | undefined) => void
}

const TodosPageComponent: FC<TodosPageProps> = (props) => {
    const { device, todos, onCompleteTodo, onDeleteTodo, pagesNumber, currentPage, setCurrentPage, onSearchChange, onFilterClick} = props
    const history = useHistory()

    const [currentFilter, setCurrentFilter] = useState('all')

    const renderTodos = () => {
        if(device === 'desktop') {
            return (
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
                                        onComplete={onCompleteTodo(todo)}
                                    />
                                ))
                        }
                    </TodosTable>
                    <Pagination
                        count={pagesNumber}
                        page={currentPage}
                        onChange={setCurrentPage}
                    />
                    {/*<Pagination*/}
                    {/*    currentPage={currentPage}*/}
                    {/*    setCurrentPage={setCurrentPage}*/}
                    {/*    pagesNumber={pagesNumber}*/}
                    {/*/>*/}
                </>
            )
        }

        if(device === 'tablet') {
            return (
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
                                        onDelete={onDeleteTodo(todo.id)}
                                        onComplete={onCompleteTodo(todo)}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                    <PrevArrow/>
                    <NextArrow/>
                </SliderContainer>
            )
        }

        return  <>
            {todos && todos.map((todo, index) => (
                <Todo
                    index={index}
                    key={todo.id}
                    todo={todo}
                    onDelete={onDeleteTodo(todo.id)}
                    onComplete={onCompleteTodo(todo)}
                />
            ))}
        </>
    }

    return (
        <Container>
            <CreateButton onClick={() => history.push(APP_KEYS.ROUTER_KEYS.CREATE_TODO)}>
                Create todo
            </CreateButton>
            <SearchInput onChange={onSearchChange} placeholder="Search todos" />
            <FiltersContainer>
                <FilterButton 
                isSelected={currentFilter === 'all'}
                onClick={() => {
                    onFilterClick()
                    setCurrentFilter('all')
                }}>All</FilterButton>

                <FilterButton 
                isSelected={currentFilter === 'public'}
                onClick={() => {
                    onFilterClick('public')
                    setCurrentFilter('public')
                }}>Public</FilterButton>

                <FilterButton 
                isSelected={currentFilter === 'private'}
                onClick={() => {
                    onFilterClick('private')
                    setCurrentFilter('private')
                }}>Private</FilterButton>

                <FilterButton 
                isSelected={currentFilter === 'completed'}
                onClick={() => {
                    onFilterClick('completed')
                    setCurrentFilter('completed')
                }}>Completed</FilterButton>
            </FiltersContainer>
            {renderTodos()}
        </Container>
    )
}

export default TodosPageComponent;

