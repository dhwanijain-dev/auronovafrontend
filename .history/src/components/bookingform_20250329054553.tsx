"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from "./ui/dialog";

interface MenuItem {
    id: number;
    name: string;
    price: number;
}

interface Genre {
    name: string;
    items: MenuItem[];
}

const genres: Genre[] = [
    {
        name: "Italian",
        items: [
            { id: 1, name: "Pizza", price: 10 },
            { id: 2, name: "Pasta", price: 8 },
        ],
    },
    // Add more genres as needed
];

const restaurants = ["Restaurant A", "Restaurant B", "Restaurant C"];

const BookingForm: React.FC = () => {
    const [name, setName] = useState("");
    const [restaurant, setRestaurant] = useState("");
    const [selectedItems, setSelectedItems] = useState<MenuItem[]>([]);
    const [total, setTotal] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [step, setStep] = useState(1);

    const handleSelectItem = (item: MenuItem) => {
        setSelectedItems((prev) => {
            const exists = prev.find((i) => i.id === item.id);
            if (exists) {
                return prev;
            }
            return [...prev, item];
        });
    };

    const handleNext = () => {
        const totalPrice = selectedItems.reduce((acc, item) => acc + item.price, 0);
        setTotal(totalPrice);
        setStep(2);
        setIsDialogOpen(false);
    };

    const handlePayment = () => {
        // Implement payment logic here
        setStep(3);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Booking Form</h1>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Name:
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                    />
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">
                    Restaurant:
                    <Select
                        value={restaurant}
                        onValueChange={(value) => setRestaurant(value)}
                        className="mt-1 p-2 border rounded w-full"
                    >
                        <option value="">Select a restaurant</option>
                        {restaurants.map((rest) => (
                            <option key={rest} value={rest}>
                                {rest}
                            </option>
                        ))}
                    </Select>
                </label>
            </div>
            <div className="mb-4">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Select Menu
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-4 bg-white shadow-lg rounded-lg border">
                        {genres.map((genre) => (
                            <div key={genre.name} className="mb-4">
                                <h3 className="text-xl font-semibold text-gray-800">{genre.name}</h3>
                                {genre.items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center mt-2">
                                        <span className="text-gray-700">{item.name}</span>
                                        <Button
                                            onClick={() => handleSelectItem(item)}
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                        >
                                            Add
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ))}
                        <Button
                            onClick={() => setIsDialogOpen(true)}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Next
                        </Button>
                    </PopoverContent>
                </Popover>
            </div>

            {step === 2 && (
                <div className="text-center mt-6">
                    <h2 className="text-2xl font-bold text-gray-800">Total: ${total}</h2>
                    <Button
                        onClick={handlePayment}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Proceed to Payment
                    </Button>
                </div>
            )}

            {step === 3 && (
                <div className="text-center mt-6">
                    <h2 className="text-2xl font-bold text-gray-800">Payment Page</h2>
                    {/* Add payment form or details here */}
                </div>
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-white p-6 rounded-lg shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-gray-800">Selected Items</DialogTitle>
                        <DialogDescription className="text-gray-600">
                            Review your selected items before proceeding.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        {selectedItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center mb-2">
                                <span className="text-gray-700">{item.name}</span>
                                <span className="text-gray-700">${item.price}</span>
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={handleNext}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default BookingForm;
