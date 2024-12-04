import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import CoffeeCart from "./components/CoffeeCart";

function App() {
  const loadCoffees = useLoaderData();
  const [coffees, setCoffees] = useState(loadCoffees);

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-4xl font-serif font-bold text-center my-10">
        Coffee Store : {coffees.length}
      </h1>
      <div className="grid md:grid-cols-2 gap-8">
        {coffees.map((coffee) => (
          <CoffeeCart
            key={coffee._id}
            coffee={coffee}
            coffees={coffees}
            setCoffees={setCoffees}
          ></CoffeeCart>
        ))}
      </div>
    </div>
  );
}

export default App;
