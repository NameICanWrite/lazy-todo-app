import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'styled-components';
import { MainRouter } from '../pagination';

import * as theme from '../theme'
import * as Styled from './app.styled'
import '../../style.css'
import HealthCheck from '../common/components/HealthCheck/HealthCheck';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            keepPreviousData: true,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            cacheTime: Infinity
        }
    }
})

const AppContainer = () => (
    <ThemeProvider theme={theme}>
        <Styled.GlobalStyles/>
        <QueryClientProvider client={queryClient}>
            <HealthCheck>
                <MainRouter/>
            </HealthCheck>
        </QueryClientProvider>
    </ThemeProvider>
)

export default AppContainer
