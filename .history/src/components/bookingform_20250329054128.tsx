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
        <div>
            <h1>Booking Form</h1>
            <div>
                <label>
                    Name:
                    <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Restaurant:
                    <Select value={restaurant} onValueChange={(value) => setRestaurant(value)}>
                        <option value="">Select a restaurant</option>
                        {restaurants.map((rest) => (
                            <option key={rest} value={rest}>
                                {rest}
                            </option>
                        ))}
                    </Select>
                </label>
            </div>
            <div>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button>Select Menu</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        {genres.map((genre) => (
                            <div key={genre.name}>
                                <h3>{genre.name}</h3>
                                {genre.items.map((item) => (
                                    <div key={item.id}>
                                        <span>{item.name}</span>
                                        <Button onClick={() => handleSelectItem(item)}>Add</Button>
                                    </div>
                                ))}
                            </div>
                        ))}
                        <Button onClick={() => setIsDialogOpen(true)}>Next</Button>
                    </PopoverContent>
                </Popover>
            </div>

            {step === 2 && (
                <div>
                    <h2>Total: ${total}</h2>
                    <Button onClick={handlePayment}>Proceed to Payment</Button>
                </div>
            )}

            {step === 3 && <div>Payment Page</div>}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Selected Items</DialogTitle>
                        <DialogDescription>
                            Review your selected items before proceeding.
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        {selectedItems.map((item) => (
                            <div key={item.id}>
                                {item.name}: ${item.price}
                            </div>
                        ))}
                    </div>
                    <DialogFooter>
                        <Button onClick={handleNext}>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default BookingForm;