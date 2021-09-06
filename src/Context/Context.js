//All the logic for context api will be here. Add or delete
import React, { useReducer, createContext } from 'react';
import contextReducer from './ContextReducer';

const initalState = JSON.parse(localStorage.getItem('TRANSACTIONS')) || [];
export const ExpenseTrackerContext = createContext(initalState);

export const Provider = (props) => {

    const [transactions, dispatch] = useReducer(contextReducer, initalState);

    // Actions
    const deleteTransaction = (id) => {
        dispatch({ type: 'DELETE_TRANSACTION',payload: id});
    };

    const addTransaction = (transaction) => {
        dispatch({ type: 'ADD_TRANSACTION',payload: transaction});
    }

    const balance = transactions.reduce((acc, currVal) => {
        return (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount);
    }, 0);


    return(
        <ExpenseTrackerContext.Provider value={{
            deleteTransaction, addTransaction, transactions, balance
         }}>
            {props.children}
        </ExpenseTrackerContext.Provider>
    );
}