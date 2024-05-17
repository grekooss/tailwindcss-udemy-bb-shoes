import { CiTrash } from "react-icons/ci";
import { QTYS, SIZES } from "../constant";
import { Select } from "./Select";

export function CartItem({ item }) {
  return (
    <div className="cursor-pointer space-y-2 bg-gray-50 p-2 hover:bg-[#DAFFA2]">
      <div className="flex space-x-2 ">
        <img className="h-24" src={item.src} />
        <div className="space-y-2">
          <div className="font-bold">{item.title}</div>
          <div className="text-sm text-gray-400">{item.description}</div>
        </div>
        <div className="font-bold">{item.price}$</div>
      </div>
      <div className="flex justify-between pl-32">
        <div className="flex space-x-6">
          <div>
            <div className="font-bold">SIZE</div>
            <Select options={SIZES} className={"w-16 p-1"} />
          </div>
          <div>
            <div className="font-bold">QTY</div>
            <Select options={QTYS} className={"w-16 p-1"} />
          </div>
        </div>
        <button>
          <CiTrash className="text-black" size={25} />
        </button>
      </div>
    </div>
  );
}
