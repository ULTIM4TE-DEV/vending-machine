import React from 'react';
import Image from "next/image";
import {Button} from "@/components/ui/button";

interface ItemProps {
    item: {
        id: number;
        name: string;
        price: number;
        qty: number;
        image: string;
    };
    onPurchase: () => void;
}

const Item: React.FC<ItemProps> = ({ item, onPurchase }) => {
    return (
        <div className="item flex flex-col justify-center items-center">
            <div className="relative">
                {item.qty === 0 && (
                    <Image className="w-[300px] h-[300px] absolute top-0 left-0" src="/images/out-stock.png" alt={''} width={300} height={300}/>
                )}
                <Image className="w-[300px] h-[300px]" src={item.image} alt={''} width={300} height={300}/>
            </div>
            <p className="text-black">Product Code: {item.id}</p>
            <h3 className="text-black">{item.name}</h3>
            <p className="text-black">Quantity: {item.qty}</p>
            <p className="text-black">Price: ${item.price.toFixed(2)}</p>
        </div>
    );
}

export default Item;
