import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addMoney, purchaseItem } from '../features/vendingMachineSlice';
import Item from './Item';
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/components/ui/input-otp";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {toast} from "sonner";
import item from "./Item";

const VendingMachine: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { balance, message, items, status } = useSelector((state: RootState) => state.vendingMachine);
    const [value, setValue] = useState('')

    useEffect(() => {
        if(message.length > 0) {
            if(status === 'success') {
                toast.success(message)
            }else {
                toast.error(message)
            }
        }
    }, [message,item,balance,status]);

    return (
        <div>
            <h1 className="text-[48px] font-bold">Welcome to the Vending Machine</h1>
            <div className="balance">
                <h2 className="text-[28px]">Your Balance: ${balance.toFixed(2)}</h2>
                <div className="grid grid-cols-2 gap-4 w-1/2">
                    <Button className="bg-blue-500 rounded-lg p-2" onClick={() => dispatch(addMoney(1))}>Add $1</Button>
                    <Button className="bg-blue-500 rounded-lg p-2" onClick={() => dispatch(addMoney(5))}>Add $5</Button>
                </div>
            </div>
            <Card className="items my-6 p-6 grid grid-cols-3 gap-2">
                {items.map((item: any, index: number) => (
                    <div className="bg-white rounded-lg" key={index}>
                        <Item key={item.id} item={item} onPurchase={() => dispatch(purchaseItem(item.id))}/>
                    </div>
                ))}
            </Card>
            <Card className="items-code-section p-6 flex justify-center flex-col items-center">
                <div className="flex items-center justify-center">
                    <InputOTP maxLength={4} value={value} onChange={(value) => setValue(value)}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0}/>
                            <InputOTPSlot index={1}/>
                            <InputOTPSlot index={2}/>
                            <InputOTPSlot index={3}/>
                        </InputOTPGroup>
                     </InputOTP>
                    <Button className="ml-2" onClick={()=>{
                        if (value.length === 4) {
                        dispatch(purchaseItem(parseInt(value)))
                        }else {
                            toast.error('Please insert product code !')
                        }
                    }}
                    >
                        Buy now
                    </Button>
                </div>
                <div className="text-center text-sm my-4">
                    {value === "" ? (
                        <>Enter Product Code !</>
                    ) : (
                        <>You entered: {value}</>
                    )}
                </div>
                <Button onClick={()=>setValue('')}>Reset code</Button>
            </Card>
        </div>
    );
}

export default VendingMachine;
