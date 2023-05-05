import { useHistory } from "react-router-dom";
import { APP_KEYS } from "../common/consts";
// import Pagination from "../pagination/pagination";
import Todo from "./todo/todo";
import styled from "styled-components";
import { ITodo } from "../common/types/todos.type";
import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Container, CreateButton, TodosTable, SliderContainer, PrevArrow, NextArrow, FiltersContainer, FilterButton, SearchInput } from "./todos-page.styled";
import Slider from 'react-material-ui-carousel'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import { Navigation } from "swiper";
import { DeviceResolution } from '../common/types/devices.types'
import Pagination from '@mui/material/Pagination'
import pagination from '../pagination/pagination'
import LinksContainer from './links/links.container'
import { useQueryParams } from "../common/hooks/useQueryParams";
import { TODOS_ON_PAGINATION } from "../common/consts/app-keys.const";
import { useInView } from "react-intersection-observer";

export type TodosPageProps = {
    device: DeviceResolution,
    todos: ITodo[],
    onCompleteTodo: (todo: ITodo) => () => void,
    onDeleteTodo: (id: string) => () => void,
    pagesNumber: number,
    currentPage: number,
    setCurrentPage: (_: any, number: number) => void,
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onFilterClick: (filter: string) => void
}

const STATUSES = {
    ALL: 'all',
    PUBLIC: 'public',
    PRIVATE: 'private',
    COMPLETED: 'completed'
}

const TodosPageComponent: FC<TodosPageProps> = (props) => {
    const { device, todos, onCompleteTodo, onDeleteTodo, pagesNumber, currentPage, setCurrentPage, onSearchChange, onFilterClick } = props
    const history = useHistory()
    const {ref, inView} = useInView()

    const [currentFilter, setCurrentFilter] = useState(useQueryParams().get('status') || STATUSES.ALL)

    // useEffect(() => { console.log(todos); }, [todos])

//    const testTodos = todos && Array.from({ length: TODOS_ON_PAGINATION }, (_, i) => (currentPage - 1) * TODOS_ON_PAGINATION + i)
//                                 .filter(i => i < todos.length)
//                                 .map(i => todos[i])
//     console.log('testTodos', testTodos)

    const renderTodos = () => {
        if (device === 'desktop') {
            return (
                <>
                    <TodosTable>
                        {todos &&
                            Array.from({ length: TODOS_ON_PAGINATION }, (_, i) => (currentPage - 1) * TODOS_ON_PAGINATION + i)
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
                                    // <div id={todo.id} key={todo.id}/>
                                ))
                        }
                    </TodosTable>
                    <Pagination
                        count={pagesNumber}
                        page={currentPage}
                        onChange={setCurrentPage}
                    />
                </>
            )
        }

        if (device === 'tablet') {
            return (
                <SliderContainer>
                    {todos && (
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={1}
                            onSlideChange={(swiper) => {
                                console.log('slide change');
                                if (swiper.activeIndex == swiper.slides.length - 2) {
                                    console.log('loading data...');
                                    setCurrentPage(undefined, currentPage + 1)
                                }
                            }}
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
                    <PrevArrow />
                    <NextArrow />
                </SliderContainer>
            )
        }

        return (
            <div style={{ overflowY: 'scroll' }}>
                {todos && todos.map((todo, index) => (
                    <Todo
                        index={index}
                        key={todo.id}
                        todo={todo}
                        onDelete={onDeleteTodo(todo.id)}
                        onComplete={onCompleteTodo(todo)}
                    />
                ))}
            </div>
        )
    }

    const handleButtonFilter = (status: string) => () => {
        setCurrentFilter(status)
        if (status === STATUSES.ALL) return onFilterClick('')
        onFilterClick(status)
        setCurrentPage(undefined, 1)
    }

    useEffect(() => {
        // window.onscroll(() => {
        //     if (device === 'mobile' && window.document.body.scrollTop === (window.document.body.scrollHeight - window.document.body.offsetHeight)) {
        //         // setCurrentPage(undefined, currentPage + 1)
        //         console.log(1);
        //     }
        // })

    }, [])

    return (
        <Container onScroll={e => console.log('scroll')}>
            <CreateButton onClick={() => history.push(APP_KEYS.ROUTER_KEYS.CREATE_TODO)}>
                Create todo
            </CreateButton>
            <LinksContainer />
            <SearchInput onChange={onSearchChange} placeholder="Search todos" />
            <FiltersContainer>
                <FilterButton
                    isSelected={currentFilter === STATUSES.ALL}
                    onClick={handleButtonFilter(STATUSES.ALL)}>All</FilterButton>

                <FilterButton
                    isSelected={currentFilter === STATUSES.PUBLIC}
                    onClick={handleButtonFilter('public')}>Public</FilterButton>

                <FilterButton
                    isSelected={currentFilter === STATUSES.PRIVATE}
                    onClick={handleButtonFilter(STATUSES.PRIVATE)}>Private</FilterButton>

                <FilterButton
                    isSelected={currentFilter === STATUSES.COMPLETED}
                    onClick={handleButtonFilter(STATUSES.COMPLETED)}>Completed</FilterButton>
            </FiltersContainer>
            {renderTodos()}
        </Container>
    )
}

export default TodosPageComponent;

