
import React from 'react';
import Link from 'next/link';
import VendingMachine from "@/components/VendingMachine";

const Home: React.FC = () => {
  return (
      <div className="w-full h-full m-auto bg-blue-300 flex justify-center items-center">
        <VendingMachine/>
      </div>
  );
}

export default Home;
