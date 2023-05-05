import { useHistory } from "react-router-dom";
import { APP_KEYS } from "../common/consts";
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
import { CircularProgress } from "@mui/material";
import { PagedTodo } from "../common/types/todo-page.type";
import { FetchNextPageOptions, InfiniteQueryObserverResult } from "react-query";



export type TodosPageProps = {
    device: DeviceResolution,
    todos: ITodo[] | undefined,
    onCompleteTodo: (todo: ITodo) => () => void,
    onDeleteTodo: (id: string) => () => void,
    pagesNumber: number,
    currentPage: number,
    setCurrentPage: (_: any, number: number) => void,
    onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onFilterClick: (filter: string) => void,
    pagedTodos: PagedTodo[] | undefined,
    fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<PagedTodo, unknown>>,
    isTodosLoading: boolean,
}

const STATUSES = {
    ALL: 'all',
    PUBLIC: 'public',
    PRIVATE: 'private',
    COMPLETED: 'completed'
}

const TodosPageComponent: FC<TodosPageProps> = (props) => {
    const {
        device, todos, onCompleteTodo, onDeleteTodo, pagesNumber, currentPage, setCurrentPage,
        onSearchChange, onFilterClick, fetchNextPage, pagedTodos, isTodosLoading
    } = props
    const history = useHistory()
    const { ref: todoLoadingInViewRef, inView: isTodoLoadingInView } = useInView({
        threshold: 0.1
    })

    const [currentFilter, setCurrentFilter] = useState(useQueryParams().get('status') || STATUSES.ALL)

    useEffect(() => {
        if (!isTodoLoadingInView) return
        fetchNextPage()
    }, [isTodoLoadingInView])

    const renderTodos = () => {
        if (device === 'desktop') {
            return (
                <>
                    <TodosTable>
                        {pagedTodos &&
                            pagedTodos.find(item => {
                                return item.page == currentPage
                            })?.todos.map((todo, index) =>
                                <Todo
                                    index={index}
                                    key={todo.id}
                                    todo={todo}
                                    onDelete={onDeleteTodo(todo.id)}
                                    onComplete={onCompleteTodo(todo)}
                                />
                            )
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
                                if (swiper.activeIndex == swiper.slides.length - 2) {
                                    fetchNextPage()
                                }
                            }}
                            onSwiper={() => {}}
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
                                        key={todo.id}
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
            <div>
                {todos && todos.map((todo, index, array) => (
                    <div key={todo.id} ref={index === array.length - 1 ? todoLoadingInViewRef : undefined}>
                        <Todo
                            index={index}
                            key={todo.id}
                            todo={todo}
                            onDelete={onDeleteTodo(todo.id)}
                            onComplete={onCompleteTodo(todo)}
                        />
                        {isTodosLoading && <CircularProgress />}
                    </div>

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

    }, [])

    return (
        <Container>
            <CreateButton onClick={() => history.push(APP_KEYS.ROUTER_KEYS.CREATE_TODO)}>
                Create todo
            </CreateButton>
            <LinksContainer />
            <SearchInput onChange={onSearchChange} label="Search todos" />
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

