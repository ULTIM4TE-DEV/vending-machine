import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
    id: number;
    name: string;
    price: number;
    qty:number;
    image:string;
}

interface VendingMachineState {
    balance: number;
    credit: number;
    creditLimit: number;
    message: string;
    status: string;
    items: Item[];
}

const initialState: VendingMachineState = {
    balance: 0,
    credit: 0,
    creditLimit: 10, // Set a credit limit
    message: '',
    status: '',
    items: [
        { id: 1001, name: 'Orange juice', price: 1.5 ,qty:0,image: '/images/orange.jpg'},
        { id: 1002, name: 'Kiwi sparkling', price: 1.0 ,qty:2,image: '/images/kiwi.jpg'},
        { id: 1003, name: 'Pepsi', price: 0.75 ,qty:3,image: '/images/pepsi.jpg'},
        { id: 1004, name: 'Coke', price: 0.75 ,qty:4,image: '/images/coke.jpg'},
        { id: 1005, name: 'Mirinda', price: 0.75 ,qty:7,image: '/images/mirinda.jpg'},
    ],
};

const vendingMachineSlice = createSlice({
    name: 'vendingMachine',
    initialState,
    reducers: {
        addMoney: (state, action: PayloadAction<number>) => {
            state.balance += action.payload;
            state.status = 'success';
            state.message = 'Add balance successfully';
        },
        purchaseItem: (state, action: PayloadAction<number>) => {
            const item = state.items.find(item => item.id === action.payload);
            if (!item) {
                state.message = 'Wrong product ID. Please try again!';
                state.status = 'error';
                return;
            }

            const totalBalance = state.balance + state.credit;
            if (totalBalance < item.price) {
                state.message = 'Your balance is not enough. Please add balance!';
                state.status = 'error';
                return;
            }

            if (item.qty === 0) {
                state.message = `Sorry, ${item.name} is out of stock!`;
                state.status = 'error';
                return;
            }

            if (state.balance >= item.price) {
                state.balance -= item.price;
            } else {
                const remaining = item.price - state.balance;
                state.balance = 0;
                state.credit -= remaining;
            }

            item.qty -= 1;
            state.message = `Thank you for your purchase of ${item.name}!`;
            state.status = 'success';
        },
    },
});

export const { addMoney, purchaseItem } = vendingMachineSlice.actions;
export default vendingMachineSlice.reducer;
